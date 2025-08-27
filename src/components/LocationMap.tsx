'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Loader } from '@googlemaps/js-api-loader'
import { FaMapMarkerAlt, FaTimes } from 'react-icons/fa'

interface Location {
  name: string
  address: string
  phone: string
  hours: string[]
  position: {
    lat: number
    lng: number
  }
}

const locations: Location[] = [
  {
    name: 'Ottawa',
    address: '2535 Bank St, Ottawa, ON K1V 8R9',
    phone: '613-521-6002',
    hours: [
      'Monday – Friday: 10:00 AM – 5:30 PM',
      'Saturday: 10:00 AM – 5:00 PM',
      'Sunday: CLOSED'
    ],
    position: { lat: 45.3775, lng: -75.6667 }
  },
  {
    name: 'Mississauga',
    address: '3060 Hurontario St, Mississauga, ON L5B 1N7',
    phone: '905-566-9393',
    hours: [
      'Monday – Saturday: 10:00 AM – 6:00 PM',
      'Sunday: CLOSED'
    ],
    position: { lat: 43.5890, lng: -79.6441 }
  },
  {
    name: 'Scarborough',
    address: '1975 Lawrence Ave East, Scarborough, ON M1R 2Z2',
    phone: '416-840-0086 / 9295',
    hours: [
      'Monday – Saturday: 10:00 AM – 6:00 PM',
      'Sunday: CLOSED'
    ],
    position: { lat: 43.7764, lng: -79.2318 }
  },
  {
    name: 'Windsor',
    address: '793 Wyandotte St E, Windsor, ON N9A 3J5',
    phone: '519-968-3558',
    hours: [
      'Monday – Saturday: 10:00 AM – 6:00 PM',
      'Sunday: CLOSED'
    ],
    position: { lat: 42.3149, lng: -83.0364 }
  }
]

