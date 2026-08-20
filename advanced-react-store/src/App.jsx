import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { fetchCategories, fetchProducts } from "./services/api";
import { addToCart } from "./features/cart/cartSlice";
import Cart from "./components/Cart";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();

  const {
    data: categories = [],
    isLoading: categoriesLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    data: products = [],
    isLoading: productsLoading,
    isError,
  } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () => fetchProducts(selectedCategory),
  });

  if (productsLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return <p>Products could not be loaded.</p>;
  }

  return (
    <main>
      <h1>Advanced React Store</h1>

      <Cart />

      <label>
        Category:{" "}
        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          disabled={categoriesLoading}
        >
          <option value="">All categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <h2>Products</h2>

      <section>
        {products.map((product) => (
          <article key={product.id}>
            <img
              src={product.image}
              alt={product.title}
              width="150"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src =
                  "https://via.placeholder.com/150?text=Image+Unavailable";
              }}
            />

            <h3>{product.title}</h3>

            <p>Price: ${product.price.toFixed(2)}</p>

            <p>Category: {product.category}</p>

            <p>Rating: {product.rating.rate}</p>

            <p>{product.description}</p>

            <button onClick={() => dispatch(addToCart(product))}>
              Add to Cart
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;