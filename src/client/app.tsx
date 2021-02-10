import * as React from "react";
import styled from "styled-components";

const App: React.FC = () => {  
  return <div>Hello Šnops</div>
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
