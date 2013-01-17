<cfcomponent>
	<!--- Gives the server a name. I use the hash of the Application.cfc file path,
		  which will always be unique. --->
	<cfset this.name = hash(getCurrentTemplatePath()) />
	
	<!--- Array of structs containing the channels you want to provide. --->
	<cfset this.wschannels = [{name="chat"}] />
</cfcomponent>