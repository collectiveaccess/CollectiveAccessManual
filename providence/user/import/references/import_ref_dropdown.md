---
title: Mapping to Drop-down Values in CollectiveAccess
---

There are several instances when creating an import mapping spreadsheet
where a value in the source data will be mapped to a drop-down list in
CollectiveAccess. These fields look like:


<figure class="align-center">
    <img src="/providence/img/acq_field.png" alt="A screenshot of a drop-down list in collectiveaccess. This one is called 'Acquisition Mode' and you can see the default value of 'not set'" />
    <figcaption>*An example of an Acqusition Mode field in CollectiveAccess that contains a drop-down menu of associated, set values.*</figcaption>
</figure>

<figure class="align-center">
    <img src="/providence/img/condition_field.png" alt="A screenshot of a container called 'container' with 3 fields: condition status, evaluation date and  condition description. The condition status field is a drop-down list showing the default value of 'not set'" />
    <figcaption>*An example of a Condition Container in CollectiveAccess that contains a drop-down menu of associated, set values for Condition Status.*</figcaption>
</figure>

While the drop-down lists, when selected, are displayed:

<figure class="align-center">
    <img src="/providence/img/demo_cond_list.png" alt="A screenshot of the condition status drop-down with options: 'excellent', very good', 'good', 'fair' and 'poor'" width="140px"/>
    <figcaption>*Values in the Condition drop-down list*.</figcaption>
</figure>

Not all CollectiveAccess systems will have metadata fields that contain
drop-down values (these can be configured in the [Installation Profile](https://docs.collectiveaccess.org/providence/user/setup/install/). Examples of fields that may have drop-down lists available include condition, acquisition mode, and other fields that have a set list of values to choose from.

Drop-down value lists will have a set number of options to choose from that may describe condition or other variable descriptors about an object or item. These options will be listed in [Lists and Vocabularies](https://docs.collectiveaccess.org/providence/user/editing/lists_and_vocab).

The field containing the drop-down values will have its own **CA table.element** code, that will be mapped in Column 3 of the import mapping spreadsheet (see [Creating an Import Mapping: Overview](https://docs.collectiveaccess.org/providence/user/import/c_creating_mapping)).

If all values are the same for the field, set the Rule Type in Column 1 to Constant, and place the value from the drop-down in Column 2 of the import mapping spreadsheet:

![A screenshot that shows an example of a constant value, setting condition status to 'good' for all records](/providence/img/constant_dropdown.png)

## The Condition Drop-Down List

Condition is a common example of a field that contains a drop-down list,
with multiple, set descriptors. These values are pre-determined in the
system itself and will vary depending on system configuration.

Source Data containing condition values might look like:

![A screenshot snippet of a source spreadsheet showing record condition statuses. The three records have the condition statues of 'good', 'fair', 'poor'](/providence/img/condition_mapp_ex.png)

To find the appropriate **CA table.element** code for the Condition
field in CollectiveAccess, follow the steps outlined in
[Creating an Import Mapping: Overview](https://docs.collectiveaccess.org/providence/user/import/c_creating_mapping).

Mapping for the condition column would look like:

![A screenshot of snippet showing one row for a mapping rule to condition value](/providence/img/mapping_condition.png)

Where the source column is 3, and the **CA table.element** is
**ca_objects.condition_description.condition_value** taken from the
bundle code for the Condition Status field.

A separate mapping for each value in the drop-down list is not required,
nor is using a Constant value. If the values match those listed in
CollectiveAccess, mapping to the correct **CA table.element** will
automatically populate the drop-down list with the appropriate values.

As noted above, the field for Condition in CollectiveAccess is formatted
as a **Container**, meaning that each element within the Container has a
distinct bundle code for which to map source data (see below). For more
about Containers, see [Containers](https://docs.collectiveaccess.org/providence/user/import/references/containers).

In the mapping, the bundle code for the Condition Status is used, which
contains the drop-down list.

## Drop-Down Values and Lists and Vocabularies

Drop-down values are present in **Lists and Vocabularies**. To find the
above values for Condition, for example, navigate to **Manage \> Lists
and Vocabularies \> Condition**:

![A screenshot showing the lists and vocabularies hierarchy screen, with the list the condition status is generated from](/providence/img/condition_list.png)

Where the values listed match those in the Condition field drop-down
list.

## Drop-Down Values and Original and Replacement Values

The above example with the Condition field assumes that the values in
the source data match those given in the CollectiveAccess field.
However, if certain values do not match those in CollectiveAccess, using
Original and Replacement Values should be used in an import mapping
spreadsheet to create matches between source data values and set
drop-down list values.