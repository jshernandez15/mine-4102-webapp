var mongoose  = require( 'mongoose' );
var Schema =  mongoose.Schema;

var actividadesSchema = new Schema({
    AUTHOR: {type: String},
    CATEGORY_NUMBER: {type: Number},
    ACTIVIDAD: {type: String}
});

module.exports = mongoose.model('Actividades', actividadesSchema, "actividades");