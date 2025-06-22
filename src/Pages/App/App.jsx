import { useRoutes, BrowserRouter } from 'react-router-dom'
import { PokedexProvider } from '../../Context'
import Home from '../Home'
import Navbar from '../../Components/Navbar'
import PokemonCard from '../../Components/PokemonCard'

/*
import Navbar from '../../Components/Navbar'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'*/
import PokemonSearchApp from '../../Components/PokemonSearchApp'
import './App.css'


const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    // { path: '/clothes', element: <Home /> },
    /*{ path: '/electronics', element: <Home /> },
    { path: '/furnitures', element: <Home /> },*/
    { path: '/pokemon-card', element: <PokemonCard /> },
    // { path: '/my-order', element: <MyOrder /> },
    /*{ path: '/my-orders', element: <MyOrders /> },
    { path: '/my-orders/last', element: <MyOrder /> },
    { path: '/my-orders/:id', element: <MyOrder /> },*/
    /*{ path: '/signin', element: <SignIn /> },*/
    /*{ path: '/*', element: <NotFound /> }*/
  ])

  return routes
}

const App = () => {

  return (
    <PokedexProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <PokemonCard />
      </BrowserRouter>
    </PokedexProvider>
  )
}

export default App

/*
import { useState } from 'react'
import reactLogo from './../../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>   
    </>
        <AppRoutes />
        {/*
        <SearchBar />        
  )
}

export default App*/