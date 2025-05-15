---
title: Importing Deaccessions
---

## Importing deaccessioned records through a data import

Deaccessioned records can be imported into CollectiveAccess through a data import. Deaccessions can also be managed in the user interface (please see [Deaccessions](/providence/user/editing/deaccessions) for more details about deaccessions in the user interface. 

However, it can be useful to import a larger amount of deaccessioned records through a data import, and not have to edit each record in the user interface. 

CollectiveAccess tracks the deaccessioning process at the item-level, using the Deaccession Status bundle. The Deaccession Status bundle can be placed anywhere in the object editor screen of a record. 

Importing records as deaccessioned requires mapping to a Constant value of 1 to ensure the checkbox in the bundle is selected (assuming that 1= yes, 0 = no). If mapped yes, the checkbox will be selected; if no, the checkbox will remain blank.

:::note
The Deaccession Status bundle can be configured in the installation profile prior to importing deaccessions, similarly to any other bundle in CA using the bundle code **ca_objects_deaccession**. Items can only be deaccessioned if this bundle code is included in the installation profile. If this bundle code is not included in the profile, items will not have the option to be deaccessioned. 
::::

## The Deaccession Status Bundle

The deaccession status bundle is a [container](/providence/user/import/references/containers), with sub-fields recording details about the deaccession status. 

The bundle, when selected, looks like this on a record’s UI: 


![image](/providence/img/deaccession1.png)

Manually selecting the “deaccessioned” checkbox in blue will expand the bundle to show additional information such as the date of deaccession, the deaccession type, and other qualifying notes related to the deaccessioning. 

When not selected, the bundle simply looks like this:

![image](/providence/img/deaccession4.png)

Deaccessioned records in CA will be marked in the object editor screen in the Inspector in red followed by the date of deaccession. See let, where in red, <font color="red">Deaccessioned September 1 2016</font> is stated. This differentiates any deaccessioned records from non-deaccessioned records in the system. 

The user interface can be a useful way to deaccession records in small numbers. However, it can be useful to know how to import deaccessioned records, as in many cases data sets contain several deaccessioned records. This can be managed in an import mapping spreadsheet. 

## Importing Deaccessioned Records 

Manually selecting a record for deaccessioning is useful; however, let’s say you have an entire data set of deaccessioned records, or, a record set containing deaccessions alongside non-deaccessioned records, to import into CollectiveAccess. 

If deaccessions are recorded in a singular data set, a separate import mapping spreadsheet will need to be created for the data. This import mapping spreadsheet will be like any other spreadsheet created for a data import (see [Creating an Import Mapping](https://docs.collectiveaccess.org/providence/user/import/c_creating_mapping).

If deaccessions are recorded alongside non-deaccessioned records, a single mapping spreadsheet can be used, with relevant fields mapped to the deaccessions container. For example, an Objects data set contains a field "deaccessioned" that has been filled in "Yes" or left blank. In addition, a date of deaccessioning, date of disposal, and other information is included if relevant.

For example, that data might look like:

![image](/providence/img/deaccession7.png)

Since there is data relating to a deaccession, the data will be mapped to the deaccession field on the record. First, map any deaccession-related fields to the deaccession status bundle. Simply map the records similarly to any other container field in a mapping. Remember that for a Container, there is a singular bundle code for the Container, and, individual bundle codes for the subfields within that container. For example: 

- Date of deaccession: **ca_objects_deaccession.deaccession_date**
- Date of disposal: **ca_objects.deaccession_disposal_date**
- Authorized by: **ca_objects_deaccession.authorized_by**
- Notes: **ca_objects.deaccession_notes**

In the mapping spreadsheet, this looks like: 

![image](/providence/img/deaccession8.png)

Creating a group (for example, “deaccession”) ensures that each field gets mapped to the deaccessions bundle. 

To map the record’s status as deaccessioned, map the value 1 as a Constant to **ca_objects.is_deaccessioned**. Setting a Constant of 1 ensure that the checkbox in the container is selected "yes" where relevant, where 1 = yes, and 0 = no. 

Map all other fields to those relevant in the container, while ensuring they are all part of the same Group. 

Once imported into the Container, the deaccessions data should show up: 

![image](/providence/img/deaccession10.png)

And the record will be marked in red. 
