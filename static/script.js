
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


// SEGUNDO GRAFICO
let ctx2 = document.getElementById('grafico2');
new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Desembro'],
    datasets: [{
      label: 'Cubagem por mês',
      
      data: [jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez],
      backgroundColor: ['#0000ff','#ff0000']
      
    }]
  },
  options: {
    layout : {
      width : 100
      
    }
    
  }
});


// TERCEIRO GRAFICO
/*
let ctx3 = document.getElementById('grafico3');
new Chart(ctx3, {
  type: 'bar',
  data: {
    labels: ['Arimatéia', 'Fabio', 'Zé carlos','Cazé','Kassio','Vicente','Fernando','Raione','Lucas'],
    datasets: [{
      label: 'Cubagem por conferente',
      
      data: [Number(cubArimateia.innerHTML),Number(cubFabio.innerHTML),Number(cubZecarlos.innerHTML),
            Number(cubCaze.innerHTML),Number(cubKassio.innerHTML),Number(cubVicente.innerHTML),
            Number(cubFernando.innerHTML),Number(cubRaione.innerHTML),Number(cubLucas.innerHTML)],
      backgroundColor: ['#0000ff','#ff0000']
      
    }]
  },
  options: {
    layout : {
      width : 100
    }

  }
});

*/
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
    minGridDistance: 30,
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
    cornerRadiusTL: 5,
    cornerRadiusTR: 5,
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
        centerY: 0,
        centerX: am5.p50,
        populateText: true
      })
    });
  });
  
  
  // Set data
  var data = [{
    "country": "Jan",
    "value": 70
  }, {
    "country": "Fev",
    "value": 80
  }, {
    "country": "Mar",
    "value": 80
  }, {
    "country": "Abr",
    "value": 80
  }, {
    "country": "Mai",
    "value": 80
  }, {
    "country": "Jun",
    "value": 80
  }, {
    "country": "Jul",
    "value": 80
  }, {
    "country": "Ago",
    "value": 80
  }, {
    "country": "Set",
    "value": 80
  }, {
    "country": "Out",
    "value": 80
  }, {
    "country": "Nov",
    "value": 80
  }, {
    "country": "Dez",
    "value": 80
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