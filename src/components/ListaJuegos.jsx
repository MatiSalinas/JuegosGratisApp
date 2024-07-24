import React from "react";

const ListaJuegoComponent =({juegos,generosSeleccionados}) => {
    if (juegos.length > 0 ){
        return juegos
        .filter((juego)=>{
            if (generosSeleccionados.length > 0 ){
            return (generosSeleccionados.includes(juego.genre.toLowerCase()) || generosSeleccionados.includes('Todos'))
            }else{
            return true
                }
        })
        .map((juego)=>{
            return(
                <div className="juego" key={juego.id}>
                <div className="carta">
                <div className="imgPlaceHolderCarta">
                    <img src={juego.thumbnail} alt="" className='imgCarta' />
                </div>
                <div className="tituloCarta">{juego.title}
                </div>
                <div className="publisher">{juego.publisher} ({juego.release_date})</div>
                <div className="generoJuego">{juego.genre}</div>
                <div className="descripcion">{juego.short_description}</div>
                </div></div>
        
        )}
        )
    


    }else{
        return(<p style={{fontSize:"3rem"}}>No games found</p>)
    }
    }

    export default React.memo(ListaJuegoComponent);