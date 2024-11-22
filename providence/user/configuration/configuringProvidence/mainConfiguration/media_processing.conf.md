---
title: Media_processing.conf
---

# Mediaprocessing.conf

The file defines the media processing rules to transform media
representations to different media transformations.

It is a standard CollectiveAccess configuration file using the
`common configuration syntax <configuration_file_syntax>`.

CollectiveAccess supports media processing configuration for
representations of the following items:

-   representations (*ca_object_representations,
    ca_object_representation_multifiles*)
-   attribute values (*ca_attribute_value_multifiles*)
-   icons (*ca_icons*)
-   user comments media (*ca_item_comments_media*)
-   representation annotation previews
    (*ca_representation_annotation_previews*)

You may specify accepted media types, and different versions for the
transformations, using rules.

# Common configuration

| Top level key | Description | Default
|----|----|----|
|use_external_url_when_available|If you want original media fetched from URLs to NOT be stored in CA, but rather for CA to directly reference the media via the URL used to fetch it set use_external_url_when_available to 1. If you have no idea what this means then leave this set to zero.|0|
|queue_threshold_in_bytes|Filesize (in bytes) above which media should be queued for background processing Files smaller than the threshold will be processed at the time of upload, so you should set this to a small enough value that your server has a shot at processing the media in near-realtime. A safe bet is 500,000 bytes (eg. 0.5 megabytes), but you may need to go lower (or higher).<br></br><br></br>Note that you can override this setting for specific media types and versions below if you wish. Also keep in mind a few other fun facts:<br></br><br></br><ul><li>If the queue_enabled setting in global.conf is set to zero then no background processing will take place, no matter what you set here</li><li>The default setting for queue_enabled is zero, so make sure you change it if you want background processing to happen.</li><li>Versions that have no QUEUE_WHEN_FILE_LARGER_THAN are never queued for background processing; versions with a QUEUE_WHEN_FILE_LARGER_THAN settings of zero are similarly never queued (absence and zero are one and the same, config-wise).</li><li>Some types of media are setup by default to never queue no matter the “queue_threshold_in_bytes” and “queue_enabled” settings. This includes media types for much little or no processing is done, including SWF, XML and MSWord.</li></ul>|1000|

# Organization

At the top level, media_processing.conf is structured as a series of
blocks, one for each type of item to be processed:

-   representations (*ca_object_representations,
    ca_object_representation_multifiles*)
-   attribute values (*ca_attribute_value_multifiles*)
-   icons (*ca_icons*)
-   user comments media (*ca_item_comments_media*)
-   representation annotation previews
    (*ca_representation_annotation_previews*)

For each table, there is an associative array, with the following keys:

-   `MEDIA_ACCEPT <providenceConfiguration/mainConfiguration/media_processing.conf:MEDIA_ACCEPT>`: Relates mimetypes and media types. Each type of media
    (Ex. `image`) may have multiple mimetypes associated with it.
-   `MEDIA_TYPES <providenceConfiguration/mainConfiguration/media_processing.conf:MEDIA_TYPES>`: Describes queueing and available representation
    versions in different sizes and flavours.
-   `MEDIA_TRANSFORMATION_RULES <providenceConfiguration/mainConfiguration/media_processing.conf:MEDIA_TRANSFORMATION_RULES>`: Describes the rules to apply to transform a
    representation file.

This is an example of a media processing file:

