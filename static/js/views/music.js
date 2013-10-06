define(

    [ 'jquery', 'jqueryUI', 'underscore', 'backbone', 'util', 'config', 'text!templates/musicPage.html' ],
            
    function( $, undefined, _, Backbone, util, musicPageTemplate ) {

        var MusicView = Backbone.View.extend( {
        
            el: $('#pageContainer'),

            initialize: function() {

                this.render();
            },

            render: function() {

                var data = {

                    backgroundColor: '#15375e',
                    width: ( util.windowWidth / 2 ),
                    height: ( util.windowHeight / 2 )

                };

                this.content =
                    $( _.template( homePageTemplate, data ) ).appendTo( this.$el );
            },

            close: function() {

                this.content.fadeOut( { duration: 1000, done: $.proxy( this.navigate, this ) } );
            },

            navigate: function() {

                this.content.remove();

                this.options.appRouter.navigate( 'music', { trigger: true } ); 

            }

        } );
                                                              
        return MusicView;
    }
);
