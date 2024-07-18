import { useState, useEffect } from 'react'
import './style.css'

function App() {
  const [juegos, setJuegos] = useState([])
  const [menuTexto, setMenutexto] = useState('x')
  const cambiarMenu = () =>{
    if (menuTexto == '='){setMenutexto('x')}else{setMenutexto('=')}}
  

  useEffect(()=>{

    const traerJuegos = async () => {
      const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
      const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'e62375221fmsha7866b80afc8dc2p1b742cjsn77ee71887fac',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
  setJuegos(result)

} catch (error) {
	console.error(error);
}
    }

    traerJuegos()
  },[])

  return (
    <>
    <nav><div className="menu" onMouseOver={cambiarMenu} onMouseLeave={()=>setMenutexto('=')}>{menuTexto}</div><h1 className='tituloNav'>Juegos Gratis</h1></nav>
      <div className="container">
      {
      juegos.map((juego)=>{
        console.log(juego)
        return(

        <div className="juego" key={juego.id}>
          <div className="carta">
            <div className="imgPlaceHolderCarta">
              <img src={juego.thumbnail} alt="" className='imgCarta' />
            </div>
            <div className="tituloCarta">{juego.title}
            </div>
          </div></div>
      
      )}
      )}
      </div>
    </>
  )
}

export default App