``` text
ca_object_representations = {
  MEDIA_METADATA = "media_metadata",
  MEDIA_CONTENT = "media_content",

  MEDIA_ACCEPT = {
      image/jpeg     = image,
      image/gif      = image,
      image/png      = image,
      image/tiff     = image,
      image/x-bmp    = image,
      image/x-dcraw  = image,
      image/x-psd    = image,
      image/x-exr    = image,
      image/jp2      = image,

      application/octet-stream = binaryfile
  },
  # ---------------------------------------------------------
  MEDIA_TYPES = {
      image = {
          QUEUE = mediaproc,
          QUEUED_MESSAGE =  _("Image is being processed"),
          QUEUE_USING_VERSION = original,
          VERSIONS = {
              thumbnail = {
                  RULE = rule_thumbnail_image, VOLUME = images,
                  QUEUE_WHEN_FILE_LARGER_THAN = <queue_threshold_in_bytes>
              },
              preview = {
                  RULE = rule_preview_image, VOLUME = images,
                  QUEUE_WHEN_FILE_LARGER_THAN = <queue_threshold_in_bytes>
              },
              original = {
                  RULE = rule_original_image, VOLUME = images,
                  USE_EXTERNAL_URL_WHEN_AVAILABLE = <use_external_url_when_available>
              },
              tilepic = {
                  RULE = rule_tilepic_image, VOLUME = tilepics,
                  QUEUE_WHEN_FILE_LARGER_THAN = <queue_threshold_in_bytes>
              }
          },
          MEDIA_VIEW_DEFAULT_VERSION = tilepic,
          MEDIA_PREVIEW_DEFAULT_VERSION = small
      },
      binaryfile = {
          QUEUE = mediaproc,
          QUEUED_MESSAGE =  _("Image is being processed"),
          QUEUE_USING_VERSION = original,
          VERSIONS = {
              thumbnail = {
                  RULE = rule_thumbnail_image, VOLUME = images, BASIS = large,
                  QUEUE_WHEN_FILE_LARGER_THAN = <queue_threshold_in_bytes>
              },
              preview = {
                  RULE = rule_preview_image, VOLUME = images, BASIS = large,
                  QUEUE_WHEN_FILE_LARGER_THAN = <queue_threshold_in_bytes>
              },
              original    = {
                  RULE = rule_original_image, VOLUME = images,
                  USE_EXTERNAL_URL_WHEN_AVAILABLE = <use_external_url_when_available>
              }
          },
          MEDIA_VIEW_DEFAULT_VERSION = large,
          MEDIA_PREVIEW_DEFAULT_VERSION = small
      }
  },
  MEDIA_TRANSFORMATION_RULES = {
      # ---------------------------------------------------------
      # Image rules
      # ---------------------------------------------------------
      rule_thumbnail_image = {
          SCALE = {
              width = 120, height = 120, mode = bounding_box, antialiasing = 0
          },
          SET = {quality = 75, format = image/jpeg}
      },
      rule_preview_image = {
          SCALE = {
              width = 180, height = 180, mode = bounding_box, antialiasing = 0
          },
          SET = {quality = 75, format = image/jpeg}
      },
      rule_original_image = {},
      rule_tilepic_image = {
          SET = {quality = 40, tile_mimetype = image/jpeg, format = image/tilepic}
      }
      # ---------------------------------------------------------
  }
}
```

## MEDIA_ACCEPT

One entry per mimetype. Each type of media (Ex. `image`) may have
multiple mimetypes associated with it.

``` text
mimetype = media_type
```

## MEDIA_TYPES

Each key is a media type descriptor, containing an associative array
with queueing and representation version descriptions.

| Key | Description | Example
|----|----|----|
|QUEUE|Queue to deliver the media type to. Only  `mediaproc` is supported currently.|`QUEUE = mediaproc` |
|QUEUED_MESSAGE|Message to show on queue listing|`QUEUED_MESSAGE = _('Image is being processed')`|
|QUEUE_USING_VERSION|Version to use when queueing. Note here that you have to specify a version here that is not set to QUEUE, and that you’d almost always want to be using `original` (a.k.a. the uploaded file).|`QUEUE_USING_VERSION = original`|
|MEDIA_VIEW_DEFAULT_VERSION|Name of the media version that should be used as the default for display for the specified mimetype.<br></br><br></br><ul><li>This is only a suggestion - it’s the version to display in the absence of any overriding value provided by the user.</li></ul><br></br><br></br>|`MEDIA_VIEW_DEFAULT_VERSION = tilepic`|
|MEDIA_PREVIEW_DEFAULT_VERSION|Default version to display as a preview for the given field based upon the currently loaded row|`MEDIA_PREVIEW_DEFAULT_VERSION = small`|
|VERSIONS|Versions describe different representation versions. See providenceConfiguration/mainConfiguration/media_processing.conf:VERSIONS for further details|

```VERSIONS = {
  thumbnail = {
      RULE = rule_thumbnail_image,
      VOLUME = images,
      QUEUE_WHEN_FILE_LARGER_THAN = 1000000
  },
  preview = {
      RULE = rule_preview_image,
      VOLUME = images,
      QUEUE_WHEN_FILE_LARGER_THAN = 1000000
  },
  original 	= {
      RULE = rule_original_image,
      VOLUME = images,
      QUEUE_WHEN_FILE_LARGER_THAN = 1000000
  },
  tilepic 	= {
      RULE = rule_tilepic_image,
      VOLUME = tilepics,
      QUEUE_WHEN_FILE_LARGER_THAN = 1000000
  }
}
```


## VERSIONS

