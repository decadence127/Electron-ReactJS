import "./index.css";
<<<<<<< HEAD
import React, { Context } from 'react'
import ReactDOM from "react-dom";
import App from "./App";
import { SocketContext } from './Context/socketContext'

const socket = window.clientSocket


ReactDOM.render(<SocketContext.Provider value={socket}><App /></SocketContext.Provider>, document.getElementById('root'))
=======
import React from 'react'
import ReactDOM from "react-dom";
import App from "./App";



ReactDOM.render(<App />, document.getElementById('root'))
>>>>>>> BackEnd/backend_1
