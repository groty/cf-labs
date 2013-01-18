<cfset CFFILEtst =0>
<cfset CFDIRECTORYtst=0 >
<cfset CFCOLLECTIONtst=0>
<cfset CFCONTENTtst=0>
<cfset CFEXECUTEtst=0>
<cfset CFLOGtst=0>
<cfset CFOBJECTtst=0>
<cfset CFOBJECTCACHEtst=0>
<cfset CFREGISTRYtst=0>
<cfset SetProfileStringtst=0>
<cfset CreateObjectCOMtst=0>
<cfset CreateObjectCORBAtst=0>
<cfset CreateObjectJAVAtst=0>
These are the tags we should look for I belive:

   CF tags:
      CFFILE
      CFDIRECTORY
      CFCOLLECTION
      CFCONTENT
      CFEXECUTE
      CFLOG
      CFOBJECT
      CFOBJECTCACHE
      CFREGISTRY

   CF functions:
      SetProfileString
      CreateObject(COM)
      CreateObject(CORBA)
      CreateObject(JAVA)
<style type="text/css">
    <!--
    .No {
        color: #FF0000;
        font-weight: bold;
    }    
    .Yes {
        color: #00CC00;
        font-weight: bold;
    }
    -->
</style>
<cftry> 
   <cffile action="write" addnewline="yes" charset="utf-8" file="HelloWorld.txt" output="Hello World" fixnewline="no">
   <cfcatch type="Any">
      <cfset CFFILEtst =1>
   </cfcatch>
</cftry>

<cftry>
   <CFDIRECTORY directory="C:\Sites\dev\dfgdfdfhvcvb" action="create">
   <CFDIRECTORY directory="C:\Sites\dev\dfgdfdfhvcvb" action="delete" recurse="no">
   <cfcatch type="Any">
      <cfset CFDIRECTORYtst=1>
   </cfcatch>
</cftry>

<cftry>
   <CFEXECUTE name="notepad.exe"></CFEXECUTE>
   <cfcatch type="Any">
      <cfset CFEXECUTEtst=1>
   </cfcatch>
</cftry>

<table width="150" border="1" cellspacing="2" cellpadding="0">
   <tr>
      <th>Tag</th>
      <th>Passed</th>
   </tr>
   <tr>
      <td nowrap>CFFILE = </td>
      <cfif CFFILEtst IS 1> 
         <td class="No">No</td>
      <cfelse>
         <td class="Yes">Yes</td>
      </cfif>
   </tr>
<tr>
   <td nowrap>CFDIRECTORY = </td>
   <cfif CFDIRECTORYtst IS 1> 
      <td class="No">No</td>
   <cfelse>
      <td class="Yes">Yes</td>
   </cfif>
</tr>
<tr>
   <td nowrap>CFEXECUTE = </td>
   <cfif CFEXECUTEtst IS 1> 
      <td class="No">No</td>
   <cfelse>
      <td class="Yes">Yes</td>
   </cfif>
</tr>
</table>