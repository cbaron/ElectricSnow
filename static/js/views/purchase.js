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

                this.styleElements();
            },

            render: function() {
                
                this.$domEls =
                    util.slurpTemplate(
                        $( _.template( purchaseViewTemplate, { } ) )
                            .appendTo( this.$el ) );

                Stripe.setPublishableKey('pk_test_axWWCrf8PMb5dlAeRzGOuigc');
            },

            positionElements: function() {

                var closeButton = this.$domEls.songCloseButton[ 0 ];
                var inputsDiv = this.$domEls.purchaseInputFields[ 0 ];
                var paymentButton = this.$domEls.paymentButton[ 0 ];

                var modalForm = this.options.modalEls.modalBoxForm[ 0 ];
                var modalFormPosition = modalForm.position();

                closeButton.css( {
                    top: ( modalFormPosition.top +
                          parseInt( modalForm.css( 'margin-top' ) ) ),
                    left: modalFormPosition.left + modalForm.outerWidth() - ( closeButton.outerWidth( true ) ) } );

                inputsDiv.css( {
                    left: ( this.$domEls.modalPurchaseView[0].outerWidth( true ) - inputsDiv.outerWidth( true ) ) / 2 } );
                
                paymentButton.css( {
                    left: ( inputsDiv.outerWidth( true ) - paymentButton.outerWidth( true ) ) / 2 } );

            },

            styleElements: function() {

                this.$domEls.paymentButton[0].css( { 'color': config.backgroundColor } );
            },
 
            handlePayButtonSubmission: function( e ) {
        
                // Disable the submit button to prevent repeated clicks
                this.$domEls.paymentForm[0].find('button').prop( 'disabled', true );

                Stripe.card.createToken( this.$domEls.paymentForm[0], $.proxy( this.stripeResponseHandler, this ) );

                // Prevent the form from submitting with the default action
                return false;
            },

            stripeResponseHandler: function( status, response ) {
               
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
