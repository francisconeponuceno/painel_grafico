
let cubArimateia = document.getElementById('cubArimateia');
let cubFabio = document.getElementById('cubFabio');
let cubVicente = document.getElementById('cubVicente');
let cubCaze = document.getElementById('cubCaze');
let cubKassio = document.getElementById('cubKassio');
let cubZecarlos = document.getElementById('cubZecarlos');
let cubFernando = document.getElementById('cubFernando');
let cubRaione = document.getElementById('cubRaione');
let cubLucas = document.getElementById('cubLucas');
let porcentoTerceiro = document.getElementById('porcentoTerceiro');
let porcentoClaudino = document.getElementById('porcentoClaudino');
let porcentoEscoamento = document.getElementById('porcentoEscoamento');
let Cladino_Escoamento = Number(porcentoClaudino.innerHTML) + Number(porcentoEscoamento.innerHTML)


let jan = document.getElementById('jan').innerHTML;
let fev = document.getElementById('fev').innerHTML;
let mar = document.getElementById('mar').innerHTML;
let abr = document.getElementById('abr').innerHTML;
let mai = document.getElementById('mai').innerHTML;
let jun = document.getElementById('jun').innerHTML;
let jul = document.getElementById('jul').innerHTML;
let ago = document.getElementById('ago').innerHTML;
let set = document.getElementById('set').innerHTML;
let out = document.getElementById('out').innerHTML;
let nov = document.getElementById('nov').innerHTML;
let dez = document.getElementById('dez').innerHTML;


// PRIMEIRO GRAFICO

am4core.useTheme(am4themes_animated);

// Criar o gráfico de rosca
var chart = am4core.create("chartdiv3", am4charts.PieChart);

// Definir a propriedade innerRadius para transformar o gráfico de pizza em um gráfico de rosca
chart.innerRadius = am4core.percent(40);

// Adicionar dados
chart.data = [{
  "category": "Terceiro",
  "value": Number(porcentoTerceiro.innerHTML),
  "color": am4core.color("#ff0000") // Vermelho
}, {
  "category": "Claudino",
  "value": Number(porcentoClaudino.innerHTML),
  "color": am4core.color("#0000ff") // 
}, {
  "category": "Escoamento",
  "value": Number(porcentoEscoamento.innerHTML),
  "color": am4core.color("#4881fce6") //
}, {
  "category": "Esco + clau",
  "value": Number(Cladino_Escoamento),
  "color": am4core.color("#fdb3b3") // 
}];

// Criar série de rosca
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "value";
pieSeries.dataFields.category = "category";

// Definir cor de cada fatia
pieSeries.slices.template.propertyFields.fill = "color";

// Adicionar rótulo para mostrar valor real
pieSeries.slices.template.adapter.add("tooltipText", function(text, target) {
  return "[bold]{category}[/]\nValor: {value}";
});

// Adicionar rótulo dentro das fatias para mostrar valor real
pieSeries.labels.template.adapter.add("text", function(text, target) {
  return "{category}  "+"{value}%";
});

