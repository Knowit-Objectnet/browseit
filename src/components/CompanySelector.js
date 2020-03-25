import React from "react";

export function CompanySelector(props) {
  
  const handleSelect = event => {
    let selectedJson = props.jsonFiles.filter(
      j => j.id === event.target.value
    )[0];
    props.setSelectedJson(selectedJson);
    let allBoxCount = 0;
    let checkedBoxes = 0;
    selectedJson.checkbox_sections.forEach(s => {
      s.boxes.forEach(b => {
        allBoxCount++;
        if (localStorage.getItem(b.id) === "true") checkedBoxes++;
      });
    });
    props.setTotalBoxCount(allBoxCount);
    props.setCheckedBoxesCount(checkedBoxes);
    localStorage.setItem('selectedCompany', selectedJson.id);
  };

  const style = {
    companySelector: {
      display: "flex",
      width: "100%",
      justifyContent: "flex-end"
    }
  };
  
  return (
    <div style={style.companySelector}>
      <select onChange={handleSelect} defaultValue={props.selectedJson.id}>
        {props.jsonFiles.map((file, i) => {
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
