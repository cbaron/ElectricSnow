define(

    [
        'jquery',
        'underscore',
        'backbone'
    ],

    function( $, _, Backbone ) {
      
        var AppRouter = Backbone.Router.extend( {

            routes: {

                'music': 'musicRoute',

                'index': 'index',

                '': 'index'
            },

            musicRoute: function() {

                this.toggleHomeButtonView();
                this.toggleMusicView( { load: true } );
                this.loadDomainText();
            },

            index: function() {

                this.toggleMusicView();
                this.toggleHomeButtonView( { load: true } );
                this.loadDomainText();
            },

            toggleHomeButtonView: function( p ) {

                var _this = this;

                if( 'homeButtonView' in this ) {
                   
                    this.homeButtonView.toggle();

                } else if( p && p.load ) {

                    require( [ 'views/homeButton' ], function( HomeButtonView ) {

                        _this.homeButtonView = new HomeButtonView( { appRouter: _this } );
                    } );
                }
            },

            toggleMusicView: function( p ) {

                var _this = this;

                if( 'musicView' in this ) {

                    this.musicView.toggle();

                } else if( p && p.load ) {

                    require( [ 'views/music' ], function( MusicView ) {

                        _this.musicView = new MusicView( { appRouter: _this } );
                    } );
                }
            },

            loadDomainText: function() {

                var _this = this;

                if( !( 'domainTextView' in this ) ) {

                    require( [ 'views/domainText' ], function( DomainTextView ) {

                        _this.domainTextView = new DomainTextView();
                    } );
                }
            }

        } );

        var initialize = function() {
        
            var appRouter = new AppRouter();

            Backbone.history.start( { pushState: false, root: "/~cbaron/ElectricSnow/" } );

        };

        return { initialize: initialize } 
    }
);
