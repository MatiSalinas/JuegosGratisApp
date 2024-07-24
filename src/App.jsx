import { useState, useEffect } from 'react'
import './style.css'
import ListaJuegoComponent from './components/ListaJuegos'
import Filtros,{aplicarFiltros} from './components/AplicarFiltros'

function App() {
  const [juegos, setJuegos] = useState([])
  const [generosSeleccionados, setGenerosSeleccionados] = useState([])

  const [filtros, setFiltros] = useState({
    'sort':'popularity',
    'platform':'',
    'tags':[]
  })


  const [menuTexto, setMenutexto] = useState('x')
  const cambiarMenu = () =>{
    if (menuTexto == '='){setMenutexto('x')}else{setMenutexto('=')}}
  

  useEffect(()=>{

    const traerJuegos = async () => {
      const url = 'https://free-to-play-games-database.p.rapidapi.com/api/';
      const nuevaUrl = aplicarFiltros(url,filtros)
      const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'e62375221fmsha7866b80afc8dc2p1b742cjsn77ee71887fac',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
}

try {
	const response = await fetch(nuevaUrl, options);

	const result = await response.json();
  setJuegos(result)

} catch (error) {
	console.error(error);
}
    }
    traerJuegos()
  },[filtros])

  return (
    <>
    <nav><div className="menu" onMouseOver={cambiarMenu} onMouseLeave={()=>setMenutexto('=')}>{menuTexto}</div><h1 className='tituloNav'>Juegos Gratis</h1></nav>
      <div className="container" >
          <Filtros filtros={filtros} generosSeleccionados={generosSeleccionados} setFiltros={setFiltros} setGenerosSeleccionados={setGenerosSeleccionados}></Filtros>
          <div className="juegos">
          <ListaJuegoComponent juegos={juegos} generosSeleccionados={generosSeleccionados}></ListaJuegoComponent>
          </div>
      </div>
    </>
  )
}

export default App
