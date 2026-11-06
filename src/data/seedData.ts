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

  // --- Neue Zutaten ---

  // Protein
  { id: 'ing-101', name: 'Putenbrust', category: 'Protein', caloriesPer100g: 157, proteinPer100g: 24, fatPer100g: 7, carbsPer100g: 0, saturatedFatPer100g: 2, fiberPer100g: 0, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-102', name: 'Makrele', category: 'Protein', caloriesPer100g: 305, proteinPer100g: 19, fatPer100g: 25, carbsPer100g: 0, saturatedFatPer100g: 5.8, fiberPer100g: 0, defaultAmountGrams: 130, isFavorite: false },
  { id: 'ing-103', name: 'Kabeljau', category: 'Protein', caloriesPer100g: 82, proteinPer100g: 18, fatPer100g: 0.7, carbsPer100g: 0, saturatedFatPer100g: 0.1, fiberPer100g: 0, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-104', name: 'Tempeh', category: 'Protein', caloriesPer100g: 192, proteinPer100g: 20, fatPer100g: 11, carbsPer100g: 9, saturatedFatPer100g: 2, fiberPer100g: 4.6, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-105', name: 'Rindersteak', category: 'Protein', caloriesPer100g: 271, proteinPer100g: 26, fatPer100g: 18, carbsPer100g: 0, saturatedFatPer100g: 7.7, fiberPer100g: 0, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-106', name: 'Krabben', category: 'Protein', caloriesPer100g: 99, proteinPer100g: 21, fatPer100g: 1.5, carbsPer100g: 0.1, saturatedFatPer100g: 0.3, fiberPer100g: 0, defaultAmountGrams: 130, isFavorite: false },
  { id: 'ing-107', name: 'Seitan', category: 'Protein', caloriesPer100g: 370, proteinPer100g: 75, fatPer100g: 2, carbsPer100g: 14, saturatedFatPer100g: 0.3, fiberPer100g: 0.6, defaultAmountGrams: 100, isFavorite: false },

  // Kohlenhydrate
  { id: 'ing-110', name: 'Kartoffeln', category: 'Kohlenhydrate', caloriesPer100g: 77, proteinPer100g: 2, fatPer100g: 0.1, carbsPer100g: 17, saturatedFatPer100g: 0, fiberPer100g: 2.2, defaultAmountGrams: 200, isFavorite: false },
  { id: 'ing-111', name: 'Bulgur', category: 'Kohlenhydrate', caloriesPer100g: 83, proteinPer100g: 3, fatPer100g: 0.2, carbsPer100g: 18, saturatedFatPer100g: 0, fiberPer100g: 4.5, defaultAmountGrams: 80, isFavorite: false },
  { id: 'ing-112', name: 'Couscous', category: 'Kohlenhydrate', caloriesPer100g: 112, proteinPer100g: 4, fatPer100g: 0.2, carbsPer100g: 23, saturatedFatPer100g: 0, fiberPer100g: 1.4, defaultAmountGrams: 80, isFavorite: false },
  { id: 'ing-113', name: 'Vollkornbrot', category: 'Kohlenhydrate', caloriesPer100g: 247, proteinPer100g: 8, fatPer100g: 3.5, carbsPer100g: 46, saturatedFatPer100g: 0.5, fiberPer100g: 7.5, defaultAmountGrams: 80, isFavorite: false },
  { id: 'ing-114', name: 'Kichererbsen', category: 'Kohlenhydrate', caloriesPer100g: 120, proteinPer100g: 7, fatPer100g: 2, carbsPer100g: 18, saturatedFatPer100g: 0.2, fiberPer100g: 7.6, defaultAmountGrams: 100, isFavorite: false },
  { id: 'ing-115', name: 'Buchweizen', category: 'Kohlenhydrate', caloriesPer100g: 343, proteinPer100g: 13, fatPer100g: 3, carbsPer100g: 72, saturatedFatPer100g: 0.7, fiberPer100g: 10, defaultAmountGrams: 80, isFavorite: false },
  { id: 'ing-116', name: 'Brauner Reis', category: 'Kohlenhydrate', caloriesPer100g: 362, proteinPer100g: 7.5, fatPer100g: 2.7, carbsPer100g: 76, saturatedFatPer100g: 0.5, fiberPer100g: 3.5, defaultAmountGrams: 80, isFavorite: false },

  // Gemüse
  { id: 'ing-120', name: 'Gurke', category: 'Gemüse', caloriesPer100g: 15, proteinPer100g: 0.7, fatPer100g: 0.1, carbsPer100g: 3.6, saturatedFatPer100g: 0, fiberPer100g: 0.5, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-121', name: 'Feldsalat', category: 'Gemüse', caloriesPer100g: 21, proteinPer100g: 2, fatPer100g: 0.4, carbsPer100g: 3.6, saturatedFatPer100g: 0.1, fiberPer100g: 1.8, defaultAmountGrams: 80, isFavorite: false },
  { id: 'ing-122', name: 'Rucola', category: 'Gemüse', caloriesPer100g: 25, proteinPer100g: 2.6, fatPer100g: 0.7, carbsPer100g: 3.7, saturatedFatPer100g: 0.1, fiberPer100g: 1.6, defaultAmountGrams: 60, isFavorite: false },
  { id: 'ing-123', name: 'Aubergine', category: 'Gemüse', caloriesPer100g: 25, proteinPer100g: 1, fatPer100g: 0.2, carbsPer100g: 5.7, saturatedFatPer100g: 0, fiberPer100g: 3, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-124', name: 'Lauch', category: 'Gemüse', caloriesPer100g: 31, proteinPer100g: 1.8, fatPer100g: 0.3, carbsPer100g: 7.4, saturatedFatPer100g: 0, fiberPer100g: 1.8, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-125', name: 'Blumenkohl', category: 'Gemüse', caloriesPer100g: 25, proteinPer100g: 1.9, fatPer100g: 0.3, carbsPer100g: 5, saturatedFatPer100g: 0, fiberPer100g: 2, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-126', name: 'Rosenkohl', category: 'Gemüse', caloriesPer100g: 43, proteinPer100g: 3.4, fatPer100g: 0.5, carbsPer100g: 8.7, saturatedFatPer100g: 0.1, fiberPer100g: 3.8, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-127', name: 'Mais', category: 'Gemüse', caloriesPer100g: 86, proteinPer100g: 3.3, fatPer100g: 1.4, carbsPer100g: 18.7, saturatedFatPer100g: 0.2, fiberPer100g: 2.7, defaultAmountGrams: 100, isFavorite: false },
  { id: 'ing-128', name: 'Rote Bete', category: 'Gemüse', caloriesPer100g: 43, proteinPer100g: 1.6, fatPer100g: 0.1, carbsPer100g: 9.6, saturatedFatPer100g: 0, fiberPer100g: 2.8, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-129', name: 'Pak Choi', category: 'Gemüse', caloriesPer100g: 13, proteinPer100g: 1.5, fatPer100g: 0.2, carbsPer100g: 2.2, saturatedFatPer100g: 0, fiberPer100g: 1, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-130', name: 'Erbsen', category: 'Gemüse', caloriesPer100g: 81, proteinPer100g: 5.4, fatPer100g: 0.4, carbsPer100g: 14.5, saturatedFatPer100g: 0.1, fiberPer100g: 5, defaultAmountGrams: 100, isFavorite: false },
  { id: 'ing-131', name: 'Frühlingszwiebeln', category: 'Gemüse', caloriesPer100g: 32, proteinPer100g: 1.8, fatPer100g: 0.2, carbsPer100g: 7.4, saturatedFatPer100g: 0, fiberPer100g: 2.6, defaultAmountGrams: 50, isFavorite: false },
  { id: 'ing-132', name: 'Fenchel', category: 'Gemüse', caloriesPer100g: 31, proteinPer100g: 1.2, fatPer100g: 0.2, carbsPer100g: 7.3, saturatedFatPer100g: 0, fiberPer100g: 3.1, defaultAmountGrams: 150, isFavorite: false },

  // Obst
  { id: 'ing-140', name: 'Mango', category: 'Obst', caloriesPer100g: 60, proteinPer100g: 0.8, fatPer100g: 0.4, carbsPer100g: 15, saturatedFatPer100g: 0.1, fiberPer100g: 1.6, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-141', name: 'Kiwi', category: 'Obst', caloriesPer100g: 61, proteinPer100g: 1.1, fatPer100g: 0.5, carbsPer100g: 15, saturatedFatPer100g: 0, fiberPer100g: 3, defaultAmountGrams: 100, isFavorite: false },
  { id: 'ing-142', name: 'Orange', category: 'Obst', caloriesPer100g: 47, proteinPer100g: 0.9, fatPer100g: 0.1, carbsPer100g: 11.7, saturatedFatPer100g: 0, fiberPer100g: 2.4, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-143', name: 'Granatapfel', category: 'Obst', caloriesPer100g: 83, proteinPer100g: 1.7, fatPer100g: 1.2, carbsPer100g: 18.7, saturatedFatPer100g: 0.1, fiberPer100g: 4, defaultAmountGrams: 100, isFavorite: false },
  { id: 'ing-144', name: 'Heidelbeeren', category: 'Obst', caloriesPer100g: 57, proteinPer100g: 0.7, fatPer100g: 0.3, carbsPer100g: 14.5, saturatedFatPer100g: 0, fiberPer100g: 2.4, defaultAmountGrams: 100, isFavorite: false },
  { id: 'ing-145', name: 'Himbeeren', category: 'Obst', caloriesPer100g: 52, proteinPer100g: 1.2, fatPer100g: 0.6, carbsPer100g: 12, saturatedFatPer100g: 0, fiberPer100g: 6.5, defaultAmountGrams: 100, isFavorite: false },
  { id: 'ing-146', name: 'Birne', category: 'Obst', caloriesPer100g: 57, proteinPer100g: 0.4, fatPer100g: 0.1, carbsPer100g: 15, saturatedFatPer100g: 0, fiberPer100g: 3.1, defaultAmountGrams: 150, isFavorite: false },

  // Milchprodukt
  { id: 'ing-150', name: 'Quark (mager)', category: 'Milchprodukt', caloriesPer100g: 67, proteinPer100g: 12, fatPer100g: 0.2, carbsPer100g: 4, saturatedFatPer100g: 0.1, fiberPer100g: 0, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-151', name: 'Skyr', category: 'Milchprodukt', caloriesPer100g: 63, proteinPer100g: 11, fatPer100g: 0.2, carbsPer100g: 4, saturatedFatPer100g: 0.1, fiberPer100g: 0, defaultAmountGrams: 150, isFavorite: false },
  { id: 'ing-152', name: 'Kefir', category: 'Milchprodukt', caloriesPer100g: 63, proteinPer100g: 3.3, fatPer100g: 3.5, carbsPer100g: 4.5, saturatedFatPer100g: 2.2, fiberPer100g: 0, defaultAmountGrams: 200, isFavorite: false },
  { id: 'ing-153', name: 'Parmesan', category: 'Milchprodukt', caloriesPer100g: 392, proteinPer100g: 36, fatPer100g: 26, carbsPer100g: 3.2, saturatedFatPer100g: 16.8, fiberPer100g: 0, defaultAmountGrams: 30, isFavorite: false },
  { id: 'ing-154', name: 'Ricotta', category: 'Milchprodukt', caloriesPer100g: 174, proteinPer100g: 11, fatPer100g: 13, carbsPer100g: 3, saturatedFatPer100g: 8.6, fiberPer100g: 0, defaultAmountGrams: 100, isFavorite: false },

  // Fett
  { id: 'ing-160', name: 'Mandelmus', category: 'Fett', caloriesPer100g: 634, proteinPer100g: 21, fatPer100g: 56, carbsPer100g: 18, saturatedFatPer100g: 4.3, fiberPer100g: 10, defaultAmountGrams: 20, isFavorite: false },
  { id: 'ing-161', name: 'Erdnussbutter', category: 'Fett', caloriesPer100g: 588, proteinPer100g: 25, fatPer100g: 50, carbsPer100g: 20, saturatedFatPer100g: 9.6, fiberPer100g: 6, defaultAmountGrams: 20, isFavorite: false },
  { id: 'ing-162', name: 'Kürbiskerne', category: 'Fett', caloriesPer100g: 559, proteinPer100g: 30, fatPer100g: 49, carbsPer100g: 11, saturatedFatPer100g: 9, fiberPer100g: 6, defaultAmountGrams: 30, isFavorite: false },
  { id: 'ing-163', name: 'Walnüsse', category: 'Fett', caloriesPer100g: 654, proteinPer100g: 15, fatPer100g: 65, carbsPer100g: 14, saturatedFatPer100g: 6.1, fiberPer100g: 6.7, defaultAmountGrams: 30, isFavorite: false },
  { id: 'ing-164', name: 'Hanfsamen', category: 'Fett', caloriesPer100g: 553, proteinPer100g: 31, fatPer100g: 49, carbsPer100g: 8.7, saturatedFatPer100g: 4.6, fiberPer100g: 4, defaultAmountGrams: 20, isFavorite: false },
  { id: 'ing-165', name: 'Kokosöl', category: 'Fett', caloriesPer100g: 862, proteinPer100g: 0, fatPer100g: 100, carbsPer100g: 0, saturatedFatPer100g: 87, fiberPer100g: 0, defaultAmountGrams: 15, isFavorite: false },

  // Gewürz (neu)
  { id: 'ing-170', name: 'Petersilie (frisch)', category: 'Gewürz', caloriesPer100g: 36, proteinPer100g: 3, fatPer100g: 0.8, carbsPer100g: 6.3, saturatedFatPer100g: 0.1, fiberPer100g: 3.3, defaultAmountGrams: 10, isFavorite: false },
  { id: 'ing-171', name: 'Thymian (frisch)', category: 'Gewürz', caloriesPer100g: 101, proteinPer100g: 5.6, fatPer100g: 1.7, carbsPer100g: 24, saturatedFatPer100g: 0.5, fiberPer100g: 14, defaultAmountGrams: 5, isFavorite: false },
  { id: 'ing-172', name: 'Oregano (frisch)', category: 'Gewürz', caloriesPer100g: 66, proteinPer100g: 2.1, fatPer100g: 1.1, carbsPer100g: 16, saturatedFatPer100g: 0.3, fiberPer100g: 10, defaultAmountGrams: 5, isFavorite: false },
  { id: 'ing-173', name: 'Zimt', category: 'Gewürz', caloriesPer100g: 247, proteinPer100g: 4, fatPer100g: 1.2, carbsPer100g: 81, saturatedFatPer100g: 0.3, fiberPer100g: 53, defaultAmountGrams: 3, isFavorite: false },
  { id: 'ing-174', name: 'Chili (frisch)', category: 'Gewürz', caloriesPer100g: 40, proteinPer100g: 1.9, fatPer100g: 0.4, carbsPer100g: 9.5, saturatedFatPer100g: 0, fiberPer100g: 1.5, defaultAmountGrams: 10, isFavorite: false },
  { id: 'ing-175', name: 'Senf', category: 'Gewürz', caloriesPer100g: 66, proteinPer100g: 4.4, fatPer100g: 3.3, carbsPer100g: 5.8, saturatedFatPer100g: 0.2, fiberPer100g: 3.8, defaultAmountGrams: 10, isFavorite: false },
  { id: 'ing-176', name: 'Koriander (frisch)', category: 'Gewürz', caloriesPer100g: 23, proteinPer100g: 2.1, fatPer100g: 0.5, carbsPer100g: 3.7, saturatedFatPer100g: 0, fiberPer100g: 2.8, defaultAmountGrams: 10, isFavorite: false },
  { id: 'ing-177', name: 'Dill (frisch)', category: 'Gewürz', caloriesPer100g: 43, proteinPer100g: 3.5, fatPer100g: 1.1, carbsPer100g: 7, saturatedFatPer100g: 0.1, fiberPer100g: 2.1, defaultAmountGrams: 10, isFavorite: false },
  { id: 'ing-178', name: 'Muskatnuss', category: 'Gewürz', caloriesPer100g: 525, proteinPer100g: 5.8, fatPer100g: 36, carbsPer100g: 49, saturatedFatPer100g: 26, fiberPer100g: 20.8, defaultAmountGrams: 2, isFavorite: false },
]
