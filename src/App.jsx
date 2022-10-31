import { createContext, useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import { AppReducer, INITIAL_DATA } from "./Components/AppReduce";
import Detail from "./Pages/Detail";
import Home from "./Pages/Home";
import MyPokemon from "./Pages/MyPokemon";

export const AppContext = createContext()
const AppProvider = AppContext.Provider;

function App() {
  const [AppData, dispatch] = useReducer(AppReducer, INITIAL_DATA)
  return (
    <AppProvider value={{ AppData, dispatch }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-pokemon" element={<MyPokemon />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
      </AppProvider>
  );
}

export default App;
