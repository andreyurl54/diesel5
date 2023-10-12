(async function() { 
	'use strict';
function startMe() {

	var lastClickTime = 0;
    Lampa.Keypad.listener.follow('keydown', function (e) {
		if (code == 8 || code == 27 || code == 461 || code == 10009 || code == 88 || code === 461) {
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
