---
title: Introduction to Data Imports 
sidebar_position: 2
---

# Introduction to Data Imports

In progress documentation about CollectiveAccess data imports

## Data Import: Purpose

A data import is the process by which source data is ingested into a CollectiveAccess system. In order to get data into a CollectiveAccess system, a data import must be performed. 

A data import takes data in [various formats](https://docs.collectiveaccess.org/providence/user/import/file_formats) and ingests it into a CollectiveAccess system via an import mapping spreadsheet. 

There are two components to a data import: 

1. The raw data file or files
2. The import mapping spreadsheet

Without which the import process will not work.

A data import will take source data, and, using an import mapping spreadsheet, transform and ingest it into CollectiveAccess. This spreadsheet acts as a crosswalk, detailing where data is coming from outside of CollectiveAccess, and where that same data will go in CollectiveAccess. The data import imports one, singular record type at a time, which corresponds to a CollectiveAccess basic table. 

Data files generally do not need to be manipulated before being imported (with the exception of invalid XML; see the note below), as the import process is designed to support a variety of data formats.

:::note
When importing source data in XML format, files must be encoded with [UTF-8](https://en.wikipedia.org/wiki/UTF-8). This is important if files are being exported from another system (such as Past Perfect) and encodings are different. XML files must also be validated prior to being used for import; the CollectiveAccess importer will not run with invalid files.
:::

## Basic Concepts

There are a few basic concepts to keep in mind about the data import process:

* *A data import imports one, singular record type, corresponding to a primary table in CollectiveAccess.* Although related records of varying types can be created from a single mapping, the import is designed to only create one record type at a time--for example, Objects, Entities, and so on. Importing multiple types of data will therefore require multiple data imports. 

* *A data import requires an import mapping spreadsheet.* In order to define specifically how and where source data will be imported into CollectiveAccess, and what kind of data files are being imported, an import mapping must be created as a crosswalk. Data cannot be imported without an import mapping spreadsheet.

* *An import mapping spreadsheet uses [JavaScript Object Notation (JSON) syntax](https://www.w3schools.com/js/js_json_intro.asp) to transform and manipulate data.* A mapping spreadsheet also uses **ca_table.element_codes** to define the metadata element in CollectiveAccess to which the source data will be mapped.

* *Where exactly source data gets mapped to in a CollectiveAccess system is based on each system’s data model.* In the import mapping spreadsheet, ideally each field from the source data is given a place in CollectiveAccess (for example, a date value will go in a CA date field, and so on). However, where source data lives in CollectiveAccess will depend on system configuration. 

* *A single data import does not simply ingest ‘flat’ data ascribing to a single data type.* Relationships and hierarchies of various types can be created in any single import mapping based on the contents of the data file. 

* *A data import can be performed in the user interface of any working CollectiveAccess system upon successful installation.* For more advanced users, an import can also be executed on the command line (Terminal). 

* *Running data imports usually results in some standard errors.* Errors are logged in the Importer UI as the data import runs; however, CollectiveAccess also logs a more detailed history of activity that can be used for troubleshooting an import that references timestamps, record numbers, and more details about the error.

## Multiple Imports

As stated above, a data import is the process by which source data is ingested into a CollectiveAccess system. A data import imports one, singular record type corresponding to a single CollectiveAccess table. Depending on the format of source data, a separate data import will be needed for each data file in your data set, depending on the data type/table. It may be useful to remember the basic structure of CollectiveAccess, to explain why multiple import mapping spreadsheets are needed: 

> CollectiveAccess is structured around several primary tables: Objects, Lots, Entities, Places, Occurrences, Collections, and so on, with editors that can be enabled (or disabled) depending on project requirements. Each primary table has intrinsic bundles and its own set of preferred and non-preferred labels bundles.

These primary tables can be broken out by type—Objects into Photographs, Books, Artworks, and Documents, and Entities into Individuals and Organizations, for example–depending on your data model.

Generally speaking, *each primary table requires its own import mapping spreadsheet.* Further import mapping spreadsheets are needed if records within a table are differentiated by type. 

:::note
It’s important to remember that an import mapping spreadsheet is tied intrinsically to a system’s data model–the fields that source data will be mapped to, the record type, and the CA table are all dependent on your system set up. 
:::

## Where to Start

Consider the data you wish to import into CollectiveAccess (this assumes you have already successfully set up your system; see [installation](https://docs.collectiveaccess.org/providence/user/setup/install/) for more details). A few key questions can help determine how many import mappings you will need, and where this data will live in CollectiveAccess:

1. How many data sets are there? 

2. In what format is my source data? (see [Supported File Formats](https://docs.collectiveaccess.org/providence/user/import/file_formats) for more information on file formats)

3. What CollectiveAccess tables are represented by my data? (see [Primary Tables and Intrinsic Fields](https://docs.collectiveaccess.org/providence/user/dataModelling/primaryTables) for more information on tables)

4. Are any hierarchies present in the data?

5. Do I want to import media? (for more see [Media Importer](https://docs.collectiveaccess.org/providence/user/import/Importing%20Media/media_importer)).

Once this information has been gathered, you’ll have a better idea of how many mappings you will need to make–how many crosswalks you’ll need to take your data and ingest it into your CollectiveAccess system.

For more on creating an import mapping, see [Creating an Import Mapping: Overview](https://docs.collectiveaccess.org/providence/user/import/c_creating_mapping).
 




