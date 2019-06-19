import React from "react";
import { Group } from "@vx/group";
import { Treemap } from "@vx/hierarchy";
import { scaleLinear } from "@vx/scale";
import sp500 from "../SP500/sp500-constituents-financials.json";
import * as d3 from "d3";
import {DataContext} from '../../MarketData'




const parsed_SP500 = {
  id: "S&P500",
  children: d3
    .nest()
    .key(k => k.Sector)
    .entries(
      sp500.map(l => {
        l.id = l.symbol;
        l.MarketCap = +l["Market Cap"];
        return l;
      })
    )
};

const sectorArray = parsed_SP500.children.map(x => {
  let y = {};
  y.id = x.key;
  y.parent = "S&P500";
  y.value = null;
  return y;
});
const listings = sp500.map(x => {
  let y = {};
  y.id = x['Symbol'];
  y.parent = x['Sector'];
  y.marketCap = +x["Market Cap"];
  y.value = +x["Market Cap"];
  return y;
});


const dataArray = [
  { id: "S&P500", parent: null, value: 0 },
  ...sectorArray,
  ...listings
];
//console.log(dataArray);
// var root = {
//   id: "All Listings",
//   children: [
//     { id: "NYSE Listings", children: [{ id: "A" }, { id: "AA" }] },
//     { id: "NASDAQ Listings", children: [{ id: "A" }, { id: "AA" }] }
//   ]
// };

const blue = "#0373d9";
const green = "#00ff70";
const bg = "#3436b8";


const colorScale2 = scaleLinear({
  domain: [0, Math.max(...dataArray.map(d => +d.value || 0))],
  range: [blue, green]
});

const data = d3.stratify()
  .id(d => d.id)
  .parentId(d => d.parent)(dataArray)
  .sum(d => {
    //console.log(d);
    return +d.value || 0; });
//console.log(data);
// const data2 = stratify()
//   .id(d => d.Sector)
//   .parentId(d => d.Sector)(sp500);
//[d3.nest().key(k=>k.Sector).entries(sp500)]
//console.log(data2);
/*{
    values:d3  .nest()
      .key(k => k.Sector)
      .entries(sp500.map(l => {
          l.id = l.symbol;
          return l;
        }))}*/
export default ({
  width,
  height,
  margin = {
    top: 0,
    left: 30,
    right: 40,
    bottom: 80
  }
}) => {
  const yMax = height - margin.top - margin.bottom;
  const root = d3.hierarchy(data).sort((a, b) => b.value - a.value);
  //console.log(root);

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill={bg} />
      <Treemap
        root={root}
        size={[width, yMax]}
        tile={d3.treemapSquarify}
        round={true}>
        {treemap => {
          const nodes = treemap.descendants().reverse();
          return (
            <Group top={margin.top}>
              {nodes.map((node, i) => {
                const width = node.x1 - node.x0;
                const height = node.y1 - node.y0;
               // console.log(width,height)
                return (
                  <Group key={`treemap-node-${i}`} top={node.y0} left={node.x0}>
                    {node.depth == 1 && (
                      <rect
                        width={width}
                        height={height}
                        stroke={bg}
                        strokeWidth={4}
                        fill={"transparent"}
                        onClick={event => {
                          console.log(node);
                        }}
                      />
                    )}
                    {node.depth >1 && (
                      <rect
                        width={width}
                        height={height}
                        stroke={bg}
                        fill={colorScale2(node.value)}
                        onClick={event => {
                          console.log(node);
                        }}
                      />
                    )}
                  </Group>
                );
              })}
            </Group>
          );
        }}
      </Treemap>
    </svg>
  );
};
