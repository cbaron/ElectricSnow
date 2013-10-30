define(

    [ 'jquery',
      'jqueryUI',
      'underscore',
      'backbone',
      'util',
      'config',
      'views/modal',
      'views/song',
      'views/purchase',
      'text!templates/musicPage.html',
      'text!templates/songDialogue.html',
      'text!templates/domainText.html',
    ],
            
    function( $,
              undefined,
              _,
              Backbone,
              util,
              config,
              ModalView,
              SongView,
              PurchaseView,
              musicPageTemplate,
              songDialogueTemplate,
              domainTextTemplate ) {

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
               
                this.musicSection = $( _.template( musicPageTemplate, { } ) ).appendTo( this.$el );

                for( var i = 0, ii = this.songs.length; i < ii; i++ ) {

                    var songInfo = this.songs[ i ];

                    songInfo.$songContent =
                        $( _.template( songDialogueTemplate, { name: songInfo.name, index: i } ) )
                            .appendTo( this.musicSection );

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

            initializeModalDialogue: function() {

                if( this.modalView === undefined ) {

                    this.modalView = new ModalView( this.modalOptions );
                
                } else {

                    this.modalView.addContent( this.modalOptions );
                }
            },

            playMusic: function( e ) {

                this.initializeModalDialogue(); 

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

                this.initializeModalDialogue();

                var purchaseView =
                    new PurchaseView( {
                        el: this.modalView.$els.modalBoxForm[0],
                        modalEls: this.modalView.$els
                    } );

                this.modalView.listenTo( purchaseView, 'closeClicked', this.modalView.closeDialogue );
                
                Stripe.setPublishableKey('pk_test_axWWCrf8PMb5dlAeRzGOuigc');
            },

            navigate: function() {

                this.content.remove();

                this.options.appRouter.navigate( 'music', { trigger: true } ); 

            },

            toggle: function() {
                
                for( var i = 0, ii = this.songs.length; i < ii; i++ ) {

                    this.songs[ i ].$els.songContainer[0].toggle();
                }
            }

        } );
                                                              
        return MusicView;
    }
);
