import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import PlaceDetails from "./pages/PlaceDetails";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places/:id" /> element={<PlaceDetails />}
          <Route path="/profile" /> element={<Profile />}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
