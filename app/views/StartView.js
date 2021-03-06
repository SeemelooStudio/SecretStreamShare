// StartView.js
// -------
define(["jquery", "backbone", "mustache", "text!templates/Start.html", "animationscheduler", "utils"],
    function ($, Backbone, Mustache, template, AnimationScheduler, Utils) {

        var StartView = Backbone.View.extend({

            el: "#main",
            
            initialize: function (options) {
                this.listenTo(this, "render", this.postRender);
                if ( this.model.isParseSucceed ) {
                    this.onModelParseSuccess();
                } else {
                    this.listenTo(this.model, "parseSuccess", this.onModelParseSuccess);
                }
                
                
            },
            events: {
            },
            onModelParseSuccess: function(){
                var self = this;
                /*
                if ( this.model.get("hasImage") ) {
                    var img = new Image();
                    img.onerror = function (err) {
                        this.model.set("hasImage",false);
                        self.render();
                    };
                    img.onload = function(evt){
                        self.render();
                    };
                    img.src = this.model.get("imageUrl");                    
                
                } else {
                    this.render();
                }
                */
                this.render();
            },
            render: function () {
                this.template = _.template(template, {});
                this.$el.html(Mustache.render(this.template, this.model.toJSON() ));
                
                this.trigger("render");
                return this;
            },
            postRender: function() {
                Utils.setPageTitle(this.model.get("content"));
                var self = this;
                this.backgroundMarginTop = 0 - $(".post").width() * 0.6;
                $(".postBackground").css ({
                  "margin-top": this.backgroundMarginTop,
                  "margin-left": self.backgroundMarginTop
                });
                
                var postHeight = $('.post').height();
                var contentHeight = $('.post-content').height();
                var defaultPadding = 60;
                
                if ( postHeight -  contentHeight < defaultPadding * 2 ) {
                    this.textPadding = defaultPadding;
                } else {
                    this.textPadding = (postHeight - contentHeight) / 2;
                }
                
                $(".post-content").css({
                    "padding-top":this.textPadding,
                    "padding-bottom":this.textPadding + 20
                });
                
                this.animationScheduler = new AnimationScheduler(
                    this.$el.find(".logo-right,.post,.comment,.comment-download,#btnLink,.qrcode"),
                    {
                        "isSequential":true,
                        "sequentialDelay":500
                    }
                );
                this.animationScheduler.animateIn();
                
                if (window.DeviceOrientationEvent) {
                    window.addEventListener('deviceorientation', function(eventData){
                        var distanceBeta = eventData.beta * 0.4;
                        var distanceGamma = event.gamma * 0.4;
 
                        $(".postBackground").css ({
                          "margin-top":  self.backgroundMarginTop + distanceBeta,
                          "margin-left": self.backgroundMarginTop + distanceGamma
                        });
                    
                    }, false);
                }

            },
            showDownloadTips: function(ev) {
                
                if ( Utils.isWechat() ) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    $("#main").addClass("blur");
                    $("#downloadOverlay").fadeIn();
                    Backbone.history.navigate("download", { trigger: false, replace: true });
                    $("#downloadOverlay").click(function(){
                        $("#main").removeClass("blur");
                        $("#downloadOverlay").fadeOut();
                        Backbone.history.navigate("", { trigger: false, replace: true });
                    });
                    
                    
                }
                _hmt.push(['_trackEvent', 'download', 'click', 'Timeline']);
            },
            shareFriend: function () {
                var self = this;
                WeixinJSBridge.invoke('sendAppMessage',{
                    "desc": self.model.get("content"),
                    "title": "分享一个不得不说的秘密"
                }, function(res) {
                });
            },
            shareTimeline:function() {
                var self = this;
                WeixinJSBridge.invoke('shareTimeline',{
                    "desc": self.model.get("content"),
                    "title": "分享一个不得不说的秘密"
                }, function(res) {
                       //_report('timeline', res.err_msg);
                });
            }
        });
        return StartView;
    }

);