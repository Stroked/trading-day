import * as d3 from 'd3';
import { height, width, padding, startDate, endDate } from './constants';

let yScaleLeft, yScaleRight;

const xScale = d3.scaleTime()
		.domain([startDate, endDate])
		.range([padding, width - padding]);

const yScale = (data) => {
	return d3.scaleLinear()
		.domain(d3.extent(data, function(d) { return +d.value[0] }))
		.range([height - padding, padding]);
};

export const parseFinanceData = financeData => {
	return d3.csvParse(financeData, (data) => {
		const date = new Date(data.timestamp).getTime() / 1000;
		if (date > 1262217600) { // if date > 1262217600  (i.e. later than 2009-12-31)
			return {
				time: date,
				value: [data.close]
			};
		}
	});
};

const constructAxes = (canvas, trendsData, financeData) => {
	const xAxis = d3.axisBottom()
		.scale(xScale);

	yScaleLeft = yScale(trendsData);
	yScaleRight = yScale(financeData);

	canvas.append('g')
		.attr('class', 'x axis')
		.attr('transform', `translate(0,${height - padding})`)
		.call(xAxis);

	canvas.append('g')
		.attr('class', 'y axis')
		.attr('transform', `translate(${padding}, 0)`)
		.call(d3.axisLeft()
			.scale(yScaleLeft)
		);

	canvas.append('g')
		.attr('class', 'y axis')
		.attr('transform', `translate(${width - padding}, 0)`)
		.call(d3.axisRight()
			.scale(yScaleRight)
		);
};

const populateGoogleTrendsData = (nodes, canvas) => {
	const area = d3.area()
		.x(function(d) { return xScale(new Date(d.time * 1000)); })
		.y0(height - padding)
		.y1(function(d) { return yScaleLeft(+d.value[0]); });

	canvas.append('path')
		.datum(nodes)
		.attr('class', 'area')
		.attr('d', area);
};

const populateFinanceData = (nodes, canvas) => {
	const links = [];

	for (let i = 0; i < nodes.length - 1; i++){
		const linkObj = { source: nodes[i], target: nodes[i + 1] };
		links.push(linkObj);
	}

	canvas.selectAll('.line')
	   .data(links)
	   .enter()
	   .append('line')
	   .attr('x1', function(d) { return xScale(new Date(d.source.time * 1000)); })
	   .attr('y1', function(d) { return yScaleRight(+d.source.value[0]); })
	   .attr('x2', function(d) { return xScale(new Date(d.target.time * 1000)); })
	   .attr('y2', function(d) { return yScaleRight(+d.target.value[0]); })
	   .style('stroke', 'rgb(0,128,0)');
};

export const constructGraph = (node, trendsData, financeData) => {
	const canvas = d3.select(node);
	canvas.attr('width', width)
		.attr('height', height);

	constructAxes(canvas, trendsData, financeData);

	if (trendsData.length > 0 && financeData.length > 0) {
		populateGoogleTrendsData(trendsData, canvas);
		populateFinanceData(financeData, canvas);
	}
};
