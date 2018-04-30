// Beatriz Manrique
// CSE 3353
// Project 3: Images and Process Scheduling

'use  strict';

// Make adjacency list
// read in Adjacency List class
const adjacencyList = require('./adjacencyList.js');

function init_graph1(){
    var graph1 = new adjacencyList;
    // add Head Nodes
    graph1.addHeadNode("A");
    graph1.addHeadNode("B");
    graph1.addHeadNode("C");
    graph1.addHeadNode("D");
    graph1.addHeadNode("E");
    
    // add inner nodes "paths"
    graph1.addInnerNode("B","A");
    graph1.addInnerNode("D","A");
    graph1.addInnerNode("E","B");
    graph1.addInnerNode("A","C");
    graph1.addInnerNode("D","C");
    graph1.addInnerNode("B","D");
    graph1.addInnerNode("E","D");
};

function init_graph2(){
    var graph2 = new adjacencyList;
    // add Head Nodes
    graph2.addHeadNode("A");
    graph2.addHeadNode("B");
    graph2.addHeadNode("C");
    graph2.addHeadNode("D");
    graph2.addHeadNode("E");
    graph2.addHeadNode("F");
    graph2.addHeadNode("G");
    graph2.addHeadNode("H");
    graph2.addHeadNode("I");
    
    // add inner nodes "paths"
    graph2.addInnerNode("B","A");
    graph2.addInnerNode("D","B");
    graph2.addInnerNode("B","C");
    graph2.addInnerNode("G","C");
    graph2.addInnerNode("G","D");
    graph2.addInnerNode("D","E");
    graph2.addInnerNode("F","E");
    graph2.addInnerNode("I","E");
    graph2.addInnerNode("I","G");
    graph2.addInnerNode("F","H");
    graph2.addInnerNode("H","I");
}

init_graph2();


// DFS

// output