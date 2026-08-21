# Advanced React Store

## Live Application

[View the live Advanced React Store](https://advanced-react-store-gamma.vercel.app)

## Features

- Browse products in a React e-commerce interface
- Add products to a shopping cart
- View quantity and total-price updates in the cart
- View order history
- Authentication support with Firebase

## Testing

This project uses Vitest and React Testing Library.

The test suite includes:

- Cart component rendering tests
- Cart total and quantity tests
- Cart reducer tests for adding a product
- Cart reducer tests for incrementing product quantity when the same product is added again

Run tests locally:

```bash
npm test
```

## CI/CD

GitHub Actions runs whenever code is pushed to the `main` branch.

The workflow:

1. Installs dependencies with `npm ci`
2. Runs the Vitest test suite
3. Builds the Vite application
4. Deploys to Vercel only after the test-and-build job succeeds

## Deployment

The application is deployed to Vercel:

https://advanced-react-store-gamma.vercel.app
