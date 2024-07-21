
let cubArimateia = document.getElementById('cubArimateia');
let cubFabio = document.getElementById('cubFabio');
let cubVicente = document.getElementById('cubVicente');
let cubCaze = document.getElementById('cubCaze');
let cubKassio = document.getElementById('cubKassio');
let cubZecarlos = document.getElementById('cubZecarlos');
let porcentoTerceiro = document.getElementById('porcentoTerceiro');
let porcentoClaudino = document.getElementById('porcentoClaudino');
let porcentoEscoamento = document.getElementById('porcentoEscoamento');
let CubagemMes = document.getElementById('cubagemMes').innerHTML;

alert(CubagemMes)

let Cladino_Escoamento = Number(porcentoClaudino.innerHTML) + Number(porcentoEscoamento.innerHTML)



// PRIMEIRO GRAFICO
let ctx = document.getElementById('grafico1');
let data = {
  labels: ['Terc', 'Cla', 'Esc','Esc + Cla' ],
  datasets: [{
    label: "%",
    backgroundColor: ['#ff0000', '#0000ff', '#4881fce6','#f86f6f'],
    data: [Number(porcentoTerceiro.innerHTML), Number(porcentoClaudino.innerHTML),
          Number(porcentoEscoamento.innerHTML), Number(Cladino_Escoamento)],
  }]
};

let options = {
  maintainAspectRatio: false,
  
};

new Chart('chart', {
  type: 'doughnut',
  options: options,
  data: data
});


// SEGUNDO GRAFICO
let ctx2 = document.getElementById('grafico2');
new Chart(ctx2, {
  type: 'line',
  data: {
    labels: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Desembro'],
    datasets: [{
      label: '',
      
      data: CubagemMes,
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
let ctx3 = document.getElementById('grafico3');
new Chart(ctx3, {
  type: 'bar',
  data: {
    labels: ['Arimatéia', 'Fabio', 'Zé carlos','Cazé','Kassio','Vicente','Fernando','Raione','Lucas'],
    datasets: [{
      label: 'CUB',
      
      data: [Number(cubArimateia.innerHTML),Number(cubFabio.innerHTML),
            Number(cubZecarlos.innerHTML),Number(cubCaze.innerHTML),
            Number(cubKassio.innerHTML),Number(cubVicente.innerHTML)],
      backgroundColor: ['#0000ff','#ff0000']
      
    }]
  },
  options: {
    layout : {
      width : 100
    }

  }
});

