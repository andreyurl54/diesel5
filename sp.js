(function() { 
	'use strict';

function hidePorn() {
	var hideInterval = setInterval(function() {
		$('.full-start__button').on('hover:enter', function () {
			$('.selectbox-item.selector > div:contains("Ночные")').parent().hide();
			if (localStorage.getItem('noporn') == '0') {
				clearInterval(hideInterval);
				$('.selectbox-item.selector > div:contains("Ночные")').parent().show();
			}
		})
	}, 1000);
}

function notyWrong() {
	Lampa.Noty.show('Пароль неверный: повторите попытку');
}

function notyOK() {
	localStorage.setItem("noporn", "0");
	Lampa.Controller.toggle('settings');
	var page = Lampa.Activity.active();
	Lampa.Activity.push({url: 'http://skaztv.online/ch.json?ua=' + Lampa.Storage.cache("skazua") + '&email=',title: 'ТВ by skaz',component: 'iptvskaz_n',page: 1});
}

function callInput() {	
	Lampa.Input.edit({
		value: "",
		title: "Введите пароль",
		free: true,
		nosave: true
		}, function (t) {
			// верный
			if (t == "666")	notyOK();
			else notyWrong();
		});
setTimeout(function() {Lampa.Utils.trigger(document.querySelector("#orsay-keyboard"), 'click');}, 1000);
}
	
function Start(){
    if (Lampa.Storage.field('noporn') == '1') hidePorn();
	Lampa.Storage.listener.follow('change', function (event) {
            if (event.name == 'noporn' && Lampa.Storage.field('noporn') == '1') {
		    		Lampa.Settings.update();
				hidePorn();
            }
            if (event.name == 'noporn' && Lampa.Storage.field('noporn') == '0') {
		    		Lampa.Settings.update();
				Lampa.Storage.set('noporn', '1');
				callInput();
            }
	});
}	



if (!!window.appready) Start();
else Lampa.Listener.follow('app', function(e){if (e.type === 'ready') Start()});
})();
