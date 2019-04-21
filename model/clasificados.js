var mongoose  = require( 'mongoose' );
var Schema =  mongoose.Schema;

var clasificadosSchema = new Schema({
    ARTICLE_ID:  {type: Number},
    EXTERNAL_ID:  {type: String},
    EXTERNAL_AUTHOR_ID:  {type: Number},
    HEADLINE:  {type: String},
    AUTHOR:  {type: String},
    CONTENT:  {type: String},
    ARTICLE_URL:  {type: String},
    MEDIA_PROVIDER:  {type: String},
    REGION:  {type: String},
    LANGUAGE:  {type: String},
    POST_STATUS:  {type: String},
    PUBLISH_DATE:  {type: String},
    HARVESTED_DATE:  {type: String},
    SENTIMENT:  {type: String},
    VIEW_COUNT:  {type: Number},
    COMMENT_COUNT:  {type: Number},
    UNIQUE_COMMENTERS:  {type: Number},
    ENGAGEMENT:  {type: Number},
    LIKES_AND_VOTES:  {type: Number},
    INBOUND_LINKS:  {type: Number},
    FORUM_THREAD_SIZE:  {type: Number},
    FOLLOWING:  {type: Number},
    FOLLOWERS:  {type: Number},
    UPDATES:  {type: Number},
    POST_TYPE:  {type: String},
    CATEGORY_NUMBER:  {type: Number},
    CATEGORY_LABEL:  {type: String}
});

module.exports = mongoose.model('Clasificados', clasificadosSchema);