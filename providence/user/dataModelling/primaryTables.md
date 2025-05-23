---
title: Primary Tables and Intrinsic Fields
---

# Primary Tables and Intrinsic Fields

CollectiveAccess is structured around several primary tables, with
editors that can be enabled (or disabled) depending on project
requirements. Each primary table has intrinsic bundles and its own set
of preferred and non-preferred labels bundles. Distinct user interfaces
can be configured for each table, and within that, a single table can
have multiple user interfaces restricted by Type (see Types).

Editors that are not relevant for your system (you don\'t catalogue
places for example) can be disabled in the configuration file app.conf,
by setting the various \*\_disable directives below to a non-zero value

Here\'s how it looks in app.conf:

``` none
# Editor "disable" switches
# -------------------
ca_objects_disable = 0
ca_entities_disable = 0
ca_places_disable = 0
ca_occurrences_disable = 0
ca_collections_disable = 0
ca_object_lots_disable = 0
ca_storage_locations_disable = 0
ca_loans_disable = 0
ca_movements_disable = 1
ca_tours_disable = 1
ca_tour_stops_disable = 1
ca_object_representations_disable = 1
```

# Objects (ca_objects)

Object records represent items or assets in a collection, typically the
physical or born-digital items being managed. Every object record has a
\"type\" that determines which fields are relevant for it. The list of
types available in your system can be customized to match your specific
cataloging requirements.

### Object intrinsics (ca_objects)

| Name |Code | Description | Mandatory? |Default|
|----|----|----|----|----|
|Identifier|idno|The object identifier. Must follow policy defined in configured numbering policy if app.conf setting require_valid_id_number_for_ca_objects is set. Must be unique if app.conf setting allow_duplicate_id_number_for_ca_objects is not set.|Depends upon numbering policy||
|Type|type_id|A value from the object_types list indicating the type of the record. Stored as an internally generated numeric item_id. When setting this value in a data import or via an API call the item identifier may be used.|||
|Parent|parent_id|Reference to parent record. Will be null if no parent is defined. When setting this value in a data import or via an API call the identifier of the parent object may be used.|No|null|
|Access|access|Determines visibility of record in public-facing applications such as Pawtucket. Values are defined in the access_statuses list. Typically the list includes values for “public” and “private” visibility. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. By convention “0” is interpreted as private and “1” as public access, although this can be modified or expanded in app.conf if required.|Yes|0|
|Status|status|Records the general cataloguing workflow status of the record. Values are defined in the workflow_statuses list. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. Unlike access values, statuses have no functional impact on a record. They are merely informations and intended to provide a simple, straightforward way to track the cataloguing process.|Yes|0|
|Lot|lot_id|A reference to the lot record (ca_object_lots) of which the object is a part. May be null if the object is not part of a lot. Note that an object may be part of only one lot. The raw database value contained lot_id is an internally generated numeric lot_id. However, when setting this intrinsic via an import mapping or API call you may also use the lot’s identifier.|No||
|Source|source_id|A value from the object_sources list indicating the original source of the object. This value is sometimes used to broadly distinguish different classes of objects. When setting this value in a data import or via an API call the item identifier may be used.|No||
|Deaccessioned?|is_deaccessioned|A flag indicating whether the object is deaccessioned. Will be 1 when deaccessioned or 0 (the default) when not deaccessioned.|Yes|0|
|Date of deaccession|deaccession_date|The date of deaccession. If unknown the value will be null. The date is stored as an historic daterange and may be any valid historic date (Eg. it is not limited to post-1970 dates).|No||
|Date of disposal|deaccession_disposal_date|The date of disposal of the object. This is typically a date after deaccession. If unknown the value will be null. The date is stored as an historic daterange and may be any valid historic date (Eg. it is not limited to post-1970 dates).|No||
|Deaccession notes|deaccession_notes|Any notes regarding the deaccession process. Limited to 65535 characters maximum length.|No||
|Deaccession type|deaccession_type_id|A value from the object_deaccession_types list indicated type of deaccession. Examples of deaccession types might include “Sold”, “Destroyed” and “Transferred”. When setting this value in a data import or via an API call the item identifier may be used.|No||
|Acquisition type|acquisition_type_id|A value from the object_acq_types list indicating how the object was acquired. When setting this value in a data import or via an API call the item identifier may be used.|No||
|Accession status|item_status_id|A value from the object_statuses list indicating the accession status of the object. Accession status values might include “accessioned”, “pending accession”, “non-accessioned item”, etc. When setting this value in a data import or via an API call the item identifier may be used.|No||
|Extent|extent|The numeric extent. Must a be a whole, positive number. Default is 0.|Yes|0|
|Units of extent|extent_units|Units of extent value, as text.|Yes||
|Library circulation status|circulation_status_id|A value from the object_circulation_statuses list indicating the circulation status of the object, as set by the library check-in/out system. When setting this value in a data import or via an API call the item identifier may be used.|No||
|Submitted by user|submission_user_id|For records submitted via the Pawtucket “contribute” form interface. The user who submitted the record.|No||
|Submission group|submission_group_id|For records submitted via the Pawtucket “contribute” form interface. The group of the user that submitted the record.|No||
|Submission status|submission_status_id|For records submitted via the Pawtucket “contribute” form interface. A value from the submission_statuses list indicating the review status of the submitted record. When setting this value in a data import or via an API call the item identifier may be used.|No||
|Submission form|submission_via_form|For records submitted via the Pawtucket “contribute” form interface. The identifying code of the form used to submit the record.|No||
|View count|view_count|Number of times record has been viewed in Pawtucket front-end|No|0|
|Home location|home_location_value|The home location of the object, formatted using the display template defined by the app.conf “home_location_display_template” directive an evaluated relative to the home ca_storage_locations record. If no template is defined in app.conf, the full hierarchical path of the home location is returned. The template may be overriden by passing a “display_template” tag option.|No||

