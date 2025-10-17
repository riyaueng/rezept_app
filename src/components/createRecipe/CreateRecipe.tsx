import { useContext, useState } from "react"
// import { Plus, Trash2 } from "lucide-react"
import type { ICategory } from "../../interfaces/ICategory"
import { mainContext, type mainContextProps } from "../../context/MainProvider"

interface Ingredient {
  id: string
  zutat: string
  menge: string
  einheit: string
  info: string
}

interface RecipeFormData {
  name: string
  zutaten: Ingredient[]
}

export default function RecipeForm() {
  const { categories } = useContext(mainContext) as mainContextProps
  const [formData, setFormData] = useState<RecipeFormData>({
    name: "",
    zutaten: [{ id: "1", zutat: "", menge: "", einheit: "", info: "" }],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  // const addIngredient = () => {
  //   const newIngredient: Ingredient = {
  //     id: Date.now().toString(),
  //     zutat: "",
  //     menge: "",
  //     einheit: "",
  //     info: "",
  //   }
  //   setFormData({
  //     ...formData,
  //     zutaten: [...formData.zutaten, newIngredient],
  //   })
  // }

  const removeIngredient = (id: string) => {
    if (formData.zutaten.length > 1) {
      setFormData({
        ...formData,
        zutaten: formData.zutaten.filter((z) => z.id !== id),
      })
    }
  }

  const updateIngredient = (id: string, field: keyof Ingredient, value: string) => {
    setFormData({
      ...formData,
      zutaten: formData.zutaten.map((z) => (z.id === id ? { ...z, [field]: value } : z)),
    })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setMessage("")

    try {
      // Hier kommt deine Supabase-Integration
      // Beispiel:
      // const { data, error } = await supabase
      //   .from('recipes')
      //   .insert([{
      //     name: formData.name,
      //     zutaten: formData.zutaten
      //   }]);

      // if (error) throw error;

      // Simuliere API-Call für Demo
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setMessage("Rezept erfolgreich gespeichert!")
      // Formular zurücksetzen
      setFormData({
        name: "",
        zutaten: [{ id: Date.now().toString(), zutat: "", menge: "", einheit: "", info: "" }],
      })
    } catch (error) {
      setMessage("Fehler beim Speichern: " + (error as Error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-8">
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

            <div>
              <select required className="">
                <option value="">Kategorie</option>
                {categories.map((category: ICategory) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Zutaten */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">Zutaten</label>
                <button
                  type="button"
                  // onClick={addIngredient}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  {/* <Plus size={18} /> */}
                  Zutat hinzufügen
                </button>
              </div>

              <div className="space-y-4">
                {formData.zutaten.map((ingredient, index) => (
                  <div key={ingredient.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            value={ingredient.zutat}
                            onChange={(e) => updateIngredient(ingredient.id, "zutat", e.target.value)}
                            placeholder="Zutat"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={ingredient.menge}
                            onChange={(e) => updateIngredient(ingredient.id, "menge", e.target.value)}
                            placeholder="Menge"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={ingredient.einheit}
                            onChange={(e) => updateIngredient(ingredient.id, "einheit", e.target.value)}
                            placeholder="Einheit (z.B. g, ml, Stück)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            value={ingredient.info}
                            onChange={(e) => updateIngredient(ingredient.id, "info", e.target.value)}
                            placeholder="Optionale Info (z.B. gewürfelt, gehackt)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {formData.zutaten.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeIngredient(ingredient.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Zutat entfernen">
                          {/* <Trash2 size={20} /> */}
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
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
