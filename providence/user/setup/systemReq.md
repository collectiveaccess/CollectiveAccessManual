---
sidebar_position: 1
sidebar_label: System Requirements
#sidebar_custom_props:
#sidebar_class_name: first
---
# System Requirements

## Getting Started

Providence is a web-based application that runs on a server. Users
access the server from their own computers over a network using standard
web browser software. As with any web-based application, Providence is
designed to be accessed via the internet, enabling collaborative
cataloguing of collections by widely dispersed teams. However, you do
**not** have to make your Providence installation accessible on the
internet. It will function just as well on a local network with no
internet connectivity, or even on a single machine with no network
connectivity at all. Who gets to access your system is entirely up to
you.

Before attempting an installation verify that your server meets the
basic requirements for running Providence:

| Server Requirements | Notes |
| --- | --- |
| Operating System | Linux or Mac OS X. It is possible to set up CollectiveAccess to run under Windows 10, 11 or Windows Server 2022, but it is not officially supported.|
| Server Memory | 4 gb of RAM minimum. If you intend to have CollectiveAccess handle large image files then your server should ideally have three times the size of the largest image when uncompressed. In general more memory is always better, with 8 gb of RAM a good baseline if possible. |
| Data Storage | A simple formula for rough estimation of storage requirements requires an expected number of media items to be catalogued and an average size for those media items. Once these quantities are known an estimate can be derived using some simple arithmetic: \<storage required in mb\> = (\<# of media items\> \* \<average storage requirements per media item in mb\>) + (\<# of media items\> \* 5mb). 5mb is the high-end estimated overhead of storing derivatives (small JPEG, TilePic pan-and-zoom version, etc.) It is recommended to double the calculated storage requirements when acquiring hardware if practical. Storage requirements for your metadata and database indices, even if your database is quite large, are usually negligible compared to the storage required for media. |
| Processor | Multiple cores are desirable for the improved scalability they provide, and well as the capability to speed the processing of uploaded media. Media processing is often CPU-bound (as opposed to database operations which are often I/O bound) and lends itself to multiprocessing. It is advisable to obtain a server with at least 2 cores and, if possible, 4+ cores. |

## Core software requirements

Providence requires three open-source software packages be
installed prior to installation. Without these packages Providence
cannot run:

| Software Package | Notes |
| --- | --- |
| Webserver | [Apache](https://httpd.apache.org/) version 2.4 or [nginx](https://nginx.org) 1.26 or later are recommended.|
|[MySQL](https://dev.mysql.com/) |  Versions 8.0 and 8.4 are supported. Equivalent versions of [MariaDB](https://mariadb.org/) (10.5+) will also work. MySQL 9.0 is not currently supported.|
|[PHP](https://php.net/)|    [PHP](https://php.net/) version 8.2 or 8.3 is required. We have not yet fully validated CollectiveAccess for use with PHP 8.4. |            

The following PHP packages containing extensions are required:

- php-cli
- php-gd
- php-curl
- php-mysql (if available, prefer `mysqli`)
- php-zip
- php-xml
- php-mbstring
- php-intl
- php-bcmath
- php-gmp
- php-opcache

These extensions are often (but not always) installed by default.

The following PHP extensions are recommended:

- php-process
- php-posix
- php-gmagick (if GraphicsMagick is installed)
- php-redis (if REDIS caching server is installed)

All of these should be available as pre-compiled packages for most Linux
distributions and as installer packages for Windows. For Mac OS X,
[Brew](https://brew.sh/) is a highly recommended way to get all of CollectiveAccess\'s
prerequisites quickly up and running.


## Software requirements for installing

Collectiveaccess requires the following software in order to be installed, on top of anything listed in the core requirements:
- `composer` (can be installed via packages or [getcomposer](https://getcomposer.org/)
- `git` OR one of wget/curl and one of tar/unzip


## Caching

CollectiveAccess makes heavy use of caching. By default cached data is written to disk, which requires no additional configuration or software but can be slow and may cause spikes in server load when the cache fills and must be purged. Use of an in-memory cache such as REDIS (https://redis.io/) can provide significantly improved performance. To use REDIS you must connect a working REDIS instance to CollectiveAccess by setting the relevant configuration entries in the installation's ``setup.php`` file. You must also have the php-redis extension installed.


## Software requirements for media processing

Depending upon the types of media you intend to use with CollectiveAccess you will
also need to install various supporting software libraries and tools.
None of these is absolutely required for CollectiveAccess to install and operate but
without them specific types of media may not be supported (as noted
below).

| Software Package | Media Types | Notes |
| --- | --- | --- |
| GraphicsMagick | Images |Version 1.3.40 or better is suggested. GraphicsMagick is the preferred option for processing image files on all platforms and is better performing than any other option. Be sure to compile or obtain a version of GraphicsMagick with support for the formats you need. Support for some image formats is contingent upon other libraries being present on your server (eg. libtiff must be present for TIFF support\]). Some less common formats, such as PSD, may require special configuration and/or compilation. Note that HEIC support is not possible with GraphicsMagick alone. See below for more information on HEIC support. See https://graphicsmagick.org for more information on GraphicsMagick.|
| ImageMagick | Images | Version 7.0 or better is suggested. ImageMagick can handle more image formats than any other option but is significantly slower than GraphicsMagick in most situations. Be sure to compile or obtain a version of ImageMagick with support for the formats you need. Support for some image formats is contingent upon other libraries being present on your server (eg. libtiff must be present for TIFF support\]). See http://imagemagick.org for more information.|
| libGD | Images | A simple library for processing JPEG, GIF and PNG format images, GD is a fall-back for image processing when ImageMagick or GraphicsMagick are not available. This library is typically bundled with PHP so you should not need to install it separately. In some cases you may need to perform a manual install or use a package provided by your operating system provider. In addition to supporting a limited set of image formats, GD is typically slower than ImageMagick or GraphicsMagick for many operations. If at all possible install GraphicsMagick on your server. |
| ffmpeg | Audio, Video | Required if you want to handle video or audio media. Be sure to compile to support the file formats and codecs you require. See https://ffmpeg.org for more information.|
| OpenAI Whisper | Audio/video transcription | Whisper is freely available general-purpose speech recognition software, capable of generating high-quality transcripts from audio and video files. It can be obtained from https://github.com/openai/whisper. If installed, CollectiveAccess can be configured to use it to create VTT-format subtitles for uploaded audio/video media. |
| Ghostscript | PDF Documents |  Ghostscript 9.5 or better is suggested to generate preview images of uploaded PDF documents. PDF uploads will still work, but without preview images, if Ghostscript is not installed. For more information see http://ghostscript.com. |
| dcraw | Images | Required to support upload of proprietary CameraRAW formats produced by various higher-end digital cameras. Note that that AdobeDNG format, a newer RAW format, is supported by GraphicsMagick and ImageMagick. |
| poppler | PDF Documents |  A PDF rendering library and associated utilities. If present CollectiveAccess will use the included pdfToText utility to extract text from PDF files for indexing. If pdfToText is not installed on your server CollectiveAccess will not be able to search the content of uploaded PDF documents. See https://poppler.freedesktop.org for additional information. |
| MediaInfo | Images, Audio, Video, PDF Documents | A library for extraction of technical metadata from various audio and video file formats. If present CollectiveAccess can use MediaInfo to extract technical metadata, otherwise it will fall back to using a less capable built-in extraction method. See https://mediaarea.net/en/MediaInfo for details. |
| ExifTool | Images |  A library for extraction of embedded metadata from many image file formats. If present CollectiveAccess can use it to extract metadata for display and import, otherwise it will fall back to using a less capable built-in extraction method. See https://exiftool.org for more information. |
| wkhtmltopdf | PDF Output | wkhtmltopdf (https://wkhtmltopdf.org) is an application that can perform high quality conversion of HTML code to PDF files. If present CollectiveAccess can use wkhtmltopdf to generate PDF-format labels and reports. Version 0.12.6 (with patched QT) is required. Do not use earlier versions, which have issues that prevent valid formatting of output. If wkhtmltopdf is not installed CollectiveAccess will fall back to a slower built-in alternative. |
| LibreOffice | Office Documents |  LibreOffice (https://www.libreoffice.org) is an open-source alternative to Microsoft Office. CollectiveAccess can use it to index and create previews for Microsoft Word, Excel and Powerpoint document. LibreOffice 6.4 or better is suggested. |

Most users will want at a minimum GraphicsMagick installed on their
server, and should install other packages as needed. 

###  PHP extensions for media processing (optional but strongly recommended)

CollectiveAccess supports two different mechanisms to employ GraphicsMagick or
ImageMagick for image processing. The preferred option is a PHP extension that provides a fast and efficient way for PHP applications such as CollectiveAccess to access GraphicsMagick or ImageMagick functionality. Alternatively
GraphicsMagick or ImageMagick can be invoked as a command-line program
directly without any PHP extension.

In general you should try to use a PHP extension rather than the
command-line mechanism. The extensions provide **much** better
performance. Unfortunately, the extensions have proven to be unstable in
some environments and can be difficult to install on Windows systems. If
you are running the PHP GMagick (for GraphicsMagick) or IMagick (for
ImageMagick) extension and are seeing segmentation faults or incorrect
image encoding such as blank images you should remove the extension, let
the command-line mechanism take over and see if that improves things.
Avoid installing both GMagick and IMagick on the same server.
Simultaneous installation of both extensions has been associated with
crashes and general instability.

Both [Gmagick](http://pecl.php.net/gmagick) and
[Imagick](http://pecl.php.net/imagick) are available in the PHP PECL
repository and often available as packages for various operating
systems. They should be easy to install on Unix-y operating systems like
Linux and Mac OS X. Installation on Windows can be challenging.

### HEIC image format support

High Efficiency Image Container, or HEIC, is an Apple-proprietary image format which may provide higher quality and better compression than open standards such as JPEG. Many open-source tools, including GraphicsMagick, do not support this format due to patent licensing issues. If support for HEIC images in CollectiveAccess is required you must install a version of ImageMagick compiled to support HEIC. This may require installation of additional software libraries, including libde265 and libheif. If both GraphicsMagick and ImageMagick are installed, GraphicsMagick will be used for all image processing, as it is generally the most performant option, with all HEIC support delegated to ImageMagick. 

