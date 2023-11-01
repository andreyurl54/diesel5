(function() { 
	'use strict';

function hidePorn() {
	setInterval(function() {
		$('.full-start__button').on('hover:enter', function () {
			$('.selectbox-item.selector > div:contains("VIP")').parent().remove();
		})
	}, 1000);
}

function Start(){
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

function callInput() {	
	Lampa.Input.edit({
		value: "",
		title: "Введите пароль",
		free: true,
		nosave: true
		}, function (t) {
			// неверный
			if (t !== "666") {
				Lampa.Noty.show('Пароль неверный: повторите попытку');
				// повтор ввода
				//callInput();
			// верный
			}
			if (t == "666") {
				// меняем флаг
				Lampa.Storage.set('noporn', '0');
				// перезагрузка для применения
				location.reload();
			}
		});
}

if (!!window.appready) Start();
else Lampa.Listener.follow('app', function(e){if (e.type === 'ready') Start()});
})();
