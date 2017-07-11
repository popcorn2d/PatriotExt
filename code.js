 function getXmlHttp() {
     var xmlhttp;
     try {
         xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
     } catch (e) {
         try {
             xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
         } catch (E) {
             xmlhttp = false;
         }
     }
     if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
         xmlhttp = new XMLHttpRequest();
     }
     return xmlhttp;
 }

 function addPost() {
     var url = url_test;
     var xmlhttp = getXmlHttp(); // Создаём объект XMLHTTP
     xmlhttp.open('POST', 'https://detigtn.ru/api/request.php', true); // Открываем асинхронное соединение
     xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Отправляем кодировку
     xmlhttp.send("url=" + encodeURIComponent(url) + "&time=" + encodeURIComponent(Date.now())); // Отправляем POST-запрос
     xmlhttp.onreadystatechange = function() { // Ждём ответа от сервера
         if (xmlhttp.readyState == 4) { // Ответ пришёл
             if (xmlhttp.status == 200) { // Сервер вернул код 200 (что хорошо)
                 document.getElementById("result").innerHTML = xmlhttp.responseText; // Выводим ответ сервера
             }
         }
     }
 }

 function findUrl() {
     // создаем новый элемент div
     // и добавляем в него немного контента
     // добавляем только что созданый элемент в дерево DOM
     chrome.tabs.query({
         currentWindow: true,
         active: true
     }, function(tabs) {
         url_test = tabs[0].url; // Ссылка с активного таба в браузере
         addPost();
     });
 }
 document.addEventListener("DOMContentLoaded", function() {
     document.getElementById("add").addEventListener("click", findUrl);
 });