/*
let ctx = document.getElementById('grafico1');
let data = {
  labels: ['T', 'C', 'E','C + E' ],
  datasets: [{
    label: "%",
    backgroundColor: ['#ff0000', '#0000ff', '#4881fce6','#fdb3b3'],
    data: [Number(porcentoTerceiro.innerHTML), Number(porcentoClaudino.innerHTML),
          Number(porcentoEscoamento.innerHTML), Number(Cladino_Escoamento)],
  }]
};

let options = {
  maintainAspectRatio: false,
  
};

new Chart('chart', {
  type: 'doughnut',
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        
      },
      title: {
        display: false,
        text: 'Cubagem Diária'
      }
    }
  },
  data: data
});

*/
// GRAFICO 2
am5.ready(function() {

  // Data labels: 
  var allData = {
    "2002": {
      "Arimatéia": Number(cubArimateia.innerHTML),
      "Fabio": Number(cubFabio.innerHTML),
      "Zé carlos": Number(cubZecarlos.innerHTML),
      "Cazé": Number(cubCaze.innerHTML),
      "Kassio": Number(cubKassio.innerHTML),
      "Vicente": Number(cubVicente.innerHTML),
      "Fernando": Number(cubFernando.innerHTML),
      "Raione": Number(cubRaione.innerHTML),
      "Lucas": Number(cubLucas.innerHTML)
    }
  };
  
  
  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("chartdiv2");
  
  root.numberFormatter.setAll({
    numberFormat: "#a",
  
    // Group only into M (millions), and B (billions)
    bigNumberPrefixes: [
      { number: 1e6, suffix: "M" },
      { number: 1e9, suffix: "B" }
    ],
  
    // Do not use small number prefixes at all
    smallNumberPrefixes: []
  });
  
  var stepDuration = 2000;
  
  
  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([am5themes_Animated.new(root)]);
  
  
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelX: "none",
    wheelY: "none",
    paddingLeft: 0
  }));
  
  
  // We don't want zoom-out button to appear while animating, so we hide it at all
  chart.zoomOutButton.set("forceHidden", true);
  
  
  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var yRenderer = am5xy.AxisRendererY.new(root, {
    minGridDistance: 15,
    inversed: true,
    minorGridEnabled: true
  });
  // hide grid
  yRenderer.grid.template.set("visible", false);
  
  var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
    maxDeviation: 0,
    categoryField: "network",
    renderer: yRenderer
  }));
  
  var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
    maxDeviation: 0,
    min: 0,
    strictMinMax: true,
    extraMax: 0.1,
    renderer: am5xy.AxisRendererX.new(root, {})
  }));
  
  xAxis.set("interpolationDuration", stepDuration / 10);
  xAxis.set("interpolationEasing", am5.ease.linear);
  
  
  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueXField: "value",
    categoryYField: "network"
  }));
  
  // Rounded corners for columns
  series.columns.template.setAll({ cornerRadiusBR: 0, cornerRadiusTR: 0 });
  
  // Make each column to be of a different color
  series.columns.template.adapters.add("fill", function (fill, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });
  
  series.columns.template.adapters.add("stroke", function (stroke, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });
  
  // Add label bullet
  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationX: 1,
      sprite: am5.Label.new(root, {
        text: "{valueXWorking.formatNumber('#.# a')}",
        fill: root.interfaceColors.get("alternativeText"),
        centerX: am5.p100,
        centerY: am5.p50,
        populateText: true
      })
    });
  });
  
  var label = chart.plotContainer.children.push(am5.Label.new(root, {
    text: "",
    fontSize: "8em",
    opacity: 0.2,
    x: am5.p100,
    y: am5.p100,
    centerY: am5.p100,
    centerX: am5.p100
  }));
  
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
    // sort by value
    series.dataItems.sort(function (x, y) {
      return y.get("valueX") - x.get("valueX"); // descending
      //return x.get("valueX") - y.get("valueX"); // ascending
    });
  
    // go through each axis item
    am5.array.each(yAxis.dataItems, function (dataItem) {
      // get corresponding series item
      var seriesDataItem = getSeriesItem(dataItem.get("category"));
  
      if (seriesDataItem) {
        // get index of series data item
        var index = series.dataItems.indexOf(seriesDataItem);
        // calculate delta position
        var deltaPosition =
          (index - dataItem.get("index", 0)) / series.dataItems.length;
        // set index to be the same as series data item index
        if (dataItem.get("index") != index) {
          dataItem.set("index", index);
          // set deltaPosition instanlty
          dataItem.set("deltaPosition", -deltaPosition);
          // animate delta position to 0
          dataItem.animate({
            key: "deltaPosition",
            to: 0,
            duration: stepDuration / 2,
            easing: am5.ease.out(am5.ease.cubic)
          });
        }
      }
    });
    // sort axis items by index.
    // This changes the order instantly, but as deltaPosition is set, they keep in the same places and then animate to true positions.
    yAxis.dataItems.sort(function (x, y) {
      return x.get("index") - y.get("index");
    });
  }
  
  var year = 2002;
  
  // update data with values each 1.5 sec
  var interval = setInterval(function () {
    year++;
  
    if (year > 2018) {
      clearInterval(interval);
      clearInterval(sortInterval);
    }
  
    updateData();
  }, stepDuration);
  
  var sortInterval = setInterval(function () {
    sortCategoryAxis();
  }, 100);
  
  function setInitialData() {
    var d = allData[year];
  
    for (var n in d) {
      series.data.push({ network: n, value: d[n] });
      yAxis.data.push({ network: n });
    }
  }
  
  function updateData() {
    var itemsWithNonZero = 0;
  
    if (allData[year]) {
      label.set("text", year.toString());
  
      am5.array.each(series.dataItems, function (dataItem) {
        var category = dataItem.get("categoryY");
        var value = allData[year][category];
  
        if (value > 0) {
          itemsWithNonZero++;
        }
  
        dataItem.animate({
          key: "valueX",
          to: value,
          duration: stepDuration,
          easing: am5.ease.linear
        });
        dataItem.animate({
          key: "valueXWorking",
          to: value,
          duration: stepDuration,
          easing: am5.ease.linear
        });
      });
  
      yAxis.zoom(0, itemsWithNonZero / yAxis.dataItems.length);
    }
  }
  
  setInitialData();
  setTimeout(function () {
    year++;
    updateData();
  }, 50);
  
  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear(1000);
  chart.appear(1000, 100);
  
  }); // end am5.ready()


