import Card from "../Components/Card"
import Layout from "../Components/Layout"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
const ENDPOINT = "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0"
const Home = () => {
    const { AppData } = useContext(AppContext)
    const [dataPokemon, setDataPokemon] = useState([])
    const [nextUrl, setNextUrl] = useState()
    const [backUrl, setBackUrl] = useState()
    const fetchPokemon = async (url) => {
        const listPokemon = await fetch(`${url}`).then(async(res) =>await res.json())
        setDataPokemon([])
        setNextUrl(listPokemon.next)
        setBackUrl(listPokemon.previous)
        function mergePokemonApi(results)  {
            results.forEach( async pokemon => {
              const res = await fetch(pokemon.url)
              const data =  await res.json()
              setDataPokemon( currentList => [...currentList, {name:pokemon.name,image:data.sprites.other.home.front_default,type:data.types[0].type.name}])
            })
          }
          mergePokemonApi(listPokemon.results)
    }
    useEffect(() => {
        fetchPokemon(ENDPOINT)
    }, [])
    return (<Layout>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {dataPokemon && dataPokemon.map((item, key) => {
                return (<Card key={key} name={item.name} img={item.image} type={item.type}>
                    <div className="flex"><Link to={`/detail/${item.name}`}><span className="badge badge-primary p-3">View</span></Link>
                        <span className="badge badge-accent p-3">Capture {AppData.filter((x) => x.id === item.name).length}</span></div>
                </Card>)
            })}

        </div>
        <div className="fixed bottom-5">
            <div className="btn-group grid grid-cols-2">
                {backUrl != null ? <button onClick={()=>fetchPokemon(backUrl)} className="btn btn-secondary">Previous page</button> : <button disabled className="btn btn-secondary">Previous page</button>}
                <button className="btn btn-active" onClick={()=>fetchPokemon(nextUrl)}>Next</button>
            </div>
        </div>
    </Layout>)
}
export default Home