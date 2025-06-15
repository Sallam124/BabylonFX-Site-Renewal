import Navigation from '@/components/Navigation'

const teamMembers = [
  {
    name: 'John Smith',
    position: 'CEO & Founder',
    bio: 'With over 20 years of experience in the financial industry, John leads our company with vision and expertise.',
    image: '/team/john-smith.jpg', // Placeholder image path
  },
  {
    name: 'Sarah Johnson',
    position: 'Operations Manager',
    bio: 'Sarah ensures smooth operations and excellent customer service across all our locations.',
    image: '/team/sarah-johnson.jpg', // Placeholder image path
  },
  {
    name: 'Michael Chen',
    position: 'Head of Trading',
    bio: 'Michael brings extensive experience in currency trading and market analysis.',
    image: '/team/michael-chen.jpg', // Placeholder image path
  },
]

const About = () => {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                About BabylonFX
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Your trusted partner in currency exchange since 2010
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2010, BabylonFX has grown from a single location in Toronto to become one of Canada's most trusted currency exchange providers. Our commitment to transparency, competitive rates, and exceptional customer service has helped us build lasting relationships with our clients.
                </p>
                <p className="text-gray-600 mb-4">
                  We understand that currency exchange is more than just numbers - it's about helping people achieve their goals, whether they're traveling abroad, sending money to loved ones, or managing international business transactions.
                </p>
                <p className="text-gray-600">
                  Today, we continue to innovate and expand our services while maintaining the personal touch that sets us apart from larger financial institutions.
                </p>
              </div>
              <div className="bg-gray-200 rounded-lg aspect-w-16 aspect-h-9">
                {/* Placeholder for company image */}
                <div className="flex items-center justify-center h-full text-gray-500">
                  Company image will be displayed here
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-secondary text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-primary mb-2">Integrity</h3>
                <p className="text-gray-600">
                  We believe in transparent pricing and honest communication with our clients.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-secondary text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold text-primary mb-2">Customer Focus</h3>
                <p className="text-gray-600">
                  Our clients' needs come first, and we're committed to providing exceptional service.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-secondary text-4xl mb-4">💡</div>
                <h3 className="text-xl font-semibold text-primary mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We continuously improve our services and embrace new technologies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Our Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="aspect-w-1 aspect-h-1 mb-4">
                    <div className="bg-gray-200 rounded-lg">
                      {/* Placeholder for team member image */}
                      <div className="flex items-center justify-center h-full text-gray-500">
                        {member.name}'s photo
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-1">{member.name}</h3>
                  <p className="text-secondary mb-2">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Growing Team</h2>
            <p className="text-xl mb-8">
              We're always looking for talented individuals to join our team
            </p>
            <a
              href="/contact"
              className="inline-block bg-secondary hover:bg-secondary-light text-white font-bold py-3 px-8 rounded-md transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </>
  )
}

export default About 