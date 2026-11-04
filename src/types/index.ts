export type IngredientCategory =
  | 'Protein'
  | 'Kohlenhydrate'
  | 'Gemüse'
  | 'Fett'
  | 'Milchprodukt'
  | 'Gewürz'
  | 'Obst'

export type MealType = 'Frühstück' | 'Mittagessen' | 'Abendessen' | 'Snack'

export type CookingStyle = 'Klassisch' | 'Asiatisch' | 'Mediterran'

export type CyclePhase = 'Menstruation' | 'Follikulär' | 'Ovulation' | 'Luteal'

export type TrafficLight = 'green' | 'yellow' | 'red'

export interface Ingredient {
  id: string
  name: string
  category: IngredientCategory
  caloriesPer100g: number
  proteinPer100g: number
  fatPer100g: number
  carbsPer100g: number
  saturatedFatPer100g: number
  fiberPer100g: number
  defaultAmountGrams: number
  isFavorite: boolean
}

export interface IngredientEntry {
  ingredientId: string
  amountGrams: number
}

export interface RecipeStep {
  id: string
  text: string
}

export interface GeneratedRecipe {
  title: string
  steps: RecipeStep[]
  estimatedTimeMinutes: number
  totalCalories: number
  totalProtein: number
  totalFat: number
  totalCarbs: number
  totalSaturatedFat: number
  totalFiber: number
  portionCount: number
  style: CookingStyle
}

export interface Meal {
  id: string
  createdAt: string
  mealType: MealType
  ingredientEntries: IngredientEntry[]
  generatedRecipe: GeneratedRecipe | null
  portionCount: number
  rating: number
  note: string
}

export interface MealTemplate {
  id: string
  title: string
  mealType: MealType
  ingredientEntries: IngredientEntry[]
  createdAt: string
}

export interface PlannedMeal {
  id: string
  plannedDate: string
  mealType: MealType
  mealId: string | null
}

export interface ShoppingListItem {
  id: string
  ingredientId: string
  amountGrams: number
  checked: boolean
}

export interface SelectedEntry {
  ingredient: Ingredient
  amountGrams: number
}
