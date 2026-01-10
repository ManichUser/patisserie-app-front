type ButtonProps = {
    children: React.ReactNode
    onClick?: () => void
  }
  
  export function Button2({ children, onClick }: ButtonProps) {
    return (
      <button
        onClick={onClick}
        className="rounded-full bg-amber-700 px-4 py-2 text-white text-sm font-medium"
      >
        {children}
      </button>
    )
  }
  