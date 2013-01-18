// UnityWebSocket Code:
var socket = new EasyWebSocket("ws://<cfoutput>#cgi.http_host#</cfoutput>");
	    socket.onopen = function(){
		socket.send("hello world!")
	    }
	    socket.onmessage = function(event){
		alert("received "+ event.data)
	    }
