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
	//console.log(data)
	var today = new Date();
	var ss=today.getSeconds();
	var mns=today.getMinutes();
	var hrs=today.getHours();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = String(mm + '/' + dd + '/' + yyyy);
//document.write(today);
 let itm= document.getElementsByClassName("message")[0];
let cartItem=itm.cloneNode(true);
cartItem.style.display="block";
cartItem.getElementsByClassName("text")[0].innerHTML="<font color=#117743>"+data.username+"</font> at "+hrs+":"+mns+":"+ss+" "+dd +"/"+mm+"/"+yyyy +" wrote:"+"<p style=\"word-wrap: break-word;\">"+data.message+"</p";
//console.log(cartItem);
document.getElementById("messages-container").appendChild(cartItem);
	//chatroom.append("<p class='message'>"+cartItem+data.username+dd +"/"+mm+"/"+yyyy +": "+data.message+"</p")
})
//Emit a username
send_username.click(function(){
	console.log(username.val())
	if (username.val()==="dick") {
let butts = document.getElementsByClassName("delete-b");
for (let i=0;i<butts.length;i++){
	butts[i].innerHTML="DELETE";
	butts[i].style.display="inline-block";

}
	}
	socket.emit('change_username', {username : username.val()})
})

});
