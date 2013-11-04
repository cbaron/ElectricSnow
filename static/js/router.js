define(

    [
        'jquery',
        'underscore',
        'backbone',
        'views/domainText',
        'views/music'
    ],

    function( $, _, Backbone, DomainTextView, MusicView ) {
      
        var AppRouter = Backbone.Router.extend( {

            routes: {

                'music': 'musicRoute',

                '*actions': 'defaultRoute'
            },

            musicRoute: function() {
               
                if( 'musicView' in this ) {
                    
                    this.musicView.toggle();

                } else {

                    require( [ 'views/music' ], function( MusicView ) {

                        this.musicView = new MusicView( { appRouter: this } );
                    } );
                }
                
                if( !( 'domainTextView' in this ) ) {
                
                    this.domainTextView = new DomainTextView();
                }
            },

            defaultRoute: function() {

                if( 'musicView' in this ) {

                    this.musicView.toggle();
                }

                require( [ 'views/homeButton' ], function( HomeButtonView ) {
                
                    this.homeButtonView = new HomeButtonView( { appRouter: this } );
                    this.domainTextView = new DomainTextView();
                } );
            },

            loadDomainText: function() {
            }

        } );

        var initialize = function() {
        
            var appRouter = new AppRouter();

            Backbone.history.start();
        };

        return { initialize: initialize } 
    }
);
