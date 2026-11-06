import { useState, useEffect, useCallback } from 'react'
import type { Ingredient, Meal, MealTemplate, PlannedMeal, ShoppingListItem } from '../types'
import * as db from '../db'

export function useAppData() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [meals, setMeals] = useState<Meal[]>([])
  const [templates, setTemplates] = useState<MealTemplate[]>([])
  const [plannedMeals, setPlannedMeals] = useState<PlannedMeal[]>([])
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([])
  const [ready, setReady] = useState(false)

  const reload = useCallback(async () => {
    const [i, m, t, p, s] = await Promise.all([
      db.getAllIngredients(),
      db.getAllMeals(),
      db.getAllTemplates(),
      db.getAllPlannedMeals(),
      db.getAllShoppingItems(),
    ])
    setIngredients(i)
    setMeals(m.sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
    setTemplates(t.sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
    setPlannedMeals(p)
    setShoppingList(s)
  }, [])

  useEffect(() => {
    reload().then(() => setReady(true))
  }, [reload])

  const saveMeal = useCallback(async (meal: Meal) => {
    await db.putMeal(meal)
    await reload()
  }, [reload])

  const removeMeal = useCallback(async (id: string) => {
    await db.deleteMeal(id)
    await reload()
  }, [reload])

  const saveTemplate = useCallback(async (t: MealTemplate) => {
    await db.putTemplate(t)
    await reload()
  }, [reload])

  const removeTemplate = useCallback(async (id: string) => {
    await db.deleteTemplate(id)
    await reload()
  }, [reload])

  const saveIngredient = useCallback(async (i: Ingredient) => {
    await db.putIngredient(i)
    await reload()
  }, [reload])

  const removeIngredient = useCallback(async (id: string) => {
    await db.deleteIngredient(id)
    await reload()
  }, [reload])

  const savePlannedMeal = useCallback(async (p: PlannedMeal) => {
    await db.putPlannedMeal(p)
    await reload()
  }, [reload])

  const removePlannedMeal = useCallback(async (id: string) => {
    await db.deletePlannedMeal(id)
    await reload()
  }, [reload])

  const clearPlannedMeals = useCallback(async () => {
    await db.clearPlannedMeals()
    await reload()
  }, [reload])

  const addShoppingItems = useCallback(async (items: ShoppingListItem[]) => {
    await Promise.all(items.map(db.putShoppingItem))
    await reload()
  }, [reload])

  const toggleShoppingItem = useCallback(async (item: ShoppingListItem) => {
    await db.putShoppingItem({ ...item, checked: !item.checked })
    await reload()
  }, [reload])

  const removeShoppingItem = useCallback(async (id: string) => {
    await db.deleteShoppingItem(id)
    await reload()
  }, [reload])

  const clearShopping = useCallback(async () => {
    await db.clearShoppingList()
    await reload()
  }, [reload])

  return {
    ready, ingredients, meals, templates, plannedMeals, shoppingList,
    saveMeal, removeMeal, saveTemplate, removeTemplate,
    saveIngredient, removeIngredient,
    savePlannedMeal, removePlannedMeal, clearPlannedMeals,
    addShoppingItems, toggleShoppingItem, removeShoppingItem, clearShopping,
    reload,
  }
}
