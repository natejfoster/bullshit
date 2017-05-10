$(function() {
  var counter = 0;
  d3.csv('data/data.csv', function(error, data) {
    var nestedData = d3.nest()
      .key((d) => d.what)
      .key((d) => d.type)
      .entries(data);

    var circlePack = CirclePack()
      .width(500)
      .height(500)
      .count("amount")
      .leafTitle("source")
      .rootTitle("Bullshit")
      .showCount(true);

    var draw = function() {
      var charts = d3.select('#vis').selectAll('.chart')
        .data(nestedData);

        charts.enter().append("div")
          .attr('class', 'chart')
          .merge(charts)
          .call(circlePack);

        charts.exit().remove();
    }
    draw();
  })

  countUp = function() {
    counter++;
    $('#timer').text(counter * 15000);
    setTimeout ("countUp()", 1000 );
  };
  countUp();
});
