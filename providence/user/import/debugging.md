---
title: Debugging an Import
sidebar_position: 9
---

# Debugging a Data Import

In progress documentation about debugging/troubleshooting a CollectiveAccess data import

## Import Errors

Errors are common when performing a data import. Part of the import process is revising and refining the import mapping spreadsheet to minimize the amount of errors with each run of the data.

Errors are logged in the Importer UI as a data import runs; however, CollectiveAccess also logs a more detailed history of activity that can be used for troubleshooting an import that references timestamps, record numbers, and more details about the error. For each data import that is run, an error log will be recorded; therefore, for multiple data sets, there will be multiple error logs. 

Errors can range from formatting issues to incorrect input formats (remember that certain values in CollectiveAccess must be imported in a supported format, such as system lists and dates). 

When an error is thrown in the import, the value does not get imported. 

If you are unsure how to approach fixing an error in your data import, a good place to start is the Log (detailed below). 

## Basic Techniques for Troubleshooting

### Create a Test Set of Data 

A simple way of debugging an import is to create a data set of a single record of any type to test your import mapping spreadsheet. With one record, you’ll be able to see errors more easily and fix them without running an entire data set (which, depending on the file size, can take some time). 

For larger imports, it will be helpful to have a small test set of the source data to run the data import. For example, with a data set of 1,000 records, make a test set from that same data of 50 or even 100 records. This will take less time when testing, and will ensure that most errors are caught. 

For source data in XLSX, simply select a row from the data and copy and paste into a new, blank spreadsheet. Keep in mind that for XLSX you must also copy the first row with field names, unless the mapping is set to skip. 

For source data in XML, select a record from the data and copy and paste into a new blank XML document. Keep in mind that for XML you must also copy and paste the prolog (schema). 

### Choose 1 Record

If you are unsure how to approach fixing an error in your data import, a good place to start is the Log (explained below). Choose 1 record (the record's unique identifier will be recorded in the log), and find that same record in the system. Next, look at the error. Usually the error language is pretty straightforward, and you can adjust the mapping accordingly. 

## CollectiveAccess Logs

Each time a data import runs, CollectiveAccess maintains a log documenting the import. The log records a detailed history of activity during the import for each data set that is imported. A detailed history will record errors and provide timestamps (when the error occurred), unique record numbers, and more details about the errors. 

Error logs are located in the **app/log** directory which is created upon installation of a system. 

## Reading the Log


The error log is simply a list of import errors recorded for each data set that is imported. If performing a data import with multiple data sets, such as Objects, Documents, and Entities, an error log will be recorded each for Objects, Documents, and Entities.

As the import processes a data set by a single record at a time, the log lists errors one record at a time as they show up in the import process; each timestamp in the error log represents a new record.

The first line of any error log is as follows:

> Date/time,Identifier,Row,Error,Value,Notes,Dataset

Which displays how the error log is organized, from left to right: 

* **The date and time that the record was processed.** Since a data import processes one record at a time, the log will track the exact timestamp when the record was imported. 

* **Identifier of the record (unique idno).** The log will record the unique identifier for the record that threw the error. 

* **Row from the source data.** The log will record the row number, taken from the source data, of the record. 

* **Error.** The details of the error.

* **Value.** The value that caused the error from the source data. 

## Interpreting the Logs 

### Reading Errors: Examples

#### Date Error

A common import error is when a date value from the source data fails to import. Most often this is due to the source value not being in a [supported date format](https://docs.collectiveaccess.org/providence/user/dataModelling/metadata/dateTime).   

An example of a date error may look like:

>  2025-01-16T10:56:47-05:00,"1 B-1",5,"[1 B-1] Update failed: Date 00/00/1930 is invalid for Acquisition date Date 00/00/1930 is invalid for Acquisition date",,,0

Which may appear confusing at first glance. To interpret the error, start from left to right:

Begin with the timestamp and date. This is not crucial for debugging and fixing the problem; however, each new error will have a timestamp and date recording when it was imported into the system.

Next to the timestamp and date of import is the unique idno for the record. This is crucial for debugging, as it alerts you to which record threw the error upon import. Find the record in the data set, and find that same record in the CollectiveAccess system.

Next, take a look at “5,[1 B-1].”  The number that is not the unique idno is the row in the source data belonging to the record (in this case, "5").

Now that the record idno and row has been identified, the following information is the error itself: “Update failed: Date 00/00/1930 is invalid for Acquisition date.” 

Again from left to right, the log will list the error (“update failed”, in other words, the value was not imported) and then why it failed: the date value “00/00/1930” is invalid for the CA field Acquisition date. 

This error is stating that the value 00/00/1930 from the source data in row 5 for record 1 B-1 failed to import into the CollectiveAccess acquisition date field because the date is not in a supported date input format.


#### List Errors 

Another common error during a data import happens when a list value from the source data does not match the list values in CollectiveAccess (note that list values will be system dependent). 

An example of a list error may look like:

> 2025-01-13 T14:43:18-05:00, 2012.124.01,1341,"Value OK was not set for 2012.124.01 because it does not exist in list condition_rating",OK,,0

Reading the error from left to right, there is the date and timestamp of import. Next, the record number (2012.124.01) and row number (1341).

This is followed by the error itself: “Value OK was not set for 2012.124.01 because it does not exist in list condition_rating.”

The value from the source data ("OK") was not imported for the record 2012.124.01 because it did not match a list value in CollectiveAccess. 

In this case, the value “not being set” simply means the value from the source data was not imported. 

## Common Problems

* “Could Not read source; format=[file format]”

This error occurs when the file format of the source data used for a data import does not match the file format specified in the "Settings" section of an import mapping spreadsheet. 

The Setting "inputFormats" in the mapping spreadsheet defines the format of the source data. Make sure this setting matches the source data [file format](https://docs.collectiveaccess.org/providence/user/import/file_formats). 

* “Uploaded 0 worksheets; Skipped 1 worksheet”

This error occurs when uploading an import mapping spreadsheet in the Importer UI that contains invalid [JSON](https://www.w3schools.com/js/js_json_intro.asp). Import mapping spreadsheets use JSON to transform data. 

To check that the JSON used in the import mapping spreadsheet is valid, it's helpful to utilize an external validator such as [JSON Lint](https://jsonlint.com/), which will highlight any errors in the code. 

Often, invalid JSON has to do with accidentally omitting opening or closing curly brackets, quotes, or commas. 

* "Date [date] is invalid for [field name]"

CollectiveAccess accepts a variety of date formats. However, in order for dates to import properly, an accepted format must be used. If a date is not formatted correctly, the date will simply not be imported. 

The error will display the input format of the original date, (the date from the source data), and the field name that threw the error. 

To ensure that dates are formatted according to CA standards, please see [date and time formats](https://docs.collectiveaccess.org/providence/user/dataModelling/metadata/dateTime).

* "Value [value] was not set for [record idno] because it does not exist in list [list]”

When the error “does not exist in list” is thrown, it’s because a value from the source data does not match a list value in CollectiveAccess. List values are pre-determined and defined in a system's installation profile. 

