---
title: Export Mappings
---

# Export Mappings 

## Supported Output Formats

Supported output formats currently include:

-   XML
-   MARC21
-   CSV

## Creating an Export Mapping

To create a mapping, first download the Excel-based export mapping
template available here:

`Data Export Mapping Template <Data_Export_Mapping_template.xlsx>`

Once all of the mappings and settings have been entered into the
template it can be [loaded
directly](#running-an-export) into CollectiveAccess. The mapping is automatically checked using format-specific rules before it is added, so if your mapping has any
errors or ambiguities, the mapping loader will let you know.

Creating the mapping is dependent on the format you want to export.
Specific notes and examples can be found in [Element Values and General
Notes on Specific
Formats](#element-values-and-general-notes-on-specific-formats).

## Rule Types

The first column of the main mapping spreadsheet is **Rule Type.**
Similarly to Rule Types in an [import
mapping](https://docs.collectiveaccess.org/providence/user/import/c_creating_mapping),
in an export mapping, what you set here qualifies what this row does.
There are several options available:


| Rule Type | Description 
|----|----|
|Mapping|Maps a CollectiveAccess data source to a target column number, XML element/attribute or MARC field.|
|Constant|Allows you to set an element in the target format (a CSV column or an XML element/attribute to a static/constant value. If this is set, the value is taken from the 6th column in the mapping sheet (“Source”).|
|RepeatMappings|Allows repeating a list of existing mappings in a different context. If this is set, the comma-delimited list of mappings is taken from the 6th column (“Source”). See Data_Exporter#Mapping repitition.|
|Setting|Sets preferences for the mapping (see below).|
|Variable|(Available for v1.5) Allows you, using all the available features of the exporter, to assign a value to a user-defined name for later usage. See Data_Exporter#Variables.|

## Hierarchical Mappings

Some export formats support hierarchical relationships between mapping
items. For XML this is a very core concept. To create a hierarchy,
simply assign a number to a mapping in the 2nd column of the Mapping
sheet and then reference that number in other rows (i.e. for other
items) in the 3rd row, which is typically named \"Parent ID\". The
second item will then become a direct child if the first one. In theory,
those hierarchies can be nested very deep, but in practice, the format
implementations may apply restrictions.

## Source

The value for the 5th column in the mapping sheet can be any
CollectiveAccess bundle specifier. See [API: Getting Data and Methods of
Access](/providence/developer/api_getting_data.html)
for details.

This usually specifies the actual data that is pulled into this item,
and can be set to arbitrary text for items with static content or be
left empty for items without content (e.g. wrapping elements in XML, or
empty columns in CSV).

Note that if the context for the current mapping is changed, there are a
couple of special keys available for the source column. For more
information see the description for the
[Context](/providence/user/export/mappings.html#options)
option in the table below.

## Element Values and General Notes on Specific Formats

The 4th column of the mapping sheet is named \'Element\'. This is a very
format-specific setting where you enter the name of the element you want
to put your field data in. See below for a description of the formats.

## XML Element Values

The XML format implementation allows valid XML element names as values
for the \"Element\" column. If you want to specify an XML attribute,
prefix the name with an @. The attribute will then be appended to the
hierarchy parent (which can\'t be another attribute). The mapping item
hierarchy pretty much represents the XML tree that will be constructed
from it.

Say you have the following very simple part of a mapping sheet and you
export a single object.

| Rule Type | ID | Parent ID  | Element  |Source  | Options
|----|----|----|----|----|----|
|Mapping|1||object|||
|Mapping|2|1|\@idno|ca_objects.idno||
|Mapping|3|1|title|ca_objects.preferred_labels||
  
What you end up with as export for a given objects is something like the
following:

``` none
<object idno="00001">
   <title>My very cool object</title>
</object>
```

## MARC Element Values

Let\'s start off by saying that MARC is a very old and very specific
format. Creating MARC mappings can be a bit painful. Make yourself
familiar with the format before you dive into the following description.

In MARC mappings, the Element value is either a control field or a data
field definition. For control field definitions, simply enter the field
code (like \'001\') here. For data field definitions, enter the field
code, followed by a forward slash and both indicator characters. For
details on valid field codes and indicators, please refer to the MARC
documentation. For empty/unused indicators, use the pound sign (#).
Valid examples are: 001 300/## 490/1#.

Mapping items with data field definitions also shouldn\'t have any
source definition or static data. The data resides in subfields, which
should be separate mapping items with a hierarchical relationship (via
Parent ID) to the field definition. For instance, you\'d define an item
for the data field \"300/##\". Suppose it had the ID 1. This field (like
every data field) has a couple of subfields \[1\], namely a through g
and 3, 6, 8 (leave out the \$ character from the original
documentation). Now create separate mapping items for each subfield you
need, pull in the CA data you want using the \'Source\' field in the
mapping sheet and fill in the Parent ID \"1\", the identifier of the
data field. Here\'s an example in table form (which may not make sense
from a MARC standpoint but we\'re only trying to explain the format
here, not the semantics of MARC fields):

|Rule Type |ID |Parent ID  |Element  |Source  |Options
|----|----|----|----|----|----|
|Mapping|1||1|ca_objects.idno||
|Mapping|2||300/##|||
|Mapping|3|2|b|ca_objects.preferred_labels||

An example export for a single object looks like this then. Note that we
selected the \'readable\' format for the MARC exporter, more info on
format-specific settings are below.

``` none
LDR
001     00001
300 ## _bMy very cool object
```

# Variables

This feature allows you, using all the available features of the
exporter, to assign a value to a user-defined identifier for later
usage. The value can be anything you can pull from the database. The
\"identifier\" should only contain alphanumeric text, dashes and
underscores. Otherwise the mapping spreadsheet will fail to load. For
example: type, my_variable, some-value, somethingCamelCase.

The identifier (essentially the name) that you assign to the variable
goes into the element column. Since variable don\'t end up in the
export, this column has no other use. Below is a simple example.

The main (and for the moment only) use for variables are conditional
mappings. Say you have two objects, a document and a photo. And say you
have an attribute \'secret_info\' that is valid for both object types
but that you only want to have in your export for photos. You could
build two different mappings for these cases or you could use a variable
to assign the object type to a user-defined identifier and then use the
skipIfExpression option for the mapping in question.

A good way to think of variables is that they are mappings that don\'t
end up in the actual export. They respect the current context, the
current place in the hierarchy, everything.

|Rule Type |ID |Parent ID  |Element  |Source  |Options
|----|----|----|----|----|----|
|Variable|||type |ca_objects.type_id||
|Mapping|1 ||object|||
|Mapping|2|1|\@idno|ca_objects.idno||
|Mapping|3|1|secret|ca_objects.top_secret|`{“skipIfExpression” : “^type!~/49/” }`|

We use the \"type\" variable in the skipIfExpression setting for the
top_secret mapping. For more info on this setting, see the setting
description below.

# Settings

These are configuration options that apply to the whole exporter
mapping.

|Setting |Description |Parameter notes  |Example 
|----|----|----|----|
|exporter_format|Sets the format used for this mapping.|Restricted list, at the moment ‘XML’, ‘MARC’ and ‘CSV’ are supported.|XML|
|code|Alphanumeric code of the mapping|Arbitrary, no special characters or spaces|my_mapping|
|name|Human readable name of the mapping|Arbitrary text|My mapping|
|table|Sets the table for the exported data|Corresponds to CollectiveAccess Basic Tables|ca_objects|
|wrap_before|If this exporter is used for an item set export (as opposed to a single item), the text set here will be inserted before the first item. This can for instance be used to wrap a repeating set of XML elements in a single global element. The text should be valid for the current exporter format.|Arbitrary string value|`<rdf:RDF xmlns:dc=”http://purl.org/dc/elements/1.1/” …>`|
|wrap_after|If this exporter is used for an item set export (as opposed to a single item), the text set here will be inserted after the last item. This can for instance be used to wrap a repeating set of XML elements in a single global element. The text has to be valid for the current exporter format.|Arbitrary string value|`</rdf:RDF>`|
|wrap_before_record|Same as wrap_before but only applies to single item/record exports.|Arbitrary string value|`<mySingleRecordWrap xml:id=”fooBar”>`|
|wrap_after_record|Same as wrap_after but only applies to single item/record exports.|Arbitrary string value|`</mySingleRecordWrap>`|
|typeRestrictions|If set, this mapping will only be available for these types. Multiple types are separated by commas or semicolons. Note that this doesn’t work very well for batch exports because search results or sets typically consist of records of multiple types. The exporter select dropdown always shows all exporters for that table, but when you actually run the export in batch mode, it will filter according to the restriction, which can get a little confusing when you look at the result.|comma- or semi-colon separated list of valid type codes for this table|image, document|
|MARC_outputFormat|MARC supports a couple of different output formats for the same kinds of mapping. Set the format you want to use here. Default is ‘readable’. See [2] for more details|readable’, ‘raw’ or ‘xml’. readable refers to the typical more or less human-readable table-like format used for MARC records. raw is used to write MARC binary files for data exchange. The 3rd option uses MARCXML as output format.|xml|


## Options

Each mapping item (i.e. a line in the mapping spreadsheet) can have its
own settings as well. To set these settings, you can fill out the 6th
column of the mapping sheet, called **Options**. The options must be
filled in in JavaScript Object Notation. If you set this value and it\'s
not formatted properly, the mapping loading tool will throw an error.
Here's a description of the available options:

|Setting |Description |Parameter notes  |Example 
|----|----|----|----|
|default|Value to use if data source value is blank|Arbitrary text|“No value”|
|delimiter|Delimiter to used to concatenate repeating values|Usually a single character like a comma or semi-colon||
|prefix|Text to prepend to value prior to export|Arbitrary text|Dimensions are:|
|suffix|Text to append to value prior to export|Arbitrary text|feet|
|template|Format exported value with provided template. Template may include caret (^) prefixed placeholders that refer to data source values.|See the [Bundle_Display_Templates] article for details on the syntax|^height|
|maxLength|Truncate to specified length if value exceeds that length|Integer|80|
|repeat_element_for_multiple_values|Some source values may select multiple values, for instance for repeatable metadata elements. If this is the case and this option is set, the current mapping item is repeated for each value instead of them being put into a single string using the delimiter option|1 or 0. defaults to 0|1|
|filterByRegExp|Allows filtering values by regular expression. Any value that matches this PCRE regular expression is filtered and not exported|Insert expression without delimiters. Has to be valid expression.|[A-Za-z0-9]+|
|locale|Locale code to use to get the field values from the database. If not set, the system/user default is used.|Valid locale code|de_DE|
|exportAllLocales|Include all defined values, regardless of locale, in export. By default only values for the current locale (user locale or specified in the `locale` option) are returned|Available from version 1.8||
|context|Used to switch the context for this mapping item (and all hierarchy children) to a different record (usually a set of records). A basic application of this feature is to create a kind of sub-export inside the mapping where you can pull in data from related items or hierarchical descendants. Once the context is switched, the ‘source’ values for this row and all children are relative to the new context, unless of course it is switched again (you can build cascades). This allows you, for instance, to list all works of the creator of a painting which you’re exporting. The context-switched mapping item is always repeated for each record selected by the context switch! See also the ‘restrictToTypes’, ‘restrictToRelationshipTypes’ and ‘checkAccess’ settings to further specify the Note that if the context is switched to a related table, there are a couple of special keys available for the ‘’’source’’’ column to fetch the type of the relationship between the item in the current context and the item where the context was last switched. These keys are: ‘’’relationship_type_id’’’, ‘’’relationship_type_code’’’ and ‘’’relationship_typename’’’.<br></br><br></br>It is also possible to switch context to an attribute of the current record. This helps properly process repeatable containers as encapsuled sub-exports. If the context is switched to a container like ca_entities.address, all elements of the container are available in the source column for all child mappings. They are addressed by only their code(e.g. “city”). No table prefix is required<br></br><br></br>As of version 1.8 you may pass context as a list of tables to shift context through, instead of a single table. This makes possible content multi-level context shifts. For example, to when exporting objects, to shift context to places related to entities related to the current object with relationship type = “artist” use `[“ca_entities”, {“restrictToRelationshipTypes”: [“artist”]}, “ca_places”, {}]`. Note that the list includes two sequential entries for the context switch: the context target and a associative array of settings for the context switch.|Either a related table name like ‘ca_entities’, a metadata element bundle specifier (ca_entities.address) or one of the literals ‘children’ or ‘parent’ for hierarchy traversal.|ca_entities|
|restrictToTypes|Restricts the context of the mapping to only records of the designated type. Only valid when context setting is set|list of valid type codes|“restrictToTypes”:[“photograph”, “other”, “mixed”, “text”]|
|restrictToRelationshipTypes|Restricts the context of the mapping to only records related with the designated relationship type. Only valid when context is set.|list of valid relationship type codes|“restrictToRelationshipTypes”:[“creator”, “depicts”]|
|restrictToList|When exporting related list items, this option restricts the context of the mapping to only list items of the designated list.|list of valid type codes|“restrictToList”:[“keywords”]|
|list|An alias for the option “restrictToList”|list of valid type codes|“list”:[“keywords”]|
|checkAccess|Restricts the context of the mapping to only records with one of the designated access values. Only valid when context is set.|List of valid ‘access’ values|“checkAccess”: [1, 2]|
|omitIfEmpty|Completely ignores this mapping if the selector doesn’t return any value. This is primarily meant for XML exports where you don’t want to end up with ugly empty XML elements like <relatedObjects></relatedObjects>. Note: This works differently from the Data Importer Option “skipIfEmpty”!|Valid bundle specifier|“omitIfEmpty”: “ca_objects.description”|
|omitIfNotEmpty|Omit this item and all its children if this CollectiveAccess bundle specifier returns a non-empty result. This is useful if you want to specify fallback-sections in your export mapping that are only used if certain data is not available.|Valid bundle specifier|“omitIfNotEmpty”: “ca_objects.description”|
|omitIfNoChildren|Omit this item if no child items will be contained within it. This option allows you to make the appearance of a container item contingent upon the existance of content within the container. NOTE: This option is available from version 1.8.|0 or 1|“omitIfNoChildren”: “1”|
|convertCodesToDisplayText|If set, id values refering to foreign keys are returned as preferred label text in the current locale.|0 or 1|“convertCodesToDisplayText”: 1|
|convertCodesToIdno|If set, id values refering to foreign keys are returned as idno. (Available from version 1.6.1)|0 or 1|“convertCodesToIdno”: 1|
|returnIdno|If set, idnos are returned for List attribute values instead of primary key values. Should not be combined with convertCodesToDisplayText, as it overrides it and can produce unwanted results. Only applies to List attribute values!|0 or 1|“returnIdno”: 1|
|skipIfExpression|If the expression yields true, skip the mapping for the data. Note that all user-set variables are available under their identifiers.|arbitrary text|`{“skipIfExpression” : “^foo!~/49/” }`|
|start_as_iso8601|start_as_iso8601|If you exporting a range of dates, and wish for the start and end dates to be split and exported to separate elements, use this setting to grab the “start” date.|`{ “start_as_iso8601” : 1 }`|
|end_as_iso8601|If you exporting a range of dates, and wish for the start and end dates to be split and exported to separate elements, use this setting to grab the “end” date.|0 or 1|`{“end_as_iso8601” : 1}`|
|timeOmit|By default, start_as_iso8601 and end_as_iso8601 will produced the timestamp as well as the date. To omit the time, use timeOmit.|0 or 1|`{“timeOmit”: 1}`|
|dontReturnValueIfOnSameDayAsStart|This setting will ensure that the end_as_iso8601 will be skipped on single dates (where there is no end date).|0 or 1|`{“dontReturnValueIfOnSameDayAsStart” : 1}`|
|sort|Sorts the values returned for a context switch on these fields. Only valid when context is set to a related table. Must always be a list.|List of valid field names for related table|“sort” : [ “ca_entities.preferred_labels.surname” ]|
|stripTags|Removes HTML and XML tags from output. (Available from version 1.8)|0 or 1|`{“stripTags”:1}`|
|deduplicate|Remove duplicate values for an exported list with multiple values. (Available from version 1.8)||`{“deduplicate”: 1}`|
|applyTransformations|Transform values prior to export. A list of transformations may be specified, and each will be applied in order to the output of its predecessor. Each list entry is an object with a “transform” name and the options required by the transform.<br></br><br></br>Available transforms: filesize = convert numeric filesizes (in bytes) to a scaled file size for display. Parameters are: “decimals” = number of decimal places to include in display value.<br></br><br></br>(Available from version 1.8)||`{“applyTransformations”: [ {“transform”: “filesize”, “decimals”: 4 } ] }`|



Below is a properly formatted example in JSON that uses some of these
options:

``` none
{
    "default" : "No value",
    "delimiter" : ";",
    "maxLength" : 80,
    "filterByRegExp" : "[A-Z]+"
}
```

## Processing Order

In some cases the order in which the options and replacements (see next
sub-section) are applied to each value can make a significant difference
so it\'s important to note it here:

1)  skipIfExpression (available for v1.5)
2)  filterByRegExp
3)  Replacements (see below)
    a)  If value is empty, respect \'default\' setting
    b)  If value is not empty, use prefix and suffix
4)  Truncate if result is longer than maxLength

