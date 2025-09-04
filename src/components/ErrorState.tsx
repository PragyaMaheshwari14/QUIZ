export default function ErrorState({ message }: { message: string }) {
  return (
    <div className="text-center bg-red-50 text-red-700 border border-red-200 p-4 rounded-xl">
      {message}
    </div>
  )
}
