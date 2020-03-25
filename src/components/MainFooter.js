import React from "react";
import "../App.css";
import expand from "../img/expand.png";

export function Footer(props) {
  const total = props.totalBoxCount;
  const checked = props.checkedBoxesCount;
  const resize = () => {
    const href = "index.html";
    window.open(href);
  };

  const style = {
    tab: {
      display: "flex",
      alignItems: "center"
    },
    label: {
      paddingLeft: "6px"
    }
  };

  return (
    <footer>
      <div id="expand" style={style.tab}>
        <img id="expandMe" src={expand} alt="" onClick={resize} />
        <label style={style.label}>åpne i ny fane</label>
      </div>
      <div id="feedback">
        Kildekode:{" "}
        <a href="https://github.com/knowit/browseit">
          github.com/knowit/browseit
        </a>
        – Versjon <span className="version">3.0</span>.
        <br />
        Send gjerne forslag til
        <a href="mailto:michael.johansen@knowit.no">
          {" "}
          michael.johansen@knowit.no
        </a>
      </div>
      {
        <div id="counter">
          {checked}/{total}
        </div>
      }
    </footer>
  );
}
