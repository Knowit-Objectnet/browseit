import React from 'react';

export function CompanySelector(props) {
  const handleSelect = (event) => {
    const selectedJson = props.jsonFiles.filter(
      (j) => j.id === event.target.value
    )[0];
    props.setSelectedJson(selectedJson);
    let allBoxCount = 0;
    let checkedBoxes = 0;
    selectedJson.checkbox_sections.forEach((s) => {
      s.boxes.forEach((b) => {
        allBoxCount++;
        if (localStorage.getItem(b.id) === 'true') checkedBoxes++;
      });
    });
    props.setTotalBoxCount(allBoxCount);
    props.setCheckedBoxesCount(checkedBoxes);
    localStorage.setItem('selectedCompany', selectedJson.id);
  };

  const style = {
    companySelector: {
      display: 'flex',
      width: '100%',
      justifyContent: 'flex-end',
    },
  };

  return (
    <div style={style.companySelector}>
      <select onChange={handleSelect} value={props.selectedJson.id}>
        {!props.selectedJson.id && <option>Choose..</option>}
        {props.jsonFiles.map((file) => {
          return (
            <option value={file.id} key={file.id}>
              {file.id}
            </option>
          );
        })}
      </select>
    </div>
  );
}
