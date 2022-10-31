const DEFAULT_IMG="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
const Card = ({name="Pokemon #001",img=DEFAULT_IMG,type="water",children}) => {
    return (
        <div className={`card card-compact w-full bg-base-100 shadow-xl hover:shadow-none hover:scale-105 duration-300 pt-4 ${type}`}>
            <figure><img src={img} width={200} alt="pok" /></figure>
            <div className="card-body">
                <h2 className="card-title text-center">{name}</h2>
               {children}
            </div>
        </div>
    )
}
export default Card