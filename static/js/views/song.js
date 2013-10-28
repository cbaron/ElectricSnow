define(

    [ 'jquery', 'jqueryUI', 'underscore', 'backbone', 'util', 'config', 'jquery.jplayer.min', 'snowfall.jquery', 'text!templates/songView.html' ],
            
    function( $, undefined, _, Backbone, util, config, jPlayer, undefined, songViewTemplate  ) {

        var SongView = Backbone.View.extend( {
        
            events: {

                "click .jPlayerPlay": "handlePlayButtonClick",
                "click .jPlayerPause": "handlePauseButtonClick",
                "click .songCloseButton": "handleCloseButtonClick"
                
            },

            initialize: function() {

                this.render();
                
                this.positionElements();

                this.beginAnimation();
            },

            render: function() {
                
                this.$domEls =
                    util.slurpTemplate(
                        $( _.template( songViewTemplate, { songName: this.options.name } ) )
                            .appendTo( this.$el ) );
            },

            positionElements: function() {

                var _this = this;

                var closeButton = this.$domEls.songCloseButton[ 0 ];
                var modalForm = this.options.modalEls.modalBoxForm[ 0 ];
                var modalFormPosition = modalForm.position();

                var jPlayerControlContainer = $( '#jp_container_1' );

                closeButton.css( {
                    top: ( modalFormPosition.top +
                          parseInt( modalForm.css( 'margin-top' ) ) ),
                    left: modalFormPosition.left + modalForm.outerWidth() - ( closeButton.outerWidth( true ) ) } );

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
                           modalForm.outerHeight() ) - jPlayerControlContainer.outerHeight( true ),
                    left: this.$domEls.modalSong[0].position().left } );

                this.$domEls.jPlayerSeekContainer[0].width( 200 );

                this.$domEls['jp-play-bar'][0].css( { 'background-color': config.textColor } );
                this.$domEls['jp-seek-bar'][0].css( { 'background-color': config.backgroundColor } );
                
                this.$domEls['jp-audio'][0].width( this.$domEls.modalSong[0].width() );

                this.$domEls.jPlayerSeekContainer[0]
                    .height( this.$domEls.jPlayerPlay[0].height() )
                    .width( this.$domEls[ 'modalSong' ][0].width() -
                            this.$domEls.jPlayerPlay[0].outerWidth( true ) -
                            this.$domEls.jPlayerPause[0].outerWidth( true ) );

            },

            beginAnimation: function() {

               setTimeout( $.proxy( this.showNextDialogue, this ), 5000 );
               setTimeout( $.proxy( this.showNextDialogue, this ), 10000 );
               setTimeout( $.proxy( this.showNextDialogue, this ), 15000 );
            },

            showNextDialogue: function() {

                var _this = this;

                $( this.$el.find('.modalSongDialogue:visible')[0] )
                    .fadeOut( 500, function()
                        { var next = $(this).next();
                          next.fadeIn( 500 );
                          if( next.hasClass('snow') ) {
                              _this.$domEls.jPlayerPlay[0].click();
                              $('.modalBoxForm').snowfall();
                          } else if( $( this ).hasClass('snow') ) {
                              $('.modalBoxForm').snowfall( 'clear' );
                          } } );
            },

            handlePlayButtonClick: function() {

                this.$domEls.jPlayer[0].jPlayer( 'play' );
                
            },
            
            handlePauseButtonClick: function() {
                
                this.$domEls.jPlayer[0].jPlayer( 'pause' );
            },

            handleCloseButtonClick: function() {

                this.trigger( 'closeClicked' );
            }

        } );
                                                              
        return SongView;
    }
);
