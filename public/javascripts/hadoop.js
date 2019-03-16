$(document).ready(function()
{
    $.ajaxSetup(
    {
        beforeSend: function() {
            $('#loading').show();
        },
        complete: function() {
            $('#loading').hide();
        },
        success: function() {
            $('#loading').hide();
        }
    });
    var $container = $("#hadoop_tbody");
    var hadoopInfoUri = "http://bigdata-cluster1-18.virtual.uniandes.edu.co:8088/ws/v1/cluster/apps?states=NEW,NEW_SAVING,SUBMITTED,ACCEPTED,RUNNING";
    setInterval(function(){
        $.get(hadoopInfoUri, function(data) {
            if( data.apps.app ) {
                var rows = "";
                data.apps.app.forEach(app => {
                    rows  += "<tr><th scope='row'>" + 
                                app.user + "</th><td>" + 
                                app.state + "</td><td><a target='_blank' class='btn btn-primary' href='" + 
                                app.trackingUrl + "'>Ver Job</a></td></tr>";
                });
                $container.html(rows);
            }
            else {
                $container.html("<tr><td colspan='3'>No hay trabjos en curso</td></tr>");
            }
        });
    }, 6000);
});