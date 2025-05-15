---
title: Bundles
---

# Bundles

## Introduction

Bundles are elements that can be placed on UI screens, included in search forms or displays. They can be attributes of a specific element set or database fields intrinsic to a specific item type. Bundles can be functional elements that allow cataloguers to establish relationships between items, add and remove items from sets and manage an item’s location in a larger hierarchy. Bundles are so named because they are essentially black-boxes that encapsulate various functionality.

Below is a break down of the bundle classes and the properties that are particular to each type.

| Bundle Type |Also Known As | Description | Example |
|----|----|----|----|
|Basic bundle|Administrative bundle, Intrinsic bundle|Always present regardless of configuration. Single data entry; does not repeat.|access|
|Relationship bundle|Related table|Bundles that create relationships between items.|ca_objects|
|Label bundles|Name or Title bundle|Human-readable short descriptions used for display to identify a record.|preferred_labels|
|Attribute bundles|Metadata element|Any field created by a user.|ca_attribute_elementcode|
|Special bundles||Bundles that allow a cataloger to manage an item’s locations in, for example, sets and hierarchies|hierarchy_location|


## User interface Settings

There are several settings that can be used to configure all bundles, regardless of type, when they are placed on a user interface screen.

| Settings |Description | Default | Values |
|----|----|----|----|
|label|Custom label text to use for this placement of this bundle.|||
|add_label|Custom text to use for the add button for the placement of this bundle.|||
|description|Descriptive text to use for help for bundle. Will override descriptive text set for underlying metadata element, if set. Make sure to include a locale specification, i.e. ``<setting name=”description” locale=”en_US”>XXX</setting>``|||
|readonly|If checked, field will not be editable.|0 (not read only)|0 or 1|
|expand_collapse_value|(Available for v1.5) Controls the expand/collapse behavior when there is at least one value present. While technically available for most bundles, the setting might have no effect for some of the “special” bundles. They have extra settings, see below.|dont_force (default behavior = save expand/collapse state when the user changes it)|dont_force, collapse, expand|
|expand_collapse_no_value|(Available for v1.5) Controls the expand/collapse behavior when there is no value present. While technically available for most bundles, the setting might have no effect for some of the “special” bundles. They have extra settings, see below.|dont_force (default behavior = save expand/collapse state when the user changes it)|dont_force, collapse, expand|

However, there are type-specific settings as well, outlined below.

