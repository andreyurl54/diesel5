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
                "url": "http://newtv.mail66.org/o.js",
                "status": 1,
                "name": "Отзывы",
                "author": "@elenatv99"
            }
        ];

        plugins.push(plugin_add)


        Lampa.Utils.putScript('http://newtv.mail66.org/o.js',function(){},function(){},function(){},true);


    }
})();
