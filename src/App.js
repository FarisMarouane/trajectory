import React from 'react';

import '../node_modules/react-vis/dist/style.css';
import './App.css';

import Graph from './graph';
import PositionInfo from './positionInfo';
import User from './user';

class App extends React.Component {
  state = {
    rawData: [],
    dataToDisplay: {},
    index: 0,
    userPosition: { x: undefined, y: undefined },
  };

  async componentDidMount() {
    console.log('componentDidMount');
    const resp = await fetch('/trajectoires.json');
    const data = await resp.json();
    // console.log('Data as fetched: ', data);

    const sortedByTimeData = data.reduce((acc, curr) => {
      let client = {
        id: curr.id,
        points: curr.points.sort((a, b) => a.time - b.time),
      };
      return [...acc, client];
    }, []);

    const usefullData = sortedByTimeData.reduce((acc, curr) => {
      const sanitizedPoints = curr.points.reduce((acc, curr) => {
        return [...acc, { x: curr.x, y: curr.y }];
      }, []);
      return [...acc, sanitizedPoints];
    }, []);
    console.log('usefullData: ', usefullData);
    this.setState({ dataToDisplay: usefullData, rawData: data });
  }

  onHoverOverUser = (userPosition = {}) => {
    this.setState({ userPosition });
  };

  onClick = (id = 0) => {
    console.log('id: ', id);
    const { rawData = [] } = this.state;
    const index = rawData.findIndex(u => u.id === id);
    console.log('index: ', index);
    console.log('dataWorkedUpIndex: ', rawData.findIndex(u => u.id === id));
    this.setState({
      index,
    });
  };

  render() {
    const {
      dataToDisplay = {},
      rawData = [],
      index,
      userPosition: { x, y } = {},
    } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <PositionInfo x={x} y={y} />
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
                justifyContent: 'space-around',
              }}
            >
              {rawData.map((user, i) => {
                return <User onClick={this.onClick} key={i} id={user.id} />;
              })}
            </div>
            <Graph
              onHoverOverUser={this.onHoverOverUser}
              dataToDisplay={dataToDisplay}
              index={index}
            />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
