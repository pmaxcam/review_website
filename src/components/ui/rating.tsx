import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingProps {
  className?: string
  value: number
  onChange?: (value: number) => void
  readOnly?: boolean
}

function Rating({ className, value, onChange, readOnly = false }: RatingProps) {
  const [hoverRating, setHoverRating] = React.useState(0)

  return (
    <div className={cn("flex items-center", className)}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = (hoverRating || value) >= star
        
        return (
          <Star
            key={star}
            className={cn(
              "h-6 w-6 cursor-pointer transition-colors",
              isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300", 
              readOnly && "cursor-default"
            )}
            onMouseEnter={() => !readOnly && setHoverRating(star)}
            onMouseLeave={() => !readOnly && setHoverRating(0)}
            onClick={() => !readOnly && onChange?.(star)}
          />
        )
      })}
    </div>
  )
}

export { Rating } 