$(function(){
	
	//const url = 'mongodb://localhost:27017';
	//make connection
	var socket=io.connect('http://192.168.0.137:3000')

	socket.on("refresh", (data)=>{

	//console.log(data)
	 let itm= document.getElementsByClassName("message")[0];
		document.getElementById("messages-container").innerHTML="";
		document.getElementById("messages-container").appendChild(itm);
	for (let i=0;i<data.length;i++){
	
	
let cartItem=itm.cloneNode(true);
cartItem.style.display="block";
cartItem.getElementsByClassName("text")[0].innerHTML=data[i].message;
//console.log(cartItem);
document.getElementById("messages-container").appendChild(cartItem);
}
updateScroll();
		let delete_message=document.getElementsByClassName("delete-b");
for (let i=0;i<delete_message.length;i++){
		console.log("delete this");
delete_message[i].addEventListener("click",function(event){
	//console.log(delete_message);
	socket.emit('delete_message',{message : document.getElementsByClassName("text")[i].innerHTML})
		document.getElementsByClassName("message")[i].style.display="none";
})
}
})


socket.on("hello", (data)=>{
	//console.log(data)
	for (let i=0;i<data.length;i++){
	 let itm= document.getElementsByClassName("message")[0];
	
let cartItem=itm.cloneNode(true);
cartItem.style.display="block";
cartItem.getElementsByClassName("text")[0].innerHTML=data[i].message;
//console.log(cartItem);
document.getElementById("messages-container").appendChild(cartItem);
}
updateScroll();
})
//buttons and inputs
var message= $("#message-written")
var username= $("#username")
var send_message =$("#send")
var send_username =$("#enter")
var chatroom = $("#messages-container")

let itm= document.getElementsByClassName("message")[0];
let cartItem=itm.cloneNode(true);
cartItem.style.display="block";
//Emit message 
send_message.click(function(){
	let safe_message="";
	for (let i=0;i<message.val().length;i++) {
		if (message.val().charAt(i)==='"')
			safe_message+="&quot;";
		else if (message.val().charAt(i)==='&') safe_message+="&amp;";
				else if (message.val().charAt(i)==='<') safe_message+="&lt;";
						else if (message.val().charAt(i)==='>') safe_message+="&gt;";
							else if (message.val().charAt(i)==='/') safe_message+="&#47;";
								else if (message.val().charAt(i)==='\\') safe_message+="&#92;";
									else if (message.val().charAt(i)==='\'') safe_message+="&apos;";
		
else 	safe_message+=message.val().charAt(i);
	}
	socket.emit('new_message',{message : safe_message})
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
document.getElementById("message-written").value="";
 let itm= document.getElementsByClassName("message")[0];
let cartItem=itm.cloneNode(true);
cartItem.style.display="block";
cartItem.getElementsByClassName("text")[0].innerHTML="<font color=#117743>"+data.username+"</font> at "+hrs+":"+mns+":"+ss+" "+dd +"/"+mm+"/"+yyyy +" wrote:"+"<p style=\"word-wrap: break-word;\">"+data.message+"</p>";
//console.log(cartItem);
document.getElementById("messages-container").appendChild(cartItem);
updateScroll();
			let delete_message=document.getElementsByClassName("delete-b");
for (let i=0;i<delete_message.length;i++){
		console.log("delete this");
delete_message[i].addEventListener("click",function(event){
	//console.log(delete_message);
	socket.emit('delete_message',{message : document.getElementsByClassName("text")[i].innerHTML})
		document.getElementsByClassName("message")[i].style.display="none";
})
}
	//chatroom.append("<p class='message'>"+cartItem+data.username+dd +"/"+mm+"/"+yyyy +": "+data.message+"</p")
})
//Emit a username
send_username.click(function(){
	//console.log(username.val())
	if (username.val()==="calmBlooper"||username.val()==="Voldemar") {

let butts = document.getElementsByClassName("delete-b");
for (let i=0;i<butts.length;i++){
	butts[i].innerHTML="DELETE";
	butts[i].style.display="inline-block";
			let delete_message=document.getElementsByClassName("delete-b");
for (let i=0;i<delete_message.length;i++){
		//console.log("delete this");
delete_message[i].addEventListener("click",function(event){
//	console.log(delete_message[i]);
		socket.emit('delete_message',{message : document.getElementsByClassName("text")[i].innerHTML})
		document.getElementsByClassName("message")[i].style.display="none";
})
}
}
	}
	else {
		let butts = document.getElementsByClassName("delete-b");
for (let i=0;i<butts.length;i++){
	butts[i].innerHTML="DELETE";
	butts[i].style.display="none";

}
	}
	socket.emit('change_username', {username : username.val()})
	updateScroll();
})

});
function updateScroll(){
    var element = document.getElementById("messages-container");
    element.scrollTop = element.scrollHeight;
}
