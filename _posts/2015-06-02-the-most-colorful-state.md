---
title: The Most Colorful State  
layout: posts
author: Zhou Yu and Eli Bressert
author_url: 'http://technology.stitchfix.com/#team'
published: true
location: "San Francisco, CA"
---
<script src='http://d3js.org/d3.v3.min.js' type='text/javascript'></script>
<script src='http://d3js.org/topojson.v1.min.js' type='text/javascript'></script>
<script src='http://datamaps.github.io/scripts/datamaps.all.min.js' type='text/javascript'></script>
<script src='http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0/handlebars.min.js' type='text/javascript'></script>
<script src='http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.1/angular.min.js' type='text/javascript'></script>

Throughout the year, people wear different types of clothes. As we transition from Summer to Fall, tanktops are replaced by sweaters, and as Spring turns into Summer, pants are replaced by shorts and skirts. But what about colors? Do people wear different colors to match the seasons? From anecdotal experience we would say yes. One might even guess that people tend to wear more gray/black clothing in New York vs. sunny Los Angeles during the Winter.

Stitch Fix interacts closely with its clientele and we get a lot of feedback from them regarding what clothes they keep, why they like them, and much more. Each item of clothing they keep has a ton of metadata, such as pattern, material, size, and most importantly for this post, **color**.

We collected and analyzed our data to see if there tends to be a trend of preferred colors throughout the year based on what clients purchase from our service. By looking at the changes in the most preferred colors from January to December of each state, we find that Kentucky has won the crown of the most colorful state, with 8 different preferred colors over 12 months! By comparison, Minnesota switches between only gray and light gray throughout the year. Where does your state stand? Check out the interactive map to find out.


<style>
.rChart {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 800px;
  height: 400px;
}

.style {
    stroke: rgb(0, 0, 0);
    stroke-width: 1px;
}

.container {
  max-width: 800px;
}

</style>
<body ng-app ng-controller='rChartsCtrl'>

<div class='box'>
<div class='container'>
<input id='slider' type='range' min=1 max=12 ng-model='month' width=200>
<span id='show-month' ng-bind='month'></span>
<div id='chart_1' class='rChart datamaps'></div>
</div>
<script>
function rChartsCtrl($scope){
$scope.month = 1;
$scope.$watch('month', function(newmonth){
mapchart_1.updateChoropleth(chartParams.newData[newmonth]);
})
}
</script>
</div>

<script id='popup-template' type='text/x-handlebars-template'>


