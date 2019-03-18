var SSH2Shell = require ('ssh2shell');

var command = {
    server: {     
        host: process.env.HADOOP_HOST,
        userName: process.env.HADOOP_USER,
        password: process.env.HADOOP_PASS
    }
};

command.sendRF3 = function(id, data) {
    var SSH = new SSH2Shell({
        server: this.server,
        commands: ["hadoop jar /home/bigdata04/taller1/RF3_2.jar uniandes.job.Job3 datos/taxis_subsample output/taller1/RF3_" + id.replace('-', '_') + " 2 10 14 20"]
        //commands: ["echo $(pwd)", "ls -l"]
    });
    var callback = function(sessionText) {
        console.log(sessionText);
    }
    SSH.connect(callback);
}

command.readRF3 = function(id, callback) {
    var SSH = new SSH2Shell({
        server: this.server,
        commands: ["hadoop fs -cat output/taller1/RF3_" + id.replace('-', '_') + "_ordenados/part-r-00000"]
        //commands: ["cat mine-4102/mine-4102-webapp/.gitignore"]
    });
    SSH.connect(callback);
}

command.readRA2 = function(id, callback) {
    var SSH = new SSH2Shell({
        server: this.server,
        commands: ["hadoop fs -cat output/taller1/RA2_subsample/part-r-00000 | sed -e 's/\\t/ /g' -e 'H;${x;s/\\n/;/g;s/^,//;p;};d'"]
        //commands: ["cat mine-4102/mine-4102-webapp/samples/part-r-00000"]
    });
    SSH.connect(callback);
}

module.exports = command;