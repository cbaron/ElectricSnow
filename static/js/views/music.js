define(

    [ 'jquery', 'jqueryUI', 'underscore', 'backbone', 'util', 'config', 'views/modal', 'views/song', 'text!templates/musicPage.html' ],
            
    function( $, undefined, _, Backbone, util, config, ModalView, SongView, musicPageTemplate  ) {

        var MusicView = Backbone.View.extend( {
        
            el: $('#pageContainer'),

            events: {

                'click .playButton': 'playMusic',
                
                'click .purchaseMusic': 'purchaseMusic'
            },

            initialize: function() {

                this.songs = config.songs;

                this.render();

            },

            render: function() {

                for( var i = 0, ii = this.songs.length; i < ii; i++ ) {

                    var songInfo = this.songs[ i ];

                    songInfo.$songContent =
                        $( _.template( musicPageTemplate, { name: songInfo.name, index: i } ) )
                            .appendTo( this.$el );

                    songInfo.$els = util.slurpTemplate( songInfo.$songContent );

                    _.each( songInfo.$els.playButton.concat( songInfo.$els.purchaseButton ),
                            function( $el, undefined, undefined ) {
                                $el.css( { 'background-color': config.backgroundColor,
                                   'color': config.textColor } ) } );
                   
                    songInfo.$els.playButtonText[0].css( {
                        top: ( ( songInfo.$els.playButton[0].outerHeight( true ) -
                                 songInfo.$els.playButtonText[0].outerHeight( true ) ) / 2 ) } );
                }

            },

            playMusic: function( e ) {

                var modalOptions = {
                    el: $( 'body' ),
                    containerStyle: { 'background-color': config.backgroundColor },
                    height: util.windowHeight * .50,
                    width: util.windowWidth * .75 }

                if( this.modalView === undefined ) {

                    this.modalView = new ModalView( modalOptions );
                
                } else {

                    this.modalView.addContent( modalOptions );
                }

                var songView =
                    new SongView( {
                        el: this.modalView.$els.modalBoxForm[0],
                        file: this.songs[ $( e.currentTarget ).attr( 'data-index' ) ].file,
                        name: this.songs[ $( e.currentTarget ).attr( 'data-index' ) ].name,
                        modalEls: this.modalView.$els
                    } );

                this.modalView.listenTo( songView, 'closeClicked', this.modalView.closeDialogue );

            },
            
            purchaseMusic: function() {

            },

            navigate: function() {

                this.content.remove();

                this.options.appRouter.navigate( 'music', { trigger: true } ); 

            }

        } );
                                                              
        return MusicView;
    }
);
