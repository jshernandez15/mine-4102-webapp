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
            if( data.endsWith('No such file or directory') ) {
                setTimeout(checkResponse, 6000);
            }
            else {
                $container.html(data);
            }
        });
    };

    setTimeout(checkResponse, 6000);
});