(async function() { 
	'use strict';
function startMe() {

	var lastClickTime = 0;
    Lampa.Keypad.listener.follow('keydown', function (e) {
		if (e.code == 49 || e.code == 8 || e.code == 27 || e.code == 461 || e.code == 10009 || e.code == 88) {
			var now = new Date().getTime();
			if (now - lastClickTime < 700) {
				Lampa.Activity.out();
				if(Lampa.Platform.is('tizen')) tizen.application.getCurrentApplication().exit();
				if(Lampa.Platform.is('webos')) window.close();
				if(Lampa.Platform.is('android')) Lampa.Android.exit();
				if(Lampa.Platform.is('orsay')) Lampa.Orsay.exit();
				// alert('close');
			} else {
				lastClickTime = now;
			}		
		}
	})

/* Если всё готово */
if(window.appready) startMe();
	else {
		Lampa.Listener.follow('app', function(e) {
			if(e.type == 'ready') {
				startMe();
			}
		});
	}
}
 })(); 
