define(

    [
        'jquery',
        'jqueryUI',
        'underscore',
        'backbone',
        'util',
        'config',
        'stripe',
        'text!templates/purchaseView.html',
        'css!styles/purchase'
    ],
            
    function( $, undefined, _, Backbone, util, config, Stripe, purchaseViewTemplate  ) {

        var PurchaseView = Backbone.View.extend( {
        
            events: {

                "submit #payment-form": "handlePayButtonSubmission",
                "click .closeButton": "handleCloseButtonClick"
            },

            initialize: function() {

                this.render();

                this.positionElements();

                this.styleElements();
            },

            render: function() {
                
                this.templateData =
                    util.slurpTemplate( _.template( purchaseViewTemplate, { } ) );

                this.$el.append( this.templateData.$template );

                Stripe.setPublishableKey('pk_test_axWWCrf8PMb5dlAeRzGOuigc');
            },

            positionElements: function() {

                var parts = this.templateData.parts;

                var modalForm = this.options.modalEls.form;
                var modalFormPosition = modalForm.position();

                parts.closeButton.css( {
                    top: ( modalFormPosition.top +
                          parseInt( modalForm.css( 'margin-top' ) ) ),
                    left: modalFormPosition.left + modalForm.outerWidth() - ( parts.closeButton.outerWidth( true ) ) } );

                parts.inputContainer.css( {
                    left: ( parts.container.outerWidth( true ) - parts.inputContainer.outerWidth( true ) ) / 2 } );
                
                parts.paymentButton.css( {
                    left: ( parts.inputContainer.outerWidth( true ) - parts.paymentButton.outerWidth( true ) ) / 2 } );

            },

            styleElements: function() {

                this.templateData.parts.paymentButton.css( { 'color': config.backgroundColor } );
            },
 
            handlePayButtonSubmission: function( e ) {
    
                var parts = this.templateData.parts;

                e.preventDefault();

                // Disable the submit button to prevent repeated clicks
                parts.paymentForm.find('button').prop( 'disabled', true );

                Stripe.card.createToken( parts.paymentForm, $.proxy( this.stripeResponseHandler, this ) );

                // Prevent the form from submitting with the default action
                return false;
            },

            stripeResponseHandler: function( status, response ) {
                
                var parts = this.templateData.parts;
               
                var $payForm = parts.paymentForm;

                if( response.error ) {

                    // Show the errors on the form
                    $payForm.find('.payment-errors').text( response.error.message ).end()
                            .find('button').prop( 'disabled', false );

                } else {

                    this.token = response.id;

                    $.ajax( { url: '/cgiBin/processPayment.py',
                              type: 'GET',
                              data: { stripeToken: response.id },
                              success: $.proxy( this.handlePaymentSuccess, this ) } );

                  }
            },

            handlePaymentSuccess: function( response ) {

                this.trigger( 'closeClicked' );

                if( this.token == response.id ) {
                    
                    window.location.href = '/cgiBin/downloadSong.php?song=' + encodeURIComponent( this.options.song );
                }

            },

            handleCloseButtonClick: function() {

                this.trigger( 'closeClicked' );
            }

        } );
                                                              
        return PurchaseView;
    }
);
