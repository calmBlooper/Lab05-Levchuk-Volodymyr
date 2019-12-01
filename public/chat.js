$(function(){
	//make connection
	var socket=io.connect('http://localhost:3000')

//buttons and inputs
var message= $("#message-written")
var username= $("#username")
var send_message =$("#send")
var send_username =$("#enter")
var chatroom = $("#messages-container")

//Emit message 
send_message.click(function(){
	socket.emit('new_message',{message : message.val()})
})

//Listen on new message
socket.on("new_message", (data)=>{
	console.log(data)
	var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = String(mm + '/' + dd + '/' + yyyy);
//document.write(today);
	chatroom.append("<p class='message'>"+data.username+mm +today +": "+data.message+"</p")
})
//Emit a username
send_username.click(function(){
	console.log(username.val())
	if (username.val()==="dick") $(".delete-b").text("fuck it");
	socket.emit('change_username', {username : username.val()})
})

});
