import { useMemo, useState } from 'react'
import { Droplets, AlertTriangle, ChevronRight, Trash2, Refrigerator, FileText, Calendar } from 'lucide-react'
import type { Meal, MealTemplate, Ingredient } from '../types'
import { MacroRing } from '../components/MacroRing'
import { getNutritionRating } from '../utils/recipeGenerator'
import { todayKey } from '../utils'
import { MealDetailModal } from '../components/MealDetailModal'

const TRAFFIC_COLORS = { green: 'bg-green-400', yellow: 'bg-yellow-400', red: 'bg-red-400' }

interface Props {
  meals: Meal[]
  templates: MealTemplate[]
  ingredients: Ingredient[]
  onRemoveMeal: (id: string) => void
  onRemoveTemplate: (id: string) => void
  onOpenBuilder: (preload?: { entries: { ingredientId: string; amountGrams: number }[] }) => void
  onUpdateMeal: (meal: Meal) => void
  onAddToShopping: (meal: Meal) => void
  onOpenFridge: () => void
  onOpenImport: () => void
  onOpenPlan: () => void
}

export function HomePage({ meals, templates, ingredients, onRemoveMeal, onRemoveTemplate, onOpenBuilder, onUpdateMeal, onAddToShopping, onOpenFridge, onOpenImport, onOpenPlan }: Props) {
  const [waterMl, setWaterMl] = useState<number>(() => {
    const saved = localStorage.getItem('water')
    if (!saved) return 0
    const { date, ml } = JSON.parse(saved)
    return date === todayKey() ? ml : 0
  })
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)

  function addWater(ml: number) {
    const next = Math.min(waterMl + ml, 5000)
    setWaterMl(next)
    localStorage.setItem('water', JSON.stringify({ date: todayKey(), ml: next }))
  }

  const [dailyGoal] = useState<number>(() => Number(localStorage.getItem('dailyKcalGoal') ?? 2000))

  const todaysMeals = useMemo(() => meals.filter(m => m.createdAt.startsWith(todayKey())), [meals])

  const totals = useMemo(() => todaysMeals.reduce(
    (acc, meal) => {
      const kcal = meal.generatedRecipe?.totalCalories ?? 0
      const p = meal.generatedRecipe?.totalProtein ?? 0
      const c = meal.generatedRecipe?.totalCarbs ?? 0
      const f = meal.generatedRecipe?.totalFat ?? 0
      return { kcal: acc.kcal + kcal, protein: acc.protein + p, carbs: acc.carbs + c, fat: acc.fat + f }
    },
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  ), [todaysMeals])

  const ingMap = useMemo(() => new Map(ingredients.map(i => [i.id, i])), [ingredients])

  const balanceHint = useMemo(() => {
    if (todaysMeals.length === 0) return null
    const cats = new Set(todaysMeals.flatMap(m => m.ingredientEntries.map(e => ingMap.get(e.ingredientId)?.category)))
    if (!cats.has('Gemüse') && !cats.has('Obst')) return 'Heute noch kein Gemüse oder Obst'
    if (!cats.has('Protein')) return 'Heute noch keine Proteinquelle'
    return null
  }, [todaysMeals, ingMap])

  const progress = Math.min(totals.kcal / Math.max(dailyGoal, 1), 1)

  function mealTitle(m: Meal) {
    return m.generatedRecipe?.title?.trim() || new Date(m.createdAt).toLocaleTimeString('de', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      {/* Today summary */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-base">Heute</span>
          <span className="text-sm text-gray-400">{Math.round(totals.kcal)} / {dailyGoal} kcal</span>
        </div>
        <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-3">
          <div className={`h-full rounded-full transition-all ${progress >= 1 ? 'bg-green-500' : 'bg-orange-500'}`} style={{ width: `${progress * 100}%` }} />
        </div>
        {totals.protein + totals.carbs + totals.fat > 0 && (
          <MacroRing proteinG={totals.protein} carbsG={totals.carbs} fatG={totals.fat} size={100} />
        )}
        {balanceHint && (
          <div className="flex items-center gap-2 mt-3 text-xs text-orange-600 dark:text-orange-400">
            <AlertTriangle size={13} /> {balanceHint}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-2">
        <button onClick={() => onOpenBuilder()} className="bg-orange-500 text-white rounded-xl py-3 text-xs font-semibold flex flex-col items-center gap-1">
          <ChevronRight size={18} /> Neues Meal
        </button>
        <button onClick={onOpenFridge} className="bg-white dark:bg-gray-900 rounded-xl py-3 text-xs font-medium flex flex-col items-center gap-1 text-gray-600 dark:text-gray-300">
          <Refrigerator size={18} /> Was hab ich?
        </button>
        <button onClick={onOpenImport} className="bg-white dark:bg-gray-900 rounded-xl py-3 text-xs font-medium flex flex-col items-center gap-1 text-gray-600 dark:text-gray-300">
          <FileText size={18} /> Importieren
        </button>
      </div>
      <button onClick={onOpenPlan} className="w-full bg-white dark:bg-gray-900 rounded-xl py-3 text-sm font-medium flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
        <Calendar size={16} /> Mahlzeitenplan
      </button>
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-500">
            <Droplets size={18} />
            <span className="font-medium text-sm">{waterMl} / 2000 ml</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => addWater(250)} className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-sm font-medium">+250</button>
            <button onClick={() => addWater(500)} className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-sm font-medium">+500</button>
          </div>
        </div>
        <div className="w-full h-1.5 bg-blue-100 dark:bg-blue-950 rounded-full mt-3 overflow-hidden">
          <div className="h-full bg-blue-400 rounded-full" style={{ width: `${Math.min(waterMl / 2000, 1) * 100}%` }} />
        </div>
      </div>

      {/* Templates */}
      {templates.length > 0 && (
        <div>
          <h2 className="font-semibold text-sm text-gray-500 dark:text-gray-400 mb-2 px-1">Vorlagen</h2>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {templates.map(t => (
              <div key={t.id} className="shrink-0 w-28 bg-white dark:bg-gray-900 rounded-xl p-3">
                <div className="text-xs font-semibold leading-tight mb-1 line-clamp-2 text-orange-500">{t.title || t.mealType}</div>
                <div className="text-[10px] text-gray-400 mb-2">{t.mealType} · {t.ingredientEntries.length} Zutaten</div>
                <div className="flex gap-1">
                  <button
                    onClick={() => onOpenBuilder({ entries: t.ingredientEntries })}
                    className="flex-1 text-[10px] bg-orange-500 text-white rounded-lg py-1 font-medium"
                  >Benutzen</button>
                  <button onClick={() => onRemoveTemplate(t.id)} className="text-gray-300 dark:text-gray-600 px-1">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Today's meals */}
      <div>
        <h2 className="font-semibold text-sm text-gray-500 dark:text-gray-400 mb-2 px-1">Bisherige Meals</h2>
        {meals.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center text-sm text-gray-400">
            Noch keine Meals gespeichert
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
            {meals.map((meal, i) => {
              const rating = meal.generatedRecipe ? getNutritionRating(meal.generatedRecipe, meal.mealType) : null
              return (
                <button
                  key={meal.id}
                  onClick={() => setSelectedMeal(meal)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left ${i < meals.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
                >
                  {rating && <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${TRAFFIC_COLORS[rating]}`} />}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{mealTitle(meal)}</div>
                    <div className="text-xs text-gray-400">{meal.mealType} · {new Date(meal.createdAt).toLocaleDateString('de')}</div>
                  </div>
                  {meal.rating > 0 && (
                    <div className="flex items-center gap-0.5 text-yellow-400 text-xs">
                      ★ {meal.rating}
                    </div>
                  )}
                  <ChevronRight size={16} className="text-gray-300 shrink-0" />
                </button>
              )
            })}
          </div>
        )}
      </div>

      {selectedMeal && (
        <MealDetailModal
          meal={selectedMeal}
          ingredients={ingredients}
          onClose={() => setSelectedMeal(null)}
          onDelete={() => { onRemoveMeal(selectedMeal.id); setSelectedMeal(null) }}
          onUpdate={onUpdateMeal}
          onAddToShopping={onAddToShopping}
          onReuse={() => { onOpenBuilder({ entries: selectedMeal.ingredientEntries }); setSelectedMeal(null) }}
        />
      )}
    </div>
  )
}
