import { useState, useEffect } from 'react'
import './style.css'
import ListaJuegoComponent from './components/ListaJuegos'

function App() {
  const generos = ['mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social',  'card', 'mmo', 'fantasy', 'fighting', 'action-rpg', 'action']
  const tags = ['sandbox','open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-Person', 'top-down','tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'battle-royale','mmofps', 'mmotps', '3d', '2d', 'anime', 'sci-fi', 'military', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts']

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
  
  const seleccionarGenero = (genero) =>{
    if (generosSeleccionados.includes(genero)){
      const nuevosGenereosSeleccionados = generosSeleccionados.filter((g)=> g !== genero)
      setGenerosSeleccionados(nuevosGenereosSeleccionados)  
    }else{
    setGenerosSeleccionados([...generosSeleccionados,genero])
  }
  }

  const seleccionartag = (tag) => {
    console.log(tag)
    if(filtros.tags.includes(tag)){
      console.log('Si')
      const nuevosTags = filtros.tags.filter((t)=> t !== tag)
      setFiltros({
        ...filtros,['tags'] : nuevosTags
      })
    }else{
      setFiltros(
        {
          ...filtros,['tags'] : [...filtros.tags,tag]
        }
      )
    }
    console.log(filtros)
  }

  const aplicarFiltros = (url) => {
    if (filtros.tags.length !=0){
      console.log('entre')
      url += 'filter'
      if (filtros.tags.length > 1){
        url += `?tag=`
        filtros.tags.forEach((element,index) => {
          url += `${element}`
          if (index< filtros.tags.length -1){
            url += '.'
          }else{
            url +='&'
          }
        })
      }
      else{
      filtros.tags.forEach((element) => {
        url += `?tag=${element}&`

        
      });
    }}
    else{
      url += 'games'
    }
    if (filtros.platform){
      url += `?platform=${filtros.platform}`
    }
    if (filtros.sort){
      url += `?sort-by=${filtros.sort}`
    }
    

    return url
  }
  useEffect(()=>{

    const traerJuegos = async () => {
      const url = 'https://free-to-play-games-database.p.rapidapi.com/api/';
      const nuevaUrl = aplicarFiltros(url)
      console.log(nuevaUrl)
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
        <div className="filtros">

          <div className="ordenarPor">
            <label htmlFor="orderBy" className='labelSort'>Ordenar:</label>
            <select name="orderBy" id="orderBy"  defaultValue={filtros.sort} value={filtros.sort} onChange={(e)=>{setFiltros({...filtros,['sort']:e.target.value})}}>
              <option value="release-date" >Fecha de lanzamiento</option>
              <option value="popularity">Popularidad</option>
              <option value="alphabetical ">A-Z</option>
              <option value="relevance">Relevancia</option>
            </select>
            </div>
            
            <h2>Generos</h2>
            <div className="generos"> 
            <div className="genero">
              <input type="checkbox" className='generosCheckBox' id="Todos" name="Todos"  onChange={(e)=>{seleccionarGenero(e.target.name)}}/>
              <label htmlFor="Todos">Todos</label>
            </div>

            {
            generos.map((genero,index)=>{
              return (
                <div className="genero" key={index}>
                  
                      <input type="checkbox" className='generosCheckBox' id={genero} name={genero} onChange={(e)=>{seleccionarGenero(e.target.name)}} />
                      <label htmlFor={genero}>{genero}</label>
                </div>

                )
            })
            }
              </div>
              <h2>Tags</h2>
              <br />
            <div className="tags"> 
            {
            tags.map((tag,index)=>{
              return (
                <div className="tag" key={index}>
                      <input type="checkbox" className='tagsCheckBox' id={tag} name={tag} onChange={(e)=>{seleccionartag(e.target.name)}} />
                      <label htmlFor={tag}>{tag}</label>
                </div>

                )
            })
            }
            </div>

          </div><div className="juegos">
          <ListaJuegoComponent juegos={juegos} generosSeleccionados={generosSeleccionados}></ListaJuegoComponent>
          </div>
      </div>
    </>
  )
}

export default App
