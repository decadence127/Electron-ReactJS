import "./index.css";
import React, { Context } from 'react'
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { SocketContext } from './Context/socketContext'

const socket = window.clientSocket

ReactDOM.render(<SocketContext.Provider value={socket}><App /></SocketContext.Provider>, document.getElementById('root'))
