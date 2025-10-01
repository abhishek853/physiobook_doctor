import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import AddReceptionist from './pages/AddReceptionist'
import Navbar from './components/Navbar'
import Receptionists from './pages/Receptionists'

function App() {

  return (
    <>     
     
      <Routes>
        <Route path="/" element={<Navbar />}>
          {/* These pages will appear inside <Outlet /> */}
          <Route index element={<Dashboard />} />       {/* Default page */}
          <Route path="AddReceptionist" element={<AddReceptionist />} />
          <Route path='Receptionists' element={<Receptionists/>}></Route>
        </Route>
      </Routes>
    
    </>
  )
}

export default App
