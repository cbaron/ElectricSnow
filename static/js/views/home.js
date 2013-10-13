define(

    [ 'jquery', 'jqueryUI', 'underscore', 'backbone', 'util', 'config', 'text!templates/homePage.html' ],
            
    function( $, undefined, _, Backbone, util, config, homePageTemplate ) {

        var HomeView = Backbone.View.extend( {
        
            el: $('#pageContainer'),

            events: {

                'click .homeButton': 'close'
            },

            initialize: function() {

                this.render();

                $(document).on( 'keyup', $.proxy( this.handleKeyUp, this ) );
            },

            render: function() {

                this.$content =
                    $( _.template( homePageTemplate, { } ) )
                            .height( util.windowHeight )
                            .width( util.windowWidth )
                            .appendTo( this.$el );

                this.$homeButton =
                    this.$content
                        .find('.homeButton').css( {
                            'background-color': config.backgroundColor,
                            'height': ( util.windowHeight / 2 ),
                            'width': ( util.windowWidth / 2 ) } )
                
                this.$homeDomain = this.$content.find('.homeDomain');

                this.$homeButton.css( {
                    top: ( ( util.windowHeight - this.$homeButton.outerHeight( true ) ) / 3 ),
                    left: ( ( util.windowWidth - this.$homeButton.outerWidth( true ) ) / 2 ) } );

                util.centerEl( {
                    el: $( this.$homeButton.find('.homeButtonText') ),
                    parentEl: this.$homeButton } );
              
                this.$homeDomain.css( {
                    'color': config.blueColor,
                    'left': ( ( util.windowWidth - this.$homeDomain.outerWidth( true ) ) / 2 ),
                    'top': this.$homeButton.offset().top
                           + this.$homeButton.outerHeight( true )
                           + ( this.$homeButton.outerHeight( true ) * .2 ) } );
            },

            handleKeyUp: function( e ) {

               if( e.keyCode == 13 ) {
                
                    $(document).off( 'keyup', $.proxy( this.handleKeyUp, this ) );
                    this.close();
               }

            },

            close: function() {

                this.$content.fadeOut( { duration: 1000, done: $.proxy( this.navigate, this ) } );
            },

            navigate: function() {

                this.$content.remove();

                this.options.appRouter.navigate( 'music', { trigger: true } ); 

            }

        } );
                                                              
        return HomeView;
    }
);
