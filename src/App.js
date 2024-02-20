import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeTemplate from "./Templates/HomeTemplate";
import Home from "./pages/Home/Home";
import HomeCarousel from "./components/HomeCarousel/HomeCarousel";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Detail from "./pages/Details/Detail";
import Checkout from "./pages/Checkout/Checkout";
import Login from "./pages/Login/Login";
import CheckoutTemplate from "./Templates/CheckoutTemplate";
import UserTemplate from "./Templates/UserTemplate";
import Loading from "./components/Loading/Loading";
import Regiser from "./pages/Register/Regiser";
import Profile from "./pages/Profile/Profile";
import AdminTemplate from "./Templates/AdminTemplate";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Films from "./pages/Admin/Films/Films";
import ShowTime from "./pages/Admin/Showtime/ShowTime";
import AddNew from "./pages/Admin/Films/AddNew/AddNew";
import Edit from "./pages/Admin/Films/Edit/Edit";
import User from "./pages/Admin/Users/User";
import AddUser from "./pages/Admin/Users/AddUser";
import EditUser from "./pages/Admin/Users/EditUser";
// const CheckoutTemplateLazy = lazy(() => import("./Templates/CheckoutTemplate"));
function App() {
  return (
    <BrowserRouter>
      <Loading />
      <Routes>
        <Route element={<HomeTemplate />}>
          <Route index path="/" element={<Home />} />
          <Route index path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<CheckoutTemplate />}>
          <Route path="/checkout/:id" element={<Checkout />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Regiser />} />
        <Route element={<AdminTemplate />}>
          <Route path="/admin" element={<User />} />
          <Route path="/admin/users" element={<User />} />
          <Route path="/admin/users/addnew" element={<AddUser />} />
          <Route path="/admin/users/edit/:id" element={<EditUser />} />
          <Route path="/admin/films" element={<Films />} />
          <Route path="/admin/films/addnew" element={<AddNew />} />
          <Route path="/admin/films/edit/:id" element={<Edit />} />
          <Route
            path="/admin/films/showtime/:id/:tenphim"
            element={<ShowTime />}
          />

          <Route path="/admin/users" element={<Dashboard />} />
          {/* <Route path="/admin/showtimes" element={<ShowTime />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
