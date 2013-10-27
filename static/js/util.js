define( ['jquery', 'underscore' ], function( $, _ ) {
    
    return { 

        windowWidth: $( window ).width(),
        
        windowHeight: $( window ).height(),

        $document: $( document ),

        centerEl: function( p ) {

            p.el.css( { top: parseInt( ( p.parentEl.outerHeight( true ) - p.el.outerHeight( true ) ) / 2 ),
                        left: parseInt( ( p.parentEl.outerWidth( true ) - p.el.outerWidth( true ) ) / 2 ) } );
        },

        //TODO: 'data-js' attr
        slurpTemplate: function( $el ) {

            var rv = { };

            var addToRv =
                function( singleClass ) {
                    if( singleClass !== '' ) {
                        if( !( singleClass in rv ) ) {
                            rv[ singleClass ] = [ this ];
                        } else {
                            rv[ singleClass ].push( this );
                        }
                    } };

            _.each( $.trim( $el.get( 0 ).className ).split(' '), addToRv, $el );

            _.each(
                jQuery.makeArray( $el.siblings() ).concat( jQuery.makeArray( $el.find('*') ) ),
                function( anotherEl ) {
                    _.each( $.trim( anotherEl.className ).split(' '), addToRv, $( anotherEl ) ) } );

            return rv;
        },

        isMouseOnElement: function( p ) {

            var elementOffset = p.el.offset();

            if( p.x < elementOffset.left || p.y < elementOffset.top ||
                p.x > ( elementOffset.left + p.el.outerWidth( true ) ) ||
                p.y > ( elementOffset.top + p.el.outerHeight( true ) ) ) {

                    return false;

            } else { return true; }
        }

    }
} );
