var mongoose  = require( 'mongoose' );
var Schema =  mongoose.Schema;

var bonosSchema = new Schema({
    CIUDAD: {type: String},
    CANTIDAD: {type: Number}
});

module.exports = mongoose.model('Bonos', bonosSchema);