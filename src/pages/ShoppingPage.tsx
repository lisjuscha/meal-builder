import { Trash2 } from 'lucide-react'
import type { ShoppingListItem, Ingredient } from '../types'

interface Props {
  items: ShoppingListItem[]
  ingredients: Ingredient[]
  onToggle: (item: ShoppingListItem) => void
  onRemove: (id: string) => void
  onClear: () => void
}

export function ShoppingPage({ items, ingredients, onToggle, onRemove, onClear }: Props) {
  const ingMap = new Map(ingredients.map(i => [i.id, i]))
  const unchecked = items.filter(i => !i.checked)
  const checked = items.filter(i => i.checked)

  return (
    <div className="px-4 pt-4 pb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Einkaufsliste</h1>
        {items.length > 0 && (
          <button onClick={onClear} className="text-sm text-red-400 font-medium">Leeren</button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-8 text-center text-sm text-gray-400">
          Noch keine Artikel.<br />Füge Zutaten aus einem Meal hinzu.
        </div>
      ) : (
        <div className="space-y-3">
          {unchecked.length > 0 && (
            <div className="bg-white dark:bg-[#1c1c1e] rounded-xl overflow-hidden">
              {unchecked.map((item, i) => {
                const ing = ingMap.get(item.ingredientId)
                return (
                  <div key={item.id} className={`flex items-center gap-3 px-4 py-3 ${i < unchecked.length - 1 ? 'border-b border-gray-100 dark:border-[#38383a]' : ''}`}>
                    <button
                      onClick={() => onToggle(item)}
                      className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-[#48484a] shrink-0"
                    />
                    <div className="flex-1 text-sm">
                      <span className="font-medium">{ing?.name ?? item.ingredientId}</span>
                      <span className="text-gray-400 ml-2">{Math.round(item.amountGrams)} g</span>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="text-gray-300 dark:text-[#636366]">
                      <Trash2 size={14} />
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {checked.length > 0 && (
            <div className="bg-white dark:bg-[#1c1c1e] rounded-xl overflow-hidden opacity-50">
              {checked.map((item, i) => {
                const ing = ingMap.get(item.ingredientId)
                return (
                  <div key={item.id} className={`flex items-center gap-3 px-4 py-3 ${i < checked.length - 1 ? 'border-b border-gray-100 dark:border-[#38383a]' : ''}`}>
                    <button
                      onClick={() => onToggle(item)}
                      className="w-6 h-6 rounded-full border-2 border-orange-500 bg-orange-500 shrink-0 flex items-center justify-center"
                    >
                      <span className="text-white text-xs">✓</span>
                    </button>
                    <div className="flex-1 text-sm line-through text-gray-400">
                      {ing?.name ?? item.ingredientId}
                      <span className="ml-2">{Math.round(item.amountGrams)} g</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
