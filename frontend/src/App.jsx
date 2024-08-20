import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserProvider } from './context/UserContext'

function App() {
  return (
    <div>
      
      <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Home />} />
          <Route path= "/:searchValue" element= {<Home />} />
        </Routes>
        </UserProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;