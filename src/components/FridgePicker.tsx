import { useState, useMemo, useRef, useEffect } from 'react'
import { Check } from 'lucide-react'
import type { Ingredient, IngredientCategory, CookingStyle } from '../types'
import { getHealthTags, isInSeason } from '../utils'

const CATEGORIES: IngredientCategory[] = ['Protein', 'Kohlenhydrate', 'Gemüse', 'Obst', 'Milchprodukt', 'Fett', 'Gewürz']
const STYLES: CookingStyle[] = ['Klassisch', 'Asiatisch', 'Mediterran']

const STORAGE_KEY = 'fridgeSelection'

interface Props {
  ingredients: Ingredient[]
  onConfirm: (entries: { ingredientId: string; amountGrams: number }[], style: CookingStyle) => void
  onClose: () => void
}

export function FridgePicker({ ingredients, onConfirm, onClose }: Props) {
  const [selected, setSelected] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? new Set(JSON.parse(saved) as string[]) : new Set()
    } catch { return new Set() }
  })
  const [style, setStyle] = useState<CookingStyle>('Klassisch')
  const startX = useRef(0)
  const startY = useRef(0)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...selected]))
  }, [selected])

  function toggle(id: string) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function clearAll() {
    setSelected(new Set())
  }

  const selectedIngredients = useMemo(
    () => ingredients.filter(i => selected.has(i.id)),
    [ingredients, selected]
  )

  function confirm() {
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

    onConfirm(combo.map(i => ({ ingredientId: i.id, amountGrams: i.defaultAmountGrams })), style)
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
          <div className="flex items-center gap-3">
            {selected.size > 0 && (
              <button onClick={clearAll} className="text-xs text-gray-400 underline">Alles löschen</button>
            )}
            <span className="text-sm text-gray-400">{selected.size} ausgewählt</span>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-1">Was hab ich daheim?</h2>
        <p className="text-sm text-gray-500 mb-4">Tippe an was du hast — wird für nächstes Mal gespeichert.</p>

        {/* Style picker */}
        <div className="flex gap-2 mb-4">
          {STYLES.map(s => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
                style === s
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 dark:bg-[#1c1c1e] text-gray-600 dark:text-[#c7c7cc]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {CATEGORIES.map(cat => {
            const catIngredients = ingredients
              .filter(i => i.category === cat)
              .sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0))
            if (catIngredients.length === 0) return null
            const selectedCount = catIngredients.filter(i => selected.has(i.id)).length
            return (
              <div key={cat} className="bg-white dark:bg-[#1c1c1e] rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 border-b border-gray-100 dark:border-[#38383a] flex items-center justify-between">
                  <span className="font-semibold text-sm">{cat}</span>
                  {selectedCount > 0 && (
                    <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded-full">{selectedCount}</span>
                  )}
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
                        {ing.isFavorite && !isSelected && <span className="text-yellow-400 text-xs">★</span>}
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
            onClick={confirm}
            className="w-full bg-orange-500 text-white rounded-xl py-3.5 font-bold text-base"
          >
            {style} · Meal Builder öffnen →
          </button>
        </div>
      )}
    </div>
  )
}
