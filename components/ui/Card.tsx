type CardProps = {
    children: React.ReactNode
  }
  
  export function Card({ children }: CardProps) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-4">
        {children}
      </div>
    )
  }
  
  export function CardContent({ children }: CardProps) {
    return <div className="space-y-2">{children}</div>
  }