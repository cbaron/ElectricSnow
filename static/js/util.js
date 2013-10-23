define( ['jquery'], function( $ ) {
    
    return { 

        windowWidth: $( window ).width(),
        
        windowHeight: $( window ).height(),

        $document: $( document ),

        centerEl: function( p ) {

            p.el.css( { top: parseInt( ( p.parentEl.outerHeight( true ) - p.el.outerHeight( true ) ) / 2 ),
                        left: parseInt( ( p.parentEl.outerWidth( true ) - p.el.outerWidth( true ) ) / 2 ) } );
        },

        slurpTemplate: function( $el ) {

            var rv = { };

            var rootClass = $.trim( $el.get( 0 ).className );

            if( rootClass !== '' ) {

                rv[ rootClass ] = [ $el ];
            }

            _.each( $el.find('*'),

                function( el, undefined, undefined ) {
    
                    var trimmedClassName = $.trim( el.className );

                    if( trimmedClassName !== '' ) {

                        if( !( 'trimmedClassName' in rv ) ) {

                            rv[ trimmedClassName ] = [ $(el) ];

                        } else {
                           
                            rv[ trimmedClassName ].push( $(el) );
                        }
                    }
                }
            );

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
