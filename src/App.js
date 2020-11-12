import React, { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Links } from './components/LinkSection';
import { Footer } from './components/MainFooter';
import { Nooblist } from './components/Nooblist';
import * as jsonRequest from './json';
import { CompanySelector } from './components/CompanySelector';
import { FloorMap } from './components/FloorMap';
const isFullScreen = window.outerWidth > 800 && window.outerHeight > 600;
if (localStorage.expandInput === 'true') {
  if (!isFullScreen) window.open('index.html');
}

const SELECTED_COMPANY_KEY = 'selectedCompany';
// Ugly stuff to be able to select json file from dropdown.
const jsonFiles = Object.entries(jsonRequest).map((j) => j[1]);
const defaultSelected = localStorage.getItem(SELECTED_COMPANY_KEY);
const defaultSelectedJson = defaultSelected
  ? jsonFiles.filter((j) => j.id === defaultSelected)[0]
  : {};
const defaultBoxes = defaultSelected
  ? defaultSelectedJson.checkbox_sections
      .map((s) => s.boxes.map((b) => b.id))
      .flat()
  : undefined;
const defaultCheckedBoxes = defaultSelected
  ? defaultBoxes.filter((b) => localStorage.getItem(b) === 'true')
  : undefined;

// some console stuff for devs...
//#region
const bigPink =
  'color: hotpink; font-size:20pt; font-weight: bold; line-height: 40px;';
const smallBlack = 'font-size:10pt;';
const smallPinkLink = 'color: hotpink; font-size: 10pt; font-weight: bold;';
console.log('%cHello Cutie.', bigPink);
console.log(
  '%cHvis du har funnet veien hit så vil du være med i 🕸 Web Chapter.',
  smallBlack
);
console.log(
  '%cSend en søt epost til en av lederne da vel. Du finner oss i medlemslisten.',
  smallBlack
);
console.log(
  '%cFinn oss da ❤️ %chttps://projects.knowit.no/display/FAG/Web+Chapter',
  smallBlack,
  smallPinkLink
);
console.log('');
//#endregion

function App() {
  const [selectedJson, setSelectedJson] = useState(defaultSelectedJson);
  const [totalBoxCount, setTotalBoxCount] = useState(
    defaultBoxes ? defaultBoxes.length : 0
  );
  const [checkedBoxesCount, setCheckedBoxesCount] = useState(
    defaultCheckedBoxes ? defaultCheckedBoxes.length : 0
  );
  const [showMap, setShowMap] = useState(false);

  const style = {
    placeholderText: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '2em',
      fontSize: '3em',
      color: 'lightgray',
    },
    main: {
      maxWidth: '960px',
      margin: 'auto',
      boxShadow: isFullScreen ? '0px 5px 10px 3px grey' : '',
    },
    padding: {
      padding: '0 30px 30px 30px',
    },
    footer: {
      width: isFullScreen ? '960px' : '',
    },
  };
  return (
    <main style={style.main}>
      <div style={style.padding}>
        <header>
          <Header showMap={showMap} setShowMap={setShowMap} />
          <CompanySelector
            jsonFiles={jsonFiles}
            selectedJson={selectedJson}
            setSelectedJson={setSelectedJson}
            totalBoxCount={totalBoxCount}
            setTotalBoxCount={setTotalBoxCount}
            checkedBoxesCount={checkedBoxesCount}
            setCheckedBoxesCount={setCheckedBoxesCount}
          />
        </header>
        <span>
          <h2>{selectedJson.id}</h2>
        </span>
        {showMap && <FloorMap setShowMap={setShowMap} showMap={showMap} />}

        <div className="App">
          {selectedJson.id ? (
            <div>
              <Links link_sections={selectedJson.link_sections} />
              <Nooblist
                checkbox_sections={selectedJson.checkbox_sections}
                checkedBoxesCount={checkedBoxesCount}
                setCheckedBoxesCount={setCheckedBoxesCount}
              />
            </div>
          ) : (
            !showMap && (
              <span style={style.placeholderText}>
                Select your Knowit company&nbsp;
                <span role="img" aria-label="">
                  ↗️
                </span>
              </span>
            )
          )}
        </div>
      </div>
      <div style={style.footer}>
        <Footer
          totalBoxCount={totalBoxCount}
          selectedJson={selectedJson}
          checkedBoxesCount={checkedBoxesCount}
          setCheckedBoxesCount={setCheckedBoxesCount}
          isFullScreen={isFullScreen}
        />
      </div>
    </main>
  );
}

export default App;
