const express = require("express");
const app = express();
app.use(express.json());

const adjacencyList = {
    A: [{ place: 'B', time: 5 }, { place: 'C', time: 7 }],
    B: [{ place: 'A', time: 5 }, { place: 'D', time: 15 }, { place: 'E', time: 20 }],
    C: [{ place: 'A', time: 7 }, { place: 'D', time: 5 }, { place: 'E', time: 35 }],
    D: [{ place: 'B', time: 15 }, { place: 'C', time: 5 }, { place: 'F', time: 20 }],
    E: [{ place: 'B', time: 20 }, { place: 'C', time: 35 }, { place: 'F', time: 10 }],
    F: [{ place: 'D', time: 20 }, { place: 'E', time: 10 }],
  };
  
  // Dijkstra's algorithm to find the shortest path
  function dijkstra(start, end) {
    const distances = {};
    const visited = {};
    const path = {};
  
    // Initialize distances, visited, and path
    for (let place in adjacencyList) {
      distances[place] = Infinity;
      visited[place] = false;
      path[place] = null;
    }
    distances[start] = 0;
  
    // Dijkstra's algorithm
    for (let i = 0; i < Object.keys(adjacencyList).length; i++) {
      let current = null;
      for (let place in distances) {
        if (!visited[place] && (current === null || distances[place] < distances[current])) {
          current = place;
        }
      }
  
      if (current === end || current === null) {
        break;
      }
  
      visited[current] = true;
  
      for (let neighbor of adjacencyList[current]) {
        const distance = distances[current] + neighbor.time;
        if (distance < distances[neighbor.place]) {
          distances[neighbor.place] = distance;
          path[neighbor.place] = current;
        }
      }
    }
  
    // Construct the shortest path
    const shortestPath = [];
    let current = end;
    while (current !== null) {
      shortestPath.unshift(current);
      current = path[current];
    }
  
    return shortestPath;
  };

exports.getShortedistance = (req, res) => {
    try {
        const { start, dest } = req.params;
        const shortestPath = dijkstra(start, dest);
        res.status(200).json({ shortestPath });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

