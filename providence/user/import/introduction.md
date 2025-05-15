---
title: Introduction to Import Mappings  
sidebar_label: Introduction to Import Mappings 
sidebar_position: 1
---

# Introduction to Import Mappings  

## What is an Import Mapping?


In order to import data into CollectiveAccess, it is necessary to define
exactly *how* and *where* the source data will be imported. This
information, along with other settings and criteria, is defined in an
**import mapping spreadsheet.**

An import mapping spreadsheet (XLSX or GoogleSheets) defines how data is
imported into CollectiveAccess. This spreadsheet acts as a crosswalk,
detailing where data is coming from outside of CollectiveAccess
(source), and where that same data will go once it is in
CollectiveAccess (destination). There are many settings and options
available in an import mapping to help organize and manipulate source
data, and to ensure that data gets imported in a logical way, while also
meeting a variety of user needs. These settings and options are
described in more detail on the [Creating an Import Mapping:
Overview](c_creating_mapping)
page.

## Import Mapping Spreadsheet: Purpose and Function

An import mapping spreadsheet is a crosswalk that defines where source data will go once imported into  CollectiveAccess. It maps specific elements of source data in a supported file format to CollectiveAccess. An import mapping is in spreadsheet format (XLSX or GoogleSheets), and is organized in columns and rows.

In addition to defining where source data will go in CollectiveAccess, an import mapping spreadsheet also uses a multitude of options, expressions, and other data transformations to transform the source data in a variety of ways. 

A mapping spreadsheet uses JavaScript Object Notation (JSON)
JSON syntax to transform and manipulate source data. A mapping spreadsheet also uses ca_table.element_codes to define the metadata element in CollectiveAccess to which the source data will be mapped.

In addition to defining where source data will go in CollectiveAccess, an import mapping spreadsheet also defines three elements that are key to a data import:

1. The data input format 
2. The CollectiveAccess table to which the data belongs
3. The CollectiveAccess record type to which the data belongs

:::note
For XML input formats only, an import mapping also defines the basepath setting, indicating where new records begin and end. 
:::

## Import Mapping Spreadsheet: Structure 

An import mapping is a spreadsheet with two main parts: 

1. The crosswalk, where source data fields are mapped to CA fields and various, optional transformations are applied
2. The settings, where some basic elements are defined like the source data type, the mapping name, the corresponding CollectiveAccess table, existing record policy, and more. 

Import mappings operate under two basic assumptions about the data being imported:

1.  Each **row** in a data set corresponds to a **single record.**
2.  Each **column** in a data set corresponds to a **single metadata
    element**, or **field.**

Each row in an import mapping spreadsheet corresponds to a single metadata element (or field) from the source data. 

Each column in an import mapping spreadsheet corresponds to a different function of the crosswalk, some of which are required, and some of which are optional. 

:::info[note]

The exception to these assumptions is an option called
*treatAsIdentifiersForMultipleRows* that will explode a single row into
multiple records. This is very useful if you have a data source that
references common metadata shared by many pre-existing records in a
single row. See [Mapping
Options](mappingOptions)
for more details.

:::

:::info[note]

Excel Tip for Import Mapping Spreadsheets: Translating A, B, C... to 1,
2, 3... can be time-consuming. Excel's preferences allow you to change
columns to display numerically rather than alphabetically. Go to Excel
Preferences and select "General." Click "Use R1C1 reference style." This
will display the column values as numbers.

::::

## Supported Data Input Formats

Data can only be imported into CollectiveAccess in a supported data
format. Supported data formats include: XLXS, Exif, MODS, RDF, Vernon,
FMPDSOResult, MediaBin, ResourceSpace, WordpressRSS, CSVDelimited,
FMPXMLResult, MySQL, SimpleXML, WorldCat, CollectiveAccess (CA-to-CA
imports), Inmagic, Omeka, TEI, iDigBio, EAD, MARC, PBCoreInst,
TabDelimited, Excel, MARCXML, PastPerfectXML, and ULAN.

For more, see [Supported File
Formats](https://docs.collectiveaccess.org/providence/user/import/file_formats).

The following pages will walk the user through the different parts of an
import mapping spreadsheet, how to create an import mapping, and
finally, how to run a data import in CollectiveAccess using the import
mapping.

## Sample Import Mapping Spreadsheet, Sample Source Data, and Sample Installation Profile

To follow along with the tutorial, download the following three files:

[Sample Import Mapping Spreadsheet](/providence/documents/sample_mapping_tutorial.xlsx): The import mapping spreadsheet; a schema crosswalk.
For every data source, a target "destination" in CollectiveAccess is
defined. This file is in the supported file format of XLXS; therefore,
columns and rows are numbered using 1, 2, 3, and so on.

[Sample Import Data (Source Data)](/providence/documents/sample_import_data_tutorial.xlsx): The sample source data. This sample data includes
three records (one row = one record), with 10 examples of possible
metadata fields (one column = one field). The sample data is in the
supported file format of XLXS; therefore, columns and rows are numbered
using 1, 2, 3, and so on.

[Sample Installation Profile](/providence/documents/Sample_import_profile.xml): The sample Providence installation profile. This
profile, written in XML format, defines the aspects of the
CollectiveAccess system, into which the example data is imported. The
profile tells the software how to set up various aspects of Providence.
For more on installation profiles in CollectiveAccess, please see
[Profiles](/providence/dataModelling/Profiles).

## Blank Import Mapping Spreadsheet

[Blank Import Mapping Spreadsheet](/providence/documents/Blank_starter_import_mapping.xlsx): A blank import mapping spreadsheet in XLXS forrmat.
This is a blank template provided to help create a new import mapping.
Download this blank spreadsheet to create an import mapping with your
own data.
