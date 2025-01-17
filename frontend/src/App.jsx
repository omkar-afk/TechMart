import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Product from "./pages/Product";
import Setting from "./pages/Setting";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Postadd from "./pages/Postadd";
import ProtectedRoute from "./components/ProtectedRoute";
import MyAd from "./pages/MyAd";


function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/:searchValue" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/setting" element={<ProtectedRoute element={<Setting/>} />} />
            <Route path="/postadd" element={<ProtectedRoute element={<Postadd/>} />} /> 
            <Route path="/myad" element={<ProtectedRoute element={<MyAd/>} />} /> 

          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
