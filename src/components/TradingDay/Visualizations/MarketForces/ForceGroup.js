/*
 const nodes = Array.from({length: 500}, () => ({}));

  const simulation = d3.forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-10))
      .force("x", d3.forceX().strength(0.05))
      .force("y", d3.forceY().strength(0.05))
      .alphaDecay(0)
      .on("tick", ticked);

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`);

  const target1 = svg.append("line")
      .attr("stroke", "red")
      .attr("y1", -height / 2)
      .attr("y2", +height / 2);

  const target2 = svg.append("line")
      .attr("stroke", "black")
      .attr("y1", -height / 2)
      .attr("y2", +height / 2);

  const node = svg.append("g")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
      .attr("r", 4)
      .attr("fill", (d, i) => i & 1 ? "red" : "black");

  function ticked() {
    node.attr("cx", d => d.x).attr("cy", d => d.y);
  }

  yield svg.node();
  await Promises.delay(1000);

  while (true) {
    const x1 = (Math.random() - 0.5) * width / 2;
    const x2 = (Math.random() - 0.5) * width / 2;
    target1.attr("x1", x1).attr("x2", x1);
    target2.attr("x1", x2).attr("x2", x2);
    simulation.force("x").x((d, i) => i & 1 ? x1 : x2);
    simulation.alpha(1).restart();
    yield svg.node();
    await Promises.delay(5000);
  }
*/