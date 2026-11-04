import { useState, useMemo, useRef } from 'react'
import { Check, AlertTriangle } from 'lucide-react'
import type { Ingredient, IngredientCategory } from '../types'
import { getHealthTags, isInSeason } from '../utils'

const CATEGORIES: IngredientCategory[] = ['Protein', 'Kohlenhydrate', 'Gemüse', 'Obst', 'Milchprodukt', 'Fett', 'Gewürz']

interface Props {
  ingredients: Ingredient[]
  onConfirm: (entries: { ingredientId: string; amountGrams: number }[]) => void
  onClose: () => void
}

export function FridgePicker({ ingredients, onConfirm, onClose }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const startX = useRef(0)
  const startY = useRef(0)

  function toggle(id: string) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const selectedIngredients = useMemo(
    () => ingredients.filter(i => selected.has(i.id)),
    [ingredients, selected]
  )

  const missing = useMemo(() => {
    const cats = new Set(selectedIngredients.map(i => i.category))
    const hints: string[] = []
    if (!cats.has('Protein')) hints.push('Keine Proteinquelle — z.B. Hähnchen, Eier oder Tofu hinzufügen')
    if (!cats.has('Kohlenhydrate')) hints.push('Keine Kohlenhydrate — z.B. Reis, Nudeln oder Quinoa hinzufügen')
    return hints
  }, [selectedIngredients])

  function suggestAndConfirm() {
    const pick = (cat: IngredientCategory, max: number) =>
      selectedIngredients.filter(i => i.category === cat).slice(0, max)

    const combo = [
      ...pick('Protein', 1),
      ...pick('Kohlenhydrate', 1),
      ...pick('Gemüse', 3),
      ...pick('Obst', 1),
      ...pick('Milchprodukt', 1),
      ...pick('Fett', 1),
      ...pick('Gewürz', 2),
    ]

    onConfirm(combo.map(i => ({ ingredientId: i.id, amountGrams: i.defaultAmountGrams })))
  }

  return (
    <div
      className="fixed inset-0 bg-white dark:bg-[#000000] z-50 flex flex-col"
      onTouchStart={e => { startX.current = e.touches[0].clientX < 50 ? e.touches[0].clientX : -1; startY.current = e.touches[0].clientY }}
      onTouchEnd={e => { if (startX.current < 0) return; const dx = e.changedTouches[0].clientX - startX.current; if (dx > 80 && dx > Math.abs(e.changedTouches[0].clientY - startY.current)) onClose() }}
    >
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onClose} className="text-gray-400 font-medium text-sm">← Zurück</button>
          <span className="text-sm text-gray-400">{selected.size} ausgewählt</span>
        </div>
        <h2 className="text-xl font-bold mb-1">Was hab ich daheim?</h2>
        <p className="text-sm text-gray-500 mb-4">Tippe an was du hast — die App wählt eine sinnvolle Kombination.</p>

        {missing.length > 0 && selected.size > 0 && (
          <div className="space-y-1.5 mb-4">
            {missing.map(hint => (
              <div key={hint} className="flex items-start gap-2 text-xs text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950 px-3 py-2 rounded-xl">
                <AlertTriangle size={13} className="shrink-0 mt-0.5" />
                {hint}
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2">
          {CATEGORIES.map(cat => {
            const catIngredients = ingredients.filter(i => i.category === cat)
            if (catIngredients.length === 0) return null
            return (
              <div key={cat} className="bg-white dark:bg-[#1c1c1e] rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 border-b border-gray-100 dark:border-[#38383a]">
                  <span className="font-semibold text-sm">{cat}</span>
                </div>
                <div className="flex flex-wrap gap-2 p-3">
                  {catIngredients.map(ing => {
                    const isSelected = selected.has(ing.id)
                    const tags = getHealthTags(ing)
                    const seasonal = isInSeason(ing.name)
                    return (
                      <button
                        key={ing.id}
                        onClick={() => toggle(ing.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                          isSelected
                            ? 'bg-orange-500 border-orange-500 text-white'
                            : 'bg-gray-50 dark:bg-[#2c2c2e] border-gray-200 dark:border-[#48484a] text-gray-700 dark:text-[#c7c7cc]'
                        }`}
                      >
                        {isSelected && <Check size={12} />}
                        {ing.name}
                        {seasonal && ' 🍃'}
                        {tags.length > 0 && !isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {selected.size > 0 && (
        <div className="p-4 pb-6 bg-white dark:bg-[#000000]">
          <button
            onClick={suggestAndConfirm}
            className="w-full bg-orange-500 text-white rounded-xl py-3.5 font-bold text-base"
          >
            Meal Builder öffnen →
          </button>
        </div>
      )}
    </div>
  )
}
