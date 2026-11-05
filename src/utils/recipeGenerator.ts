import type { SelectedEntry, GeneratedRecipe, CookingStyle, MealType, RecipeStep, TrafficLight } from '../types'

function step(text: string): RecipeStep {
  return { id: crypto.randomUUID(), text }
}

function amount(entry: SelectedEntry, portions: number): string {
  return `${Math.round(entry.amountGrams * portions)} g`
}

// ─── Protein: ingredient-specific cooking per style ───────────────────────────

const PROTEIN_TECHNIQUE: Record<CookingStyle, (name: string, amt: string) => string[]> = {
  Klassisch: (name, amt) => {
    const lower = name.toLowerCase()
    if (lower.includes('lachs') || lower.includes('fisch') || lower.includes('thunfisch')) {
      return [
        `${amt} ${name} trocken tupfen, mit Salz, Pfeffer und etwas Zitronenabrieb würzen.`,
        `Pfanne mit Olivenöl auf mittlere-hohe Hitze bringen. ${name} mit der Hautseite nach unten einlegen, nicht bewegen — 3–4 Min. bis die Haut knusprig ist. Wenden, weitere 2 Min. gart die Restwärme nach.`,
      ]
    }
    if (lower.includes('ei') || lower.includes('eier')) {
      return [
        `Eier aus dem Kühlschrank nehmen, Zimmertemperatur erleichtert gleichmäßiges Stocken.`,
        `Butter in der Pfanne bei mittlerer Hitze schmelzen. Eier aufschlagen — für cremiges Rührei ständig rühren und vor dem Stocken vom Herd nehmen.`,
      ]
    }
    if (lower.includes('tofu')) {
      return [
        `${amt} ${name} in 1–2 cm dicke Scheiben schneiden, mit Küchenpapier fest abdrücken bis möglichst trocken. Mit Salz, Pfeffer und Paprika würzen.`,
        `Pfanne mit etwas Öl stark erhitzen. Tofu-Scheiben einlegen, 3–4 Min. nicht anfassen — erst wenn eine goldbraune Kruste entsteht wenden. Jede Seite min. 3 Min.`,
      ]
    }
    if (lower.includes('bohne') || lower.includes('linse') || lower.includes('kicher')) {
      return [
        `${amt} ${name} (falls aus Dose: abspülen und abtropfen). Mit Kreuzkümmel, Salz und Pfeffer abschmecken.`,
        `In einer Pfanne mit etwas Öl bei mittlerer Hitze 3–4 Min. schwenken bis sie leicht angeröstet sind.`,
      ]
    }
    // Default: chicken, beef, pork
    return [
      `${amt} ${name} auf Zimmertemperatur bringen, trocken tupfen. Großzügig mit Salz und Pfeffer würzen.`,
      `Pfanne mit hocherhitzbarem Öl auf hohe Hitze bringen bis das Öl leicht flimmert. ${name} einlegen — kein Bewegen, 3–4 Min. bis sich das Fleisch von selbst löst. Wenden, weitere 3 Min. Kerntemperatur prüfen: Hähnchen 75°C, Rind je nach Vorliebe.`,
      `${name} vom Herd nehmen, 2–3 Min. ruhen lassen — der Fleischsaft verteilt sich gleichmäßig.`,
    ]
  },
  Asiatisch: (name, amt) => {
    const lower = name.toLowerCase()
    if (lower.includes('tofu')) {
      return [
        `${amt} ${name} würfeln (2 cm), trocken pressen. Mit 2 EL Sojasoße, 1 TL Sesamöl, Knoblauch und Ingwer marinieren.`,
        `Wok oder Pfanne stark erhitzen bis leichter Rauch aufsteigt. Tofu-Würfel in einer Schicht anbraten — hohe Hitze gibt die knusprige Textur, die im Wasser verloren geht.`,
      ]
    }
    if (lower.includes('ei') || lower.includes('eier')) {
      return [
        `Eier mit 1 EL Sojasoße und 1 TL Sesamöl verquirlen.`,
        `Wok stark erhitzen, etwas Öl zugeben. Eimasse hineingießen, sofort rühren und in Stücke brechen — fertig wenn noch leicht feucht. Aus dem Wok nehmen, später wieder dazu.`,
      ]
    }
    return [
      `${amt} ${name} in gleichmäßige Stücke schneiden. Marinade anrühren: 2 EL Sojasoße, 1 TL Sesamöl, 1 TL Reiswein oder Essig, etwas geriebener Ingwer und Knoblauch. ${name} darin mind. 10 Min. ziehen lassen.`,
      `Wok sehr stark erhitzen — er muss so heiß sein, dass Wasser sofort verdampft. Fleisch in kleinen Portionen anbraten (Überfüllung erzeugt Dampf statt Röstaroma). 2–3 Min. auf jeder Seite.`,
    ]
  },
  Mediterran: (name, amt) => {
    const lower = name.toLowerCase()
    if (lower.includes('lachs') || lower.includes('fisch')) {
      return [
        `${amt} ${name} mit Olivenöl, Knoblauch, frischem Thymian oder Rosmarin, Zitronenschale, Salz und Pfeffer einreiben.`,
        `Pfanne mit Olivenöl auf mittlere Hitze bringen. ${name} bei mittlerer Hitze garen — sanfte Hitze erhält die Feuchtigkeit. Zitronensaft kurz vor dem Servieren darüber.`,
      ]
    }
    if (lower.includes('bohne') || lower.includes('linse') || lower.includes('kicher')) {
      return [
        `${amt} ${name} (aus Dose: abgießen und spülen) in Olivenöl mit Knoblauchscheiben und frischen Kräutern 3–4 Min. bei mittlerer Hitze erwärmen.`,
        `Einen Schuss Weißwein oder Zitronensaft zugeben, kurz einkochen lassen.`,
      ]
    }
    return [
      `${amt} ${name} mit Olivenöl, Knoblauch, frischen Kräutern (Rosmarin, Thymian oder Oregano), Zitronenschale, Salz und Pfeffer marinieren — 15 Min. oder länger.`,
      `Grillpfanne oder Bratpfanne stark vorheizen. ${name} auf der heißen Fläche anbraten, dabei nur einmal wenden — Grillmuster und Aromen entstehen durch Kontakt, nicht durch Bewegung.`,
    ]
  },
}

