---
title: Media_display.conf
---

# Media_display.conf

The media_display.conf file controls how media representations are
displayed in both the media overlay and media editor. Display settings
can be customized for images, video, video H264 original, quicktime
Viewer, audio, pdf files, documents, postscript, and text.

## Media Overlay and Media Editor

The media overlay is accessed by clicking through the representation
from the Inspector in Providence. The media editor, on the other hand,
is accessed by clicking through the thumbnail representation on the
media editor itself. You can set the display options differently here,
or configure them to be identical to the media overlay.

| Option| Description | Example Syntax
|----|----|----|
|mimetypes|Mimetypes are are codes that unambiguously identify a media format. By default, nearly all supported mimetypes are included, but the user is free to add more according to the capabilities of the server and which plugins are running.|image/jpeg, image/tiff, image/png|
|display_version |Controls which image or video display version is shown in the overlay or editor.|tilepic, video/mp4|
|viewer_width|Sets the width of the media in the overlay or editor.|100%|
|viewer_height |Sets the height of the media in the overlay or editor.|100%|
|use_book_viewer_when_number_of_representations_exceeds|When the number of media representations exceeds the number set here, the book viewer will be used to display the images.|2|
|use_book_viewer|Enables the bookviewer. For documents, enabling this in addition the pdfjs viewer will allow non-pdf documents to be shown in the Bookviewer while PDFs will continue to be shown in the pdfjs viewer.|1 (yes) or 0 (no)|
|show_hierarchy_in_book_viewer|If the record has sub-records with media, media representations of child records will be shown if the hierarchy is enabled.|1 (yes) or 0 (no)|
|restrict_book_viewer_to_types|You can restrict the use of the book viewer to particular object types by entering the type code for each between the brackets, separating types by comma|[object_type_code, object_type_code]|
|download_version|This sets which version of the media can be downloaded from the media editor.|original, large|
|poster_frame_version|Specifies which version to use for the video player as a still image prior to starting playback.|mediumlarge|
|alt_display_version|Specifies the version of still image to be used when video cannot be displayed. For example, what would be displayed for a Flash video of the user did not have Flash.|large|
|use_pdfjs_viewer |Enables the recommended viewer for pdf files.|1 (yes) or 0 (no)|


