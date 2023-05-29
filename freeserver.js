(async function() {
	'use strict';
Lampa.Platform.tv();

/* Задаём начальные значения списка серверов */
Lampa.Storage.set('FreeServ_1', 'NotFound')	//при запуске обнуляем статус сервера_1
Lampa.Storage.set('FreeServ_2', 'NotFound')	//при запуске обнуляем статус сервера_2
Lampa.Storage.set('FreeServ_3', 'NotFound')	//при запуске обнуляем статус сервера_3
Lampa.Storage.set('FreeServ_4', 'NotFound')	//при запуске обнуляем статус сервера_4
Lampa.Storage.set('FreeServ_5', 'NotFound')	//при запуске обнуляем статус сервера_5
Lampa.Storage.set('FreeServ_6', 'NotFound')	//при запуске обнуляем статус сервера_6

/* Задаём значения адресов серверов, с портом */
var server_1 = 'trs.my.to:8595';
var server_2 = 'tr.my.to:8595';
var server_3 = '176.124.198.209:8595';
var server_4 = 'Trs.ix.tc:8595';
var server_5 = 'Jaos.ix.tc:8595';
var server_6 = 'ts.ozerki.org:8090';


/* Прячем пустые значения серверов: NotFound */
setInterval(function() { 
	var element2Remove = $('.selectbox-item.selector > div:contains("NotFound")');
	if(element2Remove.length > 0) element2Remove.parent('div').hide();
}, 100); //End Interval

setITimeout(function() { 
/* Опрашиваем Сервер_1 === резервный метод */
fetch(server_1 + '/echo')												//Проверяем LocalHost
	.then(response => {
		Lampa.Storage.set('FreeServ_1', server_1) 			//если кандидат ответил на запрос
		})		
	.catch(err => Lampa.Storage.set('FreeServ_1', 'NotFound'))	//если не ответил
}, 1000)

setITimeout(function() { 
/* Опрашиваем Сервер_2 === резервный метод */
fetch(server_2 + '/echo')												//Проверяем LocalHost
	.then(response => {
		Lampa.Storage.set('FreeServ_2', server_2) 			//если кандидат ответил на запрос
		})		
	.catch(err => Lampa.Storage.set('FreeServ_2', 'NotFound'))	//если не ответил
}, 5000)
	
setITimeout(function() { 
/* Опрашиваем Сервер_3 === резервный метод */
fetch(server_3 + '/echo')												//Проверяем LocalHost
	.then(response => {
		Lampa.Storage.set('FreeServ_3', server_3) 			//если кандидат ответил на запрос
		})		
	.catch(err => Lampa.Storage.set('FreeServ_3', 'NotFound'))	//если не ответил
}, 10000)
	
setITimeout(function() { 
/* Опрашиваем Сервер_4 === резервный метод */
fetch(server_4 + '/echo')												//Проверяем LocalHost
	.then(response => {
		Lampa.Storage.set('FreeServ_4', server_4) 			//если кандидат ответил на запрос
		})		
	.catch(err => Lampa.Storage.set('FreeServ_4', 'NotFound'))	//если не ответил
}, 15000)
	
setITimeout(function() { 
/* Опрашиваем Сервер_5 === резервный метод */
fetch(server_5 + '/echo')												//Проверяем LocalHost
	.then(response => {
		Lampa.Storage.set('FreeServ_5', server_5) 			//если кандидат ответил на запрос
		})		
	.catch(err => Lampa.Storage.set('FreeServ_5', 'NotFound'))	//если не ответил
}, 20000)
	
setITimeout(function() { 
/* Опрашиваем Сервер_6 === резервный метод */
fetch(server_6 + '/echo')												//Проверяем LocalHost
	.then(response => {
		Lampa.Storage.set('FreeServ_6', server_6) 			//если кандидат ответил на запрос
		})		
	.catch(err => Lampa.Storage.set('FreeServ_6', 'NotFound'))	//если не ответил
}, 25000)


/* Формируем меню после опроса серверов */
setTimeout(function() { //выставляем таймаут для получения правильного значения в меню выбора локального сервера
	Lampa.SettingsApi.addParam({
					component: 'server',
					param: {
						name: 'freetorrserv',
						type: 'select',
						values: {
						   0: 'Не выбран',
						   1: server_1 + '',
						   2: server_2 + '', //берём значение из Storage т.к. видимость переменных ограничена
						   3: server_3 + '',
						   4: server_4 + '',
						   5: server_5 + '',
						   6: server_6 + '',
						},
						default: 0
					},
					field: {
						name: 'Бесплатный TorrServer #free',
						description: 'Нажмите для выбора сервера из списка найденных'
					},
					onChange: function (value) {
						if (value == '0') Lampa.Storage.set('torrserver_url_two', '');
						if (value == '1') Lampa.Storage.set('torrserver_url_two', server_1); //127.0.0.1
						if (value == '2') Lampa.Storage.set('torrserver_url_two', server_2); //alias for LocalHost
						if (value == '3') Lampa.Storage.set('torrserver_url_two', server_3); //ПК или Android
						if (value == '4') Lampa.Storage.set('torrserver_url_two', server_4);
						if (value == '5') Lampa.Storage.set('torrserver_url_two', server_5);
						if (value == '6') Lampa.Storage.set('torrserver_url_two', server_6);
						Lampa.Storage.set('torrserver_use_link', 'two');
						//Lampa.Storage.set('torrserver_use_link', (value == '0') ? 'one' : 'two');
						Lampa.Settings.update();
					},
					onRender: function (item) {
						setTimeout(function() {
							if($('div[data-name="freetorrserv"]').length > 1) item.hide();
							//if(Lampa.Platform.is('android')) Lampa.Storage.set('internal_torrclient', true);
							$('.settings-param__name', item).css('color','f3d900');
							$('div[data-name="freetorrserv"]').insertAfter('div[data-name="torrserver_use_link"]');
						}, 0);
					}
	});
}, 1000) // end TimeOut



 })(); 
