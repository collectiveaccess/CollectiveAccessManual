---
title: Media_display.conf
---

The media_display.conf file controls how media representations are
displayed in both the media overlay and media editor. Display settings
can be customized for images, video, video H264 original, quicktime
Viewer, audio, pdf files, documents, postscript, and text.

# Media Overlay and Media Editor

The media overlay is accessed by clicking through the representation
from the Inspector in Providence. The media editor, on the other hand,
is accessed by clicking through the thumbnail representation on the
media editor itself. You can set the display options differently here,
or configure them to be identical to the media overlay.

  -----------------------------------------------------------------------------------------------------------------------
  Option                                                   Description                              Example syntax
  -------------------------------------------------------- ---------------------------------------- ---------------------
  mimetypes                                                Mimetypes are are codes that             image/jpeg,
                                                           unambiguously identify a media format.   image/tiff, image/png
                                                           By default, nearly all supported         
                                                           mimetypes are included, but the user is  
                                                           free to add more according to the        
                                                           capabilities of the server and which     
                                                           plugins are running.                     

  display_version                                          Controls which image or video display    tilepic, video/mp4
                                                           version is shown in the overlay or       
                                                           editor.                                  

  viewer_width                                             Sets the width of the media in the       100%
                                                           overlay or editor.                       

  viewer_height                                            Sets the height of the media in the      100%
                                                           overlay or editor.                       

  use_book_viewer_when_number_of_representations_exceeds   When the number of media representations 2
                                                           exceeds the number set here, the book    
                                                           viewer will be used to display the       
                                                           images.                                  

  use_book_viewer                                          Enables the bookviewer. For documents,   1 (yes) or 0 (no)
                                                           enabling this in addition the pdfjs      
                                                           viewer will allow non-pdf documents to   
                                                           be shown in the Bookviewer while PDFs    
                                                           will continue to be shown in the pdfjs   
                                                           viewer.                                  

  show_hierarchy_in_book_viewer                            If the record has sub-records with       1 (yes) or 0 (no)
                                                           media, media representations of child    
                                                           records will be shown if the hierarchy   
                                                           is enabled.                              

  restrict_book_viewer_to_types                            You can restrict the use of the book     \[object_type_code,
                                                           viewer to particular object types by     object_type_code\]
                                                           entering the type code for each between  
                                                           the brackets, separating types by comma  

  download_version                                         This sets which version of the media can original, large
                                                           be downloaded from the media editor.     

  poster_frame_version                                     Specifies which version to use for the   mediumlarge
                                                           video player as a still image prior to   
                                                           starting playback.                       

  alt_display_version                                      Specifies the version of still image to  large
                                                           be used when video cannot be displayed.  
                                                           For example, what would be displayed for 
                                                           a Flash video of the user did not have   
                                                           Flash.                                   

  use_pdfjs_viewer                                         Enables the recommended viewer for pdf   1 (yes) or 0 (no)
                                                           files.                                   
  -----------------------------------------------------------------------------------------------------------------------
