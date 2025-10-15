import { Link } from "react-router"

interface CardCategoryProps {
  text: string
  image: string
  link: string
}

export default function CardCategories({ text, image, link }: CardCategoryProps) {
  return (
    <Link to={link}>
      <img src={image} alt="" />
      {text}
    </Link>
  )
}
