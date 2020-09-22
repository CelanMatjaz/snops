import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';

import { socket } from '..';
import { channels } from '../../server/socket/channels';

interface Props {
  numOfPlayers: number;
  numOfReadyPlayers: number;
  disableReadyButton: boolean;
}

const Stats: React.FC<Props> = (props) => {
  const { numOfPlayers, numOfReadyPlayers, disableReadyButton, children } = props;
  const [isReady, setIsReady] = React.useState(false);

  return ReactDOM.createPortal(
    <StatsContainer>
      <div>Players connected: {numOfPlayers}</div>
      <div>
        Players ready: {numOfReadyPlayers} - <ReadyIndicator isReady={isReady} />
      </div>
      <div>{children}</div>
      <ReadyButton
        isReady={isReady}
        disabled={disableReadyButton}
        onClick={() => {
          setIsReady(!isReady);
          socket.emit(channels.setIsReady, !isReady);
        }}>
        Ready
      </ReadyButton>
    </StatsContainer>,
    document.getElementById('stats-root')!
  );
};

export default Stats;

const StatsContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #313131;
  color: white;
  padding: 10px;
  z-index: 1;
  border-radius: 2px;
  font-size: 20px;
  line-height: 20px;
`;

const ReadyButton = styled.button<{ isReady: boolean }>`
  color: white;
  border-radius: 2px;
  border: 2px solid white;
  background-color: ${(props) => (props.isReady ? 'dodgerblue' : '#313131')};
  padding: 6px;
  margin-top: 6px;
  cursor: pointer;

  &:disabled {
    background-color: gray;
    cursor: default;
  }
`;

const ReadyIndicator = styled.div<{ isReady: boolean }>`
  display: inline-block;
  width: 30px;
  height: 16px;
  background-color: ${(props) => (props.isReady ? 'green' : 'red')};
`;
