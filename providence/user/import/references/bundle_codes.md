---
title: Bundle Codes in an Import Mapping
---

# Bundle Codes: CA table.element Codes

Bundle codes are a necessary part of creating an import mapping. As the second part of the crosswalk, where the data’s destination in CollectiveAccess is defined, they are a key part of making an import mapping work correctly. Codes are mapped in Column 3 of an import mapping spreadsheet.

:::note
It is important to remember that when filling in your import mapping spreadsheet, you must map any fields from the source data to the CA table.element code, NOT the name of the field in CollectiveAccess. Without this table.element code, the import mapping will not work.
:::

## How are CA table.element codes formatted?

In an import mapping, CA table.element codes must be formatted and copied correctly. Codes 
are divided into two components by a period. For example:

``ca_objects.preferred_labels``

To the left of the period is the CollectiveAccess primary table (ca_table). To the right is the element_code, which is simply the unique code assigned to any particular metadata element, or field, in a CollectiveAccess configuration.

The table used in the first part of the CA table.element code will likely correspond (in most, but not all cases) to the table you declared in the Setting table of the import mapping spreadsheet.

Some common examples include:

* ca_objects.preferred_labels

* ca_entities.preferred_labels

* ca_storage_locations.preferred_labels

Where ca_objects, ca_entities, and ca_storage_locations are all referencing CollectiveAccess basic tables, and preferred_labels is referencing a specific field in CollectiveAccess. Fields will vary based on system configuration.

There are a few exceptions that require slightly different values to be placed in Column 3. For example, when mapping data from one table (like ca_objects) while also creating and related records of other tables (like ca_entities), only the table is cited in column 3. For more information, see [Creating an Import Mapping: Overview](https://docs.collectiveaccess.org/providence/user/import/c_creating_mapping).

## Finding Bundle Codes

It’s possible to find bundle codes in any CollectiveAccess system, regardless of whether records have been importeds. To find the necessary CA table.element codes to use in an import mapping spreadsheet:

1. In CollectiveAccess, navigate to **Manage > My Preferences > Developer**.

2. Under Show bundle codes, select **Show**:

![image](/providence/img/bundle_codes.png)

3. Select Save to save these preferences.

4. Navigate to any record's user interface, and bundle codes will be displayed in parentheses next to the record's label. For example "Title (ca_objects.preferred_labels)."

In an empty CollectiveAccess system (with no records imported), navigate to the New tab at the top of the navigation bar. Create any kind of new record, hit save, and the bundle codes for each field will be displayed.

![image](/providence/img/bundle_codes_2.png)

:::note
In a data import, it’s necessary in a blank system to create a new test record and save it for all record types, so that all metadata screens will be available for mapping purposes. If this is not done, the fields available to view are restricted.
:::

:::tip
Selecting the CA table.element code from the record’s interface will copy the code to the clipboard. This makes copying and pasting CA table.element codes easy and efficient, so no mistakes are present in the import mapping spreadsheet.
:::

## Mapping Related Tables using Table Codes

As mentioned above, a few exceptions require slightly different values to be used instead of the CA table.element code in the import mapping spreadsheet. 

One example is when mapping to related tables. In these instances, you would simply map to the table code, as you are creating records in a related table. Some examples include:

* ca_objects

* ca_entities

* ca_storage locations

And so on, where only the table code is used in the import mapping spreadsheet. 






