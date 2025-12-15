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
        <Route path='/product' element={<Products/>} />
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