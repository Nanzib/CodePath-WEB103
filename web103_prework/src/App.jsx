import React from "react";
import { useRoutes, Link } from "react-router-dom";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import EditCreator from "./pages/EditCreator";
import AddCreator from "./pages/AddCreator";
import "./App.css";

/**
 * Small site header with navigation links.
 * Keeps the header consistent across routes.
 */
function AppHeader() {
  return (
    <header className="page-header">
      <div>
        <Link to="/" className="site-title"><strong>Creatorverse</strong></Link>
      </div>

      <nav className="nav-actions">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/new" className="btn">Add Creator</Link>
      </nav>
    </header>
  );
}

/**
 * NotFound component — displayed for unknown routes.
 */
function NotFound() {
  return (
    <main className="page-padding">
      <h2>404 — Page not found</h2>
      <p>Sorry, we couldn't find that page. <Link to="/">Go back home</Link>.</p>
    </main>
  );
}

/**
 * AppRoutes: useRoutes expects an array of route objects.
 * This returns a react-router element tree based on the current URL.
 */
function AppRoutes() {
  const routes = [
    { path: "/", element: <ShowCreators /> },
    { path: "/new", element: <AddCreator /> },
    { path: "/creator/:id", element: <ViewCreator /> },
    { path: "/creator/:id/edit", element: <EditCreator /> },
    { path: "*", element: <NotFound /> }
  ];
  return useRoutes(routes);
}

/**
 * App component — top-level container.
 * Note: main.jsx should wrap <App /> in <BrowserRouter> (required).
 */
export default function App() {
  return (
    <div className="app-root">
      <AppHeader />
      <AppRoutes />
    </div>
  );
}
