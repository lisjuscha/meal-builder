import { openDB } from 'idb'
import type { DBSchema, IDBPDatabase } from 'idb'
import type { Ingredient, Meal, MealTemplate, PlannedMeal, ShoppingListItem } from '../types'
import { seedIngredients } from '../data/seedData'

interface MealBuilderDB extends DBSchema {
  ingredients: { key: string; value: Ingredient }
  meals: { key: string; value: Meal; indexes: { 'by-date': string } }
  templates: { key: string; value: MealTemplate }
  plannedMeals: { key: string; value: PlannedMeal; indexes: { 'by-date': string } }
  shoppingList: { key: string; value: ShoppingListItem }
}

let dbInstance: IDBPDatabase<MealBuilderDB> | null = null

export async function getDB(): Promise<IDBPDatabase<MealBuilderDB>> {
  if (dbInstance) return dbInstance
  dbInstance = await openDB<MealBuilderDB>('meal-builder', 1, {
    upgrade(db) {
      const ingredientStore = db.createObjectStore('ingredients', { keyPath: 'id' })
      ingredientStore.createIndex
      const mealStore = db.createObjectStore('meals', { keyPath: 'id' })
      mealStore.createIndex('by-date', 'createdAt')
      db.createObjectStore('templates', { keyPath: 'id' })
      const planStore = db.createObjectStore('plannedMeals', { keyPath: 'id' })
      planStore.createIndex('by-date', 'plannedDate')
      db.createObjectStore('shoppingList', { keyPath: 'id' })
    },
  })
  await seedIfEmpty(dbInstance)
  return dbInstance
}

async function seedIfEmpty(db: IDBPDatabase<MealBuilderDB>) {
  const count = await db.count('ingredients')
  if (count === 0) {
    const tx = db.transaction('ingredients', 'readwrite')
    await Promise.all(seedIngredients.map(i => tx.store.put(i)))
    await tx.done
  }
}

// Ingredients
export async function getAllIngredients(): Promise<Ingredient[]> {
  const db = await getDB()
  return db.getAll('ingredients')
}
export async function putIngredient(i: Ingredient): Promise<void> {
  const db = await getDB()
  await db.put('ingredients', i)
}
export async function deleteIngredient(id: string): Promise<void> {
  const db = await getDB()
  await db.delete('ingredients', id)
}

// Meals
export async function getAllMeals(): Promise<Meal[]> {
  const db = await getDB()
  return db.getAll('meals')
}
export async function putMeal(meal: Meal): Promise<void> {
  const db = await getDB()
  await db.put('meals', meal)
}
export async function deleteMeal(id: string): Promise<void> {
  const db = await getDB()
  await db.delete('meals', id)
}

// Templates
export async function getAllTemplates(): Promise<MealTemplate[]> {
  const db = await getDB()
  return db.getAll('templates')
}
export async function putTemplate(t: MealTemplate): Promise<void> {
  const db = await getDB()
  await db.put('templates', t)
}
export async function deleteTemplate(id: string): Promise<void> {
  const db = await getDB()
  await db.delete('templates', id)
}

// Planned Meals
export async function getAllPlannedMeals(): Promise<PlannedMeal[]> {
  const db = await getDB()
  return db.getAll('plannedMeals')
}
export async function putPlannedMeal(p: PlannedMeal): Promise<void> {
  const db = await getDB()
  await db.put('plannedMeals', p)
}
export async function deletePlannedMeal(id: string): Promise<void> {
  const db = await getDB()
  await db.delete('plannedMeals', id)
}

// Shopping List
export async function getAllShoppingItems(): Promise<ShoppingListItem[]> {
  const db = await getDB()
  return db.getAll('shoppingList')
}
export async function putShoppingItem(item: ShoppingListItem): Promise<void> {
  const db = await getDB()
  await db.put('shoppingList', item)
}
export async function deleteShoppingItem(id: string): Promise<void> {
  const db = await getDB()
  await db.delete('shoppingList', id)
}
export async function clearShoppingList(): Promise<void> {
  const db = await getDB()
  await db.clear('shoppingList')
}
