import * as React from 'react';
import styled from 'styled-components';

interface Props {
  numberOfPlayers: number;
}

const Field: React.FC<Props> = (props) => {
  const { numberOfPlayers } = props;

  return (
    <FieldContainer>
      <HandClient id='player-hand-client' />
      {numberOfPlayers === 3 || numberOfPlayers === 4 ? (
        <HandOtherPlayerSide side='left' id='player-hand-left' />
      ) : null}
      {numberOfPlayers === 3 || numberOfPlayers === 4 ? (
        <HandOtherPlayerSide side='right' id='player-hand-right' />
      ) : null}
      {numberOfPlayers === 2 || numberOfPlayers === 4 ? (
        <HandOtherPlayerTop id='player-hand-top' />
      ) : null}

      <Middle />
    </FieldContainer>
  );
};

export default Field;

const FieldContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const HandCommon = styled.div`
  position: absolute;
  background-color: gray;
`;

const HandClient = styled(HandCommon)`
  width: 600px;
  height: 100px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const HandOtherPlayerSide = styled(HandCommon)<{ side: 'left' | 'right' }>`
  height: 400px;
  width: 100px;
  ${(props) => props.side}: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const HandOtherPlayerTop = styled(HandCommon)`
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 100px;
`;

const Middle = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: lightskyblue;
  width: 400px;
  height: 300px;
`;
