import * as React from "react";
import styled from "styled-components";

import { socket } from ".";

const App: React.FC = () => {  
  return (
    <AppContainer>
      Hello Šnops
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