// GRAFICO 3
am5.ready(function() { 


  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("chartdiv");
  
  
  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
    am5themes_Animated.new(root)
  ]);
  
  
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelX: "none",
    wheelY: "none",
    paddingLeft: 0
  }));
  
  // We don't want zoom-out button to appear while animating, so we hide it
  chart.zoomOutButton.set("forceHidden", true);
  
  
  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var xRenderer = am5xy.AxisRendererX.new(root, {
    minGridDistance: 25,
    minorGridEnabled: true
  });
  xRenderer.labels.template.setAll({
    rotation: -90,
    centerY: am5.p50,
    centerX: 0,
    paddingRight: 15
  });
  xRenderer.grid.template.set("visible", false);
  
  var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.3,
    categoryField: "country",
    renderer: xRenderer
  }));
  
  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    maxDeviation: 0.3,
    min: 0,
    renderer: am5xy.AxisRendererY.new(root, {})
  }));
  
  
  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: "Series 1",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "country"
  }));
  
  // Rounded corners for columns
  series.columns.template.setAll({
    cornerRadiusTL: 0,
    cornerRadiusTR: 0,
    strokeOpacity: 0
  });
  
  // Make each column to be of a different color
  //series.columns.template.fill.am5core.color("#67B7DC"); // Cor das colunas
  series.columns.template.adapters.add("fill", function (fill, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
    
  });
  
  series.columns.template.adapters.add("stroke", function (stroke, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });
  
  // Add Label bullet
  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationY: 1,
      sprite: am5.Label.new(root, {
        text: "{valueYWorking.formatNumber('#.')}",
        fill: root.interfaceColors.get("alternativeText"),
        centerY: 8,
        centerX: am5.p50,
        populateText: true
      })
    });
  });
  
  
  // Set data 
  var data = [{
    "country": "Jan",
    "value": 80 //Number(jan)
  }, {
    "country": "Fev",
    "value": 80 //Number(fev)
  }, {
    "country": "Mar",
    "value": 80 //Number(mar)
  }, {
    "country": "Abr",
    "value": 80 //Number(abr)
  }, {
    "country": "Mai",
    "value": 80 //Number(mai)
  }, {
    "country": "Jun",
    "value": 80 //Number(jun)
  }, {
    "country": "Jul",
    "value": 80 //Number(jul)
  }, {
    "country": "Ago",
    "value": 80 //Number(ago)
  }, {
    "country": "Set",
    "value": 80 //Number(set)
  }, {
    "country": "Out",
    "value": 80 //Number(out)
  }, {
    "country": "Nov",
    "value": 80 //Number(nov)
  }, {
    "country": "Dez",
    "value": 80 //Number(dez)
  }];
  

  xAxis.data.setAll(data);
  series.data.setAll(data);
  
  // update data with random values each 1.5 sec
  setInterval(function () {
    updateData();
  }, 1500)
  
/*
  function updateData() {
    am5.array.each(series.dataItems, function (dataItem) {
      var value = dataItem.get("valueY") + Math.round(Math.random() * 300 - 150);
      if (value < 0) {
        value = 10;
      }
      // both valueY and workingValueY should be changed, we only animate workingValueY
      dataItem.set("valueY", value);
      dataItem.animate({
        key: "valueYWorking",
        to: value,
        duration: 600,
        easing: am5.ease.out(am5.ease.cubic)
      });
    })
  
    sortCategoryAxis();
  }
  
  */
  // Get series item by category
  function getSeriesItem(category) {
    for (var i = 0; i < series.dataItems.length; i++) {
      var dataItem = series.dataItems[i];
      if (dataItem.get("categoryX") == category) {
        return dataItem;
      }
    }
  }
  
  
  // Axis sorting
  function sortCategoryAxis() {
  
    // Sort by value
    series.dataItems.sort(function (x, y) {
      return y.get("valueY") - x.get("valueY"); // descending
      //return y.get("valueY") - x.get("valueY"); // ascending
    })
  
    // Go through each axis item
    am5.array.each(xAxis.dataItems, function (dataItem) {
      // get corresponding series item
      var seriesDataItem = getSeriesItem(dataItem.get("category"));
  
      if (seriesDataItem) {
        // get index of series data item
        var index = series.dataItems.indexOf(seriesDataItem);
        // calculate delta position
        var deltaPosition = (index - dataItem.get("index", 0)) / series.dataItems.length;
        // set index to be the same as series data item index
        dataItem.set("index", index);
        // set deltaPosition instanlty
        dataItem.set("deltaPosition", -deltaPosition);
        // animate delta position to 0
        dataItem.animate({
          key: "deltaPosition",
          to: 0,
          duration: 1000,
          easing: am5.ease.out(am5.ease.cubic)
        })
      }
    });
  
    // Sort axis items by index.
    // This changes the order instantly, but as deltaPosition is set,
    // they keep in the same places and then animate to true positions.
    xAxis.dataItems.sort(function (x, y) {
      return x.get("index") - y.get("index");
    });
  }
  
  
  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear(1000);
  chart.appear(1000, 100);
  

  }); // end am5.ready()