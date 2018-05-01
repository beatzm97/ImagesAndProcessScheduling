// Beatriz Manrique
// CSE 3353
// Project 3: Images and Process Scheduling

'use  strict';

class Node{
    constructor(data, next=null, into =null, color="white", source=null, dep=0){
        // data of node
        this.data = data;
        // next node in sequence
        this.next = next;
        // if a head node, this points to inner node
        this.into = into;
        // node has not been visited
        this.color = color;
        // chance colors of head list using inner list
        this.source = source;
        // shows dependencies
        this.dep = dep;
    }
};

class AdjacencyList{
    // default constructor
    constructor(){
        // empty adjacency list
        // head points to nothing
        this.head = null;
        // empty so no size
        this.rowSize = 0;
        // tail points to nothing
        this.tail = null;
    }

    // add vertex
    addHeadNode(data){
        // case 1: empty adjacency list
        if (this.head === null){
            // create new node and have head point to this
            this.head = new Node(data);
            // tail points to only node
            this.tail = this.head;
            // increase rowSize to 1
            this.rowSize++;
            return;
        }
        
        // case 2: adjacency list with data
        else if (this.searchHead(data) === false){
            // create new node
            let temp = new Node(data);
            // find last node and use next to point to new node
            // this adds node to the end of the list
            this.tail.next = temp;
            // have tail point to new node
            this.tail = temp;
            // increase rowSize by 1
            this.rowSize++;
            return;
        }
    }

    // add vertices that head can connect to
    addInnerNode(innerData, headData){
        let temp = this.head;
        for (var i = 0; i < this.rowSize; i++){
            if (temp.data === headData){
                // case 1: no inner nodes
                if (temp.into === null){
                    // create new node and have temp.into point to this
                    let tempInner = new Node(innerData);
                    temp.into = tempInner;
                    let search = this.head;
                    for (var j = 0; j < this.rowSize; j++){
                        if (search.data === tempInner.data){
                            tempInner.source = search;
                            tempInner.source.dep++;
                        }               
                        search = search.next;
                    }
                    return;
                }
                // case 2: inner nodes exist
                else{
                    let current = temp.into;
                    let prev = null;
                    while (current !== null){
                        // avoids repeating inner nodes
                        if (current.data === innerData){
                            return;
                        }
                        prev = current;
                        current = current.next;
                    }
                    let tempInner = new Node(innerData);
                    prev.next = tempInner;
                    let search = this.head;
                    for (var j = 0; j < this.rowSize; j++){
                        if (search.data === tempInner.data){
                            tempInner.source = search;
                            tempInner.source.dep++;
                        }               
                        search = search.next;
                    }
                    return;
                }
            }               
            temp = temp.next;
        }
    }

    // number of head nodes
    // rowSize
    getSize(){
        return this.rowSize;
    }

    // search head nodes
    searchHead(valIn){
        // case 1: empty adjacency list
        if (this.head === null){
            return false;
        }
        // case 2: adjacency list with elements
        else {
            let temp = this.head;
            for (var i = 0; i < this.rowSize; i++){
                if (temp.data === valIn){
                    return true;
                }               
                temp = temp.next;
            }
            return false;
        }
    }
}

module.exports = AdjacencyList;