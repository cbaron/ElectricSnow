define(

    [ 'app', 'underscore', 'css!styles/app' ],
    
    function( App, _ ) {

        _.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };

        App.initialize();
    }
);
