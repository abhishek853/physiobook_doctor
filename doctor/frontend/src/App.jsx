import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import AddReceptionist from './pages/AddReceptionist'
import Navbar from './components/Navbar'
import Receptionists from './pages/Receptionists'
import PatientList from './pages/PatientList'
import Patient from './pages/Patient'

function App() {

  return (
    <>     
     
      <Routes>
        <Route path="/" element={<Navbar />}>
          {/* These pages will appear inside <Outlet /> */}
          <Route index element={<Dashboard />} />       {/* Default page */}
          <Route path="AddReceptionist" element={<AddReceptionist />} />
          <Route path='Receptionists' element={<Receptionists/>}></Route>
          <Route path='PatientsList' element={<PatientList/>}></Route>  
          <Route path='PatientsList/patient' element={<Patient/>}></Route>  
        </Route>
      </Routes>
    
    </>
  )
}

export default App
