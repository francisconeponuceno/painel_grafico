
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
"Arimatéia": Number(cubArimateia.innerHTML),
"Fabio": Number(cubFabio.innerHTML),
"Zé carlos": Number(cubZecarlos.innerHTML),
"Cazé": Number(cubCaze.innerHTML),
"Kassio": Number(cubKassio.innerHTML),
"Vicente": Number(cubVicente.innerHTML),
"Fernando": Number(cubFernando.innerHTML),
"Raione": Number(cubRaione.innerHTML),
"Lucas": Number(cubLucas.innerHTML)
*/


// GRAFICO 2
am4core.ready(function() {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  var chart = am4core.create("chartdiv2", am4charts.XYChart);
  chart.padding(5, 15, 0, 0);
  
  var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.dataFields.category = "network";
  categoryAxis.renderer.minGridDistance = 1;
  categoryAxis.renderer.inversed = true;
  categoryAxis.renderer.grid.template.disabled = true;
  
  var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
  valueAxis.min = 0;
  
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.categoryY = "network";
  series.dataFields.valueX = "MAU";
  series.tooltipText = "{valueX.value}"
  series.columns.template.strokeOpacity = 0;
  series.columns.template.column.cornerRadiusBottomRight = 0;
  series.columns.template.column.cornerRadiusTopRight = 0;
  series.columns.template.propertyFields.fill = "color"; // Associa a cor definida no objeto de dados
  
  var labelBullet = series.bullets.push(new am4charts.LabelBullet())
  labelBullet.label.horizontalCenter = "left";
  labelBullet.label.dx = 10;
  labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
  labelBullet.locationX = 1;
  
  // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
  //series.columns.template.adapter.add("fill", function(fill, target){
    //return chart.colors.getIndex(target.dataItem.index);
  //});
  
  categoryAxis.sortBySeries = series;
  chart.data = [
      {
        "network": "Arimatéia",
        "MAU": Number(cubArimateia.innerHTML),
        "color": am4core.color("#0000ff") // AZUL
      },
      {
        "network": "Fabio",
        "MAU": Number(cubFabio.innerHTML),
        "color": am4core.color("#ff0000") // VERMELHO
      },
      {
        "network": "Zé carlos",
        "MAU": Number(cubZecarlos.innerHTML),
        "color": am4core.color("#0000ff") // AZUL
      },
      {
        "network": "Cazé",
        "MAU": Number(cubCaze.innerHTML),
        "color": am4core.color("#ff0000") // VERMELHO
      },
      {
        "network": "Kassio",
        "MAU": Number(cubKassio.innerHTML),
        "color": am4core.color("#0000ff") // AZUL
      },
      {
        "network": "Vicente",
        "MAU": Number(cubVicente.innerHTML),
        "color": am4core.color("#ff0000") // VERMELHO
      },
      {
        "network": "Fernando",
        "MAU": Number(cubFernando.innerHTML),
        "color": am4core.color("#0000ff") // AZUL
      },
      {
        "network": "Raione",
        "MAU": Number(cubRaione.innerHTML),
        "color": am4core.color("#ff0000") // VERMELHO
      },
      {
        "network": "Lucas",
        "MAU": Number(cubLucas.innerHTML),
        "color": am4core.color("#0000ff") // AZUL
      }
    ]
  
  }); // end am4core.ready()



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