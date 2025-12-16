import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { AdminContext } from './context/AdminContext'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Product from '../../client/src/pages/products/Product'
import Products from './pages/Products/Products'
import AddProduct from './pages/Products/AddProduct'
import HomeBanner from './pages/Home/HomeBanner'
import AddCategory from './pages/Category/AddCategory'
import Category from './pages/Category/Category'
import SubCategory from './pages/Category/SubCategory'
import AddSubCategory from './pages/Category/AddSubCategory'
import Users from './pages/Users/Users'
import Orders from './pages/Order/Orders'

function App() {
  const {sidebarOpen, isLogin,setIsLogin} = useContext(AdminContext)
  return (
    <div className='relative'>
      {
        isLogin === true ?
      <div>
      <Header/>
      <Sidebar/>
      <div className={`transition-all ${sidebarOpen===true? "lg:pl-45 xl:pl-55" :"pl-2"}`}>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/product/list' element={<Products/>} />
        <Route path='/product/add' element={<AddProduct/>} />
        <Route path='/home/list' element={<HomeBanner/>} />
        <Route path='/category/add' element={<AddCategory/>} />
        <Route path='/category/list' element={<Category/>} />
        <Route path='/category/subcategory/add' element={<AddSubCategory/>} />
        <Route path='/category/subcategory/list' element={<SubCategory/>} />
        <Route path='/user' element={<Users/>} />
        <Route path='/order' element={<Orders/>} />
      </Routes>
      </div>
      </div>:
      <div>
        <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>} />
      </Routes>
      </div>
        
      }
    </div>
  )
}

export default App