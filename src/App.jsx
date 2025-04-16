
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import About from './Client/About'
import Contact from './Client/Contact'
import Home from './Client/Home'
import Singleproduct from './Client/SingleProduct'
import MaleWear from './Client/MaleWear'
import FemaleWear from './Client/FemaleWear'
import SignUpForm from './Client/SignUpForm'
import LoginPage from './Client/Login'

import AdminLogin from './Admin/AdminLogin'
import AdminLayout from './Admin/AdminLayout'
import BookingList from './Admin/BookingList'
import MenRentProductList from './Admin/MenRentProductList'
import WomenRentProductList from './Admin/WomenRentProductList'
import CategoryList from './Admin/CategoryList'
import SubCategoryList from './Admin/SubCategory'
import Dashboard from './Admin/Dashboard'
import Cart from './Client/Cart'
import Checkout from './Client/Checkout'
import OrderConfirmation from './Client/OrderConfirmation'
import AdminContact from './Admin/AdminContact'
import EditRentProductForm from './Admin/EditRentProductForm'
import RequireAdminAuth from './Admin/AdminAuth'



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/About' element={<About />}></Route>
          <Route path='/Contact' element={<Contact />}></Route>
          <Route path='/SingleProduct' element={<Singleproduct />}></Route>
          <Route path='/MaleWear' element={<MaleWear />}></Route>
          <Route path='/FemaleWear' element={<FemaleWear></FemaleWear>}></Route>
          <Route path='/Cart' element={<Cart></Cart>}></Route>
          <Route path='/Checkout' element={<Checkout></Checkout>}></Route>
          <Route path="/orderconfirmation" element={<OrderConfirmation />} />
          <Route path='/SignUpForm' element={<SignUpForm></SignUpForm>}></Route>
          <Route path='/Login' element={<LoginPage></LoginPage>}></Route>

          <Route path='/AdminLogin' element={<AdminLogin></AdminLogin>}></Route>

          <Route path="/admin" element={<RequireAdminAuth />}>
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<BookingList />} />
              <Route path="menrentproduct" element={<MenRentProductList />} />
              <Route path="womenrentproduct" element={<WomenRentProductList />} />
              <Route path="category" element={<CategoryList />} />
              <Route path="subcategory" element={<SubCategoryList />} />
              <Route path="adminContact" element={<AdminContact />} />
              <Route path="editProductForm" element={<EditRentProductForm />} />
            </Route>
          </Route>


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
