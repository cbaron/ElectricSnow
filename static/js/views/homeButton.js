define(

    [ 'jquery',
      'jqueryUI',
      'underscore',
      'backbone',
      'util',
      'config',
      'text!templates/homeButton.html'
    ],
            
    function( $, undefined, _, Backbone, util, config, homeButtonTemplate ) {

        var HomeButtonView = Backbone.View.extend( {
        
            el: $('#pageContainer'),

            events: {

                'click .homeButton': 'close'
            },

            initialize: function() {

                this.render();

                $(document).on( 'keyup', $.proxy( this.handleKeyUp, this ) );
            },

            render: function() {

                this.$el
                    .height( util.windowHeight )
                    .width( util.windowWidth );

                this.$domEls =
                    util.slurpTemplate(
                        $( _.template( homeButtonTemplate, {} ) ).appendTo( this.$el ) );
                
                var $homeButton =
                    this.$domEls.homeButton[0].css( {
                    'background-color': config.backgroundColor,
                    'height': ( util.windowHeight / 2 ),
                    'width': ( util.windowWidth / 2 ) } )
                
                $homeButton.css( {
                    top: ( ( util.windowHeight - $homeButton.outerHeight( true ) ) / 3 ),
                    left: ( ( util.windowWidth - $homeButton.outerWidth( true ) ) / 2 ) } );

                util.centerEl( {
                    el: this.$domEls.homeButtonText[0],
                    parentEl: $homeButton } );
            },

            handleKeyUp: function( e ) {

               if( e.keyCode == 13 ) {
                
                    $(document).off( 'keyup', $.proxy( this.handleKeyUp, this ) );
                    this.close();
               }

            },

            close: function() {

                this.$domEls.homeButton[0].fadeOut( { duration: 1000, done: $.proxy( this.navigate, this ) } );
            },

            navigate: function() {

                this.$domEls.homeButton[0].remove();

                this.options.appRouter.navigate( 'music', { trigger: true } ); 

            }

        } );
                                                              
        return HomeButtonView;
    }
);
