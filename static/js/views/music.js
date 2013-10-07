define(

    [ 'jquery', 'jqueryUI', 'underscore', 'backbone', 'util', 'config', 'views/modal', 'text!templates/musicPage.html' ],
            
    function( $, undefined, _, Backbone, util, config, ModalView, musicPageTemplate  ) {

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
                        $( _.template( musicPageTemplate, { name: songInfo.name } ) )
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

            playMusic: function() {

                var modalView =
                    new ModalView( {
                        el: $( 'body' ),
                        content: $( '<div>supson</div>' ) } );

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
