// Circle pack

var CirclePack = function() {

  var height = 500,
      width = 500,
      margin = {
        left: 70,
        bottom: 50,
        top: 30,
        right: 10
      },
      count = "",
      leafTitle = "",
      rootTitle,
      colorDomain = 4,
      showCount = true;

  var chart = function(selection) {

    var color = d3.scaleSequential(d3.interpolateMagma)
    .domain([-colorDomain, colorDomain]);

    selection.each(function(data) {

      var ele = d3.select(this);
      var svg = ele.selectAll('svg').data([data]);

      var svgEnter = svg.enter()
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      var diameter = +svgEnter.attr("width");
      var g = svgEnter.append("g").attr("transform", "translate(" + diameter + " ," + diameter + ")");
      var pack = d3.pack()
        .size([diameter, diameter])
        .padding(2);

      var data = data.values;
      var root = d3.hierarchy({
        values: data
      }, function(d) {
        return d.values;
      });
      root.sum(function(d) {
          return +d[count];
      }).sort(function(a, b) {
          return b.value - a.value;
      });

      pack(root);

      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          if (d.parent == null) {
            if (rootTitle.length > 0) {
              return "<span style='color:white'>" + rootTitle + "</span>";
            } else {return;};
          } else if (d.data[leafTitle] == null) {
              return "<span style='color:white'>" + d.data.key + "</span>";
            } else {
              if (showCount) {
                return "<span style='color:white'>" + d.data[leafTitle] + ": " + d.data[count] + "</span>";
              }
              return "<span style='color:white'>" + d.data[leafTitle] + "</span>";
            };
        })

      svgEnter.call(tip);

      var nodes = svgEnter.selectAll('.node').data(root.descendants());

      nodes.enter()
          .append('circle')
          .style("fill", function(d) { return color(d.depth); })
          .attr('transform', function(d) {return 'translate(' + diameter / 2 + ',' + diameter / 2 +')';})
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)
          .merge(nodes)
          .transition().duration(1500)
          .attr('class', 'node')
          .attr('transform', function(d) {return 'translate(' + d.y + ',' + d.x +')';})
          .attr('r', function(d) {return d.r;});
    });
  };


  // Getter/setter methods to change locally scoped settings
  chart.height = function(value) {
      if (!arguments.length) return height;
      height = value;
      return chart;
  };

  chart.width = function(value) {
      if (!arguments.length) return width;
      width = value;
      return chart;
  };

  chart.count = function(value) {
    if (!arguments.length) return count;
    count = value;
    return chart;
  }

  chart.leafTitle = function(value) {
    if (!arguments.length) return leafTitle;
    leafTitle = value;
    return chart;
  }

  chart.rootTitle = function(value) {
    if (!arguments.length) return rootTitle;
    rootTitle = value;
    return chart;
  }

  chart.colorDomain = function(value) {
    if (!arguments.length) return colorDomain;
    colorDomain = value;
    return chart;
  }

  chart.showCount = function(value) {
    if (!arguments.length) return showCount;
    showCount = value;
    return chart;
  }

  return chart;
};
