$(document).ready(function(){
    // chiamata API per recuperare i dati
    $.ajax({
     'url': 'http://157.230.17.132:4028/sales',
     'method': 'GET',
     'success': function(data){
            console.log(data);
        var clienti = {};
        console.log(clienti);

        for (var i = 0; i < data.length; i++) {
            // mi salvo le informazioni dei clienti
            var informazioni_clienti = data[i];
            // console.log(informazioni_clienti);

            var nomi_clienti = informazioni_clienti.salesman;
            console.log(nomi_clienti);
            // salvo in una variabile il capitale dei clienti
            var capitale_clienti = informazioni_clienti.amount;
            console.log(capitale_clienti);
            var  date = informazioni_clienti.date;
            console.log(date);

        // moment(date, "DD-MM-YYYY");
        // console.log(moment);
        if (!clienti.hasOwnProperty(capitale_clienti)) {
            clienti[capitale_clienti] = date;

        }else {
            clienti[capitale_clienti] += nomi_clienti;
        }
        console.log("sono il cliente:" + clienti);
          // }
        // if(!clienti.hasOwnProperty(informazioni_clienti)) {
        //
        //     clienti[informazioni_clienti] = capitale_clienti;
        // } else {
        //
        //     clienti[informazioni_clienti] += capitale_clienti;
        // }
        // console.log('Capitale :'+ capitale_clienti);
        // console.log('informazioni :' + date);
        }; // fine for

     } // fine success


    });// fine ajax

});// fine document ready
//
// $.ajax({
//    'url':'https://flynn.boolean.careers/exercises/api/array/music',
//    'method': 'GET',
//    'success': function(data) {
//        // console.log(data);
//        // Con una chiamata ajax, recuperare i dischi musicali restituiti dall'api:
//        var musica = data.response;
//        // console.log(musica)
//        var array_generi =[];
