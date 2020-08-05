import React, { useState } from 'react';

export function TodoItem(props) {
  const label = props.label;
  const id = props.id;
  const timeId = `${props.id}_time`;
  const inputStyle = {
    width: '4.5em',
  };

  const [checked, setChecked] = useState(localStorage.getItem(id));
  const [text, setText] = useState(localStorage.getItem(timeId));

  const handleCheck = () => {
    const checkedCount = props.checkedBoxesCount;
    const isChecked = checked === 'true' ? 'false' : 'true';
    if (isChecked === 'true') {
      props.setCheckedBoxesCount(checkedCount + 1);
    } else {
      props.setCheckedBoxesCount(checkedCount - 1);
    }
    localStorage.setItem(id, isChecked);
    setChecked(isChecked);
  };

  const handleText = (event) => {
    localStorage.setItem(timeId, event.target.value);
    setText(event.target.value);
  };

  return (
    <div>
      {props.placeholder && (
        <input
          type="text"
          id={timeId}
          placeholder={props.placeholder}
          style={inputStyle}
          value={text ? text : ''}
          onChange={handleText}
        />
      )}
      <label>
        <input
          type="checkbox"
          id={id}
          onChange={handleCheck}
          checked={checked === 'true' ? true : false}
        />
        {label} {props.href && <a href={props.href}>(lenke)</a>}
      </label>
    </div>
  );
}
