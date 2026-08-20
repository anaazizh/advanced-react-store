# Advanced React Store

A React e-commerce application that displays products from Fake Store API and lets users filter products by category, add items to a cart, remove items, view totals, and simulate checkout.

## Features

- Fetches products with TanStack React Query
- Fetches category options dynamically from Fake Store API
- Filters products by selected category
- Displays product title, price, category, description, rating, and image
- Uses an image fallback when a product image fails to load
- Uses Redux Toolkit to manage cart state
- Adds products to the cart and updates quantities
- Removes individual cart items
- Calculates total product quantity and total cart price
- Saves cart data in sessionStorage
- Clears Redux state and sessionStorage during checkout
- Shows checkout feedback after the cart is cleared

## Technologies

- React
- Vite
- TanStack React Query
- Redux Toolkit
- React Redux
- Fake Store API
- CSS

## Installation

1. Clone this repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

2. Open the project folder:

```bash
cd advanced-react-store
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Usage

1. Choose a category from the dropdown or leave it on All categories.
2. Click Add to Cart for a product.
3. View the cart item quantity, total product count, and total price.
4. Click Remove to remove an item.
5. Click Checkout to clear the cart and display a success message.

## Available Scripts

```bash
npm run dev
npm run lint
npm run build
```

## API

This app uses the Fake Store API:

- https://fakestoreapi.com/products
- https://fakestoreapi.com/products/categories
- https://fakestoreapi.com/products/category/{category}