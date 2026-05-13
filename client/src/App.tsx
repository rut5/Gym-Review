import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import PlaceDetails from "./pages/PlaceDetails";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
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
          <nav>
            <div>
              <Link to="/">
                <img
                  src=""
                  alt=""
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                />
                Home
              </Link>
              <Link to="/places">Browse Place</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/login">Login</Link>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/places" element={<PlaceDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Auth0Provider>
    </>
  );
}

export default App;
