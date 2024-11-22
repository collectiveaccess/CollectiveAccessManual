---
title: Mapping Object Lot Records
---
## Mapping Object Lot Records


Unlike mapping other records, mapping Object Lots requires some
specifications in order for the import to create separate and related
lot records.

Firstly, to create separate and related object lot records from a table
**other than** ca_object_lots, the Refinery **objectLotSplitter** is
needed in the Refinery column of the import mapping spreadsheet. Since
Refineries require Refinery Parameters, a Parameter is needed to define
various aspects about the lot records.

Object Lots require more than just a label and a type defined in the
Refinery Parameter column. Lots also have a non-optional
**lot_status_id** value, taken from the Object Lot Statuses list in
CollectiveAccess (see [Using Lists and Vocabularies in an Import Mapping
Spreadsheet](lists_and_vocab_in_mapping.html?highlight=using+lists)).
The **lot_status_id** must be set to a valid status value, or the lot
will fail to insert during import.

In addition, the **ca_table.element_code** (Column 3 in the import
mapping spreadsheet) must be set to **ca_objects.lot_id.** ID Numbers
for ca_object_lots don't map to the normal idno, but rather
**ca_object_lots.idno_stub.**

For more on Object Lots and their required or optional codes, see
[Primary Tables and Intrinsic
Fields](../../dataModelling/primaryTables.html?highlight=primary+tables#object-lots-ca-object-lots).

## How to Map Object Lots

The [Sample Import Mapping Spreadsheet (xlsx document)](/providence/documents/sample_mapping_tutorial.xlsx) maps object lot records that will be created and related to the objects being imported. These records are present in the [Sample Import Data (Source Data)](/providence/documents/sample_import_data_tutorial.xlsx) in columns 8 and 9, showing the type of Accessions and the Accession numbers of the objects to be imported:

![snippet of a screenshot of the sample import data, showing 3 rows of column 8 (Accession) and column 9 (Accession no)](/providence/img/mapping_lots_1.png "Snippet of sample import data, showing columns 8 and 9")

To map these lots, set the **Source column** (Column 2 in the import mapping spreadsheet) to the column numbers present in the source data, similarly to how other columns are mapped.

The **CA table.element column** (Column 3 in the import mapping spreadsheet, Column 8 in the Source Data) must be set to **ca_objects.lot_id**, as seen in the Sample mapping below:

![snippet of sample import mapping spreadsheet showing the object lot mapping target "ca_objects.lot_id"](/providence/img/mapping_lots_new.png "object lot mapping example for objects")

In this example, column 9 is skipped. In Column 6, use the Refinery
ObjectLotSplitter. In Column 7, use a Refinery Parameter to specify how
the Object Lot records will be imported in CollectiveAccess.

## The objectLotSplitter for Mapping Object Lots

In order to create new and related lot records, the use of the
**objectLotSplitter** refinery is necessary, as seen in the sample
import mapping:

![snippet of sample import mapping spreadsheet showing the objectLotSplitter refinery and its parameters](/providence/img/mapping_lots_4.png)

```json title="objectLotSplitter refinery parameter example"
{
    "objectLotTpe": "gift",
    "attributes": {
        "idno_stub": "^9",
        "lot_status_id": "accessioned"
    }
}
```

Within the Refinery Parameter, note that attributes of the parameter contain references to object lot fields in CollectiveAccess. For lots, it is important to only map **ca_objects.lot_id** and **ca_object_lots.lot_status_id** in the mapping itself. Other object lot fields are referenced in the parameter and are pulled from the source data.

Within the Parameter, the **objectLotType** comes from Lists and Vocabularies in CollectiveAccess, **idno_stub** is pulling the lot idnos from column 9 of the source data, and the **lot_status_id** also comes from Lists and Vocabularies in CollectiveAccess.
