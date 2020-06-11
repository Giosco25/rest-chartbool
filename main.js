$(document).ready(function(){
    // chiamata API per recuperare i dati
    $.ajax({
     'url': 'http://157.230.17.132:4028/sales',
     'method': 'GET',
     'success': function(vendite_mensili){
         preparazione_dati_vendite(vendite_mensili)

     } // fine success
    });// fine ajax
   function preparazione_dati_vendite(dati){
       // creo un array con tutti i mesi
      var vendite_mesi = {
          'gennaio': 0,
          'febbraio':0,
          'marzo':0,
          'aprile':0,
          'maggio':0,
          'giugno':0,
          'luglio':0,
          'agosto':0,
          'settembre':0,
          'ottobre':0,
          'novembre':0,
          'dicembre':0
      };

      for (var i = 0; i < dati.length; i++) {
          // mi salvo le informazioni dei clienti
            var informazioni_clienti = dati[i];
            // salvo in una variabile il capitale dei clienti
            var capitale_clienti = informazioni_clienti.amount;
            // salvo la data di ogni cliente
            var  date = informazioni_clienti.date;
            moment.locale('it');
            var mesi_clienti = moment(date, "DD/MM/YYYY").format("MMMM");
            // console.log(data_clienti);
            vendite_mesi[mesi_clienti] += capitale_clienti;
            disegna_grafico_vendite(vendite_mesi);
        } // fine for

   } //** function preparazione dati vendite **//

   function vendite_venditori(dati){
        var vendite_venditori = {};

        for (var i = 0; i < dati.length; i++) {
           // mi salvo le informazioni dei clienti
            var informazioni_clienti = dati[i];
            // salvo in una variabile il capitale dei clienti
            var capitale_clienti = informazioni_clienti.amount;
            // salvo nomi dei clienti per la parte 2 della milestone 1
            var nomi_clienti = informazioni_clienti.salesman;
            if (vendite_venditori.hasOwnProperty(nomi_clienti)) {
                // la chiave per questo venditore è già definita
               // incremento il suo totale con l'importo della vendita corrente
                vendite_venidtori[nome_clienti] += capitale_clienti
            }else {
                // la chiave con il nome di questo venditore non esiste
                // non ho ancora incontrato questo vendtore in nessuna iterazione precedente
                vendite_venidtori[nome_clienti] = capitale_clienti
            }
            disegna_vendite_venditori(vendite_venditori);
   }
   function disegna_grafico_vendite(dati_vendite_mensili){
       // console.log(vendite_mesi);
       // estraggo i mesi dell'oggetto vendite mesi
       // queste corrispondono ai nomi dei mesi
       var mesi = Object.keys(dati_vendite_mensili);
       console.log(mesi);
       // estraggo il capitale dell'oggetto vendite_mesi
       // questi corrispondono al totale del capitale di ogni mese
       var capitale = Object.values(dati_vendite_mensili);
       // console.log(capitale);
       var ctx = $('#grafico_vendite')[0].getContext('2d');

       var myChart = new Chart(ctx, {
           type: 'line',
           data: {
               labels: mesi,
               datasets: [{
                   label: 'Period 1',
                   data: capitale,
                   pointBackgroundColor:'rgba(255, 35, 12, 1)',
                   pointBorderColor: 'rgba(255, 159, 64, 1)',
                   borderColor:'rgba(255, 159, 64, 1)',
                   borderWidth:3,
                   fill: false,
               }]
           },
           options: {
               legend:{
                   position: 'right',
                   fontColor: '#333'
               },
               title: {
                   display: true,
                   text: 'Fatturato Mensile',
                   fontSize: 50
                }
            } // fine options
       });// fine my chart
   } //** function disegna grafico vendite **//

function disegna_vendite_venditori(dati_vendite_venditori){
    var nomi_venditori = Object.keys(dati_vendite_venditori);
    console.log(mesi);
    // estraggo il capitale dell'oggetto vendite_mesi
    // questi corrispondono al totale del capitale di ogni mese
    var dati_venditori = Object.values(dati_vendite_venditori);
    // console.log(capitale);
    var ctx = $('#grafico_vendite')[0].getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nomi_venditori,
            datasets: [{
                label: 'Period 1',
                data: dati_venditori,
                pointBackgroundColor:'rgba(255, 35, 12, 1)',
                pointBorderColor: 'rgba(255, 159, 64, 1)',
                borderColor:'rgba(255, 159, 64, 1)',
                borderWidth:3,
                fill: false,
            }]
        },
        options: {
            legend:{
                position: 'right',
                fontColor: '#333'
            },
            title: {
                display: true,
                text: 'Fatturato Mensile',
                fontSize: 50
             }
         }
    });// fine my chart
 };//** funzione disegna vendite venditori **//
});// fine document ready
