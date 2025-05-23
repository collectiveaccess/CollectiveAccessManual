---
title: Relationships
---

# Relationships

As a relational database, a core feature of CollectiveAccess is that it
can create relationships between records of any type. A relationship's
most basic function is to link records together, creating a
bi-directional connection between various kinds of records. Creating
relationship records in a database is entirely optional, and in fact
won\'t be accessible unless a user interface is defined for them.
However, relationships are extremely useful in situating records within
a greater network of interrelated data; they reflect the real-life
connections between data. In CollectiveAccess, relationships are
indicated using the bi-directional arrow ⇔. Relationships may be created
between records in any primary table without restriction.

Relationships, like other aspects of CollectiveAccess, are configurable.
All relationships in CollectiveAccess are defined through relationship
types. Relationship types characterize what kinds of relationships
records in Collective Access have with each other. While relationships
connect records together, relationship types simply define those
connections; they are configurable specifiers that distinguish the
different kinds of relationships that may occur in a database.

Any number of relationships can be created between a pair of records,
and each relationship can optionally incorporate additional metadata
elements, or interstitial data, within a record. This feature allows
cataloguers to describe a relationship beyond simply selecting a
relationship type. Any two records can carry this interstitial
description, so long as metadata and a user interface has been created.
Common examples of relationships that could require interstitial
metadata include: objects to places; objects to entities; entities to
places; or entities to entities. For more on interstitial relationships
and examples, see [Interstitial
Data](https://docs.collectiveaccess.org/providence/user/dataModelling/interstitial).

## Relationships and Relationship Types

An example of a Relationship, with the Relationship Types defined in
parentheses, is shown below:

![relationship](/providence/img/relationships_entities_ex.png)
*Related entities in CollectiveAccess, with the relationship
types in parentheses.*


Each CollectiveAccess system has a defined list of relationships and
Relationship Types. To access and manage Relationships and Relationship
Types, navigate to **Manage \> Administration \> Relationship Types.**
The hierarchy viewer will display:

![relationship](/providence/img/relationship_hierarchy.png)
*The Relationship Type hierarchy viewer.*

Within the hierarchy viewer are all the relationships and relationship
types available within a given system. To view the relationship types
(on the left in bold), simply select the releationship listed in the
right-hand column.

## Incorporating Relationships in a Data Import

Relationships can be incorporated and defined within a data import
mapping prior to a data import.

For pre-determined relationships that will be imported as such, it is
necessary to define the relationships and their corresponding types
directly in the import mapping. For instructions on creating an import
mapping, downloading a starter template, and the necessary steps to
incorporate related data, see [Creating an Import Mapping:
Overview](https://docs.collectiveaccess.org/providence/user/import/c_creating_mapping).

Relationships in a mapping will be defined simultaneously in the
[Refinery
Column](/providence/user/import/c_creating_mapping.html#column-6-refinery)
and in the [Refinery Parameters
column](/providence/user/import/c_creating_mapping.html#column-7-refinery-parameters).

## Relationships in the User Interface

To view what relationship types are available in a system, navigate in
CollectiveAccess to **Manage \> Administration \> Relationship Types**.
A list of relationships will be displayed, with their corresponding
relationship types.

![image](/providence/img/Relationships1.png)

Scrolling down on the left side of the list will enable the full list of
possible relationship types for each relationship to be viewed.
Selecting a relationship (shown above in bold) will display all possible
relationship types that are available within that specific relationship
(see above).

A variety of types are available to help best describe the data in any
given database.

:::note
If a data import requires related records, then refineries must be used
to create relationships between data. For more, see the [Creating an
Import Mapping:
Overview](https://docs.collectiveaccess.org/providence/user/import/c_creating_mapping)
and [Refineries and Refinery
Parameters](/providence/user/import/mappings/refineries.html#import-mappings-refineries).
:::

## Adding or Editing Relationships after Import

Choose \"Relationships\" from the side navigation in any type of record
in the database. This will display a page of all the possible
relationships between record types available to use.

![relationship](/providence/img/relationships2.png)
*The Relationships tab of a record in CollectiveAccess. This
tab is where relationships can be viewed, added, or edited.*

In order to state a relationship, a record or records must already exist
in the database. For example, when relating an Object record to an
Entity, there must already be a separate and existing record for that
particular Entity. Note that each available relationship in the
Relationships tab contains an arrow icon ![icon](/providence/img/relationship_arrow.png)
which indicates a relationship can be searched and added from that
field.

To add a relationship to an existing record, simply begin typing into
the field of any given relationship as needed. A drop-down list will
appear that best matches the typed text, and will display a list to
choose from. This list will also include an option to *Create* a record
for the new relationship.

![relationship](/providence/img/relationships3.png)
*Searching for an Entity in the user interface. A dropdown
menu will appear showing any existing matches, with the option to Create
a new entity record.*

Once the correct record to relate is identified, select it. An optional
dropdown menu will appear to the right, where the relationship type can
be clarified, if needed (for example, when relating Entities, shown
below.)

![relationship](/providence/img/relationships4.png)
*Relating an Entity. Choose a relationship type from the
dropdown menu.*

Save the changes made to the Relationships screen.
