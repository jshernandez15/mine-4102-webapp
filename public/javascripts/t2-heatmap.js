var itemSize = 22,
    cellSize = itemSize - 1,
    margin = {top: 120, right: 20, bottom: 20, left: 110};
    
var width = 750 - margin.right - margin.left,
    height = 6300;

var formatDate = d3.time.format("%Y-%m-%d");

d3.json('/taller-2/heatmap-mongo', function ( response ) {

var max = d3.max(response, function(d) { return parseInt(d['ACTIVIDAD']); });
var min = d3.min(response, function(d) { return parseInt(d['ACTIVIDAD']); });
console.log("min:" + min + ",max:" + max);

var data = response.map(function( item ) {
    var newItem = {};
    newItem.country = "@" + item.AUTHOR.toLowerCase();
    var tag = "-";
    switch(item.CATEGORY_NUMBER) {
        case 0: tag="Ninguno"; break;
        case 1: tag="Informativo"; break;
        case 2: tag="Solidario"; break;
        case 3: tag="Protectivo"; break;
        case 4: tag="Culpa el gobierno"; break;
        case 5: tag="Crítico"; break;
        case 6: tag="Argumentativo"; break;
    }
    newItem.product = tag;
    newItem.value = (item.ACTIVIDAD - min) / (max - min);
    console.log("original" + item.ACTIVIDAD + ", calculado:" + newItem.value);
    return newItem;
})

var x_elements = d3.set(data.map(function( item ) { return item.product; } )).values(),
    y_elements = d3.set(data.map(function( item ) { return item.country; } )).values();

var xScale = d3.scale.ordinal()
    .domain(x_elements)
    .rangeBands([0, x_elements.length * itemSize]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .tickFormat(function (d) {
        return d;
    })
    .orient("top");

var yScale = d3.scale.ordinal()
    .domain(y_elements)
    .rangeBands([0, y_elements.length * itemSize]);

var yAxis = d3.svg.axis()
    .scale(yScale)
    .tickFormat(function (d) {
        return d;
    })
    .orient("left");

var colorScale = d3.scale.linear()
    .domain([0, 1])
    .range(['yellow', 'red']);

var svg = d3.select('.heatmap')
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (margin.left + 50) + "," + (margin.top) + ")");

var cells = svg.selectAll('rect')
    .data(data)
    .enter().append('g').append('rect')
    .attr('class', 'cell')
    .attr('width', cellSize)
    .attr('height', cellSize)
    .attr('y', function(d) { return yScale(d.country); })
    .attr('x', function(d) { return xScale(d.product); })
    .attr('fill', function(d) { return colorScale(d.value); });

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .selectAll('text')
    .attr('font-weight', 'normal');

svg.append("g")
    .attr("class", "x axis")
    .call(xAxis)
    .selectAll('text')
    .attr('font-weight', 'normal')
    .style("text-anchor", "start")
    .attr("dx", ".8em")
    .attr("dy", ".5em")
    .attr("transform", function (d) {
        return "rotate(-65)";
    });
});