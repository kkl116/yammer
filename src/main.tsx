import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Layout from './layouts/dashboard';
import DashboardPage from './pages';
import ProductsPage from './pages/products';
import SignInPage from './pages/signIn';
import ProductDetailsPage from "./pages/productDetails";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: '/',
            Component: DashboardPage
          },
          {
            path: '/products',
            Component: ProductsPage
          },
          {
            path: '/products/:productId',
            Component: ProductDetailsPage
          }
        ],
      },
      {
        path: '/sign-in',
        Component: SignInPage
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