</script>
<script>
var chartParams = {
"dom": "chart_1",
"width":    800,
"height":    400,
"scope": "usa",
"fills": {
"black": "#000000",
"blue": "#8084ff",
"burgundy": "#ff7272",
"cobalt": "#56b3ff",
"coral": "#ff9e80",
"green": "#83ff7f",
"grey": "#9c9c9c",
"light grey": "#D3D3D3",
"navy": "#6c70ff",
"orange": "#ffc870",
"teal green": "#a1dfc6",
"white": "#ffffff"
},
"data": {
"NV": {
"month": 3,
"State": "NV",
"useless": "#0000CD",
"fillKey": "blue"
},
"FL": {
"month": 3,
"State": "FL",
"useless": "#0000CD",
"fillKey": "blue"
},
"DC": {
"month": 3,
"State": "DC",
"useless": "#0000CD",
"fillKey": "blue"
},
"NM": {
"month": 3,
"State": "NM",
"useless": "#0000CD",
"fillKey": "blue"
},
"RI": {
"month": 3,
"State": "RI",
"useless": "#0000CD",
"fillKey": "blue"
},
"VT": {
"month": 3,
"State": "VT",
"useless": "#0000CD",
"fillKey": "blue"
},
"IN": {
"month": 3,
"State": "IN",
"useless": "#0000CD",
"fillKey": "blue"
},
"AK": {
"month": 3,
"State": "AK",
"useless": "#1874CD",
"fillKey": "cobalt"
},
"WI": {
"month": 3,
"State": "WI",
"useless": "#1874CD",
"fillKey": "cobalt"
},
"NJ": {
"month": 3,
"State": "NJ",
"useless": "#1874CD",
"fillKey": "cobalt"
},
"TN": {
"month": 3,
"State": "TN",
"useless": "#1874CD",
"fillKey": "cobalt"
},
"OK": {
"month": 3,
"State": "OK",
"useless": "#1874CD",
"fillKey": "cobalt"
},
"AL": {
"month": 3,
"State": "AL",
"useless": "#FF7F50",
"fillKey": "coral"
},
"MD": {
"month": 3,
"State": "MD",
"useless": "#FF7F50",
"fillKey": "coral"
},
"PA": {
"month": 3,
"State": "PA",
"useless": "#006400",
"fillKey": "green"
},
"TX": {
"month": 3,
"State": "TX",
"useless": "#006400",
"fillKey": "green"
},
"NY": {
"month": 3,
"State": "NY",
"useless": "#006400",
"fillKey": "green"
},
"KY": {
"month": 3,
"State": "KY",
"useless": "#006400",
"fillKey": "green"
},
"GA": {
"month": 3,
"State": "GA",
"useless": "#006400",
"fillKey": "green"
},
"SC": {
"month": 3,
"State": "SC",
"useless": "#006400",
"fillKey": "green"
},
"VA": {
"month": 3,
"State": "VA",
"useless": "#006400",
"fillKey": "green"
},
"MO": {
"month": 3,
"State": "MO",
"useless": "#006400",
"fillKey": "green"
},
"IL": {
"month": 3,
"State": "IL",
"useless": "#666666",
"fillKey": "grey"
},
"CO": {
"month": 3,
"State": "CO",
"useless": "#666666",
"fillKey": "grey"
},
"SD": {
"month": 3,
"State": "SD",
"useless": "#666666",
"fillKey": "grey"
},
"ND": {
"month": 3,
"State": "ND",
"useless": "#666666",
"fillKey": "grey"
},
"MA": {
"month": 3,
"State": "MA",
"useless": "#666666",
"fillKey": "grey"
},
"OR": {
"month": 3,
"State": "OR",
"useless": "#666666",
"fillKey": "grey"
},
"NE": {
"month": 3,
"State": "NE",
"useless": "#666666",
"fillKey": "grey"
},
"WY": {
"month": 3,
"State": "WY",
"useless": "#666666",
"fillKey": "grey"
},
"MN": {
"month": 3,
"State": "MN",
"useless": "#666666",
"fillKey": "grey"
},
"OH": {
"month": 3,
"State": "OH",
"useless": "#666666",
"fillKey": "grey"
},
"NH": {
"month": 3,
"State": "NH",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"AR": {
"month": 3,
"State": "AR",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"NC": {
"month": 3,
"State": "NC",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"CA": {
"month": 3,
// "State": "CA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"MT": {
"month": 3,
"State": "MT",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"MI": {
"month": 3,
"State": "MI",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"WA": {
"month": 3,
"State": "WA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"HI": {
"month": 3,
"State": "HI",
"useless": "#000080",
"fillKey": "navy"
},
"CT": {
"month": 3,
"State": "CT",
"useless": "#000080",
"fillKey": "navy"
},
"KS": {
"month": 3,
"State": "KS",
"useless": "#FFA500",
"fillKey": "orange"
},
"LA": {
"month": 3,
"State": "LA",
"useless": "#FFA500",
"fillKey": "orange"
},
"MS": {
"month": 3,
"State": "MS",
"useless": "#66CDAA",
"fillKey": "teal green"
},
"IA": {
"month": 3,
"State": "IA",
"useless": "#66CDAA",
"fillKey": "teal green"
},
"AZ": {
"month": 3,
"State": "AZ",
"useless": "#66CDAA",
"fillKey": "teal green"
},
"UT": {
"month": 3,
"State": "UT",
"useless": "#66CDAA",
"fillKey": "teal green"
},
"ID": {
"month": 3,
"State": "ID",
"useless": "#66CDAA",
"fillKey": "teal green"
},
"DE": {
"month": 3,
"State": "DE",
"useless": "#FFFFFF",
"fillKey": "white"
},
"WV": {
"month": 3,
"State": "WV",
"useless": "#FFFFFF",
"fillKey": "white"
}
},
"legend": true,
"labels": true,
"id": "chart_1",
"bodyattrs": "ng-app ng-controller='rChartsCtrl'",
"newData": {
"1": {
"WA": {
"month": 1,
"State": "WA",
"useless": "#000000",
"fillKey": "black"
},
"ME": {
"month": 1,
"State": "ME",
"useless": "#000000",
"fillKey": "black"
},
"MT": {
"month": 1,
"State": "MT",
"useless": "#000000",
"fillKey": "black"
},
"DC": {
"month": 1,
"State": "DC",
"useless": "#0000CD",
"fillKey": "blue"
},
"AZ": {
"month": 1,
"State": "AZ",
"useless": "#A52A2A",
"fillKey": "burgundy"
},
"NV": {
"month": 1,
"State": "NV",
"useless": "#A52A2A",
"fillKey": "burgundy"
},
"VA": {
"month": 1,
"State": "VA",
"useless": "#1874CD",
"fillKey": "cobalt"
},
"CA": {
"month": 1,
"State": "CA",
"useless": "#FF7F50",
"fillKey": "coral"
},
"OH": {
"month": 1,
"State": "OH",
"useless": "#FF7F50",
"fillKey": "coral"
},
"IL": {
"month": 1,
"State": "IL",
"useless": "#FF7F50",
"fillKey": "coral"
},
"NC": {
"month": 1,
"State": "NC",
"useless": "#FF7F50",
"fillKey": "coral"
},
"PA": {
"month": 1,
"State": "PA",
"useless": "#FF7F50",
"fillKey": "coral"
},
"SC": {
"month": 1,
"State": "SC",
"useless": "#006400",
"fillKey": "green"
},
"UT": {
"month": 1,
"State": "UT",
"useless": "#666666",
"fillKey": "grey"
},
"IN": {
"month": 1,
"State": "IN",
"useless": "#666666",
"fillKey": "grey"
},
"KS": {
"month": 1,
"State": "KS",
"useless": "#666666",
"fillKey": "grey"
},
"AR": {
"month": 1,
"State": "AR",
"useless": "#666666",
"fillKey": "grey"
},
"ID": {
"month": 1,
"State": "ID",
"useless": "#666666",
"fillKey": "grey"
},
"GA": {
"month": 1,
"State": "GA",
"useless": "#666666",
"fillKey": "grey"
},
"DE": {
"month": 1,
"State": "DE",
"useless": "#666666",
"fillKey": "grey"
},
"CO": {
"month": 1,
"State": "CO",
"useless": "#666666",
"fillKey": "grey"
},
"TX": {
"month": 1,
"State": "TX",
"useless": "#666666",
"fillKey": "grey"
},
"OR": {
"month": 1,
"State": "OR",
"useless": "#666666",
"fillKey": "grey"
},
"MO": {
"month": 1,
"State": "MO",
"useless": "#666666",
"fillKey": "grey"
},
"FL": {
"month": 1,
"State": "FL",
"useless": "#666666",
"fillKey": "grey"
},
"VT": {
"month": 1,
"State": "VT",
"useless": "#666666",
"fillKey": "grey"
},
"NM": {
"month": 1,
"State": "NM",
"useless": "#666666",
"fillKey": "grey"
},
"IA": {
"month": 1,
"State": "IA",
"useless": "#666666",
"fillKey": "grey"
},
"NJ": {
"month": 1,
"State": "NJ",
"useless": "#666666",
"fillKey": "grey"
},
"WV": {
"month": 1,
"State": "WV",
"useless": "#666666",
"fillKey": "grey"
},
"SD": {
"month": 1,
"State": "SD",
"useless": "#666666",
"fillKey": "grey"
},
"TN": {
"month": 1,
"State": "TN",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"RI": {
"month": 1,
"State": "RI",
"useless": "#000080",
"fillKey": "navy"
},
"HI": {
"month": 1,
"State": "HI",
"useless": "#000080",
"fillKey": "navy"
},
"WY": {
"month": 1,
"State": "WY",
"useless": "#000080",
"fillKey": "navy"
},
"MA": {
"month": 1,
"State": "MA",
"useless": "#FFA500",
"fillKey": "orange"
},
"WI": {
"month": 1,
"State": "WI",
"useless": "#FFA500",
"fillKey": "orange"
},
"LA": {
"month": 1,
"State": "LA",
"useless": "#FFA500",
"fillKey": "orange"
},
"MD": {
"month": 1,
"State": "MD",
"useless": "#FFA500",
"fillKey": "orange"
},
"MI": {
"month": 1,
"State": "MI",
"useless": "#66CDAA",
"fillKey": "teal green"
},
"AK": {
"month": 1,
"State": "AK",
"useless": "#66CDAA",
"fillKey": "teal green"
},
"NE": {
"month": 1,
"State": "NE",
"useless": "#66CDAA",
"fillKey": "teal green"
},
"MS": {
"month": 1,
"State": "MS",
"useless": "#FFFFFF",
"fillKey": "white"
},
"CT": {
"month": 1,
"State": "CT",
"useless": "#FFFFFF",
"fillKey": "white"
},
"ND": {
"month": 1,
"State": "ND",
"useless": "#FFFFFF",
"fillKey": "white"
}
},
"2": {
"RI": {
"month": 2,
"State": "RI",
"useless": "#0000CD",
"fillKey": "blue"
},
"ME": {
"month": 2,
"State": "ME",
"useless": "#0000CD",
"fillKey": "blue"
},
"ND": {
"month": 2,
"State": "ND",
"useless": "#A52A2A",
"fillKey": "burgundy"
},
"IN": {
"month": 2,
"State": "IN",
"useless": "#A52A2A",
"fillKey": "burgundy"
},
"AK": {
"month": 2,
"State": "AK",
"useless": "#1874CD",
"fillKey": "cobalt"
},
"NV": {
"month": 2,
"State": "NV",
"useless": "#1874CD",
"fillKey": "cobalt"
},
"OH": {
"month": 2,
"State": "OH",
"useless": "#FF7F50",
"fillKey": "coral"
},
"WA": {
"month": 2,
"State": "WA",
"useless": "#FF7F50",
"fillKey": "coral"
},
"KS": {
"month": 2,
"State": "KS",
"useless": "#FF7F50",
"fillKey": "coral"
},
"KY": {
"month": 2,
"State": "KY",
"useless": "#FF7F50",
"fillKey": "coral"
},
"LA": {
"month": 2,
"State": "LA",
"useless": "#666666",
"fillKey": "grey"
},
"DC": {
"month": 2,
"State": "DC",
"useless": "#666666",
"fillKey": "grey"
},
"MN": {
"month": 2,
"State": "MN",
"useless": "#666666",
"fillKey": "grey"
},
"SD": {
"month": 2,
"State": "SD",
"useless": "#666666",
"fillKey": "grey"
},
"WI": {
"month": 2,
"State": "WI",
"useless": "#666666",
"fillKey": "grey"
},
"CO": {
"month": 2,
"State": "CO",
"useless": "#666666",
"fillKey": "grey"
},
"MI": {
"month": 2,
"State": "MI",
"useless": "#666666",
"fillKey": "grey"
},
"HI": {
"month": 2,
"State": "HI",
"useless": "#666666",
"fillKey": "grey"
},
"NE": {
"month": 2,
"State": "NE",
"useless": "#666666",
"fillKey": "grey"
},
"MA": {
"month": 2,
"State": "MA",
"useless": "#666666",
"fillKey": "grey"
},
"MS": {
"month": 2,
"State": "MS",
"useless": "#666666",
"fillKey": "grey"
},
"MT": {
"month": 2,
"State": "MT",
"useless": "#666666",
"fillKey": "grey"
},
"IL": {
"month": 2,
"State": "IL",
"useless": "#666666",
"fillKey": "grey"
},
"NM": {
"month": 2,
"State": "NM",
"useless": "#666666",
"fillKey": "grey"
},
"TX": {
"month": 2,
"State": "TX",
"useless": "#666666",
"fillKey": "grey"
},
"IA": {
"month": 2,
"State": "IA",
"useless": "#666666",
"fillKey": "grey"
},
"WY": {
"month": 2,
"State": "WY",
"useless": "#666666",
"fillKey": "grey"
},
"NC": {
"month": 2,
"State": "NC",
"useless": "#666666",
"fillKey": "grey"
},
"WV": {
"month": 2,
"State": "WV",
"useless": "#666666",
"fillKey": "grey"
},
"VT": {
"month": 2,
"State": "VT",
"useless": "#666666",
"fillKey": "grey"
},
"MO": {
"month": 2,
"State": "MO",
"useless": "#666666",
"fillKey": "grey"
},
"UT": {
"month": 2,
"State": "UT",
"useless": "#666666",
"fillKey": "grey"
},
"GA": {
"month": 2,
"State": "GA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"AL": {
"month": 2,
"State": "AL",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"CA": {
"month": 2,
"State": "CA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"AR": {
"month": 2,
"State": "AR",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"FL": {
"month": 2,
"State": "FL",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"CT": {
"month": 2,
"State": "CT",
"useless": "#000080",
"fillKey": "navy"
},
"DE": {
"month": 2,
"State": "DE",
"useless": "#000080",
"fillKey": "navy"
},
"PA": {
"month": 2,
"State": "PA",
"useless": "#000080",
"fillKey": "navy"
},
"MD": {
"month": 2,
"State": "MD",
"useless": "#FFA500",
"fillKey": "orange"
},
"AZ": {
"month": 2,
"State": "AZ",
"useless": "#FFA500",
"fillKey": "orange"
},
"NJ": {
"month": 2,
"State": "NJ",
"useless": "#FFA500",
"fillKey": "orange"
},
"VA": {
"month": 2,
"State": "VA",
"useless": "#FFA500",
"fillKey": "orange"
},
"OK": {
"month": 2,
"State": "OK",
"useless": "#FFA500",
"fillKey": "orange"
},
"TN": {
"month": 2,
"State": "TN",
"useless": "#FFA500",
"fillKey": "orange"
},
"OR": {
"month": 2,
"State": "OR",
"useless": "#66CDAA",
"fillKey": "teal green"
}
},
"3": {
"NV": {
"month": 3,
"State": "NV",
"useless": "#0000CD",
"fillKey": "blue"
},
"FL": {
"month": 3,
"State": "FL",
"useless": "#0000CD",
"fillKey": "blue"
},
"DC": {
"month": 3,
"State": "DC",
"useless": "#0000CD",
"fillKey": "blue"
},
"NM": {
"month": 3,
"State": "NM",
"useless": "#0000CD",
"fillKey": "blue"
},
"RI": {
"month": 3,
"State": "RI",
"useless": "#0000CD",
"fillKey": "blue"
},
"VT": {
"month": 3,
"State": "VT",
"useless": "#0000CD",
"fillKey": "blue"
},
"IN": {
"month": 3,
"State": "IN",
"useless": "#0000CD",
"fillKey": "blue"
},
"AK": {
"month": 3,
"State": "AK",
"useless": "#1874CD",
"fillKey": "cobalt"
},
"WI": {
"month": 3,
"State": "WI",
"useless": "#1874CD",
"fillKey": "cobalt"
},
"NJ": {
"month": 3,
"State": "NJ",
"useless": "#1874CD",
"fillKey": "cobalt"
},
"TN": {
"month": 3,
"State": "TN",
"useless": "#1874CD",
"fillKey": "cobalt"
},
"OK": {
"month": 3,
"State": "OK",
"useless": "#1874CD",
"fillKey": "cobalt"
},
"AL": {
"month": 3,
"State": "AL",
"useless": "#FF7F50",
"fillKey": "coral"
},
"MD": {
"month": 3,
"State": "MD",
"useless": "#FF7F50",
"fillKey": "coral"
},
"PA": {
"month": 3,
"State": "PA",
"useless": "#006400",
"fillKey": "green"
},
"TX": {
"month": 3,
"State": "TX",
"useless": "#006400",
"fillKey": "green"
},
"NY": {
"month": 3,
"State": "NY",
"useless": "#006400",
"fillKey": "green"
},
"KY": {
"month": 3,
"State": "KY",
"useless": "#006400",
"fillKey": "green"
},
"GA": {
"month": 3,
"State": "GA",
"useless": "#006400",
"fillKey": "green"
},
"SC": {
"month": 3,
"State": "SC",
"useless": "#006400",
"fillKey": "green"
},
"VA": {
"month": 3,
"State": "VA",
"useless": "#006400",
"fillKey": "green"
},
"MO": {
"month": 3,
"State": "MO",
"useless": "#006400",
"fillKey": "green"
},
"IL": {
"month": 3,
"State": "IL",
"useless": "#666666",
"fillKey": "grey"
},
"CO": {
"month": 3,
"State": "CO",
"useless": "#666666",
"fillKey": "grey"
},
"SD": {
"month": 3,
"State": "SD",
"useless": "#666666",
"fillKey": "grey"
},
"ND": {
"month": 3,
"State": "ND",
"useless": "#666666",
"fillKey": "grey"
},
"MA": {
"month": 3,
"State": "MA",
"useless": "#666666",
"fillKey": "grey"
},
"OR": {
"month": 3,
"State": "OR",
"useless": "#666666",
"fillKey": "grey"
},
"NE": {
"month": 3,
"State": "NE",
"useless": "#666666",
"fillKey": "grey"
},
"WY": {
"month": 3,
"State": "WY",
"useless": "#666666",
"fillKey": "grey"
},
"MN": {
"month": 3,
"State": "MN",
"useless": "#666666",
"fillKey": "grey"
},
"OH": {
"month": 3,
"State": "OH",
"useless": "#666666",
"fillKey": "grey"
},
"NH": {
"month": 3,
"State": "NH",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"AR": {
"month": 3,
"State": "AR",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"NC": {
"month": 3,
"State": "NC",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"CA": {
"month": 3,
"State": "CA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"MT": {
"month": 3,
"State": "MT",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"MI": {
"month": 3,
"State": "MI",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"WA": {
"month": 3,
"State": "WA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"HI": {
"month": 3,
"State": "HI",
"useless": "#000080",
"fillKey": "navy"
},
"CT": {
"month": 3,
"State": "CT",
"useless": "#000080",
"fillKey": "navy"
},
"KS": {
"month": 3,
"State": "KS",
"useless": "#FFA500",
"fillKey": "orange"
},
"LA": {
"month": 3,
"State": "LA",
"useless": "#FFA500",
"fillKey": "orange"
},
"MS": {
"month": 3,
"State": "MS",
"useless": "#66CDAA",
"fillKey": "teal green"
},
"IA": {
"month": 3,
"State": "IA",
"useless": "#66CDAA",
"fillKey": "teal green"
},
"AZ": {
"month": 3,
"State": "AZ",
"useless": "#66CDAA",
"fillKey": "teal green"
},
"UT": {
"month": 3,
"State": "UT",
"useless": "#66CDAA",
"fillKey": "teal green"
},
"ID": {
"month": 3,
"State": "ID",
"useless": "#66CDAA",
"fillKey": "teal green"
},
"DE": {
"month": 3,
"State": "DE",
"useless": "#FFFFFF",
"fillKey": "white"
},
"WV": {
"month": 3,
"State": "WV",
"useless": "#FFFFFF",
"fillKey": "white"
}
},
"4": {
"WI": {
"month": 4,
"State": "WI",
"useless": "#000000",
"fillKey": "black"
},
"ND": {
"month": 4,
"State": "ND",
"useless": "#000000",
"fillKey": "black"
},
"KS": {
"month": 4,
"State": "KS",
"useless": "#000000",
"fillKey": "black"
},
"NV": {
"month": 4,
"State": "NV",
"useless": "#000000",
"fillKey": "black"
},
"NH": {
"month": 4,
"State": "NH",
"useless": "#0000CD",
"fillKey": "blue"
},
"OK": {
"month": 4,
"State": "OK",
"useless": "#0000CD",
"fillKey": "blue"
},
"CT": {
"month": 4,
"State": "CT",
"useless": "#0000CD",
"fillKey": "blue"
},
"AL": {
"month": 4,
"State": "AL",
"useless": "#006400",
"fillKey": "green"
},
"MD": {
"month": 4,
"State": "MD",
"useless": "#666666",
"fillKey": "grey"
},
"NJ": {
"month": 4,
"State": "NJ",
"useless": "#666666",
"fillKey": "grey"
},
"AK": {
"month": 4,
"State": "AK",
"useless": "#666666",
"fillKey": "grey"
},
"IA": {
"month": 4,
"State": "IA",
"useless": "#666666",
"fillKey": "grey"
},
"RI": {
"month": 4,
"State": "RI",
"useless": "#666666",
"fillKey": "grey"
},
"MN": {
"month": 4,
"State": "MN",
"useless": "#666666",
"fillKey": "grey"
},
"WY": {
"month": 4,
"State": "WY",
"useless": "#666666",
"fillKey": "grey"
},
"MO": {
"month": 4,
"State": "MO",
"useless": "#666666",
"fillKey": "grey"
},
"IN": {
"month": 4,
"State": "IN",
"useless": "#666666",
"fillKey": "grey"
},
"CO": {
"month": 4,
"State": "CO",
"useless": "#666666",
"fillKey": "grey"
},
"OR": {
"month": 4,
"State": "OR",
"useless": "#666666",
"fillKey": "grey"
},
"NY": {
"month": 4,
"State": "NY",
"useless": "#666666",
"fillKey": "grey"
},
"CA": {
"month": 4,
"State": "CA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"OH": {
"month": 4,
"State": "OH",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"MI": {
"month": 4,
"State": "MI",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"PA": {
"month": 4,
"State": "PA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"TX": {
"month": 4,
"State": "TX",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"IL": {
"month": 4,
"State": "IL",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"WA": {
"month": 4,
"State": "WA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"GA": {
"month": 4,
"State": "GA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"VA": {
"month": 4,
"State": "VA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"MA": {
"month": 4,
"State": "MA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"SD": {
"month": 4,
"State": "SD",
"useless": "#000080",
"fillKey": "navy"
},
"ME": {
"month": 4,
"State": "ME",
"useless": "#000080",
"fillKey": "navy"
},
"SC": {
"month": 4,
"State": "SC",
"useless": "#000080",
"fillKey": "navy"
},
"ID": {
"month": 4,
"State": "ID",
"useless": "#000080",
"fillKey": "navy"
},
"AR": {
"month": 4,
"State": "AR",
"useless": "#000080",
"fillKey": "navy"
},
"NE": {
"month": 4,
"State": "NE",
"useless": "#000080",
"fillKey": "navy"
},
"WV": {
"month": 4,
"State": "WV",
"useless": "#000080",
"fillKey": "navy"
},
"MS": {
"month": 4,
"State": "MS",
"useless": "#000080",
"fillKey": "navy"
},
"DC": {
"month": 4,
"State": "DC",
"useless": "#000080",
"fillKey": "navy"
},
"MT": {
"month": 4,
"State": "MT",
"useless": "#000080",
"fillKey": "navy"
},
"KY": {
"month": 4,
"State": "KY",
"useless": "#000080",
"fillKey": "navy"
},
"NC": {
"month": 4,
"State": "NC",
"useless": "#FFA500",
"fillKey": "orange"
},
"HI": {
"month": 4,
"State": "HI",
"useless": "#FFFFFF",
"fillKey": "white"
},
"AZ": {
"month": 4,
"State": "AZ",
"useless": "#FFFFFF",
"fillKey": "white"
},
"NM": {
"month": 4,
"State": "NM",
"useless": "#FFFFFF",
"fillKey": "white"
},
"DE": {
"month": 4,
"State": "DE",
"useless": "#FFFFFF",
"fillKey": "white"
},
"VT": {
"month": 4,
"State": "VT",
"useless": "#FFFFFF",
"fillKey": "white"
},
"LA": {
"month": 4,
"State": "LA",
"useless": "#FFFFFF",
"fillKey": "white"
}
},
"5": {
"HI": {
"month": 5,
"State": "HI",
"useless": "#000000",
"fillKey": "black"
},
"WV": {
"month": 5,
"State": "WV",
"useless": "#000000",
"fillKey": "black"
},
"AK": {
"month": 5,
"State": "AK",
"useless": "#000000",
"fillKey": "black"
},
"CT": {
"month": 5,
"State": "CT",
"useless": "#000000",
"fillKey": "black"
},
"KY": {
"month": 5,
"State": "KY",
"useless": "#000000",
"fillKey": "black"
},
"NE": {
"month": 5,
"State": "NE",
"useless": "#0000CD",
"fillKey": "blue"
},
"ID": {
"month": 5,
"State": "ID",
"useless": "#1874CD",
"fillKey": "cobalt"
},
"LA": {
"month": 5,
"State": "LA",
"useless": "#006400",
"fillKey": "green"
},
"KS": {
"month": 5,
"State": "KS",
"useless": "#006400",
"fillKey": "green"
},
"IA": {
"month": 5,
"State": "IA",
"useless": "#666666",
"fillKey": "grey"
},
"MO": {
"month": 5,
"State": "MO",
"useless": "#666666",
"fillKey": "grey"
},
"CO": {
"month": 5,
"State": "CO",
"useless": "#666666",
"fillKey": "grey"
},
"ND": {
"month": 5,
"State": "ND",
"useless": "#666666",
"fillKey": "grey"
},
"MN": {
"month": 5,
"State": "MN",
"useless": "#666666",
"fillKey": "grey"
},
"OR": {
"month": 5,
"State": "OR",
"useless": "#666666",
"fillKey": "grey"
},
"NY": {
"month": 5,
"State": "NY",
"useless": "#666666",
"fillKey": "grey"
},
"MT": {
"month": 5,
"State": "MT",
"useless": "#666666",
"fillKey": "grey"
},
"WA": {
"month": 5,
"State": "WA",
"useless": "#666666",
"fillKey": "grey"
},
"SC": {
"month": 5,
"State": "SC",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"WI": {
"month": 5,
"State": "WI",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"NC": {
"month": 5,
"State": "NC",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"CA": {
"month": 5,
"State": "CA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"IL": {
"month": 5,
"State": "IL",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"TN": {
"month": 5,
"State": "TN",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"GA": {
"month": 5,
"State": "GA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"MA": {
"month": 5,
"State": "MA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"OH": {
"month": 5,
"State": "OH",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"MI": {
"month": 5,
"State": "MI",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"VA": {
"month": 5,
"State": "VA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"MD": {
"month": 5,
"State": "MD",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"AL": {
"month": 5,
"State": "AL",
"useless": "#000080",
"fillKey": "navy"
},
"MS": {
"month": 5,
"State": "MS",
"useless": "#000080",
"fillKey": "navy"
},
"AR": {
"month": 5,
"State": "AR",
"useless": "#000080",
"fillKey": "navy"
},
"VT": {
"month": 5,
"State": "VT",
"useless": "#000080",
"fillKey": "navy"
},
"RI": {
"month": 5,
"State": "RI",
"useless": "#000080",
"fillKey": "navy"
},
"AZ": {
"month": 5,
"State": "AZ",
"useless": "#FFA500",
"fillKey": "orange"
},
"NJ": {
"month": 5,
"State": "NJ",
"useless": "#FFA500",
"fillKey": "orange"
},
"TX": {
"month": 5,
"State": "TX",
"useless": "#FFA500",
"fillKey": "orange"
},
"FL": {
"month": 5,
"State": "FL",
"useless": "#FFA500",
"fillKey": "orange"
},
"NH": {
"month": 5,
"State": "NH",
"useless": "#FFFFFF",
"fillKey": "white"
},
"DE": {
"month": 5,
"State": "DE",
"useless": "#FFFFFF",
"fillKey": "white"
},
"ME": {
"month": 5,
"State": "ME",
"useless": "#FFFFFF",
"fillKey": "white"
},
"SD": {
"month": 5,
"State": "SD",
"useless": "#FFFFFF",
"fillKey": "white"
},
"PA": {
"month": 5,
"State": "PA",
"useless": "#FFFFFF",
"fillKey": "white"
},
"UT": {
"month": 5,
"State": "UT",
"useless": "#FFFFFF",
"fillKey": "white"
},
"NM": {
"month": 5,
"State": "NM",
"useless": "#FFFFFF",
"fillKey": "white"
},
"NV": {
"month": 5,
"State": "NV",
"useless": "#FFFFFF",
"fillKey": "white"
},
"WY": {
"month": 5,
"State": "WY",
"useless": "#FFFFFF",
"fillKey": "white"
}
},
"6": {
"SD": {
"month": 6,
"State": "SD",
"useless": "#000000",
"fillKey": "black"
},
"WV": {
"month": 6,
"State": "WV",
"useless": "#000000",
"fillKey": "black"
},
"AK": {
"month": 6,
"State": "AK",
"useless": "#000000",
"fillKey": "black"
},
"NE": {
"month": 6,
"State": "NE",
"useless": "#000000",
"fillKey": "black"
},
"RI": {
"month": 6,
"State": "RI",
"useless": "#0000CD",
"fillKey": "blue"
},
"AR": {
"month": 6,
"State": "AR",
"useless": "#0000CD",
"fillKey": "blue"
},
"KY": {
"month": 6,
"State": "KY",
"useless": "#0000CD",
"fillKey": "blue"
},
"SC": {
"month": 6,
"State": "SC",
"useless": "#1874CD",
"fillKey": "cobalt"
},
"IN": {
"month": 6,
"State": "IN",
"useless": "#006400",
"fillKey": "green"
},
"GA": {
"month": 6,
"State": "GA",
"useless": "#666666",
"fillKey": "grey"
},
"NC": {
"month": 6,
"State": "NC",
"useless": "#666666",
"fillKey": "grey"
},
"NY": {
"month": 6,
"State": "NY",
"useless": "#666666",
"fillKey": "grey"
},
"CA": {
"month": 6,
"State": "CA",
"useless": "#666666",
"fillKey": "grey"
},
"MT": {
"month": 6,
"State": "MT",
"useless": "#666666",
"fillKey": "grey"
},
"TN": {
"month": 6,
"State": "TN",
"useless": "#666666",
"fillKey": "grey"
},
"MA": {
"month": 6,
"State": "MA",
"useless": "#666666",
"fillKey": "grey"
},
"TX": {
"month": 6,
"State": "TX",
"useless": "#666666",
"fillKey": "grey"
},
"OR": {
"month": 6,
"State": "OR",
"useless": "#666666",
"fillKey": "grey"
},
"OH": {
"month": 6,
"State": "OH",
"useless": "#666666",
"fillKey": "grey"
},
"NJ": {
"month": 6,
"State": "NJ",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"IL": {
"month": 6,
"State": "IL",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"AL": {
"month": 6,
"State": "AL",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"MO": {
"month": 6,
"State": "MO",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"PA": {
"month": 6,
"State": "PA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"WI": {
"month": 6,
"State": "WI",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"MN": {
"month": 6,
"State": "MN",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"CO": {
"month": 6,
"State": "CO",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"MI": {
"month": 6,
"State": "MI",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"IA": {
"month": 6,
"State": "IA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"FL": {
"month": 6,
"State": "FL",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"MD": {
"month": 6,
"State": "MD",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"VA": {
"month": 6,
"State": "VA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"WA": {
"month": 6,
"State": "WA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"NH": {
"month": 6,
"State": "NH",
"useless": "#000080",
"fillKey": "navy"
},
"NM": {
"month": 6,
"State": "NM",
"useless": "#000080",
"fillKey": "navy"
},
"VT": {
"month": 6,
"State": "VT",
"useless": "#000080",
"fillKey": "navy"
},
"DC": {
"month": 6,
"State": "DC",
"useless": "#FFA500",
"fillKey": "orange"
},
"KS": {
"month": 6,
"State": "KS",
"useless": "#FFA500",
"fillKey": "orange"
},
"AZ": {
"month": 6,
"State": "AZ",
"useless": "#FFA500",
"fillKey": "orange"
},
"OK": {
"month": 6,
"State": "OK",
"useless": "#FFA500",
"fillKey": "orange"
},
"ME": {
"month": 6,
"State": "ME",
"useless": "#FFFFFF",
"fillKey": "white"
},
"MS": {
"month": 6,
"State": "MS",
"useless": "#FFFFFF",
"fillKey": "white"
},
"ID": {
"month": 6,
"State": "ID",
"useless": "#FFFFFF",
"fillKey": "white"
},
"ND": {
"month": 6,
"State": "ND",
"useless": "#FFFFFF",
"fillKey": "white"
},
"HI": {
"month": 6,
"State": "HI",
"useless": "#FFFFFF",
"fillKey": "white"
},
"UT": {
"month": 6,
"State": "UT",
"useless": "#FFFFFF",
"fillKey": "white"
},
"LA": {
"month": 6,
"State": "LA",
"useless": "#FFFFFF",
"fillKey": "white"
},
"DE": {
"month": 6,
"State": "DE",
"useless": "#FFFFFF",
"fillKey": "white"
},
"NV": {
"month": 6,
"State": "NV",
"useless": "#FFFFFF",
"fillKey": "white"
}
},
"7": {
"ND": {
"month": 7,
"State": "ND",
"useless": "#000000",
"fillKey": "black"
},
"DE": {
"month": 7,
"State": "DE",
"useless": "#000000",
"fillKey": "black"
},
"AR": {
"month": 7,
"State": "AR",
"useless": "#0000CD",
"fillKey": "blue"
},
"CT": {
"month": 7,
"State": "CT",
"useless": "#006400",
"fillKey": "green"
},
"MI": {
"month": 7,
"State": "MI",
"useless": "#666666",
"fillKey": "grey"
},
"GA": {
"month": 7,
"State": "GA",
"useless": "#666666",
"fillKey": "grey"
},
"DC": {
"month": 7,
"State": "DC",
"useless": "#666666",
"fillKey": "grey"
},
"FL": {
"month": 7,
"State": "FL",
"useless": "#666666",
"fillKey": "grey"
},
"MD": {
"month": 7,
"State": "MD",
"useless": "#666666",
"fillKey": "grey"
},
"CO": {
"month": 7,
"State": "CO",
"useless": "#666666",
"fillKey": "grey"
},
"NE": {
"month": 7,
"State": "NE",
"useless": "#666666",
"fillKey": "grey"
},
"SC": {
"month": 7,
"State": "SC",
"useless": "#666666",
"fillKey": "grey"
},
"NC": {
"month": 7,
"State": "NC",
"useless": "#666666",
"fillKey": "grey"
},
"CA": {
"month": 7,
"State": "CA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"MO": {
"month": 7,
"State": "MO",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"TX": {
"month": 7,
"State": "TX",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"MN": {
"month": 7,
"State": "MN",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"AL": {
"month": 7,
"State": "AL",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"PA": {
"month": 7,
"State": "PA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"IL": {
"month": 7,
"State": "IL",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"NJ": {
"month": 7,
"State": "NJ",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"LA": {
"month": 7,
"State": "LA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"OH": {
"month": 7,
"State": "OH",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"IA": {
"month": 7,
"State": "IA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"VA": {
"month": 7,
"State": "VA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"NY": {
"month": 7,
"State": "NY",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"IN": {
"month": 7,
"State": "IN",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"TN": {
"month": 7,
"State": "TN",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"OK": {
"month": 7,
"State": "OK",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"KS": {
"month": 7,
"State": "KS",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"OR": {
"month": 7,
"State": "OR",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"WA": {
"month": 7,
"State": "WA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"MA": {
"month": 7,
"State": "MA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"SD": {
"month": 7,
"State": "SD",
"useless": "#000080",
"fillKey": "navy"
},
"HI": {
"month": 7,
"State": "HI",
"useless": "#000080",
"fillKey": "navy"
},
"MS": {
"month": 7,
"State": "MS",
"useless": "#000080",
"fillKey": "navy"
},
"ME": {
"month": 7,
"State": "ME",
"useless": "#000080",
"fillKey": "navy"
},
"MT": {
"month": 7,
"State": "MT",
"useless": "#000080",
"fillKey": "navy"
},
"AZ": {
"month": 7,
"State": "AZ",
"useless": "#000080",
"fillKey": "navy"
},
"ID": {
"month": 7,
"State": "ID",
"useless": "#000080",
"fillKey": "navy"
},
"RI": {
"month": 7,
"State": "RI",
"useless": "#000080",
"fillKey": "navy"
},
"NM": {
"month": 7,
"State": "NM",
"useless": "#000080",
"fillKey": "navy"
},
"NH": {
"month": 7,
"State": "NH",
"useless": "#000080",
"fillKey": "navy"
},
"AK": {
"month": 7,
"State": "AK",
"useless": "#000080",
"fillKey": "navy"
},
"WI": {
"month": 7,
"State": "WI",
"useless": "#FFA500",
"fillKey": "orange"
},
"UT": {
"month": 7,
"State": "UT",
"useless": "#FFFFFF",
"fillKey": "white"
},
"KY": {
"month": 7,
"State": "KY",
"useless": "#FFFFFF",
"fillKey": "white"
},
"WV": {
"month": 7,
"State": "WV",
"useless": "#FFFFFF",
"fillKey": "white"
},
"VT": {
"month": 7,
"State": "VT",
"useless": "#FFFFFF",
"fillKey": "white"
},
"NV": {
"month": 7,
"State": "NV",
"useless": "#FFFFFF",
"fillKey": "white"
},
"WY": {
"month": 7,
"State": "WY",
"useless": "#FFFFFF",
"fillKey": "white"
},
"NH": {
"month": 7,
"State": "NH",
"useless": "#FFFFFF",
"fillKey": "white"
}
},
"8": {
"NJ": {
"month": 8,
"State": "NJ",
"useless": "#000000",
"fillKey": "black"
},
"SD": {
"month": 8,
"State": "SD",
"useless": "#000000",
"fillKey": "black"
},
"ID": {
"month": 8,
"State": "ID",
"useless": "#000000",
"fillKey": "black"
},
"MT": {
"month": 8,
"State": "MT",
"useless": "#000000",
"fillKey": "black"
},
"NV": {
"month": 8,
"State": "NV",
"useless": "#0000CD",
"fillKey": "blue"
},
"NH": {
"month": 8,
"State": "NH",
"useless": "#1874CD",
"fillKey": "cobalt"
},
"CT": {
"month": 8,
"State": "CT",
"useless": "#006400",
"fillKey": "green"
},
"MI": {
"month": 8,
"State": "MI",
"useless": "#666666",
"fillKey": "grey"
},
"GA": {
"month": 8,
"State": "GA",
"useless": "#666666",
"fillKey": "grey"
},
"IL": {
"month": 8,
"State": "IL",
"useless": "#666666",
"fillKey": "grey"
},
"AK": {
"month": 8,
"State": "AK",
"useless": "#666666",
"fillKey": "grey"
},
"NE": {
"month": 8,
"State": "NE",
"useless": "#666666",
"fillKey": "grey"
},
"UT": {
"month": 8,
"State": "UT",
"useless": "#666666",
"fillKey": "grey"
},
"TX": {
"month": 8,
"State": "TX",
"useless": "#666666",
"fillKey": "grey"
},
"MN": {
"month": 8,
"State": "MN",
"useless": "#666666",
"fillKey": "grey"
},
"OR": {
"month": 8,
"State": "OR",
"useless": "#666666",
"fillKey": "grey"
},
"MO": {
"month": 8,
"State": "MO",
"useless": "#666666",
"fillKey": "grey"
},
"CA": {
"month": 8,
"State": "CA",
"useless": "#666666",
"fillKey": "grey"
},
"WI": {
"month": 8,
"State": "WI",
"useless": "#666666",
"fillKey": "grey"
},
"LA": {
"month": 8,
"State": "LA",
"useless": "#666666",
"fillKey": "grey"
},
"FL": {
"month": 8,
"State": "FL",
"useless": "#666666",
"fillKey": "grey"
},
"AL": {
"month": 8,
"State": "AL",
"useless": "#666666",
"fillKey": "grey"
},
"CO": {
"month": 8,
"State": "CO",
"useless": "#666666",
"fillKey": "grey"
},
"KS": {
"month": 8,
"State": "KS",
"useless": "#666666",
"fillKey": "grey"
},
"VA": {
"month": 8,
"State": "VA",
"useless": "#666666",
"fillKey": "grey"
},
"ND": {
"month": 8,
"State": "ND",
"useless": "#666666",
"fillKey": "grey"
},
"PA": {
"month": 8,
"State": "PA",
"useless": "#666666",
"fillKey": "grey"
},
"OK": {
"month": 8,
"State": "OK",
"useless": "#666666",
"fillKey": "grey"
},
"OH": {
"month": 8,
"State": "OH",
"useless": "#666666",
"fillKey": "grey"
},
"IN": {
"month": 8,
"State": "IN",
"useless": "#666666",
"fillKey": "grey"
},
"AR": {
"month": 8,
"State": "AR",
"useless": "#666666",
"fillKey": "grey"
},
"KY": {
"month": 8,
"State": "KY",
"useless": "#666666",
"fillKey": "grey"
},
"AZ": {
"month": 8,
"State": "AZ",
"useless": "#666666",
"fillKey": "grey"
},
"MA": {
"month": 8,
"State": "MA",
"useless": "#666666",
"fillKey": "grey"
},
"WA": {
"month": 8,
"State": "WA",
"useless": "#666666",
"fillKey": "grey"
},
"NY": {
"month": 8,
"State": "NY",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"MD": {
"month": 8,
"State": "MD",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"IA": {
"month": 8,
"State": "IA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"TN": {
"month": 8,
"State": "TN",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"NC": {
"month": 8,
"State": "NC",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"ME": {
"month": 8,
"State": "ME",
"useless": "#000080",
"fillKey": "navy"
},
"VT": {
"month": 8,
"State": "VT",
"useless": "#000080",
"fillKey": "navy"
},
"HI": {
"month": 8,
"State": "HI",
"useless": "#000080",
"fillKey": "navy"
},
"WY": {
"month": 8,
"State": "WY",
"useless": "#000080",
"fillKey": "navy"
},
"DE": {
"month": 8,
"State": "DE",
"useless": "#000080",
"fillKey": "navy"
},
"RI": {
"month": 8,
"State": "RI",
"useless": "#000080",
"fillKey": "navy"
},
"NM": {
"month": 8,
"State": "NM",
"useless": "#000080",
"fillKey": "navy"
},
"DC": {
"month": 8,
"State": "DC",
"useless": "#000080",
"fillKey": "navy"
},
"WV": {
"month": 8,
"State": "WV",
"useless": "#000080",
"fillKey": "navy"
},
"SC": {
"month": 8,
"State": "SC",
"useless": "#FFA500",
"fillKey": "orange"
}
},
"9": {
"SD": {
"month": 9,
"State": "SD",
"useless": "#000000",
"fillKey": "black"
},
"ME": {
"month": 9,
"State": "ME",
"useless": "#000000",
"fillKey": "black"
},
"NV": {
"month": 9,
"State": "NV",
"useless": "#000000",
"fillKey": "black"
},
"MT": {
"month": 9,
"State": "MT",
"useless": "#000000",
"fillKey": "black"
},
"WY": {
"month": 9,
"State": "WY",
"useless": "#000000",
"fillKey": "black"
},
"ID": {
"month": 9,
"State": "ID",
"useless": "#000000",
"fillKey": "black"
},
"RI": {
"month": 9,
"State": "RI",
"useless": "#000000",
"fillKey": "black"
},
"HI": {
"month": 9,
"State": "HI",
"useless": "#000000",
"fillKey": "black"
},
"NM": {
"month": 9,
"State": "NM",
"useless": "#000000",
"fillKey": "black"
},
"NH": {
"month": 9,
"State": "NH",
"useless": "#0000CD",
"fillKey": "blue"
},
"AL": {
"month": 9,
"State": "AL",
"useless": "#A52A2A",
"fillKey": "burgundy"
},
"OK": {
"month": 9,
"State": "OK",
"useless": "#A52A2A",
"fillKey": "burgundy"
},
"KY": {
"month": 9,
"State": "KY",
"useless": "#A52A2A",
"fillKey": "burgundy"
},
"TN": {
"month": 9,
"State": "TN",
"useless": "#FF7F50",
"fillKey": "coral"
},
"CA": {
"month": 9,
"State": "CA",
"useless": "#666666",
"fillKey": "grey"
},
"MI": {
"month": 9,
"State": "MI",
"useless": "#666666",
"fillKey": "grey"
},
"NJ": {
"month": 9,
"State": "NJ",
"useless": "#666666",
"fillKey": "grey"
},
"AR": {
"month": 9,
"State": "AR",
"useless": "#666666",
"fillKey": "grey"
},
"TX": {
"month": 9,
"State": "TX",
"useless": "#666666",
"fillKey": "grey"
},
"AZ": {
"month": 9,
"State": "AZ",
"useless": "#666666",
"fillKey": "grey"
},
"KS": {
"month": 9,
"State": "KS",
"useless": "#666666",
"fillKey": "grey"
},
"IL": {
"month": 9,
"State": "IL",
"useless": "#666666",
"fillKey": "grey"
},
"DC": {
"month": 9,
"State": "DC",
"useless": "#666666",
"fillKey": "grey"
},
"MD": {
"month": 9,
"State": "MD",
"useless": "#666666",
"fillKey": "grey"
},
"AK": {
"month": 9,
"State": "AK",
"useless": "#666666",
"fillKey": "grey"
},
"NC": {
"month": 9,
"State": "NC",
"useless": "#666666",
"fillKey": "grey"
},
"SC": {
"month": 9,
"State": "SC",
"useless": "#666666",
"fillKey": "grey"
},
"GA": {
"month": 9,
"State": "GA",
"useless": "#666666",
"fillKey": "grey"
},
"OH": {
"month": 9,
"State": "OH",
"useless": "#666666",
"fillKey": "grey"
},
"NE": {
"month": 9,
"State": "NE",
"useless": "#666666",
"fillKey": "grey"
},
"FL": {
"month": 9,
"State": "FL",
"useless": "#666666",
"fillKey": "grey"
},
"MS": {
"month": 9,
"State": "MS",
"useless": "#666666",
"fillKey": "grey"
},
"OR": {
"month": 9,
"State": "OR",
"useless": "#666666",
"fillKey": "grey"
},
"VA": {
"month": 9,
"State": "VA",
"useless": "#666666",
"fillKey": "grey"
},
"ND": {
"month": 9,
"State": "ND",
"useless": "#666666",
"fillKey": "grey"
},
"IA": {
"month": 9,
"State": "IA",
"useless": "#666666",
"fillKey": "grey"
},
"PA": {
"month": 9,
"State": "PA",
"useless": "#666666",
"fillKey": "grey"
},
"WI": {
"month": 9,
"State": "WI",
"useless": "#666666",
"fillKey": "grey"
},
"NY": {
"month": 9,
"State": "NY",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"WA": {
"month": 9,
"State": "WA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"MN": {
"month": 9,
"State": "MN",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"CO": {
"month": 9,
"State": "CO",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"IN": {
"month": 9,
"State": "IN",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"MA": {
"month": 9,
"State": "MA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"DE": {
"month": 9,
"State": "DE",
"useless": "#000080",
"fillKey": "navy"
},
"UT": {
"month": 9,
"State": "UT",
"useless": "#000080",
"fillKey": "navy"
},
"VT": {
"month": 9,
"State": "VT",
"useless": "#000080",
"fillKey": "navy"
},
"WV": {
"month": 9,
"State": "WV",
"useless": "#000080",
"fillKey": "navy"
},
"MO": {
"month": 9,
"State": "MO",
"useless": "#FFA500",
"fillKey": "orange"
},
"LA": {
"month": 9,
"State": "LA",
"useless": "#FFFFFF",
"fillKey": "white"
}
},
"10": {
"WV": {
"month": 10,
"State": "WV",
"useless": "#000000",
"fillKey": "black"
},
"VT": {
"month": 10,
"State": "VT",
"useless": "#000000",
"fillKey": "black"
},
"ME": {
"month": 10,
"State": "ME",
"useless": "#000000",
"fillKey": "black"
},
"WY": {
"month": 10,
"State": "WY",
"useless": "#000000",
"fillKey": "black"
},
"NM": {
"month": 10,
"State": "NM",
"useless": "#A52A2A",
"fillKey": "burgundy"
},
"AK": {
"month": 10,
"State": "AK",
"useless": "#A52A2A",
"fillKey": "burgundy"
},
"WI": {
"month": 10,
"State": "WI",
"useless": "#FF7F50",
"fillKey": "coral"
},
"IA": {
"month": 10,
"State": "IA",
"useless": "#FF7F50",
"fillKey": "coral"
},
"KS": {
"month": 10,
"State": "KS",
"useless": "#666666",
"fillKey": "grey"
},
"CT": {
"month": 10,
"State": "CT",
"useless": "#666666",
"fillKey": "grey"
},
"AZ": {
"month": 10,
"State": "AZ",
"useless": "#666666",
"fillKey": "grey"
},
"CA": {
"month": 10,
"State": "CA",
"useless": "#666666",
"fillKey": "grey"
},
"NE": {
"month": 10,
"State": "NE",
"useless": "#666666",
"fillKey": "grey"
},
"KY": {
"month": 10,
"State": "KY",
"useless": "#666666",
"fillKey": "grey"
},
"DC": {
"month": 10,
"State": "DC",
"useless": "#666666",
"fillKey": "grey"
},
"OK": {
"month": 10,
"State": "OK",
"useless": "#666666",
"fillKey": "grey"
},
"NC": {
"month": 10,
"State": "NC",
"useless": "#666666",
"fillKey": "grey"
},
"NY": {
"month": 10,
"State": "NY",
"useless": "#666666",
"fillKey": "grey"
},
"ND": {
"month": 10,
"State": "ND",
"useless": "#666666",
"fillKey": "grey"
},
"MS": {
"month": 10,
"State": "MS",
"useless": "#666666",
"fillKey": "grey"
},
"OH": {
"month": 10,
"State": "OH",
"useless": "#666666",
"fillKey": "grey"
},
"MN": {
"month": 10,
"State": "MN",
"useless": "#666666",
"fillKey": "grey"
},
"FL": {
"month": 10,
"State": "FL",
"useless": "#666666",
"fillKey": "grey"
},
"NH": {
"month": 10,
"State": "NH",
"useless": "#666666",
"fillKey": "grey"
},
"SD": {
"month": 10,
"State": "SD",
"useless": "#666666",
"fillKey": "grey"
},
"UT": {
"month": 10,
"State": "UT",
"useless": "#666666",
"fillKey": "grey"
},
"NV": {
"month": 10,
"State": "NV",
"useless": "#666666",
"fillKey": "grey"
},
"CO": {
"month": 10,
"State": "CO",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"AL": {
"month": 10,
"State": "AL",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"PA": {
"month": 10,
"State": "PA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"OR": {
"month": 10,
"State": "OR",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"IN": {
"month": 10,
"State": "IN",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"MI": {
"month": 10,
"State": "MI",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"WA": {
"month": 10,
"State": "WA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"GA": {
"month": 10,
"State": "GA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"MO": {
"month": 10,
"State": "MO",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"TX": {
"month": 10,
"State": "TX",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"TN": {
"month": 10,
"State": "TN",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"NJ": {
"month": 10,
"State": "NJ",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"HI": {
"month": 10,
"State": "HI",
"useless": "#000080",
"fillKey": "navy"
},
"RI": {
"month": 10,
"State": "RI",
"useless": "#000080",
"fillKey": "navy"
},
"DE": {
"month": 10,
"State": "DE",
"useless": "#000080",
"fillKey": "navy"
},
"ID": {
"month": 10,
"State": "ID",
"useless": "#000080",
"fillKey": "navy"
},
"MT": {
"month": 10,
"State": "MT",
"useless": "#000080",
"fillKey": "navy"
},
"VA": {
"month": 10,
"State": "VA",
"useless": "#FFA500",
"fillKey": "orange"
},
"LA": {
"month": 10,
"State": "LA",
"useless": "#FFA500",
"fillKey": "orange"
},
"MD": {
"month": 10,
"State": "MD",
"useless": "#FFA500",
"fillKey": "orange"
}
},
"11": {
"WY": {
"month": 11,
"State": "WY",
"useless": "#000000",
"fillKey": "black"
},
"VT": {
"month": 11,
"State": "VT",
"useless": "#000000",
"fillKey": "black"
},
"MI": {
"month": 11,
"State": "MI",
"useless": "#006400",
"fillKey": "green"
},
"AZ": {
"month": 11,
"State": "AZ",
"useless": "#006400",
"fillKey": "green"
},
"AK": {
"month": 11,
"State": "AK",
"useless": "#666666",
"fillKey": "grey"
},
"MT": {
"month": 11,
"State": "MT",
"useless": "#666666",
"fillKey": "grey"
},
"NC": {
"month": 11,
"State": "NC",
"useless": "#666666",
"fillKey": "grey"
},
"SD": {
"month": 11,
"State": "SD",
"useless": "#666666",
"fillKey": "grey"
},
"ND": {
"month": 11,
"State": "ND",
"useless": "#666666",
"fillKey": "grey"
},
"MS": {
"month": 11,
"State": "MS",
"useless": "#666666",
"fillKey": "grey"
},
"NM": {
"month": 11,
"State": "NM",
"useless": "#666666",
"fillKey": "grey"
},
"IA": {
"month": 11,
"State": "IA",
"useless": "#666666",
"fillKey": "grey"
},
"NV": {
"month": 11,
"State": "NV",
"useless": "#666666",
"fillKey": "grey"
},
"GA": {
"month": 11,
"State": "GA",
"useless": "#666666",
"fillKey": "grey"
},
"KS": {
"month": 11,
"State": "KS",
"useless": "#666666",
"fillKey": "grey"
},
"WI": {
"month": 11,
"State": "WI",
"useless": "#666666",
"fillKey": "grey"
},
"MO": {
"month": 11,
"State": "MO",
"useless": "#666666",
"fillKey": "grey"
},
"NH": {
"month": 11,
"State": "NH",
"useless": "#666666",
"fillKey": "grey"
},
"UT": {
"month": 11,
"State": "UT",
"useless": "#666666",
"fillKey": "grey"
},
"OH": {
"month": 11,
"State": "OH",
"useless": "#666666",
"fillKey": "grey"
},
"MD": {
"month": 11,
"State": "MD",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"WA": {
"month": 11,
"State": "WA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"OR": {
"month": 11,
"State": "OR",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"CT": {
"month": 11,
"State": "CT",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"NJ": {
"month": 11,
"State": "NJ",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"PA": {
"month": 11,
"State": "PA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"TN": {
"month": 11,
"State": "TN",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"MN": {
"month": 11,
"State": "MN",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"OK": {
"month": 11,
"State": "OK",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"TX": {
"month": 11,
"State": "TX",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"HI": {
"month": 11,
"State": "HI",
"useless": "#000080",
"fillKey": "navy"
},
"DE": {
"month": 11,
"State": "DE",
"useless": "#000080",
"fillKey": "navy"
},
"ME": {
"month": 11,
"State": "ME",
"useless": "#000080",
"fillKey": "navy"
},
"DC": {
"month": 11,
"State": "DC",
"useless": "#000080",
"fillKey": "navy"
},
"ID": {
"month": 11,
"State": "ID",
"useless": "#000080",
"fillKey": "navy"
},
"WV": {
"month": 11,
"State": "WV",
"useless": "#000080",
"fillKey": "navy"
},
"RI": {
"month": 11,
"State": "RI",
"useless": "#000080",
"fillKey": "navy"
},
"AL": {
"month": 11,
"State": "AL",
"useless": "#FFA500",
"fillKey": "orange"
},
"MA": {
"month": 11,
"State": "MA",
"useless": "#FFA500",
"fillKey": "orange"
},
"IL": {
"month": 11,
"State": "IL",
"useless": "#FFA500",
"fillKey": "orange"
},
"VA": {
"month": 11,
"State": "VA",
"useless": "#FFA500",
"fillKey": "orange"
},
"FL": {
"month": 11,
"State": "FL",
"useless": "#FFA500",
"fillKey": "orange"
},
"SC": {
"month": 11,
"State": "SC",
"useless": "#FFA500",
"fillKey": "orange"
},
"CO": {
"month": 11,
"State": "CO",
"useless": "#FFA500",
"fillKey": "orange"
},
"CA": {
"month": 11,
"State": "CA",
"useless": "#FFA500",
"fillKey": "orange"
}
},
"12": {
"ME": {
"month": 12,
"State": "ME",
"useless": "#000000",
"fillKey": "black"
},
"AK": {
"month": 12,
"State": "AK",
"useless": "#0000CD",
"fillKey": "blue"
},
"DC": {
"month": 12,
"State": "DC",
"useless": "#1874CD",
"fillKey": "cobalt"
},
"LA": {
"month": 12,
"State": "LA",
"useless": "#006400",
"fillKey": "green"
},
"MD": {
"month": 12,
"State": "MD",
"useless": "#006400",
"fillKey": "green"
},
"NJ": {
"month": 12,
"State": "NJ",
"useless": "#666666",
"fillKey": "grey"
},
"IN": {
"month": 12,
"State": "IN",
"useless": "#666666",
"fillKey": "grey"
},
"MS": {
"month": 12,
"State": "MS",
"useless": "#666666",
"fillKey": "grey"
},
"MA": {
"month": 12,
"State": "MA",
"useless": "#666666",
"fillKey": "grey"
},
"FL": {
"month": 12,
"State": "FL",
"useless": "#666666",
"fillKey": "grey"
},
"KS": {
"month": 12,
"State": "KS",
"useless": "#666666",
"fillKey": "grey"
},
"CT": {
"month": 12,
"State": "CT",
"useless": "#666666",
"fillKey": "grey"
},
"NH": {
"month": 12,
"State": "NH",
"useless": "#666666",
"fillKey": "grey"
},
"GA": {
"month": 12,
"State": "GA",
"useless": "#666666",
"fillKey": "grey"
},
"SD": {
"month": 12,
"State": "SD",
"useless": "#666666",
"fillKey": "grey"
},
"AL": {
"month": 12,
"State": "AL",
"useless": "#666666",
"fillKey": "grey"
},
"ND": {
"month": 12,
"State": "ND",
"useless": "#666666",
"fillKey": "grey"
},
"AR": {
"month": 12,
"State": "AR",
"useless": "#666666",
"fillKey": "grey"
},
"MN": {
"month": 12,
"State": "MN",
"useless": "#666666",
"fillKey": "grey"
},
"NV": {
"month": 12,
"State": "NV",
"useless": "#666666",
"fillKey": "grey"
},
"AZ": {
"month": 12,
"State": "AZ",
"useless": "#666666",
"fillKey": "grey"
},
"WA": {
"month": 12,
"State": "WA",
"useless": "#666666",
"fillKey": "grey"
},
"MO": {
"month": 12,
"State": "MO",
"useless": "#666666",
"fillKey": "grey"
},
"CA": {
"month": 12,
"State": "CA",
"useless": "#666666",
"fillKey": "grey"
},
"SC": {
"month": 12,
"State": "SC",
"useless": "#666666",
"fillKey": "grey"
},
"RI": {
"month": 12,
"State": "RI",
"useless": "#666666",
"fillKey": "grey"
},
"MI": {
"month": 12,
"State": "MI",
"useless": "#666666",
"fillKey": "grey"
},
"OR": {
"month": 12,
"State": "OR",
"useless": "#666666",
"fillKey": "grey"
},
"MT": {
"month": 12,
"State": "MT",
"useless": "#666666",
"fillKey": "grey"
},
"OH": {
"month": 12,
"State": "OH",
"useless": "#666666",
"fillKey": "grey"
},
"OK": {
"month": 12,
"State": "OK",
"useless": "#666666",
"fillKey": "grey"
},
"WY": {
"month": 12,
"State": "WY",
"useless": "#666666",
"fillKey": "grey"
},
"CO": {
"month": 12,
"State": "CO",
"useless": "#666666",
"fillKey": "grey"
},
"WV": {
"month": 12,
"State": "WV",
"useless": "#666666",
"fillKey": "grey"
},
"TN": {
"month": 12,
"State": "TN",
"useless": "#666666",
"fillKey": "grey"
},
"TX": {
"month": 12,
"State": "TX",
"useless": "#666666",
"fillKey": "grey"
},
"IL": {
"month": 12,
"State": "IL",
"useless": "#666666",
"fillKey": "grey"
},
"UT": {
"month": 12,
"State": "UT",
"useless": "#666666",
"fillKey": "grey"
},
"IA": {
"month": 12,
"State": "IA",
"useless": "#D3D3D3",
"fillKey": "light grey"
},
"HI": {
"month": 12,
"State": "HI",
"useless": "#000080",
"fillKey": "navy"
},
"DE": {
"month": 12,
"State": "DE",
"useless": "#000080",
"fillKey": "navy"
},
"ID": {
"month": 12,
"State": "ID",
"useless": "#000080",
"fillKey": "navy"
},
"VT": {
"month": 12,
"State": "VT",
"useless": "#000080",
"fillKey": "navy"
},
"NM": {
"month": 12,
"State": "NM",
"useless": "#000080",
"fillKey": "navy"
},
"NC": {
"month": 12,
"State": "NC",
"useless": "#FFA500",
"fillKey": "orange"
},
"NY": {
"month": 12,
"State": "NY",
"useless": "#FFA500",
"fillKey": "orange"
}
}
}
}
chartParams.element = document.getElementById('chart_1')

var mapchart_1 = new Datamap(chartParams);



// draw a bubble map if specified
// if (chartParams.bubbles) {
//   var bubbles = chartParams.bubbles
//   mapchart_1.bubbles(bubbles)
// }

if (chartParams.labels){
// mapchart_1.labels()
}

if (chartParams.legend){
// mapchart_1.legend()
}

setProjection = function( element, options ) {
var projection, path;

  projection = d3.geo.albersUsa()
    .scale(element.offsetWidth)
    .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

path = d3.geo.path()
  .projection( projection );

return {path: path, projection: projection};
}

var num2month = {};
num2month[1] = 'January';
num2month[2] = 'February';
num2month[3] = 'March';
num2month[4] = 'April';
num2month[5] = 'May';
num2month[6] = 'June';
num2month[7] = 'July';
num2month[8] = 'August';
num2month[9] = 'September';
num2month[10] = 'October';
num2month[11] = 'November';
num2month[12] = 'December';

var slide = document.getElementById('slider'),
sliderSpan = document.getElementById("show-month");

slide.onmousemove = function() {
sliderSpan.innerHTML = num2month[this.value];
}

slide.oninput = function() {
sliderSpan.innerHTML = num2month[this.value];
}

slide.onchange = function() {
sliderSpan.innerHTML = num2month[this.value];
}

window.onload = function() {
sliderSpan.innerHTML = 'January';
}

convert = function(element) {
var month;
month = num2month[element];
return month
}

</script>

<style>
.datamaps {
position: relative;
}
</style>

<script></script>


The interactive map shows all the states in the US. Use the slider to pan through the months from January to December to see the most dominant color of each state. There are a few interesting patterns that we spotted:

- There is a very sharp color change from light gray to gray between July and August. This may be due to our clients anticipation of the upcoming Fall and Winter seasons.  

- Green is a very popular color in many states in March while orange is very trendy in November!

Explore the data and see what interesting trends you may find. Note, the colors here only represent blouses, tees, sweaters and other tops.
