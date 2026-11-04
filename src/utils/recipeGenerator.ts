import type { SelectedEntry, GeneratedRecipe, CookingStyle, MealType, RecipeStep, TrafficLight } from '../types'

const STYLES: Record<CookingStyle, { spiceHint: string; verb: string; titleSuffix: string; plating: string }> = {
  Klassisch:  { spiceHint: 'Salz, Pfeffer und frischen Kräutern', verb: 'in der Pfanne anbraten', titleSuffix: '', plating: 'Alle Komponenten anrichten und servieren.' },
  Asiatisch:  { spiceHint: 'Sojasoße, Ingwer und Sesamöl', verb: 'im Wok bei starker Hitze kurz anbraten', titleSuffix: ' (asiatisch)', plating: 'In Schalen anrichten, optional mit Sesam und Frühlingszwiebeln garnieren.' },
  Mediterran: { spiceHint: 'Olivenöl, Knoblauch und Basilikum', verb: 'mit Olivenöl bei mittlerer Hitze garen', titleSuffix: ' (mediterran)', plating: 'Auf Tellern anrichten und mit frischen Kräutern sowie einem Spritzer Zitrone servieren.' },
}

function step(text: string): RecipeStep {
  return { id: crypto.randomUUID(), text }
}

function amountLabel(entry: SelectedEntry, portions: number): string {
  return `${Math.round(entry.amountGrams * portions)} g ${entry.ingredient.name}`
}

export function generateRecipe(
  entries: SelectedEntry[],
  portionCount: number,
  style: CookingStyle,
  _mealType: MealType,
): GeneratedRecipe {
  const s = STYLES[style]
  const protein   = entries.find(e => e.ingredient.category === 'Protein')
  const carb      = entries.find(e => e.ingredient.category === 'Kohlenhydrate')
  const vegetables = entries.filter(e => e.ingredient.category === 'Gemüse')
  const fruits    = entries.filter(e => e.ingredient.category === 'Obst')
  const dairy     = entries.filter(e => e.ingredient.category === 'Milchprodukt')
  const spices    = entries.filter(e => e.ingredient.category === 'Gewürz')
  const fats      = entries.filter(e => e.ingredient.category === 'Fett')

  // Title
  let title = 'Gemischte Bowl'
  if (protein && carb) title = `${protein.ingredient.name} mit ${carb.ingredient.name}`
  else if (protein) title = vegetables[0] ? `${protein.ingredient.name}-Bowl mit ${vegetables[0].ingredient.name}` : `${protein.ingredient.name}-Bowl`
  else if (carb) title = `${carb.ingredient.name}-Bowl`
  title += s.titleSuffix

  // Steps
  const steps: RecipeStep[] = [step('Alle Zutaten abwiegen, waschen und vorbereiten.')]
  if (protein) steps.push(step(`${amountLabel(protein, portionCount)} ${s.verb}, bis es gleichmäßig gar ist.`))
  if (carb) steps.push(step(`${amountLabel(carb, portionCount)} parallel nach Packungsanweisung kochen.`))
  if (vegetables.length) steps.push(step(`${vegetables.map(e => amountLabel(e, portionCount)).join(', ')} waschen, schneiden und kurz andünsten oder roh dazugeben.`))
  if (fruits.length) steps.push(step(`${fruits.map(e => amountLabel(e, portionCount)).join(', ')} klein schneiden und untermischen.`))
  if (dairy.length) steps.push(step(`${dairy.map(e => amountLabel(e, portionCount)).join(', ')} unterrühren oder als Topping verwenden.`))
  if (spices.length) steps.push(step(`Mit ${spices.map(e => amountLabel(e, portionCount)).join(', ')} sowie ${s.spiceHint} abschmecken.`))
  else steps.push(step(`Mit ${s.spiceHint} abschmecken.`))
  if (fats.length) steps.push(step(`${fats.map(e => amountLabel(e, portionCount)).join(', ')} zum Braten verwenden oder am Ende darüber geben.`))
  steps.push(step(s.plating))

  const scale = (key: keyof SelectedEntry['ingredient']) =>
    entries.reduce((sum, e) => sum + (e.ingredient[key] as number) * e.amountGrams / 100, 0)

  return {
    title,
    steps,
    estimatedTimeMinutes: 20 + entries.length * 3,
    totalCalories: scale('caloriesPer100g'),
    totalProtein: scale('proteinPer100g'),
    totalFat: scale('fatPer100g'),
    totalCarbs: scale('carbsPer100g'),
    totalSaturatedFat: scale('saturatedFatPer100g'),
    totalFiber: scale('fiberPer100g'),
    portionCount,
    style,
  }
}

export function getNutritionRating(recipe: GeneratedRecipe, mealType: MealType): TrafficLight {
  const proteinMin: Record<MealType, number> = { Frühstück: 15, Mittagessen: 25, Abendessen: 25, Snack: 8 }
  const proteinOk = recipe.totalProtein >= proteinMin[mealType]
  const satFatOk = recipe.totalSaturatedFat < 10
  const fiberOk = recipe.totalFiber >= 3

  const score = [proteinOk, satFatOk, fiberOk].filter(Boolean).length
  if (score === 3) return 'green'
  if (score >= 1) return 'yellow'
  return 'red'
}
