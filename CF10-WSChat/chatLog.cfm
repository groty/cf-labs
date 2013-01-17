<cfscript>
this.datasource = 'SocketChat';


username= '#evaluate('url.username')#';
Message = '#evaluate('url.message')#';
channel = '#evaluate('url.channel')#';
DateNow = '#dateformat(now(), "YYYY-MM-DD")#';

//AddChatLog =  new Query(name='AddChatLog', datasource='#this.datasource#', sql="insert into SocketChatLogs (user, message, channel, messageDate) VALUES ('#username#', '#message#', '#channel#', '#dateformat(now(), "YYYY-MM-DD")#')").execute().getResult();
</cfscript>
<cfquery name="AddChatLog" datasource="#this.DataSource#">
insert into SocketchatLogs (user, message, channel, messageDate) VALUES (<cfqueryparam value="#username#" cfsqltype="cf_sql_varchar">, <cfqueryparam value="#message#" cfsqltype="cf_sql_varchar">, <cfqueryparam value="#channel#" cfsqltype="cf_sql_varchar">, <cfqueryparam value="#datenow#" cfsqltype="cf_sql_varchar">);
</cfquery>