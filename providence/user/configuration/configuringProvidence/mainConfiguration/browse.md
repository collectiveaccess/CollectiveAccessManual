---
title: Browse.conf
---

CollectiveAccess includes a configurable *Browse Engine* that powers all
faceted browse and search features. The engine is capable of browsing
for, and returning sets of, any of the primary item types: objects,
object lots, entities, places, occurrences, collections and storage
locations. The engine automatically caches both results and generated
facet content to improve performance. If two users perform the same
browse, results for the second browse will be picked up from the cache
saving time. Similarly, facet content, which is often costly to
generate, is shared across similar browses increasing responsiveness.

## Current use

Faceted browse is currently used in the Providence (back-end) \"Find\"
interfaces for all primary item types. It is also used to provide browse
services in the Pawtucket public-access front-end.

## Configuration

Any intrinsic field (ie. a field that is always part of an item such as
extent and extent_units in object lots), metadata attribute or related
authority may be used for browsing. Since every deployment of CA is
different, and the metadata schema varies from one installation to
another, you must tell the browse engine what sorts of information you
want to be browse-able and how that data should be displayed to the
user. This is done by modifying the browse configuration file in
*app/conf/browse.conf.* As with all other CA configuration files,
*browse.conf* is written using the standard CA configuration syntax.

  Top level key           Description
  ----------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  cache_timeout           Number of seconds to keep information for a cached browse around before discarding. The suggested value for this key depends upon how the browse is being uses. A cached browse will not reflect changes made to the data since its creation, so for a busy backend system this value should be relative low: 300 seconds (5 minutes) is a reasonable value. For front-end systems where the catalogue data is not changing often, 86400 seconds (1 day) may be a more appropriate value. If you want to disable caching set this key to 0.
  \<browse_table_name\>   For each item type you wish to support browsing on you must define an associative array attached to the item table name: ca_objects, ca_entities, ca_places, ca_occurrences, ca_collections, ca_object_lots, and ca_storage_locations. The values set in each item array define the behavior of the browse for that item type. These values are defined below.

For each item type you want to be browse-able, you must define a
top-level key with the item\'s table name (eg. ca_objects for objects)
and as associative array value. The array must contain a facets key
whose value is in turn an associative array defining each available
browse facet for the item type. The keys of the facets array are
arbitrary code name for the facets, it doesn\'t matter what they are so
long as they are unique within the facet list. The values are yet
another associative array which actually defines the characteristics of
the facet.

Each facet has a type and some (but not all) of the facet definition
keys are dependent upon this type. The follow types of facets are
currently supported:

  Facet type        Description
  ----------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  authority         Authority facets allow for browsing on cataloguing applied to the browsed item from a related authority. Eg. if you want to browse for objects by place name, you\'d set up a facet of type authority with options to cover the places authority.
  field             Allows browsing on items using an intrinsic field. These include idno (identifier) and the handful legacy intrinsics such as ca_objects extent.
  fieldList         Allows browsing on lists that are directly related to an item via an intrinsic field. These include the type lists for each item type (eg. browse by object types), access and workflow status.
  normalizedDates   Allows browsing on date attributes where the values have been normalized, or adjusted to span periods of time. Since dates are often specific to the day (or even hour, minute and second), browsing on unmodified date data is usually undesirable. normalizedDate facets will return browse choices where dates have been collapsed into days, months, years, decades or centuries.
  attribute         Allows browsing on any simple single-value attribute. Values are presented as-is, so you should only configure browsing on metadata elements that have a relatively small range of possible values. Browsing on an attribute with narrative text content will not work well. Browsing on an attribute with typed-in text indicating materials or location may work well if data quality is relatively high.
  label             Allows browsing on preferred and non-preferred labels associated with the browsed item. This can be useful for creating index-like lists of titles for a given type of item. Since the facet will list all unique label values for a type of item it is mainly useful in smaller systems with relatively few items or where records share a manageable number of labels. For larger systems with many distinct label values this facet type is likely to provide poor usability and performance.
  has               Provides a means to browse for items that either have at least one relationship to some other type of item, or for items with no relationships to a specified type of item. The option values for this facet are always \"yes\" and \"no.\" This type of facet is primarily useful for retrieving objects with or without object representations (media), but it can also be used for reporting and data quality assessment purposes. For example, this facet could be configured to all retrieval of all objects without an associated entity.
  dupeidno          Allows browsing for records with identifiers that are duplicated by at least one other record. Facet values are the number of repeats an identifier has. This type of facet is useful for facilitating clean up of data where identifiers have been erroneously reused. Available from version 1.7.7
  location          Allows browsing for records on current location, as defined in the current location policy configuration (current_location_criteria in app.conf).
  violations        Allows browsing for records that are in violation of rules in the metadata dictionary. (Note that the metadata dictionary is currently an undocumented feature with no configuration UI).
  checkouts         Allows browsing for objects based upon checkout status set by the library check in/out module.
  inHomeLocation    Allows browsing for objects based upon whether they are currently in their home location or not, as defined in the current location policy configuration (current_location_criteria in app.conf). (Available from version 1.8)

