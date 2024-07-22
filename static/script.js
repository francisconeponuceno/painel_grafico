
let cubArimateia = document.getElementById('cubArimateia');
let cubFabio = document.getElementById('cubFabio');
let cubVicente = document.getElementById('cubVicente');
let cubCaze = document.getElementById('cubCaze');
let cubKassio = document.getElementById('cubKassio');
let cubZecarlos = document.getElementById('cubZecarlos');
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
let ctx3 = document.getElementById('grafico3');
new Chart(ctx3, {
  type: 'bar',
  data: {
    labels: ['Arimatéia', 'Fabio', 'Zé carlos','Cazé','Kassio','Vicente','Fernando','Raione','Lucas'],
    datasets: [{
      label: 'Cubagem por conferente',
      
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