// ─── Carbs: grain/pasta/etc. specific instructions ────────────────────────────

function carbSteps(name: string, amt: string, style: CookingStyle): string[] {
  const lower = name.toLowerCase()
  if (lower.includes('reis')) {
    const riceSteps = ['Reis unter kaltem Wasser waschen bis das Wasser klar bleibt — entfernt überschüssige Stärke.']
    if (style === 'Asiatisch') {
      riceSteps.push(`${amt} Reis mit der 1,2-fachen Menge Wasser in einen Topf, Deckel drauf, aufkochen. Sofort auf niedrigste Hitze reduzieren, 12 Min. dämpfen. Herd aus, 5 Min. nachquellen lassen — Deckel dabei nicht öffnen.`)
    } else {
      riceSteps.push(`${amt} Reis mit etwas Salz und 1,2-facher Menge Wasser aufkochen, auf kleinste Flamme, Deckel drauf, 12 Min. garen.`)
    }
    return riceSteps
  }
  if (lower.includes('nudel') || lower.includes('pasta') || lower.includes('spaghetti')) {
    return [
      `Großen Topf mit reichlich Wasser aufkochen, großzügig salzen (sollte nach Meer schmecken). ${amt} Nudeln nach Packungsanweisung al dente kochen — 1 Min. kürzer als angegeben, sie garen nach. Kochlöffel voll Kochwasser aufheben!`,
    ]
  }
  if (lower.includes('quinoa')) {
    return [
      `${amt} Quinoa kurz in der trockenen Pfanne anrösten (30 Sek.) — verstärkt den nussigen Geschmack. Dann mit der doppelten Menge Wasser aufkochen, auf kleine Hitze, 15 Min. köcheln bis das Wasser aufgesogen ist.`,
    ]
  }
  if (lower.includes('haferflock') || lower.includes('oat')) {
    return [
      `${amt} Haferflocken mit der doppelten Menge Flüssigkeit (Wasser oder Milch) aufkochen, unter Rühren 3–5 Min. bei niedriger Hitze köcheln bis cremig.`,
    ]
  }
  if (lower.includes('brot') || lower.includes('toast') || lower.includes('wrap')) {
    return [
      `${amt} ${name} toasten oder kurz in der trockenen Pfanne anrösten für Textur und Geschmack.`,
    ]
  }
  if (lower.includes('kartoffel') || lower.includes('süßkartoffel')) {
    return [
      `${amt} ${name} schälen und in gleichmäßige Würfel schneiden. In gesalzenem Wasser zum Kochen bringen, 15–20 Min. bis sie weich sind. Oder alternativ als Würfel in der Pfanne mit Öl bei mittlerer Hitze 20 Min. rösten bis goldbraun.`,
    ]
  }
  // generic
  return [
    `${amt} ${name} nach Packungsanweisung zubereiten.`,
  ]
}

