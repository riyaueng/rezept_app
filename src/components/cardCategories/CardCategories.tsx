import { Link } from "react-router"

interface CardCategoryProps {
  text: string
  icon: string
  // image: string
  link: string
}

export default function CardCategories({ text, icon, link }: CardCategoryProps) {
  return (
    <Link to={link} className="w-22 flex-column justify-center">
      <div className="w-22 h-22 bg-blue-midtone rounded-full flex items-center justify-center mb-2">
        {/* <img src={image} alt={text} /> */}
        <p className="text-5xl">{icon}</p>
      </div>
      <div className="text-center w-20 ">
        <p className="text-[0.75rem] leading-tight">{text}</p>
      </div>
    </Link>
  )
}
