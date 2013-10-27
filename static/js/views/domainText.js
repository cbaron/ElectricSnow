define(

    [ 'jquery',
      'jqueryUI',
      'underscore',
      'backbone',
      'util',
      'config',
      'text!templates/domainText.html'
    ],
            
    function( $, undefined, _, Backbone, util, config, domainTextTemplate ) {

        var DomainTextView = Backbone.View.extend( {
        
            el: $('#pageContainer'),

            events: { },

            initialize: function() {

                this.render();
            },

            render: function() {

                this.$domEls =
                    util.slurpTemplate(
                        $( _.template( domainTextTemplate, {} ) ).appendTo( this.$el ) );

                var $domainText = this.$domEls.domainText[0];

                $domainText.css( {
                    'color': config.backgroundColor,
                    'left': ( ( util.windowWidth - $domainText.outerWidth( true ) ) / 2 ),
                    'top': util.windowHeight * .75 } );
            }

        } );
                                                              
        return DomainTextView;
    }
);
