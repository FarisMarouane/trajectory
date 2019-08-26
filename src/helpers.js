export const usersColors = {
  '4421': 'red',
  '3244': 'blue',
  '7255': 'pink',
  '3232': 'green',
  '2332': 'yellow',
};

export function fromIndexToUserId(index, data) {
  return data[index].id;
}

export function calculateTotalTime(data, index) {
  return data[index][data[index].length - 1].time - data[index][0].time;
}

function calculateDistanceBetweenTwoPoints(
  p1 = { x: 0, y: 0 },
  p2 = { x: 0, y: 0 },
) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

export function calculateAverageSpeed(data, index) {
  const userData = data[index];
  const totalTime = calculateTotalTime(data, index);
  const totalDistance = userData.reduce((acc, curr, i, array) => {
    if (i < array.length - 1) {
      return acc + calculateDistanceBetweenTwoPoints(curr, array[i + 1]);
    }
    return acc;
  }, 0);
  return totalDistance / totalTime;
}
