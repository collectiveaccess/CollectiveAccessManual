---
title: Supported Media File Formats 
sidebar_position: 12
---

# Supported Media File Formats

Below are CollectiveAccess-supported image, audio, video, document, and multimedia formats.

## Supported Image Formats

| Format| Media Processing Backend|Notes
|----|----|----|
|JPEG|GD, ImageMagick, IMagick, GraphicsMagick, Gmagick||
|GIF|GD, ImageMagick, IMagick, GraphicsMagick, Gmagick||
|TIFF|GD, ImageMagick, IMagick, GraphicsMagick, Gmagick||
|PNG|GD, ImageMagick, IMagick, GraphicsMagick, Gmagick||
|TilePic|GD, ImageMagick, IMagick, GraphicsMagick, Gmagick||
|Camera RAW|ImageMagick, IMagick, GraphicsMagick, Gmagick|Supports whatever manufacturer formats your installed version of ImageMagick can handle|
|Photoshop PSD|ImageMagick, IMagick, GraphicsMagick, Gmagick|Derivatives for files with layer effects may not be rendered properly|
|JPEG-2000|ImageMagick, IMagick, GraphicsMagick, Gmagick||
|DICOM|ImageMagick, IMagick, GraphicsMagick, Gmagick||
|DPX|ImageMagick, IMagick, GraphicsMagick, Gmagick|Pixel values in non-Tilepic derivatives are adjusted for optimal viewing on computer monitors.|
|OpenEXR|ImageMagick, IMagick, GraphicsMagick, Gmagick|More information on this format can be found [here](https://openexr.com/en/latest/).|
|QTVR (QuickTime VR)|QuicktimeVR|JPEG-format thumbnails are extracted; straight-QTVR is kept as “original” version. The QuicktimeVR plugin requires ffmpeg to be installed.|
|Adobe DNG|ImageMagick, IMagick, GraphicsMagick, Gmagick||
|BMP|ImageMagick, IMagick, GraphicsMagick, Gmagick||
|HEIC|ImageMagick, IMagick, Gmagick|Available from version 1.8. Gmagick support requires working ImageMagick installation (GraphicsMagick does not support the HEIC format at all). All back-ends require ImageMagick to be built with support for libheic. This is not available by default in most Linux distributions.|

## Supported Audio Formats

| Format| Media Processing Backend|Notes
|----|----|----|
|MP3|ffmpeg|ffmpeg must be compiled with libLAME|
|AIFF|ffmpeg||
|WAV|ffmpeg|Including Broadcast-WAVE|
|AAC|ffmpeg|Requires ffmpeg to be compiled with libfdk_aac|
|Ogg Vorbis|ffmpeg||
|FLAC|ffmpeg||

## Supported Video Formats

| Format| Media Processing Backend|Notes
|----|----|----|
|MPEG-2|ffmpeg||
|MPEG-4|ffmpeg||
|QuickTime|ffmpeg||
|WindowsMedia|ffmpeg||
|FLV|ffmpeg||
|Ogg Theora|ffmpeg||
|AVI|ffmpeg||
|Matroska (mkv)|ffmpeg||
|DV|ffmpeg||
|MPEG-2 TS (MP2T)|ffmpeg||

## Supported Document Formats

| Format| Media Processing Backend|Notes
|----|----|----|
|PDF|PDFWand|CA can only generate thumbnail page images for display if [Ghostscript](https://www.ghostscript.com/) is installed on your system. Can extract text from file for searchability if [xPDF](https://www.xpdfreader.com/download.html) is installed.|
|PS (Postscript)|PDFWand|CA can only generate thumbnail page images for display if [Ghostscript](https://www.ghostscript.com/) is installed on your system.|
|Microsoft Word|Office|Both .doc (< 2007 file format) and .docx (XML-based format) are supported. Can generate page previews and extract text from file for searchability if LibreOffice is installed.|
|Microsoft Powerpoint|Office|Can generate page previews if LibreOffice is installed.|
|Microsoft Excel|Office|Can generate page previews if LibreOffice is installed.|

## Supported Multimedia Formats

| Format| Media Processing Backend|Notes
|----|----|----|
|STL|Mesh|[Standard Tesselation Language](https://en.wikipedia.org/wiki/STL_(file_format)) for 3d models (geometry only; no textures).|
|PLY |Mesh|[Polygon File Format](https://en.wikipedia.org/wiki/PLY_(file_format)) for 3d models (geometry only; no textures)|
|OBJ|Mesh|[Wavefront OBJ](https://en.wikipedia.org/wiki/Wavefront_.obj_file) for 3d models. For CollectiveAccess version 1.7.x only geometry is supported. From version 1.8 support for textures specified using .mtl “sidecar” files is provided.|
|GLTF|Mesh|[Graphics Language Transport Format](https://en.wikipedia.org/wiki/GlTF) for 3d models. Available from version 1.8. Texture support is provided using “sidecar” files.|