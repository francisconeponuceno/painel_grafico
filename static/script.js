
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
    paddingLeft: 5,
    paddingBottom: 0,
    paddingTop: 3
    
  }));
  
  
  // We don't want zoom-out button to appear while animating, so we hide it at all
  chart.zoomOutButton.set("forceHidden", true);
  
  
  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var yRenderer = am5xy.AxisRendererY.new(root, {
    minGridDistance: 10,
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
am4core.ready(function() {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  var chart = am4core.create("chartdiv", am4charts.XYChart);
  
  chart.data = [{
   "country": "Jan",
   "visits": 500,
   "color": am4core.color("#0000ff") // AZUL
  }, {
   "country": "Fev",
   "visits": 80,
   "color": am4core.color("#ff0000") // VERMELHO
  }, {
   "country": "Mar",
   "visits": 80,
   "color": am4core.color("#0000ff") // AZUL
  }, {
   "country": "Abr",
   "visits": 80,
   "color": am4core.color("#ff0000") // VERMELHO
  }, {
   "country": "Mai",
   "visits": 80,
   "color": am4core.color("#0000ff") // AZUL
  }, {
   "country": "Jun",
   "visits": 80,
   "color": am4core.color("#ff0000") // VERMELHO
  }, {
   "country": "Jul",
   "visits": 80,
   "color": am4core.color("#0000ff") // AZUL
  }, {
   "country": "Ago",
   "visits": 711,
   "color": am4core.color("#ff0000") // VERMELHO
  }, {
   "country": "Set",
   "visits": 665,
   "color": am4core.color("#0000ff") // AZUL
  }, {
   "country": "Out",
   "visits": 580,
   "color": am4core.color("#ff0000") // VERMELHO
  }, {
   "country": "Nov",
   "visits": 443,
   "color": am4core.color("#0000ff") // AZUL
  }, {
   "country": "Dez",
   "visits": 441,
   "color": am4core.color("#ff0000") // VERMELHO
  }];
  
  chart.padding(5, 5, 5, 5);
  
  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.dataFields.category = "country";
  categoryAxis.renderer.minGridDistance = 20;
  categoryAxis.renderer.inversed = false;
  categoryAxis.renderer.grid.template.disabled = true;
  
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.min = 0;
  valueAxis.extraMax = 0.1;
  //valueAxis.rangeChangeEasing = am4core.ease.linear;
  //valueAxis.rangeChangeDuration = 1500;
  
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.categoryX = "country";
  series.dataFields.valueY = "visits";
  series.tooltipText = "{valueY.value}"
  series.columns.template.strokeOpacity = 0;
  series.columns.template.column.cornerRadiusTopRight = 0;
  series.columns.template.column.cornerRadiusTopLeft = 0;
  series.columns.template.propertyFields.fill = "color"; // Associa a cor definida no objeto de dados
  
  //series.interpolationDuration = 1500;
  //series.interpolationEasing = am4core.ease.linear;
  var labelBullet = series.bullets.push(new am4charts.LabelBullet());
  labelBullet.label.verticalCenter = "bottom";
  labelBullet.label.dy = -0;
  labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";
  chart.zoomOutButton.disabled = true;
  
  
  //setInterval(function () {
    //am4core.array.each(chart.data, function (item) {
      //item.visits += Math.round(Math.random() * 200 - 100);
      //item.visits = Math.abs(item.visits);
    //})
    //chart.invalidateRawData();
   //}, 2000)
  
  //categoryAxis.sortBySeries = series;
  
  }); // end am4core.ready()