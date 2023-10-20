;(function () {
    'use strict';
/*
If (Lampa.Platform.is('android')) Lampa.Noty.show('android!');
If (Lampa.Platform.is('noname')) Lampa.Noty.show('noname!');
*/
var userAgent = navigator.userAgent;
var agentFilter = userAgent.match(/Android/i);
if (Lampa.Platform.is('noname')) {
	if(agentFilter = 'Android') {
		Lampa.Noty.show('Установите АРК')
	} 
} else {
	Lampa.Noty.show('notAndroid')
}

})();
