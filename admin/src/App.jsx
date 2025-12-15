import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { AdminContext } from './context/AdminContext'

function App() {
  const {sidebarOpen,setSidebarOpen} = useContext(AdminContext)
  return (
    <div className='relative'>
      <div>
      <Header/>
      <Sidebar/>
      </div>
      <div className={`transition-all ${sidebarOpen===true? "lg:pl-45 xl:pl-55" :"pl-2"}`}>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
      </Routes>

      </div>
    </div>
  )
}

export default App