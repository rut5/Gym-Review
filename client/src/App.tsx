import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Browse from "./pages/Browse/Browse";
import Login from "./pages/Login";
import Profile from "./pages/Profile/Profile";
import Cards from "./pages/Cards/Cards";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  return (
    <>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: "http://localhost:5173",
          scope: "openid profile email",
        }}
        onRedirectCallback={(appState) => {
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
        }}
      >
        <BrowserRouter>
          <nav className="navbar">
            <div className="navbar-container">
              <Link to="/" className="navbar-logo">
                <img src="" alt="Safe Space Logo" className="navbar-logo-img" />
                <span className="navbar-logo-text">Safe Space</span>
              </Link>
              <div className="navbar-links">
                <Link to="/" className="navbar-link">
                  Home
                </Link>
                <Link to="/places" className="navbar-link">
                  Browse
                </Link>
                <Link to="/profile" className="navbar-link">
                  Profile
                </Link>
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
              </div>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/places" element={<Browse />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/places" element={<Browse />} />
            <Route path="/places/:id" element={<Cards />} />
          </Routes>
        </BrowserRouter>
      </Auth0Provider>
    </>
  );
}

export default App;
