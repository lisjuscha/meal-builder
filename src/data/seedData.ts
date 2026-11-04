import type { Ingredient } from '../types'

export const seedIngredients: Ingredient[] = [
  // Protein
  { id: 'ing-001', name: 'Hähnchenbrust', category: 'Protein', caloriesPer100g: 110, proteinPer100g: 23, fatPer100g: 1.5, carbsPer100g: 0, saturatedFatPer100g: 0.4, fiberPer100g: 0, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-002', name: 'Lachs', category: 'Protein', caloriesPer100g: 208, proteinPer100g: 20, fatPer100g: 13, carbsPer100g: 0, saturatedFatPer100g: 2.5, fiberPer100g: 0, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-003', name: 'Eier', category: 'Protein', caloriesPer100g: 155, proteinPer100g: 13, fatPer100g: 11, carbsPer100g: 1, saturatedFatPer100g: 3.1, fiberPer100g: 0, defaultAmountGrams: 120, isFavorite: false },
  { id: 'ing-004', name: 'Thunfisch (Dose)', category: 'Protein', caloriesPer100g: 116, proteinPer100g: 26, fatPer100g: 1, carbsPer100g: 0, saturatedFatPer100g: 0.3, fiberPer100g: 0, defaultAmountGrams: 130, isFavorite: false },
  { id: 'ing-005', name: 'Tofu', category: 'Protein', caloriesPer100g: 76, proteinPer100g: 8, fatPer100g: 4.5, carbsPer100g: 1.5, saturatedFatPer100g: 0.7, fiberPer100g: 0.3, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-006', name: 'Rinderhackfleisch', category: 'Protein', caloriesPer100g: 254, proteinPer100g: 17, fatPer100g: 20, carbsPer100g: 0, saturatedFatPer100g: 8, fiberPer100g: 0, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-007', name: 'Garnelen', category: 'Protein', caloriesPer100g: 85, proteinPer100g: 18, fatPer100g: 1, carbsPer100g: 0.9, saturatedFatPer100g: 0.2, fiberPer100g: 0, defaultAmountGrams: 150, isFavorite: false },

  // Kohlenhydrate
  { id: 'ing-010', name: 'Quinoa', category: 'Kohlenhydrate', caloriesPer100g: 120, proteinPer100g: 4.4, fatPer100g: 1.9, carbsPer100g: 21, saturatedFatPer100g: 0.2, fiberPer100g: 2.8, defaultAmountGrams: 80, isFavorite: false },
  { id: 'ing-011', name: 'Haferflocken', category: 'Kohlenhydrate', caloriesPer100g: 370, proteinPer100g: 13, fatPer100g: 7, carbsPer100g: 58, saturatedFatPer100g: 1.3, fiberPer100g: 10, defaultAmountGrams: 70, isFavorite: false },
  { id: 'ing-012', name: 'Vollkornnudeln', category: 'Kohlenhydrate', caloriesPer100g: 348, proteinPer100g: 13, fatPer100g: 2.5, carbsPer100g: 62, saturatedFatPer100g: 0.4, fiberPer100g: 8, defaultAmountGrams: 80, isFavorite: false },
  { id: 'ing-013', name: 'Basmati-Reis', category: 'Kohlenhydrate', caloriesPer100g: 348, proteinPer100g: 7, fatPer100g: 0.7, carbsPer100g: 77, saturatedFatPer100g: 0.2, fiberPer100g: 0.6, defaultAmountGrams: 80, isFavorite: false },
  { id: 'ing-014', name: 'Süßkartoffel', category: 'Kohlenhydrate', caloriesPer100g: 86, proteinPer100g: 1.6, fatPer100g: 0.1, carbsPer100g: 20, saturatedFatPer100g: 0, fiberPer100g: 3, defaultAmountGrams: 200, isFavorite: false },
  { id: 'ing-015', name: 'Linsen', category: 'Kohlenhydrate', caloriesPer100g: 116, proteinPer100g: 9, fatPer100g: 0.4, carbsPer100g: 20, saturatedFatPer100g: 0.1, fiberPer100g: 4, defaultAmountGrams: 100, isFavorite: false },

  // Gemüse
  { id: 'ing-020', name: 'Brokkoli', category: 'Gemüse', caloriesPer100g: 34, proteinPer100g: 2.8, fatPer100g: 0.4, carbsPer100g: 6.6, saturatedFatPer100g: 0.1, fiberPer100g: 2.6, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-021', name: 'Spinat', category: 'Gemüse', caloriesPer100g: 23, proteinPer100g: 2.9, fatPer100g: 0.4, carbsPer100g: 3.6, saturatedFatPer100g: 0.1, fiberPer100g: 2.2, defaultAmountGrams: 100, isFavorite: false },
  { id: 'ing-022', name: 'Paprika (rot)', category: 'Gemüse', caloriesPer100g: 31, proteinPer100g: 1, fatPer100g: 0.3, carbsPer100g: 6, saturatedFatPer100g: 0, fiberPer100g: 2.1, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-023', name: 'Zucchini', category: 'Gemüse', caloriesPer100g: 17, proteinPer100g: 1.2, fatPer100g: 0.3, carbsPer100g: 3.1, saturatedFatPer100g: 0.1, fiberPer100g: 1, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-024', name: 'Karotte', category: 'Gemüse', caloriesPer100g: 41, proteinPer100g: 0.9, fatPer100g: 0.2, carbsPer100g: 9.6, saturatedFatPer100g: 0, fiberPer100g: 2.8, defaultAmountGrams: 100, isFavorite: false },
  { id: 'ing-025', name: 'Tomaten', category: 'Gemüse', caloriesPer100g: 18, proteinPer100g: 0.9, fatPer100g: 0.2, carbsPer100g: 3.9, saturatedFatPer100g: 0, fiberPer100g: 1.2, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-026', name: 'Zwiebel', category: 'Gemüse', caloriesPer100g: 40, proteinPer100g: 1.1, fatPer100g: 0.1, carbsPer100g: 9.3, saturatedFatPer100g: 0, fiberPer100g: 1.7, defaultAmountGrams: 80, isFavorite: false },
  { id: 'ing-027', name: 'Kürbis', category: 'Gemüse', caloriesPer100g: 26, proteinPer100g: 1, fatPer100g: 0.1, carbsPer100g: 6.5, saturatedFatPer100g: 0, fiberPer100g: 0.5, defaultAmountGrams: 200, isFavorite: false },
  { id: 'ing-028', name: 'Spargel', category: 'Gemüse', caloriesPer100g: 20, proteinPer100g: 2.2, fatPer100g: 0.1, carbsPer100g: 3.7, saturatedFatPer100g: 0, fiberPer100g: 2.1, defaultAmountGrams: 150, isFavorite: false },

  // Obst
  { id: 'ing-030', name: 'Banane', category: 'Obst', caloriesPer100g: 89, proteinPer100g: 1.1, fatPer100g: 0.3, carbsPer100g: 23, saturatedFatPer100g: 0.1, fiberPer100g: 2.6, defaultAmountGrams: 120, isFavorite: false },
  { id: 'ing-031', name: 'Beeren (gemischt)', category: 'Obst', caloriesPer100g: 57, proteinPer100g: 0.8, fatPer100g: 0.6, carbsPer100g: 14, saturatedFatPer100g: 0, fiberPer100g: 3.6, defaultAmountGrams: 100, isFavorite: false },
  { id: 'ing-032', name: 'Apfel', category: 'Obst', caloriesPer100g: 52, proteinPer100g: 0.3, fatPer100g: 0.2, carbsPer100g: 14, saturatedFatPer100g: 0, fiberPer100g: 2.4, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-033', name: 'Avocado', category: 'Obst', caloriesPer100g: 160, proteinPer100g: 2, fatPer100g: 15, carbsPer100g: 9, saturatedFatPer100g: 2.1, fiberPer100g: 6.7, defaultAmountGrams: 100, isFavorite: false },

  // Milchprodukt
  { id: 'ing-040', name: 'Griechischer Joghurt', category: 'Milchprodukt', caloriesPer100g: 97, proteinPer100g: 9, fatPer100g: 5, carbsPer100g: 4, saturatedFatPer100g: 3.3, fiberPer100g: 0, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-041', name: 'Hüttenkäse', category: 'Milchprodukt', caloriesPer100g: 98, proteinPer100g: 11, fatPer100g: 4.3, carbsPer100g: 3.4, saturatedFatPer100g: 2.7, fiberPer100g: 0, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-042', name: 'Feta', category: 'Milchprodukt', caloriesPer100g: 264, proteinPer100g: 14, fatPer100g: 21, carbsPer100g: 4, saturatedFatPer100g: 14.9, fiberPer100g: 0, defaultAmountGrams: 50, isFavorite: false },
  { id: 'ing-043', name: 'Mozzarella', category: 'Milchprodukt', caloriesPer100g: 280, proteinPer100g: 18, fatPer100g: 22, carbsPer100g: 2.2, saturatedFatPer100g: 13, fiberPer100g: 0, defaultAmountGrams: 50, isFavorite: false },

  // Fett
  { id: 'ing-050', name: 'Olivenöl', category: 'Fett', caloriesPer100g: 884, proteinPer100g: 0, fatPer100g: 100, carbsPer100g: 0, saturatedFatPer100g: 14, fiberPer100g: 0, defaultAmountGrams: 15, isFavorite: false },
  { id: 'ing-051', name: 'Nüsse (gemischt)', category: 'Fett', caloriesPer100g: 607, proteinPer100g: 20, fatPer100g: 54, carbsPer100g: 13, saturatedFatPer100g: 7, fiberPer100g: 7, defaultAmountGrams: 30, isFavorite: false },
  { id: 'ing-052', name: 'Sesamöl', category: 'Fett', caloriesPer100g: 884, proteinPer100g: 0, fatPer100g: 100, carbsPer100g: 0, saturatedFatPer100g: 14.2, fiberPer100g: 0, defaultAmountGrams: 10, isFavorite: false },
  { id: 'ing-053', name: 'Chiasamen', category: 'Fett', caloriesPer100g: 486, proteinPer100g: 17, fatPer100g: 31, carbsPer100g: 42, saturatedFatPer100g: 3.3, fiberPer100g: 34, defaultAmountGrams: 20, isFavorite: false },
  { id: 'ing-054', name: 'Leinöl', category: 'Fett', caloriesPer100g: 884, proteinPer100g: 0, fatPer100g: 100, carbsPer100g: 0, saturatedFatPer100g: 9, fiberPer100g: 0, defaultAmountGrams: 10, isFavorite: false },

  // Gewürz
  { id: 'ing-060', name: 'Knoblauch', category: 'Gewürz', caloriesPer100g: 149, proteinPer100g: 6.4, fatPer100g: 0.5, carbsPer100g: 33, saturatedFatPer100g: 0.1, fiberPer100g: 2.1, defaultAmountGrams: 10, isFavorite: false },
  { id: 'ing-061', name: 'Ingwer', category: 'Gewürz', caloriesPer100g: 80, proteinPer100g: 1.8, fatPer100g: 0.8, carbsPer100g: 18, saturatedFatPer100g: 0.2, fiberPer100g: 2, defaultAmountGrams: 10, isFavorite: false },
  { id: 'ing-062', name: 'Sojasoße', category: 'Gewürz', caloriesPer100g: 53, proteinPer100g: 8, fatPer100g: 0, carbsPer100g: 7, saturatedFatPer100g: 0, fiberPer100g: 0.8, defaultAmountGrams: 15, isFavorite: false },
  { id: 'ing-063', name: 'Basilikum (frisch)', category: 'Gewürz', caloriesPer100g: 23, proteinPer100g: 3.2, fatPer100g: 0.6, carbsPer100g: 2.7, saturatedFatPer100g: 0, fiberPer100g: 1.6, defaultAmountGrams: 10, isFavorite: false },
  { id: 'ing-064', name: 'Kurkuma', category: 'Gewürz', caloriesPer100g: 354, proteinPer100g: 8, fatPer100g: 10, carbsPer100g: 65, saturatedFatPer100g: 3, fiberPer100g: 21, defaultAmountGrams: 5, isFavorite: false },
  { id: 'ing-065', name: 'Zitrone', category: 'Gewürz', caloriesPer100g: 29, proteinPer100g: 1.1, fatPer100g: 0.3, carbsPer100g: 9, saturatedFatPer100g: 0, fiberPer100g: 2.8, defaultAmountGrams: 20, isFavorite: false },
]
