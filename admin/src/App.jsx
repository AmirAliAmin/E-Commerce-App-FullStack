import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <div className='relative'>
      <div>
      <Header/>
      <Sidebar/>
      </div>
      <div className='lg:pl-55'>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
      </Routes>

      </div>
    </div>
  )
}

export default App