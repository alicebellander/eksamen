const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export interface Recipe {
  id: number;
  title: string;
  description?: string;
  ingredients: string;
  instructions: string;
  portions: number;
  cookingTimeMinutes: number;
}

export type RecipeInput = Omit<Recipe, "id">;

export async function getAllRecipes(): Promise<Recipe[]> {
  const res = await fetch(`${BASE_URL}/oppskrifter`);
  if (!res.ok) throw new Error("Kunne ikke hente oppskrifter");
  return res.json();
}

export async function getRecipe(id: number): Promise<Recipe> {
  const res = await fetch(`${BASE_URL}/oppskrifter/${id}`);
  if (!res.ok) throw new Error("Kunne ikke hente oppskrift");
  return res.json();
}


export async function createRecipe(data: RecipeInput): Promise<Recipe> {
  const res = await fetch(`${BASE_URL}/oppskrifter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Kunne ikke opprette oppskrift");
  return res.json();
}

export async function updateRecipe(id: number, data: RecipeInput): Promise<Recipe> {
  const res = await fetch(`${BASE_URL}/oppskrifter/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Kunne ikke oppdatere oppskrift");
  return res.json();
}

export async function deleteRecipe(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/oppskrifter/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Kunne ikke slette oppskrift");
}
