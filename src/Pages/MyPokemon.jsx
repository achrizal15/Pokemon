import { useContext, useState } from "react"
import { AppContext } from "../App"
import Card from "../Components/Card"
import Layout from "../Components/Layout"
import { Link } from "react-router-dom"
import { ModalDelete } from "../Components/Modals"

const MyPokemon = () => {
    const { AppData } = useContext(AppContext)
    const [deleteData, setDeleteData] = useState({ show: false, data: 0 })
    return (
        <Layout>
            <button className="btn btn-secondary mb-5"onClick={() => setDeleteData({ show: true, data: 999})}>Release all pokemon</button>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {AppData.length>0?AppData.map((item, key) => {
                   return <Card name={item.name} img={item.img} key={key}>
                       <div className="flex">
                        <button onClick={() => setDeleteData({ show: true, data: item.name })}><span className="badge badge-secondary p-3">Delete</span></button>
                       <Link to={`/detail/${item.id}`}><span className="badge badge-primary p-3">View</span></Link>
                       </div>
                    </Card>
                }):<h3 className="text-center text-primary text-xl">No pokemon caught yet!</h3>}
            </div>
            <ModalDelete name={deleteData.data} onClose={() => setDeleteData({ data: null, show: false })} show={deleteData.show} />
        </Layout>
    )
}
export default MyPokemon