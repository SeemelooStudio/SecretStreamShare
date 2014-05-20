define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var Backbone = require("backbone");
  
  //views
  var MainView = require("views/MainView");
  var mainView;
  
  var PrepareView = require("views/PrepareView");
  var prepareView;
  
  var StartView = require("views/StartView");
  var startView;

  // Defining the application router.
  module.exports = Backbone.Router.extend({
    initialize: function() {
        mainView = new MainView();        
        prepareView = new PrepareView();
    },
    routes: {
      "": "index"
    },

    index: function() {
      console.log("Welcome to your / route.");
      prepareView.render();
    }
  });
});