## Replacements

A second sheet called **Replacements** exists in the exporter mapping
template. This can be used to assign replacements to each mapping item.
The first column references the ID you set in the 2nd column of the
mapping item table. The second column defines what is to be replaced.
This again should be a PCRE-compatible regular expression without
delimiters. The 3rd column defines what value should be inserted for the
matched values. These conditions are applied to each matching value in
the order they\'ve been defined, i.e. if you have multiple replacements
for the same mapping item, the incoming value is first passed through
the first replacement, the result of this action is then passed in to
the second replacement, and so on \...

:::note
**For advanced users and PHP programmers**: the values are passed
through preg_replace, the \'pattern\' being the 2nd column value (plus
delimiters) and the \'replacement\' being the value from the 3rd column.
This allows you to do pretty nifty stuff, for instance rewriting dates:
:::

Search column: (w+) (d+), (d+) Replace column: \$2 \$1 \$3 value: April
15, 2003 result: 15 April 2003

## Mapping Repetition

The *RepeatMappings* rule type allows you to repeat a set list of
mappings in a different context without actually defining them again.
This is, for instance, very useful when creating EAD exports of
hierarchical data where the basic structure is always the same (for
archdesc, c01, c02, etc.) but the context changes. It\'s basically a
shortcut that saves a lot of work in certain scenarios. Note that all
hierarchy children of the listed items are repeated as well.

