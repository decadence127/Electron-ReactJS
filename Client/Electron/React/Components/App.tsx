import * as React from 'react';

interface Props{
  text: String
}

const clickHandler = () =>{
  return(event: React.MouseEvent) =>{
    console.log();
    event.preventDefault()
  }

}
const App: React.FC<Props>  = ({text}) => {
  return (
    <div>
      <button onClick={clickHandler()}>Click me!</button>
      {text}
    </div>
  );
};

export default App;