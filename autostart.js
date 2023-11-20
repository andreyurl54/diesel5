(function () {
'use strict';
function pluginPrepare() {
	if (!localStorage.getItem('autoStart')) localStorage.setItem('autoStart', false);
	return
}
	
function pluginStart() {
	/* АвтоЗапуск */
	pluginPrepare();
	var proxyActivity = JSON.parse(localStorage.getItem('AutoStartActivity');
	if (localStorage.getItem('AutoStartActivity') !== '') Lampa.Activity.push(proxyActivity)

	/* Меню */
	Lampa.SettingsApi.addParam({
						component: 'iptv',
						param: {
							name: 'autoStart', 	//название в Storage
							type: 'trigger', 			//доступно select,input,trigger,title,static
						},
						field: {
							name: 'Автозапуск с открытой категории', 	//Название подпункта меню
							description: 'Lampa будет запущена с открытой сейчас страницы' //Комментарий к подпункту
						},
						onChange: function (value) {
							var currentActivity = Lampa.Activity.active();
							localStorage.setItem('AutoStartActivity', currentActivity);
							Lampa.Settings.update();
						}
					});
}
	
if (!!window.appready) pluginStart();
else Lampa.Listener.follow('app', function(e){if (e.type === 'ready') pluginStart()});
})();

/*
var currentActivity = Lampa.Activity.active();
localStorage.setItem('AutoStartActivity', currentActivity);
*/