If you create a RepeatMappings rule, the mapping loader expects a
comma-delimited list of references to the 2nd column in the Mapping
sheet. It also really only makes sense to create this type of rule if
you change the context in the same step. A simple example could look
like this:

|Rule Type |ID |Parent ID  |Element  |Source  |Options
|----|----|----|----|----|----|
|Mapping|1|	     | root|	|	|
|Mapping|2 |1	|label	|ca_objects.preferred_labels	|	|
|Mapping|3|1|idno|ca_objects.idno||
|Mapping|4|1|children|||
|RepeatMappings|----|4|child|2, 3|`{“context” : “children”}`|


In this case, the \'child\' element would be repeated for each hierarchy
child of the exported item because of the context switch and for each of
those children, the exporter would add the label and idno elements.

## Running an Export

The export can be executed through caUtils. To see all utilities ask for
help after cd-ing into support.

``` 
cd /path_to_Providence/support bin/caUtils help
```

To get further details about the load-export-mapping utility:

``` 
bin/caUtils help load-export-mapping
```

To load the mapping:

``` 
bin/caUtils load-export-mapping --file=~/my_export_mapping.xlsx
```

Next you'll be using the utility export-data. First, have a look at the
help for the command to get familiar with the available options.

``` 
bin/caUtils help export-data
```

