<cfscript>
        SetupObject = createObject('component','#request.master.cfcPath#.Setup');
		if (server.ColdFusion.ProductName CONTAINS "Railo"){
	   request.cf_server = "Railo";
	   request.server_version = listFirst(server.railo.version);
       } else if (server.ColdFusion.ProductName CONTAINS "BlueDragon") {
	   request.cf_server = "BlueDragon";	
	   request.server_version = server.coldfusion.productversion;
       } else if (server.ColdFusion.ProductName CONTAINS "ColdFusion") {
	   request.cf_server = "ColdFusion";
	   request.server_version = server.coldfusion.productversion;
       }
	  
		</cfscript>