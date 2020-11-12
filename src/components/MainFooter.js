import React, { useState } from 'react';
import expandImageSrc from '../img/expand.png';
import {version} from '../public/manifest.json';

export function Footer(props) {
  const totalCount = props.totalBoxCount;
  const checkedCount = props.checkedBoxesCount;

  const [expandInput, setExpandInput] = useState(
    localStorage.getItem('expandInput')
  );

  const resize = () => {
    const href = 'index.html';
    window.open(href);
  };

  const onChange = () => {
    const isExpanded = expandInput === 'true' ? 'false' : 'true';
    localStorage.setItem('expandInput', isExpanded);
    setExpandInput(isExpanded);
  };

  const style = {
    tab: {
      display: 'flex',
      alignItems: 'center',
    },
    label: {
      paddingLeft: '6px',
      minWidth: '140px',
    },
  };

  return (
    <footer>
      <div id="expand" style={style.tab}>
        {props.isFullScreen? (
          <label style={style.label}>
          <input
            type="checkbox"
            checked={expandInput === 'true' ? true : false}
            onChange={onChange}
          />
          &nbsp;alltid åpne i ny fane
        </label>
        ):(
          <img id="expandMe" src={expandImageSrc} alt="" onClick={resize} />
        )}
      </div>
      <div id="feedback">
        Kildekode:&nbsp;
        <a href="https://github.com/knowit/browseit">
          github.com/knowit/browseit
        </a>
        - Versjon <span className="version">{version}</span>.
        <br />
        Send gjerne forslag til&nbsp;
        <a href="mailto:michael.johansen@knowit.no">
          michael.johansen@knowit.no
        </a>
      </div>
      <div id="counter">
        {checkedCount}/{totalCount}
      </div>
    </footer>
  );
}
