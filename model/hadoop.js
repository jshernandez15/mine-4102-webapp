var SSH2Shell = require ('ssh2shell');

var command = {
    server: {     
        host: process.env.HADOOP_HOST,
        userName: process.env.HADOOP_USER,
        password: process.env.HADOOP_PASS
    }
};

command.send = function(id, data) {
    var SSH = new SSH2Shell({
        server: this.server,
        command: ["hadoop jar /home/bigdata04/taller1/RF3_2.jar uniandes.job.Job3 datos/taxis_subsample output/taller1/RF3_" + id + " 2 10 14 20"]
        //commands: ["echo $(pwd)", "ls -l"]
    });
    var callback = function(sessionText) {
        console.log(sessionText);
    }
    SSH.connect(callback);
}

command.read = function(id, callback) {
    var SSH = new SSH2Shell({
        server: this.server,
        command: ["hadoop fs -cat output/taller1/RF3_<<RANDOM>>_ordenados/part-r-00000"]
        //commands: ["cat mine-4102/mine-4102-webapp/.gitignore"]
    });
    SSH.connect(callback);
}

module.exports = command;