import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../src/Client/Home'
import About from '../src/Client/About'
import Contact from '../src/Client/Contact'
import SingleProduct from '../src/Client/SingleProduct'
import MaleWear from '../src/Client/MaleWear'
import FemaleWear from '../src/Client/FemaleWear'
import Cart from '../src/Client/Cart'
import Checkout from '../src/Client/Checkout'
import OrderConfirmation from '../src/Client/OrderConfirmation'
import SignUpForm from '../src/Client/SignUpForm'
import Login from '../src/Client/Login'
import ForgotPasswordForm from '../src/Client/ForgotPasswordForm'
import AdminLogin from '../src/Admin/AdminLogin'
import RequireAdminAuth from '../src/Admin/AdminAuth'
import AdminLayout from '../src/Admin/AdminLayout'
import Dashboard from '../src/Admin/Dashboard'
import MenRentProductList from '../src/Admin/MenRentProductList'
import WomenRentProductList from '../src/Admin/WomenRentProductList'
import CategoryList from '../src/Admin/CategoryList'
import SubCategoryList from '../src/Admin/SubCategory'
import AdminContact from '../src/Admin/AdminContact'
import EditRentProductForm from '../src/Admin/EditRentProductForm'
import BookingList from '../src/Admin/BookingList'
import Confirmation from '../src/Client/ConfirmPage'

const Routing = () => {
  return (
    <>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/About' element={<About />}></Route>
          <Route path='/Contact' element={<Contact />}></Route>
          <Route path='/SingleProduct' element={<SingleProduct />}></Route>
          <Route path='/MaleWear' element={<MaleWear />}></Route>
          <Route path='/FemaleWear' element={<FemaleWear></FemaleWear>}></Route>
          <Route path='/Cart' element={<Cart></Cart>}></Route>
          <Route path='/Checkout' element={<Checkout></Checkout>}></Route>
          <Route path='/ConfirmationTick' element={<Confirmation></Confirmation>}></Route>
          <Route path="/orderconfirmation" element={<OrderConfirmation />} />
          <Route path='/SignUpForm' element={<SignUpForm></SignUpForm>}></Route>
          <Route path='/Login' element={<Login></Login>}></Route>
          <Route path='/ForgotPassword' element={<ForgotPasswordForm></ForgotPasswordForm>}></Route>

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

export default Routing