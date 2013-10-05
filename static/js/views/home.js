define(

    [ 'jquery', 'jqueryUI', 'underscore', 'backbone', 'util', 'text!templates/homePage.html' ],
            
    function( $, undefined, _, Backbone, util, titleViewTemplate ) {

        var TitleView = Backbone.View.extend( {
        
            el: $('#container'),

            initialize: function() {

                this.render();

                $(document).on( 'keyup', $.proxy( this.handleKeyUp, this ) );
            },

            render: function() {

                var data = {

                    backgroundImageSource: util.getStaticImageUrl( 'titleBackground.jpg' ),
                    //backgroundImageSource: util.getStaticImageUrl( 'psychadelicTitle.gif' ),
                    width: util.windowWidth,
                    height: util.windowHeight

                };

                console.log( data );

                this.dom = $( _.template( titleViewTemplate, data ) );

                this.$el.append( this.dom );
            },

            handleKeyUp: function( e ) {

               if( e.keyCode == 13 ) {
                
                    $(document).off( 'keyup', $.proxy( this.handleKeyUp, this ) );
                    this.close();

               }

            },

            close: function() {

                this.dom.fadeOut( { duration: 1000, done: $.proxy( this.navigate, this ) } );
            },

            navigate: function() {

                this.dom.remove();
                this.options.appRouter.navigate( 'createCharacter', { trigger: true } ); 

            }

        } );
                                                              
        return TitleView;
    }
);
