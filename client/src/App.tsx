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
        domain="dev-8myyc6moc1tx2lno.eu.auth0.com"
        clientId="UwgUEb6idN5CJH4bswLz2ZQS5XMsIfm9"
        authorizationParams={{
          redirect_uri: "http://localhost:5173/frontEnd/",
          scope: "openid profile email",
        }}
        cacheLocation="localstorage"
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
import "./App.css";

function App() {
  return <></>;
}

export default App;