Each key is a version descriptor, containing an associative array, with
a pointer to media transformation rules 	`<providenceConfiguration/mainConfiguration/media_processing.conf:MEDIA_TRANSFORMATION_RULES>` that help building a new derivative version of a media file.

| Key | Description | Example
|----|----|----|
|RULE|Rule name|`RULE = rule_thumbnail_image`|
|VOLUME|A volume label from `providenceConfiguration/developer/media_volumes.conf:Media_volumes.conf file`. Files will be stored in/retrieved from this volume.|`VOLUME = images`|
|QUEUE_WHEN_FILE_LARGER_THAN|Filesize (in bytes) above which media should be queued for background processing. Files smaller than the threshold will be processed at the time of upload, so you should set this to a small enough value that your server has a shot at processing the media in near-realtime. A safe bet is 500,000 bytes (eg. 0.5 megabytes), but you may need to go lower (or higher). Note that you can override this setting for specific media types and versions below if you wish. Also keep in mind a few other fun facts:<br></br><br></br><ul><li>If the queue_enabled setting in global.conf is set to zero then no background processing will take place, no matter what you set here.</li><li>The default setting for queue_enabled is zero, so make sure you change it if you want background processing to happen.</li><li>Versions that have no QUEUE_WHEN_FILE_LARGER_THAN are never queued for background processing; versions with a QUEUE_WHEN_FILE_LARGER_THAN settings of zero are similarly never queued (absence and zero are one and the same, config-wise).</li><li>Some types of media are setup by default to never queue no matter the “queue_threshold_in_bytes” and “queue_enabled” settings. This includes media types for much little or no processing is done, including SWF, XML and MSWord.</li></ul>|`QUEUE_WHEN_FILE_LARGER_THAN = 1000`|


## MEDIA_TRANSFORMATION_RULES

Rules that describe how to build a derivative version of a media file.
There are `operations <media_rules_operations>` on the image and also
`filters <media_rules_filters>`.

It is an associative array of operation keys.

Here it is a listing of available **operations**:

| Operation| Description | Example
|----|----|----|
|ANNOTATE|Add annotations to a media file. Note that annotation requires an alpha channel. If none is available, an all opaque alpha channel is implicitedly created. Not available for GD image plugin.<br></br><br></br>Parameters are:<br></br><br></br><ul><li>position: a list of values from `north`, `north_west`, `north_east`, `south`, `south_east`, `south_west`, `center`.</li></ul><ul><li>text: the annotation text. You should escape single quote chars in the text.</li></ul><ul><li>inset: position of text inside the frame.</li></ul><ul><li>font: set the font of the text. Available fonts vary from system to system.</li></ul><ul><li>size: Point size for the font.</li></ul><ul><li>color: color for the background. accepts a color name, a hex color, or a numerical RGB, RGBA, HSL, HSLA, CMYK, or CMYKA specification, for example, `blue`, `#ddddff`, `rgb(255,255,255)`.</li></ul>|<font color="red">Code block goes here</font>|
|CROP|Crop the file. Parameters:<br></br><br></br><ul><li>`width`: target width of the file.</li><li>`height`: target height of the file.</li><li>`x`: horizontal offset.</li><li>`y`: vertical offset.</li></ul>|<font color="red">Code block goes here</font>|
|FLIP|Reflect the scanlines in the vertical or horizontal direction. The image will be mirrored upside-down or left-right. Set direction to `vertical` or `horizontal`|``FLIP { direction = vertical }``|
|ROTATE|Rotate the file.<br></br><br></br>Parameters:<br></br><br></br><ul><li>``angle``: angle in degrees.</li></ul>|```ROTATE { angle = 30 }```|
|SCALE|Scale the file. Configure the following params:<br></br><br></br><ul><li>`antialiasing`: boolean to activate anti-aliasing.</li><li>`width`: new width of the file. It is optional, but one of height or width must be provided.</li><li>`height`: new height of the file. It is optional, but one of height or width must be provided.</li><li>`mode`: Scaling mode<br></br>`width`: Scale proportionally to width.<br></br>`height`: Scale proportionally to height.    <br></br>`bounding_box`: Scale proportionally and keep largest dimension inside the bounding box.<br></br>`fill_box`: Scale proportionally and stretch shortest dimension to fill all the box.</li><li>`crop_from`: it is a position field, which is only used in fill_box mode. Not available for GMagick.</li><li>`trim_edges`: remove edges, it allows a percentage value. Not available for GMagick.</li></ul> |<font color="red">Code block goes here</font>|
|SET|Set properties on the media processing handler. Available values are:<br></br><br></br><ul><li>`antialiasing`</li><li>`colorspace`</li><li>`gamma`</li><li>`height`</li><li>`layer_ratio`</li><li>`layers`</li><li>`mimetype`</li><li>`no_upsampling`</li><li>`output_layer`</li><li>`quality`</li><li>`reference-black`</li><li>`reference-white`</li><li>`tile_height`</li><li>`tile_mimetype`</li><li>`tile_width`</li><li>`tiles`</li><li>`typename`</li><li>`version`</li><li>`width`</li><li>`compress`: Available for format application/pdf. Available values are:<br></br><br></br>`screen`: selects low-resolution output similar to the Acrobat Distiller (up to version X) Screen Optimized setting<br></br>`ebook` selects medium-resolution output similar to the Acrobat Distiller (up to version X) eBook setting.<br></br>`prepress` selects output similar to Acrobat Distiller Prepress Optimized (up to version X) setting.<br></br>`default` selects output intended to be useful across a wide variety of uses, possibly at the expense of a larger output file.<br></br></li></ul>|```SET = {quality = 75, format = image/jpeg}```|
|WATERMARK|Add a watermark to a media file. Parameters are:<br></br><br></br><ul><li>`image`: Absolute path to your watermark image. Note that this MUST be the absolute path to the watermark image. If you put it in your ‘app’ directory you can use preexisting macros set in `global.conf`, such as `<ca_app_dir>`, to avoid hardcoding in path info. Eg. if you have the watermark image at `/web/ca/app/watermarks/mymark.png` you can configure it here as `<ca_app_dir>/watermarks/mymark.png`. There is no default value.</li><li>`width`: Width of watermark in pixels. Default value is 50% of the width of the image being processed.</li><li>`height`: Height of watermark in pixels. Default value is 50% of the height of the image being processed</li><li>`position`: Location of watermark on processed image; allowable values will place the watermark on the corners (eg. north_west is the upper-left-hand corner), the center on top or bottom (`north` or `south`) or in the center of the image (`center`). Available values are `north`, `north_west`, `north_east`, `south`, `south_east`, `south_west`, `center`.</li><li>`opacity`: Determines transparency of watermark image. Use a value between 0 and 1. 0=completely transparent; 1.0=completely opaque. Default value is 0.5</li></ul>|```WATERMARK= {image =<ca_app_dir>/watermark.png, width = 72, height = 85, position = south_east, opacity = 0.4},```|

