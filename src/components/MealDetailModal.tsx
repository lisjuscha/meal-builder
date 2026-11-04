import { useState } from 'react'
import { Star, Trash2, ShoppingCart, RotateCcw, Play } from 'lucide-react'
import type { Meal, Ingredient } from '../types'
import { MacroRing } from './MacroRing'
import { getNutritionRating } from '../utils/recipeGenerator'
import { CookingSession } from './CookingSession'

const TRAFFIC_LABEL = { green: 'Ausgewogen', yellow: 'Okay', red: 'Verbesserungswürdig' }
const TRAFFIC_COLORS = { green: 'text-green-600 bg-green-50 dark:bg-green-950', yellow: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950', red: 'text-red-600 bg-red-50 dark:bg-red-950' }

interface Props {
  meal: Meal
  ingredients: Ingredient[]
  onClose: () => void
  onDelete: () => void
  onUpdate: (meal: Meal) => void
  onAddToShopping: (meal: Meal) => void
  onReuse: () => void
}

export function MealDetailModal({ meal, ingredients, onClose, onDelete, onUpdate, onAddToShopping, onReuse }: Props) {
  const [rating, setRating] = useState(meal.rating)
  const [note, setNote] = useState(meal.note)
  const [cooking, setCooking] = useState(false)
  const ingMap = new Map(ingredients.map(i => [i.id, i]))
  const recipe = meal.generatedRecipe
  const trafficRating = recipe ? getNutritionRating(recipe, meal.mealType) : null

  function save() {
    onUpdate({ ...meal, rating, note })
  }

  if (cooking && recipe) {
    return <CookingSession recipe={recipe} onClose={() => setCooking(false)} />
  }

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-950 z-50 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onClose} className="text-gray-400 font-medium text-sm">← Zurück</button>
          <button onClick={onDelete} className="text-red-400"><Trash2 size={18} /></button>
        </div>

        {recipe ? (
          <>
            <h2 className="text-xl font-bold mb-1">{recipe.title}</h2>
            <p className="text-sm text-gray-500 mb-3">{meal.mealType} · {new Date(meal.createdAt).toLocaleDateString('de')}</p>

            {trafficRating && (
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 ${TRAFFIC_COLORS[trafficRating]}`}>
                ● {TRAFFIC_LABEL[trafficRating]}
              </span>
            )}

            <div className="mb-4">
              <MacroRing proteinG={recipe.totalProtein} carbsG={recipe.totalCarbs} fatG={recipe.totalFat} />
            </div>

            <div className="text-sm text-gray-500 mb-4 flex gap-4">
              <span>🔥 {Math.round(recipe.totalCalories)} kcal</span>
              <span>⏱ {recipe.estimatedTimeMinutes} min</span>
              <span>🍽 {meal.portionCount} {meal.portionCount === 1 ? 'Portion' : 'Portionen'}</span>
            </div>

            <button
              onClick={() => setCooking(true)}
              className="w-full bg-orange-500 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 mb-4"
            >
              <Play size={16} /> Kochsession starten
            </button>

            <h3 className="font-semibold mb-2">Zubereitung</h3>
            <ol className="space-y-2 mb-6">
              {recipe.steps.map((step, i) => (
                <li key={step.id} className="flex gap-3 text-sm">
                  <span className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                  <span className="pt-0.5">{step.text}</span>
                </li>
              ))}
            </ol>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-1">Meal</h2>
            <p className="text-sm text-gray-500 mb-4">{meal.mealType} · {new Date(meal.createdAt).toLocaleDateString('de')}</p>
          </>
        )}

        {/* Ingredients */}
        <h3 className="font-semibold mb-2">Zutaten</h3>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden mb-6">
          {meal.ingredientEntries.map((entry, i) => {
            const ing = ingMap.get(entry.ingredientId)
            return (
              <div key={i} className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 dark:border-gray-800 last:border-b-0 text-sm">
                <span>{ing?.name ?? entry.ingredientId}</span>
                <span className="text-gray-400">{Math.round(entry.amountGrams)} g</span>
              </div>
            )
          })}
        </div>

        {/* Rating */}
        <h3 className="font-semibold mb-2">Bewertung</h3>
        <div className="flex gap-2 mb-3">
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n} onClick={() => setRating(n)}>
              <Star size={28} className={n <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
            </button>
          ))}
        </div>
        <textarea
          className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-transparent mb-4 resize-none"
          rows={3}
          placeholder="Notiz (optional)"
          value={note}
          onChange={e => setNote(e.target.value)}
        />
        <button onClick={save} className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-xl py-3 font-semibold mb-3">
          Speichern
        </button>

        <div className="flex gap-2">
          <button onClick={() => onAddToShopping(meal)} className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl py-3 text-sm font-medium flex items-center justify-center gap-2">
            <ShoppingCart size={15} /> Einkaufsliste
          </button>
          <button onClick={onReuse} className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl py-3 text-sm font-medium flex items-center justify-center gap-2">
            <RotateCcw size={15} /> Wiederholen
          </button>
        </div>
      </div>
    </div>
  )
}
