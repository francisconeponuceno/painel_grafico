
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

//FUNÇÃO PARA OS INPUTs
const adicionar = document.getElementById('adicionar');
const remover = document.getElementById('remover');
const btn_remover = document.getElementById('btn_remover');
const btn_adicionar = document.getElementById('btn_adicionar');

const adicionar_carrego = (event) => {
  if (adicionar.className == "fechar") {
    adicionar.classList.remove("fechar")
    adicionar.classList.add("exibir")
    return
  } 
  if (adicionar.classList == "exibir"){
    adicionar.classList.remove("exibir")
    adicionar.classList.add("fechar")
  }

}

const remover_carrego = (event) => {
  if (remover.className == "fechar") {
    remover.classList.remove("fechar")
    remover.classList.add("exibir")
    return
  }
  if (remover.classList == "exibir") {
    remover.classList.remove("exibir")
    remover.classList.add("fechar")
  }

}

btn_remover.addEventListener('click',remover_carrego);
btn_adicionar.addEventListener('click', adicionar_carrego);


// PRIMEIRO GRAFICO
am4core.useTheme(am4themes_animated);

// Criar o gráfico de rosca
var chart = am4core.create("chartdiv3", am4charts.PieChart);

// Adicionar dados
chart.data = [{
  "category": "Terceiro",
  "value": Number(porcentoTerceiro.innerHTML),
  "color": am4core.color("#ff0000") // Vermelho
}, {
  "category": "Claudino",
  "value": Number(porcentoClaudino.innerHTML),
  "color": am4core.color("#0000ff") // AZUL
}, {
  "category": "Escoamento",
  "value": Number(porcentoEscoamento.innerHTML),
  "color": am4core.color("#fdb3b3") //  VERMELHO CLARO
}, {
  "category": "Esco + clau",
  "value": Number(Cladino_Escoamento),
  "color": am4core.color("#96dbfc") // AZUL CLARO
}];



// Criar série de rosca
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "value";
pieSeries.dataFields.category = "category";

// Definir a propriedade innerRadius para transformar o gráfico de pizza em um gráfico de rosca
pieSeries.innerRadius = am4core.percent(70);

// Definir cor de cada fatia
pieSeries.slices.template.propertyFields.fill = "color";


// Adiciona uma animação ao carregar o gráfico
pieSeries.hiddenState.properties.startAngle = -50;
pieSeries.hiddenState.properties.endAngle = 0;

// Adicionar rótulo para mostrar valor real
pieSeries.slices.template.adapter.add("tooltipText", function(text, target) {
  return "[bold]{category}[/]\nValor: {value}";
});

// Adicionar rótulo dentro das fatias para mostrar valor real
pieSeries.labels.template.adapter.add("text", function(text, target) {
  return "{category}  "+"{value}%";
});


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
  
  
  var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
  valueAxis.min = 0;
  valueAxis.renderer.labels.template.disabled = true;
  categoryAxis.renderer.grid.template.disabled = true;
  valueAxis.renderer.grid.template.disabled = true;


  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.categoryY = "network";
  series.dataFields.valueX = "MAU";
  series.tooltipText = "{valueX.value}"
  series.columns.template.strokeOpacity = 0;
  series.columns.template.column.cornerRadiusBottomRight = 0;
  series.columns.template.column.cornerRadiusTopRight = 0;
  series.columns.template.propertyFields.fill = "color"; // Associa a cor definida no objeto de dados (cor da barra)
  
  var labelBullet = series.bullets.push(new am4charts.LabelBullet())
  labelBullet.label.horizontalCenter = "left";
  labelBullet.label.dx = 5;
  labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.as')}";
  labelBullet.locationX = 1;
  labelBullet.label.fill = am4core.color("#ffffff"); // Alterar para a cor desejada (cor da fonte)
  
  categoryAxis.sortBySeries = series;
  chart.data = [
      {
        "network": "Arimatéia",
        "MAU": Number(cubArimateia.innerHTML),
        "color": am4core.color("#ff0000") // VERMELHO
      },
      {
        "network": "Fabio",
        "MAU": Number(cubFabio.innerHTML),
        "color": am4core.color("#ff0000") // VERMELHO
      },
      {
        "network": "Zé carlos",
        "MAU": Number(cubZecarlos.innerHTML),
        "color": am4core.color("#ff0000") // VERMELHO
      },
      {
        "network": "Cazé",
        "MAU": Number(cubCaze.innerHTML),
        "color": am4core.color("#ff0000") // VERMELHO
      },
      {
        "network": "Kassio",
        "MAU": Number(cubKassio.innerHTML),
        "color": am4core.color("#ff0000") // VERMELHO
      },
      {
        "network": "Vicente",
        "MAU": Number(cubVicente.innerHTML),
        "color": am4core.color("#ff0000") // VERMELHO
      },
      {
        "network": "Fernando",
        "MAU": Number(cubFernando.innerHTML),
        "color": am4core.color("#ff0000") // VERMELHO
      },
      {
        "network": "Raione",
        "MAU": Number(cubRaione.innerHTML),
        "color": am4core.color("#ff0000") // VERMELHO
      },
      {
        "network": "Lucas",
        "MAU": Number(cubLucas.innerHTML),
        "color": am4core.color("#ff0000") // VERMELHO
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
   "visits": jan,
   "color": am4core.color("#0000ff") // AZUL
  }, {
   "country": "Fev",
   "visits": fev,
   "color": am4core.color("#0000ff") // AZUL
  }, {
   "country": "Mar",
   "visits": mar,
   "color": am4core.color("#0000ff") // AZUL
  }, {
   "country": "Abr",
   "visits": abr,
   "color": am4core.color("#0000ff") // AZUL
  }, {
   "country": "Mai",
   "visits": mai,
   "color": am4core.color("#0000ff") // AZUL
  }, {
   "country": "Jun",
   "visits": jun,
   "color": am4core.color("#0000ff") // AZUL
  }, {
   "country": "Jul",
   "visits": jul,
   "color": am4core.color("#0000ff") // AZUL
  }, {
   "country": "Ago",
   "visits": ago,
   "color": am4core.color("#0000ff") // AZUL
  }, {
   "country": "Set",
   "visits": set,
   "color": am4core.color("#0000ff") // AZUL
  }, {
   "country": "Out",
   "visits": out,
   "color": am4core.color("#0000ff") // AZUL
  }, {
   "country": "Nov",
   "visits": nov,
   "color": am4core.color("#0000ff") // AZUL
  }, {
   "country": "Dez",
   "visits": dez,
   "color": am4core.color("#0000ff") // AZUL
  }];
  
  chart.padding(5, 5, 5, 5);
  
  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.dataFields.category = "country";
  categoryAxis.renderer.minGridDistance = 20;
  categoryAxis.renderer.inversed = false;
  

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.min = 0;
  valueAxis.extraMax = 0.1;
  categoryAxis.renderer.grid.template.disabled = true;
  valueAxis.renderer.labels.template.disabled = true;
  valueAxis.renderer.grid.template.disabled = true;

  

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