| Bundle Type |Settings | Description | Default | Values
|----|----|----|----|----|
|Special (hierarchy_location and hierarchy_navigation only)|open_hierarchy|If checked hierarchy browser will be open when form loads.|1 (open)|0 or 1
|Special (hierarchy_location and hierarchy_navigation only)|auto_shrink|If enabled hierarchy browser will shrink to height of contents. Version 1.5 and later.|1 (shrink)|0 or 1
|Special (hierarchy_location, hierarchy_navigation and ca_objects_history only)|expand_collapse|Controls the expand/collapse behavior for this bundle.|dont_force (default behavior = save expand/collapse state when the user changes it)|dont_force, collapse, expand
|Relationship (ca_list_items only)|restrict_to_lists|Restricts display to items from the specified list(s). Leave all unselected for no restriction.||list code
|Relationship (ca_list_items, ca_storage_locations, ca_places only)|useHierarchicalBrowser|If set a hierarchy browser will be used to select the related item rather than an auto-completing text field.|0|0 or 1
|Relationship (ca_list_items, ca_storage_locations, ca_places only)|hierarchicalBrowserHeight|The height of the hierarchical browser displayed when theuseHierarchicalBrowser option is set.|200px|A pixel dimension ending with ‘px’ (eg. 500px
|Relationship (ca_objects)|restrictToTermsRelatedToCollection|Will restrict checklist to those terms applied to related collections.|0|0 or 1
|Relationship (ca_objects)|restrictToTermsOnCollectionWithRelationshipType|Will restrict checklist to terms related to collections with the specified relationship type. Leave all unselected for no restriction.||type code
|Relationship (ca_objects)|restrictToTermsOnCollectionUseRelationshipType|Specifies the relationship used to relate collection-restricted terms to this object. (Required if usingrestrictToTermsRelatedToCollection)||type code
|Relationship|restrict_to_relationship_types|Restricts display to items related using the specified relationship type(s). Leave all unselected for no restriction.||type code
|Relationship|restrict_to_types|Restricts display to items of the specified type(s). Leave all unselected for no restriction.||type code
|Relationship|dont_include_subtypes_in_type_restriction|Normally restricting to type(s) automatically includes all sub-(child) types. If this option is checked then the lookup results will include items with the selected type(s) only|0|0 or 1
|Relationship|list_format|Format of relationship list.|bubbles|bubbles or list
|Relationship|dontShowDeleteButton|If checked the delete relationship control will not be provided.|0|0 or 1
|Relationship|minRelationshipsPerRow|Sets the minimum number of relationships that must be catalogued to save.|empty|numeric value
|Relationship|maxRelationshipsPerRow|Sets the maximum number of relationships that must be catalogued to save.|empty|numeric value
|Relationship|display_template|Layout for relationship when displayed in list (can include HTML). Element code tags prefixed with the ^ character can be used to represent the value in the template. For example: ^my_element_code.|^preferred_labels|Uses thebundle display template syntax
|Relationship|colorFirstItem|If set first item in list will use this color.|||
|Relationship|colorLastItem|If set last item in list will use this color.|||
|Relationship or Attribute|sort|Method used to sort related items.|For attributes: use target element code for sort without table or container path i.e. dates_value NOT ca_objects.date.dates_value. To sort on order created do not use the sort setting at all, use only sortDirection. For relationships: use the target element code for sort WITH full table/container path. Use relation_id to set to order created.|
|Relationship or Attribute|sortDirection|Direction of sort, when not in a user-specified order.|ASC|ASC or DESC
|Attribute or Label|usewysiwygeditor|Check this option if you want to use a word-processor like editor with this text field. If you expect users to enter rich text (italic, bold, underline) then you might want to enable this.||0 or 1
|Attribute or Label|width|Width of the placement on the UI||pixels or characters
|Attribute or Label|height|Height of the placement on the UI||pixels or characters
|Relationship or Label|documentation_url|A documentation link for the bundle||URL
|Special (ca_objects_history)|full list of settings here|The Object Use History bundle has many settings. See the included link for a full list.|||

Here’s an example of how some of the settings above would look at the code-level in an xml profile:

```
<placement code="ca_film">
  <bundle>ca_objects</bundle>
       <settings>
         <setting name="restrict_to_types">film</setting>
         <setting name="label" locale="en_US">Related films</setting>
         <setting name="add_label" locale="en_US">Add film</setting>
       </settings>
</placement>
```

## Display Settings

From /app/models/ca_bundle_displays.php

Global display settings:

| Settings |Description | Default | Values |
|----|----|----|----|
|show_empty_values|If checked all values will be displayed, whether there is content for them or not.|1|0 or 1|

Bundle display settings for all types:

| Settings |Description | Default | Values |
|----|----|----|----|
|label|Custom label text to use for this placement of this bundle.||Text|

Type-specific bundle display settings:

| Bundle Type |Settings | Description | Default | Values
|----|----|----|----|----|
|Label, Attribute, Relationship|delimiter|Text to place in-between repeating values.|||
|Label, Attribute|format|Template used to format output.|||
|Label, Attribute|maximum_length|Maximum length, in characters, of displayed information.|100|Characters|
|Relationship|makeEditorLink|If set name of related item will be displayed as a link to edit the item.|0 (not a link)|0 or 1|
|Relationship|restrict_to_relationship_types|Restricts display to items related using the specified relationship type(s). Leave all unselected for no restriction.||type code|
|Relationship|restrict_to_types|Restricts display to items of the specified type(s). Leave all unselected for no restriction.||type code|
|Relationship|show_hierarchy|If checked the full hierarchical path will be shown.|1 (full hierarchy shown)|0 or 1|
|Relationship|remove_first_items|If set to a non-zero value, the specified number of items at the top of the hierarchy will be omitted. For example, if set to 2, the root and first child of the hierarchy will be omitted.|0|Integers zero or greater based on hierarchy|
|Relationship|hierarchy_order|Determines order in which hierarchy is displayed.||ASC (top first) DESC (bottom first)|
|Attribute|show_empty_values|If checked all values will be displayed, whether there is content for them or not.|1|0 or 1|
|Attribute|filter|Expression to filter values with. Leave blank if you do not wish to filter values.||^ca_objects.dimensions.Type IN (“with_frame”)|

## Search Form Settings

Regardless of type, bundles can take the follow setting when they are used in search forms.

| Settings |Description | Default | Values |
|----|----|----|----|
|label|Custom label text to use for this placement of this bundle.||Text|
|width|Width, in pixels, of search form elements.|100px|A pixel dimension ending with ‘px’ (eg. 500px)|