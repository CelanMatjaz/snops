import * as React from 'react';
import io from 'socket.io-client';

const App: React.FC = () => {
  const [text, setText] = React.useState('Hello world');

  React.useEffect(() => {
    const socket = io.connect(`http://localhost:8000`);
    socket.on('get', (socket) => {
      console.log(socket);
      setText(socket);
    });
    return () => {};
  }, []);

  return <h1>{text}</h1>;
};

export default App;
