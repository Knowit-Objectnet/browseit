import React from "react";
import "../App.css";
import mapMarkedSolid from "../img/map-marked-alt-solid.svg";
import webChapter from "../img/web-chapter-logo.png";

export function Header(props) {
  let mapVisible = props.showMap;

  
  return (
    <div>
      <div id="leftheader">
        <a
          id="title"
          href="https://bit.ly/welcome-to-knowit"
          title="See in Chrome WebStore"
        >
          BrowseIt
        </a>
      </div>

      <img
        id="mapmarker"
        src={mapMarkedSolid}
        width="40"
        alt=""
        onClick={() => props.setShowMap(!mapVisible)}
      />
      <a href="https://projects.knowit.no/display/FAG/Web+Chapter">
        <img id="twc" src={webChapter} alt="" />
      </a>
    </div>
  );
}