:::note
**ca_entities.preferred_labels.displayname** is used by data mappings
and display templates to reference the intrinsic displayname field in
the **ca_entity_labels table**. See below
[ca_entity_labels name](###the_following_applies_to_entity_labels)The following applies to: Entity labels (ca_entity_labels) for all **ca_entity_labels** name fields.
:::

# Object Lots (ca_object_lots)

Lots record the accession or acquisition of one or more objects. Lots
are commonly used by collecting institutions who may accession more than
one unique item per accession. Registrarial information, such as the
Deed of Gift, may be recorded in a lot record while cataloging for each
accessioned object remains at the object level.

### Object lot intrinsics (ca_object_lots)

| Name |Code | Description | Mandatory? |Default|
|----|----|----|----|----|
|Identifier|idno_stub|The lot identifier. Must follow policy defined in configured numbering policy if app.conf setting require_valid_id_number_for_ca_object_lots is set. Must be unique if app.conf setting allow_duplicate_id_number_for_ca_object_lots is not set.|Depends upon numbering policy||
|Type|type_id|A value from the object_lot_types list indicating the type of the record. Stored as an internally generated numeric item_id. When setting this value in a data import or via an API call the item identifier may be used.|Yes|null|
|Parent|parent_id|Reference to parent record. Will be null if no parent is defined. When setting this value in a data import or via an API call the identifier of the parent lot may be used.|No|null|
|Access|access|Determines visibility of record in public-facing applications such as Pawtucket. Values are defined in the access_statuses list. Typically the list includes values for “public” and “private” visibility. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. By convention “0” is interpreted as private and “1” as public access, although this can be modified or expanded in app.conf if required.|Yes|0|
|Status|status|Records the general cataloguing workflow status of the record. Values are defined in the workflow_statuses list. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. Unlike access values, statuses have no functional impact on a record. They are merely informations and intended to provide a simple, straightforward way to track the cataloguing process.|Yes|0|
|Source|source_id|A value from the object_lot_sources list indicating the original source of the lot. This value is sometimes used to broadly distinguish different classes of lots. When setting this value in a data import or via an API call the item identifier may be used.|No||
|Accession status|lot_status_id|A value from the object_lot_statuses list indicating the accession status of the lot. Accession status values might include “accessioned”, “pending accession”, “non-accessioned item”, etc. When setting this value in a data import or via an API call the item identifier may be used.|No||
|Extent|extent|The numeric extent. Must a be a whole, positive number. Default is 0.|Yes|0|
|Units of extent|extent_units|Units of extent value, as text.|Yes||
|Submitted by user|submission_user_id|For records submitted via the Pawtucket “contribute” form interface. The user who submitted the record.|No||
|Submission group|submission_group_id|For records submitted via the Pawtucket “contribute” form interface. The group of the user that submitted the record.|No||
|Submission status|submission_status_id|For records submitted via the Pawtucket “contribute” form interface. A value from the submission_statuses list indicating the review status of the submitted record.|No||
|Submission form|submission_via_form|For records submitted via the Pawtucket “contribute” form interface. The identifying code of the form used to submit the record.|No||
|View count|view_count|Number of times record has been viewed in Pawtucket front-end|No|0|


:::note
**ca_objects.preferred_labels.name** is used by data mappings and
display templates to reference the intrinsic name field in the
**ca_object_labels table**
:::

# Entities (ca_entities)

Entity records represent specific people and organizations.
Relationships can be created between entity and object records (or any
other records in any other table) with fully customizable relationship
types. For example, an entity record for an individual could be related
to an object record as the creator of the object, or the photographer,
donor, publisher, performer, etc.

### Entity intrinsics (ca_entities)

| Name |Code | Description | Mandatory? |Default|
|----|----|----|----|----|
|Identifier|idno|The entity identifier. Must follow policy defined in configured numbering policy if app.conf setting require_valid_id_number_for_ca_entities is set. Must be unique if app.conf setting allow_duplicate_id_number_for_ca_entities is not set.|Depends upon numbering policy||
|Type|type_id|A value from the entity_types list indicating the type of the record. Stored as an internally generated numeric item_id. When setting this value in a data import or via an API call the item identifier may be used.|Yes|null|
|Parent|parent_id|Reference to parent record. Will be null if no parent is defined. When setting this value in a data import or via an API call the identifier of the parent entity may be used.|No|null|
|Access|access|Determines visibility of record in public-facing applications such as Pawtucket. Values are defined in the access_statuses list. Typically the list includes values for “public” and “private” visibility. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. By convention “0” is interpreted as private and “1” as public access, although this can be modified or expanded in app.conf if required.|Yes|0|
|Status|status|Records the general cataloguing workflow status of the record. Values are defined in the workflow_statuses list. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. Unlike access values, statuses have no functional impact on a record. They are merely informations and intended to provide a simple, straightforward way to track the cataloguing process.|Yes|0|
|Lifespan|lifespan|The life dates of the entity expressed as an historic daterange.|No||
|Source|source_id|A value from the entity_sources list indicating the original source of the entity. This value is sometimes used to broadly distinguish different classes of entities. When setting this value in a data import or via an API call the item identifier may be used.|No||
|Submitted by user|submission_user_id|For records submitted via the Pawtucket “contribute” form interface. The user who submitted the record.|No||
|Submission group|submission_group_id|For records submitted via the Pawtucket “contribute” form interface. The group of the user that submitted the record.|No||
|Submission status|submission_status_id|For records submitted via the Pawtucket “contribute” form interface. A value from the submission_statuses list indicating the review status of the submitted record.|No||
|Submission form|submission_via_form|For records submitted via the Pawtucket “contribute” form interface. The identifying code of the form used to submit the record.|No||
|View count|view_count|Number of times record has been viewed in Pawtucket front-end|No|0|


:::note
**ca_entities.preferred_labels.displayname** is used by data mappings and display templates to reference the intrinsic displayname field in the **ca_entity_labels** table. See below ca_entity_labels name fields for all **ca_entity_labels name fields.**
:::

 

# Places (ca_places)

Place records represent physical locations, geographic or otherwise.
Places are inherently hierarchical allowing you to nest more specific
place records within broader ones. As with entities, places can be
related records in other tables. Places are typically used to model
location authorities specific to your system. For cataloguing of common
geographical place names consider using CollectiveAccess\' built-in
support for GoogleMaps, OpenStreetMap, GeoNames and/or the Getty
Thesaurus of Geographic Names (TGN).

### Place intrinsics (ca_places)

| Name |Code | Description | Mandatory? |Default|
|----|----|----|----|----|
|Identifier|idno|The place identifier. Must follow policy defined in configured numbering policy if app.conf setting require_valid_id_number_for_ca_places is set. Must be unique if app.conf setting allow_duplicate_id_number_for_ca_places is not set.|Depends upon numbering policy||
|Type|type_id|A value from the place_types list indicating the type of the record. Stored as an internally generated numeric item_id. When setting this value in a data import or via an API call the item identifier may be used.|Yes|Null|
|Parent|parent_id|Reference to parent record. Will be null if no parent is defined. When setting this value in a data import or via an API call the identifier of the parent place may be used.|No|null|
|Access|access|Determines visibility of record in public-facing applications such as Pawtucket. Values are defined in the access_statuses list. Typically the list includes values for “public” and “private” visibility. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. By convention “0” is interpreted as private and “1” as public access, although this can be modified or expanded in app.conf if required.|Yes|0|
|Status|status|Records the general cataloguing workflow status of the record. Values are defined in the workflow_statuses list. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. Unlike access values, statuses have no functional impact on a record. They are merely informations and intended to provide a simple, straightforward way to track the cataloguing process.|Yes|0|
|Lifespan|lifespan|The life dates of the place expressed as an historic daterange.|No||
|Source|source_id|A value from the places_sources list indicating the original source of the place. This value is sometimes used to broadly distinguish different classes of places. When setting this value in a data import or via an API call the item identifier may be used.|No||
|Floorplan|floorplan|Uploaded image depicting floor plan of place. Used as the base layer in the object-place floorplan user interface.|No||
|Submitted by user|submission_user_id|For records submitted via the Pawtucket “contribute” form interface. The user who submitted the record.|No||
|Submission group|submission_group_id|For records submitted via the Pawtucket “contribute” form interface. The group of the user that submitted the record.|No||
|Submission status|submission_status_id|For records submitted via the Pawtucket “contribute” form interface. A value from the submission_statuses list indicating the review status of the submitted record.|No||
|Submission form|submission_via_form|For records submitted via the Pawtucket “contribute” form interface. The identifying code of the form used to submit the record.|No||
|View count|view_count|Number of times record has been viewed in Pawtucket front-end|No|0|

:::note
**ca_places.preferred_labels.name** is used by data mappings and display
templates to reference the intrinsic name field in the
**ca_place_labels** table
:::

# Occurrences (ca_occurrences)

Occurrences are used to represent temporal concepts such as events,
exhibition, productions or citations.

### Occurrence intrinsics (ca_occurrences)

| Name |Code | Description | Mandatory? |Default|
|----|----|----|----|----|
|Identifier|idno|The occurrence identifier. Must follow policy defined in configured numbering policy if app.conf setting require_valid_id_number_for_ca_occurrences is set. Must be unique if app.conf setting allow_duplicate_id_number_for_ca_occurrences is not set.|Depends upon numbering policy||
|Type|type_id|A value from the place_types list|Yes|null|
|Parent|parent_id|Reference to parent record. Will be null if no parent is defined. When setting this value in a data import or via an API call the identifier of the parent occurrence may be used.|No|null|
|Access|access|Determines visibility of record in public-facing applications such as Pawtucket. Values are defined in the access_statuses list. Typically the list includes values for “public” and “private” visibility. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. By convention “0” is interpreted as private and “1” as public access, although this can be modified or expanded in app.conf if required.|Yes|0|
|Status|status|Records the general cataloguing workflow status of the record. Values are defined in the workflow_statuses list. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. Unlike access values, statuses have no functional impact on a record. They are merely informations and intended to provide a simple, straightforward way to track the cataloguing process.|Yes|0|
|Source|source_id|A value from the occurrence_sources list indicating the original source of the occurrence. This value is sometimes used to broadly distinguish different classes of occurrences. When setting this value in a data import or via an API call the item identifier may be used.|No||
|Submitted by user|submission_user_id|For records submitted via the Pawtucket “contribute” form interface. The user who submitted the record.|No||
|Submission group|submission_group_id|For records submitted via the Pawtucket “contribute” form interface. The group of the user that submitted the record.|No||
|Submission status|submission_status_id|For records submitted via the Pawtucket “contribute” form interface. A value from the submission_statuses list indicating the review status of the submitted record.|No||
|Submission form|submission_via_form|For records submitted via the Pawtucket “contribute” form interface. The identifying code of the form used to submit the record.|No||
|View count|view_count|Number of times record has been viewed in Pawtucket front-end|No|0|

:::note
**ca_occurrences.preferred_labels.name** is used by data mappings and
display templates to reference the intrinsic name field in the
**ca_occurrence_labels** table
:::


# Collections (ca_collections)

Collections represent significant groupings of objects. They may refer
to physical collections, symbolic collections of items associated by
some criteria, or any other grouping. Collection records are often used
to manage formal archival processing and the creation of finding aids,
by configuring records to be compliant with the Describing Archives
(DACS) content standard.

:::note
**ca_collections.preferred_labels.name** is used by data mappings and
display templates to reference the intrinsic name field in the
**ca_collection_labels table**
:::

### Collection intrinsics (ca_collections)

| Name |Code | Description | Mandatory? |Default|
|----|----|----|----|----|
|Identifier|idno|The collection identifier. Must follow policy defined in configured numbering policy if app.conf setting require_valid_id_number_for_ca_collections is set. Must be unique if app.conf setting allow_duplicate_id_number_for_ca_collections is not set.|Depends upon numbering policy||
|Type|type_id|A value from the collection_types list indicating the type of the record. Stored as an internally generated numeric item_id. When setting this value in a data import or via an API call the item identifier may be used.|Yes|null|
|Parent|parent_id|Reference to parent record. Will be null if no parent is defined. When setting this value in a data import or via an API call the identifier of the parent collection may be used.|No|null|
|Access|access|Determines visibility of record in public-facing applications such as Pawtucket. Values are defined in the access_statuses list. Typically the list includes values for “public” and “private” visibility. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. By convention “0” is interpreted as private and “1” as public access, although this can be modified or expanded in app.conf if required.|Yes|0|
|Status|status|Records the general cataloguing workflow status of the record. Values are defined in the workflow_statuses list. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. Unlike access values, statuses have no functional impact on a record. They are merely informations and intended to provide a simple, straightforward way to track the cataloguing process.|Yes|0|
|Source|source_id|A value from the collection_sources list indicating the original source of the collection. This value is sometimes used to broadly distinguish different classes of collections. When setting this value in a data import or via an API call the item identifier may be used.|No||
|Submitted by user|submission_user_id|For records submitted via the Pawtucket “contribute” form interface. The user who submitted the record.|No||
|Submission group|submission_group_id|For records submitted via the Pawtucket “contribute” form interface. The group of the user that submitted the record.|No||
|Submission status|submission_status_id|For records submitted via the Pawtucket “contribute” form interface. A value from the submission_statuses list indicating the review status of the submitted record.|No||
|Submission form|submission_via_form|For records submitted via the Pawtucket “contribute” form interface. The identifying code of the form used to submit the record.|No||
|View count|view_count| Number of times record has been viewed in Pawtucket front-end|No|0|


# Storage Locations (ca_storage_locations)

Storage location records represent physical locations where objects may
be located, displayed or stored. Like place records, storage locations
are hierarchical and may be nested to allow notation location at various
levels of specificity (building, room, cabinet, drawer, etc.). As with
the other primary tables, each storage location may have arbitrarily
rich cataloguing, including access restrictions, geographical
coordinates, keywords and other information.

### Storage location intrinsics (ca_storage_locations)

| Name |Code | Description | Mandatory? |Default|
|----|----|----|----|----|
|Identifier|idno|The storage location identifier. Must follow policy defined in configured numbering policy if app.conf setting require_valid_id_number_for_ca_storage_locations is set. Must be unique if app.conf setting allow_duplicate_id_number_for_ca_storage_locations is not set.|Depends upon numbering policy||
|Type|type_id|A value from the storage_location_types list indicating the type of the record. Stored as an internally generated numeric item_id. When setting this value in a data import or via an API call the item identifier may be used.|Yes|null|
|Parent|parent_id|Reference to parent record. Will be null if no parent is defined. When setting this value in a data import or via an API call the identifier of the parent storage location may be used.|No|null|
|Access|access|Determines visibility of record in public-facing applications such as Pawtucket. Values are defined in the access_statuses list. Typically the list includes values for “public” and “private” visibility. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. By convention “0” is interpreted as private and “1” as public access, although this can be modified or expanded in app.conf if required.|Yes|0|
|Status|status|Records the general cataloguing workflow status of the record. Values are defined in the workflow_statuses list. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. Unlike access values, statuses have no functional impact on a record. They are merely informations and intended to provide a simple, straightforward way to track the cataloguing process.|Yes|0|
|Source| source_id|A value from the storage_location_sources list indicating the original source of the storage location. This value is sometimes used to broadly distinguish different classes of storage locations. When setting this value in a data import or via an API call the item identifier may be used.|No||
|Icon|icon|Icon image to display for storage location.|No||
|Color|color |Highlight color for storage location in hex format.|No||
|Is enabled?|is_enabled|Flag indicating whether storage location is available for use (value set to 1) or not available (value is 0).|Yes|0|
|Submitted by user|submission_user_id|For records submitted via the Pawtucket “contribute” form interface. The user who submitted the record.|No||
|Submission group|submission_group_id|For records submitted via the Pawtucket “contribute” form interface. The group of the user that submitted the record.|No||
|Submission status|submission_status_id|For records submitted via the Pawtucket “contribute” form interface. A value from the submission_statuses list indicating the review status of the submitted record.|No||
|Submission form|submission_via_form|For records submitted via the Pawtucket “contribute” form interface. The identifying code of the form used to submit the record.|No||
|View count|view_count|Number of times record has been viewed in Pawtucket front-end|No|0|
  

:::note
**ca_storage_locations.preferred_labels.name** is used by data mappings
and display templates to reference the intrinsic name field in the
**ca_storage_location_labels** table
:::

# Loans (ca_loans)

Loan records record details of both incoming and outgoing loans of
objects. Loan records, like those in all other tables, is fully
customizable and can be used to track alls aspects of a loan, including
dates, shipping, and insurance information.

### Loan intrinsics (ca_loans)

| Name |Code | Description | Mandatory? |Default|
|----|----|----|----|----|
| Identifier|idno|The loan identifier. Must follow policy defined in configured numbering policy if app.conf setting require_valid_id_number_for_ca_loans is set. Must be unique if app.conf setting allow_duplicate_id_number_for_ca_loans is not set.|Depends upon numbering policy||
|Type|type_id|A value from the loan_types list indicating the type of the record. Stored as an internally generated numeric item_id. When setting this value in a data import or via an API call the item identifier may be used.|Yes|null|
|Parent|parent_id|Reference to parent record. Will be null if no parent is defined. When setting this value in a data import or via an API call the identifier of the parent loan may be used.|No|null|
|Access|access|Determines visibility of record in public-facing applications such as Pawtucket. Values are defined in the access_statuses list. Typically the list includes values for “public” and “private” visibility. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. By convention “0” is interpreted as private and “1” as public access, although this can be modified or expanded in app.conf if required.|Yes|0|
|Status|status|Records the general cataloguing workflow status of the record. Values are defined in the workflow_statuses list. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. Unlike access values, statuses have no functional impact on a record. They are merely informations and intended to provide a simple, straightforward way to track the cataloguing process.|Yes|0|
|Source|source_id|A value from the loan_sources list indicating the original source of the entity. This value is sometimes used to broadly distinguish different classes of entities. When setting this value in a data import or via an API call the item identifier may be used.|No||
|Submitted by user|submission_user_id|For records submitted via the Pawtucket “contribute” form interface. The user who submitted the record.|No||
|Submission group|submission_group_id|For records submitted via the Pawtucket “contribute” form interface. The group of the user that submitted the record.|No||
|Submission status|submission_status_id|For records submitted via the Pawtucket “contribute” form interface. A value from the submission_statuses list indicating the review status of the submitted record. When setting this value in a data import or via an API call the item identifier may be used.|No||
|Submission form|submission_via_form|For records submitted via the Pawtucket “contribute” form interface. The identifying code of the form used to submit the record.|No||
|View count|view_count|Number of times record has been viewed in Pawtucket front-end|No|0|


:::note
**ca_loans.preferred_labels.name** is used by data mappings and display
templates to reference the intrinsic name field in the
**ca_loan_labels** table
:::

# Movements (ca_movements)

For more complex location tracking needs, movement records can be used
to record in precise detail movement of objects between storage
locations, while on loan or while on exhibition. Used as part of a
location tracking or use history policy, movements can provide a robust
record of every movement event in an object\'s history.

### Movements intrinsics (ca_movements)

| Name |Code | Description | Mandatory? |Default|
|----|----|----|----|----|
|Identifier |idno|The movement identifier. Must follow policy defined in configured numbering policy if app.conf setting require_valid_id_number_for_ca_movements is set. Must be unique if app.conf setting allow_duplicate_id_number_for_ca_movements is not set.|Depends upon numbering policy||
|Type|type_id|A value from the movement_types list indicating the type of the record. Stored as an internally generated numeric item_id. When setting this value in a data import or via an API call the item identifier may be used.|Yes|null|
|Access|access|Determines visibility of record in public-facing applications such as Pawtucket. Values are defined in the access_statuses list. Typically the list includes values for “public” and “private” visibility. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. By convention “0” is interpreted as private and “1” as public access, although this can be modified or expanded in app.conf if required.|Yes|0|
|Status| status|Records the general cataloguing workflow status of the record. Values are defined in the workflow_statuses list. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. Unlike access values, statuses have no functional impact on a record. They are merely informations and intended to provide a simple, straightforward way to track the cataloguing process.|Yes|0|
|Source|source_id|A value from the movement_sources list indicating the original source of the movement. This value is sometimes used to broadly distinguish different classes of mivements. When setting this value in a data import or via an API call the item identifier may be used.|No||
|Submitted by user|submission_user_id|For records submitted via the Pawtucket “contribute” form interface. The user who submitted the record.|No||
|Submission group|submission_group_id|For records submitted via the Pawtucket “contribute” form interface. The group of the user that submitted the record.|No||
|Submission status|submission_status_id|For records submitted via the Pawtucket “contribute” form interface. A value from the submission_statuses list indicating the review status of the submitted record.|No||
|Submission form|submission_via_form|For records submitted via the Pawtucket “contribute” form interface. The identifying code of the form used to submit the record.|No||
|View count|view_count|Number of times record has been viewed in Pawtucket front-end|No|0|

:::note
**ca_movements.preferred_labels.name** is used by data mappings and
display templates to reference the intrinsic name field in the
**ca_movement_labels** table
:::

# Object Representations (ca_object_representations)

Representations capture representative digital media (images, video,
audio, PDFs) for objects. Representation records usually contain only
just a media file, but can accommodate additional cataloguing that is
specific to the media file (not to the object the file depicts or
represents) if desired. When used. representation metadata often
includes captions, credits, access information, rights and reproduction
restrictions.

### Object representation intrinsics (ca_object_representations)

| Name |Code | Description | Mandatory? |Default|
|----|----|----|----|----|
|Identifier|idno|The representation identifier. Must follow policy defined in configured numbering policy if app.conf setting require_valid_id_number_for_ca_object_representations is set. Must be unique if app.conf setting allow_duplicate_id_number_for_ca_object_representations is not set.|Depends upon numbering policy||
|Type|type_id|A value from the object_representation_types list indicating the type of the record. Stored as an internally generated numeric item_id. When setting this value in a data import or via an API call the item identifier may be used.|Yes|null|
|Access |access|Determines visibility of record in public-facing applications such as Pawtucket. Values are defined in the access_statuses list. Typically the list includes values for “public” and “private” visibility. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. By convention “0” is interpreted as private and “1” as public access, although this can be modified or expanded in app.conf if required.|Yes|0|
|Status|status|Records the general cataloguing workflow status of the record. Values are defined in the workflow_statuses list. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. Unlike access values, statuses have no functional impact on a record. They are merely informations and intended to provide a simple, straightforward way to track the cataloguing process.|Yes|0|
| MD5 checksum|md5|The MD5 checksum of the original media uploaded to the represenatation.|Yes||
|MIME type|mimetype|The MIME type of the original media uploaded to the representation. Ex. for a JPEG image the MiME type will be image/jpeg. For a PDF the MIME type will be application.pdf.|Yes||
|Original filename|original_filename|The file name of the original media uploaded to the representation. For web browser uploads this file name is sent by the client and may not always be defined.|Yes||
|Media|media|The original uploaded media and derivatives.|Yes||
|Media metadata|media_metadata|EXIF, IPTC and XMP extracted from the original uploaded media|Yes||
|Media content|media_content|Text content extracted from the original uploaded media. For PDF and Microsoft Office documents this will be the full text of the document. It will be blank for most other file formats.|Yes||
|Source|source_id|A value from the entity_sources list indicating the original source of the entity. This value is sometimes used to broadly distinguish different classes of object representations. When setting this value in a data import or via an API call the item identifier may be used.|No||
|Submitted by user|submission_user_id|For records submitted via the Pawtucket “contribute” form interface. The user who submitted the record.|No||
|Submission group|submission_group_id|For records submitted via the Pawtucket “contribute” form interface. The group of the user that submitted the record.|No||
|Submission status|submission_status_id|For records submitted via the Pawtucket “contribute” form interface. A value from the submission_statuses list indicating the review status of the submitted record.|No||
|Submission form|submission_via_form|For records submitted via the Pawtucket “contribute” form interface. The identifying code of the form used to submit the record.|No||
|View count|view_count|Number of times record has been viewed in Pawtucket front-end|No|0|

:::note
**ca_object_representations.preferred_labels.name** is used by data
mappings and display templates to reference the intrinsic name field in
the **ca_object_representation_labels** table
:::

# Tours (ca_tours)

Tour records capture information about on-site or online tours of
objects, locations, collections or any other record in the database.

### Tour intrinsics (ca_tours)

| Name |Code | Description | Mandatory? |Default|
|----|----|----|----|----|
|Tour code|tour_code|The tour identifier. Must be a unique alpha-numeric code without spaces or punctuation beyond underscores.|Yes||
|Type|type_id|A value from the tour_types list indicating the type of the record. Stored as an internally generated numeric item_id. When setting this value in a data import or via an API call the item identifier may be used.|Yes|null|
|Access|access|Determines visibility of record in public-facing applications such as Pawtucket. Values are defined in the access_statuses list. Typically the list includes values for “public” and “private” visibility. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. By convention “0” is interpreted as private and “1” as public access, although this can be modified or expanded in app.conf if required.|Yes|0|
|Status|status|Records the general cataloguing workflow status of the record. Values are defined in the workflow_statuses list. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. Unlike access values, statuses have no functional impact on a record. They are merely informations and intended to provide a simple, straightforward way to track the cataloguing process.|Yes|0|
|Source|source_id|A value from the tour_sources list indicating the original source of the tour. This value is sometimes used to broadly distinguish different classes of tours. When setting this value in a data import or via an API call the item identifier may be used.|No||
|Icon|icon|Icon image to display for tour.|No||
|Color|color|Highlight color for tour in hex format|No||
|View count|view_count|Number of times record has been viewed in Pawtucket front-end|No|0|
|Rank|rank|The sort order position of the tour. Must be a whole number; lower numbers indicate higher ranking in sort.|No|0|

:::note
**ca_tours.preferred_labels.name** is used by data mappings and display
templates to reference the intrinsic name field in the
**ca_tour_labels** table
:::

# Tour Stops (ca_tour_stops)

Each tour record has any number of ordered \"stops\". Each tour stop
contains metadata about the stop (descriptive text, geographic
coordinates, etc.) as well as relationships to relevant objects,
entities and more.

### Tour stop intrinsics (ca_tour_stops)

| Name |Code | Description | Mandatory? |Default|
|----|----|----|----|----|
|Identifier|idno|The tour stop identifier. Must follow policy defined in configured numbering policy if app.conf setting require_valid_id_number_for_ca_tour_stops is set. Must be unique if app.conf setting allow_duplicate_id_number_for_ca_tour_stops is not set.|Depends upon numbering policy||
|Type|type_id|A value from the tour_stop_types list indicating the type of the record. Stored as an internally generated numeric item_id. When setting this value in a data import or via an API call the item identifier may be used.|Yes|null|
|Parent|parent_id|Reference to parent record. Will be null if no parent is defined. When setting this value in a data import or via an API call the identifier of the parent place may be used.|No|null|
|Tour|tour_id|A reference to the tour record (ca_tours) of which the stop is a part. Note that a stop is always part of a tour. It cannot exist outside of a tour. The raw database value contained tour_id is an internally generated numeric tour_id. However, when setting this intrinsic via an import mapping or API call you may also use the list’s code.|No||
|Access|access|Determines visibility of record in public-facing applications such as Pawtucket. Values are defined in the access_statuses list. Typically the list includes values for “public” and “private” visibility. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. By convention “0” is interpreted as private and “1” as public access, although this can be modified or expanded in app.conf if required.|Yes|0|
|Status| status|Records the general cataloguing workflow status of the record. Values are defined in the workflow_statuses list. For historical reasons the value stored in the intrinsic is the list item’s value field, not its identifer or label. Unlike access values, statuses have no functional impact on a record. They are merely informations and intended to provide a simple, straightforward way to track the cataloguing process.|Yes|0|
|Icon|icon|Icon image to display for tour stop.|No||
|Color|color|Highlight color for tour stop in hex format.|No||
|Rank|rank|The sort order position of the tour stop. Must be a whole number; lower numbers indicate higher ranking in sort.|Yes|0|

:::note
**ca_tour_stops.preferred_labels.name** is used by data mappings and
display templates to reference the intrinsic name field in the
**ca_tour_stop_labels** table
:::

# Label Tables

Labels are record names or titles. All primary tables have companion
label tables. Labels come in two varieties: preferred and non-preferred.
Each record has one, and only one, preferred label. The preferred label
is used as the record's default display title. Records may have any
number of non-preferred labels, which are taken as alternative titles
and may be used in searches. Labels are always present and do not need
to be configured to exist.

The following shorthand is commonly used to reference preferred labels:
\<tablename\>.preferred_labels.\<label table name field\>. For example
the following would display an object preferred label:

``` none
ca_objects.preferred_labels.name
```

See label name fields below for table specific name fields.

# Label Table Intrinsics

Occassionally label table names and intrinsic fields need to be
referenced directly, for example while configuring searching indexing.
Search indexing in
[Search_indexing.conf](https://camanual.whirl-i-gig.com/providence/user/configuration/configuringProvidence/mainConfiguration/search_indexing).

:::note
`\<table name\>.preferred_labels.\<name of intrinsic\>` is used by data
mappings and display templates to reference the intrinsic _name_
field for preferred labels. The _\<table name\>.preferred_labels_
construct is simply an alias for the label table, filtered to return
only those entries with the _is\_preferred_ set. For example
_ca_objects.preferred_labels.name_ and _ca_object_labels.name_
refer to the same thing, except that the _ca_object_labels.name_
version will return _all_ labels, while
_ca_objects.preferred_labels.name_ will return only those marked as
preferred. Similarly, _\<table name\>.nonpreferred_labels.\<name of
intrinsic\>_ will return all entries _not_ marked as preferred.
Whether you use _ca_objects.preferred_labels.\<name of intrinsic\>_,
_ca_objects.nonpreferred_labels.\<name of intrinsic\>\_ or
_ca_object_labels.\<name of intrinsic\>_, the intrinsic names used are
the same ones listed below.
:::

## Label tables for primary table

| Primary table |Label table | 
|----|----|
|ca_objects|ca_object_labels|
|ca_object_lots|ca_object_lot_labels|
|ca_entities|ca_entity_labels|
|ca_places|ca_place_labels|
|ca_occurrences|ca_occurrence_labels|
|ca_collections|ca_collection_labels|
|ca_storage_locations|ca_storage_location_labels|
|ca_loans|ca_loan_labels|
|ca_movements|ca_movement_labels|
|ca_object_representations|ca_object_representation_labels|
|ca_tours|ca_tour_labels|
|ca_tour_stops|ca_tour_stop_labels|

## Available for all label tables

| Name |Code | Description 
|----|----|----|
|Preferred?|is_preferred|A preferred label is the one ‘true’ title or name of an item – the one you should use when referring to the item – used for display. There can only be one preferred label per item per locale. That is, if you are cataloguing in three languages you can have up to three preferred labels, one in each language. Non-preferred labels are alternative names that can be used to enhance searching or preserve identity. Non-preferred labels can repeat without limit, take locales and optionally take type values which may be employed distinguish valid ‘alternate’ labels from simple search enhancing non-preferred labels.|
|Name sort|name_sort|Automatically generated version of label used for sorting.|
|Type|type_id||
|Source|source_info||
|Locale|locale_id|Locale of the label.|

:::note
ca_tour_labels** and **ca_tour_stop_labels** do not contain type,
source_info and is_preferred
:::

## Label name fields

Name fields within label tables can differ for different tables.

The following applies to: 

* Object labels (ca_object_labels), 
* Object Lot labels (ca_object_lot_labels)
* Place labels (ca_place_labels)
* Occurrence labels (ca_occurrence_labels)
* Collection labels (ca_collection_labels)
* Storage location labels (ca_storage_location_labels)
* Loan labels (ca_loan_labels)
* Movement labels (ca_movement_labels)
* Object representation labels (ca_object_representation_labels)
* Tour labels (ca_tour_labels)
* Tour stop labels (ca_tour_stop_labels)

| Name |Code | Description 
|----|----|----|
|Name|name|Name of record, used for display.|


### The following applies to: Entity labels (ca_entity_labels) {#ca_entity_labels-name-fields}

| Name |Code | Description 
|----|----|----|
|Displayname|displayname |Full name of entity, used for display|
|Forename/First name|forename|Forename of the entity|
|Additional forenames/ first names|other_forename| Alternate forenames|
| Middle name |middlename|Middle name of the entity|
|Surname/Last name|surname|Surname of the entity|
|Prefix|prefix|Prefix for the entity|
|Suffix|suffix|Suffix for the entity|

# Special Intrinsics

Additional intrinsics provide access to change log information,
origination and history tracking information. They are potentially
available many or all primary tables, as noted below.

|Code | Description |Applies to|Examples
|----|----|----|----|
|created|Date/time record was created. Returns date/time formatted using system defaults for display. Optional subfields may be specified to obtain the date/time in different formats, and information about the user that created the record. Subfields include:<ul><li>user = the creator’s user name</li><li>fname = the creator’s first name</li><li>lname = the creator’s last name</li><li>email = the creator’s email address</li><li>timestamp = the creation date/time as a Unix timestamp</li></ul>|Any record|<ul><li>ca_objects.created (returns date/time as display text)</li><li>ca_objects.created.timestamp (returns date/time as Unix timestamp)</li><li>ca_objects.created.email (returns the email of the user who created the record)</li></ul>|
 |lastModified|Date/time record was last modified. Returns date/time formatted using system defaults for display. Optional subfields may be specified to obtain the date/time in different formats, and information about the user that last modified the record. Subfields include:<ul><li>user = the user name of the user who last modified the record</li><li>fname = the last modifier’s first name</li><li>lname = the last modifier’s last name</li><li>email = the last modifier’s email address</li><li>timestamp = the last modification date/time as a Unix timestamp</li></ul>|Any record|<ul><li>ca_objects.lastModified (returns date/time of last modification as display text)</li><li>ca_objects.lastModified.timestamp (returns date/time of last modification as Unix timestamp)</li><li>ca_objects.lastModified.email (returns the email of the user who last modified the record)</li></ul>|
|_guid|A globally unique identifier (GUID) for the record. This is the same GUID value used to track records across replicated systems. (Available from version 1.8)|Any record|ca_objects.guid|
|history_tracking_current_value|Current value for history tracking policy. Policy used is the default policy unless overridden by passing the a policy option value on the tag.|Any record for which a current value tracking policy is defined|<ul><li>ca_objects.history_tracking_current_value (current value for object default policy)</li><li>ca_objects.history_tracking_current_value%policy=provenance (current value for object record using “provenance” policy)</li></ul>|
|history_tracking_current_date|Date of current value for history tracking policy. Policy used is the default policy unless overridden by passing the a policy option value on the tag.|Any record for which a current value tracking policy is defined|<ul><li>ca_objects.history_tracking_current_date (current value cate for object default policy)</li><li>ca_objects.history_tracking_current_date%policy=provenance (current value date for object record using “provenance” policy)</li></ul>|
|history_tracking_current_contents|Values of all records that use this record as their current value. Policy used is the default policy unless overridden by passing the a policy option value on the tag.|Any record which is used by at least one current value tracking policy|ca_storage_locations.history_tracking_current_contents (all values that use this location record as their current value for any default policy) ca_storage_locations.history_tracking_current_contents%policy=current_location (all records using this location record as their curent value using the “current_location” policy)|
|submitted_by_user|Name and email of user who submitted the record using the Pawtucket “contribute” form feature. By default the user’s first and last name, followed by email address are returned. The return value may be controlled by passing a “display_template” tag option. The display template is evaluated relative to the ca_users record.|<ul><li>ca_objects</li><li>ca_entities</li><li>ca_places</li><li>ca_occurrences</li><li>ca_collections</li><li>ca_object_lots</li><li>ca_loans</li><li>ca_movements</li><li>ca_storage_locations</li><li>ca_object_representations</li></ul>|<ul><li>ca_objects.submitted_by_user (Returns `<first name> <last name>(<email>)`)</li><li>ca_objects.submitted_by_user%display_template=^ca_users.email (Returns email address alone)</li></ul>|
|submission_group|The group the user was in when the record was submitted using the Pawtucket “contribute” form feature. By default the group name followed by group code is returned. The return value may be controlled by passing a “display_template” tag option. The display template is evaluated relative to the ca_user_groups record.|<ul><li>ca_objects</li><li>ca_entities</li><li>ca_places</li><li>ca_occurrences</li><li>ca_collections</li><li>ca_object_lots</li><li>ca_loans</li><li>ca_movements</li><li>ca_storage_locations</li><li>ca_object_representations</li></ul>|<ul><li>ca_objects.submission_group (Returns ``<group name> (<group code>)`` </li><li>ca_objects.submission_group%display_template=^ca_user_groups.codel (Returns group code alone)</li></ul>|
