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
            }
        });
        return StartView;
    }

);