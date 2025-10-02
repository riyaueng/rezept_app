import Button from "../button/Button"
import "./CardRecipe"

interface CardRecipeProps {
  name: string
  desc: string
  link: string
  onClick: () => void | Promise<void>
}

export default function CardRecipe({ name, desc, link, onClick }: CardRecipeProps) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{desc}</p>
      <Button text="Zum Rezept" link={link} onClick={onClick} />
    </div>
  )
}
