"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build(); // väntar in singalRhub som, vi reggade på program.cs

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) { // väntar in metoden recieve aktiveras, sedan visa the content som kommer
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    li.textContent = `${user} says ${message}`;
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) { // Vänta in att man trycker på knappen med detta Id
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) { // När knappen är tryckt aktivera SendMessageMetoden i CHatHub och skicka ett meddelende.
        return console.error(err.toString());
    });
    event.preventDefault();
});