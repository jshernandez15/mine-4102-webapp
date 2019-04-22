// http://blog.thomsonreuters.com/index.php/mobile-patent-suits-graphic-of-the-day
function buscar() {
  $.get("/taller-2/personajes-wikipedia/"+$("#personajes").val(), function(datos) {
    var search = datos.query.search;
    $("#wikipedia_row").show();
    $("#wikipedia").empty();
    if(typeof search === "undefined" || search.length == 0) {
      $("#wikipedia").append("<p>No se encontraron registros para esta búsqueda.</p>");
    }
    else {
      search.forEach(registro => {
        $("#wikipedia").append("<p><b>" + registro.title + "</b> " + registro.snippet + "</p>");
      });
    }
  });
  $.get("/taller-2/personajes-mongo/"+$("#personajes").val(), function(links) {

    $( "svg" ).remove();
    var nodes = {};

    // Compute the distinct nodes from the links.
    links.forEach(function(link) {
      link.source = nodes[link.AUTHOR] || (nodes[link.AUTHOR] = {name: link.AUTHOR});
      link.target = nodes[link.MENTIONED_NAME] || (nodes[link.MENTIONED_NAME] = {name: link.MENTIONED_NAME});
    });
    
    var width = $(document).width(),
        height = 600;
    
    var force = d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([width, height])
        .linkDistance(60)
        .charge(-300)
        .on("tick", tick)
        .start();
    
    var svg = d3.select("main").append("svg")
        .attr("width", width)
        .attr("height", height);
    
    // Per-type markers, as they don't inherit styles.
    svg.append("defs").selectAll("marker")
        .data(["suit", "licensing", "resolved"])
      .enter().append("marker")
        .attr("id", function(d) { return d; })
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", -1.5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
      .append("path")
        .attr("d", "M0,-5L10,0L0,5");
    
    var path = svg.append("g").selectAll("path")
        .data(force.links())
      .enter().append("path")
        .attr("class", function(d) { 
          var result = "link ";
          if(d.AUTHOR == $("#personajes").val()) {
            result += "licensing";
          }
          else {
            result += "suit";
          }
          return result; 
        })
        .attr("marker-end", function(d) { 
          var result = "url(#";
          if(d.AUTHOR == $("#personajes").val()) {
            result += "licensing";
          }
          else {
            result += "suit";
          }
          return result + ")"; 
        });
    
    var circle = svg.append("g").selectAll("circle")
        .data(force.nodes())
      .enter().append("circle")
        .attr("r", 6)
        .call(force.drag);
    
    var text = svg.append("g").selectAll("text")
        .data(force.nodes())
      .enter().append("text")
        .attr("x", 8)
        .attr("y", ".31em")
        .text(function(d) { return d.name; });
    
    // Use elliptical arc path segments to doubly-encode directionality.
    function tick() {
      path.attr("d", linkArc);
      circle.attr("transform", transform);
      text.attr("transform", transform);
    }
    
    function linkArc(d) {
      var dx = d.target.x - d.source.x,
          dy = d.target.y - d.source.y,
          dr = Math.sqrt(dx * dx + dy * dy);
      return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
    }
    
    function transform(d) {
      return "translate(" + d.x + "," + d.y + ")";
    }
  });
}