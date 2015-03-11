d3.csv("data/data.csv", function(csv){
    var data = csv.map(function(d){
        return {
            x: +d.x, 
            y: +d.y,
            radius: +d.r,
            category: +d.c, 
            text: d.t
        };
    });

    MG.data_graphic({
        data: data,
        target: "#graphic",
        chart_type: "point",
        width: 500,
        height: 500,
        x_accessor: "x",
        y_accessor: "y",
        size_range: [1,10],
        size_accessor: "radius",
        color_accessor: "category",
        show_rollover_text: false,
        x_axis: false,
        y_axis: false,
        color_domain: ['0', '1', '2', '3', '4', '5'],
        color_range: ['#FF8B00', '#717171', '#DB00E5',
                      '#00E526', '#FD005A', '#009785'],
        mouseover: function(d, i) {
            d3.select('#graphic svg .mg-active-datapoint')
                .text(data[i].text);
        }
    });
});
