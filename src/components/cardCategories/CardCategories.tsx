interface CardCategoryProps {
  text: string
  image: string
}

export default function CardCategories({ text, image }: CardCategoryProps) {
  return (
    <div>
      <img src={image} alt="" />
      {text}
    </div>
  )
}
