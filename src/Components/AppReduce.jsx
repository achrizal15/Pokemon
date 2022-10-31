const INITIAL_DATA = localStorage.getItem("mypokemon")?JSON.parse(localStorage.getItem("mypokemon")):[]
const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      localStorage.setItem("mypokemon",JSON.stringify([...state,action.payload]))
      return [...state,action.payload ].sort()
    case "DELETE":
      const stateFiltered=state.filter((e)=>e.name!==action.payload)
      if(action.payload===999){
        localStorage.removeItem("mypokemon")
        return []
      }
      localStorage.setItem("mypokemon",JSON.stringify(stateFiltered))
      return stateFiltered
    default:
      return state
  }
}
export {AppReducer,INITIAL_DATA}