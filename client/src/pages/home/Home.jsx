import React from "react";
import ReactDOM from "react-dom";
import Graph from "react-vis-network-graph";
import bilgates from "./billgates.PNG"

export default function Home() {
    const graph = {
        nodes: [
          { id: 1, shape: "circularImage", image: bilgates },
          { id: 2, shape: "circularImage", image: bilgates },
          { id: 3, shape: "circularImage", image: bilgates },
          { id: 4, shape: "circularImage", image: bilgates },
          { id: 5, shape: "circularImage", image: bilgates },
          { id: 6, shape: "circularImage", image: bilgates }
        ],
        edges: [
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 1, to: 4 },
          { from: 1, to: 5 },
          { from: 2, to: 6 }
        ]
      };
    
      const options = {
        layout: {
          hierarchical: false
        },
        edges: {
          color: {
            color: "black",
            highlight: "blue"
          },
          length: "100",
          arrows: "false",
          width: "5",
          selectionWidth: function (width) {return width * 1.5;}
        },
        nodes: {
          borderWidth: "5",
          borderWidthSelected: "10",
          color: {
            border: "black"
          }
        }    
      };
    
      const events = {
        select: function (event) {
          var { nodes, edges } = event;
          console.log(edges);
          console.log(nodes);
        }
      };
      return (
        
        <Graph
          style={{border: '1px solid red', width: "100%", height: "1000px"}}
          graph={graph}
          options={options}
          events={events}
          getNetwork={(network) => {
            //  if you want access to vis.js network api you can set the state in a parent component using this property
          }}
        />
    
      );
    }