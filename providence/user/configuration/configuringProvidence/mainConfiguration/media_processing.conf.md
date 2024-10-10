---
title: Media_processing.conf
---

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

+----------------------------+----------------------------+---------+
| Top level key              | Description                | Default |
+============================+============================+=========+
| use_e                      | If you want original media | 0       |
| xternal_url_when_available | fetched from URLs to *NOT* |         |
|                            | be stored in CA, but       |         |
|                            | rather for CA to directly  |         |
|                            | reference the media via    |         |
|                            | the URL used to fetch it   |         |
|                            | set                        |         |
|                            | use_e                      |         |
|                            | xternal_url_when_available |         |
|                            | to 1. If you have no idea  |         |
|                            | what this means then leave |         |
|                            | this set to zero.          |         |
+----------------------------+----------------------------+---------+
| queue_threshold_in_bytes   | Filesize (in bytes) above  | 1000    |
|                            | which media should be      |         |
|                            | queued for background      |         |
|                            | processing Files smaller   |         |
|                            | than the threshold will be |         |
|                            | processed at the time of   |         |
|                            | upload, so you should set  |         |
|                            | this to a small enough     |         |
|                            | value that your server has |         |
|                            | a shot at processing the   |         |
|                            | media in near-realtime. A  |         |
|                            | safe bet is 500,000 bytes  |         |
|                            | (eg. 0.5 megabytes), but   |         |
|                            | you may need to go lower   |         |
|                            | (or higher).               |         |
|                            |                            |         |
|                            | Note that you can override |         |
|                            | this setting for specific  |         |
|                            | media types and versions   |         |
|                            | below if you wish. Also    |         |
|                            | keep in mind a few other   |         |
|                            | fun facts:                 |         |
|                            |                            |         |
|                            | 1.  If the queue_enabled   |         |
|                            |     setting in global.conf |         |
|                            |     is set to zero then no |         |
|                            |     background processing  |         |
|                            |     will take place, no    |         |
|                            |     matter what you set    |         |
|                            |     here.                  |         |
|                            | 2.  The default setting    |         |
|                            |     for queue_enabled is   |         |
|                            |     zero, so make sure you |         |
|                            |     change it if you want  |         |
|                            |     background processing  |         |
|                            |     to happen.             |         |
|                            | 3.  Versions that have no  |         |
|                            |     Q                      |         |
|                            | UEUE_WHEN_FILE_LARGER_THAN |         |
|                            |     are never queued for   |         |
|                            |     background processing; |         |
|                            |     versions with a        |         |
|                            |     Q                      |         |
|                            | UEUE_WHEN_FILE_LARGER_THAN |         |
|                            |     settings of zero are   |         |
|                            |     similarly never queued |         |
|                            |     (absence and zero are  |         |
|                            |     one and the same,      |         |
|                            |     config-wise).          |         |
|                            | 4.  Some types of media    |         |
|                            |     are setup by default   |         |
|                            |     to never queue no      |         |
|                            |     matter the             |         |
|                            |     \"                     |         |
|                            | queue_threshold_in_bytes\" |         |
|                            |     and \"queue_enabled\"  |         |
|                            |     settings. This         |         |
|                            |     includes media types   |         |
|                            |     for much little or no  |         |
|                            |     processing is done,    |         |
|                            |     including SWF, XML and |         |
|                            |     MSWord.                |         |
+----------------------------+----------------------------+---------+

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

