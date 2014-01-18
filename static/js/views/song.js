define(

    [
        'jquery',
        'underscore',
        'backbone',
        'util',
        'config',
        'jquery.jplayer.min',
        'text!templates/songView.html',
        'snowfall.jquery',
        'css!styles/songView',
        'css!styles/snow',
        'jqueryUI'
    ],

    function( $, _, Backbone, util, config, jPlayer, songViewTemplate ) {

        var SongView = Backbone.View.extend( {
        
            events: {

                "click .jPlayerPlay": "handlePlayButtonClick",
                "click .jPlayerPause": "handlePauseButtonClick",
                "click .closeButton": "handleCloseButtonClick"
            },

            initialize: function() {

                this.hue();

                this.render();
                
                this.positionElements();

                this.beginAnimation();
            },

            hue: function() {

                $.ajax( {
                    url: '/cgiBin/hue.py',
                    success: $.proxy( this.handleHue, this ) } );
            },

            render: function() {

                this.templateData =
                    util.slurpTemplate( _.template( songViewTemplate, { songName: this.options.name } ) );

                this.$el.append( this.templateData.$template );
            },

            positionElements: function() {

                var _this = this,
                    parts = this.templateData.parts,
                    closeButton = parts.closeButton,
                    modalForm = this.options.modalEls.form,
                    modalFormPosition = modalForm.position(),
                    jPlayerControlContainer = parts.jPlayerControlContainer;

                closeButton.css( {
                    top: ( modalFormPosition.top +
                          parseInt( modalForm.css( 'margin-top' ) ) ),
                    left: modalFormPosition.left + modalForm.outerWidth() - ( closeButton.outerWidth( true ) ) } );
               
                for( var i = 0, ii = parts.textContent.length; i < ii; i++ ) {
 
                    util.centerEl( {
                        el: parts.textContent[ i ],
                        parentEl: modalForm } );

                    if( i !== 0 ) { parts.textContent[ i ].hide(); }
                }

                jPlayerControlContainer.css( {
                    top: ( modalFormPosition.top +
                           parseInt( modalForm.css( 'margin-top' ) ) +
                           modalForm.outerHeight() ) - jPlayerControlContainer.outerHeight( true ),
                    left: parts.container.position().left } );

                parts.seekContainer.width( 200 );

                parts.playBar.css( { 'background-color': config.textColor } );
                parts.seekBar.css( { 'background-color': config.backgroundColor } );
                
                parts.jPlayerControlContainer.width( parts.container.width() );

                parts.seekContainer
                    .height( parts.playButton.height() )
                    .width( parts.container.width() -
                            parts.playButton.outerWidth( true ) -
                            parts.pauseButton.outerWidth( true ) );
            },

            handleHue: function( response ) {

                console.log( response );

                this.templateData.parts.jPlayer.jPlayer( {
                        
                    ready: function () {

                        //parts.jPlayer.jPlayer( "setMedia", { mp3: 'static/songs/' + _this.options.file } );
                        parts.jPlayer.jPlayer( "setMedia", {
                            mp3: '/cgiBin/getSong.py?song=' + _this.options.file +
                                 '&hue=response.hue } );
                    },
                             
                    supplied: "mp3",
                    wmode: "window",
                    smoothPlayBar: true,
                    keyEnabled: true

                } );
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
                              _this.templateData.parts.playButton.click();
                              $('.modalBoxForm').snowfall();
                          } else if( $( this ).hasClass('snow') ) {
                              $('.modalBoxForm').snowfall( 'clear' );
                          } } );
            },

            handlePlayButtonClick: function() {

                this.templateData.parts.jPlayer.jPlayer( 'play' );
            },
            
            handlePauseButtonClick: function() {
                
                this.templateData.parts.jPlayer.jPlayer( 'pause' );
            },

            handleCloseButtonClick: function() {

                this.trigger( 'closeClicked' );
            }

        } );
                                                              
        return SongView;
    }
);
