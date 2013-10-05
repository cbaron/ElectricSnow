define(

    [ 'jquery', 'underscore', 'backbone', 'views/home' ],

    function( $, _, Backbone, TitleView, CreateCharacterView ) {
      
        var AppRouter = Backbone.Router.extend( {

            routes: {

                '*actions': 'defaultRoute'
                                        
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
