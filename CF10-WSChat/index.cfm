<cfwebsocket name="UnityChat" onMessage="displayMessage" subscribeto="chat" />
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>CFWebChat - CFSockets</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Unity - 3.3.1 :: WS">
    <meta name="author" content="James Harvey">

    <!-- The styles -->
    <link href="assets/styles/bootstrap.css" media="all" rel="stylesheet" type="text/css" />
    <link href="assets/styles/bootstrap-responsive.css" media="all" rel="stylesheet" type="text/css" />

    <style type="text/css">
      body {
        padding-top: 60px;
        padding-bottom: 40px;
      }
      .sidebar-nav {
        padding: 9px 0;
      }
	  #chatboxdisplay{
		height: 215px;
		overflow:auto;  
	  }
	  
    </style>
    
    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <!-- The Scripts -->
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script src="assets/scripts/bootstrap.js" type="text/javascript"></script>

    <!-- Fav and touch icons -->
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="assets/icoapple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets/icoapple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets/icoapple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="assets/icoapple-touch-icon-57-precomposed.png">
    <link rel="shortcut icon" href="assets/icofavicon.png">
  </head>
  
  <body>
  <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container-fluid">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a class="brand" href="http://localhost.com/unityWS/">CFWebChat - CFSockets</a>
          
        </div>
      </div>
    </div>

<div class="container-fluid">
<div class="row-fluid">
<h3>CFWebChat - CFSockets</h3>      
</div>
<div class="row-fluid">
<div class="span12">

<div id="chatbox">
<div id="chatboxdisplay" class="well"> </div>
</div>

</div>

</div>

<div class="row-fluid">
<div class="span12">
			<div id="chatbox-input">
				
                <div id="chatbox-input-message" class="span3 pull-left">
					<input type="text" id="username" placeholder="Your Username..." />
				</div>
				<div id="chatbox-input-message" class="span7">
					<input type="text" id="message" class="span7" placeholder="Type a message..." />
				</div>
                <div class="span2 pull-right">
                <button id="send" onclick="submitMessage();" class="btn btn-primary">Send</button>
                </div>
                
			</div>
		</div>
</div>
</div>


<div class="navbar navbar-inverse navbar-fixed-bottom">
      <div class="navbar-inner">
        <div class="container-fluid">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          
          <div class="nav-collapse collapse">
              <ul class="nav">
              <li class="active"><a href="#">&copy; 2012 - 2013 Children of America - All Rights Reserved</a></li>
              </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>
<script type="text/javascript">
	$("#message").keypress(function(event) {
		if (event.which == 13) {
			submitMessage();
		}
	});

	function displayMessage (message) {
		// You may reviece messages that aren't chat messages. Messages that have data are chat messages
		if (message.data) {
			// Appends the message to a new line in the chat display
			$('#chatboxdisplay').html($('#chatboxdisplay').html() + message.data + "<br>");
		}

		// Keeps the chat scrolled to the bottom
		$("#chatboxdisplay").scrollTop($("#chatboxdisplay")[0].scrollHeight);
	}

	function submitMessage () {
		// Gets the message from the message box
		var usr = $('#username').val();
		var msg = $('#message').val();
        var cnl = 'CF10WSChat';
		// Publishes the message to everyone who is subscribed to the chat channel
		UnityChat.publish("chat", "<strong>" +usr+ ":</strong> " +msg);
        $.ajax({
            type: "POST",
            url: "chatLog.cfm?username="+usr+"&message="+msg+"&channel="+cnl,
            //data: { name: username, location:  }
            }).done(function( msg ) {
           // alert( "Data Saved: " + msg );
        });
		// Clears the message just sent
		$('#message').val('');

		// Moves cursor focus to the message box
		$('#message').focus();
	}
</script>





</body>
</html> 