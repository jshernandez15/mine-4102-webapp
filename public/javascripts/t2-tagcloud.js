var text_string = "Hagan lo que les de la puta gana, No quiero saber nada de ese hp guaido ni de noticias. Sobre Venezuela los venezolanos quieren cambiar la raza, que quieren intervención de soldados blancos y añoran embarazos. No les importa la tierra ni el medio ambiente... https://t.co/h5bF14PFga";

drawWordCloud(text_string);

function drawWordCloud(text_string){
  var common = "a,ante,lo,les,la,que,de,ni,los,las,le,y,el";

  var word_count = {};

  var words = text_string.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
    if (words.length == 1){
      word_count[words[0]] = 1;
    } else {
      words.forEach(function(word){
        var word = word.toLowerCase();
        if (word != "" && common.indexOf(word)==-1 && word.length>1){
          if (word_count[word]){
            word_count[word]++;
          } else {
            word_count[word] = 1;
          }
        }
      })
    }

  var svg_location = "#chart";
  var width = $(document).width() - 500;
  var height = $(document).height() - 500;

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
}