// ─── Vegetable preparation per style ──────────────────────────────────────────

function vegSteps(vegs: SelectedEntry[], portions: number, style: CookingStyle): string[] {
  if (vegs.length === 0) return []
  const names = vegs.map(e => `${amount(e, portions)} ${e.ingredient.name}`).join(', ')

  if (style === 'Asiatisch') {
    return [
      `${names} in gleichmäßige, nicht zu kleine Stücke schneiden — Größe bestimmt die Garzeit. Härtere Gemüse (Brokkoli, Karotte) kommen zuerst in den Wok.`,
      `Im heißen Wok: zuerst härteres Gemüse 2 Min. bei starker Hitze, dann weiches Gemüse dazu, nochmal 1–2 Min. Das Gemüse soll noch leichten Biss haben.`,
    ]
  }
  if (style === 'Mediterran') {
    return [
      `${names} waschen und in grobe Stücke schneiden. Mit Olivenöl, Knoblauch und groben Salzkristallen tossen.`,
      `Gemüse bei mittlerer-hoher Hitze rösten, dabei gelegentlich wenden, bis Ränder leicht gebräunt sind — Karamellisierung bringt Süße und Tiefe.`,
    ]
  }
  // Klassisch
  return [
    `${names} vorbereiten: waschen, trocknen, in gleichmäßige Stücke schneiden. Größenunterschiede bedeuten ungleichmäßiges Garen.`,
    `In derselben Pfanne (nach dem Protein) bei mittlerer Hitze 4–5 Min. andünsten — sie sollen weich, aber nicht matschig sein. Mit Salz abschmecken.`,
  ]
}

// ─── Flavor building / finishing per style ────────────────────────────────────

function flavorSteps(
  style: CookingStyle,
  spices: SelectedEntry[],
  fats: SelectedEntry[],
  dairy: SelectedEntry[],
  fruits: SelectedEntry[],
  portions: number,
): string[] {
  const steps: string[] = []

  if (style === 'Klassisch') {
    if (fats.length) {
      steps.push(`${fats.map(e => `${amount(e, portions)} ${e.ingredient.name}`).join(', ')} zum Verfeinern oder Anbraten verwenden.`)
    }
    if (dairy.length) {
      steps.push(`${dairy.map(e => `${amount(e, portions)} ${e.ingredient.name}`).join(', ')} einrühren oder als cremiges Topping darüber geben.`)
    }
    const spiceNames = spices.length ? spices.map(e => e.ingredient.name).join(', ') + ' und ' : ''
    steps.push(`Mit ${spiceNames}frisch gemahlenem Pfeffer, Salz und einem Spritzer Zitronensaft final abschmecken — jetzt erst entscheidet sich die Balance.`)
    if (fruits.length) {
      steps.push(`${fruits.map(e => `${amount(e, portions)} ${e.ingredient.name}`).join(', ')} kleinschneiden und frisch dazugeben — der Säure-Kontrast rundet das Gericht ab.`)
    }
  }

  if (style === 'Asiatisch') {
    steps.push(`Sauce anrühren: 2 EL Sojasoße, 1 TL Sesamöl, 1 TL Reiswein (oder Reisessig), eine Prise Zucker${spices.length ? ', ' + spices.map(e => e.ingredient.name).join(', ') : ''}. Über die Zutaten geben, kurz aufkochen lassen bis sie eindickt.`)
    if (dairy.length) {
      steps.push(`${dairy.map(e => `${amount(e, portions)} ${e.ingredient.name}`).join(', ')} unterrühren.`)
    }
    steps.push('Zum Servieren: mit Sesamkörnern und Frühlingszwiebeln garnieren. Wer mag: Chiliflocken oder frischen Koriander darüber.')
    if (fruits.length) {
      steps.push(`${fruits.map(e => `${amount(e, portions)} ${e.ingredient.name}`).join(', ')} kleinschneiden, frisch als Kontrast dazugeben.`)
    }
  }

  if (style === 'Mediterran') {
    if (fats.length) {
      steps.push(`${fats.map(e => `${amount(e, portions)} ${e.ingredient.name}`).join(', ')} großzügig verwenden — Olivenöl und Fette sind hier Geschmacksträger, kein Luxus.`)
    }
    const spiceNames = spices.length ? spices.map(e => e.ingredient.name).join(', ') + ', ' : ''
    steps.push(`Mit ${spiceNames}frischen Kräutern (Basilikum, Petersilie oder Oregano), Fleur de Sel und einem kräftigen Spritzer Zitronensaft würzen. Fertig ist es dann, wenn es nach mehr schmeckt.`)
    if (dairy.length) {
      steps.push(`${dairy.map(e => `${amount(e, portions)} ${e.ingredient.name}`).join(', ')} als cremiges Element einsetzen oder kalt darüber bröseln/geben.`)
    }
    if (fruits.length) {
      steps.push(`${fruits.map(e => `${amount(e, portions)} ${e.ingredient.name}`).join(', ')} frisch dazugeben für Frische und Farbe.`)
    }
  }

  return steps
}

