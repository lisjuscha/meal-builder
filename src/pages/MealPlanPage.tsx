import { useState, useMemo } from 'react'
import { Plus, ChevronRight } from 'lucide-react'
import type { Meal, MealType, PlannedMeal } from '../types'

const MEAL_TYPES: MealType[] = ['Frühstück', 'Mittagessen', 'Abendessen', 'Snack']

function getWeekDays() {
  const days: { date: string; label: string; short: string }[] = []
  const today = new Date()
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7))
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    days.push({
      date: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString('de', { weekday: 'long', day: 'numeric', month: 'numeric' }),
      short: d.toLocaleDateString('de', { weekday: 'short' }),
    })
  }
  return days
}

interface Props {
  plannedMeals: PlannedMeal[]
  meals: Meal[]
  onAdd: (p: PlannedMeal) => void
  onRemove: (id: string) => void
  onOpenBuilder: () => void
}

export function MealPlanPage({ plannedMeals, meals, onAdd, onRemove, onOpenBuilder }: Props) {
  const [showPicker, setShowPicker] = useState<{ date: string; mealType: MealType } | null>(null)
  const days = useMemo(() => getWeekDays(), [])
  const mealMap = useMemo(() => new Map(meals.map(m => [m.id, m])), [meals])

  function getPlanned(date: string, mealType: MealType) {
    return plannedMeals.find(p => p.plannedDate === date && p.mealType === mealType)
  }

  function pickMeal(mealId: string | null) {
    if (!showPicker) return
    onAdd({
      id: crypto.randomUUID(),
      plannedDate: showPicker.date,
      mealType: showPicker.mealType,
      mealId,
    })
    setShowPicker(null)
  }

  return (
    <div className="px-4 pt-4 pb-6">
      <h1 className="text-xl font-bold mb-4">Mahlzeitenplan</h1>

      <div className="space-y-3">
        {days.map(day => (
          <div key={day.date} className="bg-white dark:bg-[#1c1c1e] rounded-xl overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100 dark:border-[#38383a]">
              <span className="font-semibold text-sm">{day.label}</span>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {MEAL_TYPES.map(mealType => {
                const planned = getPlanned(day.date, mealType)
                const meal = planned?.mealId ? mealMap.get(planned.mealId) : null
                return (
                  <div key={mealType} className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-xs text-gray-400 w-24 shrink-0">{mealType}</span>
                    {planned ? (
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-sm font-medium truncate">
                          {meal?.generatedRecipe?.title ?? 'Geplant'}
                        </span>
                        <button
                          onClick={() => onRemove(planned.id)}
                          className="text-gray-300 dark:text-[#636366] text-xs ml-2 shrink-0"
                        >✕</button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowPicker({ date: day.date, mealType })}
                        className="flex items-center gap-1 text-green-500 text-xs font-medium ml-auto"
                      >
                        <Plus size={14} /> Hinzufügen
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Meal picker modal */}
      {showPicker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowPicker(null)}>
          <div className="bg-white dark:bg-[#1c1c1e] w-full rounded-t-3xl max-h-[70vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="px-4 pt-4 pb-2 border-b border-gray-100 dark:border-[#38383a]">
              <h3 className="font-bold">Meal auswählen</h3>
              <p className="text-xs text-gray-400">{showPicker.mealType}</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              <button
                onClick={onOpenBuilder}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-green-500 font-medium text-sm"
              >
                <Plus size={16} /> Neues Meal erstellen
              </button>
              {meals.length === 0 && (
                <p className="px-4 py-4 text-sm text-gray-400">Noch keine gespeicherten Meals.</p>
              )}
              {meals.map(meal => (
                <button
                  key={meal.id}
                  onClick={() => pickMeal(meal.id)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                >
                  <div>
                    <div className="text-sm font-medium">{meal.generatedRecipe?.title ?? 'Meal'}</div>
                    <div className="text-xs text-gray-400">{meal.mealType} · {new Date(meal.createdAt).toLocaleDateString('de')}</div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
