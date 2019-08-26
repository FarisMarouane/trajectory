import React from 'react';

import '../node_modules/react-vis/dist/style.css';
import './App.css';

import Graph from './graph';
import PositionInfo from './positionInfo';
import User from './user';
import { fromIndexToUserId } from './helpers';
import UserDetail from './userDetail';

class App extends React.PureComponent {
  state = {
    rawData: [],
    dataToDisplay: {},
    index: 0,
    userId: undefined,
    userPosition: { x: undefined, y: undefined },
    showAll: false,
    hoveredOverUserId: undefined,
    displayDefaultTitle: true,
    showUserStats: false,
  };

  async componentDidMount() {
    const resp = await fetch('/trajectoires.json');
    const data = await resp.json();

    const sortedByTimeData = data.reduce((acc, curr) => {
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

    this.setState({
      dataToDisplay: usefullData,
      rawData: data,
      userId: data[0].id,
    });
  }

  onHoverOverUser = (userPosition = {}, index) => {
    const hoveredOverUserData = fromIndexToUserId(index, this.state.rawData);
    this.setState({
      userPosition,
      userId: hoveredOverUserData,
      displayDefaultTitle: false,
    });
  };

  onUserClick = (id = 0) => {
    const { rawData = [] } = this.state;
    const index = rawData.findIndex(u => u.id === id);
    this.setState({
      index,
      userId: id,
      displayDefaultTitle: true,
      showUserStats: true,
    });
  };

  onButtonClick = () => {
    this.setState(prevState => ({
      showAll: !prevState.showAll,
      displayDefaultTitle: !prevState.displayDefaultTitle,
      showUserStats: !prevState.showUserStats,
    }));
  };

  render() {
    const {
      dataToDisplay = [],
      rawData = [],
      index,
      userId,
      userPosition: { x, y, time } = {},
      showAll,
      displayDefaultTitle,
      showUserStats,
    } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <PositionInfo
            displayDefaultTitle={displayDefaultTitle}
            userId={userId}
            time={time}
            x={x}
            y={y}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
              }}
            >
              <button
                style={{ marginBottom: '30px' }}
                onClick={this.onButtonClick}
              >
                Show All Customers
              </button>
              {rawData.map((user, i) => {
                return (
                  <User onUserClick={this.onUserClick} key={i} id={user.id} />
                );
              })}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}
            >
              <Graph
                onHoverOverUser={this.onHoverOverUser}
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
}

export default App;
