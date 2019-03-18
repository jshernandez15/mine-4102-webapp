function ordenarFecha(a, b) {
    var ma = parseInt(a.date.split("/")[0]);
    var mb = parseInt(b.date.split("/")[0]);
    var da = parseInt(a.date.split("/")[1]);
    var db = parseInt(b.date.split("/")[1]);
    if ( ma > mb ) return 1;
    if ( ma < mb ) return -1;
    if ( da > db ) return 1;
    if ( da < db ) return -1;
    return 0;
}

function compararFecha(entrada) {
    var ra2_fi = $("#ra2_fi").val();
    var ra2_ff = $("#ra2_ff").val();

    if ( ordenarFecha(entrada, {date: ra2_fi}) >= 0 && ordenarFecha(entrada, {date: ra2_ff}) <= 0) {
        return true;
    }
    return false;
}

function graficoXColor(color, arr) {

    var filtrado = arr.filter(compararFecha);

    var ctx = document.getElementById('myChart' + color.substring(0, 1).toUpperCase()).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: filtrado.map(el => el.date),
            datasets: [{
                label: color,
                data: filtrado.map(el => el.count),
                borderColor: color,
                backgroundColor: color
            }]
        },
        options: {
          scales: {
              yAxes: [{
                ticks: {
                    beginAtZero:true
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Demanda',
                  fontSize: 20 
                }
              }]            
          }  
        }
    });
}

function creaGrafico(input) {

    if(typeof input['yellow'] !== "undefined") {
        var amarillos = input['yellow'].sort(ordenarFecha);
        graficoXColor('yellow', amarillos);
    }

    if(typeof input['green'] !== "undefined") {
        var verdes = input['green'].sort(ordenarFecha);
        graficoXColor('green', verdes);
    }

    if(typeof input['blue'] !== "undefined") {
        var azules = input['blue'].sort(ordenarFecha);
        graficoXColor('blue', azules);
    }
}

$(document).ready(function()
{
    $.ajaxSetup(
    {
        beforeSend: function() {
            $('#loading_ra2').show();
        },
        complete: function() {
            $('#loading_ra2').hide();
        },
        success: function() {
            $('#loading_ra2').hide();
        }
    });
    var $container = $("#ra2_body");
    var ra2Uri = "/taller-1/ra-2/" + $("#ra2_id").val();

    var checkResponse = function(){
        $.get(ra2Uri, function(data) {
            $container.html(data);
            creaGrafico(data);
        }).fail(function() {
            setTimeout(checkResponse, 6000);
        });
    };

    setTimeout(checkResponse, 6000);
});