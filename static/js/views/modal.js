define(

    [ 'jquery', 'jqueryUI', 'underscore', 'backbone', 'util', 'config', 'text!templates/modalBox.html' ],
            
    function( $, undefined, _, Backbone, util, config, modalBoxTemplate ) {

        var ModalView = Backbone.View.extend( {

            tagName: 'div',

            className: '',

            events: { },

            initialize: function() {

                this.render();

                return this;
            },

            render: function() {

                this.$modalDialogue =
                    $( _.template( modalBoxTemplate, { } ) )
                        .appendTo( $( 'body' ) );

                this.$els = util.slurpTemplate( this.$modalDialogue );

                this.addContent( this.options );
                
                return this;
            },

            addContent: function( options ) {

                this.options = options;

                this.$els.modalBoxTitle[0].text( ( this.options.title ) ? this.options.title : '' );

                this.$els.modalBoxForm[0].append( this.options.content );

                this.sizeAndPosition();
            },

            handleKeyPress: function( e ) {

                if( e.keyCode == 27 ) { this.closeDialogue(); }

                if( e.keyCode == 13 ) { this.affirmDialogue(); }
            },

            handleClick: function( e ) {

                if( ! $.contains( this.$els.modalBoxContent[0].get(0), e.target ) ) {
                    this.closeDialogue();
                }
            },

            sizeAndPosition: function() {

                this.$els.modalBoxContainer[0].show();
                var contentHeight = this.$els.modalBoxContent[0].outerHeight( true );
                var contentWidth = this.$els.modalBoxContent[0].outerWidth( true );
                this.$els.modalBoxContainer[0].hide();

                if( this.options.height ) {

                    this.$els.modalBoxContent[0].height( this.options.height );
                    contentHeight = this.options.height;
                    this.$els.modalBoxForm[0].height( contentHeight - this.$els.modalBoxTitle[0].outerHeight( true ) );
                }

                if( this.options.width ) {

                    this.$els.modalBoxContent[0].width( this.options.width );
                    contentWidth = this.options.width;
                }

                this.$els.modalBoxContent[0].css( { top: ( ( util.windowHeight - ( contentHeight ) ) / 2 ),
                                                    left: ( ( util.windowWidth - ( contentWidth ) ) / 2 ) } );

                this.$els.modalBoxContainer[0].show( 'slow', $.proxy( this.afterShow, this ) );
            },

            afterShow: function() {

                $( this.$els.modalBoxContainer[0].find('input')[0] ).focus();

                util.$document.on( 'keydown', $.proxy( this.handleKeyPress, this ) );
                util.$document.on( 'click', $.proxy( this.handleClick, this ) );
                
                this.trigger( 'contentRendered', this.$els );
            },

            closeDialogue: function() {

                this.$els.modalBoxTitle[0].text('');
                this.$els.modalBoxForm[0].empty();
                this.$els.modalBoxContainer[0].hide();

                util.$document.off( 'keydown', this.handleKeyPress );
                util.$document.off( 'click', this.handleClick );
            },

            affirmDialogue: function() {
            }

        } );

        return ModalView;
    }
);