+----------------------+----------------------+----------------------+
| Key                  | Description          | Example              |
+======================+======================+======================+
| QUEUE                | Queue to deliver the | `QUEUE = mediaproc`  |
|                      | media type to. Only  |                      |
|                      | `mediaproc` is       |                      |
|                      | supported currently. |                      |
+----------------------+----------------------+----------------------+
| QUEUED_MESSAGE       | Message to show on   | `QUEUED_             |
|                      | queue listing        | MESSAGE = _('Image i |
|                      |                      | s being processed')` |
+----------------------+----------------------+----------------------+
| QUEUE_USING_VERSION  | Version to use when  | `QUEUE_USING         |
|                      | queueing. Note here  | _VERSION = original` |
|                      | that you have to     |                      |
|                      | specify a version    |                      |
|                      | here that is not set |                      |
|                      | to QUEUE, and that   |                      |
|                      | you\'d almost always |                      |
|                      | want to be using     |                      |
|                      | `original` (a.k.a.   |                      |
|                      | the uploaded file).  |                      |
+----------------------+----------------------+----------------------+
| MEDIA_               | Name of the media    | `MEDIA_VIEW_DEFAUL   |
| VIEW_DEFAULT_VERSION | version that should  | T_VERSION = tilepic` |
|                      | be used as the       |                      |
|                      | default for display  |                      |
|                      | for the specified    |                      |
|                      | mimetype.            |                      |
|                      |                      |                      |
|                      | -   This is only a   |                      |
|                      |     suggestion -     |                      |
|                      |     it\'s the        |                      |
|                      |     version to       |                      |
|                      |     display in the   |                      |
|                      |     absence of any   |                      |
|                      |     overriding value |                      |
|                      |     provided by the  |                      |
|                      |     user.            |                      |
+----------------------+----------------------+----------------------+
| MEDIA_PRE            | Default version to   | `MEDIA_PREVIEW_DEFA  |
| VIEW_DEFAULT_VERSION | display as a preview | ULT_VERSION = small` |
|                      | for the given field  |                      |
|                      | based upon the       |                      |
|                      | currently loaded row |                      |
+----------------------+----------------------+----------------------+
| VERSIONS             | Versions describe    | ``` none             |
|                      | different            | VERSIONS = {         |
|                      | representation       |   thumbnail = {      |
|                      | versions. See        |       RULE = r       |
|                      | `providenceC         | ule_thumbnail_image, |
|                      | onfiguration/mainCon |                      |
|                      | figuration/media_pro |     VOLUME = images, |
|                      | cessing.conf:VERSION |                      |
|                      | S`{.interpreted-text |    QUEUE_WHEN_FILE_L |
|                      | role="ref"} for      | ARGER_THAN = 1000000 |
|                      | further details      |   },                 |
|                      |                      |   preview = {        |
|                      |                      |       RULE =         |
|                      |                      |  rule_preview_image, |
|                      |                      |                      |
|                      |                      |     VOLUME = images, |
|                      |                      |                      |
|                      |                      |    QUEUE_WHEN_FILE_L |
|                      |                      | ARGER_THAN = 1000000 |
|                      |                      |   },                 |
|                      |                      |   original 	= {       |
|                      |                      |       RULE =         |
|                      |                      | rule_original_image, |
|                      |                      |                      |
|                      |                      |     VOLUME = images, |
|                      |                      |                      |
|                      |                      |    QUEUE_WHEN_FILE_L |
|                      |                      | ARGER_THAN = 1000000 |
|                      |                      |   },                 |
|                      |                      |   tilepic 	= {        |
|                      |                      |       RULE =         |
|                      |                      |  rule_tilepic_image, |
|                      |                      |                      |
|                      |                      |   VOLUME = tilepics, |
|                      |                      |                      |
|                      |                      |    QUEUE_WHEN_FILE_L |
|                      |                      | ARGER_THAN = 1000000 |
|                      |                      |   }                  |
|                      |                      | }                    |
|                      |                      | ```                  |
+----------------------+----------------------+----------------------+

## VERSIONS

Each key is a version descriptor, containing an associative array, with
a pointer to media transformation
`rules <providenceConfiguration/mainConfiguration/media_processing.conf:MEDIA_TRANSFORMATION_RULES>` that help building a new derivative version of a media file.