const LocationMap = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState<{ [key: string]: { marker: google.maps.Marker, infoWindow: google.maps.InfoWindow } }>({})
  const [error, setError] = useState<string | null>(null)
  const [geoDenied, setGeoDenied] = useState(false)
  const [geoDeniedVisible, setGeoDeniedVisible] = useState(false)
  const geoDeniedTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const geoDeniedFadeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [closeHover, setCloseHover] = useState(false)
  const [lastTransition, setLastTransition] = useState<'open' | 'close' | null>(null)
  const [mapLoading, setMapLoading] = useState(true)

  useEffect(() => {
    if (panelOpen) setLastTransition('open')
    else setLastTransition('close')
  }, [panelOpen])

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: 'weekly',
        libraries: ['places']
      })

      try {
        const google = await loader.load()
        const mapInstance = new google.maps.Map(mapRef.current!, {
          center: { lat: 43.6532, lng: -79.3832 }, // Toronto center
          zoom: 8,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        })

        mapInstance.setCenter({ lat: 43.6532, lng: -79.3832 });
        mapInstance.setZoom(7);
        setMap(mapInstance)
        setMapLoading(false)

        // Create markers for each location
        const newMarkers: { [key: string]: { marker: google.maps.Marker, infoWindow: google.maps.InfoWindow } } = {}
        
        locations.forEach(location => {
          const marker = new google.maps.Marker({
            position: location.position,
            map: mapInstance,
            title: location.name,
            animation: google.maps.Animation.DROP
          })

          // Create info window content
          const content = `
            <div class="p-4 max-w-xs">
              <h3 class="font-bold text-lg mb-2">${location.name}</h3>
              <p class="text-sm mb-1">${location.address}</p>
              <p class="text-sm mb-1">${location.phone}</p>
              <div class="mt-2">
                ${location.hours.map(hour => `<p class="text-sm">${hour}</p>`).join('')}
              </div>
            </div>
          `

          const infoWindow = new google.maps.InfoWindow({
            content: content,
            maxWidth: 300
          })

          marker.addListener('click', () => {
            // Close all other info windows
            Object.values(newMarkers).forEach(({ infoWindow: iw }) => {
              iw.close()
            })
            
            infoWindow.open(mapInstance, marker)
            setSelectedLocation(location)
          })

          newMarkers[location.name] = { marker, infoWindow }
        })

        setMarkers(newMarkers)
      } catch (error) {
        console.error('Error loading Google Maps:', error)
        setError('Failed to load map. Please try again later.')
        setMapLoading(false)
      }
    }

    initMap()
  }, [])

  const handleLocationClick = (location: Location) => {
    if (map && markers[location.name]) {
      map.panTo(location.position)
      map.setZoom(15)
      // Simulate marker click
      const { marker, infoWindow } = markers[location.name]
      Object.values(markers).forEach(({ infoWindow: iw }) => {
        iw.close()
      })
      infoWindow.open(map, marker)
      setSelectedLocation(location)
      
      // Close the panel on mobile after selecting a location
      if (isMobile) {
        setPanelOpen(false)
      }
    }
  }

  // Find nearest branch using geolocation
  const handleFindNearest = async () => {
    if (!map) return
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoDenied(false);
        setGeoDeniedVisible(false);
        if (geoDeniedTimeoutRef.current) {
          clearTimeout(geoDeniedTimeoutRef.current);
        }
        if (geoDeniedFadeTimeoutRef.current) {
          clearTimeout(geoDeniedFadeTimeoutRef.current);
        }
        const userLat = position.coords.latitude
        const userLng = position.coords.longitude
        // Find nearest location
        let nearest = locations[0]
        let minDist = Number.POSITIVE_INFINITY
        locations.forEach((loc) => {
          const dist = Math.sqrt(
            Math.pow(loc.position.lat - userLat, 2) +
            Math.pow(loc.position.lng - userLng, 2)
          )
          if (dist < minDist) {
            minDist = dist
            nearest = loc
          }
        })
        // Pan/zoom to nearest branch and open info window
        map.panTo(nearest.position)
        map.setZoom(15)
        if (markers[nearest.name]) {
          Object.values(markers).forEach(({ infoWindow: iw }) => iw.close())
          markers[nearest.name].infoWindow.open(map, markers[nearest.name].marker)
        }
        setSelectedLocation(nearest)
        
        // Close the panel on mobile after finding nearest branch
        if (isMobile) {
          setPanelOpen(false)
        }
      },
      (err) => {
        if (err.code === 1) {
          setGeoDenied(true);
          setGeoDeniedVisible(true);
          if (geoDeniedTimeoutRef.current) {
            clearTimeout(geoDeniedTimeoutRef.current);
          }
          if (geoDeniedFadeTimeoutRef.current) {
            clearTimeout(geoDeniedFadeTimeoutRef.current);
          }
          geoDeniedTimeoutRef.current = setTimeout(() => {
            setGeoDenied(false);
            geoDeniedFadeTimeoutRef.current = setTimeout(() => {
              setGeoDeniedVisible(false);
            }, 500);
          }, 4000);
        }
      }
    )
  }

  // Add a handler to reset the map view
  const handleShowAllBranches = () => {
    if (map) {
      map.setCenter({ lat: 43.6532, lng: -79.3832 }); // Toronto center
      map.setZoom(7);
      // Close all info windows
      Object.values(markers).forEach(({ infoWindow: iw }) => iw.close());
      setSelectedLocation(null);
    }
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (geoDeniedTimeoutRef.current) {
        clearTimeout(geoDeniedTimeoutRef.current);
      }
      if (geoDeniedFadeTimeoutRef.current) {
        clearTimeout(geoDeniedFadeTimeoutRef.current);
      }
    };
  }, []);

  // Responsive: show panel open by default on desktop, closed on mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Hide location denied error when panel closes
  useEffect(() => {
    if (!panelOpen) {
      setGeoDenied(false);
      setGeoDeniedVisible(false);
    }
  }, [panelOpen]);

  if (error) {
    return (
      <div className="w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center relative">
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-full max-w-md z-10">
          <div className="bg-red-100 border border-red-400 text-red-800 font-bold rounded-lg px-6 py-4 shadow-lg text-center text-lg">
            {error}
          </div>
        </div>
        <div className="text-center p-8 opacity-30">
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-gray-600">Please refresh the page to try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-[600px] relative">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      {mapLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 rounded-lg z-20">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-gray-600 text-lg font-semibold">Loading map...</p>
          </div>
        </div>
      )}
      {/* Collapsible Location List Overlay */}
      <div
        className={`absolute top-4 left-4 z-20 bg-white rounded-3xl overflow-hidden transition-all duration-700 ease-in-out shadow-lg select-none ${panelOpen ? 'max-h-[800px] p-4' : 'max-h-[3.5rem] p-0'}`}
        style={{
          width: '18rem',
          maxWidth: '20rem'
        }}
        onMouseEnter={() => { if (window.innerWidth >= 768) setPanelOpen(true) }}
        onMouseLeave={() => { if (window.innerWidth >= 768) setPanelOpen(false) }}
        tabIndex={0}
        aria-label="Show branch list"
      >
        {!panelOpen && (
          <div className="flex items-center justify-center w-full h-[3.5rem]">
            <button
              className="w-14 h-14 flex items-center justify-center text-primary text-2xl focus:outline-none"
              onClick={() => setPanelOpen(true)}
              aria-label="Open branch list"
              type="button"
              style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
            >
              <FaMapMarkerAlt />
            </button>
          </div>
        )}
        {panelOpen && (
          <div className="w-full flex flex-col">
            {/* Close button for mobile */}
            <div className="absolute top-2.5 right-2 md:hidden group" style={{ overflow: 'visible', zIndex: 9999 }}>
              <button
                className={`flex items-center justify-center text-gray-600 text-xl transition-all duration-300 ease-in-out ${isMobile && panelOpen ? 'p-0 bg-transparent' : ''}`}
                style={{
                  borderRadius: '9999px',
                  background: isMobile && panelOpen ? 'transparent' : closeHover ? 'white' : 'none',
                  boxShadow: closeHover && !(isMobile && panelOpen) ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                  zIndex: 9999,
                  padding: isMobile && panelOpen ? 0 : undefined
                }}
                onMouseEnter={() => setCloseHover(true)}
                onMouseLeave={() => setCloseHover(false)}
                onFocus={() => setCloseHover(true)}
                onBlur={() => setCloseHover(false)}
                onClick={() => setPanelOpen(false)}
                aria-label="Close branch list"
                type="button"
              >
                <FaTimes />
              </button>
            </div>
            <div className="flex flex-col gap-1 w-full pt-1">
              <button
                onClick={handleFindNearest}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition-colors ${isMobile ? 'mt-6 mb-2' : 'mb-2'}`}
              >
                Find Nearest Branch
              </button>
              {geoDeniedVisible && (
                <div className="mb-1 min-w-[220px] text-red-700 bg-red-100 border border-red-300 rounded px-3 py-2 text-center text-xs font-semibold">
                  Location access denied. Please grant location access in your browser settings to use this feature.
                </div>
              )}
              <button
                onClick={handleShowAllBranches}
                className="mb-3 w-full bg-gray-200 text-gray-800 font-semibold py-2 rounded-xl hover:bg-gray-300 transition-colors"
              >
                Show All Branches
              </button>
              <div className="space-y-2">
                {locations.map((location) => (
                  <button
                    key={location.name}
                    onClick={() => handleLocationClick(location)}
                    className={`w-full text-left p-2 rounded-xl hover:bg-gray-100 transition-colors ${selectedLocation?.name === location.name ? 'bg-gray-100' : ''}`}
                  >
                    <p className="font-medium">{location.name}</p>
                    <p className="text-sm text-gray-600">{location.address}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LocationMap