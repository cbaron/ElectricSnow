define(

    [ 'jquery', 'jqueryUI', 'underscore', 'backbone', 'util', 'jquery.jplayer.min', 'text!templates/songView.html' ],
            
    function( $, undefined, _, Backbone, util, jPlayer, songViewTemplate  ) {

        var SongView = Backbone.View.extend( {
        
            events: {

                "click .jPlayerPlay": "handlePlayButtonClick",
                "click .jPlayerPause": "handlePauseButtonClick"
                
            },

            initialize: function() {

                this.render();

            },

            render: function() {
                
                this.$domEls =
                    util.slurpTemplate(
                        $( _.template( songViewTemplate, {} ) )
                            .appendTo( this.$el ) );

                this.positionElements();
            },

            positionElements: function() {

                var _this = this;

                var closeButton = this.$domEls.songCloseButton[ 0 ];
                var modalForm = this.options.modalEls.modalBoxForm[ 0 ];
                var modalFormPosition = modalForm.position();

                var jPlayerControlContainer = $( '#jp_container_1' );

                closeButton.css( {
                    top: ( modalFormPosition.top +
                          parseInt( modalForm.css( 'margin-top' ) ) ) -
                          ( closeButton.outerHeight( true ) / 2 ),
                    left: modalFormPosition.left + modalForm.outerWidth() - ( closeButton.outerWidth( true ) / 2 ) } );

                this.$domEls.jPlayer[0].jPlayer( {
                        
                    ready: function () {

                        $(this).jPlayer( "setMedia", { mp3: 'static/songs/' + _this.options.file } );
                    },
                             
                    supplied: "mp3",
                    wmode: "window",
                    smoothPlayBar: true,
                    keyEnabled: true

                } );

                jPlayerControlContainer.css( {
                    top: ( modalFormPosition.top +
                           parseInt( modalForm.css( 'margin-top' ) ) +
                           modalForm.outerHeight() ) - jPlayerControlContainer.outerHeight(),
                    left: modalFormPosition.left } );

                this.$domEls.jPlayerSeekContainer[0].width( 200 );
            },

            handlePlayButtonClick: function() {

                this.$domEls.jPlayer[0].jPlayer( 'play' );
                
            },
            
            handlePauseButtonClick: function() {
                
                this.$domEls.jPlayer[0].jPlayer( 'pause' );
            }

        } );
                                                              
        return SongView;
    }
);