Essentially there are 3 export modes:

### 1) Export a Single Record

Since the scope of a mapping is usually a single record, it\'s easy to
use a mapping to export a record by its identifier. Suppose you have a
ca_objects XML mapping with the code \'my_mapping\'. To use this to
export the ca_objects record with the primary key identifier (not the
custom idno!) 550 to a new file \~/export.xml, you\'d run this command:

``` 
bin/caUtils export-data -m my_mapping -i 550 -f ~/export.xml
```

### 2) Export a Set of Records Found by Custom Search Expression

In most real-world export projects you\'ll need to export a set of
records or even all your records into a single file. The exporter
utility allows this by letting you specify a search expression with the
-s parameter that selects the set of records used for export. The
records are simply exported sequentially in the order returned by the
search engine. This sequence is wrapped in the wrap_before and
wrap_after settings of the exporter, if set. If you want to export all
your records, simply search for \"\*\". This example exports all
publicly accessible files to a file \~/export.xml:

``` 
bin/caUtils export-data -m my_mapping -s "access:1" -f ~/export.xml
```

### 3) Export a Diverse Set of Records (\"RDF mode\")

:::note
For advanced users only
:::

The error handling in this portion of the code is very poor so you\'re
pretty much left on an island if something goes wrong.

Sometimes a limited export scope to for example ca_objects like in the
previous example is not enough to meet the target format requirements.
Occasionally you may want to build a kind of \'mixed\' export where
records from multiple database entities (objects, list items, places,
\...) are treated equally. We have found this requirement when trying to
use the exporter to generate an RDF graph, hence the name. The export
framework originally wasn\'t designed for this case but the caUtils
export-data command offers a way around that. The switch \--rdf enables
this so called \"RDF mode\". In this mode, you again use -f to specify
the output file and you have to provide an additional configuration file
(see Configuration_File_Syntax) which tells the exporter about the
records and corresponding mappings which will be used for this export.

