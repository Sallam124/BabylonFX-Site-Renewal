export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
} 