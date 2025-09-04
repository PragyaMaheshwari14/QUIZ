type Props = {
  label: string
  index: number
  isActive: boolean
  isDisabled?: boolean
  onSelect: (index: number) => void
  onMove: (dir: 'prev' | 'next') => void
}

export default function OptionItem({
  label,
  index,
  isActive,
  isDisabled,
  onSelect,
  onMove,
}: Props) {
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      onMove('next')
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      onMove('prev')
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(index)
    }
  }

  return (
    <button
      role="radio"
      aria-checked={isActive}
      onKeyDown={onKeyDown}
      onClick={() => onSelect(index)}
      disabled={isDisabled}
      className={[
        "w-full text-left px-4 py-3 rounded-xl border transition focus:outline-none focus:ring-2 focus:ring-blue-400",
        isDisabled ? "opacity-75 cursor-not-allowed" : "hover:border-blue-400",
        isActive
          ? "border-blue-600 bg-blue-50 text-gray-900"
          : "border-gray-300 bg-white text-gray-800",
      ].join(" ")}
    >
      <span className="mr-2 font-semibold">
        {String.fromCharCode(65 + index)}.
      </span>{" "}
      {label}
    </button>
  )
}
