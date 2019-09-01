import React, { useState, useEffect } from 'react';

import '../node_modules/react-vis/dist/style.css';
import './App.css';

import Graph from './graph';
import PositionInfo from './positionInfo';
import User from './user';
import { fromIndexToUserId } from './helpers';
import UserDetail from './userDetail';

function App() {
  const [index, setIndex] = useState(0);
  const [userId, setUserId] = useState(undefined);
  const [showAll, setShowAll] = useState(false);
  const [displayDefaultTitle, setDefaultTitleDisplay] = useState(true);
  const [showUserStats, setShowUserStats] = useState(false);
  const [userPosition, setUserPosition] = useState({
    x: undefined,
    y: undefined,
    time: undefined,
  });
  const [dataToDisplay, setDataToDisplay] = useState({});
  const [rawData, setRawData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch('trajectoires.json');
      const data = await resp.json();

      setRawData(data);
    }

    try {
      fetchData();
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  }, []);

  useEffect(() => {
    const sortedByTimeData = rawData.reduce((acc, curr) => {
      let client = {
        id: curr.id,
        points: curr.points.sort((a, b) => a.time - b.time),
      };
      return [...acc, client];
    }, []);

    const usefullData = sortedByTimeData.reduce((acc, curr) => {
      const sanitizedPoints = curr.points.reduce((acc, curr) => {
        return [...acc, { x: curr.x, y: curr.y, time: curr.time }];
      }, []);
      return [...acc, sanitizedPoints];
    }, []);

    if (!userId && rawData.length !== 0) {
      setUserId(rawData[0].id);
    }

    if (rawData.length !== 0) {
      setDataToDisplay(usefullData);
    }
  }, [rawData, userId]);

  const onHoverOverUser = (userPosition = {}, index) => {
    const hoveredOverUserData = fromIndexToUserId(index, rawData);
    setUserPosition(userPosition);
    setUserId(hoveredOverUserData);
    setDefaultTitleDisplay(false);
  };

  const onUserClick = (id = 0) => {
    const index = rawData.findIndex(u => u.id === id);
    setIndex(index);
    setUserId(id);
    setDefaultTitleDisplay(true);
    setShowUserStats(true);
  };

  const onButtonClick = () => {
    setShowAll(!showAll);
    setDefaultTitleDisplay(!displayDefaultTitle);
    setShowUserStats(!showUserStats);
  };

  return (
    <div className="App">
      <header className="App-header">
        <PositionInfo
          displayDefaultTitle={displayDefaultTitle}
          userId={userId}
          time={userPosition.time}
          x={userPosition.x}
          y={userPosition.y}
        />
        <div className="container">
          <div className="customers">
            <button id="button" onClick={onButtonClick}>
              Show All Customers
            </button>
            {rawData.map((user, i) => {
              return <User onUserClick={onUserClick} key={i} id={user.id} />;
            })}
          </div>
          <div className="graph">
            <Graph
              onHoverOverUser={onHoverOverUser}
              dataToDisplay={dataToDisplay}
              rawData={rawData}
              index={index}
              userId={userId}
              showAll={showAll}
            />
            <UserDetail
              userId={userId}
              index={index}
              data={dataToDisplay}
              showUserStats={showUserStats}
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
