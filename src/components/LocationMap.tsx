'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

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

        setMap(mapInstance)

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
    }
  }

  // Find nearest branch using geolocation
  const handleFindNearest = () => {
    if (!map) return
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
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
      },
      (err) => {
        setError('Unable to retrieve your location.')
      }
    )
  }

  if (error) {
    return (
      <div className="w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-gray-600">Please refresh the page to try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-[600px] relative">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      
      {/* Location List Overlay */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <h3 className="font-bold text-lg mb-2">Our Locations</h3>
        <button
          onClick={handleFindNearest}
          className="mb-4 w-full bg-primary text-white font-semibold py-2 rounded hover:bg-secondary transition-colors"
        >
          Find Nearest Branch
        </button>
        <div className="space-y-2">
          {locations.map((location) => (
            <button
              key={location.name}
              onClick={() => handleLocationClick(location)}
              className={`w-full text-left p-2 rounded hover:bg-gray-100 transition-colors ${
                selectedLocation?.name === location.name ? 'bg-gray-100' : ''
              }`}
            >
              <p className="font-medium">{location.name}</p>
              <p className="text-sm text-gray-600">{location.address}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LocationMap 