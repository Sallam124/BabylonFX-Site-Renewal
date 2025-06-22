'use client'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Test Page</h1>
        <p className="text-gray-600">If you can see this, the basic setup is working!</p>
        <p className="text-sm text-gray-500 mt-2">Current time: {new Date().toLocaleString()}</p>
      </div>
    </div>
  )
} 