---
title: Containers
---
# Containers

## What is a Container


A **Container** is a metadata element, or field, in CollectiveAccess
that contains sub-elements *within it*. Unlike all other attribute
types, Containers do not represent single data values; their sole
function is to organize attributes into groups for display on the user
interface.

A multi-attribute value set in CollectiveAccess will have a Container
serving as the *top* of the attribute hierarchy. Within this Container
are sub-elements, falling below the top level of the attribute
hierarchy. Other Containers may serve to further group items in the
multi-attribute set into sub-groups, displayed on separate lines of a
form.

For example, an Address field in CollectiveAccess has separate
attributes for Street Number, City, State, Country, and Postal/Zip Code.
The top of the attribute hierarchy is "Address," with the sub-elements
Street Number, City, State, Country, and Postal/Zip Code:

<figure class="align-center">
<img src="/providence/img/containers1.png" alt="containers1.png" />
<figcaption>An Address field from an Entity Record in the
CollectiveAccess Demonstration System. Here, "Address" is the
Container.</figcaption>
</figure>

<figure class="align-center">
<img src="/providence/img/container_subelements.png" alt="container_subelements.png" />
<figcaption>An Address field from an Entity Record with sub-elements and
their bundle codes.</figcaption>
</figure>

Dimensions are another common Container in CollectiveAccess, as this
field contains sub-elements that specify the measurement itself, unit of
measurement used, and can also include weight and the type of dimension
in a dropdown list. Within this Container are the sub-elements: Height,
Width, Depth, Diameter, Weight, and Dimensions Type.


![image](/providence/img/containers2.png)

A Dimensions field from an Object Record in the
CollectiveAccess Demonstration System. Here, "Dimensions" is the
Container.

:::info[note]
Containers may contain different sub-elements depending on the
installation profile of your CollectiveAccess System; all of these
examples of Containers are taken from the [CollectiveAccess
Demonstration System](https://demo.collectiveaccess.org/).
:::

## Containers in an Import Mapping Spreadsheet

Individual source data can be mapped directly to these sub-elements
within a Container in an import mapping spreadsheet using Groups:

<figure class="align-center">
<img src="/providence/img/container_mapping.png" alt="container_mapping.png" />
<figcaption>Mapping two date fields into a Container called
"date."</figcaption>
</figure>

Both fields above are mapped to their specific
**ca_table_element.code**, and they are grouped together by the Group
called \"date.\" Instead of mapping to the bundle code of the container
as a whole, it is important to map to the individual bundle code of the
sub-element.

For more on the function of Groups, how to use Groups in an import
mapping, and how to map source data into specific Containers in
CollectiveAccess, please see [Creating an Import Mapping:
Overview](https://docs.collectiveaccess.org/providence/user/import/c_creating_mapping).

