import { useContext } from "react"
import { AppContext } from "../App"

const ModalDelete = ({name=null,show,onClose=()=>null}) => {
    const {  dispatch }=useContext(AppContext) 
    const handleDelete=()=>{
        dispatch({type:"DELETE",payload:name})
        onClose()
    }
    return (<div className={`modal ${show&&"modal-open"}`}>
        <div className="modal-box">
            <h3 className="font-bold text-lg">Are you sure?</h3>
            <div className="modal-action">
                <button type="button" onClick={()=>handleDelete()} className="btn btn-primary">Done</button>
                <button type="button" onClick={()=>onClose()} className="btn btn-secondary">Cancel</button>
            </div>
        </div>
    </div>)
}
export { ModalDelete }