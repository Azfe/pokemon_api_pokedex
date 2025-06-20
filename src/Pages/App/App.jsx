import { useRoutes, BrowserRouter } from 'react-router-dom'
import Home from '../Home/index'
import Navbar from '../../Components/Navbar'
import PokemonCard from '../../Components/PokemonCard'
/*
import SearchBar from '../../Components/SearchBar'
*/
import PokemonSearchApp from '../../Components/PokemonSearchApp'
import { PokedexProvider } from '../../Context'
import './App.css'


const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <Home /> },    
    { path: '/pokemon-card', element: <PokemonCard /> },
    /*{ path: '/signin', element: <SignIn /> },*/
    /*{ path: '/*', element: <NotFound /> }*/
  ])

  return routes
}

const App = () => {

  return (
    <PokedexProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
        {/*
        <SearchBar />
        */}        
      </BrowserRouter>
    </PokedexProvider>
  )
}

export default App