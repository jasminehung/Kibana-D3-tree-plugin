define(function (require) {
  var module = require('ui/modules').get('kibana/kbn_tree', ['kibana']);
  var d3 = require('d3');
  var _ = require('lodash');
  var $ = require('jquery');

  var formatNumber = d3.format(',.0f');

  module.controller('KbnTreeController', function ($scope, $element, $rootScope, Private) {
  var TreeAggResponse = Private(require('./lib/agg_response'));

  var svgRoot = $element[0];
  var margin = 50;
  var div;
  var node, root;
  div = d3.select(svgRoot);
  var width = 700,
      height = 500;

  var tree = d3.layout.tree().size([height, width - 160]);
  //Create Bézier curve between two points
  var diagonal = d3.svg.diagonal().projection(function(d) { return [d.y, d.x]; });


  var _buildVis = function (json) {
          var svg = d3.select(".metric-container").append("svg")
              .attr("width", width)
              .attr("height", height)
              .append("g")
              .attr("transform", "translate(40,0)");

          var nodes = tree.nodes(json),
              links = tree.links(nodes);

          // Draw curve
          var link = svg.selectAll("path.link")
              .data(links)
              .enter().append("path")
              .attr("class", "link")
              .attr("d", diagonal);

          var node = svg.selectAll("g.node")
              .data(nodes)
              .enter().append("g")
              .attr("class", "node")
              .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

          node.append("circle").attr("r", 4.5);

          //Text labels on each node
          node.append("text")
              .attr("dx", function(d) { return d.children ? -8 : 8; })
              .attr("dy", 3)
              .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
              .text(function(d) { return d.name; });

          // Show Value of each node
          if ($scope.vis.params.showValues) {
                var textValue = node.append("text")
                    .attr("dx", "6") // margin
                    .attr("dy", "1.35em") // vertical-align
                    .attr("fill", $scope.vis.params.color)
                    .text(function(d) { return ( d.name == "flare" ? "" : "(" + d.size + ")"); });
                 }
    };

    var _render = function (data) {
    	d3.select(svgRoot).selectAll('svg').remove();
      	_buildVis(data.children);
    };

    $scope.$watch('esResponse', function (resp) {
      	if (resp) {
        	var chartData = TreeAggResponse($scope.vis, resp);
        	_render(chartData);
      	}
    });

    d3.select(self.frameElement).style("height", height + "px");

  });
});
