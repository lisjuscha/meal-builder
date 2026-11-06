import { useState, useMemo } from 'react'
import { Plus, ChevronRight, Flame, RotateCcw } from 'lucide-react'
import type { Meal, MealType, PlannedMeal } from '../types'

const MEAL_TYPES: MealType[] = ['Frühstück', 'Mittagessen', 'Abendessen', 'Snack']

function getPlanDays(weekStartsOn: number, planDays: number) {
  const days: { date: string; label: string }[] = []
  const today = new Date()
  const start = new Date(today)
  const offset = (today.getDay() - weekStartsOn + 7) % 7
  start.setDate(today.getDate() - offset)
  for (let i = 0; i < planDays; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    days.push({
      date: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString('de', { weekday: 'long', day: 'numeric', month: 'numeric' }),
    })
  }
  return days
}

interface Props {
  plannedMeals: PlannedMeal[]
  meals: Meal[]
  weekStartsOn?: number
  planDays?: number
  onAdd: (p: PlannedMeal) => void
  onRemove: (id: string) => void
  onResetPlan: () => void
  onOpenBuilder: () => void
  onClose: () => void
}

export function MealPlanPage({ plannedMeals, meals, weekStartsOn = 1, planDays = 7, onAdd, onRemove, onResetPlan, onOpenBuilder, onClose }: Props) {
  const [showPicker, setShowPicker] = useState<{ date: string; mealType: MealType } | null>(null)
  const [confirmReset, setConfirmReset] = useState(false)
  const days = useMemo(() => getPlanDays(weekStartsOn, planDays), [weekStartsOn, planDays])
  const mealMap = useMemo(() => new Map(meals.map(m => [m.id, m])), [meals])

  function getPlanned(date: string, mealType: MealType) {
    return plannedMeals.find(p => p.plannedDate === date && p.mealType === mealType)
  }

  function getDayKcal(date: string) {
    return plannedMeals
      .filter(p => p.plannedDate === date && p.mealId)
      .reduce((sum, p) => {
        const meal = mealMap.get(p.mealId!)
        return sum + (meal?.generatedRecipe?.totalCalories ?? 0)
      }, 0)
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
    <div className="flex-1 overflow-y-auto min-h-0 px-4 pt-4 pb-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onClose} className="text-gray-400 font-medium text-sm">← Zurück</button>
        <h1 className="text-xl font-bold">Mahlzeitenplan</h1>
        <button
          onClick={() => setConfirmReset(true)}
          className="flex items-center gap-1 text-orange-500 text-sm font-medium"
        >
          <RotateCcw size={14} /> Neue Woche
        </button>
      </div>

      <div className="space-y-3">
        {days.map(day => {
          const dayKcal = getDayKcal(day.date)
          return (
            <div key={day.date} className="bg-white dark:bg-[#1c1c1e] rounded-xl overflow-hidden">
              <div className="px-4 py-2.5 border-b border-gray-100 dark:border-[#38383a] flex items-center justify-between">
                <span className="font-semibold text-sm">{day.label}</span>
                {dayKcal > 0 && (
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Flame size={12} className="text-orange-400" />
                    {Math.round(dayKcal)} kcal
                  </span>
                )}
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
                          <div className="min-w-0">
                            <span className="text-sm font-medium truncate block">
                              {meal?.generatedRecipe?.title ?? 'Geplant'}
                            </span>
                            {meal?.generatedRecipe?.totalCalories && (
                              <span className="text-xs text-gray-400">{Math.round(meal.generatedRecipe.totalCalories)} kcal</span>
                            )}
                          </div>
                          <button
                            onClick={() => onRemove(planned.id)}
                            className="text-gray-300 dark:text-[#636366] text-xs ml-2 shrink-0"
                          >✕</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowPicker({ date: day.date, mealType })}
                          className="flex items-center gap-1 text-orange-500 text-xs font-medium ml-auto"
                        >
                          <Plus size={14} /> Hinzufügen
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Reset confirm */}
      {confirmReset && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setConfirmReset(false)}>
          <div className="bg-white dark:bg-[#1c1c1e] w-full rounded-t-3xl p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-lg mb-1">Plan zurücksetzen?</h3>
            <p className="text-sm text-gray-400 mb-5">Alle geplanten Mahlzeiten werden gelöscht. Die gespeicherten Meals bleiben erhalten.</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmReset(false)} className="flex-1 bg-gray-100 dark:bg-[#2c2c2e] rounded-xl py-3 text-sm font-medium">Abbrechen</button>
              <button
                onClick={() => { setConfirmReset(false); onResetPlan() }}
                className="flex-1 bg-red-500 text-white rounded-xl py-3 text-sm font-semibold"
              >Zurücksetzen</button>
            </div>
          </div>
        </div>
      )}

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
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-orange-500 font-medium text-sm"
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
                    <div className="text-xs text-gray-400">
                      {meal.mealType} · {new Date(meal.createdAt).toLocaleDateString('de')}
                      {meal.generatedRecipe?.totalCalories ? ` · ${Math.round(meal.generatedRecipe.totalCalories)} kcal` : ''}
                    </div>
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
