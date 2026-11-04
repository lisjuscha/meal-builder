import { useMemo, useState } from 'react'
import type { Meal } from '../types'

interface Props { meals: Meal[] }

type Metric = 'kcal' | 'protein' | 'fiber'

const METRIC_LABELS: Record<Metric, string> = { kcal: 'Kalorien', protein: 'Protein', fiber: 'Ballaststoffe' }

export function TrendsPage({ meals }: Props) {
  const [metric, setMetric] = useState<Metric>('kcal')

  const days = useMemo(() => {
    const result: { date: string; label: string; value: number; meals: Meal[] }[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      const label = d.toLocaleDateString('de', { weekday: 'short' })
      const dayMeals = meals.filter(m => m.createdAt.startsWith(key))
      const value = dayMeals.reduce((sum, m) => {
        if (metric === 'kcal') return sum + (m.generatedRecipe?.totalCalories ?? 0)
        if (metric === 'protein') return sum + (m.generatedRecipe?.totalProtein ?? 0)
        return sum + (m.generatedRecipe?.totalFiber ?? 0)
      }, 0)
      result.push({ date: key, label, value, meals: dayMeals })
    }
    return result
  }, [meals, metric])

  const maxVal = Math.max(...days.map(d => d.value), 1)
  const avgKcal = days.reduce((s, d) => s + (meals.filter(m => m.createdAt.startsWith(d.date)).reduce((a, m) => a + (m.generatedRecipe?.totalCalories ?? 0), 0)), 0) / 7
  const totalMeals = meals.filter(m => days.some(d => m.createdAt.startsWith(d.date))).length
  const bestMeal = meals.filter(m => m.rating > 0).sort((a, b) => b.rating - a.rating)[0]

  const coveredCategories = useMemo(() => {
    const cats = new Set(meals.flatMap(m => m.ingredientEntries.map(e => e.ingredientId.slice(0, 6))))
    return cats.size
  }, [meals])

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <h1 className="text-xl font-bold">Wochenrückblick</h1>

      {/* Metric toggle */}
      <div className="flex gap-2">
        {(Object.keys(METRIC_LABELS) as Metric[]).map(m => (
          <button key={m} onClick={() => setMetric(m)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${metric === m ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-[#2c2c2e] text-gray-500'}`}>
            {METRIC_LABELS[m]}
          </button>
        ))}
      </div>

      {/* Bar chart */}
      <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-4">
        <div className="flex items-end gap-2 h-32">
          {days.map(day => (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end justify-center" style={{ height: '100px' }}>
                <div
                  className="w-full max-w-8 bg-orange-400 rounded-t-md transition-all"
                  style={{ height: `${(day.value / maxVal) * 100}%`, minHeight: day.value > 0 ? '4px' : '0' }}
                />
              </div>
              <span className="text-[10px] text-gray-400">{day.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-red-500">{totalMeals}</div>
          <div className="text-xs text-gray-400 mt-0.5">Meals</div>
        </div>
        <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-orange-500">{Math.round(avgKcal)}</div>
          <div className="text-xs text-gray-400 mt-0.5">Ø kcal/Tag</div>
        </div>
        <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-green-500">{coveredCategories}</div>
          <div className="text-xs text-gray-400 mt-0.5">Kategorien</div>
        </div>
      </div>

      {/* Best meal */}
      {bestMeal && (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-4">
          <div className="text-xs text-gray-400 mb-1">Bestes Meal der Woche</div>
          <div className="font-semibold">{bestMeal.generatedRecipe?.title ?? 'Meal'}</div>
          <div className="flex items-center gap-1 text-yellow-400 text-sm mt-1">
            {'★'.repeat(bestMeal.rating)}
          </div>
        </div>
      )}
    </div>
  )
}
