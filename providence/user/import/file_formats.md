---
title: Supported File Formats
sidebar_position: 9
---

# Supported File Formats

## Overview

Data may be imported into CollectiveAccess in a range of formats, including from Excel, CSV, a range of XML formats, and others including external databases such as WorldCat. The fields from these sources are matched to CollectiveAccess tables and fields using the Import Mapping document’s “Source” column (see Column 2: Source in [Creating an Import Mapping](https://docs.collectiveaccess.org/providence/user/import/c_creating_mapping)). 

This page provides an overview of formats compatible with data import as well as how to identify a specific element from the source file for the Mapping document.

:::note
Data can only be imported into CollectiveAccess in a supported data format.
:::

## Currently Supported File Formats

### XLS, XLSX, CSV, TSV

Spreadsheets are mapped by column, with numeric identifiers provided in the Source column of the import mapping. If you wish to map from Column B of an Excel spreadsheet, you would list the Source as 2. (A = 1, B = 2, C = 3, and so on.)

### XML (Including FileMaker XML, Inmagic XML, EAD XML, PastPerfect XML, Vernon XML, TEI XML, PBCore XML, MediaBin, MARCXML & MODS)

XML sources are referenced using [xPath](https://en.wikipedia.org/wiki/XPath), a query language for selecting nodes and computing values from XML documents (a basic tutorial is available from [W3C](https://www.w3schools.com/xml/xpath_intro.asp)).

In general the Source column should be set to the name of the XML tag, proceeded with a forward slash (i.e. /Sponsoring_Department or /inm:ContactName).

:::note
For XML sources, the Import Mapping Spreadsheet must contain a mandatory "basepath" setting, located in Settings at the bottom of the spreadsheet. The basepath setting is used to supply a set of XML nodes that will be treated, for purposes of import, as individual records. If left blank, each XML document will be treated as a single record. See [Creating an Import Mapping](https://docs.collectiveaccess.org/providence/user/import/c_creating_mapping) for more.
:::

Common examples of xPath expressions are provided below.

#### Items

* Imports element items. This example imports “ITEM”:

XML Example:

```
<text>
    <body>
        <div>
            ITEM
        </div>
    </body>
</text>
```

Mapping Source Syntax: `/text/body/div`


#### Items with a Particular Attribute Value

* Imports items only from elements with a certain attribute node value. This example maps element items with “thistype!” as attribute value:

XML Example:

```
<text>
    <body>
        <div attribute="thistype!">
            ITEM
        </div>
    </body>
</text>
```

Mapping Source Syntax: `/text/body/div[@attribute='thistype!']`

#### Attribute Value

* Imports the attribute node value itself. Using the example, this mapping would import ‘thistype!’ itself, as opposed to “ITEM":

XML Example:

```
<text>
    <body
        <div attribute="thistype!">
            ITEM
        </div>
    </body>
</text>
```
Mapping Source Syntax: `/text/body/div/@attribute`

#### Items *not* of a particular attribute value

* Imports items in cases where the element does not have an attribute, or in cases where the attribute value is empty. This only necessary in cases where there are other instances where the same element does have the attribute, like the example here. In this case, ITEM_1 would be imported, and ITEM_2 would not.

XML Example:

```
<text>
    <body>
       <div>
            ITEM_1
        </div>
        <div attribute="thistype!">
            ITEM_2
        </div>
    </body>
</text>
```
Mapping Source Syntax: `/text/body/div[not(@attribute)]`


MARCXML files can also be imported using the xPath syntax. Standard fields and indicators can be selected as Sources as follows:

#### 245 - Title Statement

* Mapping source for MARC data field 245 subfield a.

```<datafield ind1="1" ind2="4" tag="245">
   <subfield code="a">The human factor /</subfield>
</datafield>
```

Mapping source syntax (XPATH): `/datafield[@tag='245']/subfield[(@code='a')]`

#### 001- Control Number

* Mapping source for MARC control field 001

```
<controlfield tag="001">3780733</controlfield>
```
Mapping source syntax (XPATH): `/controlfield[@tag='001']`

#### 100 - Main Entry: Personal Name

* Mapping source for MARC data field 100 subfield a.

```
<datafield ind1="1" ind2=" " tag="100">
   <subfield code="a">Greene, Graham,</subfield>
</datafield>
```
Mapping source syntax (XPATH): `/datafield[@tag='100']/subfield[(@code='a')]`


FileMakerPro XMLRESULT files generally follow the XML and xPath conventions described above but require some special formatting considerations due to inclusion of invalid characters in field names in certain databases (i.e. ArtBase). Source field names in the mapping must follow these rules:

- Field name should be preceeded with a forward slash (i.e. /Inventory::ArtistLast)

- The importer does not trim trailing spaces in field names so watch out for that!

- Only A-Z a-z 0-9 and these special characters are accepted _ - & # ? % :

- For all other special characters, including a space, replace the character with a single _ (underscore).

- If two invalid special characters fall in a row, use only a single _ (underscore) rather than two

### MARC

To Come

### EXIF, IPTC, XMP

These embedded metadata standards can be imported from uploaded media (images, video, audio, etc.) using the same import mappings as described above. The inputFormat should always be set to “EXIF”.

:::note
**System Requirement** To import EXIF data your server must have the free [ExifTool](https://exiftool.org/) application installed on your server. Make sure the ExifTool entry in your external_application.conf configuration file is set to point to the installed application.
:::

EXIF data can be difficult to decifer and locate the desired fields for import as the labels that appear in applications such as Photoshop that use the data often do not match the names given in the underlying EXIF file.

These names can be found by running the ExifTool command-line application. Once installed it can be run as:

`exiftool -json -a -gl my_file.tiff`

This will return a set of JSON encoded metadata, which matches the format used by the CollectiveAccess importer, allowing the names of fields within the metadata to be accurately identified. For example this block of EXIF metadata can be used to identify the type of lens used for a photograph:

```
"XMP-aux": {
   "SerialNumber": 1260413208,
   "LensInfo": "18-55mm f/?",
   "Lens": "18.0-55.0 mm",
   "ImageNumber": 0,
   "ApproximateFocusDistance": 4294967295,
   "FlashCompensation": 0,
   "OwnerName": "Erik Garcia Gomez",
   "Firmware": "1.1.1"
},
```

To extract the lens information the block heading “XMP-aux” would be joined with the sub-section “Lens” with a slash to create “XMP-aux/Lens”. This would be added to the Source column of the import mapping and matched with a target field in CollectiveAccess.

As this import format is used frequently in conjunction with media import, two more options are available to help identify uploaded media and match metadata to the correct files within the system. Use _filename_ as a source if you wish to set any field in CollectiveAccess as the filename. And more importantly, _filepath_ points to the media in the import directory, and can be used to trigger ingestion of the media itself.

* __filename__: This source value takes the filename of the media being imported. You can import filenames to any field in CollectiveAccess, including preferred_labels and idno.

* __filepath__: This source takes the full server filepath from your media import directory to give you the media. Map this to ca_object_representations and use the objectRepresentationSplitter.

```
{"objectRepresentationType": "front",
   "attributes": {
       "media": "^__filepath__"
   }
}
```

### RDF

To Come

### ULAN-Linked Data

ULAN Data can be imported through an interface available in the Import menu dropdown in CollectiveAccess.

### Omeka

To Come

### WorldCat

WorldCat objects can be searched and imported using the WorldCat interface available in the Import menu dropdown. This tool uses standard import mappings to match the WorldCat source fields to fields in the CollectiveAccess profile.

These import mappings are written as described above in the xPath notation used for MARCXML.

### CollectiveAccess

Migrating data from one CollectiveAccess installation to another can be done by setting the Source column to the appropriate ca_table.element identifier. This will map the originating data to the fields of the new installation.





