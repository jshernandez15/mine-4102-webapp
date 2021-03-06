function pintaTema(tema) {
  $.get("/taller-2/tagcloud-mongo/" + tema, function(data) {

    var word_count = {};
  
    data.forEach(element => {
      word_count[element.HASHTAG_NAME] = element.CANTIDAD;
    });
  
    var svg_location = "#chart" + tema;
    var width = $(document).width() - 500;
    var height = 700;
  
    var fill = d3.scale.category20();
  
    var word_entries = d3.entries(word_count);
  
    var xScale = d3.scale.linear()
       .domain([0, d3.max(word_entries, function(d) {
          return d.value;
        })
       ])
       .range([10,100]);
  
    d3.layout.cloud().size([width, height])
      .timeInterval(20)
      .words(word_entries)
      .fontSize(function(d) { return xScale(+d.value); })
      .text(function(d) { return d.key; })
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font("Impact")
      .on("end", draw)
      .start();
  
    function draw(words) {
      d3.select(svg_location).append("svg")
          .attr("width", width)
          .attr("height", height)
        .append("g")
          .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
        .selectAll("text")
          .data(words)
        .enter().append("text")
          .style("font-size", function(d) { return xScale(d.value) + "px"; })
          .style("font-family", "Impact")
          .style("fill", function(d, i) { return fill(i); })
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d) { return d.key; });
    }
  
    d3.layout.cloud().stop();
  });
}

pintaTema(0);
pintaTema(1);
pintaTema(2);
pintaTema(3);
pintaTema(4);
pintaTema(5);
pintaTema(6);