+----------------------+----------------------+----------------------+
| Key                  | Description          | Example              |
+======================+======================+======================+
| RULE                 | Rule name            | `RULE = r            |
|                      |                      | ule_thumbnail_image` |
+----------------------+----------------------+----------------------+
| VOLUME               | A volume label from  | `VOLUME = images`    |
|                      | `providence          |                      |
|                      | Configuration/develo |                      |
|                      | per/media_volumes.co |                      |
|                      | nf:Media_volumes.con |                      |
|                      | f`                   |                      |
|                      |  file.               |                      |
|                      | Files will be stored |                      |
|                      | in/retrieved from    |                      |
|                      | this volume.         |                      |
+----------------------+----------------------+----------------------+
| QUEUE_W              | Filesize (in bytes)  | `QUEUE_WHEN_FILE     |
| HEN_FILE_LARGER_THAN | above which media    | _LARGER_THAN = 1000` |
|                      | should be queued for |                      |
|                      | background           |                      |
|                      | processing. Files    |                      |
|                      | smaller than the     |                      |
|                      | threshold will be    |                      |
|                      | processed at the     |                      |
|                      | time of upload, so   |                      |
|                      | you should set this  |                      |
|                      | to a small enough    |                      |
|                      | value that your      |                      |
|                      | server has a shot at |                      |
|                      | processing the media |                      |
|                      | in near-realtime. A  |                      |
|                      | safe bet is 500,000  |                      |
|                      | bytes (eg. 0.5       |                      |
|                      | megabytes), but you  |                      |
|                      | may need to go lower |                      |
|                      | (or higher).         |                      |
|                      |                      |                      |
|                      | Note that you can    |                      |
|                      | override this        |                      |
|                      | setting for specific |                      |
|                      | media types and      |                      |
|                      | versions below if    |                      |
|                      | you wish. Also keep  |                      |
|                      | in mind a few other  |                      |
|                      | fun facts:           |                      |
|                      |                      |                      |
|                      | 1.  If the           |                      |
|                      |     queue_enabled    |                      |
|                      |     setting in       |                      |
|                      |     global.conf is   |                      |
|                      |     set to zero then |                      |
|                      |     no background    |                      |
|                      |     processing will  |                      |
|                      |     take place, no   |                      |
|                      |     matter what you  |                      |
|                      |     set here.        |                      |
|                      | 2.  The default      |                      |
|                      |     setting for      |                      |
|                      |     queue_enabled is |                      |
|                      |     zero, so make    |                      |
|                      |     sure you change  |                      |
|                      |     it if you want   |                      |
|                      |     background       |                      |
|                      |     processing to    |                      |
|                      |     happen.          |                      |
|                      | 3.  Versions that    |                      |
|                      |     have no          |                      |
|                      |     QUEUE_W          |                      |
|                      | HEN_FILE_LARGER_THAN |                      |
|                      |     are never queued |                      |
|                      |     for background   |                      |
|                      |     processing;      |                      |
|                      |     versions with a  |                      |
|                      |     QUEUE_W          |                      |
|                      | HEN_FILE_LARGER_THAN |                      |
|                      |     settings of zero |                      |
|                      |     are similarly    |                      |
|                      |     never queued     |                      |
|                      |     (absence and     |                      |
|                      |     zero are one and |                      |
|                      |     the same,        |                      |
|                      |     config-wise).    |                      |
|                      | 4.  Some types of    |                      |
|                      |     media are setup  |                      |
|                      |     by default to    |                      |
|                      |     never queue no   |                      |
|                      |     matter the       |                      |
|                      |     \"queue_         |                      |
|                      | threshold_in_bytes\" |                      |
|                      |     and              |                      |
|                      |                      |                      |
|                      |    \"queue_enabled\" |                      |
|                      |     settings. This   |                      |
|                      |     includes media   |                      |
|                      |     types for much   |                      |
|                      |     little or no     |                      |
|                      |     processing is    |                      |
|                      |     done, including  |                      |
|                      |     SWF, XML and     |                      |
|                      |     MSWord.          |                      |
+----------------------+----------------------+----------------------+

## MEDIA_TRANSFORMATION_RULES

Rules that describe how to build a derivative version of a media file.
There are `operations <media_rules_operations>` on the image and also
`filters <media_rules_filters>`.

It is an associative array of operation keys.

Here it is a listing of available **operations**:

