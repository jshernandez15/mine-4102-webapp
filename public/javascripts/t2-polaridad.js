d3.json("/javascripts/polaridad.json", function(data) {

  ///////////////////////
  // Chart Size Setup
  var margin = { top: 35, right: 0, bottom: 30, left: 40 };

  var width = 960 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;

  var chart = d3.select(".polaridad")
      .attr("width", 960)
      .attr("height", 500)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  ///////////////////////
  // Scales
  var x = d3.scale.ordinal()
      .domain(data['RECORDS'].map(function(d) { return d['topic']; }))
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .domain([0, d3.max(data['RECORDS'], function(d) { return d['count']; }) * 1.1])
      .range([height, 0]);

  ///////////////////////
  // Axis
  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  ///////////////////////
  // Title
  chart.append("text")
    .text('Bar Chart!')
    .attr("text-anchor", "middle")
    .attr("class", "graph-title")
    .attr("y", -10)
    .attr("x", width / 2.0);

  ///////////////////////
  // Bars
  var bar = chart.selectAll(".bar")
      .data(data['RECORDS'])
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d['topic']); })
      .attr("y", height)
      .attr("width", x.rangeBand())
      .attr("height", 0);

  bar.transition()
      .duration(1500)
      .ease("elastic")
      .attr("y", function(d) { return y(d['count']); })
      .attr("height", function(d) { return height - y(d['count']); })

  ///////////////////////
  // Tooltips
  var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip");

  bar.on("mouseover", function(d) {
        tooltip.html(d['value'])
            .style("visibility", "visible");
      })
      .on("mousemove", function(d) {
        tooltip.style("top", event.pageY - (tooltip[0][0].clientHeight + 5) + "px")
            .style("left", event.pageX - (tooltip[0][0].clientWidth / 2.0) + "px");
      })
      .on("mouseout", function(d) {
        tooltip.style("visibility", "hidden");
      });
});