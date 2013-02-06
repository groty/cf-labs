CertMain
=======
Originally By Paul Connel, (http://www.paulconnell.info/) I've taken Control and Maintenance of this RiaForge Project.

CertMan is A Coldfusion Administrator Extension that allows adding/viewing/removing of SSL certificates in the Java certificate store from within the Administrator.

It Runs on CFMX7/CF8/CF9/CF10

You WILL need access to the CFIDE/administrator directory.

Two versions are available here - CF7 8 and 9 and one for CF10 - but try both if you get an error in one - due to the older version using deprecated Java calls - it's not Coldfusion as such that is the issue but the VERSION of Java it is running on.  CF10 version tested on 1.6.0_29.

Technical version:- Calls to getCommonDN() to get the certificate name are deprecated in later verions of Java and I needed to move them to getX500Principal() and process the list string I got from that instead.  Other tweaks are just textual - everything else seems to work fine.