define(

    [ 'jquery', 'jqueryUI', 'underscore', 'backbone', 'util', 'config', 'jquery.jplayer.min', 'text!templates/songView.html' ],
            
    function( $, undefined, _, Backbone, util, config, jPlayer, songViewTemplate  ) {

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
                        $( _.template( songViewTemplate, { songName: this.options.name } ) )
                            .appendTo( this.$el ) );

                this.positionElements();

                this.beginAnimation();
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

                this.$domEls['jp-play-bar'][0].css( { 'background-color': config.backgroundColor } );
            },

            beginAnimation: function() {

               setTimeout( $.proxy( this.showNextDialogue, this ), 5000 );
               setTimeout( $.proxy( this.showNextDialogue, this ), 10000 );
            },

            showNextDialogue: function() {

                $( this.$el.find('.modalSongDialogue:visible')[0] ).fadeOut( 500, function() { $(this).next().fadeIn( 500 ); } );
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
