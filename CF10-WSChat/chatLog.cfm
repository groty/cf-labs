<cfscript>
this.datasource = 'SocketChat';

username= '#evaluate('url.username')#';
Message = '#evaluate('url.message')#';
channel = '#evaluate('url.channel')#';
DateNow = '#dateformat(now(), "YYYY-MM-DD")#';

</cfscript>
<cfquery name="AddChatLog" datasource="#this.DataSource#">
insert into SocketchatLogs (user, message, channel, messageDate) VALUES (<cfqueryparam value="#username#" cfsqltype="cf_sql_varchar">, <cfqueryparam value="#message#" cfsqltype="cf_sql_varchar">, <cfqueryparam value="#channel#" cfsqltype="cf_sql_varchar">, <cfqueryparam value="#datenow#" cfsqltype="cf_sql_varchar">);
</cfquery>