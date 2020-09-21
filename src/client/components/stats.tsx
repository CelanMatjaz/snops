import * as React from 'react';
import styled from 'styled-components';
import * as ReactDOM from 'react-dom';

interface Props {
  numOfPlayers: number;
  numOfPlayersReady: number;
}

const Stats: React.FC<Props> = (props) => {
  const { numOfPlayers, numOfPlayersReady, children } = props;

  return ReactDOM.createPortal(
    <StatsContainer>
      <div>Players connected: {numOfPlayers}</div>
      <div>Players ready: {numOfPlayersReady}</div>
      <div>{children}</div>
      <ReadyButton disabled>Ready</ReadyButton>
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
`;

const ReadyButton = styled.button`
  color: white;
  border-radius: 2px;
  border: 2px solid white;
  background-color: #313131;
  padding: 6px;
  margin-top: 6px;
  cursor: pointer;

  &:disabled {
    background-color: gray;
    cursor: default;
  }
`;
