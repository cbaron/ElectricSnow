define(

    [ 'jquery', 'underscore', 'backbone', 'views/homeButton', 'views/domainText', 'views/music' ],

    function( $, _, Backbone, HomeButtonView, DomainTextView, MusicView ) {
      
        var AppRouter = Backbone.Router.extend( {

            routes: {

                'music': 'musicRoute',

                '*actions': 'defaultRoute'
                
                                        
            },

            musicRoute: function() {
                
                if( 'musicView' in this ) {
                    
                    this.musicView.toggle();

                } else {

                    this.musicView = new MusicView( { appRouter: this } );
                }
                
                if( !( 'domainTextView' in this ) ) {
                
                    this.domainTextView = new DomainTextView();
                }
            },

            defaultRoute: function() {

                if( 'musicView' in this ) {

                    this.musicView.toggle();
                }
                
                this.homeButtonView = new HomeButtonView( { appRouter: this } );
                this.domainTextView = new DomainTextView();
            },

        } );

        var initialize = function() {
        
            var appRouter = new AppRouter();

            Backbone.history.start();
        };
        
        return { initialize: initialize } 
    }
);
