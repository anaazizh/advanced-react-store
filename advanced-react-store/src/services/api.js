const API_URL = "https://fakestoreapi.com";

export async function fetchProducts(category) {
  const endpoint = category
    ? `${API_URL}/products/category/${category}`
    : `${API_URL}/products`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("Unable to load products.");
  }

  return response.json();
}

export async function fetchCategories() {
  const response = await fetch(`${API_URL}/products/categories`);

  if (!response.ok) {
    throw new Error("Unable to load categories.");
  }

  return response.json();
}