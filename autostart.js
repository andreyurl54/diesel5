(function () {
'use strict';

function pluginStart() {
  
/* АвтоЗапуск */
     Lampa.Storage.listener.follow('change', function (event) {
        if (Lampa.Storage.field('Diesel_Auto_Start') == true) {       
            if (event.name == 'start_page' || 'activity') {
		localStorage.setItem('activity', '{"id":0,"url":"' + diesel_playlist + '","title":"Дизель ТВ","groups":[],"currentGroup":"' + localStorage.getItem('Diesel_startGroup') +'","component":"diesel_iptv","page":1}');
                localStorage.setItem('start_page', 'last');
            };
			/*
            if (event.name == 'activity') {
                localStorage.setItem('activity', '{"id":0,"url":"' + diesel_playlist + '","title":"Дизель ТВ","groups":[],"currentGroup":"Russia","component":"diesel_iptv","page":1}');
                localStorage.setItem('start_page', 'last');
            } */
        }
    });


}
 if (!!window.appready) pluginStart();
else Lampa.Listener.follow('app', function(e){if (e.type === 'ready') pluginStart()});
})();
