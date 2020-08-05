import React from "react";
import fifthFloor from "../img/sundt-etasje-5.png";

export function FloorMap({showMap, setShowMap}) {

  const style = {
      paddingTop: "1.5em",
      width: "100%",
      cursor: "pointer"
  };

  return (
    <div>
      <img
        src={fifthFloor}
        style={style}
        title="click to close"
        alt=""
        onClick={() => setShowMap(!showMap)}
      />
    </div>
  );
}
