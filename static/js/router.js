define(

    [ 'jquery', 'underscore', 'backbone', 'views/home', 'views/music' ],

    function( $, _, Backbone, HomeView, MusicView ) {
      
        var AppRouter = Backbone.Router.extend( {

            routes: {

                'music': 'musicRoute',

                '*actions': 'defaultRoute'
                
                                        
            },

            musicRoute: function() {

                new MusicView( { appRouter: this } );
            },

            defaultRoute: function() {
                
                new HomeView( { appRouter: this } );
            },

        } );

        var initialize = function() {
        
            var appRouter = new AppRouter();

            Backbone.history.start();
        };
        
        return { initialize: initialize } 
    }
);
