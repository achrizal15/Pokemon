import {Link} from "react-router-dom"
const Menu = () => {
    return (
     <div className="fixed bottom-0 right-5 z-10">
           <div className="dropdown dropdown-top dropdown-end dropdown-hover animate-bounce">
            <label tabIndex={0} className="btn bg-transparent hover:bg-transparent border-0 m-1"><img src="/pokedex.png" width={50} alt="pokedex" /></label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link to="/">Pokemon List</Link></li>
                <li><Link to="/my-pokemon">My Pokemon</Link></li>
            </ul>
        </div>
     </div>
    )
}
export default Menu