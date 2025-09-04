export default function Loader() {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="animate-pulse h-3 w-3 rounded-full bg-blue-600 mx-1"></div>
      <div className="animate-pulse h-3 w-3 rounded-full bg-blue-600 mx-1 [animation-delay:120ms]"></div>
      <div className="animate-pulse h-3 w-3 rounded-full bg-blue-600 mx-1 [animation-delay:240ms]"></div>
    </div>
  )
}
