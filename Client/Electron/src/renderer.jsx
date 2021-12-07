import "./index.css";
import React, { createContext } from 'react'
import ReactDOM from "react-dom";
import App from "./App";
import UserStore from "./Context/Store/userStore";




export const Context = createContext({
  user: null,
  colorModel: null
})

ReactDOM.render(<Context.Provider value={{
  user: new UserStore(),
}}>
  <App />
</Context.Provider>,
  document.getElementById('root'))
