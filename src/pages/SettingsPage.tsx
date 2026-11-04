import { useRef, useState } from 'react'
import { FileText } from 'lucide-react'
import type { Ingredient, IngredientCategory } from '../types'
import { exportAllData, importAllData } from '../db'

const CATEGORIES: IngredientCategory[] = ['Protein', 'Kohlenhydrate', 'Gemüse', 'Obst', 'Milchprodukt', 'Fett', 'Gewürz']

interface Props {
  dailyKcalGoal: number
  onGoalChange: (v: number) => void
  cycleEnabled: boolean
  cyclePhase: string
  onCycleToggle: (v: boolean) => void
  onCyclePhaseChange: (v: string) => void
  ingredients: Ingredient[]
  onSaveIngredient: (i: Ingredient) => void
  onRemoveIngredient: (id: string) => void
  onOpenImport: () => void
}

export function SettingsPage({ dailyKcalGoal, onGoalChange, cycleEnabled, cyclePhase, onCycleToggle, onCyclePhaseChange, ingredients, onSaveIngredient, onRemoveIngredient, onOpenImport }: Props) {
  const [goal, setGoal] = useState(String(dailyKcalGoal))
  const [showAddIngredient, setShowAddIngredient] = useState(false)
  const [newIng, setNewIng] = useState({ name: '', category: 'Protein' as IngredientCategory, caloriesPer100g: '', proteinPer100g: '', fatPer100g: '', carbsPer100g: '' })
  const [backupStatus, setBackupStatus] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const PHASES = ['Menstruation', 'Follikulär', 'Ovulation', 'Luteal']

  async function handleExport() {
    try {
      const data = await exportAllData()
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `meal-backup-${new Date().toISOString().slice(0, 10)}.json`
      a.click()
      URL.revokeObjectURL(url)
      setBackupStatus('Backup gespeichert')
      setTimeout(() => setBackupStatus(null), 3000)
    } catch {
      setBackupStatus('Export fehlgeschlagen')
    }
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      const data = JSON.parse(text)
      await importAllData(data)
      setBackupStatus('Wiederhergestellt — App wird neu geladen…')
      setTimeout(() => window.location.reload(), 1200)
    } catch {
      setBackupStatus('Import fehlgeschlagen — Datei ungültig?')
    }
    e.target.value = ''
  }

  function saveGoal() {
    const v = Number(goal)
    if (v > 0) { onGoalChange(v); localStorage.setItem('dailyKcalGoal', String(v)) }
  }

  function addIngredient() {
    if (!newIng.name) return
    onSaveIngredient({
      id: crypto.randomUUID(),
      name: newIng.name,
      category: newIng.category,
      caloriesPer100g: Number(newIng.caloriesPer100g) || 0,
      proteinPer100g: Number(newIng.proteinPer100g) || 0,
      fatPer100g: Number(newIng.fatPer100g) || 0,
      carbsPer100g: Number(newIng.carbsPer100g) || 0,
      saturatedFatPer100g: 0,
      fiberPer100g: 0,
      defaultAmountGrams: 100,
      isFavorite: false,
    })
    setNewIng({ name: '', category: 'Protein', caloriesPer100g: '', proteinPer100g: '', fatPer100g: '', carbsPer100g: '' })
    setShowAddIngredient(false)
  }

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <h1 className="text-xl font-bold">Einstellungen</h1>

      {/* Kcal goal */}
      <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-4">
        <h2 className="font-semibold mb-3">Tägliches Kalorienziel</h2>
        <div className="flex gap-2">
          <input
            type="number"
            value={goal}
            onChange={e => setGoal(e.target.value)}
            className="flex-1 border border-gray-200 dark:border-[#48484a] rounded-xl px-4 py-2.5 text-sm bg-transparent"
            placeholder="2000"
          />
          <button onClick={saveGoal} className="bg-orange-500 text-white rounded-xl px-4 py-2.5 text-sm font-medium">
            Speichern
          </button>
        </div>
      </div>

      {/* Cycle */}
      <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Zyklusbasierte Empfehlungen</h2>
          <button
            onClick={() => onCycleToggle(!cycleEnabled)}
            className={`w-12 h-6 rounded-full transition-colors ${cycleEnabled ? 'bg-orange-500' : 'bg-gray-200 dark:bg-[#3a3a3c]'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${cycleEnabled ? 'translate-x-6' : ''}`} />
          </button>
        </div>
        {cycleEnabled && (
          <div>
            <p className="text-xs text-gray-400 mb-3">Keine medizinische Beratung. Nur zur Orientierung.</p>
            <div className="flex gap-2 flex-wrap">
              {PHASES.map(p => (
                <button key={p} onClick={() => onCyclePhaseChange(p)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${cyclePhase === p ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-[#2c2c2e] text-gray-500'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Ingredient management */}
      <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Zutaten ({ingredients.length})</h2>
          <button onClick={() => setShowAddIngredient(!showAddIngredient)} className="text-orange-500 text-sm font-medium">
            + Hinzufügen
          </button>
        </div>

        {showAddIngredient && (
          <div className="space-y-2 mb-4 p-3 bg-gray-50 dark:bg-[#2c2c2e] rounded-xl">
            <input className="w-full border border-gray-200 dark:border-[#48484a] rounded-lg px-3 py-2 text-sm bg-white dark:bg-[#1c1c1e]" placeholder="Name" value={newIng.name} onChange={e => setNewIng(p => ({ ...p, name: e.target.value }))} />
            <select className="w-full border border-gray-200 dark:border-[#48484a] rounded-lg px-3 py-2 text-sm bg-white dark:bg-[#1c1c1e]" value={newIng.category} onChange={e => setNewIng(p => ({ ...p, category: e.target.value as IngredientCategory }))}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="grid grid-cols-2 gap-2">
              <input className="border border-gray-200 dark:border-[#48484a] rounded-lg px-3 py-2 text-sm bg-white dark:bg-[#1c1c1e]" placeholder="kcal/100g" type="number" value={newIng.caloriesPer100g} onChange={e => setNewIng(p => ({ ...p, caloriesPer100g: e.target.value }))} />
              <input className="border border-gray-200 dark:border-[#48484a] rounded-lg px-3 py-2 text-sm bg-white dark:bg-[#1c1c1e]" placeholder="Protein/100g" type="number" value={newIng.proteinPer100g} onChange={e => setNewIng(p => ({ ...p, proteinPer100g: e.target.value }))} />
              <input className="border border-gray-200 dark:border-[#48484a] rounded-lg px-3 py-2 text-sm bg-white dark:bg-[#1c1c1e]" placeholder="Fett/100g" type="number" value={newIng.fatPer100g} onChange={e => setNewIng(p => ({ ...p, fatPer100g: e.target.value }))} />
              <input className="border border-gray-200 dark:border-[#48484a] rounded-lg px-3 py-2 text-sm bg-white dark:bg-[#1c1c1e]" placeholder="Kohlenhydrate/100g" type="number" value={newIng.carbsPer100g} onChange={e => setNewIng(p => ({ ...p, carbsPer100g: e.target.value }))} />
            </div>
            <button onClick={addIngredient} className="w-full bg-orange-500 text-white rounded-lg py-2 text-sm font-medium">Zutat speichern</button>
          </div>
        )}

        <div className="max-h-64 overflow-y-auto space-y-0.5">
          {ingredients.slice(0, 20).map(ing => (
            <div key={ing.id} className="flex items-center justify-between py-1.5 text-sm">
              <span>{ing.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{ing.category}</span>
                <button onClick={() => onRemoveIngredient(ing.id)} className="text-gray-300 dark:text-[#636366] text-xs">✕</button>
              </div>
            </div>
          ))}
          {ingredients.length > 20 && <p className="text-xs text-gray-400 pt-1">… und {ingredients.length - 20} weitere</p>}
        </div>
      </div>

      {/* Backup */}
      <div className="bg-white dark:bg-[#1c1c1e] rounded-xl overflow-hidden">
        <button
          onClick={onOpenImport}
          className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
        >
          <FileText size={18} className="text-orange-500 shrink-0" />
          <span className="text-sm font-medium">Rezept importieren</span>
        </button>
      </div>

      <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-4">
        <h2 className="font-semibold mb-1">Datensicherung</h2>
        <p className="text-xs text-gray-400 mb-3">Alle Meals, Vorlagen und Einstellungen als JSON-Datei sichern. So gehen keine Daten verloren, wenn der Browser-Cache geleert wird.</p>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex-1 bg-orange-500 text-white rounded-xl py-2.5 text-sm font-medium"
          >
            Exportieren
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 bg-gray-100 dark:bg-[#2c2c2e] text-gray-700 dark:text-[#d1d1d6] rounded-xl py-2.5 text-sm font-medium"
          >
            Importieren
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImport}
        />
        {backupStatus && (
          <p className="text-xs text-center mt-2 text-orange-600 dark:text-orange-400">{backupStatus}</p>
        )}
      </div>
    </div>
  )
}
