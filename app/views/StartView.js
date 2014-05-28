// StartView.js
// -------
define(["jquery", "backbone", "mustache", "text!templates/Start.html", "animationscheduler", "utils"],
    function ($, Backbone, Mustache, template, AnimationScheduler, Utils) {

        var StartView = Backbone.View.extend({

            el: "#main",
            
            initialize: function (options) {
                this.listenTo(this, "render", this.postRender);
                this.render();
            },
            events: {

            },
            render: function () {
                this.template = _.template(template, {});
                this.$el.html(Mustache.render(this.template, this.model.toJSON() ));
                
                this.trigger("render");
                return this;
            },
            postRender: function() {
                Utils.setPageTitle(this.model.get("content"));
                
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
                        "sequentialDelay":1000
                    }
                );
                this.animationScheduler.animateIn();
                
                if (window.DeviceOrientationEvent) {
                    window.addEventListener('deviceorientation', function(eventData){
                        $(".post-mask").css ({
                          "background-position-y": eventData.beta - 90
                        });
                    
                    }, false);
                }
            }
        });
        return StartView;
    }

);