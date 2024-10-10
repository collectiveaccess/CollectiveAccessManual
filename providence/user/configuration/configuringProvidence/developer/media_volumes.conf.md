---
title: Media_volumes.conf
---

-   [Organization](#organization)
-   [FTP Mirror Configuration](#ftp-mirror-configuration)

CollectiveAccess stores uploaded media and derivatives in the media
directory.

You can change the location where media is stored by editing the media
volumes configuration file in `app/conf/media_volumes.conf`.

# Organization

The file includes an entry per volume.

  Key                 Description                                                                                                                                        Example
  ------------------- -------------------------------------------------------------------------------------------------------------------------------------------------- ------------------------------
  hostname            Hostname                                                                                                                                           \<site_hostname\>
  protocol            Protocol (ftp, http\[s\], etc.)                                                                                                                    \<site_protocol\>
  urlPath             Base path for exposing the media on this volume                                                                                                    \<ca_media_url_root\>/images
  absolutePath        Absolute filesystem path for the volume                                                                                                            \<ca_media_root_dir\>/images
  writeable           A flag to indicate if the volume is writeable or not                                                                                               1
  description         Description of the volume                                                                                                                          Images
  accessUsingMirror   Name of mirror to serve media from, when available. If the specified mirror does not yet have the required media, the local copy will be served.   
  mirrors             An associative array of available mirrors. Content will be copied to each of them                                                                  

# FTP Mirror Configuration

The mirror configuration directives are:

  Directive        Description                                                                                                                                                                                                                           Example
  ---------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- --------------------------
  method           How the files are to be mirrored. Only FTP is currently supported. ftp (must be lowercase)                                                                                                                                            ftp
  hostname         The hostname of the server to while the files will be mirrored.                                                                                                                                                                       ftp.mymirror.com
  username         The username to use when logging into the mirror server. (Ask your server administrator if you are unsure)                                                                                                                            user
  password         The password to use when logging into the mirror server. (Ask your server administator if you are unsure)                                                                                                                             password
  directory        The directory into which to upload the mirrored media files. In general this should be an absolute path, but depending upon how your FTP login is setup it may be a relative path. (As your server administrator if you are unsure)   /usr/local/ftp/ca/images
  passive          If set to \'1\' (the number one) then passive FTP connections are used. Passive connections are usually required if you are behind a firewall.                                                                                        1
  accessProtocol   The protocol to use in URLs that reference media on this mirror server. For simple web-served media like images this will usually be http or https. For streaming media this may be http, rtsp or rtmp.                               http
  accessHostname   The hostname to use in URLs that reference media on this mirror server. This is often, but not necessarily, the same as the hostname directive.                                                                                       www.mymirror.com
  accessUrlPath    The URL path (the part after the hostname) used to reference media on this mirror server. This is often, but not necessarily, the subset of the path set in the directory directive that is relative to a web server root.            /ca/images
