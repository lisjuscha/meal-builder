import type { Ingredient, IngredientCategory } from '../types'

export const SEASON_MAP: Record<string, number[]> = {
  Spargel: [4, 5, 6],
  Kürbis: [9, 10, 11],
  Erdbeeren: [5, 6, 7],
  Tomaten: [7, 8, 9],
  Zucchini: [6, 7, 8, 9],
  Spinat: [3, 4, 5, 9, 10],
  Brokkoli: [6, 7, 8, 9, 10],
  Karotte: [7, 8, 9, 10, 11],
  Paprika: [7, 8, 9],
  Apfel: [8, 9, 10, 11],
  Birne: [8, 9, 10],
}

export function isInSeason(name: string): boolean {
  const month = new Date().getMonth() + 1
  for (const [key, months] of Object.entries(SEASON_MAP)) {
    if (name.toLowerCase().includes(key.toLowerCase())) {
      return months.includes(month)
    }
  }
  return false
}

export type HealthTag = {
  label: string
  color: string
}

const HEALTH_TAG_RULES: { keywords: string[]; tag: HealthTag }[] = [
  { keywords: ['lachs', 'makrele', 'leinöl', 'chiasamen', 'walnuss'], tag: { label: 'Omega-3', color: 'bg-blue-100 text-blue-800' } },
  { keywords: ['beeren', 'spinat', 'paprika', 'brokkoli', 'kurkuma'], tag: { label: 'Antioxidantien', color: 'bg-purple-100 text-purple-800' } },
  { keywords: ['chiasamen', 'haferflocken', 'linsen', 'quinoa', 'vollkornnudeln', 'avocado'], tag: { label: 'Ballaststoffreich', color: 'bg-green-100 text-green-800' } },
  { keywords: ['spinat', 'linsen', 'rinderhack', 'tofu', 'kürbiskerne'], tag: { label: 'Eisenreich', color: 'bg-red-100 text-red-800' } },
  { keywords: ['paprika', 'zitrone', 'brokkoli', 'spinat', 'beeren'], tag: { label: 'Vitamin C', color: 'bg-orange-100 text-orange-800' } },
]

export function getHealthTags(ingredient: Ingredient): HealthTag[] {
  const nameLower = ingredient.name.toLowerCase()
  return HEALTH_TAG_RULES
    .filter(rule => rule.keywords.some(k => nameLower.includes(k)))
    .map(rule => rule.tag)
}

export function categoryDefaultAmount(category: IngredientCategory): number {
  const map: Record<IngredientCategory, number> = {
    Protein: 150, Kohlenhydrate: 80, Gemüse: 150, Fett: 15,
    Milchprodukt: 150, Gewürz: 10, Obst: 100,
  }
  return map[category]
}

export function formatGrams(g: number): string {
  return `${Math.round(g)} g`
}

export function formatKcal(kcal: number): string {
  return `${Math.round(kcal)} kcal`
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

const CYCLE_PHASE_KEYWORDS: Record<string, string[]> = {
  Menstruation: ['spinat', 'linse', 'kürbiskern', 'brokkoli', 'beere', 'lachs', 'tofu', 'rinderhack', 'heidelbeere', 'himbeere', 'ingwer', 'rote bete', 'bohne'],
  Follikulär: ['brokkoli', 'paprika', 'avocado', 'quinoa', 'hähnchen', 'ei', 'beere', 'spinat', 'rucola', 'feldsalat', 'chiasamen', 'leinsamen', 'lachs', 'putenbrust'],
  Ovulation: ['avocado', 'lachs', 'spinat', 'brokkoli', 'tofu', 'beere', 'zitrone', 'kurkuma', 'tomaten', 'gurke', 'paprika', 'karotte', 'rucola', 'granatapfel'],
  Luteal: ['süßkartoffel', 'haferflocken', 'lachs', 'mandel', 'nuss', 'chiasamen', 'avocado', 'spinat', 'banane', 'schokolade', 'linse', 'quinoa', 'kürbis', 'walnuss'],
}

export function isCycleRecommended(ingredientName: string, cyclePhase: string): boolean {
  const keywords = CYCLE_PHASE_KEYWORDS[cyclePhase] ?? []
  const nameLower = ingredientName.toLowerCase()
  return keywords.some(k => nameLower.includes(k))
}
