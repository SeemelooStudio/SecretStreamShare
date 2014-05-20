//Post.js

define(["jquery", "backbone", "utils"],
    function($, Backbone, Utils){
    
    var Post = Backbone.Model.extend({
        defaults:{
            "content":"狼厂这个点还加班，还有人性么！狼厂这个点还加班，还有人性么！",
            "commentsCount":75,
            "lovesCount":30,
            "comments"：{}
        },
        initialize: function(){
            var data = Utils.getParameterByName("data", window.location.href);
            var jsonData;
            
            if ( data ) {
                try {
                    data = decodeURIComponent(data);
                    jsonData = $.parseJSON( data );
                } catch(e) {
                    //error
                    console.log(e);
                }
            }
            
        }
    });
    
    return Post;
        
});