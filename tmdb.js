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

        var plugins_add = [
            {
                "url": "http://cub.watch/plugin/tmdb-proxy",
                "status": 1,
                "name": "TMDB Proxy",
                "author": "@lampa"
            }
        ];

        var plugins_push = []

        plugins.push(plugin_add)


        Lampa.Utils.putScript('http://cub.watch/plugin/tmdb-proxy',function(){},function(){},function(){},true);


    }
})();