+-----------+---------------------------+---------------------------+
| Operation | Description               | Example                   |
+===========+===========================+===========================+
| ANNOTATE  | Add annotations to a      | ``` text                  |
|           | media file. Note that     | ANNOTATE {                |
|           | annotation requires an    |   position = south_east,  |
|           | alpha channel. If none is |   text = "Annotation",    |
|           | available, an all opaque  |   inset = 10,             |
|           | alpha channel is          |   font = Arial,           |
|           | implicitedly created. Not |   size = 16,              |
|           | available for GD image    |   color = blue            |
|           | plugin.                   | }                         |
|           |                           | ```                       |
|           | Parameters are:           |                           |
|           |                           |                           |
|           | -   position: a list of   |                           |
|           |     values from `north`,  |                           |
|           |     `north_west`,         |                           |
|           |     `north_east`,         |                           |
|           |     `south`,              |                           |
|           |     `south_east`,         |                           |
|           |     `south_west`,         |                           |
|           |     `center`.             |                           |
|           | -   text: the annotation  |                           |
|           |     text. You should      |                           |
|           |     escape single quote   |                           |
|           |     chars in the text.    |                           |
|           | -   inset: position of    |                           |
|           |     text inside the       |                           |
|           |     frame.                |                           |
|           | -   font: set the font of |                           |
|           |     the text. Available   |                           |
|           |     fonts vary from       |                           |
|           |     system to system.     |                           |
|           | -   size: Point size for  |                           |
|           |     the font.             |                           |
|           | -   color: color for the  |                           |
|           |     background. accepts a |                           |
|           |     color name, a hex     |                           |
|           |     color, or a numerical |                           |
|           |     RGB, RGBA, HSL, HSLA, |                           |
|           |     CMYK, or CMYKA        |                           |
|           |     specification, for    |                           |
|           |     example, `blue`,      |                           |
|           |     `#ddddff`,            |                           |
|           |     `rgb(255,255,255)`.   |                           |
+-----------+---------------------------+---------------------------+
| CROP      | Crop the file. Params:    | ``` text                  |
|           |                           | CROP {                    |
|           | -   `width`: target width |   width = 100,            |
|           |     of the file.          |   height = 100,           |
|           | -   `height`: target      |   x = 10,                 |
|           |     height of the file.   |   y = 10                  |
|           | -   `x`: horizontal       | }                         |
|           |     offset.               | ```                       |
|           | -   `y`: vertical offset. |                           |
+-----------+---------------------------+---------------------------+
| FLIP      | Reflect the scanlines in  | ``` text                  |
|           | the vertical or           | FLIP                      |
|           | horizontal direction. The |  { direction = vertical } |
|           | image will be mirrored    | ```                       |
|           | upside-down or            |                           |
|           | left-right. Set direction |                           |
|           | to `vertical` or          |                           |
|           | `horizontal`              |                           |
+-----------+---------------------------+---------------------------+
| ROTATE    | Rotate the file.          | ``` text                  |
|           | Parameters:               | ROTATE { angle = 30 }     |
|           |                           | ```                       |
|           | -   `angle`: angle in     |                           |
|           |     degrees.              |                           |
+-----------+---------------------------+---------------------------+
| SCALE     | Scale the file. Configure | ``` text                  |
|           | the following params:     | # Limit                   |
|           |                           | higher dimension to 240px |
|           | -   `antialiasing`:       | SCALE = {                 |
|           |     boolean to activate   |   width = 240,            |
|           |     anti-aliasing.        |   height = 240,           |
|           | -   `width`: new width of |   mode = bounding_box,    |
|           |     the file. It is       |   antialiasing = 0        |
|           |     optional, but one of  | }                         |
|           |     height or width must  |                           |
|           |     be provided.          | # 200px Square thumbnails |
|           | -   `height`: new height  | SCALE = {                 |
|           |     of the file. It is    |   width = 200,            |
|           |     optional, but one of  |   height = 200,           |
|           |     height or width must  |   mode = fill_box,        |
|           |     be provided.          |   crop_from = center,     |
|           | -   `mode`: Scaling mode  |   antialiasing = 0        |
|           |     -   `width`: Scale    | }                         |
|           |         proportionally to | ```                       |
|           |         width.            |                           |
|           |     -   `height`: Scale   |                           |
|           |         proportionally to |                           |
|           |         height.           |                           |
|           |     -   `bounding_box`:   |                           |
|           |         Scale             |                           |
|           |         proportionally    |                           |
|           |         and keep largest  |                           |
|           |         dimension inside  |                           |
|           |         the bounding box. |                           |
|           |     -   `fill_box`: Scale |                           |
|           |         proportionally    |                           |
|           |         and stretch       |                           |
|           |         shortest          |                           |
|           |         dimension to fill |                           |
|           |         all the box.      |                           |
|           | -   `crop_from`: it is a  |                           |
|           |     position field, which |                           |
|           |     is only used in       |                           |
|           |     fill_box mode. Not    |                           |
|           |     available for         |                           |
|           |     GMagick.              |                           |
|           | -   `trim_edges`: remove  |                           |
|           |     edges, it allows a    |                           |
|           |     percentage value. Not |                           |
|           |     available for         |                           |
|           |     GMagick.              |                           |
+-----------+---------------------------+---------------------------+
| SET       | Set properties on the     | ``` text                  |
|           | media processing handler. | SET = {                   |
|           | Available values are:     |   quality = 75,           |
|           |                           |   format = image/jpeg     |
|           | -   `antialiasing`        | }                         |
|           | -   `colorspace`          | ```                       |
|           | -   `gamma`               |                           |
|           | -   `height`              |                           |
|           | -   `layer_ratio`         |                           |
|           | -   `layers`              |                           |
|           | -   `mimetype`            |                           |
|           | -   `no_upsampling`       |                           |
|           | -   `output_layer`        |                           |
|           | -   `quality`             |                           |
|           | -   `reference-black`     |                           |
|           | -   `reference-white`     |                           |
|           | -   `tile_height`         |                           |
|           | -   `tile_mimetype`       |                           |
|           | -   `tile_width`          |                           |
|           | -   `tiles`               |                           |
|           | -   `typename`            |                           |
|           | -   `version`             |                           |
|           | -   `width`               |                           |
|           | -   `compress`: Available |                           |
|           |     for format            |                           |
|           |     `application/pdf`.    |                           |
|           |     Available values are: |                           |
|           |     -   `screen`: selects |                           |
|           |         low-resolution    |                           |
|           |         output similar to |                           |
|           |         the Acrobat       |                           |
|           |         Distiller (up to  |                           |
|           |         version X) Screen |                           |
|           |         Optimized         |                           |
|           |         setting.          |                           |
|           |     -   `ebook` selects   |                           |
|           |         medium-resolution |                           |
|           |         output similar to |                           |
|           |         the Acrobat       |                           |
|           |         Distiller (up to  |                           |
|           |         version X) eBook  |                           |
|           |         setting.          |                           |
|           |     -   `prepress`        |                           |
|           |         selects output    |                           |
|           |         similar to        |                           |
|           |         Acrobat Distiller |                           |
|           |         Prepress          |                           |
|           |         Optimized (up to  |                           |
|           |         version X)        |                           |
|           |         setting.          |                           |
|           |     -   `default` selects |                           |
|           |         output intended   |                           |
|           |         to be useful      |                           |
|           |         across a wide     |                           |
|           |         variety of uses,  |                           |
|           |         possibly at the   |                           |
|           |         expense of a      |                           |
|           |         larger output     |                           |
|           |         file.             |                           |
+-----------+---------------------------+---------------------------+
| WATERMARK | ..                        | ``` text                  |
|           | \_media_proc              | WATERMARK = {             |
|           | essing_rule_watermarking: |   image = <c              |
|           |                           | a_app_dir>/watermark.png, |
|           | Add a watermark to a      |   width = 72,             |
|           | media file. Parameters    |   height = 85,            |
|           | are:                      |   position = south_east,  |
|           |                           |   opacity = 0.4           |
|           | -   `image`: Absolute     | },                        |
|           |     path to your          | ```                       |
|           |     watermark image. Note |                           |
|           |     that this MUST be the |                           |
|           |     absolute path to the  |                           |
|           |     watermark image. If   |                           |
|           |     you put it in your    |                           |
|           |     \'app\' directory you |                           |
|           |     can use preexisting   |                           |
|           |     macros set in         |                           |
|           |     `global.conf`, such   |                           |
|           |     as `<ca_app_dir>`, to |                           |
|           |     avoid hardcoding in   |                           |
|           |     path info. Eg. if you |                           |
|           |     have the watermark    |                           |
|           |     image at              |                           |
|           |     `/web/ca/a            |                           |
|           | pp/watermarks/mymark.png` |                           |
|           |     you can configure it  |                           |
|           |     here as               |                           |
|           |     `<ca_app_dir          |                           |
|           | >/watermarks/mymark.png`. |                           |
|           |     There is no default   |                           |
|           |     value.                |                           |
|           | -   `width`: Width of     |                           |
|           |     watermark in pixels.  |                           |
|           |     Default value is 50%  |                           |
|           |     of the width of the   |                           |
|           |     image being           |                           |
|           |     processed.            |                           |
|           | -   `height`: Height of   |                           |
|           |     watermark in pixels.  |                           |
|           |     Default value is 50%  |                           |
|           |     of the height of the  |                           |
|           |     image being processed |                           |
|           | -   `position`: Location  |                           |
|           |     of watermark on       |                           |
|           |     processed image;      |                           |
|           |     allowable values will |                           |
|           |     place the watermark   |                           |
|           |     on the corners (eg.   |                           |
|           |     `north_west` is the   |                           |
|           |     upper-left-hand       |                           |
|           |     corner), the center   |                           |
|           |     on top or bottom      |                           |
|           |     (`north` or `south`)  |                           |
|           |     or in the center of   |                           |
|           |     the image (`center`). |                           |
|           |     Available values are  |                           |
|           |     `north`,              |                           |
|           |     `north_west`,         |                           |
|           |     `north_east`,         |                           |
|           |     `south`,              |                           |
|           |     `south_east`,         |                           |
|           |     `south_west`,         |                           |
|           |     `center`.             |                           |
|           | -   `opacity`: Determines |                           |
|           |     transparency of       |                           |
|           |     watermark image. Use  |                           |
|           |     a value between 0     |                           |
|           |     and 1. 0=completely   |                           |
|           |     transparent;          |                           |
|           |     1.0=completely        |                           |
|           |     opaque. Default value |                           |
|           |     is 0.5                |                           |
+-----------+---------------------------+---------------------------+

