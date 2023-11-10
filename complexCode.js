/*
 * Filename: complexCode.js
 * Description: This code demonstrates a complex algorithm for finding the shortest path in a graph using Dijkstra's algorithm.
 * Author: AI Assistant
 * Date: February 20, 2022
 */

// Define a Graph class to represent the graph
class Graph {
  constructor() {
    this.vertices = [];
    this.edges = {};
  }

  addVertex(vertex) {
    this.vertices.push(vertex);
    this.edges[vertex] = {};
  }

  addEdge(vertex1, vertex2, weight) {
    this.edges[vertex1][vertex2] = weight;
    this.edges[vertex2][vertex1] = weight;
  }

  dijkstra(startVertex) {
    let distances = {};
    let visited = {};
    let previous = {};
    const infinity = Number.MAX_VALUE;

    // Initialize distances and visited status for each vertex
    for (let vertex of this.vertices) {
      distances[vertex] = infinity;
      visited[vertex] = false;
      previous[vertex] = null;
    }

    // Set distance to start vertex as 0
    distances[startVertex] = 0;

    // Find the vertex with the shortest distance
    const getMinDistanceVertex = () => {
      let minDistance = infinity;
      let minVertex = null;
      for (let vertex of this.vertices) {
        if (!visited[vertex] && distances[vertex] <= minDistance) {
          minDistance = distances[vertex];
          minVertex = vertex;
        }
      }
      return minVertex;
    };

    // Loop until all vertices are visited
    while (Object.keys(visited).filter(v => visited[v] === false).length > 0) {
      const currentVertex = getMinDistanceVertex();
      visited[currentVertex] = true;

      // Update distances for neighboring vertices
      for (let neighbor in this.edges[currentVertex]) {
        const weight = this.edges[currentVertex][neighbor];
        const distance = weight + distances[currentVertex];
        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          previous[neighbor] = currentVertex;
        }
      }
    }

    return { distances, previous };
  }
}

// Create a new graph
const graph = new Graph();

// Add vertices
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');

// Add edges with weights
graph.addEdge('A', 'B', 2);
graph.addEdge('A', 'C', 4);
graph.addEdge('B', 'C', 1);
graph.addEdge('B', 'D', 7);
graph.addEdge('C', 'D', 3);
graph.addEdge('D', 'E', 2);

// Run Dijkstra's algorithm on the graph
const startVertex = 'A';
const result = graph.dijkstra(startVertex);

console.log(`Shortest distances from vertex ${startVertex}:`, result.distances);
console.log('Previous vertices:', result.previous);

// Sample Output:
// Shortest distances from vertex A: { A: 0, B: 2, C: 3, D: 6, E: 8 }
// Previous vertices: { A: null, B: 'A', C: 'B', D: 'C', E: 'D' }