Here is a minimal example that uses all the available features:

`wrap_before = ""` `wrap_after = ""`

``` none
nodes = {
   my_images = {
      mapping = object_mapping,
         restrictBySearch = "access:1",
         related = {
            concepts = {
               restrictToRelationshipTypes = [depicts],
               mapping = concept_mapping,
            },
            agents = {
               restrictToTypes = [person],
               mapping = agent_mapping,
            },
        }
    },
}
```

While processing this configuration, the exporter essentially builds one
big list of records and corresponding mappings to export. There are no
duplicates in this list, if object_id 23 is selected by two different
node type definitions or by multiple related definitions, it is still
only exported once, using the mapping provided by the first definition.

Here is an example of how to run an RDF mode export:

`bin/caUtils export-data --rdf -c ~/rdf_mode.conf ~/export.xml`

## RDF Mode Configuration File Options

| Setting | Description 
|----|----|
|wrap_before|Text to prepend before the export.|
|wrap_after|Text to append after the export.|
|nodes|List of primary node type definitions to be used for this export|

## Node Type Definition Options

| Setting | Description 
|----|----|
|mapping|Mapping to be used for this type of related item. Has to be an existing mapping code.|
|restrictbySearch|Restrict exported records using a search expression|
|related|List of related records also to be included in the global node set. You can use this for example to make sure you only export list_items that are actually actively used as vocabulary terms for objects, meaning you don’t have to create an extra node type (which would potentially export all list items in your database) for this.|