Here it is a listing of available **filters**.

+----------------+-------------------------+-----------------------+
| Filter         | Description             | Example               |
+================+=========================+=======================+
| DESPECKLE      | Reduce the speckles     | ``` text              |
|                | within an image. No     | DESPECKLE { }         |
|                | parameters.             | ```                   |
+----------------+-------------------------+-----------------------+
| MEDIAN         | Apply a median filter   | ``` text              |
|                | to the image, of the    | MEDIAN { radius = 2 } |
|                | given radius.           | ```                   |
+----------------+-------------------------+-----------------------+
| SHARPEN        | Use a Gaussian operator | ``` text              |
|                | of the given radius and | SHARPEN {             |
|                | standard deviation      |   radius = 0,         |
|                | (sigma). For reasonable |   sigma = 0.63        |
|                | results, radius should  | }                     |
|                | be larger than sigma.   | ```                   |
|                | Use a radius of 0 to    |                       |
|                | have the method select  |                       |
|                | a suitable radius.      |                       |
|                |                         |                       |
|                | The parameters are:     |                       |
|                |                         |                       |
|                | -   **radius**: The     |                       |
|                |     radius of the       |                       |
|                |     Gaussian, in        |                       |
|                |     pixels, not         |                       |
|                |     counting the center |                       |
|                |     pixel (default 0).  |                       |
|                |                         |                       |
|                | \* **sigm               |                       |
|                | a**: The standard devia |                       |
|                | tion of the Gaussian, i |                       |
|                | n pixels (default 1.0). |                       |
|                |                         |                       |
|                | :   It can be any       |                       |
|                |     floating point      |                       |
|                |     value from 0.1, for |                       |
|                |     practically no      |                       |
|                |     sharpening, to      |                       |
|                |                         |                       |
|                | 3 or more for sever     |                       |
|                | sharpening. 0.5 to 1.0  |                       |
|                | is rather good.         |                       |
|                |                         |                       |
|                | The larger the sigma    |                       |
|                | the more it sharpens.   |                       |
|                |                         |                       |
|                | -   `sharpen 0x.4`:     |                       |
|                |     very small          |                       |
|                | -   `sharpen 0x1.0`:    |                       |
|                |     about one pixel     |                       |
|                |     size sharpen        |                       |
|                | -   `sharpen 0x3.0`:    |                       |
|                |     probably getting    |                       |
|                |     too large           |                       |
+----------------+-------------------------+-----------------------+
| UNSHARPEN_MASK | This filter sharpens an | ``` text              |
|                | image. The image is     | UNSHARPEN_MASK {      |
|                | convolved with a        |   radius = 0,         |
|                | Gaussian operator of    |   sigma = 0.45,       |
|                | the given radius and    |   amount = 1.5,       |
|                | standard deviation      |   threshold = 0       |
|                | (sigma). For reasonable | }                     |
|                | results, radius should  | ```                   |
|                | be larger than sigma.   |                       |
|                | Use a radius of 0 to    |                       |
|                | have the method select  |                       |
|                | a suitable radius.      |                       |
|                |                         |                       |
|                | The parameters are:     |                       |
|                |                         |                       |
|                | -   **radius**: The     |                       |
|                |     radius of the       |                       |
|                |     Gaussian, in        |                       |
|                |     pixels, not         |                       |
|                |     counting the center |                       |
|                |     pixel (default 0).  |                       |
|                | -   **sigma**: The      |                       |
|                |     standard deviation  |                       |
|                |     of the Gaussian, in |                       |
|                |     pixels (default     |                       |
|                |     1.0).               |                       |
|                | -   **amount**: The     |                       |
|                |     fraction of the     |                       |
|                |     difference between  |                       |
|                |     the original and    |                       |
|                |     the blur image that |                       |
|                |     is added back into  |                       |
|                |     the original        |                       |
|                |     (default 1.0).      |                       |
|                | -   **threshold**: The  |                       |
|                |     threshold, as a     |                       |
|                |     fraction of         |                       |
|                |     QuantumRange,       |                       |
|                |     needed to apply the |                       |
|                |     difference amount   |                       |
|                |     (default 0.05).     |                       |
+----------------+-------------------------+-----------------------+
