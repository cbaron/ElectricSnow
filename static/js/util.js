define( ['jquery', 'underscore' ], function( $, _ ) {
    
    return { 

        windowWidth: $( window ).width(),
        
        windowHeight: $( window ).height(),

        $document: $( document ),

        centerEl: function( p ) {

            p.el.css( { top: parseInt( ( p.parentEl.outerHeight( true ) - p.el.outerHeight( true ) ) / 2 ),
                        left: parseInt( ( p.parentEl.outerWidth( true ) - p.el.outerWidth( true ) ) / 2 ) } );
        },

        slurpTemplate: function( template ) {

           var $template = $( template );

           var $dataJsElements = _.filter( $template, function( element ) { return $( element ).is( '[data-js]'); } ),
               parts = { }

           _.each( $template.get(),
                   function( element ) {
                       var dataJsDescendants = $( element ).find( '*[data-js]' );
                       if( dataJsDescendants.length ) {
                           $dataJsElements = $dataJsElements.concat( dataJsDescendants.get() )
                       }
                   }
                 );

            _.each( $dataJsElements,

                function( element ) {

                    var $element = $( element );

                    var dataJs = $element.attr( 'data-js' );
                    $element.removeAttr( 'data-js' );

                    if( !( dataJs in parts ) ) {

                        parts[ dataJs ] = $element;

                    } else if( Array.isArray( parts[ dataJs ] ) ) {

                        parts[ dataJs ].push( $element );

                    } else {

                        parts[ dataJs ] = [ parts[ dataJs ], $(element) ];
                    }
                }
            );

            return {
                $template: $template,
                parts: parts
            }
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
