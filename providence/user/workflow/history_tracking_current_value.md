---
sidebar_position: 1
sidebar_label: Tracking Current Object Location
#sidebar_custom_props:
#sidebar_class_name: first
---
# Tracking Current Object Location

:::: note
::: title
Note
:::

The system for location tracking was completely rebuilt for version 1.8
with a new, more general, configuration format and additional features.
Older configurations should work as before, but the configuration
options described below should be used for new setups. To maintain
compatibility with future releases consider updating your existing
configuration to use the current options.
::::

## Overview

CollectiveAccess provides a storage location hierarchy to describe the
physical locations where collection objects may be located, displayed or
stored. Storage locations are just another type of record and may be
associated with objects using relationships. The location of an object
may be recorded by creating a relationship between object and location.


This arrangement has the advantage of simplicity but comes with
significant limitations:

-   If your objects move often you\'ll soon have a long list of previous
    locations, which can make it difficult to figure out what the
    *current* location is.
-   While the current location can be distinguished using a specific
    relationship type (Eg. \"past location\" for previous locations and
    \"current location\" for the latest location), you must manage
    setting of these types yourself, which is labor intensive and prone
    to error.
-   Removing previous locations and only recording only a single,
    current location will result in a simpler and easier to manage
    display, but no location history will be maintained. For many users,
    losing location history data is not acceptable.
-   Only storage location records may be used to record location. If an
    object is on loan or exhibition workarounds must be employed, such
    as dummy \"On loan\" and \"On exhibition\" storage locations
    records.

The history value tracking system (first available in CollectiveAccess
version 1.8) provides a flexible way to track object locations over
time. It can also be used to track other time-varying information such
as provenance and current collection. The system employs tracking
*policies* to maintain chronologies based upon one or more data
elements, and can return full histories as well as current values for
any type of record. Tracking of object location is the focus in this
discussion, but the approaches described here may be applied to other
types of time-varying information.

