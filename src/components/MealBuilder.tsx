import { useState, useMemo } from 'react'
import { ChevronDown, ChevronUp, RotateCcw, Check, Flame, Clock, Star, BookmarkPlus } from 'lucide-react'
import type { Ingredient, IngredientCategory, SelectedEntry, CookingStyle, MealType, MealTemplate } from '../types'
import { generateRecipe } from '../utils/recipeGenerator'
import { getHealthTags, isInSeason } from '../utils'
import { MacroRing } from './MacroRing'

const CATEGORIES: IngredientCategory[] = ['Protein', 'Kohlenhydrate', 'Gemüse', 'Obst', 'Milchprodukt', 'Fett', 'Gewürz']
const STYLES: CookingStyle[] = ['Klassisch', 'Asiatisch', 'Mediterran']
const MEAL_TYPES: MealType[] = ['Frühstück', 'Mittagessen', 'Abendessen', 'Snack']

interface Props {
  ingredients: Ingredient[]
  initialEntries?: SelectedEntry[]
  initialMealType?: MealType
  onSave: (entries: SelectedEntry[], mealType: MealType, portionCount: number, style: CookingStyle) => void
  onSaveTemplate: (template: Omit<MealTemplate, 'id' | 'createdAt'>) => void
}

export function MealBuilder({ ingredients, initialEntries = [], initialMealType = 'Mittagessen', onSave, onSaveTemplate }: Props) {
  const [selected, setSelected] = useState<SelectedEntry[]>(initialEntries)
  const [mealType, setMealType] = useState<MealType>(initialMealType)
  const [portionCount, setPortionCount] = useState(1)
  const [style, setStyle] = useState<CookingStyle>('Klassisch')
  const [openCat, setOpenCat] = useState<IngredientCategory | null>('Protein')
  const [showRecipe, setShowRecipe] = useState(false)
  const [templateTitle, setTemplateTitle] = useState('')
  const [showTemplateSave, setShowTemplateSave] = useState(false)

  const recipe = useMemo(() => {
    if (selected.length === 0) return null
    return generateRecipe(selected, portionCount, style, mealType)
  }, [selected, portionCount, style, mealType])

  function toggleIngredient(ing: Ingredient) {
    setSelected(prev => {
      const exists = prev.find(e => e.ingredient.id === ing.id)
      if (exists) return prev.filter(e => e.ingredient.id !== ing.id)
      return [...prev, { ingredient: ing, amountGrams: ing.defaultAmountGrams }]
    })
  }

  function updateAmount(id: string, amount: number) {
    setSelected(prev => prev.map(e => e.ingredient.id === id ? { ...e, amountGrams: Math.max(0, amount) } : e))
  }

  function cycleStyle() {
    setStyle(prev => {
      const idx = STYLES.indexOf(prev)
      return STYLES[(idx + 1) % STYLES.length]
    })
  }

  const byCategory = useMemo(() => {
    const map = new Map<IngredientCategory, Ingredient[]>()
    for (const cat of CATEGORIES) map.set(cat, [])
    for (const ing of ingredients) {
      map.get(ing.category)?.push(ing)
    }
    return map
  }, [ingredients])

  const totalKcal = selected.reduce((s, e) => s + e.ingredient.caloriesPer100g * e.amountGrams / 100, 0)
  const totalProtein = selected.reduce((s, e) => s + e.ingredient.proteinPer100g * e.amountGrams / 100, 0)
  const totalCarbs = selected.reduce((s, e) => s + e.ingredient.carbsPer100g * e.amountGrams / 100, 0)
  const totalFat = selected.reduce((s, e) => s + e.ingredient.fatPer100g * e.amountGrams / 100, 0)

  return (
    <div className="pb-4">
      {/* Meal type */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {MEAL_TYPES.map(t => (
            <button key={t} onClick={() => setMealType(t)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                mealType === t ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Ingredient picker */}
      <div className="px-4 space-y-2">
        {CATEGORIES.map(cat => {
          const catIngredients = byCategory.get(cat) ?? []
          const isOpen = openCat === cat
          const selectedInCat = selected.filter(e => e.ingredient.category === cat).length
          return (
            <div key={cat} className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenCat(isOpen ? null : cat)}
                className="w-full flex items-center justify-between px-4 py-3"
              >
                <span className="font-semibold text-sm">
                  {cat}
                  {selectedInCat > 0 && (
                    <span className="ml-2 text-xs bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 px-2 py-0.5 rounded-full">
                      {selectedInCat}
                    </span>
                  )}
                </span>
                {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
              </button>
              {isOpen && (
                <div className="border-t border-gray-100 dark:border-gray-800">
                  {catIngredients.map(ing => {
                    const entry = selected.find(e => e.ingredient.id === ing.id)
                    const isSelected = !!entry
                    const tags = getHealthTags(ing)
                    const seasonal = isInSeason(ing.name)
                    return (
                      <div key={ing.id} className={`px-4 py-2.5 border-b border-gray-50 dark:border-gray-800 last:border-b-0 ${isSelected ? 'bg-orange-50 dark:bg-orange-950' : ''}`}>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleIngredient(ing)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                              isSelected ? 'bg-orange-500 border-orange-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                          >
                            {isSelected && <Check size={12} className="text-white" />}
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1 flex-wrap">
                              <span className="text-sm font-medium">{ing.name}</span>
                              {seasonal && <span className="text-sm">🍃</span>}
                              {tags.map(tag => (
                                <span key={tag.label} className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${tag.color}`}>{tag.label}</span>
                              ))}
                            </div>
                            <span className="text-xs text-gray-400">{Math.round(ing.caloriesPer100g)} kcal/100g · P: {ing.proteinPer100g}g</span>
                          </div>
                          {isSelected && (
                            <div className="flex items-center gap-1 shrink-0">
                              <button onClick={() => updateAmount(ing.id, (entry?.amountGrams ?? 0) - 25)} className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-bold">−</button>
                              <span className="w-14 text-center text-xs font-medium">{Math.round(entry?.amountGrams ?? 0)}g</span>
                              <button onClick={() => updateAmount(ing.id, (entry?.amountGrams ?? 0) + 25)} className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-bold">+</button>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Live macros */}
      {selected.length > 0 && (
        <div className="mx-4 mt-4 bg-white dark:bg-gray-900 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-sm">Nährwerte (live)</span>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Flame size={14} className="text-orange-400" />
              {Math.round(totalKcal)} kcal
            </div>
          </div>
          <MacroRing proteinG={totalProtein} carbsG={totalCarbs} fatG={totalFat} size={100} />

          {/* Portions */}
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            <span className="text-sm text-gray-500">Portionen</span>
            <div className="flex items-center gap-2 ml-auto">
              <button onClick={() => setPortionCount(p => Math.max(1, p - 1))} className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold">−</button>
              <span className="w-6 text-center font-semibold">{portionCount}</span>
              <button onClick={() => setPortionCount(p => Math.min(6, p + 1))} className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold">+</button>
            </div>
          </div>
        </div>
      )}

      {/* Recipe actions */}
      {selected.length > 0 && (
        <div className="mx-4 mt-4 space-y-2">
          <div className="flex gap-2">
            <button
              onClick={() => setShowRecipe(true)}
              className="flex-1 bg-orange-500 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
            >
              <Star size={16} /> Rezept generieren
            </button>
            <button
              onClick={cycleStyle}
              className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 font-semibold text-sm flex items-center gap-1"
              title={`Stil: ${style}`}
            >
              <RotateCcw size={16} /> {style}
            </button>
          </div>
          <button
            onClick={() => setShowTemplateSave(true)}
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-xl py-3 font-medium text-sm flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300"
          >
            <BookmarkPlus size={15} /> Als Vorlage speichern
          </button>
        </div>
      )}

      {/* Template save modal */}
      {showTemplateSave && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowTemplateSave(false)}>
          <div className="bg-white dark:bg-gray-900 w-full rounded-t-3xl p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-lg mb-4">Vorlage speichern</h3>
            <input
              className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-transparent mb-4"
              placeholder="Name der Vorlage (optional)"
              value={templateTitle}
              onChange={e => setTemplateTitle(e.target.value)}
            />
            <button
              onClick={() => {
                onSaveTemplate({
                  title: templateTitle || recipe?.title || 'Vorlage',
                  mealType,
                  ingredientEntries: selected.map(e => ({ ingredientId: e.ingredient.id, amountGrams: e.amountGrams })),
                })
                setShowTemplateSave(false)
                setTemplateTitle('')
              }}
              className="w-full bg-orange-500 text-white rounded-xl py-3 font-semibold"
            >
              Speichern
            </button>
          </div>
        </div>
      )}

      {/* Recipe modal */}
      {showRecipe && recipe && (
        <div className="fixed inset-0 bg-white dark:bg-gray-950 z-50 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setShowRecipe(false)} className="text-gray-400 font-medium text-sm">← Zurück</button>
              <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={12} /> {recipe.estimatedTimeMinutes} min</span>
            </div>
            <h2 className="text-xl font-bold mb-1">{recipe.title}</h2>
            <p className="text-sm text-gray-500 mb-4">{mealType} · {portionCount} {portionCount === 1 ? 'Portion' : 'Portionen'} · {Math.round(recipe.totalCalories)} kcal</p>
            <div className="mb-6">
              <MacroRing proteinG={recipe.totalProtein} carbsG={recipe.totalCarbs} fatG={recipe.totalFat} />
            </div>
            <h3 className="font-semibold mb-3">Zubereitung</h3>
            <ol className="space-y-3 mb-6">
              {recipe.steps.map((step, i) => (
                <li key={step.id} className="flex gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                  <span className="pt-0.5">{step.text}</span>
                </li>
              ))}
            </ol>
            <button
              onClick={() => {
                onSave(selected, mealType, portionCount, style)
                setShowRecipe(false)
              }}
              className="w-full bg-orange-500 text-white rounded-xl py-3 font-bold text-base"
            >
              Meal speichern
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
