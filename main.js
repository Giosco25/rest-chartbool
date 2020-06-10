$(document).ready(function(){
    // chiamata API per recuperare i dati
    $.ajax({
     'url': 'http://157.230.17.132:4028/sales',
     'method': 'GET',
     'success': function(data){
         // creo un array con tutti i mesi
        var vendite_mesi ={
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


        for (var i = 0; i < data.length; i++) {
            // mi salvo le informazioni dei clienti
            var informazioni_clienti = data[i];
            console.log(informazioni_clienti);
            // console.log(informazioni_clienti);
            // salvo nomi dei clienti per la parte 2 della milestone 1
            var nomi_clienti = informazioni_clienti.salesman;
            // salvo in una variabile il capitale dei clienti
            var capitale_clienti = informazioni_clienti.amount;
            // salvo la data di ogni cliente
            var  date = informazioni_clienti.date;
            moment.locale('it');
           var mesi_clienti = moment(date, "DD/MM/YYYY").format("MMMM");
           // console.log(data_clienti);
           vendite_mesi[mesi_clienti] += capitale_clienti;

        }; // fine for
        console.log(vendite_mesi);
        // estraggo le chiavi dell'oggetto continenti
        // queste corrispondono ai nomi dei continenti
        var mesi = Object.keys(vendite_mesi);
        console.log(mesi);

        // estraggo i valori dell'oggetto continenti
        // questi corrispondono al totale dei dischi venduti per continente
        var capitale = Object.values(vendite_mesi);
        // console.log(capitale);
        var ctx = $('#chart-uno')[0].getContext('2d');

        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: mesi,
                datasets: [{
                    label: 'Period 1',
                    data: capitale,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 35, 12, 1)',
                        'rgba(54, 200, 27, 1)',
                        'rgba(255, 206, 324, 1)',
                        'rgba(52, 1, 192, 1)',
                        'rgba(153, 41, 255, 1)',
                        'rgba(2, 159, 64, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 35, 12, 1)',
                        'rgba(54, 200, 27, 1)',
                        'rgba(255, 206, 324, 1)',
                        'rgba(52, 1, 192, 1)',
                        'rgba(153, 41, 255, 1)',
                        'rgba(2, 159, 64, 1)'
                    ],
                    borderWidth: 1,
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
        });

     } // fine success


    });// fine ajax



});// fine document ready

//        var array_generi =[];
