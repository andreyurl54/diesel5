(function () {
'use strict';
function pluginPrepare() {
	if (!localStorage.getItem('autoStart')) localStorage.setItem('autoStart', false);
	return
}
	
function pluginStart() {
	/* АвтоЗапуск */
		pluginPrepare();
		if (localStorage.getItem('AutoStartActivity')) {
		    	if (localStorage.getItem('autoStart') == 'true') {
			var proxyActivity = JSON.parse(localStorage.getItem('AutoStartActivity'));
			Lampa.Activity.push(proxyActivity)
			}
		}
	/* Меню */
		Lampa.SettingsApi.addParam({
							component: 'iptv',
							param: {
								name: 'autoStart',
								type: 'trigger',
							},
							field: {
								name: 'Автозапуск с открытой категории',
								description: 'Lampa будет запущена с открытой сейчас страницы'
							},
							onChange: function (value) {
								var currentActivity = JSON.stringify(Lampa.Activity.active());
								localStorage.setItem('AutoStartActivity', currentActivity);
								Lampa.Settings.update();
							}
						});
}
	
if (!!window.appready) pluginStart();
else Lampa.Listener.follow('app', function(e){if (e.type === 'ready') pluginStart()});

})();

