
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import AddReceptionist from './components/AddReceptionist'
import Navbar from './components/Navbar'

function App() {

  return (
    <>     
    {/* <Navbar/>
     <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path='/AddReceptionist' element={<AddReceptionist/>}></Route>
     </Routes> */}

     
      <Routes>
        <Route path="/" element={<Navbar />}>
          {/* These pages will appear inside <Outlet /> */}
          <Route index element={<Dashboard />} />       {/* Default page */}
          <Route path="AddReceptionist" element={<AddReceptionist />} />
        </Route>
      </Routes>
    
    </>
  )
}

export default App
