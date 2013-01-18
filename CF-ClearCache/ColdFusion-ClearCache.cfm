<cfscript>
	CFIDEPass = 'Your-CFADMIN-PASS';
      
     adminObj = createObject("component","cfide.adminapi.administrator");
     adminObj.login(CFIDEPass);

     // Instantiate the runtime object. 
     myObj = createObject("component","cfide.adminapi.runtime");

     // clear cache 
     myObj.clearTrustedCache();
     //myObj.clearTemplateCache();
     myObj.clearComponentCache();

     // Stop and restart trusted cache. However, only the clearTrustedCache function needs to be called.
     myObj.setCacheProperty("TrustedCache", 0);
     myObj.setCacheProperty("TrustedCache", 1);
	 
	
	</cfscript>