import React, { useState, useEffect } from 'react';

import '../node_modules/react-vis/dist/style.css';
import './App.css';

import Graph from './graph';
import PositionInfo from './positionInfo';
import User from './user';
import { fromIndexToUserId } from './helpers';
import UserDetail from './userDetail';

export interface positionInTime {
  time: number;
  x: number;
  y: number;
}

export interface userData {
  id: string;
  points: Array<positionInTime>;
}

function App() {
  const [index, setIndex] = useState(0);
  const [userId, setUserId] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [displayDefaultTitle, setDefaultTitleDisplay] = useState(true);
  const [showUserStats, setShowUserStats] = useState(false);
  const [userPosition, setUserPosition] = useState({
    x: 0,
    y: 0,
    time: 0,
  });
  const [dataToDisplay, setDataToDisplay]: [
    Array<Array<positionInTime>>,
    Function,
  ] = useState([]);
  const [rawData, setRawData]: [Array<userData>, Function] = useState([]);

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
    const sortedByTimeData = rawData.reduce(
      (acc: Array<userData>, curr: userData): Array<userData> => {
        let client = {
          id: curr.id,
          points: curr.points.sort((a, b) => a.time - b.time),
        };
        return [...acc, client];
      },
      [],
    );

    const usefullData = sortedByTimeData.reduce(
      (acc: Array<Array<positionInTime>>, curr: userData) => {
        const sanitizedPoints = curr.points.reduce(
          (acc: Array<positionInTime>, curr: positionInTime) => {
            return [...acc, { x: curr.x, y: curr.y, time: curr.time }];
          },
          [],
        );
        return [...acc, sanitizedPoints];
      },
      [],
    );

    if (!userId && rawData.length !== 0) {
      setUserId(rawData[0].id);
    }

    if (rawData.length !== 0) {
      setDataToDisplay(usefullData);
    }
  }, [rawData, userId]);

  const onHoverOverUser = (
    userPosition: positionInTime,
    index: number,
  ): void => {
    const hoveredOverUserData = fromIndexToUserId(index, rawData);
    setUserPosition(userPosition);
    setUserId(hoveredOverUserData);
    setDefaultTitleDisplay(false);
  };

  const onUserClick = (id: string = '0') => {
    const index = rawData.findIndex((u: userData) => u.id === id);
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
            {rawData.map((user: userData) => {
              return (
                <User onUserClick={onUserClick} key={user.id} id={user.id} />
              );
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
