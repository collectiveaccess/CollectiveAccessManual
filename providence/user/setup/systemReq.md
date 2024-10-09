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
| Operating System | Linux, Mac OS X 10.9+, or Windows (Server 2012+, Windows 7, 8 and 10 verified to work).|
| Server Memory | 4 gb of RAM minimum. If you intend to have CA handle large image files then your server should ideally have three times the size of the largest image when uncompressed. In general more memory is always better, and 8 gb of RAM is a good baseline assuming it is not cost prohibitive.|
|Data Storage | A simple formula for estimating storage requirements requires an expected number of media items to be catalogued and an average size for those media items. Once these quantities are known an estimate can be derived using some simple arithmetic: \<storage required in mb\> = (\<# of media items\> \* \<average storage requirements per media item in mb\>) + (\<# of media items\> \* 5mb). 5mb is estimated overhead of storing derivatives (small JPEG, TilePic pan-and-zoom version, etc.) It is recommended to double the calculated storage requirements when acquiring hardware if practical. Storage requirements for your metadata and database indices, even if your database is quite large, are usually negligible compared to the storage required for media. |
|Processor | Multiprocessor/multicore architectures are desirable for the improved scalability they provide, and well as the capability to speed the processing of uploaded media. Media processing is often CPU-bound (as opposed to database operations which are often I/O bound) and lends itself to multiprocessing. It is advisable to obtain a machine with at least 2 cores and, if possible, 4+ cores. |

## Core software requirements

Providence requires three core open-source software packages be
installed prior to installation. Without these packages Providence
cannot run:

| Software Package | Notes |
| --- | --- |
| Webserver | [Apache](https://httpd.apache.org/) version 2.4 or [nginx](https://httpd.apache.org/%20or%20https://nginx org) 1.14 or later are recommended.|
|[MySQL](https://dev.mysql.com/) |  Versions 5.7 and 8.0 are supported. Equivalent versions of [MariaDB](https://mariadb.org/) will also work.|
|[PHP](https://php.net/)|    [PHP](https://php.net/) version 8.2 or better is required. |             

All of these should be available as pre-compiled packages for most Linux
distributions and as installer packages for Windows. For Macs,
[Brew](https://brew.sh/) is a highly recommended way to get all of CA\'s
prerequisites quickly up and running.

If setting up Apache, MySQL or PHP is daunting, you may want to consider
pre-configured Apache/MySQL/PHP environments available for Windows and
Macintosh such as [MAMP](https://www.mamp.info/) and
[XAMPP](https://www.apachefriends.org/index.html). These can greatly
simplify setup of CollectiveAccess and its requirements and are useful
tools for experimentation and prototyping. They are not recommended for
hosting live systems, however.

## Required and Suggested Software Packages By Distribution

**CentOS 8**

Some packages used by CollectiveAccess are available only from 3rd party
repositories. Packages recommended here are from the following
repositories:

-   Remi: (https://rpms.remirepo.net/enterprise/remi-release-8.rpm)
-   EPEL:
    (https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm)
-   RPMFusion:
    (https://download1.rpmfusion.org/nonfree/el/rpmfusion-nonfree-release-8.noarch.rpm)

**Required:**

-   mysql-server or mariadb-server \[Database server\]
-   httpd \[Web server\]
-   redis \[Cache server\]
-   php:remi-7.4 php-cli php-gd php-curl php-mysqlnd php-zip
    php-fileinfo php-gmagick php-opcache php-process php-xml
    php-mbstring php-redis \[Runtime environment\] (Remi, EPEL)

**Suggested:** - GraphicsMagick-devel \[Image processing\] -
ghostscript-devel - ffmpeg \[Audio and video processing\] - libreoffice
\[Microsoft Office file processing\] (EPEL) - dcraw \[RAW image format
support\] - mediainfo \[Media metadata extraction\] -
perl-Image-ExifTool \[Media metadata extraction\] - Poppler \[Media
metadata extraction\]

**CentOS 7**

Some packages used by CollectiveAccess are available only from 3rd party
repositories. Packages recommended here are from the following
repositories:

-   Nux:
    (http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-5.el7.nux.noarch.rpm)
-   Remi: (http://rpms.remirepo.net/enterprise/remi-release-7.rpm)
-   EPEL:
    (https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm)

**Required:**

-   mysql-server or mariadb-server \[Database server\]
-   httpd \[Web server\]
-   redis \[Cache server\]
-   php php-pecl-mcrypt php-cli php-gd php-curl php-mysqlnd php-zip
    php-fileinfo php-devel php-gmagick php-opcache php-process php-xml
    php-mbstring php-redis \[Runtime environment\] (Remi, EPEL)

**Suggested:** - GraphicsMagick-devel \[Image processing\] -
ghostscript-devel - ffmpeg \[Audio and video processing\] (Nux) -
libreoffice \[Microsoft Office file processing\] (EPEL) - dcraw \[RAW
image format support\] - mediainfo \[Media metadata extraction\] -
perl-Image-Exifool \[Media metadata extraction\] - xpdf \[Media metadata
extraction\]

Each metadata extraction tool is useful for specific types of media.
MediaInfo provides the most information when used with audio/video
files. ExifTool is best with images.

**Ubuntu 18.04**

Some packages used by CollectiveAccess are available only from 3rd party
repositories. Packages recommended here are from the following
repositories:

-   ondrej/php: ppa:ondrej/php
-   PECL: (https://pecl.php.net)    

**Required:**

-   mysql-server
-   apache2
-   redis-server
-   php7.x libapache2-mod-php7.x php7.x-common php7.x-mbstring
    php7.x-xmlrpc php7.x-gd php7.x-xml php7.x-intl php7.x-mysql
    php7.x-cli php7.x-mcrypt php7.x-zip php7.x-curl php7.x-posix
    php7.x-dev php-pear php7.x-
-   pecl.php.net/gmagick-2.0.5RC1 \[pecl install
    channel://pecl.php.net/gmagick-2.0.5RC1\]

**Suggested:**

-   graphicsmagick libgraphicsmagick-dev \[Image processing\]
-   ffmpeg \[Audio and video processing\]
-   ghostscript \[PDF processing\]
-   libreoffice \[Microsoft Office file processing\]
-   dcraw \[RAW image format support\]
-   mediainfo \[Media metadata extraction\]
-   xpdf \[Media metadata extraction\]
-   exiftool \[Media metadata extraction\]

**Ubuntu 20.04**

**Required:**

-   mysql-server
-   apache2
-   redis-server
-   php php-cli php-common php-gd php-curl php-mysqlnd php-zip
    php-fileinfo php-gmagick php-opcache php-process php-xml
    php-mbstring php-gmagick

**Suggested:**

-   graphicsmagick libgraphicsmagick-dev \[Image processing\]
-   ffmpeg \[Audio and video processing\]
-   ghostscript \[PDF processing\]
-   libreoffice \[Microsoft Office file processing\]
-   dcraw \[RAW image format support\]
-   mediainfo \[Media metadata extraction\]
-   poppler \[Media metadata extraction\]
-   perl-Image-ExifTool \[Media metadata extraction\]

## Directories

If you are running Apache on Linux, the root of your CollectiveAccess
installation will usually be located in **/var/www/html.**

## Software requirements for media processing

Depending upon the types of media you intend to handle with CA you will
also need to install various supporting software libraries and tools.
None of these is absolutely required for CA to install and operate but
without them specific types of media may not be supported (as noted
below).

| Software Package | Media Types | Notes |
| --- | --- | --- |
| GraphicsMagick | Images |Version 1.3.16 or better is required. GraphicsMagick is the preferred option for processing image files on all platforms and is better performing than any other option. Be sure to compile or obtain a version of GraphicsMagick with support for the formats you need. Support for some image formats is contingent upon other libraries being present on your server (eg. libTiff must be present for TIFF support\]). Some less common formats, such as PSD, may require special configuration and/or compilation. |
| ImageMagick | Images | Version 6.5 or better is required. ImageMagick can handle more image formats than any other option but is significantly slower than GraphicsMagick in most situations. Be sure to compile or obtain a version of ImageMagick with support for the formats you need! Support for some image formats is contingent upon other libraries being present on your server (eg. libTiff must be present for TIFF support\]).|
| libGD | Images | A simple library for processing JPEG, GIF and PNG format images, GD is a fall-back for image processing when ImageMagick is not available. This library is typically bundled with PHP so you should not need to install it separately. In some cases you may need to perform a manual install or use a package provided by your operating system provider. In addition to supporting a limited set of image formats, GD is typically slows than ImageMagick or GraphicsMagick for many operations. If at all possible install GraphicsMagick on your server. |
| ffmpeg | Audio, Video | Required if you want to handle video or audio media. Be sure to compile to support the file formats and codecs you require. |
| Ghostscript | PDF Documents |  Ghostscript 9 or better is required to generate preview images of uploaded PDF documents. PDF uploads will still work, but without preview images, if Ghostscript is not installed. |
| dcraw | Images | Required to support upload of proprietary CameraRAW formats produced by various higher-end digital cameras. Note that that AdobeDNG format, a newer RAW format, is supported by GraphicsMagick and ImageMagick. |
| PdfToText | PDF Documents |  A utility to extract text from uploaded PDF files. If present CA will use PdfToText to extract text for indexing. If PdfToText is not installed on your server CA will not be able to search the content of uploaded PDF documents. This utility is part of the xpdf package available on some versions of Linux. In later Linux distribution versions, this utility is part of the Poppler package. |
| PdfMiner | PDF Documents |  A utility to extract text and text locations from uploaded PDF files. If present CA will use PdfMiner to extract text for indexing and locations to support highlighting of search results during PDF display. If PdfMiner is not installed on your server CA will fall back to PdfToText for indexing and highlighting of search results will be disabled. |
| MediaInfo | Images, Audio, Video, PDF Documents | A library for extraction of technical metadata from various audio and video file formats. If present CA can use MediaInfo to extract technical metadata, otherwise it will fall back to using various built-in methods such as GetID3. |
| ExifTool | Images |  A library for extraction of embedded metadata from many image file formats. If present CA can use it to extract metadata for display and import. |
| WkHTMLToPDF | PDF Output | WkHTMLToPDF is an application that can perform high quality conversion of HTML code to PDF files. If present CollectiveAccess can use WkHTMLToPDF to generate PDF-format labels and reports. Version 0.12.1 is supported. Do not use version 0.12.2, which has bugs that prevent valid formatting of output. If WkHTMLToPDF is not installed CollectiveAccess will fall back to a slower built-in alternative. |
| LibreOffice | Office Documents |  LibreOffice is an open-source alternative to Microsoft Office. CollectiveAccess can use it to index and create previews for Microsoft Word, Excel and Powerpoint document. LibreOffice 4.0 or better is supported. |

Most users will want at a minimum GraphicsMagick installed on their
server, and should install other packages as needed. For image
processing you need only one of the following: GraphicsMagick,
ImageMagick, libGD.

##   PHP extensions for media processing (optional)

CA supports two different mechanisms to employ GraphicsMagick or
ImageMagick. The preferred option is a PHP extensions that, when
installed, provide a fast and efficient way for PHP applications such as
CA to access GraphicsMagick or ImageMagick functionality. Alternatively
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

:::note
GraphicsMagick version 1.3.32 and better break certain functions in the
PHP GMagick extension API and cause all media processing to fail in
CollectiveAccess in versions prior to 1.7.9. Upgrade to the current
version of CollectiveAccess if you are seeing failed processing with
later versions of GraphicsMagick from 1.3.32.
:::

Both [Gmagick](http://pecl.php.net/gmagick) and
[Imagick](http://pecl.php.net/imagick) are available in the PHP PECL
repository and often available as packages for various operating
systems. They should be easy to install on Unix-y operating systems like
Linux and Mac OS X. Installation on Windows can be challenging.
