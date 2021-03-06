//Post.js

define(["jquery", "backbone", "utils",'base64'],
    function($, Backbone, Utils){
    var Post = Backbone.Model.extend({
        defaults:{
            "content":"来自美国的Secret秘密，原装正版，不要告诉别人哦！",
            "commentsCount":0,
            "lovesCount":0,
            "comments":[],
            "hideCommentsCount":0,
            "isHidingComments":false,
            "source":"你的朋友",
            "hasImage":false,
            "getRandomMask": function(){
                var MaskRepo = ["Carbon", "Timber", "Disco","Haze","Twilight", "Distressed", "Metal","Tweed", "Grime", "Dream","Denim", "Glow","Plain", "Concrete"];

                return Utils.getRandomItemFromArray(MaskRepo);
            },
            "getRandomColor": function(){
                var ColorRepo = ["Cobalt", "Skyfall", "Aquamarine","Olive","Cash", "EmeraldSea", "Hopscotch","Lavender", "Burst", "Cupid","Peony", "Midnight","Vanilla"];

                return Utils.getRandomItemFromArray(ColorRepo);
            },
            "getRandomColorWithoutVanilla": function(){
                var ColorRepo = ["Cobalt", "Skyfall", "Aquamarine","Olive","Cash", "EmeraldSea", "Hopscotch","Lavender", "Burst", "Cupid","Peony", "Midnight"];

                return Utils.getRandomItemFromArray(ColorRepo);
            },
            "getRandomIcon": function(){
                var IconRepo = ["bird", "bolt", "bone","bug","clove", "coffee", "droid","ghost", "heart", "icecream","jigsaw", "meow","outlet", "owl", "pinwheel","planet", "poo", "rocket","sailboat", "shirt","skull", "spade", "star","wine"];

                return Utils.getRandomItemFromArray(IconRepo);
            }
        },
        initialize: function(){
            this.isParseSucceed = false;
            //get data from query string
            var data = Utils.getParameterByName("data", window.location.href, true);
            
            var jsonData;
            if ( data ) {
                try {
                    data = Base64.decode(data);
                    jsonData = $.parseJSON( data );
                    
                    this.set({
                        "content": jsonData.ShareText,
                        "commentsCount": jsonData.CommentsCount,
                        "lovesCount": jsonData.LikeCount,
                        "comments":jsonData.Comments
                    });
                    
                    if ( jsonData.ImageUrl && jsonData.ImageUrl !== "" ) {
                        this.set({
                        "imageUrl":jsonData.ImageUrl,
                        "hasImage":true
                        });
                    }
                    
                    var hideCommentsCount = this.get("commentsCount") - this.get("comments").length;
                    
                    if ( hideCommentsCount > 0 ) {
                        this.set({
                            "hideCommentsCount":hideCommentsCount,
                            "isHidingComments":true                            
                        });                        
                    } else {
                        this.set({
                            "hideCommentsCount":0,
                            "isHidingComments":false                            
                        });
                    }
                    
                    this.trigger("parseSuccess");
                    this.isParseSucceed = true;
                    
                } catch(e) {
                    //error
                    console.log(e);
                    this.trigger("parseSuccess");
                    this.isParseSucceed = true;
                }
            } else {
                this.trigger("parseSuccess");
                this.isParseSucceed = true;
            }
            
            shareInfo.desc = this.get("content");
            if ( this.get("hasImage") ) {
                shareInfo.img_url = this.get("imageUrl");
            }
            
            
        },
        getRandomAvatar: function() {
            return "a";   
        }
    });
    
    return Post;
        
});