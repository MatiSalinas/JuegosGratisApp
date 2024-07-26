import React from "react";

const generos = ['mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social',  'card', 'mmo', 'fantasy', 'fighting', 'action-rpg', 'action']
const tags = ['sandbox','open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-Person', 'top-down','tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'battle-royale','mmofps', 'mmotps', '3d', '2d', 'anime', 'sci-fi', 'military', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts']
const plataformas = ['all','pc','browser']

export const aplicarFiltros = (url,filtros) => {
    if (filtros.tags.length !=0){
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
    if (filtros.sort){
      if(url.includes('filter')){
        url += `sort-by=${filtros.sort}`
      }else{
        url += `?sort-by=${filtros.sort}`
      }
    }
    
    if (filtros.platform){
      url += `&platform=${filtros.platform}`
      
    }

    return url
}



function Filtros({setFiltros,setGenerosSeleccionados, filtros = [],generosSeleccionados = []}){
    const seleccionarGenero = (genero) =>{
        if (generosSeleccionados.includes(genero)){
          const nuevosGenereosSeleccionados = generosSeleccionados.filter((g)=> g !== genero)
          setGenerosSeleccionados(nuevosGenereosSeleccionados)  
        }else{
        setGenerosSeleccionados([...generosSeleccionados,genero])
      }
      }
    
      
      const seleccionartag = (tag) => {
        if(filtros.tags.includes(tag)){
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
      }
    
    
    return ( 
    <>
    <div className="filtros">

<div className="ordenarPor">
    <label htmlFor="orderBy" className='labelSort'>Ordenar:</label>
    <select name="orderBy" id="orderBy"  value={filtros.sort} onChange={(e)=>{setFiltros({...filtros,['sort']:e.target.value})}}>
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
  <h2>Plataforma</h2>
    <br />
    <div className="plataformas">
    {

plataformas.map((Plataforma,index)=>{

  return (
    <div className="Plataforma" key={index}>
          <input type="radio" className='plataformasCheckBox' id={Plataforma} value={Plataforma} checked={Plataforma==filtros['platform']} onChange={(e)=>{setFiltros({...filtros,['platform']:e.target.value})}} />
          <label htmlFor={Plataforma}>{Plataforma}</label>
    </div>

    )
})
  
  }
    </div>
</div>
    </>)
}
export default React.memo(Filtros)