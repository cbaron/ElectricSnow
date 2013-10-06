define( function() {
    
    return { 

        centerEl: function( p ) {

            p.el.css( { top: parseInt( ( p.parentEl.outerHeight( true ) - p.el.outerHeight( true ) ) / 2 ),
                        left: parseInt( ( p.parentEl.outerWidth( true ) - p.el.outerWidth( true ) ) / 2 ) } );
        },

        windowWidth: $( window ).innerWidth(),
        
        windowHeight: $( window ).innerHeight()

    }

} );
   
