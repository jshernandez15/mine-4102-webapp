$(document).ready(function()
{
    $.ajaxSetup(
    {
        beforeSend: function() {
            $('#loading_ra1').show();
        },
        complete: function() {
            $('#loading_ra1').hide();
        },
        success: function() {
            $('#loading_ra1').hide();
        }
    });
    var $container = $("#ra2_body");
    var ra2Uri = "/taller-1/ra-1/" + $("#ra1_id").val();

    var checkResponse = function(){
        $.get(ra2Uri, function(data) {
            if( data.includes('No such file or directory') ) {
                setTimeout(checkResponse, 6000);
            }
            else {
                $container.html(data);
            }
        });
    };

    setTimeout(checkResponse, 6000);
});