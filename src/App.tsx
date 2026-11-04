import { useState, useMemo } from 'react'
import { BottomNav } from './components/BottomNav'
import { MealBuilder } from './components/MealBuilder'
import { FridgePicker } from './components/FridgePicker'
import { RecipeImport } from './components/RecipeImport'
import { HomePage } from './pages/HomePage'
import { TrendsPage } from './pages/TrendsPage'
import { ShoppingPage } from './pages/ShoppingPage'
import { SettingsPage } from './pages/SettingsPage'
import { MealPlanPage } from './pages/MealPlanPage'
import { useAppData } from './hooks/useAppData'
import type { SelectedEntry, CookingStyle, MealType, MealTemplate, Meal, ShoppingListItem } from './types'
import { generateRecipe } from './utils/recipeGenerator'

type Tab = 'home' | 'builder' | 'trends' | 'shop' | 'settings'
type Overlay = 'fridge' | 'import' | 'plan' | null

export default function App() {
  const [tab, setTab] = useState<Tab>('home')
  const [overlay, setOverlay] = useState<Overlay>(null)
  const [builderPreload, setBuilderPreload] = useState<{ entries: { ingredientId: string; amountGrams: number }[] } | null>(null)
  const [dailyKcalGoal, setDailyKcalGoal] = useState(() => Number(localStorage.getItem('dailyKcalGoal') ?? 2000))
  const [cycleEnabled, setCycleEnabled] = useState(() => localStorage.getItem('cycleEnabled') === 'true')
  const [cyclePhase, setCyclePhase] = useState(() => localStorage.getItem('cyclePhase') ?? 'Follikulär')

  const data = useAppData()
  const ingMap = useMemo(() => new Map(data.ingredients.map(i => [i.id, i])), [data.ingredients])

  if (!data.ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400 text-sm">Lädt…</div>
      </div>
    )
  }

  function handleSaveMeal(entries: SelectedEntry[], mealType: MealType, portionCount: number, style: CookingStyle) {
    const recipe = generateRecipe(entries, portionCount, style, mealType)
    const meal: Meal = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      mealType,
      ingredientEntries: entries.map(e => ({ ingredientId: e.ingredient.id, amountGrams: e.amountGrams })),
      generatedRecipe: recipe,
      portionCount,
      rating: 0,
      note: '',
    }
    data.saveMeal(meal)
    setBuilderPreload(null)
    setTab('home')
  }

  function handleSaveTemplate(t: Omit<MealTemplate, 'id' | 'createdAt'>) {
    data.saveTemplate({ ...t, id: crypto.randomUUID(), createdAt: new Date().toISOString() })
  }

  function handleOpenBuilder(preload?: { entries: { ingredientId: string; amountGrams: number }[] }) {
    setBuilderPreload(preload ?? null)
    setOverlay(null)
    setTab('builder')
  }

  function handleAddToShopping(meal: Meal) {
    const items: ShoppingListItem[] = meal.ingredientEntries.map(entry => ({
      id: crypto.randomUUID(),
      ingredientId: entry.ingredientId,
      amountGrams: entry.amountGrams * meal.portionCount,
      checked: false,
    }))
    data.addShoppingItems(items)
    setTab('shop')
  }

  function handleCycleToggle(v: boolean) {
    setCycleEnabled(v)
    localStorage.setItem('cycleEnabled', String(v))
  }

  function handleCyclePhaseChange(v: string) {
    setCyclePhase(v)
    localStorage.setItem('cyclePhase', v)
  }

  const builderInitialEntries: SelectedEntry[] = useMemo(() => {
    if (!builderPreload) return []
    return builderPreload.entries.flatMap(e => {
      const ing = ingMap.get(e.ingredientId)
      return ing ? [{ ingredient: ing, amountGrams: e.amountGrams }] : []
    })
  }, [builderPreload, ingMap])

  return (
    <div className="max-w-md mx-auto min-h-screen">
      {/* Overlays */}
      {overlay === 'fridge' && (
        <FridgePicker
          ingredients={data.ingredients}
          onConfirm={entries => handleOpenBuilder({ entries })}
          onClose={() => setOverlay(null)}
        />
      )}
      {overlay === 'import' && (
        <RecipeImport
          ingredients={data.ingredients}
          onConfirm={entries => handleOpenBuilder({ entries })}
          onClose={() => setOverlay(null)}
        />
      )}
      {overlay === 'plan' && (
        <MealPlanPage
          plannedMeals={data.plannedMeals}
          meals={data.meals}
          onAdd={data.savePlannedMeal}
          onRemove={data.removePlannedMeal}
          onOpenBuilder={() => { setOverlay(null); setTab('builder') }}
        />
      )}

      <main className="pb-20">
        {tab === 'home' && (
          <HomePage
            meals={data.meals}
            templates={data.templates}
            ingredients={data.ingredients}
            onRemoveMeal={data.removeMeal}
            onRemoveTemplate={data.removeTemplate}
            onOpenBuilder={handleOpenBuilder}
            onUpdateMeal={data.saveMeal}
            onAddToShopping={handleAddToShopping}
            onOpenFridge={() => setOverlay('fridge')}
            onOpenImport={() => setOverlay('import')}
            onOpenPlan={() => setOverlay('plan')}
          />
        )}
        {tab === 'builder' && (
          <div className="pt-4">
            <h1 className="text-xl font-bold px-4 mb-2">Meal Builder</h1>
            <MealBuilder
              key={JSON.stringify(builderPreload)}
              ingredients={data.ingredients}
              initialEntries={builderInitialEntries}
              onSave={handleSaveMeal}
              onSaveTemplate={handleSaveTemplate}
            />
          </div>
        )}
        {tab === 'trends' && <TrendsPage meals={data.meals} />}
        {tab === 'shop' && (
          <ShoppingPage
            items={data.shoppingList}
            ingredients={data.ingredients}
            onToggle={data.toggleShoppingItem}
            onRemove={data.removeShoppingItem}
            onClear={data.clearShopping}
          />
        )}
        {tab === 'settings' && (
          <SettingsPage
            dailyKcalGoal={dailyKcalGoal}
            onGoalChange={setDailyKcalGoal}
            cycleEnabled={cycleEnabled}
            cyclePhase={cyclePhase}
            onCycleToggle={handleCycleToggle}
            onCyclePhaseChange={handleCyclePhaseChange}
            ingredients={data.ingredients}
            onSaveIngredient={data.saveIngredient}
            onRemoveIngredient={data.removeIngredient}
          />
        )}
      </main>
      <BottomNav active={tab} onChange={setTab} />
    </div>
  )
}
