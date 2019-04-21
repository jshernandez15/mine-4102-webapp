var mongoose  = require( 'mongoose' );
var Schema =  mongoose.Schema;

var coyunturasSchema = new Schema({
    CATEGORY_NUMBER: {type: Number},
    HASHTAG_NAME: {type: String},
    CANTIDAD: {type: Number}
});

module.exports = mongoose.model('Coyunturas', coyunturasSchema);