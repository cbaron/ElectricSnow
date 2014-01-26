define(

    [ 'jquery',
      'underscore',
      'backbone',
      'util',
      'config',
      'views/modal',
      'views/song',
      'views/purchase',
      'text!templates/musicPage.html',
      'text!templates/songDialogue.html',
      'jqueryUI',
      'css!styles/musicPage',
      'css!styles/songDialogue'
    ],
            
    function( $,
              _,
              Backbone,
              util,
              config,
              ModalView,
              SongView,
              PurchaseView,
              musicPageTemplate,
              songDialogueTemplate ) {

        var MusicView = Backbone.View.extend( {
        
            el: $('#pageContainer'),

            modalOptions: {
                el: $( 'body' ),
                containerStyle: { 'background-color': config.backgroundColor },
                height: util.windowHeight * .50,
                width: util.windowWidth * .75 },

            events: {

                'click .playButton': 'playMusic',
                
                'click .purchaseButton': 'purchaseMusic'
            },

            initialize: function() {

                this.songs = config.songs;

                this.render();

            },

            render: function() {

                var songContainerVerticalPadding,
                    musicSectionHeight = util.windowHeight * .70;
              
                this.musicSection =
                    $( _.template( musicPageTemplate, { } ) )
                        .height( musicSectionHeight )
                        .appendTo( this.$el );

                for( var i = 0, ii = this.songs.length; i < ii; i++ ) {

                    var songInfo = this.songs[ i ];

                    songInfo.templateData =
                        util.slurpTemplate(
                            _.template( songDialogueTemplate, { name: songInfo.name, index: i } ) );

                    this.musicSection.append( songInfo.templateData.$template );

                    _.each( [ songInfo.templateData.parts.playButton,
                              songInfo.templateData.parts.purchaseButton ],
                            function( $el ) {
                                $el.css( { 'color': config.textColor } ) } );
                   
                    songInfo.templateData.parts.playButtonText.css( {
                        top: ( ( songInfo.templateData.parts.playButton.outerHeight( true ) -
                                 songInfo.templateData.parts.playButtonText.outerHeight( true ) ) / 2 ) } );

                    if( i === 0 ) {
                        songContainerVerticalPadding = parseInt(
                            ( musicSectionHeight -
                                ( songInfo.templateData.$template.outerHeight( true ) * this.songs.length ) ) /
                                    ( this.songs.length * 2 ) );
                    }

                    songInfo.templateData.$template.css( {
                        'padding-top': songContainerVerticalPadding,
                        'padding-bottom': songContainerVerticalPadding } );
                }

            },

            initializeModalDialogue: function() {

                if( this.modalView === undefined ) {

                    this.modalView = new ModalView( this.modalOptions );
                
                } else {

                    this.modalView.addContent( this.modalOptions );
                }
            },

            playMusic: function( e ) {

                this.initializeModalDialogue(); 

                this.songView =
                    new SongView( {
                        el: this.modalView.templateData.parts.form,
                        file: this.songs[ $( e.currentTarget ).attr( 'data-index' ) ].file,
                        name: this.songs[ $( e.currentTarget ).attr( 'data-index' ) ].name,
                        modalEls: this.modalView.templateData.parts
                    } );

                //poor design
                this.songView.listenToOnce( this.modalView, 'closingModal', this.songView.huehue );
                this.listenToOnce( this.modalView, 'closingModal', this.handleClosingModal );
                this.modalView.listenToOnce( this.songView, 'closeClicked', this.modalView.closeDialogue );
            },

            handleClosingModal: function() {

                this.songView = { };
            },

            purchaseMusic: function( e ) {

                this.initializeModalDialogue();

                var purchaseView =
                    new PurchaseView( {
                        el: this.modalView.templateData.parts.form,
                        modalEls: this.modalView.templateData.parts,
                        song: this.songs[ $( e.currentTarget ).attr( 'data-index' ) ].file,
                    } );

                this.modalView.listenTo( purchaseView, 'closeClicked', this.modalView.closeDialogue );
                
                Stripe.setPublishableKey('pk_test_axWWCrf8PMb5dlAeRzGOuigc');
            },

            navigate: function() {

                this.options.appRouter.navigate( 'music', { trigger: true } ); 

            },

            toggle: function() {
                
                for( var i = 0, ii = this.songs.length; i < ii; i++ ) {

                    this.songs[ i ].templateData.parts.songContainer.toggle();
                }
            }

        } );
                                                              
        return MusicView;
    }
);
