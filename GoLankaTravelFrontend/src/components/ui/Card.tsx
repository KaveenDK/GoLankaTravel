import { cn } from '../../utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  noPadding?: boolean
}

const Card = ({ children, className, noPadding = false }: CardProps) => {
  return (
    <div 
      className={cn(
        "bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md",
        !noPadding && "p-6",
        className
      )}
    >
      {children}
    </div>
  )
}

export default Card