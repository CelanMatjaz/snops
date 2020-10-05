import * as React from "react";
import * as ReactDOM from "react-dom";

interface Props {
  showDraw: boolean;
}

const ShowShuffleTypeSelect: React.FC<Props> = (props) => {
  const { showDraw } = props;

  return ReactDOM.createPortal(
    <div>
      {showDraw ? <div>DRAW</div> : null}
      <div>TAP</div>
      <div>CUT</div> <input type="range" />
    </div>,
    document.getElementById("deal-type-select-root")!
  );
};

export default ShowShuffleTypeSelect;
