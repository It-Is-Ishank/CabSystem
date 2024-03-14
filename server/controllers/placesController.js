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
    const times = {}; // Add times object to store minimum time to reach each place
    const visited = {};
    const path = {};
  
    // Initialize distances, times, visited, and path
    for (let place in adjacencyList) {
      distances[place] = Infinity;
      times[place] = Infinity; // Initialize all times to Infinity initially
      visited[place] = false;
      path[place] = null;
    }
    distances[start] = 0;
    times[start] = 0; // Set the time to reach the start place to 0
  
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
        const time = times[current] + neighbor.time; // Calculate the time to reach the neighbor place
        if (distance < distances[neighbor.place]) {
          distances[neighbor.place] = distance;
          times[neighbor.place] = time; // Update the time to reach the neighbor place
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
  
    // Return both the shortest path and the minimum time
    console.log(shortestPath,times[end])
    return { shortestPath, minTime: times[end] };
  }

  exports.getShortestPath = (req, res) => {
    try {
        const start = req.params.start;
        const end = req.params.end;
        console.log(start, end);
        const shortestPath = dijkstra(start, end);
        res.status(200).json({ shortestPath });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

