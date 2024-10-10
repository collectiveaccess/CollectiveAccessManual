---
title: External_applications.conf
---

Several components of CollectiveAccess employ external applications to
perform various tasks. Typically these tasks relate to conversion and
reformatting of uploaded media (images, video, audio, etc.) and indexing
of text embedded in uploaded files.

The *external_applications.conf* file defines the locations of these
applications on your server. If an application location is set
incorrectly or the application is not installed then the functionality
provided by the application will not be available within
CollectiveAccess.

The locations you set should be absolute paths to the directory or
executable (as specified below) in the standard format for your OS (Unix
paths or Windows paths).

# Directives

The following entries may be defined in this configuration file. Note
that there are no default values for entries in
*external_applications.conf*. You must define a value for all
applications you wish to use.

  ------------------------------------------------------------------------------------------------------
  Entry               Description                                         Typical value (not default:
                                                                          just an example in Unix path
                                                                          format)
  ------------------- --------------------------------------------------- ------------------------------
  ghostscript_app     Path to Ghostscript binary (\"gs\" command) used to /usr/local/bin/gs
                      generate page images from PDF files                 

  ffmpeg_app          Path to ffmpeg binary used to convert video and     /usr/local/bin/ffmpeg
                      audio media                                         

  qt-faststart_app    Path to \[ttp://ffmpeg.mplayerhq.hu qt-faststart\]  /usr/local/bin/qt-faststart
                      binary used to hint h.264/MPEG-4 video for          
                      streaming. qt-faststart is part of ffmpeg and       
                      located in the tools/ directory in the source tree. 

  dcraw_app           Path to dcraw binary used to convert various        /usr/bin/dcraw
                      proprietary RAW formats produced by digital cameras 

  imagemagick_path    Path to directory containing ImageMagick binaries   /usr/local/bin
                      used to convert various image formats. Note that    
                      unlike the other entries in this file,              
                      imagemagick_path refers to a directory rather than  
                      a specific executable                               

  pdftotext_app       Path to pdftotext binary (part of the xpdf package  /usr/local/bin/pdftotext
                      from) used to extract text embedded in PDF files    

  media_info_app      Path to MediaInfo binary used to extract metadata   /usr/local/bin/mediainfo
                      from media files. MediaInfo is optional and is used 
                      if present because it generally does a better job   
                      of extracting metadata than the methods built into  
                      CA and its media processing plugins.                

  libreoffice_app     Path to LibreOffice 3.6 or better binary used to    /usr/bin/libreoffice
                      process uploaded Microsoft Word, Excel and          
                      PowerPoint files. If you wish to have Word, Excel   
                      and PowerPoint content indexed for search and       
                      previews generated, you must have LibreOffice       
                      installed. See this cookbook entry for more         
                      information.                                        

  pdfminer_app        Path to the directory containing the PDFMiner       /usr/local/bin
                      script used to analyze uploaded PDF files. Like     
                      PDFToText, PDFMiner can extract text for indexing   
                      from PDF files. It can also extract page locations  
                      for individual words, enabling search-within-PDF    
                      functionality in CollectiveAccess. If you want to   
                      search within PDFs with term highlighting in CA     
                      PDFMiner must be installed.                         

  exiftool_app        Path to the ExifTool application                    /usr/bin/exiftool
                      (http://www.sno.phy.queensu.ca/~phil/exiftool/)   
                      used to extract metadata from uploaded media files. 

  phantomjs_app       Path to the PhantomJS HTML-to-PDF converter         /usr/local/bin/phantomjs
                      (http://phantomjs.org) used to generate printable 
                      PDF output.                                         

  wkhtmltopdf_app     Path to the wkhtmltopdf HTML-to-PDF converter       /usr/local/bin/wkhtmltopdf
                      (http://wkhtmltopdf.org) used to generate         
                      printable PDF output.                               

  openctm_app         Path to the OpenCTM                                 /usr/local/bin/ctmconv
                      (http://openctm.sourceforge.net) ctmconv command  
                      line utility used to compress PLY and STL 3d models 
                      for high efficient delivery and in-browser display. 
                      (From version 1.6)                                  

  meshlabserver_app   Path to the MeshLab                                 /usr/local/bin/meshlabserver
                      (http://meshlab.sourceforge.net) meshlabserver    
                      command-line utility, used to convert PLY files to  
                      STL. (From version 1.6)                             
  ------------------------------------------------------------------------------------------------------
