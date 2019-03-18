function creaGrafico() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1', '2', '3', '4', '5', '6'],
            datasets: [{
                label: 'Yellow',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: "rgba(225,0,0,0.0)",
                borderColor: "yellow"
            },
            {
                label: 'Green',
                data: [1, 23, 13, 51, 2, 13],
                backgroundColor: "rgba(0,255,0,0.0)",
                borderColor: "green"
            },
            {
                label: 'Blue',
                data: [13, 8, 22, 19, 21, 10],
                backgroundColor: "rgba(0,0,255,0.0)",
                borderColor: "blue"
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
            if( data.includes('No such file or directory') ) {
                setTimeout(checkResponse, 6000);
            }
            else {
                $container.html(data);
                creaGrafico();
            }
        });
    };

    setTimeout(checkResponse, 6000);
});