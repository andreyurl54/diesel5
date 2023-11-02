(function() { 
	'use strict';

function hidePorn() {
	var hideInterval = setInterval(function() {
		$('.full-start__button').on('hover:enter', function () {
			$('.selectbox-item.selector > div:contains("VIP")').parent().hide() // remove();
			if (localStorage.getItem('noporn') == '0') {
				$('.selectbox-item.selector > div:contains("VIP")').parent().show()
				clearInterval(hideInterval);
				//$('.full-start__button').on('hover:enter', function () {$('.selectbox-item.selector > div:contains("VIP")').parent().show()})
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
	//Lampa.Activity.back();
	var page = Lampa.Activity.active();
	Lampa.Activity.push({url: 'http://skaztv.online/ch.json?ua=' + Lampa.Storage.cache("skazua") + '&email=',title: 'ТВ by skaz',component: 'iptvskaz_n',page: 1});
	//setTimeout(function() {$('.full-start__button').on('hover:enter', function () {$('.selectbox-item.selector > div:contains("VIP")').parent().show()})}, 2000)
	// setTimeout(function() {location.reload()},3000)
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
}
	
function Start(){
    if (Lampa.Storage.field('noporn') == '1') hidePorn();
	Lampa.Storage.listener.follow('change', function (event) {
            if (event.name == 'noporn' && Lampa.Storage.field('noporn') == '1') {
				hidePorn();
            }
            if (event.name == 'noporn' && Lampa.Storage.field('noporn') == '0') {
				Lampa.Storage.set('noporn', '1');
				callInput();
				//location.reload();
            }
	});
}	



if (!!window.appready) Start();
else Lampa.Listener.follow('app', function(e){if (e.type === 'ready') Start()});
})();
