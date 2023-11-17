
import './App.css'
import {BrowserRouter, Routes, Route} from  'react-router-dom'
import { ListProducts } from './pages/listProducts'
import { ProductsId } from './pages/productsId'
import  Home  from './pages/home'
import Informations from './pages/informations'
import Hours from './pages/hours'
import {Login} from './pages/login'

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Login/>} ></Route>
          <Route path='/Home' element={<Home/>}></Route>
          <Route path='/Home' element={<Home/>}></Route>
          <Route path='/ListProducts' element={<ListProducts/>}></Route>
          <Route path='/productsId' element={<ProductsId/>}></Route>
          <Route path='/informations' element={<Informations/>}></Route>
          <Route path='/hours' element={<Hours/>}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
