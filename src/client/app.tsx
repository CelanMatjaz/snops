import * as React from 'react';
import { useDrop } from 'react-dnd';
import io from 'socket.io-client';
import styled from 'styled-components';
import { channels } from '../server/socket/channels';
import Field from './components/field';
import Stats from './components/stats';

const App: React.FC = () => {
  const [text, setText] = React.useState('waiting...');
  const [numOfPlayers, setNumOfPlayers] = React.useState(0);

  React.useEffect(() => {
    const socket = io.connect(window.location.host);

    socket.on(channels.updateNumOfPlayers, (num) => {
      setNumOfPlayers(num);
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <AppContainer>
      <Stats numOfPlayers={numOfPlayers} numOfPlayersReady={0}>
        {text}
      </Stats>
      <Field numberOfPlayers={numOfPlayers} />
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  height: 900px;
  width: 1600px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
