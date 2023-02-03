import React, { useState } from 'react';
import { ReactComponent as ThirdFloor } from '../img/u7-map-3.svg';
import { ReactComponent as FourthFloor } from '../img/u7-map-4.svg';
import { ReactComponent as FifthFloor } from '../img/u7-map-5.svg';

export function FloorMap({ showMap, setShowMap }) {
  const style = {
    paddingTop: '1.5em',
    width: '100%',
    cursor: 'pointer',
  };

  const thirdFloor = (
    <ThirdFloor
      fill="darkseagreen"
      stroke="black"
      strokeWidth={0.5}
      title="click to close"
      alt=""
      onClick={() => setShowMap(!showMap)}
    />
  );

  const fourthFloor = (
    <FourthFloor
      fill="darkseagreen"
      stroke="black"
      strokeWidth={0.5}
      title="click to close"
      alt=""
      onClick={() => setShowMap(!showMap)}
    />
  );

  const fifthFloor = (
    <FifthFloor
      fill="darkseagreen"
      stroke="black"
      strokeWidth={0.5}
      title="click to close"
      alt=""
      onClick={() => setShowMap(!showMap)}
    />
  );

  const floors = {
    thirdFloor: thirdFloor,
    fourthFloor: fourthFloor,
    fifthFloor: fifthFloor,
  };

  const [selectedFloorComponent, setSelectedFloorComponent] = useState(
    floors['fifthFloor']
  );

  const handleSelectedFloor = (event) => {
    setSelectedFloorComponent(floors[event.target.value]);
  };

  return (
    <div>
      <select onChange={handleSelectedFloor}>
        <option value={'fifthFloor'}>Femte etasje U1</option>
        <option value={'fourthFloor'}>Fjerde etasje U1</option>
        <option value={'thirdFloor'}>Tredje etasje U1</option>
      </select>
      <div style={style}>{selectedFloorComponent}</div>
    </div>
  );
}
