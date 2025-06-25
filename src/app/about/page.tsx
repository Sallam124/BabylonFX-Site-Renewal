import PageContainer from '@/components/PageContainer'
import AnimateOnScroll from '@/components/AnimateOnScroll'

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

const currentYear = new Date().getFullYear()

const About = () => {
  return (
    <>
      <PageContainer>
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center mt-8 mb-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-primary fade-in-up-delay-0">
            About Us
          </h1>
          <p className="mt-2 max-w-2xl mx-auto text-2xl md:text-3xl font-semibold text-gray-700 fade-in-up-delay-1">
            Learn more about our team, mission, and values
          </p>
        </div>

        {/* Company Story */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="fade-in-up">
                <h2 className="text-3xl font-bold text-primary mb-6 fade-in-up-delay-0">Our Story</h2>
                <p className="text-gray-600 mb-4 fade-in-up-delay-1">
                  Founded in 2010, BabylonFX has grown from a single location in Toronto to become one of Canada's most trusted currency exchange providers. Our commitment to transparency, competitive rates, and exceptional customer service has helped us build lasting relationships with our clients.
                </p>
                <p className="text-gray-600 mb-4 fade-in-up-delay-1">
                  We understand that currency exchange is more than just numbers - it's about helping people achieve their goals, whether they're traveling abroad, sending money to loved ones, or managing international business transactions.
                </p>
                <p className="text-gray-600 fade-in-up-delay-1">
                  Today, we continue to innovate and expand our services while maintaining the personal touch that sets us apart from larger financial institutions.
                </p>
              </div>
              <div className="bg-gray-200 rounded-lg aspect-w-16 aspect-h-9 fade-in-up-delay-1">
                {/* Placeholder for company image */}
                <div className="flex items-center justify-center h-full text-gray-500">
                  Company image will be displayed here
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <AnimateOnScroll>
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-primary text-center mb-12 fade-in-up">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md fade-in-up">
                  <div className="text-secondary text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Integrity</h3>
                  <p className="text-gray-600">
                    We believe in transparent pricing and honest communication with our clients.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md fade-in-up-delay-1">
                  <div className="text-secondary text-4xl mb-4">🤝</div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Customer Focus</h3>
                  <p className="text-gray-600">
                    Our clients' needs come first, and we're committed to providing exceptional service.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md fade-in-up-delay-2">
                  <div className="text-secondary text-4xl mb-4">💡</div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Innovation</h3>
                  <p className="text-gray-600">
                    We continuously improve our services and embrace new technologies.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* Team */}
        <AnimateOnScroll>
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-primary text-center mb-12 fade-in-up">Our Leadership Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className={`bg-white p-6 rounded-lg shadow-md fade-in-up${index > 0 ? `-delay-${index}` : ''}`}>
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
        </AnimateOnScroll>
      </PageContainer>
    </>
  )
}

export default About 