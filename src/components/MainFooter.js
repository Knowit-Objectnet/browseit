import React, { useState } from "react";
import expand from "../img/expand.png";

export function Footer(props) {
  const totalCount = props.totalBoxCount;
  const checkedCount = props.checkedBoxesCount;

  const [expandInput, setExpandInput] = useState(
    localStorage.getItem("expandInput")
  );

  const resize = () => {
    const href = "index.html";
    window.open(href);
  };

  const onChange = () => {
    let value = expandInput === "true" ? "false" : "true";
    localStorage.setItem("expandInput", value);
    setExpandInput(value);
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
        {props.isFullScreen && (
          <img id="expandMe" src={expand} alt="" onClick={resize} />
        )}
        <input
          type="checkbox"
          checked={expandInput === "true" ? true : false}
          onChange={onChange}
        ></input>
        <label style={style.label}>alltid åpne i ny fane</label>
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
          {checkedCount}/{totalCount}
        </div>
      }
    </footer>
  );
}
