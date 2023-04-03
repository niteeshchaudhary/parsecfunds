import logo from "./logo.svg";
import "./App.css";
import CNavbaar from "./components/CNavbaar";
import LoginForm from "./components/Loginform";
import Layout1 from "./components/Layout1";
import AllRoutes from "./AllRoutes";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import {  BrowserRouter,Routes, Route } from "react-router-dom";

function App() {
  return (
    <UserAuthContextProvider>
      <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<AllRoutes />} />
        </Routes>
        </BrowserRouter>
      </div>
    </UserAuthContextProvider>
  );
}

export default App;
