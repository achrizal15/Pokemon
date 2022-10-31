import { useParams, Link } from "react-router-dom"
import Layout from "../Components/Layout"
import { BiArrowBack } from "react-icons/bi"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import { ModalDelete } from "../Components/Modals"
import Card from "../Components/Card"
const Detail = () => {

    const [abilities, setAbilities] = useState([])
    const [move, setMove] = useState([])
    const [pokemon, setPokemon] = useState([])
    const [variants, setVariants] = useState([])
    const { id } = useParams()
    const ENDPOINT = "https://pokeapi.co/api/v2"

    const [catchStatus, setCatch] = useState(false)
    const { AppData, dispatch } = useContext(AppContext)
    const [deleteData, setDeleteData] = useState({ show: false, data: 0 })
    const handleCatchPokemon = () => {
        const CAPTURED = Math.random() <= 0.5
        setCatch(true)
        if (!CAPTURED) {
            setCatch(false)
        }
        document.getElementById("modal-catch").classList.add("modal-open")
    }
    const handleSubmitCatch = (e) => {
        e.preventDefault()

        const POKEMON_NAME = e.target[0].value
        const IMG_POKEMON = pokemon.image
        const DUPLICATE_NAME = AppData.find((item) => item.name === POKEMON_NAME)

        if (DUPLICATE_NAME) {
            document.getElementById("error-name").removeAttribute("hidden")
            return false
        }
        document.getElementById("modal-catch").classList.remove("modal-open")
        if (POKEMON_NAME === "") return false
        e.target.reset()
        const NEW_POKEMON = { name: POKEMON_NAME, id: id, img: IMG_POKEMON, type: pokemon.type }
        dispatch({ type: "ADD", payload: NEW_POKEMON })
        document.getElementById("error-name").setAttribute("hidden", true)
    }
    useEffect(() => {
        const fetchPokemon = async () => {
            const res = await fetch(`${ENDPOINT}/pokemon/${id}`)
            const data = await res.json()
            const resVar = await fetch(`${ENDPOINT}/pokemon-species/${id}`)
            const dataVar = await resVar.json()
            // console.log(dataType)
            setPokemon({ image: data.sprites.other.home.front_default, name: data.name, type: data.types[0].type.name })
            // const mergeVariants
            data.abilities.forEach((item) => {
                setAbilities(currentData => [...currentData, item.ability.name])
            });
            data.moves.forEach((item) => {
                setMove(currentData => [...currentData, item.move.name])
            });
            function mergeVariants(dataVariant) {
                dataVariant.varieties.forEach(async (item) => {
                    const newData = await fetch(item.pokemon.url).then(async (res) => res.json())
                    setVariants(currentData => [...currentData, { name: newData.name, image: newData.sprites.other.home.front_default, type: newData.types[0].type.name }])
                });
            }
            await mergeVariants(dataVar)
        }
        fetchPokemon()
    }, [])
    return (
        <Layout><article className="border w-full p-4 border-primary rounded-md">
            <div className="grid grid-rows-3 md:grid-rows-1  md:grid-cols-3 gap-4">
                <div className="relative align-center">
                    <Link to="/"><BiArrowBack className="absolute top-0 text-primary" size={30} /></Link>
                    <figure><img src={pokemon.image} alt="" id="img-pokemon" /></figure>
                    <button onClick={() => handleCatchPokemon()} className="btn btn-primary btn-block">Catch</button>
                </div>
                <div className="md:col-span-2 row-span-2 md:row-span-1">
                    <h3 className="text-primary text-2xl font-bold">{pokemon.name}</h3>
                    <ul className="mt-5">
                        <li><span className="font-bold">Abilities : </span>
                            {abilities.sort().map((item, key) => {
                                if (abilities.length - 1 === key) return item
                                return `${item}, `
                            })}
                        </li>
                        <li><span className="font-bold">Captured : </span>
                            {AppData.sort((a, b) => b.name.localeCompare(a.name)).filter((x) => x.id === pokemon.name).map((item, key) => {
                                return <button onClick={() => setDeleteData({ show: true, data: item.name })} className={`p-3 badge ${item.type} border-primary text-black`} key={key}>
                                    {item.name}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            })}

                        </li>
                        <li><span className="font-bold">Move : </span>
                            {move.sort().map((item, key) => {
                                if (move.length - 1 === key) return item
                                return `${item}, `
                            })}
                        </li>

                        <li><span className="font-bold">Type/Variants : </span></li>
                    </ul>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-3">
                    {variants.sort((a, b) => b.name.localeCompare(a.name)).map((item, key) => {
                        return (<Card key={key} img={item.image} name={item.name} type={item.type}></Card>)
                    })}</div>
                </div>
            </div>
        </article>
            <ModalDelete name={deleteData.data} onClose={() => setDeleteData({ data: null, show: false })} show={deleteData.show} />
            <div className="modal" id="modal-catch">
                <form onSubmit={handleSubmitCatch}>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">{catchStatus ? "Congratulations, Pokemon has been caught" : "Oops, pokemon run away"}!</h3>
                        {catchStatus &&
                            <div><label >Immediately name your pokemon!</label>
                                <input type="text" placeholder="Type here" name="pokemon-name" className="input input-primary w-full mt-4" required />
                                <span className="text-red-500" id="error-name" hidden>Duplicate name!</span>
                            </div>
                        }
                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary">Done</button>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    )
}
export default Detail