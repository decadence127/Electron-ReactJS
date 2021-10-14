import App from "../React/Components/App"
import * as React from 'react';
import * as ReactDOM from 'react-dom';
function render(): void {  
  ReactDOM.render(<App text="Hello"/>, document.body);
}
render();