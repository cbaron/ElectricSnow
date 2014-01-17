define(

    [ 'jquery',
      'underscore',
      'backbone',
      'util',
      'config',
      'text!templates/homeButton.html',
      'css!styles/homeButton',
      'jqueryUI'
    ],
            
    function( $, _, Backbone, util, config, homeButtonTemplate ) {

        var HomeButtonView = Backbone.View.extend( {
        
            el: $('#pageContainer'),

            events: {

                'click .homeButton': 'navigate'
            },

            initialize: function() {

                this.render();

                $(document).on( 'keyup', $.proxy( this.handleKeyUp, this ) );
            },

            render: function() {

                this.$el
                    .height( util.windowHeight )
                    .width( util.windowWidth );

                this.templateData =
                    util.slurpTemplate(
                        _.template( homeButtonTemplate, {} ) );
                        
                this.$el.prepend( this.templateData.$template );

                var $homeButton =
                    this.templateData.parts.homeButton.css( {
                        'background-color': config.backgroundColor,
                        'height': ( util.windowHeight / 3 ),
                        'width': ( util.windowWidth / 3 ) } )
                
                $homeButton.css( {
                    top: ( ( util.windowHeight - $homeButton.outerHeight( true ) ) / 3 ),
                    left: ( ( util.windowWidth - $homeButton.outerWidth( true ) ) / 2 ) } );

                util.centerEl( {
                    el: this.templateData.parts.homeButtonText,
                    parentEl: $homeButton } );
            },

            handleKeyUp: function( e ) {

               if( e.keyCode == 13 ) { this.navigate(); }
            },

            toggle: function() {

                var fadeArgs = { duation: 1000 };

                if( this.templateData.parts.homeButton.is(':visible') ) {

                    $(document).off( 'keyup', $.proxy( this.handleKeyUp, this ) );

                    this.templateData.parts.homeButton.fadeOut(
                        $.extend( fadeArgs, { done: $.proxy( this.navigate, this ) } ) );

                } else {
                    
                    this.templateData.parts.homeButton.fadeIn( fadeArgs );
                    
                    $(document).on( 'keyup', $.proxy( this.handleKeyUp, this ) );
                }
            },

            navigate: function() {

                this.options.appRouter.navigate( 'music', { trigger: true } ); 
            }

        } );
                                                              
        return HomeButtonView;
    }
);
