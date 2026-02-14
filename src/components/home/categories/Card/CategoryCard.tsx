import Image from "next/image"
interface Category {
  label : string
  cover : string
}
type CategoryCardProps = {
  category: Category
}
export function CategoryCard({category}: CategoryCardProps) {
  const {label,cover} = category
  return (
    <div className="flex cursor-pointer flex-col items-center gap-1 text-center rounded-full">
      {/* Image Circle */}
      <div className="flex h-32 w-32 items-center justify-center rounded-full bg-muted transition hover:scale-105">
        <Image
          src={cover}
          alt={label}
          className="object-contain rounded-[50%]"
          width={90}
          height={90}
          priority
        />
      </div>

      {/* Title */}
      <p className="text-sm font-medium  opacity-75">
        {label}
      </p>
    </div>
  )
}
