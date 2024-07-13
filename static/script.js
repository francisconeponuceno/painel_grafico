

 

 
am5.ready(function() {


// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


var myTheme = am5.Theme.new(root);

myTheme.rule("Grid", ["base"]).setAll({
    strokeOpacity: 0.1
});


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
    am5themes_Animated.new(root),
    myTheme
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
    am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "none",
    wheelY: "none",
    paddingLeft: 0
    })
);


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yRenderer = am5xy.AxisRendererY.new(root, {
    minGridDistance: 30,
    minorGridEnabled: true
});
yRenderer.grid.template.set("location", 1);

var yAxis = chart.yAxes.push(
    am5xy.CategoryAxis.new(root, {
    maxDeviation: 0,
    categoryField: "country",
    renderer: yRenderer
    })
);

var xAxis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
    maxDeviation: 0,
    min: 0,
    renderer: am5xy.AxisRendererX.new(root, {
        visible: true,
        strokeOpacity: 0.1,
        minGridDistance: 60
    })
    })
);


// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
    name: "Series 1",
    xAxis: xAxis,
    yAxis: yAxis,
    valueXField: "value",
    sequencedInterpolation: true,
    categoryYField: "country"
    })
);

var columnTemplate = series.columns.template;

columnTemplate.setAll({
    draggable: true,
    cursorOverStyle: "pointer",
    tooltipText: "porcentagem",
    cornerRadiusBR: 3,
    cornerRadiusTR: 3,
    maxHeight: 30,
    strokeOpacity: 0
});
columnTemplate.adapters.add("fill", (fill, target) => {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
});

columnTemplate.adapters.add("stroke", (stroke, target) => {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
});

columnTemplate.events.on("dragstop", () => {
    sortCategoryAxis();
});

// Get series item by category
function getSeriesItem(category) {
    for (var i = 0; i < series.dataItems.length; i++) {
    var dataItem = series.dataItems[i];
    if (dataItem.get("categoryY") == category) {
        return dataItem;
    }
    }
}


// Axis sorting
function sortCategoryAxis() {
    // Sort by value
    series.dataItems.sort(function (x, y) {
    return y.get("graphics").y() - x.get("graphics").y();
    });

    var easing = am5.ease.out(am5.ease.cubic);

    // Go through each axis item
    am5.array.each(yAxis.dataItems, function (dataItem) {
    // get corresponding series item
    var seriesDataItem = getSeriesItem(dataItem.get("category"));

    if (seriesDataItem) {
        // get index of series data item
        var index = series.dataItems.indexOf(seriesDataItem);

        var column = seriesDataItem.get("graphics");

        // position after sorting
        var fy =
        yRenderer.positionToCoordinate(yAxis.indexToPosition(index)) -
        column.height() / 2;

        // set index to be the same as series data item index
        if (index != dataItem.get("index")) {
        dataItem.set("index", index);

        // current position
        var x = column.x();
        var y = column.y();

        column.set("dy", -(fy - y));
        column.set("dx", x);

        column.animate({ key: "dy", to: 0, duration: 600, easing: easing });
        column.animate({ key: "dx", to: 0, duration: 600, easing: easing });
        } else {
        column.animate({ key: "y", to: fy, duration: 600, easing: easing });
        column.animate({ key: "x", to: 0, duration: 600, easing: easing });
        }
    }
    });

    // Sort axis items by index.
    // This changes the order instantly, but as dx and dy is set and animated,
    // they keep in the same places and then animate to true positions.
    yAxis.dataItems.sort(function (x, y) {
    return x.get("index") - y.get("index");
    });
}

// Set data
var data = [{
    country: "TERCEIRO",
    value: 60
}, {
    country: "CLAUDINO",
    value: 50
}, {
    country: "ESCOAMENTO",
    value: 30

}];

yAxis.data.setAll(data);
series.data.setAll(data);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);

}); // end am5.ready()
  
 


// SEGUNDO GRAFICO
am5.ready(function() {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv2");
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "none",
      wheelY: "none",
      paddingLeft: 0
    }));
    
    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xRenderer = am5xy.AxisRendererX.new(root, { 
      minGridDistance: 30,
      minorGridEnabled: true
     });
    
    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0,
      categoryField: "name",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    }));
    
    xRenderer.grid.template.set("visible", false);
    
    var yRenderer = am5xy.AxisRendererY.new(root, {});
    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0,
      min: 0,
      extraMax: 0.1,
      renderer: yRenderer
    }));
    
    yRenderer.grid.template.setAll({
      strokeDasharray: [2, 2]
    });
    
    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      sequencedInterpolation: true,
      categoryXField: "name",
      tooltip: am5.Tooltip.new(root, { dy: -25, labelText: "{valueY}" })
    }));
    
    
    series.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      maxWidth: 40,
      strokeOpacity: 0
    });
    
    series.columns.template.adapters.add("fill", (fill, target) => {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });
    
    series.columns.template.adapters.add("stroke", (stroke, target) => {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });
    
    // Set data
    var data = [
      {
        name: "Arimatéia",
        value: 160,
        bulletSettings: { src: "/static/images.jpg" }
      },
      {
        name: "Fabio",
        value: 80,
        bulletSettings: { src: "/static/images.jpg" }
      },
      {
        name: "Zé carlos",
        value: 120,
        bulletSettings: { src: "/static/images.jpg" }
      },
      {
        name: "Cazé",
        value: 90,
        bulletSettings: { src: "/static/images.jpg" }
      },
      {
        name: "Kassio",
        value: 140,
        bulletSettings: { src: "/static/images.jpg" }
      },
      {
        name: "Vicente",
        value: 128,
        bulletSettings: { src: "/static/images.jpg" }
      }
      
    ];
    
    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: am5.Picture.new(root, {
          templateField: "bulletSettings",
          width: 50,
          height: 50,
          cornerRadiusTR: 5,
          centerX: am5.p50,
          centerY: am5.p50,
          shadowColor: am5.color(0x000000),
          shadowBlur: 4,
          shadowOffsetX: 4,
          shadowOffsetY: 4,
          shadowOpacity: 0.6
        })
      });
    });
    
    xAxis.data.setAll(data);
    series.data.setAll(data);
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
    
    }); // end am5.ready()