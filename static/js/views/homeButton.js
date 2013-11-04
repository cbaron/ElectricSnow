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

                this.templateData =
                    util.slurpTemplate(
                        _.template( homeButtonTemplate, {} ) );
                        
                this.$el.append( this.templateData.$template );

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

               if( e.keyCode == 13 ) {
                
                    $(document).off( 'keyup', $.proxy( this.handleKeyUp, this ) );
                    this.close();
               }

            },

            close: function() {

                this.templateData.parts.homeButton.fadeOut( {
                    duration: 1000, done: $.proxy( this.navigate, this ) } );
            },

            navigate: function() {

                this.templateData.parts.homeButton.remove();

                this.options.appRouter.navigate( 'music', { trigger: true } ); 
            }

        } );
                                                              
        return HomeButtonView;
    }
);
