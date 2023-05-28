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

/* Опрашиваем Сервер_1 === резервный метод
fetch('127.0.0.1:8090/echo')												//Проверяем LocalHost
	.then(response => {
		Lampa.Storage.set('FreeServ_1', '127.0.0.1') 			//если кандидат ответил на запрос
		})		
	.catch(err => Lampa.Storage.set('FreeServ_1', 'NotFound'))	//если не ответил

*/

/* Функция опроса серверов по шаблону */
async function checkPort(ip, timeout) {
  return new Promise((resolve, reject) => {
    const startTime = new Date();
    const timer = setTimeout(() => {
      const endTime = new Date();
      //reject("Timeout reached (time elapsed: " + (endTime - startTime) + "ms)");
    }, timeout);
    const client = new XMLHttpRequest();
    client.open("HEAD", "http://" + ip + "/echo");
    client.onload = () => {
      clearTimeout(timer);
    // если сервер ответил
	  resolve("Port открыт на " + ip + " - доступен для подключения!");
		/* Если 1ое место пустое, заполняем */
		if (Lampa.Storage.get('FreeServ_1') == 'NotFound') {
		  Lampa.Storage.set('FreeServ_1', ip)
		}
		/* Если 1ое место уже заполнено и 2е пустое, заполняем 2е */
		if ((Lampa.Storage.get('FreeServ_1') !== 'NotFound')&(Lampa.Storage.get('FreeServ_2') == 'NotFound')) {
		  Lampa.Storage.set('FreeServ_2', ip)
		}
		/* Если 2ое место уже заполнено и 3е пустое, заполняем 3е */
		if ((Lampa.Storage.get('FreeServ_2') !== 'NotFound')&(Lampa.Storage.get('FreeServ_3') == 'NotFound')) {
		  Lampa.Storage.set('FreeServ_3', ip)
		}
		/* Если 3е место уже заполнено и 4ое пустое, заполняем 4ое */
		if ((Lampa.Storage.get('FreeServ_3') !== 'NotFound')&(Lampa.Storage.get('FreeServ_4') == 'NotFound')) {
		  Lampa.Storage.set('FreeServ_4', ip)
		}
		/* Если 4ое место уже заполнено и 5ое пустое, заполняем 5ое */
		if ((Lampa.Storage.get('FreeServ_4') !== 'NotFound')&(Lampa.Storage.get('FreeServ_5') == 'NotFound')) {
		  Lampa.Storage.set('FreeServ_5', ip)
		}
		/* Если 5ое место уже заполнено и 6ое пустое, заполняем 6ое */
		if ((Lampa.Storage.get('FreeServ_5') !== 'NotFound')&(Lampa.Storage.get('FreeServ_6') == 'NotFound')) {
		  Lampa.Storage.set('FreeServ_6', ip)
		}
    };
    // если сервер молчит
	client.onerror = () => {
      clearTimeout(timer);
      reject(""); // reject("Port закрыт на " + ip);
    };
    client.send();
  });
}


/* Опрос сервера_1 */
setTimeout(function() {
	checkPort(server_1, 2000); // ip, port, timeout
},500)

/* Опрос сервера_2 */
setTimeout(function() {
	checkPort(server_2, 2000); // ip, port, timeout
},1000)

/* Опрос сервера_3 */
setTimeout(function() {
	checkPort(server_3, 2000); // ip, port, timeout
},1500)

/* Опрос сервера_4 */
setTimeout(function() {
	checkPort(server_4, 2000); // ip, port, timeout
},2000)

/* Опрос сервера_5 */
setTimeout(function() {
	checkPort(server_5, 2000); // ip, port, timeout
},2500)

/* Опрос сервера_6 */
setTimeout(function() {
	checkPort(server_6, 2000); // ip, port, timeout
},3000)




/* Формируем меню после опроса серверов */
setTimeout(function() { //выставляем таймаут для получения правильного значения в меню выбора локального сервера
	Lampa.SettingsApi.addParam({
					component: 'server',
					param: {
						name: 'freetorrserv',
						type: 'select',
						values: {
						   0: 'Не выбран',
						   1: Lampa.Storage.get('FreeServ_1') + '',
						   2: Lampa.Storage.get('FreeServ_2') + '', //берём значение из Storage т.к. видимость переменных ограничена
						   3: Lampa.Storage.get('FreeServ_3') + '',
						   4: Lampa.Storage.get('FreeServ_4') + '',
						   5: Lampa.Storage.get('FreeServ_5') + '',
						   6: Lampa.Storage.get('FreeServ_6') + '',
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
						//Lampa.Settings.update();
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
}, 5000) // end TimeOut



 })(); 