interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export default function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-white via-gray-100 to-blue-100 ${className}`}>
      {children}
    </div>
  )
} 