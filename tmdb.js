(function () {
    'use strict';

    var timer = setInterval(function(){
        if(typeof Lampa !== 'undefined'){
            clearInterval(timer);
            start();
           }
    },10);

      function start(){

        var plugins = Lampa.Storage.get('plugins');

        var plugin_add = JSON.stringify('{"url": "http://cub.watch/plugin/tmdb-proxy","status": 1,"name": "TMDB Proxy","author": "@lampa"}')

        plugins.push(plugin_add)
        Lampa.Storage.set('plugins', plugins);

        Lampa.Utils.putScript('http://cub.watch/plugin/tmdb-proxy', true);


    }
})();
