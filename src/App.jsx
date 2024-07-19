import { useState, useEffect } from 'react'
import './style.css'
import fondo from'./assets/images/fondoGTA.jpg'

function App() {
  const generos = ['mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-Person', 'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime', 'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts']
  

  const [juegos, setJuegos] = useState([])
  const [orden, setOrden] = useState('relevance')
  const [generosSeleccionados, setGenerosSeleccionados] = useState([])

  const [menuTexto, setMenutexto] = useState('x')
  const cambiarMenu = () =>{
    if (menuTexto == '='){setMenutexto('x')}else{setMenutexto('=')}}
  
  const seleccionarGenero = (genero) =>{
    if (generosSeleccionados.includes(genero)){
      const nuevosGenereosSeleccionados = generosSeleccionados.filter((g)=> g !== genero)
      setGenerosSeleccionados(nuevosGenereosSeleccionados)  
    }else{
    setGenerosSeleccionados([...generosSeleccionados,genero])
  }
  }
  useEffect(()=>{

    const traerJuegos = async () => {
      const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
      const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'e62375221fmsha7866b80afc8dc2p1b742cjsn77ee71887fac',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
}

try {
	const response = await fetch(url, options);
	const result = await response.json();
  setJuegos(result)
  console.log(result)

} catch (error) {
	console.error(error);
}
    }
    traerJuegos()
  },[])

  return (
    <>
    <nav><div className="menu" onMouseOver={cambiarMenu} onMouseLeave={()=>setMenutexto('=')}>{menuTexto}</div><h1 className='tituloNav'>Juegos Gratis</h1></nav>
      <div className="container" style={{backgroundImage:`url(${fondo})`}}>
        <div className="filtros">

          <div className="ordenarPor">
            <label htmlFor="orderBy">Ordenar:</label>
            <select name="orderBy" id="orderBy" defaultValue={orden}>
              <option value="release-date" >Fecha de lanzamiento</option>
              <option value="popularity">Popularidad</option>
              <option value="alphabetical ">A-Z</option>
              <option value="relevance">Relevancia</option>
            </select>
            </div>

            <div className="generos">
            <div className="genero">
              <input type="checkbox" className='generosCheckBox' id="Todos" name="Todos"  onChange={(e)=>{seleccionarGenero(e.target.name)}}/>
              <label htmlFor="Todos">Todos</label>
            </div>
            {generos.map((genero,index)=>{
              return (
                <div className="genero" key={index}>
                  
                      <input type="checkbox" className='generosCheckBox' id={genero} name={genero} onChange={(e)=>{seleccionarGenero(e.target.name)}} />
                      <label htmlFor={genero}>{genero}</label>
                </div>

              

              
              )
            })}
            </div>

          </div>
      {
        /* Generamos los juegos que devuelve la Api */
      juegos
      .filter((juego)=>{
        if (generosSeleccionados.length > 0 ){
          return (generosSeleccionados.includes(juego.genre.toLowerCase()) || generosSeleccionados.includes('Todos'))
        }else{
          
          return true
        }
      } )
      .map((juego)=>{
        
        return(

        <div className="juego" key={juego.id}>
          <div className="carta">
            <div className="imgPlaceHolderCarta">
              <img src={juego.thumbnail} alt="" className='imgCarta' />
            </div>
            <div className="tituloCarta">{juego.title} {juego.genre}
            </div>
            <div className="descripcion">{juego.short_description}</div>
          </div></div>
      
      )}
      )}
      </div>
    </>
  )
}

export default App
