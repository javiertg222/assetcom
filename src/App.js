import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import Settings from "./components/Settings";
import Cards from "./components/Cards";
import UserForm from "./components/UserForm";
import UsersList from "./components/UsersList";
import AssetForm from "./components/AssetForm";
import AssetsList from "./components/AssetsList";
import ChangePass from "./components/ChangePass";
import BarCode from "./components/BarCode";

function App() {
  return (
    <>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/password" element={<ChangePass />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/admin" element={<Cards />}></Route>
          <Route path="/admin/users" element={<UsersList />}></Route>
          <Route path="/admin/users/form" element={<UserForm />}></Route>
          <Route path="/assets" element={<AssetsList />}></Route>
          <Route path="/assets/form" element={<AssetForm />}></Route>
          <Route path="/barcode" element={<BarCode />}></Route>
          
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
