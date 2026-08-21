import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getProducts } from "./services/productService";
import { addToCart } from "./features/cart/cartSlice";
import Cart from "./components/Cart";
import AuthSection from "./components/AuthSection";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import OrderHistory from "./components/OrderHistory";

function App() {

  const dispatch = useDispatch();

  const {
  data: products = [],
  isLoading: productsLoading,
  isError,
  refetch,
} = useQuery({
  queryKey: ["products"],
  queryFn: getProducts,
});

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      refetch();
    }
  });

  return unsubscribe;
}, [refetch]);

  return (
  <main>
    <h1>Advanced React Store</h1>

    <AuthSection />

    <Cart />
    
    <OrderHistory />

    <h2>Products</h2>

    {productsLoading && <p>Loading products...</p>}

    {isError && (
      <p>Log in or register to load products.</p>
    )}

    {!productsLoading && !isError && (
      <section>
        {products.map((product) => (
          <article key={product.id}>
            <img
              src={product.image}
              alt={product.title}
              width="150"
            />

            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <p>{product.description}</p>
            <p>In stock: {product.stock}</p>

            <button onClick={() => dispatch(addToCart(product))}>
              Add to Cart
            </button>
          </article>
        ))}
      </section>
    )}
  </main>
);
}

export default App;