define(

    [ 'jquery',
      'jqueryUI',
      'underscore',
      'backbone',
      'util',
      'config',
      'text!templates/modalBox.html',
      'css!styles/modal'
     ],
            
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

                this.templateData = util.slurpTemplate( _.template( modalBoxTemplate, { } ) );
                
                $('body').append( this.templateData.$template );

                this.addContent( this.options );
                
                return this;
            },

            addContent: function( options ) {

                this.options = options;

                this.templateData.parts.title.text( ( this.options.title ) ? this.options.title : '' );

                this.templateData.parts.form.append( this.options.content );

                this.sizePositionStyle();
            },

            handleKeyPress: function( e ) {

                if( e.keyCode == 27 ) { this.closeDialogue(); }

                if( e.keyCode == 13 ) { this.affirmDialogue(); }
            },

            handleClick: function( e ) {

                if( ! $.contains( this.templateData.parts.content.get(0), e.target ) ) {
                    this.closeDialogue();
                }
            },

            //make this public interface
            sizePositionStyle: function() {

                var parts = this.templateData.parts;

                parts.container.show();
                var contentHeight = parts.content.outerHeight( true );
                var contentWidth = parts.content.outerWidth( true );
                parts.container.hide();

                if( this.options.height ) {

                    parts.content.height( this.options.height );
                    contentHeight = this.options.height;
                    parts.form.height( contentHeight - parts.title.outerHeight( true ) );
                }

                if( this.options.width ) {

                    parts.content.width( this.options.width );
                    contentWidth = this.options.width;
                }

                parts.form.css( this.options.containerStyle || { } );

                parts.content.css( { top: ( ( util.windowHeight - ( contentHeight ) ) / 2 ),
                                             left: ( ( util.windowWidth - ( contentWidth ) ) / 2 ) } );

                parts.container.show( 'slow', $.proxy( this.afterShow, this ) );
            },

            afterShow: function() {

                $( this.templateData.parts.container.find('input')[0] ).focus();

                util.$document.on( 'keydown', $.proxy( this.handleKeyPress, this ) );
                util.$document.on( 'click', $.proxy( this.handleClick, this ) );
                
                this.trigger( 'contentRendered', this.templateData.parts );
            },

            closeDialogue: function() {

                var parts = this.templateData.parts;

                parts.title.text('');
                parts.form.empty();
                parts.container.hide();

                util.$document.off( 'keydown', this.handleKeyPress );
                util.$document.off( 'click', this.handleClick );

                this.trigger( 'closingModal' );
            },

            affirmDialogue: function() {
            }

        } );

        return ModalView;
    }
);
