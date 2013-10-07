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