For all types of facets the following configuration keys are defined:

  Facet key                  Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                Mandatory?
  -------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------
  indefinite_article         The indefinite article to use when displaying the facet label.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             Yes
  multiple                   If this directive is set to 1 the facet will perform an OR browse instead of an AND browse. With \"multiple\" a user is able to select more than one value per facet, for example, in a date browse a user can find records cataloged as 1990 or 1991.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     No
  label_singular             The name to display for this facet, in the singular (eg. \"place name\").                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  Yes
  label_plural               The name to display for this facet, in the plural (eg. \"place names\").                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   Yes
  description                Description of the facet. This text appears on browse landing page in Pawtucket                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            No
  group_mode                 The method by which to group facet values for display. Currently \'alphabetical\', \'hierarchical\' and \'none\' groupings are supported. \'Alphabetical\' mode groups items alphabetically by the first letter in their name; \'hierarchical\' displays hierarchical facets (authorities only) in an interactive hierarchy browser; \'none\' simply lists items out.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      No
  individual_group_display   If set to a non-zero value, each group in the facet will be displayed separately and loaded on-demand. This can improve performance in some cases.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         No
  type_restrictions          An optional list of browse item types to restrict use of this facet to. This is useful if you are restricting your browses to specific types of browse items (ex. occurrences of type \"exhibitions\" only) and want to have different facet configurations for each type-specific browse. By restricting a facet to \"exhibitions\", for example, you ensure that it will only appear when you are browsing specifically for exhibitions, or if you are performing an unrestricted browse. You can specify the restrictions are numeric type_id\'s or alphanumeric type codes. The latter is generally preferred as it is easier to read, understand and maintain.                                                                                                                                                                                                                                                                                                                                        No
  requires                   An optional list of facet names, at least one of which must appear in the browse criteria (ie. have been used in the current browse), for the facet to be available. This is useful if you have a facet that is only relevant in the context of a selection limited by another facet. For example, if you have a facet defined for countries and another for state/provinces, you can ensure that the state/province facet is only made available to the user if a country has already been selected for the browse by making state/providence \"require\" the country facet.                                                                                                                                                                                                                                                                                                                                                                                                                              No
  single_value               If set to a valid facet value, then selecting the facet will browse on the specified value rather than opening up a browse facet display with choices. This option can be useful for facets with one or two values, where explicit links are preferred over a list interface.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              No
  facet_groups               A list of tags (\"groups\") to apply to the facet. Facets displayed by the browse engine can be limited using these tags, via the browse engine setFacetGroup() method. Facet groups are mainly useful when you need to have distinct sets of facets display in different contexts.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        No
  relative_to                Browse facets are typically generated relative to the table being browsed. If you are browsing objects, for example, a facet of related entities will display names of entities related directly to objects. relative_to, when set to a table other than the table being browsed, enables you to generate facets with values from a table related to the one you are browsing. You could, for example, generate a facet of birth dates of entities related to objects, or a list of places related to entities related to objects. In effect this is an indirect browse. Even though the facet values are related to the relative_to table, the results of the browse are still the same. relative_to can be very useful when metadata you want to browse by is actually related to a table different than the one you wish to get results for. Value must be a valid item table name (Eg. ca_objects, ca_entities, ca_places, ca_occurrences, ca_collections, ca_storage_locations, ca_list_item, Etc.)   No
  access                     A list of access values to restrict facet visibility to. Access values are numerical values used to control public visibility of records. Each user, authenticated or not, while be associated with one or more access values. For non-authenticated users access values will be those specified in the public_access_settings directive in app.conf. For authenticated users it will be a list of values conferred by the users associated roles. Any user having any of the access values for the facet will be able to use the facet. If this option is omitted or left empty no restriction will be applied. Available from version 1.7.7                                                                                                                                                                                                                                                                                                                                                              No
  roles                      A list of user role code to restrict facet visibility to. Any user having any of the roles listed for the facet will be able to use the facet. If this option is omitted or left empty no restriction will be applied. Available from version 1.7.7                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        No

For facets of type **authority** these additional keys are defined:

  Facet key                        Description                                                                                                                                                                                                                                                                                                                                                                                                                       Mandatory?
  -------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------
  table                            The authority table to browse by (Eg. ca_objects, ca_entities, ca_places, ca_occurrences, ca_collections, ca_storage_locations, ca_list_item)                                                                                                                                                                                                                                                                                     Yes
  relationship_table               The \"linking table\" between the item type your are browsing for and the authority you are browsing by. For example, if you are browsing for objects by entities this table is ca_objects_x_entities. See the installation profile manual for a full list of these table names.                                                                                                                                                  Yes
  restrict_to_types                An optional list of types *for the item you are browsing by* to restrict the facet to. The types can be internal item_ids for the types or ca_list_item.idno values (eg. list item codes set by the installation profile). This key lets you set up facets that only browse a subset of a given authority: only places of type \'river\' for instance.                                                                            No
  restrict_to_relationship_types   An optional list of relationship types to restrict the facet to. The types can be internal relationship type_ids for the relationship types or alphanumeric type codes (eg. type codes set by the installation profile). This key lets you set up facets that only browse a subset of a given authority: only places linked to objects with relation type \'depicts\')                                                            No
  exclude_relationship_types       An optional list of relationship types to exclude from the facet. The types can be internal relationship type_ids for the relationship types or alphanumeric type codes (eg. type codes set by the installation profile). This key lets you set up facets that only browse a subset of a given authority: only places linked to objects with relation types other than \'depicts\')                                               No
  generate_facets_for_types        If set to a non-zero value, will cause the current facet to be automatically converted into a separate facet for each type of the item type being browsed by. This option is typically employed to provide browsing of occurrences where the various types are unrelated, but you can also use this on other authorities to provide a fine-grained browse without having to hardcode the type hierarchy into the configuration.   No
  show_all_when_first_facet        If set to a non-zero value, will force this facet to include all items in the authority whether than are related to the underlying browse table or not when the browse has no criteria set (ie. when the facet is the first one chosen in the browse). Default is false.                                                                                                                                                          No
  order_by_label_fields            A list of fields in authority label table to sort by. You can do multi-level sorting by specifying more than more field in the list. Ascending sort order is assumed. The list should be only field names; do not include the table name                                                                                                                                                                                          No
  group_mode                       The method by which to group facet values for display. Currently \'alphabetical\', \'hierarchical\' and \'none\' groupings are supported. \'Alphabetical\' mode groups items alphabetically by the first letter in their name; \'hierarchical\' displays hierarchical facets (authorities only) in an interactive hierarchy browser; \'none\' simply lists items out.                                                             No
  show_hierarchy                   Set to non-zero value to display hierarchy on items in this facet; default is to not display hierarchy                                                                                                                                                                                                                                                                                                                            No
  hierarchical_delimiter           Character(s) to place between elements of the hierarchy                                                                                                                                                                                                                                                                                                                                                                           No
  remove_first_items               Number of items to trim off the top of the hierarchy (leave blank or set to 0 to trim nothing)                                                                                                                                                                                                                                                                                                                                    No
  hierarchy_limit                  Maximum length of hierarchy to display (leave blank to return hierarchy unabridged)                                                                                                                                                                                                                                                                                                                                               No
  hierarchy_order                  Direction to display hierarchy in. Can be ASC or DESC (default is DESC). ASC displays the root first; DESC displays the lowest element in the hierarchy first                                                                                                                                                                                                                                                                     No
  check_access                     Set to non-zero value to only show related items with public access when browsing in Pawtucket. Has no effect in Providence. Default value is to perform access checking.                                                                                                                                                                                                                                                         

For facets of type **field** these additional keys are defined:

  Facet key   Description                                                                Mandatory?
  ----------- -------------------------------------------------------------------------- ------------
  field       The field in the item type being browsed to browse by (Eg. idno, extent)   Yes

For facets of type **fieldList** these additional keys are defined:

  Facet key   Description                                                                                           Mandatory?
  ----------- ----------------------------------------------------------------------------------------------------- ------------
  field       The field in the item type being browsed to browse by (Eg. type_id, item_status_id, access, status)   Yes
  display     The field to display in the facet. If not set the preferred label is displayed.                       No

For facets of type **normalizedDates** these additional keys are
defined:

  Facet key                     Description                                                                                                                                                                                                                                                           Mandatory?
  ----------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------
  element_code                  The element code of the metadata element to be browsed. Must have an attribute type of DateRange                                                                                                                                                                      Yes
  normalization                 Sets the method used to normalize date values. Supported values are days, months, years, decades, centuries.                                                                                                                                                          Yes
  sort                          Sets the order in which to sort the returned dates. A value of \'DESC\' will sort the dates in descending order (most recent first), which a value of \'ASC\' will sort in ascending order (oldest first). The default if this is not specified is ascending order.   No
  minimum_date                  If set, the facet will only include dates that occur after the specified value. The value can be any valid date expression (eg. 1900, 12/7/1914, etc.).                                                                                                               No
  maximum_date                  If set, the facet will only include dates that occur before the specified value. The value can be any valid date expression (eg. 1900, 12/7/1914, etc.).                                                                                                              
  treat_before_dates_as_circa   If set facet will treat after \"before xxxx\" dates as circa dates. Available from version 1.7.7                                                                                                                                                                      No
  treat_after_dates_as_circa    If set facet will treat after \"after xxxx\" dates as circa dates. Available from version 1.7.7                                                                                                                                                                       No
  include_unknown               If set facet will include an \"unknown date\" option to find records without any associated date. Available from version 1.7.8                                                                                                                                        

For facets of type **attribute** these additional keys are defined:

  Facet key      Description                                                                                                                                                                                                                                                                                                        Mandatory?
  -------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ ------------
  element_code   The element code of the metadata element to be browsed. Only attributes of type List and Text are officially supported, but Numeric and Currency types tend to work well too. Other types may or may not work as you would like (but usually will). For container elements, use the sub-element\'s element code.   Yes
  suppress       A list of values to omit from the facet. If the metadata element is a list these should be list item_id\'s or idno\'s. For other element types use the label value.                                                                                                                                                No

For facets of type **label** these additional keys are defined:

  Facet key               Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              Mandatory?
  ----------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------
  restrict_to_types       An optional list of types *for the item you are browsing by* to restrict the facet to. The types can be internal item_ids for the types or ca_list_item.idno values (eg. list item codes set by the installation profile). This key lets you set up facets that only browse a subset of a given authority: only places of type \'river\' for instance.                                                                                                                                                                                                   No
  preferred_labels_only   If set to a non-zero value, will force this facet to include only preferred labels. Default is false: include all labels, preferred and non-preferred.                                                                                                                                                                                                                                                                                                                                                                                                   No
  group_mode              The method by which to group facet values for display. Currently only \'alphabetical\' and \'none\' groupings are supported. This mode groups items alphabetically by the first letter in their name.                                                                                                                                                                                                                                                                                                                                                    No
  order_by_label_fields   Available from version 1.7.6. A list of fields in the label table to sort by. You can do multi-level sorting by specifying more than more field in the list. Ascending sort order is assumed. The list should be only field names; do not include the table name                                                                                                                                                                                                                                                                                         No
  template                Available from version 1.7.6. A template to format returned labels with. This is primarily useful for formatting entity labels, which are comprised of several component fields (surname, forename, middle name, displayname, Etc.). The template is text with label components specified by the field name of the component preceded by a caret (\"\^\"). For example, to format an entity label surname-comma-forename style the template is \"\^surname, \^forename\". If no template is specified the primary display field for the label is used.   No

For facets of type **has** these additional keys are defined:

  Facet key                        Description                                                                                                                                                                                                                                                                                                                                                                           Mandatory?
  -------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------
  table                            The authority table to look for relationships to (Eg. ca_objects, ca_entities, ca_places, ca_occurrences, ca_collections, ca_storage_locations, ca_list_item)                                                                                                                                                                                                                         Yes
  relationship_table               The \"linking table\" between the item type your are looking for relationships to and the authority you are browsing by. For example, if you are looking for objects with object representations this table is ca_objects_x_object_representations.                                                                                                                                   Yes
  restrict_to_types                An optional list of types *for the item you are browsing by* to restrict the facet to. The types can be internal item_ids for the types or ca_list_item.idno values (eg. list item codes set by the installation profile). This key lets you set up facets that only browse a subset of a given authority: only places of type \'river\' for instance.                                No
  restrict_to_relationship_types   An optional list of relationship types to restrict the facet to. The types can be internal relationship type_ids for the relationship types or alphanumeric type codes (eg. type codes set by the installation profile). This key lets you set up facets that only browse a subset of a given authority: only places linked to objects with relation type \'depicts\'.                No
  exclude_relationship_types       An optional list of relationship types to exclude from the facet. The types can be internal relationship type_ids for the relationship types or alphanumeric type codes (eg. type codes set by the installation profile). This key lets you set up facets that only browse a subset of a given authority: only places linked to objects with relation types other than \'depicts\'.   No
  label_yes                        Text to use for \"yes\" value facet option. If no specified defaults to \"Yes\".                                                                                                                                                                                                                                                                                                      No
  label_no                         Text to use for \"no\" value facet option. If no specified defaults to \"No\".                                                                                                                                                                                                                                                                                                        No

For facets of type **dupeidno** these additional keys are defined:

  Facet key   Description   Mandatory?restrict_to_types   An optional list of types *for the item you are browsing by* to restrict the facet to. The types can be internal item_ids for the types or ca_list_item.idno values (eg. list item codes set by the installation profile). This key lets you set up facets that only browse a subset of a given authority: only places of type \'river\' for instance.   Noexclude_types   An optional list of types to exclude from the facet. The types can be internal item_ids for the types or ca_list_item.idno values (eg. list item codes set by the installation profile). This key lets you set up facets that only browse a subset of a given authority: all places with type other than \'river\' for instance.   No
  ----------- ------------- ----------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ----------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ----

For facets of type **location** these additional keys are defined:

  Facet key   Description   Mandatory?display   Dictionary of display parameters for individual kinds of locations. The format is similar to that uses in app.conf for the current_location_criteria policy. In general you can set display templates for each kind of location using a format like this:.. ```display = { ca_storage_locations = { related = { template = \^ca_storage_locations.hierarchy.preferred_labels%delimiter=\_\_\_ } }, },``` where first level keys are table names and second level keys are types. If omitted the configuration set in app.conf in current_location_criteria is used.   Nocollapse   Dictionary controlling which sorts of locations are collapsed into general headings rather than displayed individually. Keys of the dictionary are table names and type separated with a slash (\"/\"). Values are text with which to represent the collapsed group in the browse facet. For example, to collapse all occurrences of type \"exhibition\" into a single facet value labeled \"On loan\" use:.. ```collapse = { ca_occurrences/exhibition = On loan }``` Selecting \"On loan\" would return all objects where the current location is any exhibition. Without the collapse setting, each exhibition would be listed individually.   NomaximumBrowseDepth   The element code of the metadata element to be browsed. Must have an attribute type of DateRange   Nopolicy   The current value tracking policy to use. If not specified the default policy is used.   
  ----------- ------------- ------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ ---------------------- -------------------------------------------------------------------------------------------------- ---------- ---------------------------------------------------------------------------------------- --

For facets of type **inHomeLocation** these additional keys are defined:

  Facet key           Description                                                                                                                                                                                                                                                                                                                                              Mandatory?
  ------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------
  restrict_to_types   An optional list of types *for the item you are browsing by* to restrict the facet to. The types can be internal item_ids for the types or ca_list_item.idno values (eg. list item codes set by the installation profile). This key lets you set up facets that only browse a subset of a given authority: only places of type \'river\' for instance.   No
  exclude_types       An optional list of types to exclude from the facet. The types can be internal item_ids for the types or ca_list_item.idno values (eg. list item codes set by the installation profile). This key lets you set up facets that only browse a subset of a given authority: all places with type other than \'river\' for instance.                         No
  policy              The current value tracking policy to use. If not specified the default policy is used.                                                                                                                                                                                                                                                                   

For facets of type **violations** these additional keys are defined:

  Facet key   Description   Mandatory?restrict_to_types   An optional list of types for the item you are browsing by to restrict the facet to. The types can be internal item_ids for the types or ca_list_item.idno values (eg. list item codes set by the installation profile). This key lets you set up facets that only browse a subset of a given authority: only places of type \'river\' for instance.   Yes
  ----------- ------------- ----------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ -----

For facets of type **checkouts** these additional keys are defined:

  Facet key   Description   Mandatory?restrict_to_types   An optional list of types *for the item you are browsing by* to restrict the facet to. The types can be internal item_ids for the types or ca_list_item.idno values (eg. list item codes set by the installation profile). This key lets you set up facets that only browse a subset of a given authority: only places of type \'river\' for instance.   Nomode   Determines what checkouts are browsed on. If set to \"user\" checkouts are shown by user (subject to type determined by the \'status\' option). If set to \"all\" all types of checkouts are shown in facet. In this case \'status\' is not used.   Yesstatus   Limits facet to a specific type of checkout when mode is set to \"user\". Must be one of \"all\", \"available\", \"out\", \"reserved\", \"overdue\". Default is \"all\" when omitted.   No
  ----------- ------------- ----------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ----------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ----

## Browse results when no criteria are defined

By default the browse will not return results if you attempt to execute
a browse with no criteria defined. In principle, a criteria-less browse
should return all possible results -- every item in your database.
However, for most data sets such a result set would be of limited use
and slow to render. In most CA Providence and Pawtucket implementations,
a special \"start browsing\" display is used when no criteria are
defined.

If you really do want all results returned when no criteria are defined
you can force it on a per-table basis by setting
show_all_for_no_criteria_browse in the table-level block (the one that
must contain the facets list). See the ca_objects block in the example
below to see how this is done.

## Avoiding Cache Confusion

Browse results are cached for a period of time defined by the
cache_timeout value in your browse configuration. Once cached, a browse
result will be reused until it expires, even if you change your browse
configuration in the meantime. This has the effect of making it almost
impossible to experiment with browse configuration while caching is
enabled. If you are developing or debugging a browse configuration, be
sure to set cache_timeout to zero while you\'re working. Once your
browse is working as you want it to re-enable the cache by setting the
timeout to a reasonable value. Caching significantly improves overall
performance so you\'ll probably want it enabled for every day use.

## Example Configuration

A working browse.conf should look something like this:

``` none
# Browse configuration

# number of seconds to keep cached browses around
# set to 0 to disable caching
cache_timeout = 60

# Configuration for object browse
ca_objects = {
        show_all_for_no_criteria_browse = 1,
    facets = {
        entity_facet = {
            # 'type' can equal authority, attribute, fieldList, normalizedDates
            type = authority,
            table = ca_entities,
            relationship_table = ca_objects_x_entities,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [surname, forname],
            group_mode = alphabetical,

            indefinite_article = an,
            label_singular = _(entity),
            label_plural = _(entities)
        },
        place_facet = {
            type = authority,
            table = ca_places,
            relationship_table = ca_objects_x_places,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(place),
            label_plural = _(places)
        },
        collection_facet = {
            type = authority,
            table = ca_collections,
            relationship_table = ca_objects_x_collections,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(collection),
            label_plural = _(collections)
        },
        occurrence_facet = {
            type = authority,
            table = ca_occurrences,
            generate_facets_for_types = 1,
            relationship_table = ca_objects_x_occurrences,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = an,
            label_singular = _(occurrence),
            label_plural = _(occurrences)
        },
        term_facet = {
            type = authority,
            table = ca_list_items,
            relationship_table = ca_objects_x_vocabulary_terms,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(term),
            label_plural = _(terms)
        },
        type_facet = {
            type = fieldList,
            field = type_id,
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(type),
            label_plural = _(types)
        },
        object_subtype_facet = {
            type = attribute,
            element_code = object_subtypes,

            requires = type_facet,
            group_mode = alphabetical,

            label_singular = _("Sub-Type"),
            label_plural = _("Sub-Types")
        },
        status_facet = {
            type = fieldList,
            field = status,
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(status),
            label_plural = _(statuses)
        },
        access_facet = {
            type = fieldList,
            field = access,
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = an,
            label_singular = _(access status),
            label_plural = _(access statuses)
        },
        date_facet = {
            type = normalizedDates,
            element_code = creation_date,

            # 'normalization' can be: years, decades, centuries
            normalization = years,
            sort_by = [name],
            group_mode = none,

            indefinite_article = a,
            label_singular = _(year),
            label_plural = _(years)
        }
    }
}

# Configuration for object lot browse
ca_object_lots = {
    facets = {
        entity_facet = {
            # 'type' can equal authority, attribute, fieldList, normalizedDates
            type = authority,
            table = ca_entities,
            relationship_table = ca_object_lots_x_entities,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [surname, forname],
            group_mode = alphabetical,

            indefinite_article = an,
            label_singular = _(entity),
            label_plural = _(entities)
        },
        place_facet = {
            type = authority,
            table = ca_places,
            relationship_table = ca_object_lots_x_places,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(place),
            label_plural = _(places)
        },
        collection_facet = {
            type = authority,
            table = ca_collections,
            relationship_table = ca_object_lots_x_collections,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(collection),
            label_plural = _(collections)
        },
        occurrence_facet = {
            type = authority,
            table = ca_occurrences,
            relationship_table = ca_object_lots_x_occurrences,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = an,
            label_singular = _(occurrence),
            label_plural = _(occurrences)
        },
        term_facet = {
            type = authority,
            table = ca_list_items,
            relationship_table = ca_object_lots_x_vocabulary_terms,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(term),
            label_plural = _(terms)
        },
        type_facet = {
            type = fieldList,
            field = type_id,
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(type),
            label_plural = _(types)
        },
        status_facet = {
            type = fieldList,
            field = status,
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(status),
            label_plural = _(statuses)
        },
        access_facet = {
            type = fieldList,
            field = access,
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = an,
            label_singular = _(access status),
            label_plural = _(access statuses)
        }
    }
}
# --------------------------------------------------------------------
# Configuration for entity browse
ca_entities = {
    facets = {
        place_facet = {
            type = authority,
            table = ca_places,
            relationship_table = ca_entities_x_places,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(place),
            label_plural = _(places)
        },
        occurrence_facet = {
            type = authority,
            table = ca_occurrences,
            relationship_table = ca_entities_x_occurrences,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = an,
            label_singular = _(occurrence),
            label_plural = _(occurrences)
        },
        collection_facet = {
            type = authority,
            table = ca_collections,
            relationship_table = ca_entities_x_collections,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(collection),
            label_plural = _(collections)
        },
        term_facet = {
            type = authority,
            table = ca_list_items,
            relationship_table = ca_entities_x_vocabulary_terms,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(term),
            label_plural = _(terms)
        },
        type_facet = {
            type = fieldList,
            field = type_id,
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(type),
            label_plural = _(types)
        },
        status_facet = {
            type = fieldList,
            field = status,
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(status),
            label_plural = _(statuses)
        },
        access_facet = {
            type = fieldList,
            field = access,
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = an,
            label_singular = _(access status),
            label_plural = _(access statuses)
        }
    }
}
# --------------------------------------------------------------------
# Configuration for collection browse
ca_collections = {
    facets = {
        entity_facet = {
            # 'type' can equal authority, attribute, fieldList, normalizedDates
            type = authority,
            table = ca_entities,
            relationship_table = ca_entities_x_collections,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [surname, forname],
            group_mode = alphabetical,

            indefinite_article = an,
            label_singular = _(entity),
            label_plural = _(entities)
        },
        place_facet = {
            type = authority,
            table = ca_places,
            relationship_table = ca_places_x_collections,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(place),
            label_plural = _(places)
        },
        occurrence_facet = {
            type = authority,
            table = ca_occurrences,
            relationship_table = ca_occurrences_x_collections,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = an,
            label_singular = _(occurrence),
            label_plural = _(occurrences)
        },
        term_facet = {
            type = authority,
            table = ca_list_items,
            relationship_table = ca_collections_x_vocabulary_terms,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(term),
            label_plural = _(terms)
        },
        type_facet = {
            type = fieldList,
            field = type_id,
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(type),
            label_plural = _(types)
        },
        status_facet = {
            type = fieldList,
            field = status,
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(status),
            label_plural = _(statuses)
        },
        access_facet = {
            type = fieldList,
            field = access,
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = an,
            label_singular = _(access status),
            label_plural = _(access statuses)
        }
    }
}

# --------------------------------------------------------------------
# Configuration for place browse
ca_places = {
    facets = {
        entity_facet = {
            # 'type' can equal authority, attribute, fieldList, normalizedDates
            type = authority,
            table = ca_entities,
            relationship_table = ca_entities_x_places,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [surname, forname],
            group_mode = alphabetical,

            indefinite_article = an,
            label_singular = _(entity),
            label_plural = _(entities)
        },
        object_facet = {
            type = authority,
            table = ca_objects,
            relationship_table = ca_objects_x_places,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(object),
            label_plural = _(objects)
        },
        occurrence_facet = {
            type = authority,
            table = ca_occurrences,
            relationship_table = ca_places_x_occurrences,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = an,
            label_singular = _(occurrence),
            label_plural = _(occurrences)
        },
        term_facet = {
            type = authority,
            table = ca_list_items,
            relationship_table = ca_places_x_vocabulary_terms,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(term),
            label_plural = _(terms)
        },
        type_facet = {
            type = fieldList,
            field = type_id,
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(type),
            label_plural = _(types)
        },
        status_facet = {
            type = fieldList,
            field = status,
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(status),
            label_plural = _(statuses)
        },
        access_facet = {
            type = fieldList,
            field = access,
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = an,
            label_singular = _(access status),
            label_plural = _(access statuses)
        }
    }
}
# --------------------------------------------------------------------
# Configuration for occurrence browse
ca_occurrences = {
    facets = {
        entity_facet = {
            # 'type' can equal authority, attribute, fieldList, normalizedDates
            type = authority,
            table = ca_entities,
            type_restrictions = [exhibitions],   # if browse for occurrences is type-restricted then only display this facet when browsing for exhibitions

            relationship_table = ca_entities_x_occurrences,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [surname, forname],
            group_mode = alphabetical,

            indefinite_article = an,
            label_singular = _(entity),
            label_plural = _(entities)
        },
        object_facet = {
            type = authority,
            table = ca_objects,
            relationship_table = ca_objects_x_occurrences,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(object),
            label_plural = _(objects)
        },
        term_facet = {
            type = authority,
            table = ca_list_items,
            relationship_table = ca_occurrences_x_vocabulary_terms,
            restrict_to_types = [],
            restrict_to_relationship_types = [],
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(term),
            label_plural = _(terms)
        },
        type_facet = {
            type = fieldList,
            field = type_id,
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(type),
            label_plural = _(types)
        },
        status_facet = {
            type = fieldList,
            field = status,
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(status),
            label_plural = _(statuses)
        },
        access_facet = {
            type = fieldList,
            field = access,
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = an,
            label_singular = _(access status),
            label_plural = _(access statuses)
        }
    }
}

# --------------------------------------------------------------------
# Configuration for storage location browse
ca_storage_locations = {
    facets = {
        type_facet = {
            type = fieldList,
            field = type_id,
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(type),
            label_plural = _(types)
        },
        status_facet = {
            type = fieldList,
            field = status,
            sort_by = [name],
            group_mode = alphabetical,

            indefinite_article = a,
            label_singular = _(status),
            label_plural = _(statuses)
        }
    }
}
```
