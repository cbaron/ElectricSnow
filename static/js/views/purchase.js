define(

    [ 'jquery', 'jqueryUI', 'underscore', 'backbone', 'util', 'config', 'stripe', 'text!templates/purchaseView.html' ],
            
    function( $, undefined, _, Backbone, util, config, Stripe, purchaseViewTemplate  ) {

        var PurchaseView = Backbone.View.extend( {
        
            events: {

                "submit #payment-form": "handlePayButtonSubmission"
                
            },

            initialize: function() {

                this.render();

                this.positionElements();
                
            },

            render: function() {
                
                this.$domEls =
                    util.slurpTemplate(
                        $( _.template( purchaseViewTemplate, { } ) )
                            .appendTo( this.$el ) );
            },

            positionElements: function() {

                var closeButton = this.$domEls.songCloseButton[ 0 ];
                var modalForm = this.options.modalEls.modalBoxForm[ 0 ];
                var modalFormPosition = modalForm.position();

                closeButton.css( {
                    top: ( modalFormPosition.top +
                          parseInt( modalForm.css( 'margin-top' ) ) ),
                    left: modalFormPosition.left + modalForm.outerWidth() - ( closeButton.outerWidth( true ) ) } );
            },
 
            handlePayButtonSubmission: function( e ) {
        
                // Disable the submit button to prevent repeated clicks
                this.$domEls.paymentForm[0].find('button').prop( 'disabled', true );

                Stripe.card.createToken( this.$domEls.paymentForm[0], $.proxy( this.stripeResponseHandler, this ) );

                // Prevent the form from submitting with the default action
                return false;
            },

            stripeResponsehandler: function( status, response ) {
               
                var $payForm = this.$domEls.paymentForm[0];

                if( response.error ) {

                    // Show the errors on the form
                    $payForm.find('.payment-errors').text( response.error.message ).end()
                            .find('button').prop( 'disabled', false );

                } else {

                    // Insert the token into the form so it gets submitted to the server
                    $payForm.append( $( '<input type="hidden" name="stripeToken" />' ).val( response.id ) );

                    // and submit
                    $payForm.get(0).submit();

                  }
            }

        } );
                                                              
        return PurchaseView;
    }
);
