interface PageHeroProps {
  title: string
  subtitle?: string
  className?: string
}

export default function PageHero({ title, subtitle, className = '' }: PageHeroProps) {
  return (
    <section className={`relative py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  )
} 