$(document).ready(function(){
    var url_ajax = 'http://157.230.17.132:4028/sales';
    genera_grafici();
    // click
    $('.btn').click(function(){
        var venditore_scelto = $('.venditori').val();
        var scelta_mese = $('.mesi').val();
        var importo = $('.importo-vendita').val();

        var data_vendita = '01/' + scelta_mese + '/2017';

        $.ajax({
            'url': url_ajax ,
            'method': 'POST',
            'data':{
                salesman: venditore_scelto,
                date: data_vendita,
                amount: importo
            },
            'success': function(vendite_mensili){
                genera_grafici();
            },// fine success
            'error': function(){
                console.log('errore');
            }// fine error
        });// fine ajax
    }); // fine click

    function genera_grafici(){
        $.ajax({
            'url': url_ajax ,
            'method': 'GET',
            'success': function(vendite_mensili){
                preparazione_dati_vendite(vendite_mensili)
                vendite_venditori(vendite_mensili);
            } // fine success
        });// fine ajax
    }
    function aggiorna_grafici(){
        $.ajax({
            'url': url_ajax ,
            'method': 'GET',
            'success': function(vendite_mensili){
                console.log(grafici.graficoVendite);
            } // fine success
        });// fine ajax
    }

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
            var capitale_clienti = parseInt(informazioni_clienti.amount);
            // salvo la data di ogni cliente
            var  date = informazioni_clienti.date;
            moment.locale('it');
            var mesi_clienti = moment(date, "DD/MM/YYYY").format("MMMM");
            // console.log(data_clienti);
            vendite_mesi[mesi_clienti] += capitale_clienti;
        } // fine for
        disegna_grafico_vendite(vendite_mesi);
    } //** function preparazione dati vendite **//

    function vendite_venditori(dati){
        var vendite_venditori = {};

        var vendite_totali = 0;
        for (var i = 0; i < dati.length; i++) {
            // mi salvo le informazioni dei clienti
            var informazioni_clienti = dati[i];
            // salvo in una variabile il capitale dei clienti
            var capitale_clienti = parseInt(informazioni_clienti.amount);
            // salvo nomi dei clienti per la parte 2 della milestone 1
            var nomi_clienti = informazioni_clienti.salesman;
            if (vendite_venditori.hasOwnProperty(nomi_clienti)) {
                // la chiave per questo venditore è già definita
               // incremento il suo totale con l'importo della vendita corrente
                vendite_venditori[nomi_clienti] += capitale_clienti
            } else {
                // la chiave con il nome di questo venditore non esiste
                // non ho ancora incontrato questo vendtore in nessuna iterazione precedente
                vendite_venditori[nomi_clienti] = capitale_clienti
            }
            vendite_totali += capitale_clienti
        } // fine ciclo for
        for (var nome_venditore in vendite_venditori) {
            // salvo in una variabile l'importo di ogni singolo venditore
            var importo_singolo_venditore = vendite_venditori[nome_venditore];
            // calcolo la percentuale di ogni singolo venditore
            var percentuale_singolo_venditore = (importo_singolo_venditore * 100/ vendite_totali).toFixed(1);

            vendite_venditori[nome_venditore] = percentuale_singolo_venditore;

        }
        console.log(vendite_venditori);
        disegna_grafico_vendite_venditori(vendite_venditori);
    } //** fine funzione vendite venditori

    function disegna_grafico_vendite(dati_vendite_mensili){
        // console.log(vendite_mesi);
        // estraggo i mesi dell'oggetto vendite mesi
        // queste corrispondono ai nomi dei mesi
        var mesi = Object.keys(dati_vendite_mensili);
        // console.log(mesi);
        // estraggo il capitale dell'oggetto vendite_mesi
        // questi corrispondono al totale del capitale di ogni mese
        var capitale = Object.values(dati_vendite_mensili);
        // console.log(capitale);
        $('.chart-container-vendite').empty();
        $('.chart-container-vendite').append('<canvas id="grafico_vendite"></canvas>');
        var ctx = $('#grafico_vendite')[0].getContext('2d');

        grafici.graficoVendite = new Chart(ctx, {
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
               } // fine title
            } // fine options
       });// fine my chart
    } //** function disegna grafico vendite **//

    function disegna_grafico_vendite_venditori(dati_vendite_venditori){
       var nomi_venditori = Object.keys(dati_vendite_venditori);
        // estraggo il capitale dell'oggetto vendite_mesi
        // questi corrispondono al totale del capitale di ogni mese
        var dati_venditori = Object.values(dati_vendite_venditori);

        $('.chart-container-mesi').empty();
        $('.chart-container-mesi').append('<canvas id="grafico_venditori"></canvas>');
        var ctx = $('#grafico_venditori')[0].getContext('2d');

        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: nomi_venditori,
                datasets: [{
                    label: '# of Votes',
                    data: dati_venditori,
                    backgroundColor: [
                       'rgba(255, 99, 132, 0.2)',
                       'rgba(54, 162, 235, 0.2)',
                       'rgba(255, 206, 86, 0.2)',
                       'rgba(75, 192, 192, 0.2)',
                    ],
                    borderColor: [
                       'rgba(255, 99, 132, 1)',
                       'rgba(54, 162, 235, 1)',
                       'rgba(255, 206, 86, 1)',
                       'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1
                }] // fine datasets
            }, // fine data
            options: {
                title: {
                    display: true,
                    text: 'Vendite per venditori',
                    fontSize: 50
                } // fine title
             } // fine options
        }); // fine chart
    };//** fine funzione disegna vendite venditori **//
});// fine document ready
