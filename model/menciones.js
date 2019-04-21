var mongoose  = require( 'mongoose' );
var Schema =  mongoose.Schema;

var mencionesSchema = new Schema({
    AUTHOR: {type: String},
    MENTIONED_NAME: {type: String}
});

module.exports = mongoose.model('Menciones', mencionesSchema);