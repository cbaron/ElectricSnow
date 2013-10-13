define(

    [ 'jquery', 'jqueryUI', 'underscore', 'backbone', 'util', 'jquery.jplayer.min', 'text!templates/songView.html' ],
            
    function( $, undefined, _, Backbone, util, jPlayer, songViewTemplate  ) {

        var SongView = Backbone.View.extend( {
        
            events: {
            },

            initialize: function() {

                this.render();

            },

            render: function() {

                this.$domEls =
                    util.slurpTemplate(
                        $( _.template( songViewTemplate, {} ) )
                            .appendTo( this.$el ) );
            },

            positionElements: function( modalElements ) {

                var _this = this;

                var closeButton = this.$domEls.songCloseButton[ 0 ];
                var modalForm = modalElements.modalBoxForm[ 0 ];
                var modalFormPosition = modalForm.position();

                closeButton.css( {
                    top: ( modalFormPosition.top +
                          parseInt( modalForm.css( 'margin-top' ) ) ) -
                          ( closeButton.outerHeight( true ) / 2 ),
                    left: modalFormPosition.left + modalForm.outerWidth() - ( closeButton.outerWidth( true ) / 2 ) } );

                $( '#jPlayer' ).jPlayer( {
                        
                    ready: function () {

                        $(this).jPlayer( "setMedia", { mp3: 'static/songs/' + _this.options.file } );
                    },
                             
                    supplied: "mp3",
                    wmode: "window",
                    smoothPlayBar: true,
                    keyEnabled: true

                } );
            }

        } );
                                                              
        return SongView;
    }
);
