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
                "url": "https://nb557.github.io/plugins/rating.js",
                "status": 1,
                "name": "Рейтинг КиноПоиск и IMDB",
                "author": "@t_anton"
            }
        ];

        plugins.push(plugin_add)


        Lampa.Utils.putScript('https://nb557.github.io/plugins/rating.js',function(){},function(){},function(){},true);


    }
})();