// ─── Title generation ─────────────────────────────────────────────────────────

const STYLE_TITLE_SUFFIX: Record<CookingStyle, string> = {
  Klassisch: '',
  Asiatisch: ' · Wok',
  Mediterran: ' · Mediterran',
}

const PROTEIN_TITLE_WORDS: Record<string, Record<CookingStyle, string>> = {
  Hähnchen:   { Klassisch: 'Geschmortes Hähnchen', Asiatisch: 'Wok-Hähnchen', Mediterran: 'Kräuter-Hähnchen vom Grill' },
  Lachs:      { Klassisch: 'Gebratener Lachs', Asiatisch: 'Lachs mit Ingwer-Glasur', Mediterran: 'Zitronenlachs' },
  Rinderhack: { Klassisch: 'Rinderhack-Pfanne', Asiatisch: 'Beef-Wok', Mediterran: 'Mediterrane Hackfleisch-Bowl' },
  Tofu:       { Klassisch: 'Knuspriger Tofu', Asiatisch: 'Tofu im Wok', Mediterran: 'Kräuter-Tofu' },
  Eier:       { Klassisch: 'Eierpfanne', Asiatisch: 'Gebratener Reis mit Ei', Mediterran: 'Mediterrane Eier' },
  Thunfisch:  { Klassisch: 'Thunfisch-Bowl', Asiatisch: 'Thunfisch-Wok', Mediterran: 'Niçoise-Bowl' },
}

