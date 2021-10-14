import * as React from 'react';

interface Props{
  text: String
}

const App: React.FC<Props>  = ({text}) => {
  return (
    <div>{text}</div>
  );
};

export default App;