Here it is a listing of available **filters**.


| Operation| Description | Example
|----|----|----|
|DESPECKLE|Reduce the speckles within an image. No parameters.|```DESPECKLE { }```|
|MEDIAN|Apply a median filter to the image, of the given radius.|```MEDIAN { radius = 2 }```|
|SHARPEN|Use a Gaussian operator of the given radius and standard deviation (sigma). For reasonable results, radius should be larger than sigma. Use a radius of 0 to have the method select a suitable radius.<br></br><br></br>The parameters are:<br></br><br></br> <ul><li>radius: The radius of the Gaussian, in pixels, not counting the center pixel (default 0).</li><li>sigma: The standard deviation of the Gaussian, in pixels (default 1.0). It can be any floating point value from 0.1, for practically no sharpening, to<br></br><br></br>3 or more for sever sharpening. 0.5 to 1.0 is rather good.<br></br><br></br>The larger the sigma the more it sharpens.</li></ul><br></br><br></br><ul><li>``sharpen 0x.4``: very small</li><li>``sharpen 0x1.0``: about one pixel size sharpen</li><li>``sharpen 0x3.0``: probably getting too large.</li></ul>|```SHARPEN {radius = 0, sigma = 0.63}```|
|UNSHARPEN_MASK|This filter sharpens an image. The image is convolved with a Gaussian operator of the given radius and standard deviation (sigma). For reasonable results, radius should be larger than sigma. Use a radius of 0 to have the method select a suitable radius.<br></br><br></br>The parameters are:<br></br><br></br><ul><li>**radius**: The radius of the Gaussian, in pixels, not counting the center pixel (default 0).</li><li>**sigma**: The standard deviation of the Gaussian, in pixels (default 1.0).</li><li>**amount**: The fraction of the difference between the original and the blur image that is added back into the original (default 1.0).</li><li>**threshold**: The threshold, as a fraction of QuantumRange, needed to apply the difference amount (default 0.05).</li></ul>|```UNSHARPEN_MASK {radius = 0, sigma = 0.45, amount = 1.5, threshold = 0}```|
