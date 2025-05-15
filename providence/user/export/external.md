---
title: External Export Framework
---

# External Export Framework

:::note
This feature is available from CollectiveAccess version 1.8.
:::

CollectiveAccess can interact with other external systems, including
digital preservation and data backup platforms, using the external
export framework. The framework provides a pipeline for assembly,
packaging and transmission of CollectiveAccess-managed metadata and
media to other applications. A variety of standard formats and protocols
are supported and may be mixed and matched to facilitate interoperation.

The framework operates at the record level, creating packages
incorporating metadata, media (images, audio, video, documents) and
documentation such as checksums and use statements for individual
objects, collections and other record types. Record metadata may be
generated in any format supported by the
`metadata export system <export_mappings>`, including XML, tab, CSV and MARC, and can include metadata
from related records. Multiple metadata exports may be included in a
single package, as well as any available versions of associated media.

Package formats include interchange standards such as
[BagIT](https://en.wikipedia.org/wiki/BagIt) and widely used container
formats such as ZIP. Once packages are created, the framework can
transfer them to external systems using protocols such as Secure FTP.

The framework is designed to be extensible. It is possible to add
support for additional package formats or data transport protocols by
creating software plugins.

## Configuration

Behavior of the external export framework is controlled using
[targets]. A target is a set of configuration defining what
data is to be exported, how that data is to be packaged, what criteria
trigger creation of a package and where packages are ultimately sent.
You can configure as many targets as required, each with its own
packaging, destinations and other characteristics.

Targets are defined in the **external_exports.conf**
configuration file. Each target has a unique code and a dictionary of
configuration values. Within the dictionary, a few top-level settings
define basic parameters:

| Setting | Description | Example Value
|----|----|----|
| label|The name of the target, for display.|CTDA MODS export|
|enabled|Indicates if the target should be processed or not. Set to 0 to disable the target or 1 to enable.|1|
|table|Defines the table this target exports records from.|ca_objects|
|restrictToTypes|An optional list of one or more types for the export table. If set, only records with the specified types will be exported.|[books, documents]|
|checkAccess|An optional list of one or more access values to filter record on. If set, only records with the specified access values will be exported|[1] (export only records with an access status of “1”, which is typically used to indicate the record is public)|

Detailed configuration is contained in three blocks:

-   [triggers] defines the criteria that will trigger export
    of a record to this target.
-   [output] defines the data to be exported

``` none
targets = {
    mods_export_to_sftp_server = {
        label = MODS export,
        enabled = 1,

        table = ca_objects,
        checkAccess = [1],

        triggers = {
            lastModified = {
                from_log_timestamp = 4/1/2020,
                #from_log_id = 20000,
                #query = cooking
            }
        },

        output = {
            format = BagIT,
            name = "EXPORT_^ca_objects.idno",
            content = {
                mods.xml = {
                    type = export,
                    exporter = mods_exporter_with_guid
                },
                . = {
                    type = file,
                    files = {
                        ca_object_representations.media.original = {
                            delimiter = .,
                            components = {^original_filename }
                        }
                    }
                }
            },
            options = {
                file_list_template = "^ca_objects.idno, ^filename, ^filesize_for_display, ^mimetype",
                file_list_delimiter = ";"
            }
        },

        destination = {
            type = sFTP,
            hostname = my-sftp-server@example.net,
            user = my_user,
            password = my_password,
            path = "path/to/where/packages/are/uploaded"
        }
    }
}
```

## Running an Export

To Come

# Extending the Framework

Overview of plugin system to come.
