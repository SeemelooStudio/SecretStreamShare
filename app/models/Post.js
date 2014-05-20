//Post.js

define(["jquery", "backbone", "utils"],
    function($, Backbone, Utils){
    
    var Post = Backbone.Model.extend({
        defaults:{
            
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