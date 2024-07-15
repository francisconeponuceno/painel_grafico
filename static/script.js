
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

const ctx = document.getElementById('grafico1');
const ctx2 = document.getElementById('grafico2');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Terceiro', 'Claudino', 'Escoamento','Escoamento + Claudino' ],
      datasets: [{
        label: '%',
        
        data: [Number(porcentoTerceiro.innerHTML), Number(porcentoClaudino.innerHTML),
              Number(porcentoEscoamento.innerHTML), Number(Cladino_Escoamento)],
        backgroundColor: ['#ff0000', '#0000ff', '#4881fce6','#f86f6f']
        
      }]
    },
    options: {
      layout : {
        with : 300
      }

    }
  });
 
// SEGUNDO GRAFICO
new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['Arimatéia', 'Fabio', 'Zé carlos','Cazé','Kassio','Vicente'],
    datasets: [{
      label: '%',
      
      data: [Number(cubArimateia.innerHTML),Number(cubFabio.innerHTML),
            Number(cubZecarlos.innerHTML),Number(cubCaze.innerHTML),
            Number(cubKassio.innerHTML),Number(cubVicente.innerHTML)],
      backgroundColor: ['#0000ff','#ff0000']
      
    }]
  },
  options: {
    layout : {
      with : 300
    }

  }
});

