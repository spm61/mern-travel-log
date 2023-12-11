// Importing the necessary modules and styles
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS for styling

// Importing React components for different pages
import App from './App.jsx';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

// Creating a router using the createBrowserRouter function from react-router-dom.
// This router defines the navigation structure of the app.
const router = createBrowserRouter([
  {
    path: '/', // The base path
    element: <App />, // The main component to render at this path
    errorElement: <h1 className='display-2'>Wrong page!</h1>, // Element to display on routing error
    children: [ // Nested routes under the base path
      {
        index: true, // The default route under '/'
        element: <Home /> // The component to render for the index route
      },
      {
        path: '/dashboard', // The path for saved books
        element: <Dashboard /> // The component to render at '/dashboard'
      }
    ]
  }
]);

// Rendering the application to the DOM.
// createRoot is a React 18 method for enabling concurrent features.
// RouterProvider is used to enable routing throughout the app.
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
