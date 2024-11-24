---
title: Media_processing.conf
---

# Mediaprocessing.conf

The file defines the media processing rules to transform media
representations to different media transformations.

It is a standard CollectiveAccess configuration file using the [Configuration File Syntax](https://camanual.whirl-i-gig.com/providence/user/configuration/configuration_file_syntax.)


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

- [MEDIA ACCEPT](##media_accept): Relates mimetypes and media types. Each type of media
    (Ex. `image`) may have multiple mimetypes associated with it.
- [MEDIA TYPES](##media_types):  Describes queueing and available representation versions in different sizes and flavours.
- [MEDIA TRANSFORMATION RULES](##media_transformation_rules): Describes the rules to apply to transform a representation file.

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

* `QUEUE`: Queue to deliver the media type to. Only `mediaproc` is supported currently.
	* Example: `QUEUE = mediaproc`

* `QUEUED_MESSAGE`: Message to show on queue listing. 
	* Example: QUEUED_MESSAGE = _('Image is being processed')`

* `QUEUE_USING_VERSION`: Version to use when queueing. Note here that you have to specify a version here that is not set to QUEUE, and that you’d almost always want to be using `original` (a.k.a. the uploaded file).
	* Example: `QUEUE_USING_VERSION = original`

* `MEDIA_VIEW_DEFAULT_VERSION`: Name of the media version that should be used as the default for display for the specified mimetype. **note: This is only a suggestion - it’s the version to display in the absence of any overriding value provided by the user.**
	* Example: `MEDIA_VIEW_DEFAULT_VERSION = tilepic`

* `MEDIA_PREVIEW_DEFAULT_VERSION`: Default version to display as a preview for the given field based upon the currently loaded row
	* Example: `MEDIA_PREVIEW_DEFAULT_VERSION = small`

* `VERSIONS`: Versions describe different representation versions. See [VERSIONS](##versions) for further details
	* Example: 

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
a pointer to [media transformation rules](##media_transformation_rules) that help building a new derivative version of a media file.

| Key | Description | Example
|----|----|----|
|RULE|Rule name|`RULE = rule_thumbnail_image`|
|VOLUME|A volume label from [Media_volumes.conf file](https://camanual.whirl-i-gig.com/providence/user/configuration/configuringProvidence/developer/media_volumes.conf). Files will be stored in/retrieved from this volume.|`VOLUME = images`|
|QUEUE_WHEN_FILE_LARGER_THAN|Filesize (in bytes) above which media should be queued for background processing. Files smaller than the threshold will be processed at the time of upload, so you should set this to a small enough value that your server has a shot at processing the media in near-realtime. A safe bet is 500,000 bytes (eg. 0.5 megabytes), but you may need to go lower (or higher). Note that you can override this setting for specific media types and versions below if you wish. Also keep in mind a few other fun facts:<br></br><br></br><ul><li>If the queue_enabled setting in global.conf is set to zero then no background processing will take place, no matter what you set here.</li><li>The default setting for queue_enabled is zero, so make sure you change it if you want background processing to happen.</li><li>Versions that have no QUEUE_WHEN_FILE_LARGER_THAN are never queued for background processing; versions with a QUEUE_WHEN_FILE_LARGER_THAN settings of zero are similarly never queued (absence and zero are one and the same, config-wise).</li><li>Some types of media are setup by default to never queue no matter the “queue_threshold_in_bytes” and “queue_enabled” settings. This includes media types for much little or no processing is done, including SWF, XML and MSWord.</li></ul>|`QUEUE_WHEN_FILE_LARGER_THAN = 1000`|


## MEDIA_TRANSFORMATION_RULES

Rules that describe how to build a derivative version of a media file.
There are [operations](###operations) on the image and also
[filters](###filters). 

It is an associative array of operation keys.

Here it is a listing of available **operations**:

### Operations

* `ANNOTATE`: Add annotations to a media file. Note that annotation requires an alpha channel. If none is available, an all opaque alpha channel is implicitedly created. Not available for GD image plugin.
Parameters are: 
	* `Position`: a list of values from `north`, `north_west`, `north_east`, `south`, `south_east`, `south_west`, `center`.
	* `text`: the annotation text. You should escape single quote chars in the text.
	* `inset`: position of text inside the frame.
	* `font`: set the font of the text. Available fonts vary from system to system.
	* `size`: Point size for the font.
	* `color`: color for the background. accepts a color name, a hex color, or a numerical RGB, RGBA, HSL, HSLA, CMYK, or CMYKA specification, for example, `blue`, `#ddddff`, `rgb(255,255,255)`.
		* Example:

```
ANNOTATE {
  position = south_east,
  text = "Annotation",
  inset = 10,
  font = Arial,
  size = 16,
  color = blue
}
```

* `CROP`: Crop the file. Parameters are:
	* `width`: target width of the file.
	* `height:` target height of the file.
	* `x`: horizontal offset.
	* `y`:  vertical offset.
		* Example:
		
```
CROP {
  width = 100,
  height = 100,
  x = 10,
  y = 10
}
```

* `FLIP`: Reflect the scanlines in the vertical or horizontal direction. The image will be mirrored upside-down or left-right. Set direction to `vertical` or `horizontal`
	* Example: `FLIP {direction = vertical}`

* `ROTATE`: Rotate the file. Parameters: 
	* angle: `angle` in degrees.
		* Example: `ROTATE {angle = 30}`

* `SCALE`: Scale the file. Configure the following parameters:
	* `antialiasing`: boolean to activate anti-aliasing.
	* `width`: new width of the file. It is optional, but one of height or width must be provided.
	* `height`: new height of the file. It is optional, but one of height or width must be provided.
	*`mode`: Scaling mode
		* `width`: Scale proportionally to width.
		* `height`: Scale proportionally to height.
		* `bounding_box`: Scale proportionally and keep largest dimension inside the bounding box.
		* `fill_box`: Scale proportionally and stretch shortest dimension to fill all the box.

	* `crop_from`: it is a position field, which is only used in fill_box mode. Not available for GMagick.
	* `trim_edges`: remove edges, it allows a percentage value. Not available for GMagick.
		* Example:

```
# Limit higher dimension to 240px
SCALE = {
  width = 240,
  height = 240,
  mode = bounding_box,
  antialiasing = 0
}

# 200px Square thumbnails
SCALE = {
  width = 200,
  height = 200,
  mode = fill_box,
  crop_from = center,
  antialiasing = 0
}
```


* `SET`: Set properties on the media processing handler. Available values are:

	* `antialiasing`
	* `colorspace`
	* `gamma`
	* `height`
	* `layer_ratio`
	* `layers`
	* `mimetype`
	* `no_upsampling`
	* `output_layer`
	* `quality`
	* `reference-black`
	* `reference-white`
	* `tile_height`
	* `tile_mimetype`
	* `tile_width`
	* `tiles`
	* `typename`
	* `version`
	* `width`
	* `compress`: Available for format `application/pdf`. Available values are:
		* `screen`: selects low-resolution output similar to the Acrobat Distiller (up to version X) Screen Optimized setting.
		* `ebook`selects medium-resolution output similar to the Acrobat Distiller (up to version X) eBook setting.
		* `prepress` selects output similar to Acrobat Distiller Prepress Optimized (up to version X) setting.
		* `default` selects output intended to be useful across a wide variety of uses, possibly at the expense of a larger output file.*
		* Example: 

```
SET = {
  quality = 75,
  format = image/jpeg
}
```
		
* `WATERMARK`: Add a watermark to a media file. Parameters are:
	 *`image`: Absolute path to your watermark image. Note that this MUST be the absolute path to the watermark image. If you put it in your ‘app’ directory you can use preexisting macros set in `global.conf`, such as `<ca_app_dir>`, to avoid hardcoding in path info. Eg. if you have the watermark image at `/web/ca/app/watermarks/mymark.png` you can configure it here as `<ca_app_dir>/watermarks/mymark.png`. There is no default value.
	* `width`: Width of watermark in pixels. Default value is 50% of the width of the image being processed.
	* `height`: Height of watermark in pixels. Default value is 50% of the height of the image being processed
	* `position`: Location of watermark on processed image; allowable values will place the watermark on the corners (eg. north_west is the upper-left-hand corner), the center on top or bottom (`north` or `south`) or in the center of the image (`center`). Available values are `north`, `north_west`, `north_east`, `south`, `south_east`, `south_west`, `center`.
	* `opacity`: Determines transparency of watermark image. Use a value between 0 and 1. 0=completely transparent; 1.0=completely opaque. Default value is 0.5
		* Example:
		
```
WATERMARK = {
  image = <ca_app_dir>/watermark.png,
  width = 72,
  height = 85,
  position = south_east,
  opacity = 0.4
},
```

Here it is a listing of available **filters**.

### Filters

* `DESPECKLE`: Reduce the speckles within an image. No parameters.
	* Example: `DESPECKLE { }`
	
* `MEDIAN`: Apply a median filter to the image, of the given radius.
	* Example: `MEDIAN {radius = 2}`

* `SHARPEN`: Use a Gaussian operator of the given radius and standard deviation (sigma). For reasonable results, radius should be larger than sigma. Use a radius of 0 to have the method select a suitable radius. The parameters are:
	* `radius`: The radius of the Gaussian, in pixels, not counting the center pixel (default 0).
	* `sigma`: The standard deviation of the Gaussian, in pixels (default 1.0). It can be any floating point value from 0.1, for practically no sharpening, to 3 or more for sever sharpening. 0.5 to 1.0 is rather good. The larger the sigma, the more it sharpens.
	* `sharpen 0x.4`: very small
	* `sharpen 0x1.0`: about one pixel size sharpen
	* `sharpen 0x3.0`: probably getting too large.
		* Example: `SHARPEN {radius = 0, sigma = 0.63}`

* `UNSHARPEN_MASK`: This filter sharpens an image. The image is convolved with a Gaussian operator of the given radius and standard deviation (sigma). For reasonable results, radius should be larger than sigma. Use a radius of 0 to have the method select a suitable radius. The parameters are:
	* `radius`: The radius of the Gaussian, in pixels, not counting the center pixel (default 0).
	* `sigma`: The standard deviation of the Gaussian, in pixels (default 1.0).
	* `amount`: The fraction of the difference between the original and the blur image that is added back into the original (default 1.0).
	* `threshold`: The threshold, as a fraction of QuantumRange, needed to apply the difference amount (default 0.05).
		* Example: 
```
UNSHARPEN_MASK {
  radius = 0,
  sigma = 0.45,
  amount = 1.5,
  threshold = 0
}
```




