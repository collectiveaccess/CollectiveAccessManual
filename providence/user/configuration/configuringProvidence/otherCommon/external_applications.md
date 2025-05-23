---
title: External_applications.conf
---

## External_applications.conf

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

## Directives

The following entries may be defined in this configuration file. Note
that there are no default values for entries in
*external_applications.conf*. You must define a value for all
applications you wish to use.


| Entry | Description | Typical value (not default: just an example in Unix path format
|----|----|----|
|ghostscript_app|Path to Ghostscript binary (“gs” command) used to generate page images from PDF files|/usr/local/bin/gs|
|ffmpeg_app |Path to ffmpeg binary used to convert video and audio media|/usr/local/bin/ffmpeg|
|qt-faststart_app|Path to [ttp://ffmpeg.mplayerhq.hu qt-faststart] binary used to hint h.264/MPEG-4 video for streaming. qt-faststart is part of ffmpeg and located in the tools/ directory in the source tree.|/usr/local/bin/qt-faststart|
|dcraw_app|Path to dcraw binary used to convert various proprietary RAW formats produced by digital cameras|/usr/bin/dcraw|
|imagemagick_path|Path to directory containing ImageMagick binaries used to convert various image formats. Note that unlike the other entries in this file, imagemagick_path refers to a directory rather than a specific executable|/usr/local/bin|
|pdftotext_app|Path to pdftotext binary (part of the xpdf package from) used to extract text embedded in PDF files|/usr/local/bin/pdftotext|
|media_info_app|Path to MediaInfo binary used to extract metadata from media files. MediaInfo is optional and is used if present because it generally does a better job of extracting metadata than the methods built into CA and its media processing plugins.|/usr/local/bin/mediainfo|
|libreoffice_app|Path to LibreOffice 3.6 or better binary used to process uploaded Microsoft Word, Excel and PowerPoint files. If you wish to have Word, Excel and PowerPoint content indexed for search and previews generated, you must have LibreOffice installed. See this cookbook entry for more information.|/usr/bin/libreoffice|
|pdfminer_app|Path to the directory containing the PDFMiner script used to analyze uploaded PDF files. Like PDFToText, PDFMiner can extract text for indexing from PDF files. It can also extract page locations for individual words, enabling search-within-PDF functionality in CollectiveAccess. If you want to search within PDFs with term highlighting in CA PDFMiner must be installed.|/usr/local/bin|
|exiftool_app|Path to the ExifTool application (http://www.sno.phy.queensu.ca/~phil/exiftool/) used to extract metadata from uploaded media files.|/usr/bin/exiftool|
|phantomjs_app|Path to the PhantomJS HTML-to-PDF converter (http://phantomjs.org) used to generate printable PDF output.|/usr/local/bin/phantomjs|
|wkhtmltopdf_app|Path to the wkhtmltopdf HTML-to-PDF converter (http://wkhtmltopdf.org) used to generate printable PDF output.|/usr/local/bin/wkhtmltopdf|
|openctm_app|Path to the OpenCTM (http://openctm.sourceforge.net) ctmconv command line utility used to compress PLY and STL 3d models for high efficient delivery and in-browser display. (From version 1.6)|/usr/local/bin/ctmconv|
|meshlabserver_app|Path to the MeshLab (http://meshlab.sourceforge.net) meshlabserver command-line utility, used to convert PLY files to STL. (From version 1.6)|/usr/local/bin/meshlabserver|
