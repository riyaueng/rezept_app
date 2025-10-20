import { useContext, useEffect, useState } from "react"
// import { Plus, Trash2 } from "lucide-react"
import { mainContext, type mainContextProps } from "../../context/MainProvider"
import type { IIngredient } from "../../interfaces/IIngredient"
import supabase from "../../utils/supabase"

interface IRecipeFormData {
  name: string
  ingredients: IIngredient[]
  description: string
  instruction: string
  servings: string
  category_id: string
  img_url: string
}

export default function RecipeForm() {
  const { categories, setCategories } = useContext(mainContext) as mainContextProps
  const [formData, setFormData] = useState<IRecipeFormData>({
    name: "",
    description: "",
    instruction: "",
    servings: "",
    category_id: "",
    img_url: "",
    ingredients: [
      {
        name: "",
        quantity: 1,
        unit: "",
        additional_info: "",
      },
    ],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [recipeImg, setRecipeImg] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [imgUrl, setImgUrl] = useState<string | null>("")

  // ? --------- Kategorien für das Formular rendern ----------

  console.log(imgUrl)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase.from("categories").select("id, name").order("name", { ascending: true })

        if (error) throw error
        if (data) {
          setCategories(data)
        }
        if (categories.length > 0) {
          setCategories(categories)
        }
      } catch (error) {
        console.error("Fehler beim Laden der Kategorien:", error)
      }
    }

    fetchCategories()
  }, [])

  // ? --------- Rezeptfoto hochladen und entfernen ----------

  const handleUploadRecipeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setRecipeImg(file)
      // * ---- Vorschaubild erstellen ----
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeRecipeImg = () => {
    setRecipeImg(null)
    setPreviewUrl("")
    setFormData({ ...formData, img_url: "" })
  }

  // ? --------- Zutaten-Optionen hinzufügen und entfernen ----------

  const addIngredient = () => {
    const newIngredient: IIngredient = {
      name: "",
      quantity: 1,
      unit: "",
      additional_info: "",
    }
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, newIngredient],
    })
  }

  const removeIngredient = (index: number) => {
    if (formData.ingredients.length > 1) {
      setFormData({
        ...formData,
        ingredients: formData.ingredients.filter((_, i) => i !== index),
      })
    }
  }

  const updateIngredient = (index: number, field: keyof IIngredient, value: string | number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.map((ingredient, i) =>
        i === index ? { ...ingredient, [field]: value } : ingredient
      ),
    })
  }

  // ? ------------ Neues Rezept-Daten an Supabase übergeben ------------

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setMessage("")

    try {
      // * ---- Foto im Supabase Storage hochladen ----

      // if (recipeImg) {
      const fileExt = recipeImg?.name.split(".").pop()
      const fileName = `${Date.now()}.${fileExt}`
      const { error: uploadError } = await supabase.storage.from("recipes_img").upload(fileName, recipeImg)
      if (uploadError) throw uploadError

      // * ---- Foto-URL erstellen ----

      const { data: urlData } = supabase.storage.from("recipes_img").getPublicUrl(fileName)
      console.log(urlData)
      setImgUrl(urlData.publicUrl)
      // }

      // * ----- Einzelnes Rezept in die Supabase Datentabelle hochladen -----

      const { data: recipe, error: recipeError } = await supabase
        .from("recipes")
        .insert([
          {
            name: formData.name,
            description: formData.description,
            instructions: formData.instruction,
            servings: formData.servings,
            category_id: formData.category_id,
            img_url: imgUrl,
          },
        ])
        .select()
        .single()

      if (recipeError) throw recipeError

      // * ---- Zutaten in die Supabase Datentabelle hochladen ----

      const ingredientsWithRecipeId = formData.ingredients.map((ingredient) => ({
        ...ingredient,
        recipe_id: recipe.id,
      }))

      const { error: ingredientsError } = await supabase.from("ingredients").insert(ingredientsWithRecipeId)

      if (ingredientsError) throw ingredientsError

      // Simuliere API-Call für Demo
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setMessage("Rezept erfolgreich gespeichert!")
      // Formular zurücksetzen
      setFormData({
        name: "",
        description: "",
        instruction: "",
        servings: "",
        category_id: "",
        img_url: "",
        ingredients: [{ name: "", quantity: 0, unit: "", additional_info: "" }],
      })
      setRecipeImg(null)
      setPreviewUrl("")
    } catch (error) {
      setMessage("Fehler beim Speichern: " + (error as Error).message)
    } finally {
      setIsSubmitting(false)
    }
  }
  console.log(recipeImg)
  console.log(formData)

  return (
    <div className="min-h-screen m-10">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Neues Rezept erstellen</h1>

          <div className="space-y-6">
            {/* Rezeptname */}
            <div>
              <label htmlFor="recipeName" className="block text-sm font-medium text-gray-700 mb-2">
                Rezeptname
              </label>
              <input
                id="recipeName"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="z.B. Pasta Carbonara"
              />
            </div>

            {/* Kategorie */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Kategorie
              </label>
              <select
                id="category"
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white">
                <option value="">Kategorie auswählen...</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Portionen */}
            <div>
              <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-2">
                Portionen
              </label>
              <input
                id="servings"
                value={formData.servings}
                onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"></input>
            </div>

            {/* Beschreibung */}
            <div>
              <label htmlFor="beschreibung" className="block text-sm font-medium text-gray-700 mb-2">
                Beschreibung
              </label>
              <textarea
                id="beschreibung"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Kurze Beschreibung des Rezepts..."
                rows={3}
              />
            </div>

            {/* Foto hochladen */}
            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
                Rezeptfoto
              </label>
              <div className="space-y-3">
                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Vorschau"
                      className="w-full h-64 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={removeRecipeImg}
                      className="absolute top-2 right-2 p-2 bg-orange-light text-grey-fonts rounded-full hover:bg-orange-primary transition-colors px-5"
                      title="Bild entfernen">
                      Löschen
                      {/* <Trash2 size={18} /> */}
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-primary transition-colors">
                    <input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handleUploadRecipeImg}
                      className="hidden"
                    />
                    <label htmlFor="photo" className="cursor-pointer flex flex-col items-center">
                      {/* <Plus size={40} className="text-gray-400 mb-2" /> */}
                      <span className="text-sm text-gray-600">Klicken Sie hier, um ein Foto hochzuladen</span>
                      <span className="text-xs text-gray-400 mt-1">PNG, JPG bis zu 10MB</span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Zutaten */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">Zutaten</label>
                <button
                  type="button"
                  onClick={addIngredient}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-primary text-white rounded-lg hover:bg-orange-500 transition-colors">
                  {/* <Plus size={18} /> */}
                  Zutat hinzufügen
                </button>
              </div>

              <div className="space-y-4">
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            value={ingredient.name}
                            onChange={(e) => updateIngredient(index, "name", e.target.value)}
                            placeholder="Zutat"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            value={ingredient.quantity}
                            onChange={(e) => updateIngredient(index, "quantity", parseFloat(e.target.value))}
                            placeholder="Portion"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={ingredient.unit}
                            onChange={(e) => updateIngredient(index, "unit", e.target.value)}
                            placeholder="Einheit (z.B. g, ml, Stück)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            value={ingredient.additional_info || ""}
                            onChange={(e) => updateIngredient(index, "additional_info", e.target.value)}
                            placeholder="Optionale Info (z.B. gewürfelt, gehackt)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {formData.ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="p-2 text-orange-primary hover:bg-red-50 rounded-lg transition-colors"
                          title="Zutat entfernen">
                          {/* <Trash2 size={20} /> */}
                          Löschen
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Anleitung */}
            <div>
              <label htmlFor="anleitung" className="block text-sm font-medium text-gray-700 mb-2">
                Anleitung
              </label>
              <textarea
                id="anleitung"
                value={formData.instruction}
                onChange={(e) => setFormData({ ...formData, instruction: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Schritt-für-Schritt Anleitung..."
                rows={6}
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-orange-primary text-white font-medium rounded-lg hover:bg-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                {isSubmitting ? "Wird gespeichert..." : "Rezept speichern"}
              </button>
            </div>

            {/* Feedback Message */}
            {message && (
              <div
                className={`p-4 rounded-lg ${
                  message.includes("Fehler")
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-green-50 text-green-700 border border-green-200"
                }`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