function buildTitle(
  protein: SelectedEntry | undefined,
  carb: SelectedEntry | undefined,
  vegs: SelectedEntry[],
  style: CookingStyle,
): string {
  const suffix = STYLE_TITLE_SUFFIX[style]

  if (protein) {
    const name = protein.ingredient.name
    const base = PROTEIN_TITLE_WORDS[name]?.[style]
      ?? (style === 'Asiatisch' ? `${name} Wok` : style === 'Mediterran' ? `Mediteraner ${name}` : `${name}-Pfanne`)
    if (carb) return `${base} mit ${carb.ingredient.name}${suffix}`
    if (vegs[0]) return `${base} mit ${vegs[0].ingredient.name}${suffix}`
    return base + suffix
  }
  if (carb && vegs.length >= 2) {
    return style === 'Asiatisch'
      ? `Gebratener ${carb.ingredient.name} mit ${vegs[0].ingredient.name} & ${vegs[1].ingredient.name}`
      : `${carb.ingredient.name} mit ${vegs.map(v => v.ingredient.name).join(', ')}${suffix}`
  }
  if (carb) return `${carb.ingredient.name}-Bowl${suffix}`
  if (vegs.length >= 2) return `${vegs[0].ingredient.name}-${vegs[1].ingredient.name}-Salat`
  return 'Power Bowl' + suffix
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function generateRecipe(
  entries: SelectedEntry[],
  portionCount: number,
  style: CookingStyle,
  _mealType: MealType,
): GeneratedRecipe {
  const protein   = entries.find(e => e.ingredient.category === 'Protein')
  const carb      = entries.find(e => e.ingredient.category === 'Kohlenhydrate')
  const vegetables = entries.filter(e => e.ingredient.category === 'Gemüse')
  const fruits    = entries.filter(e => e.ingredient.category === 'Obst')
  const dairy     = entries.filter(e => e.ingredient.category === 'Milchprodukt')
  const spices    = entries.filter(e => e.ingredient.category === 'Gewürz')
  const fats      = entries.filter(e => e.ingredient.category === 'Fett')

  const title = buildTitle(protein, carb, vegetables, style)

  const steps: RecipeStep[] = []

  // Mise en place
  const miseItems = entries.slice(0, 5).map(e => `${amount(e, portionCount)} ${e.ingredient.name}`)
  steps.push(step(`Mise en place: ${miseItems.join(', ')}${entries.length > 5 ? ' und weitere Zutaten' : ''} abwiegen und bereitstellen. Auf Zimmertemperatur bringen, waschen, schneiden.`))

  // Carbs in parallel — start first if they take long
  if (carb && (carb.ingredient.name.toLowerCase().includes('reis') || carb.ingredient.name.toLowerCase().includes('quinoa') || carb.ingredient.name.toLowerCase().includes('kartoffel'))) {
    for (const s of carbSteps(carb.ingredient.name, amount(carb, portionCount), style)) {
      steps.push(step(s))
    }
  }

  // Protein
  if (protein) {
    for (const s of PROTEIN_TECHNIQUE[style](protein.ingredient.name, amount(protein, portionCount))) {
      steps.push(step(s))
    }
  }

  // Quick carbs (pasta etc.) after protein started
  if (carb && !steps.some(s => s.text.includes(carb.ingredient.name))) {
    for (const s of carbSteps(carb.ingredient.name, amount(carb, portionCount), style)) {
      steps.push(step(s))
    }
  }

  // Vegetables
  for (const s of vegSteps(vegetables, portionCount, style)) {
    steps.push(step(s))
  }

  // Flavor + finishing
  for (const s of flavorSteps(style, spices, fats, dairy, fruits, portionCount)) {
    steps.push(step(s))
  }

  // Plating
  const plating: Record<CookingStyle, string> = {
    Klassisch: carb
      ? `Zum Anrichten: ${carb.ingredient.name} als Basis, ${protein?.ingredient.name ?? 'Zutaten'} darüber${vegetables.length ? `, Gemüse daneben` : ''}. Direkt warm servieren.`
      : `Alle Komponenten anrichten, mit frischen Kräutern garnieren. Warm servieren.`,
    Asiatisch: `In tiefe Schüsseln anrichten. Frühlingszwiebeln, Sesam und wer mag frischen Koriander darüber. Sojasoße zum Nachwürzen bereitstellen.`,
    Mediterran: `Auf warmen Tellern großzügig anrichten. Mit einem guten Schuss Olivenöl beenden, frische Kräuter darüber streuen — Basilikum, Petersilie oder Rucola geben das letzte Aroma.`,
  }
  steps.push(step(plating[style]))

  const scale = (key: keyof SelectedEntry['ingredient']) =>
    entries.reduce((sum, e) => sum + (e.ingredient[key] as number) * e.amountGrams / 100, 0)

  // Estimated time: protein needs more time, some carbs take long
  const timeBase = 15
  const proteinTime = protein ? 15 : 0
  const carbTime = carb ? (carb.ingredient.name.toLowerCase().includes('quinoa') ? 20 : carb.ingredient.name.toLowerCase().includes('kartoffel') ? 25 : carb.ingredient.name.toLowerCase().includes('reis') ? 15 : 12) : 0
  const vegTime = vegetables.length > 0 ? 8 : 0
  const marinateTime = style !== 'Klassisch' && protein ? 10 : 0

  return {
    title,
    steps,
    estimatedTimeMinutes: timeBase + proteinTime + Math.max(carbTime, proteinTime) - Math.min(carbTime, proteinTime) / 2 + vegTime + marinateTime,
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
