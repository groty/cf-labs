CF Clear Cache
=======
This is a Programatic Way of Clear your Trusted Cache from within your Application, without
having to directly access your CFAdministrator.


It works best within a function like the Following:

<code>
<cfif isdefined('url.ClearCache') and url.ClearCache is "true">

...The CODE Here...

</cfif>
</code>

Enjoy.
- James