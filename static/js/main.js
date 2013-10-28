requirejs.config( {

    paths: {
        
        templates: '../templates',
        views: 'views',
    },

    shim: {
    
        'underscore': {
         
            exports: '_'
        },

        'backbone': {
          
            deps: [ 'underscore', 'jquery' ],
            
            exports: 'Backbone'
        },

        'jquery.jplayer.min': {

            deps: [ 'jquery' ],

            exports: 'jPlayer'
        },

        'stripe': {

            exports: 'Stripe'
        },

        'jqueryUI': {

            deps: [ 'jquery' ],

            exports: undefined
        },

        'snowfall.jquery': {

            deps: [ 'jquery' ],
            exports: undefined
        }


    }

} );


require(

    [ 'app' ],
    
    function( App ) {

        _.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };

        App.initialize();
    }
);
