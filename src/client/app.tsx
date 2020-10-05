import * as React from "react";
import styled from "styled-components";
import { socket } from ".";
import { Player } from "../server/game/Types";
import { channels } from "../server/socket/channels";
import Field from "./components/field";
import ShowDealTypeSelect from "./components/showDealTypeSelect";
import Stats from "./components/stats";

const App: React.FC = () => {
  const [numOfPlayers, setNumOfPlayers] = React.useState(0);
  const [numOfReadyPlayers, setNumOfReadyPlayers] = React.useState(0);
  const [clientId, setClientId] = React.useState<string>("");
  const [showDealTypeSelect, setShowDealTypeSelect] = React.useState(false);
  const [playerNumber, setPlayerNumber] = React.useState<number>(0);
  const [disableReadyButton, setDisableReadyButton] = React.useState<boolean>(
    true
  );

  React.useEffect(() => {
    socket.on(channels.updateNumOfPlayers, (num: number) => {
      setNumOfPlayers(num);
      if (num > 1 && num < 5) setDisableReadyButton(false);
      else setDisableReadyButton(true);
    });

    socket.on(channels.sendId, (data: { id: string; playerNum: number }) => {
      setClientId(data.id);
      setPlayerNumber(data.playerNum);
    });

    socket.on(channels.updateNumOfReadyPlayers, (num: number) => {
      setNumOfReadyPlayers(num);
    });

    socket.on(channels.gameStarted, (playerToSelectDealType: Player) => {
      if (playerNumber === playerToSelectDealType.playerNumber) {
        setShowDealTypeSelect(true);
      }
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <AppContainer>
      <Stats
        numOfPlayers={numOfPlayers}
        numOfReadyPlayers={numOfReadyPlayers}
        disableReadyButton={disableReadyButton}
      >
        <div>Player number: {playerNumber}</div>
      </Stats>
      {showDealTypeSelect ? (
        <ShowDealTypeSelect showDraw={numOfPlayers === 2} />
      ) : null}
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