## \'Related\' Options

| Setting | Description
|----|----| 
|mapping|Mapping to be used for this type of related item. Has to be an existing mapping code.|
|restrictToRelationshipTypes|Restrict selected related records by relationship types. Has to be a list or empty.|
|restrictToTypes|Restrict selected related records by record types (e.g. entity type). Has to be a list or empty.|

## Miscellaneous Settings and Options

### Exporting values from Information Services (e.g Library of Congress, Getty)

If your CollectiveAccess configuration includes information services,
such as Library Of Congress Subject Headings or Getty\'s Art and
Architecture Thesaurus, you can export these in the exact same way as
you would export other kinds of metadata elements.

However, in order to comply with certain XML formats (like MODS of TEI)
you may find that you need to extract the terms\' URI and export these
to an attribute while exporting the label name to an element.

To grab an information service term\'s URI, you can simply append
\".uri\" or \".url\" to the Source.

For example, if your Getty AAT element happens to be called
\"ca_objects.aat\" and you wish to export the URI, simply express the
source as \"ca_objects.aat.uri\". This will give you the URI while the
simple \"ca_objects.aat\" will get you the label name as before.

LC services work a little differently. For these, you must append to the
source \".text\" to get the label name and \".id\" to get the URI.

For example:

`ca_objects.lcsh_terms.text` will get you the label name of all lcsh
terms on the record. `ca_objects.lcsh_terms.id` will get you the URI for
these terms.
