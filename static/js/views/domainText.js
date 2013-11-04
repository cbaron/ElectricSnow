define(

    [ 'jquery',
      'underscore',
      'backbone',
      'util',
      'config',
      'text!templates/domainText.html',
      'css!styles/domainText',
      'jqueryUI',
    ],
            
    function( $, _, Backbone, util, config, domainTextTemplate ) {

        var DomainTextView = Backbone.View.extend( {
        
            el: $('#pageContainer'),

            events: { },

            initialize: function() {

                this.render();
            },

            render: function() {

                this.templateData =
                    util.slurpTemplate(
                        _.template( domainTextTemplate, {} ) );

                this.$el.append( this.templateData.$template );

                this.templateData.parts.domainText.css( {
                    'color': config.backgroundColor,
                    'left': ( ( util.windowWidth - this.templateData.parts.domainText.outerWidth( true ) ) / 2 ),
                    'top': util.windowHeight * .75 } );
            }

        } );
                                                              
        return DomainTextView;
    }
);
