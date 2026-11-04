import { useState, useRef } from 'react'
import { AlertTriangle } from 'lucide-react'
import type { Ingredient } from '../types'

interface MatchedEntry {
  ingredientId: string
  amountGrams: number
  name: string
  matched: boolean
}

interface Props {
  ingredients: Ingredient[]
  onConfirm: (entries: { ingredientId: string; amountGrams: number }[]) => void
  onClose: () => void
}

function parseAmount(text: string): number {
  const match = text.match(/(\d+)\s*(g|ml|kg|stück|stk|el|tl)?/i)
  if (!match) return 100
  const val = Number(match[1])
  const unit = (match[2] ?? 'g').toLowerCase()
  if (unit === 'kg') return val * 1000
  if (unit === 'el') return val * 15
  if (unit === 'tl') return val * 5
  return val
}

function extractEntries(text: string, ingredients: Ingredient[]): MatchedEntry[] {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  const results: MatchedEntry[] = []

  for (const line of lines) {
    const lower = line.toLowerCase()
    const amount = parseAmount(line)
    const matched = ingredients.find(ing =>
      lower.includes(ing.name.toLowerCase()) ||
      ing.name.toLowerCase().split(' ').some(word => word.length > 3 && lower.includes(word))
    )
    if (matched) {
      results.push({ ingredientId: matched.id, amountGrams: amount, name: matched.name, matched: true })
    } else {
      // Extract likely ingredient name (remove numbers and units)
      const name = line.replace(/^\d+[\s,.]*(g|ml|kg|stück|stk|el|tl|x)?\s*/i, '').trim()
      if (name.length > 1) {
        results.push({ ingredientId: '', amountGrams: amount, name, matched: false })
      }
    }
  }
  return results
}

export function RecipeImport({ ingredients, onConfirm, onClose }: Props) {
  const [text, setText] = useState('')
  const [entries, setEntries] = useState<MatchedEntry[] | null>(null)
  const startX = useRef(0)
  const startY = useRef(0)

  function analyze() {
    if (!text.trim()) return
    setEntries(extractEntries(text, ingredients))
  }

  const matched = entries?.filter(e => e.matched) ?? []
  const unmatched = entries?.filter(e => !e.matched) ?? []

  return (
    <div
      className="fixed inset-0 bg-white dark:bg-[#000000] z-50 flex flex-col"
      onTouchStart={e => { startX.current = e.touches[0].clientX; startY.current = e.touches[0].clientY }}
      onTouchEnd={e => { const dx = e.changedTouches[0].clientX - startX.current; if (dx > 80 && dx > Math.abs(e.changedTouches[0].clientY - startY.current)) onClose() }}
    >
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onClose} className="text-gray-400 font-medium text-sm">← Zurück</button>
        </div>
        <h2 className="text-xl font-bold mb-1">Rezept importieren</h2>
        <p className="text-sm text-gray-500 mb-4">Zutaten aus einem Rezept einfügen — eine Zeile pro Zutat.</p>

        {!entries ? (
          <>
            <textarea
              className="w-full border border-gray-200 dark:border-[#48484a] rounded-2xl px-4 py-3 text-sm bg-transparent resize-none mb-3 min-h-40"
              placeholder={"z.B.\n200g Hähnchenbrust\n80g Quinoa\n150g Brokkoli\n10ml Olivenöl"}
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <button
              onClick={analyze}
              disabled={!text.trim()}
              className="w-full bg-orange-500 disabled:opacity-40 text-white rounded-xl py-3 font-semibold"
            >
              Zutaten erkennen
            </button>
          </>
        ) : (
          <>
            {matched.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-orange-500 mb-2">Erkannt ({matched.length})</h3>
                <div className="bg-white dark:bg-[#1c1c1e] rounded-xl overflow-hidden">
                  {matched.map((e, i) => (
                    <div key={i} className={`flex items-center justify-between px-4 py-2.5 text-sm ${i < matched.length - 1 ? 'border-b border-gray-100 dark:border-[#38383a]' : ''}`}>
                      <span className="font-medium">{e.name}</span>
                      <span className="text-gray-400">{Math.round(e.amountGrams)} g</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {unmatched.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-orange-500 mb-2 flex items-center gap-1.5">
                  <AlertTriangle size={13} /> Nicht erkannt ({unmatched.length})
                </h3>
                <div className="bg-orange-50 dark:bg-orange-950 rounded-2xl overflow-hidden">
                  {unmatched.map((e, i) => (
                    <div key={i} className={`px-4 py-2.5 text-sm text-orange-700 dark:text-orange-300 ${i < unmatched.length - 1 ? 'border-b border-orange-100 dark:border-orange-900' : ''}`}>
                      {e.name}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1.5 px-1">Diese Zutaten sind nicht in deiner Datenbank. Du kannst sie in Einstellungen hinzufügen.</p>
              </div>
            )}

            <div className="flex gap-2 mt-2">
              <button onClick={() => setEntries(null)} className="flex-1 bg-gray-100 dark:bg-[#2c2c2e] rounded-xl py-3 text-sm font-medium">
                Nochmal
              </button>
              {matched.length > 0 && (
                <button
                  onClick={() => onConfirm(matched.map(e => ({ ingredientId: e.ingredientId, amountGrams: e.amountGrams })))}
                  className="flex-1 bg-orange-500 text-white rounded-xl py-3 font-semibold"
                >
                  Builder öffnen →
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
