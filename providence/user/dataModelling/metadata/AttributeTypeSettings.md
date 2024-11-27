---
title: Attribute Types Settings
---


# Attribute settings: Containers

## Attribute settings: Containers

Unlike all other attribute types, containers do not represent data
values. Rather their sole function is to organize attributes into groups
for display. In a multi-attribute value set (for example an address with
separate attributes for street number, city, state, country and postal
code), there will be at least one container serving as the \"root\" (or
top) of the attribute hierarchy. Other containers may serve to further
group items in the multi-attribute set into sub-groups displayed on
separate lines of a form.

| Settings| Description | Default| Values
|----|----|----|----|
|doesNotTakeLocale|Defines whether element take locale specification.|0 (takes locale)|0 or 1|
|lineBreakAfterNumberOfElements|Number of metadata elements after which a line break should be inserted.|0 (no line breaks)|Integers zero or greater|
|canBeUsedInSearchForm|Use this option if the attribute value can be used in search forms.|1 (used in search forms)|0 or 1|
|canBeUsedInDisplay|Use this option if the attribute value can be used for display in search results.|1 (used for display)|0 or 1|
|displayTemplate|Layout for value when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: ^my_element_code.||Display_Templates|
|displayDelimiter|Delimiter to use between multiple values.|, (comma)|Text|
|readonlyTemplate|Layout used when a container value is in read-only mode. If this template is set, existing values are always displayed in read-only mode until you click to edit. This can be used to preserve screen space for large containers.<br></br><br></br>Element code tags prefixed with the ^ character, used to represent the value in the template. For example: ^ca_objects.my_notes. Each of these templates is evaluated relative to a specific value instance for this container, so other display template elements like `<unit>`, `<ifdef>` or `<more>` might not work exactly as expected. More general notes on display templates are here: Display_Templates||HTML|

## Attribute settings: Text

Accepts text values up to 4gb in length. Text may include HTML
formatting.

| Settings| Description | Default| Values
|----|----|----|----|
|minChars|The minimum number of characters to allow. Input shorter than required will be rejected.|0 (no minimum)|Integers zero or greater|
|maxChars|The maximum number of characters to allow. Input longer than required will be rejected.|65535|Integers greater than zero|
|regex|A Perl-format regular expression with which to validate the input. Input not matching the expression will be rejected. Do not include the leading and trailling delimiter characters (typically “/”) in your expression. Leave blank if you don’t want to use regular expression-based validation.||Expression-based validation value|
|fieldWidth|Width, in characters, of the field when displayed in a user interface.|40|Integers greater than zero|
|fieldHeight|Height, in characters, of the field when displayed in a user interface.|1|Integers greater than zero|
|usewysiwygeditor|Check this option if you want to use a word-processor like editor with this text field. If you expect users to enter rich text (italic, bold, underline) then you might want to enable this.|0 (not enabled)|0 or 1|
|default_text|Text to pre-populate a newly created attribute with||Text to pre-populate a newly created attribute with|
|suggestExistingValues|Use this option if you want the attribute to suggest previously saved values as text. This option is only effective if the display height of the text entry is equal to 1.|0 (does not suggest text)|0 or 1|
|suggestExistingValueSort|If suggestion of existing values is enabled this option determines how returned values are sorted. Choose valueto sort alphabetically. Choose most recently added to sort with most recently entered values first.|value|value or most recently added|
|doesNotTakeLocale|Defines whether element take locale specification|0 (takes locale)|0 or 1|
|canBeUsedInSort|Use this option if this attribute value can be used for sorting of search results.|1 (used in sort)|0 or 1|
|canBeUsedInSearchForm|Use this option if the attribute value can be used in search forms|1 (used in search forms)|0 or 1|
|canBeUsedInDisplay|Use this option if the attribute value can be used for display in search results|1 (used for display)|0 or 1|
|displayTemplate|Layout for value when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^my_element_code</i>.||HTML|
|displayDelimiter|Delimiter to use between multiple values|(comma)|Text|
|mustBeUnique|If this option is set, the system will prevent adding duplicate values for this metadata element. If a value already exists, it can’t be entered again. A warning will be placed next to the text field as data is entered and saving the record anyway will result in an error.|1|0 or 1|

## Attribute settings: DateRange

Accepts valid date/time expressions as described in [this page](https://camanual.whirl-i-gig.com/providence/user/dataModelling/metadata/dateTime).

| Settings| Description | Default| Values
|----|----|----|----|
|dateRangeBoundaries|The range of dates that are accepted. Input dates outside the range will be rejected. Leave blank if you do not require restrictions.||Accepted date/time expression|
|fieldWidth|Width, in characters, of the field when displayed in a user interface.|40|Integers greater than zero|
|useDatePicker|Use this option if you want a calendar-based date picker to be available for date entry.|0 (not enabled)|0 or 1|
|default_text|Value to pre-populate a newly created attribute with.||Accepted date/time expression|
|mustNotBeBlank|Use this option if this attribute value must be set to some value, if, in other words, it must not be blank.|	0 (can be blank)|0 or 1|
|isLifespan|Use this option if this attribute value represents a persons lifespan. Lifespans are displayed in a slightly different format in many languages than standard dates.|0 (not enabled)|0 or 1|
|suggestExistingValues|Use this option if you want the attribute to suggest previously saved values as text. This option is only effective if the display height of the text entry is equal to 1.|0 (does not suggest text)|0 or 1|
|suggestExistingValueSort|If suggestion of existing values is enabled this option determines how returned values are sorted. Choose value to sort alphabetically. Choose most recently added to sort with most recently entered values first.|value|value or most recently added|
|doesNotTakeLocale|Defines whether element take locale specification|1 (does not take locale specifications)|0 or 1|
|canBeUsedInSort|Use this option if this attribute value can be used for sorting of search results.|1 (used in sort)|0 or 1|
|canBeUsedInSearchForm|Use this option if the attribute value can be used in search forms|1 (used in search forms)|0 or 1|
|canBeUsedInDisplay|Use this option if the attribute value can be used for display in search results|1 (used for display)|0 or 1|
|displayTemplate|Layout for value when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^my_element_code</i>.||HTML|
|displayDelimiter|Delimiter to use between multiple valuesDelimiter to use between multiple values|, (comma)|Text|


## Attribute settings: List

Accepts values from lists. Can present lists of any size and structure,
from simple check lists and flat down-down lists to large, deeply nested
hierarchical lists.

| Settings| Description | Default| Values
|----|----|----|----|
|listWidth|Width, in characters or pixels, of the list when displayed in a user interface. When list is rendered as a hierarchy browser width must be in pixels.|40|Characters or pixels|
|listHeight|Height, in pixels, of the list when displayed in a user interface as a hierarchy browser.|200px|Pixels|
|maxColumns|Maximum number of columns to use when laying out radio buttons or checklist.|3|Integers greater than zero|
|render|Determines how the list is displayed visually.|Drop-down list (‘select’)|Drop-down menu (code=”select”) Yes/no checkbox (code=”yes_no_checkboxes”) Radio buttons (code=”radio_buttons”); Checklist (code=”checklist”) Type-ahead lookup (code=”lookup”) Horizontal hierarchy browser (code=”horiz_hierbrowser”) Horizontal hierarchy browser with search (code=”horiz_hierbrowser_with_search”) Vertical hierarchy browser (code=”vert_hierbrowser”)|
|doesNotTakeLocale|Defines whether element takes locale specification|1 (does not take locale specifications)|0 or 1|
|requireValue|Defines whether a list item must be explicitly set. If set to 1 then a valid list item must be selected, and in the absence of a selected value the default value is used. If set to zero then a “null” value (labeled “none” in the English locale) is added to the list and made default|1 (require value)|0 or 1|
|canBeUsedInSort|Use this option if this attribute value can be used for sorting of search results.|1 (used in sort)|0 or 1|
|canBeUsedInSearchForm|Use this option if the attribute value can be used in search forms|1 (used in search forms)|0 or 1|
|canBeUsedInDisplay|Use this option if the attribute value can be used for display in search results|1 (used for display)|0 or 1|
|displayTemplate|Layout for value when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: ^my_element_code.||HTML|
|displayDelimiter|Delimiter to use between multiple values|, (comma)|Text|

## Attribute settings: Geocode

Represents one or more coordinates (latitude/longitude pairs) indicating
the location of an item (collection object, geographic place, storage
location or whatever else you want to place on a map).

Coordinates can be entered as decimal latitude/longitude pairs (ex.
40.321,-74.55) or in degrees-minutes-seconds format (ex. 40 23\' 10N, 74
30\' 5W). Multiple latitude/longitude coordinates must be separated with
semicolons (\";\").
[UTM](https://en.wikipedia.org/wiki/Universal_Transverse_Mercator_coordinate_system)
format coordinates is supported.

Non-coordinate entries are converted to coordinates using the
OpenStreetMaps Geocoding service, which works well for most full and
partial addresses worldwide. To unambiguously distinguish coordinate
data from address data to be geocoded, it is strongly suggested that
coordinate lists be enclosed in square brackets (ex. \[40.321,-74.55;
41.321,-74.55;41.321,-75.55;40.321,-75.55;40.321,-74.55\].

## Adding rectified overlays

You can add layers that include rectified maps by creating serve-able
tiles using a tool such as [MapWarper](http://mapwarper.net) and the
Google/OSM URL it provides as an export option. The OSM URL will be in
the format `http://mapwarper.net/maps/tile/0001/z/x/y.png`. You will
need to change the x, y and z placeholders in `\$\{x\}`, `\$\{y\}` and `\$\{z\}`
respectively. The example OSM URL for CollectiveAccess would be
`http://mapwarper.net/maps/tile/3671/\$\{z\}/\$\{x\}/$\{y\}.png`. This URL
should be entered into the \"Tile Server URL\" option for the metadata
element. You should also provide a layer name describing the content of
the map. If you wish to allow users to toggle the layer on and off check
the \"Show layer switcher controls\" checkbox.

| Settings| Description | Default| Values
|----|----|----|----|
|minZoomLevel|Minimum allowable zoom level for map.|1|Between 0 and 18. Higher values indicate more magnification.|
|maxZoomLevel|Maximum allowable zoom level for map.|16|Between 0 and 18. Higher values indicate more magnification.|
|defaultZoomLevel|Default zoom level for map on load.||Between 0 and 18. Higher values indicate more magnification.|
|defaultLocation|Default center location for newly opened maps. Set as decimal latitude and longitude values, separated by a comma.||`<latitude>`,`<longitude>`. Ex. 41.07691323466811,-72.33962884166552|
|autoDropPin |Automatically drop a pin at the location of geo-searches.|0|0 or 1|
|pointsAreDirectional|Allow setting of directions for point locations.|0|0 or 1|
|fieldWidth|Width, in characters, of the field when displayed in a user interface.|70|Integers greater than zero|
|fieldHeight|Height, in characters, of the field when displayed in a user interface.Height, in characters, of the field when displayed in a user interface.|2|Integers greater than zero|
|mustNotBeBlank|Use this option if this attribute value must be set to some value, if, in other words, it must not be blank.|0 (can be blank)|0 or 1|
|doesNotTakeLocale|Defines whether element takes locale specification.|1 (does not take locale specifications)|0 or 1|
|canBeUsedInSort|Use this option if this attribute value can be used for sorting of search results.|0 (not used in sort)|0 or 1|
|canBeUsedInSearchForm|Use this option if the attribute value can be used in search forms.|1 (used in search forms)|0 or 1|
|canBeUsedInDisplay|Use this option if the attribute value can be used for display in search results.|1 (used for display)|0 or 1|
|displayTemplate|Layout for value when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^my_element_code</i>.||HTML|
|tileServerURL|OSM URL for tileserver to load custom tiles from, with placeholders for X, Y and Z values in the format `${x}`.| http://mapwarper.net/maps/tile/3671/${z}/${x}/${y}.png|URL with placeholders|
|tileLayerName|Display name for layer containing tiles loaded from tile server specified in the tile server URL setting.|1929 Street Atlas|Text|
|layerSwitcherControl|Include layer switching controls in the map interface.|1 (show controls)|0 or 1|

## Attribute settings: Url

Accepts properly formatted URL values.

| Settings| Description | Default| Values
|----|----|----|----|
|minChars |The minimum number of characters to allow. Input shorter than required will be rejected.|0 (no minimum)|Integers zero or greater|
|maxChars|The maximum number of characters to allow. Input longer than required will be rejected.|65535|Integers greater than zero|
|regex|A Perl-format regular expression with which to validate the input. Input not matching the expression will be rejected. Do not include the leading and trailling delimiter characters (typically “/”) in your expression. Leave blank if you don’t want to use regular expression-based validation.||Expression-based validation value|
|fieldWidth|Width, in characters, of the field when displayed in a user interface.|40|Integers greater than zero|
|fieldHeight|Height, in characters, of the field when displayed in a user interface.|1|Integers greater than zero|
|requireValue|Use this option if you want an error to be thrown if the URL is left blank.|0 (entry not required)|0 or 1|
|suggestExistingValues|Use this option if you want the attribute to suggest previously saved values as text. This option is only effective if the display height of the text entry is equal to 1.|0 (does not suggest text)|0 or 1|
|suggestExistingValueSort|If suggestion of existing values is enabled this option determines how returned values are sorted. Choosevalue to sort alphabetically. Choose most recently added to sort with most recently entered values first.|value|value or most recently added|
|doesNotTakeLocale|Defines whether element takes locale specification.|1 (does not take locale specifications)|0 or 1|
|canBeUsedInSort|Use this option if this attribute value can be used for sorting of search results.|1 (used in sort)|0 or 1|
|canBeUsedInSearchForm|Use this option if the attribute value can be used in search forms.|1 (used in search forms)|0 or 1|
|canBeUsedInDisplay|Use this option if the attribute value can be used for display in search results.|1 (used for display)|0 or 1|
|displayTemplate|Layout for value when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^my_element_code</i>.||HTML|
|displayDelimiter|Delimiter to use between multiple values.|, (comma)|Text|


## Attribute settings: Currency

Accepts currency values composed of a currency specifier followed by a
decimal number.

| Settings| Description | Default| Values
|----|----|----|----|
|minValue|The minimum value allowed. Input less than the required value will be rejected.|0 (no minimum)|Numeric|
|maxValue|The maximum value allowed. Input greater than the required value will be rejected.|0 (no maximum)|Numeric|
|fieldWidth|Width, in characters, of the field when displayed in a user interface.|40|Integers greater then zero|
|fieldHeight |Height, in characters, of the field when displayed in a user interface.|1|Integers greater then zero|
|doesNotTakeLocale|Defines whether element takes locale specification.|1 (does not take locale specifications)|0 or 1|
|canBeUsedInSort|Use this option if this attribute value can be used for sorting of search results.|1 (used in sort)|0 or 1|
|canBeUsedInSearchForm|Use this option if the attribute value can be used in search forms.|1 (used in search forms)|0 or 1|
|canBeUsedInDisplay|Use this option if the attribute value can be used for display in search results.|1 (used for display)|0 or 1|
|displayTemplate|Layout for value when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^my_element_code</i>.||HTML|
|displayDelimiter|Delimiter to use between multiple values.|, (comma)|Text|

## Attribute settings: Length

Accepts length measurements in metric, English and typographical points
units.

| Settings| Description | Default| Values
|----|----|----|----|
|fieldWidth|Width, in characters, of the field when displayed in a user interface.|40|Integers greater then zero|
|fieldHeight|Height, in characters, of the field when displayed in a user interface.|1|Integers greater then zero|
|requireValue|Use this option if you want an error to be thrown if this measurement is left blank.|0 (can be blank)|0 or 1|
|doesNotTakeLocale|Defines whether measurement takes locale specification.|1 (does not take locale specifications)|0 or 1|
|canBeUsedInSort|Use this option if this attribute value can be used for sorting of search results.|1 (used in sort)|0 or 1|
|canBeUsedInSearchForm |Use this option if the attribute value can be used in search forms.|1 (used in search forms)|0 or 1|
|canBeUsedInDisplay|Use this option if the attribute value can be used for display in search results.|1 (used for display)|0 or 1|
|displayTemplate|Layout for value when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^my_element_code</i>.||HTML|
|displayDelimiter|Delimiter to use between multiple values.|, (comma)|Text|

## Attribute settings: Weight

Accepts weight measurements in metric and English units.

| Settings| Description | Default| Values
|----|----|----|----|
|fieldWidth|Width, in characters, of the field when displayed in a user interface.|40|Integers greater then zero|
|fieldHeight|Height, in characters, of the field when displayed in a user interface.|1|Integers greater then zero|
|requireValue|Use this option if you want an error to be thrown if this measurement is left blank.|0 (can be blank)|0 or 1|
|doesNotTakeLocale|Defines whether measurement takes locale specification.|1 (does not take locale specifications)|0 or 1|
|canBeUsedInSort|Use this option if this attribute value can be used for sorting of search results.|1 (used in sort)|0 or 1|
|canBeUsedInSearchForm|Use this option if the attribute value can be used in search forms.|1 (used in search forms)|0 or 1|
|canBeUsedInDisplay |Use this option if the attribute value can be used for display in search results.|1 (used for display)|0 or 1|
|displayTemplate|Layout for value when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^my_element_code</i>.||HTML|
|displayDelimiter|Delimiter to use between multiple values.|, (comma)|Text|

## Attribute settings: TimeCode

Accepts time offsets in commonly used formats.

| Settings| Description | Default| Values
|----|----|----|----|
|fieldWidth |Width, in characters, of the field when displayed in a user interface.|40|Integers greater than zero|
|fieldHeight |Height, in characters, of the field when displayed in a user interface.|1|Integers greater than zero|
|requireValue|Use this option if you want an error to be thrown if this measurement is left blank.|0 (can be blank)|0 or 1|
|doesNotTakeLocale|Defines whether measurement takes locale specification.|1 (does not take locale specifications)|0 or 1|
|canBeUsedInSort|Use this option if this attribute value can be used for sorting of search results.|1 (used in sort)|0 or 1|
|canBeUsedInSearchForm|Use this option if the attribute value can be used in search forms.|1 (used in search forms)|0 or 1|
|canBeUsedInDisplay|Use this option if the attribute value can be used for display in search results.|1 (used for display)|0 or 1|
|displayTemplate|Layout for value when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^my_element_code</i>.||HTML|
|displayDelimiter|Delimiter to use between multiple values.|, (comma)|Text|

## Attribute settings: Integer

Accepts a properly formatted integer value.

| Settings| Description | Default| Values
|----|----|----|----|
|minChars|The minimum number of characters to allow. Input shorter than required will be rejected.|0 (no minimum)|Integers zero or greater|
|maxChars|The maximum number of characters to allow. Input longer than required will be rejected.|65535|Integers greater than zero|
|minValue|The minimum numeric value to allow. Values smaller than required will be rejected.||Numeric|
|maxValue|The maximum numeric value to allow. Values greater than required will be rejected.||Numeric|
|regex|A Perl-format regular expression with which to validate the input. Input not matching the expression will be rejected. Do not include the leading and trailing delimiter characters (typically “/”) in your expression. Leave blank if you don’t want to use regular expression-based validation.||Expression-based validation value|
|fieldWidth|Width, in characters, of the field when displayed in a user interface.|40|Integers greater than zero|
|fieldHeight |Height, in characters, of the field when displayed in a user interface.|1|Integers greater than zero|
|mustNotBeBlank |Use this option if you want an error to be thrown if the URL is left blank.|0 (entry not required)|0 or 1|
|doesNotTakeLocale|Defines whether element takes locale specification.|0 (takes locale specifications)|0 or 1|
|canBeUsedInSort|Use this option if this attribute value can be used for sorting of search results.|1 (used in sort)|0 or 1|
|canBeUsedInSearchForm|Use this option if the attribute value can be used in search forms.|1 (used in search forms)|0 or 1|
|canBeUsedInDisplay|Use this option if the attribute value can be used for display in search results.|1 (used for display)|0 or 1|
|displayTemplate|Layout for value when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^my_element_code</i>.||HTML|
|displayDelimiter|Delimiter to use between multiple values.|, (comma)|Text|

# Attribute settings: Numeric

Accepts numeric values and strings consisting of optional sign, any
number of digits, optional decimal part and optional exponential part.

| Settings| Description | Default| Values
|----|----|----|----|
|minChars |The minimum number of characters to allow. Input shorter than required will be rejected.|0 (no minimum)|Integers zero or greater|
|maxChars |The maximum number of characters to allow. Input longer than required will be rejected.|10|Integers greater than zero|
|minValue|The minimum numeric value to allow. Values smaller than required will be rejected.||Integers|
|maxValue|The maximum numeric value to allow. Values greater than required will be rejected.||Integers|
|regex|A Perl-format regular expression with which to validate the input. Input not matching the expression will be rejected. Do not include the leading and trailing delimiter characters (typically “/”) in your expression. Leave blank if you don’t want to use regular expression-based validation.||Expression-based validation value|
|fieldWidth|Width, in characters, of the field when displayed in a user interface.|40|Integers greater than zero|
|fieldHeight |Height, in characters, of the field when displayed in a user interface.|1|Integers greater than zero|
|mustNotBeBlank|Use this option if you want an error to be thrown if the URL is left blank.|0 (entry not required)|0 or 1|
|doesNotTakeLocale|Defines whether element takes locale specification.|0 (takes locale specifications)|0 or 1|
|canBeUsedInSort|Use this option if this attribute value can be used for sorting of search results.|1 (used in sort)|0 or 1|
|canBeUsedInSearchForm|Use this option if the attribute value can be used in search forms.|1 (used in search forms)|0 or 1|
|canBeUsedInDisplay|Use this option if the attribute value can be used for display in search results.|1 (used for display)|0 or 1|
|displayTemplate|Layout for value when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^my_element_code</i>.||HTML|
|displayDelimiter|Delimiter to use between multiple values.|, (comma)|Text|

## Attribute settings: LCSH

Accepts Library of Congress Subject Heading references.

| Settings| Description | Default| Values
|----|----|----|----|
|fieldWidth|Width, in characters, of the field when displayed in a user interface.|60|Integers greater than zero|
|fieldHeight|Height, in characters, of the field when displayed in a user interface.|1|Integers greater than zero|
|doesNotTakeLocale|Defines whether element takes locale specification.|1 (does not take locale specifications)|0 or 1|
|canBeUsedInSort|Use this option if this attribute value can be used for sorting of search results.|0 (not used in sort)|0 or 1|
|canBeUsedInSearchForm |Use this option if the attribute value can be used in search forms.|1 (used in search forms)|0 or 1|
|canBeUsedInDisplay|Use this option if the attribute value can be used for display in search results.|1 (used for display)|0 or 1|
|displayTemplate|Layout for value when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^my_element_code</i>.||HTML|
|displayDelimiter|Delimiter to use between multiple values.|, (comma)|Text|
|vocabulary|Selects which vocabulary will be searched.||All vocabularies’ => ;’LC Subject Headings’ => ‘cs:http://id.loc.gov/authorities/subjects’; ‘LC Name Authority File’ => ‘cs:http://id.loc.gov/authorities/names’; ‘LC Subject Headings for Children’ => ‘cs:http://id.loc.gov/authorities/childrensSubjects’; ‘LC Genre/Forms File’ => ‘cs:http://id.loc.gov/authorities/genreForms’; ‘Thesaurus of Graphic Materials’ => ‘cs:http://id.loc.gov/vocabulary/graphicMaterials’; ‘Preservation Events’ => ‘cs:http://id.loc.gov/vocabulary/preservationEvents’; ‘Preservation Level Role’ => ‘cs:http://id.loc.gov/vocabulary/preservationLevelRole’; ‘Cryptographic Hash Functions’ => ‘cs:http://id.loc.gov/vocabulary/cryptographicHashFunctions’; ‘MARC Relators’ => ‘cs:http://id.loc.gov/vocabulary/relators’; ‘MARC Countries’ => ‘cs:http://id.loc.gov/vocabulary/countries’; ‘MARC Geographic Areas’ => ‘cs:http://id.loc.gov/vocabulary/geographicAreas’; ‘MARC Languages’ => ‘cs:http://id.loc.gov/vocabulary/languages’; ‘ISO639-1 Languages’ => ‘cs:http://id.loc.gov/vocabulary/iso639-1’; ‘ISO639-2 Languages’ => ‘cs:http://id.loc.gov/vocabulary/iso639-2’; ‘ISO639-5 Languages’ => ‘cs:http://id.loc.gov/vocabulary/iso639-5’;|


## Attribute settings: GeoNames

Accepts references to Geonames.org entries for locations.

| Settings| Description | Default| Values
|----|----|----|----|
|fieldWidth|Width, in characters, of the field when displayed in a user interface.|60|Integers greater than zero|
|fieldHeight|Height, in characters, of the field when displayed in a user interface.|1|Integers greater than zero|
| mustNotBeBlank|Use this option if this attribute value must be set to some value, if, in other words, it must not be blank.|0 (can be blank)|0 or 1|
|doesNotTakeLocale|Defines whether element takes locale specification.|1 (does not take locale specifications)|0 or 1|
|canBeEmpty|Use this option if you want to allow empty attribute values. This – of course – only makes sense if you bundle several elements in a container.|0|0 or 1|
|canBeUsedInSort|Use this option if this attribute value can be used for sorting of search results.|0 (not used in sort)|0 or 1|
|canBeUsedInSearchForm |Use this option if the attribute value can be used in search forms.|1 (used in search forms)|0 or 1|
|canBeUsedInDisplay|Use this option if the attribute value can be used for display in search results.|1 (used for display)|0 or 1|
| displayTemplate   |Layout for value when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^my_element_code</i>.||HTML|
|displayDelimiter|Delimiter to use between multiple values.|, (comma)|Text|

## Attribute settings: File

Accepts uploads of files of any type. Files are stored as binary data
and returned as-is. No parsing or thumbnail generation is performed.

| Settings| Description | Default| Values
|----|----|----|----|
|doesNotTakeLocale|Defines whether element takes locale specification.|1 (does not take locale specifications)|0 or 1|
|canBeUsedInDisplay|Use this option if the attribute value can be used for display in search results.|1 (used for display)|0 or 1|
|displayTemplate|Layout for value when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^my_element_code</i>.||HTML|
|displayDelimiter|Delimiter to use between multiple values.|, (comma)|Text|

## Attribute settings: Media

Accepts uploads of media (image, sound video) files. Only types
supported by CollectiveAccess and configured in media_processing.conf
are accepted. Generation of previews is performed.

| Settings| Description | Default| Values
|----|----|----|----|
|doesNotTakeLocale|Defines whether element takes locale specification.|1 (does not take locale specifications)|0 or 1|
|canBeUsedInDisplay|Use this option if the attribute value can be used for display in search results.|1 (used for display)|0 or 1|
|displayTemplate|Layout for value when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^my_element_code</i>.||HTML|
|displayDelimiter|Delimiter to use between multiple values.|, (comma)|Text|

## Attribute settings: InformationService

Accepts values defined by an external information service.
CollectiveAccess includes plugins for various external information
services, including the Getty AAT, TGN and ULAN, Nomisma, Encylopedia of
Life, GlobalNames and more. Generic SparQL endpoints are also supported.

| Settings| Description | Default| Values
|----|----|----|----|
|requireValue|Require that an entity be set. If option is not set then blank values are allowed. Devault is to require values.|1|0 or 1|
|allowDuplicateValues|Allow duplicate values to be set when element is not in a container and is repeating. Default is to not allow duplicate values.Allow duplicate values to be set when element is not in a container and is repeating. Default is to not allow duplicate values.|0|0 or 1|
|raiseErrorOnDuplicateValue|Show an error message when value is duplicate and <em>allow duplicate values</em> is not set. Default is to not show an error message and discard the duplicate value silently.|0|0 or 1|
|fieldWidth|Width, in characters or pixels, of the field when displayed in a user interface. Pixel values must be followed by the suffix “px”|60|Integers greater then zero, with or without a “px” suffix. Ex. “10”, “100px|
|doesNotTakeLocale|Disable locale specification for values. By default values will not take locale specifications. If set to 0 a locale selector will be displayed alongside each value in a user interface.|1|0 or 1|
|singleValuePerLocale|Restrict entry to a single value per-locale. By default any number of values may be set for a locale. If set only one values per locale may be defined.|0|0 or 1|
|canBeUsedInSort|Allow values to be used for sorting of search results. By default values are available for sorts.|1|0 or 1|
|canBeUsedInSearchForm|Allow values to be used in search forms. By default values are available for use in search forms.|1|0 or 1|
|canBeUsedInDisplay|Allow values to be included in displays. By default values are available for inclusion in displays.|1|0 or 1|
|canMakePDF|Allow PDF to be generated for values. By default PDFs are not generated. If set options to generate PDFs for the values will be present in a user interface.|0|0 or 1|
|canMakePDFForValue|Allow PDF to be generated for individual values. By default PDFs are not generated. If set options to generate PDFs for individual values will be present in a user interface.|0|0 or 1|
|displayTemplate|Layout for values when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^ca_entities.lifesdates</i>. If omitted the system default template will be used.|System default|HTML|
|displayDelimiter|Delimiter to use between multiple values.|, (comma)|Text|
|restrictToTypes|Restricts display to items of the specified type(s). Omit for no restriction.||Entity type code; repeat for multiple types.|

## Attribute settings: ObjectRepresentations

Accepts references to object representation records defined in the
system.


## Attribute settings: Entities

Accepts references to entity records defined in the system.

| Settings| Description | Default| Values
|----|----|----|----|
|requireValue|Require that an entity be set. If option is not set then blank values are allowed. Devault is to require values.|1|0 or 1|
|allowDuplicateValues|Allow duplicate values to be set when element is not in a container and is repeating. Default is to not allow duplicate values.|0|0 or 1|
|raiseErrorOnDuplicateValue|Show an error message when value is duplicate and <em>allow duplicate values</em> is not set. Default is to not show an error message and discard the duplicate value silently.|0|0 or 1|
|fieldWidth|Width, in characters or pixels, of the field when displayed in a user interface. Pixel values must be followed by the suffix “px”|60|Integers greater then zero, with or without a “px” suffix. Ex. “10”, “100px”|
|doesNotTakeLocale|Disable locale specification for values. By default values will not take locale specifications. If set to 0 a locale selector will be displayed alongside each value in a user interface.|1|0 or 1|
|singleValuePerLocale|Restrict entry to a single value per-locale. By default any number of values may be set for a locale. If set only one values per locale may be defined.|0|0 or 1|
|canBeUsedInSort |Allow values to be used for sorting of search results. By default values are available for sorts.|1|0 or 1|
|canBeUsedInSearchForm|Allow values to be used in search forms. By default values are available for use in search forms.|1|0 or 1|
|canBeUsedInDisplay|Allow values to be included in displays. By default values are available for inclusion in displays.|1|0 or 1|
|canMakePDF|Allow PDF to be generated for values. By default PDFs are not generated. If set options to generate PDFs for the values will be present in a user interface.|0|0 or 1|
|canMakePDFForValue|Allow PDF to be generated for individual values. By default PDFs are not generated. If set options to generate PDFs for individual values will be present in a user interface.|0|0 or 1|
|displayTemplate|Layout for values when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^ca_entities.lifesdates</i>. If omitted the system default template will be used.|System default|HTML|
|displayDelimiter|Delimiter to use between multiple values.|, (comma)|Text|
|restrictToTypes|Restricts display to items of the specified type(s). Omit for no restriction.||Entity type code; repeat for multiple types.|

## Attribute settings: Places

Accepts references to place records defined in the system.

| Settings| Description | Default| Values
|----|----|----|----|
|requireValue |Require that an entity be set. If option is not set then blank values are allowed. Devault is to require values.|1|0 or 1|
|allowDuplicateValues|Allow duplicate values to be set when element is not in a container and is repeating. Default is to not allow duplicate values.|0|0 or 1|
|raiseErrorOnDuplicateValue|Show an error message when value is duplicate and <em>allow duplicate values</em> is not set. Default is to not show an error message and discard the duplicate value silently.|0|0 or 1|
|fieldWidth|Width, in characters or pixels, of the field when displayed in a user interface. Pixel values must be followed by the suffix “px”|60|Integers greater then zero, with or without a “px” suffix. Ex. “10”, “100px”|
|doesNotTakeLocale|Disable locale specification for values. By default values will not take locale specifications. If set to 0 a locale selector will be displayed alongside each value in a user interface.|1|0 or 1|
|singleValuePerLocale|Restrict entry to a single value per-locale. By default any number of values may be set for a locale. If set only one values per locale may be defined.|0|0 or 1|
|canBeUsedInSort|Allow values to be used for sorting of search results. By default values are available for sorts.|1|0 or 1|
|canBeUsedInSearchForm|Allow values to be used in search forms. By default values are available for use in search forms.|1|0 or 1|
|canBeUsedInDisplay|Allow values to be included in displays. By default values are available for inclusion in displays.|1|0 or 1|
|canMakePDF|Allow PDF to be generated for values. By default PDFs are not generated. If set options to generate PDFs for the values will be present in a user interface.|0|0 or 1|
|canMakePDFForValue|Allow PDF to be generated for individual values. By default PDFs are not generated. If set options to generate PDFs for individual values will be present in a user interface.|0|0 or 1|
|displayTemplate|Layout for values when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^ca_entities.lifesdates</i>. If omitted the system default template will be used.|System default|HTML|
|displayDelimiter|Delimiter to use between multiple values.|, (comma)|Text|
|restrictToTypes|Restricts display to items of the specified type(s). Omit for no restriction.||Entity type code; repeat for multiple types.|

## Attribute settings: Occurrences

Accepts references to occurrence records defined in the system.

| Settings| Description | Default| Values
|----|----|----|----|
|requireValue|Require that an entity be set. If option is not set then blank values are allowed. Devault is to require values.|1|0 or 1|
|allowDuplicateValues|Allow duplicate values to be set when element is not in a container and is repeating. Default is to not allow duplicate values.|0|0 or 1|
|raiseErrorOnDuplicateValue |Show an error message when value is duplicate and <em>allow duplicate values</em> is not set. Default is to not show an error message and discard the duplicate value silently.|0|0 or 1|
|fieldWidth|Width, in characters or pixels, of the field when displayed in a user interface. Pixel values must be followed by the suffix “px”|60|Integers greater then zero, with or without a “px” suffix. Ex. “10”, “100px”|
|doesNotTakeLocale|Disable locale specification for values. By default values will not take locale specifications. If set to 0 a locale selector will be displayed alongside each value in a user interface.|1|0 or 1|
|singleValuePerLocale|Restrict entry to a single value per-locale. By default any number of values may be set for a locale. If set only one values per locale may be defined.|0|0 or 1|
|canBeUsedInSort |Allow values to be used for sorting of search results. By default values are available for sorts.|1|0 or 1|
|canBeUsedInSearchForm|Allow values to be used in search forms. By default values are available for use in search forms.|1|0 or 1|
|canBeUsedInDisplay|Allow values to be included in displays. By default values are available for inclusion in displays.|1|0 or 1|
|canMakePDF |Allow PDF to be generated for values. By default PDFs are not generated. If set options to generate PDFs for the values will be present in a user interface.|0|0 or 1|
|canMakePDFForValue|Allow PDF to be generated for individual values. By default PDFs are not generated. If set options to generate PDFs for individual values will be present in a user interface.|0|0 or 1|
|displayTemplate|Layout for values when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^ca_entities.lifesdates</i>. If omitted the system default template will be used.|System default|HTML|
|displayDelimiter|Delimiter to use between multiple values.| , (comma)|Text|
|restrictToTypes|Restricts display to items of the specified type(s). Omit for no restriction.||Entity type code; repeat for multiple types.|

## Attribute settings: Collections

Accepts references to collection records defined in the system.

| Settings| Description | Default| Values
|----|----|----|----|
|requireValue |Require that an entity be set. If option is not set then blank values are allowed. Devault is to require values.|1|0 or 1|
|allowDuplicateValues|Allow duplicate values to be set when element is not in a container and is repeating. Default is to not allow duplicate values.|0|0 or 1|
|raiseErrorOnDuplicateValue|Show an error message when value is duplicate and <em>allow duplicate values</em> is not set. Default is to not show an error message and discard the duplicate value silently.|0|0 or 1|
|fieldWidth|Width, in characters or pixels, of the field when displayed in a user interface. Pixel values must be followed by the suffix “px”|60|Integers greater then zero, with or without a “px” suffix. Ex. “10”, “100px”|
|doesNotTakeLocale|Disable locale specification for values. By default values will not take locale specifications. If set to 0 a locale selector will be displayed alongside each value in a user interface.|1|0 or 1|
|singleValuePerLocale|Restrict entry to a single value per-locale. By default any number of values may be set for a locale. If set only one values per locale may be defined.|0|0 or 1|
|canBeUsedInSort |Allow values to be used for sorting of search results. By default values are available for sorts.|1|0 or 1|
|canBeUsedInSearchForm |Allow values to be used in search forms. By default values are available for use in search forms.|1|0 or 1|
|canBeUsedInDisplay|Allow values to be included in displays. By default values are available for inclusion in displays.|1|0 or 1|
|canMakePDF|Allow PDF to be generated for values. By default PDFs are not generated. If set options to generate PDFs for the values will be present in a user interface.|0|0 or 1|
|canMakePDFForValue|Allow PDF to be generated for individual values. By default PDFs are not generated. If set options to generate PDFs for individual values will be present in a user interface.|0|0 or 1|
|displayTemplate|Layout for values when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^ca_entities.lifesdates</i>. If omitted the system default template will be used.|System default|HTML|
|displayDelimiter|Delimiter to use between multiple values.| , (comma)|Text|
|restrictToTypes|Restricts display to items of the specified type(s). Omit for no restriction.||Entity type code; repeat for multiple types.|

## Attribute settings: StorageLocations

Accepts references to storage location records defined in the system.

| Settings| Description | Default| Values
|----|----|----|----|
|requireValue |Require that an entity be set. If option is not set then blank values are allowed. Devault is to require values.|1|0 or 1|
|allowDuplicateValues|Allow duplicate values to be set when element is not in a container and is repeating. Default is to not allow duplicate values.|0|0 or 1|
|raiseErrorOnDuplicateValue|Show an error message when value is duplicate and <em>allow duplicate values</em> is not set. Default is to not show an error message and discard the duplicate value silently.|0|0 or 1|
|fieldWidth|Width, in characters or pixels, of the field when displayed in a user interface. Pixel values must be followed by the suffix “px”|60|Integers greater then zero, with or without a “px” suffix. Ex. “10”, “100px”|
|doesNotTakeLocale|Disable locale specification for values. By default values will not take locale specifications. If set to 0 a locale selector will be displayed alongside each value in a user interface.|1|0 or 1|
|singleValuePerLocale|Restrict entry to a single value per-locale. By default any number of values may be set for a locale. If set only one values per locale may be defined.|0|0 or 1|
|canBeUsedInSort |Allow values to be used for sorting of search results. By default values are available for sorts.|1|0 or 1|
|canBeUsedInSearchForm |Allow values to be used in search forms. By default values are available for use in search forms.|1|0 or 1|
|canBeUsedInDisplay|Allow values to be included in displays. By default values are available for inclusion in displays.|1|0 or 1|
|canMakePDF|Allow PDF to be generated for values. By default PDFs are not generated. If set options to generate PDFs for the values will be present in a user interface.|0|0 or 1|
|canMakePDFForValue|Allow PDF to be generated for individual values. By default PDFs are not generated. If set options to generate PDFs for individual values will be present in a user interface.|0|0 or 1|
|displayTemplate|Layout for values when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^ca_entities.lifesdates</i>. If omitted the system default template will be used.|System default|HTML|
|displayDelimiter|Delimiter to use between multiple values.| , (comma)|Text|
|restrictToTypes|Restricts display to items of the specified type(s). Omit for no restriction.||Entity type code; repeat for multiple types.|


## Attribute settings: Loans

Accepts references to loan records defined in the system.

| Settings| Description | Default| Values
|----|----|----|----|
|requireValue |Require that an entity be set. If option is not set then blank values are allowed. Devault is to require values.|1|0 or 1|
|allowDuplicateValues|Allow duplicate values to be set when element is not in a container and is repeating. Default is to not allow duplicate values.|0|0 or 1|
|raiseErrorOnDuplicateValue|Show an error message when value is duplicate and <em>allow duplicate values</em> is not set. Default is to not show an error message and discard the duplicate value silently.|0|0 or 1|
|fieldWidth|Width, in characters or pixels, of the field when displayed in a user interface. Pixel values must be followed by the suffix “px”|60|Integers greater then zero, with or without a “px” suffix. Ex. “10”, “100px”|
|doesNotTakeLocale|Disable locale specification for values. By default values will not take locale specifications. If set to 0 a locale selector will be displayed alongside each value in a user interface.|1|0 or 1|
|singleValuePerLocale|Restrict entry to a single value per-locale. By default any number of values may be set for a locale. If set only one values per locale may be defined.|0|0 or 1|
|canBeUsedInSort |Allow values to be used for sorting of search results. By default values are available for sorts.|1|0 or 1|
|canBeUsedInSearchForm |Allow values to be used in search forms. By default values are available for use in search forms.|1|0 or 1|
|canBeUsedInDisplay|Allow values to be included in displays. By default values are available for inclusion in displays.|1|0 or 1|
|canMakePDF|Allow PDF to be generated for values. By default PDFs are not generated. If set options to generate PDFs for the values will be present in a user interface.|0|0 or 1|
|canMakePDFForValue|Allow PDF to be generated for individual values. By default PDFs are not generated. If set options to generate PDFs for individual values will be present in a user interface.|0|0 or 1|
|displayTemplate|Layout for values when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^ca_entities.lifesdates</i>. If omitted the system default template will be used.|System default|HTML|
|displayDelimiter|Delimiter to use between multiple values.| , (comma)|Text|
|restrictToTypes|Restricts display to items of the specified type(s). Omit for no restriction.||Entity type code; repeat for multiple types.|


## Attribute settings: Movements

Accepts references to movement records defined in the system.

| Settings| Description | Default| Values
|----|----|----|----|
|requireValue |Require that an entity be set. If option is not set then blank values are allowed. Devault is to require values.|1|0 or 1|
|allowDuplicateValues|Allow duplicate values to be set when element is not in a container and is repeating. Default is to not allow duplicate values.|0|0 or 1|
|raiseErrorOnDuplicateValue|Show an error message when value is duplicate and <em>allow duplicate values</em> is not set. Default is to not show an error message and discard the duplicate value silently.|0|0 or 1|
|fieldWidth|Width, in characters or pixels, of the field when displayed in a user interface. Pixel values must be followed by the suffix “px”|60|Integers greater then zero, with or without a “px” suffix. Ex. “10”, “100px”|
|doesNotTakeLocale|Disable locale specification for values. By default values will not take locale specifications. If set to 0 a locale selector will be displayed alongside each value in a user interface.|1|0 or 1|
|singleValuePerLocale|Restrict entry to a single value per-locale. By default any number of values may be set for a locale. If set only one values per locale may be defined.|0|0 or 1|
|canBeUsedInSort |Allow values to be used for sorting of search results. By default values are available for sorts.|1|0 or 1|
|canBeUsedInSearchForm |Allow values to be used in search forms. By default values are available for use in search forms.|1|0 or 1|
|canBeUsedInDisplay|Allow values to be included in displays. By default values are available for inclusion in displays.|1|0 or 1|
|canMakePDF|Allow PDF to be generated for values. By default PDFs are not generated. If set options to generate PDFs for the values will be present in a user interface.|0|0 or 1|
|canMakePDFForValue|Allow PDF to be generated for individual values. By default PDFs are not generated. If set options to generate PDFs for individual values will be present in a user interface.|0|0 or 1|
|displayTemplate|Layout for values when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^ca_entities.lifesdates</i>. If omitted the system default template will be used.|System default|HTML|
|displayDelimiter|Delimiter to use between multiple values.| , (comma)|Text|
|restrictToTypes|Restricts display to items of the specified type(s). Omit for no restriction.||Entity type code; repeat for multiple types.|


## Attribute settings: Objects

Accepts references to object records defined in the system.

| Settings| Description | Default| Values
|----|----|----|----|
|requireValue |Require that an entity be set. If option is not set then blank values are allowed. Devault is to require values.|1|0 or 1|
|allowDuplicateValues|Allow duplicate values to be set when element is not in a container and is repeating. Default is to not allow duplicate values.|0|0 or 1|
|raiseErrorOnDuplicateValue|Show an error message when value is duplicate and <em>allow duplicate values</em> is not set. Default is to not show an error message and discard the duplicate value silently.|0|0 or 1|
|fieldWidth|Width, in characters or pixels, of the field when displayed in a user interface. Pixel values must be followed by the suffix “px”|60|Integers greater then zero, with or without a “px” suffix. Ex. “10”, “100px”|
|doesNotTakeLocale|Disable locale specification for values. By default values will not take locale specifications. If set to 0 a locale selector will be displayed alongside each value in a user interface.|1|0 or 1|
|singleValuePerLocale|Restrict entry to a single value per-locale. By default any number of values may be set for a locale. If set only one values per locale may be defined.|0|0 or 1|
|canBeUsedInSort |Allow values to be used for sorting of search results. By default values are available for sorts.|1|0 or 1|
|canBeUsedInSearchForm |Allow values to be used in search forms. By default values are available for use in search forms.|1|0 or 1|
|canBeUsedInDisplay|Allow values to be included in displays. By default values are available for inclusion in displays.|1|0 or 1|
|canMakePDF|Allow PDF to be generated for values. By default PDFs are not generated. If set options to generate PDFs for the values will be present in a user interface.|0|0 or 1|
|canMakePDFForValue|Allow PDF to be generated for individual values. By default PDFs are not generated. If set options to generate PDFs for individual values will be present in a user interface.|0|0 or 1|
|displayTemplate|Layout for values when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^ca_entities.lifesdates</i>. If omitted the system default template will be used.|System default|HTML|
|displayDelimiter|Delimiter to use between multiple values.| , (comma)|Text|
|restrictToTypes|Restricts display to items of the specified type(s). Omit for no restriction.||Entity type code; repeat for multiple types.|


## Attribute settings: ObjectLots

Accepts references to object lot records defined in the system.

| Settings| Description | Default| Values
|----|----|----|----|
|requireValue |Require that an entity be set. If option is not set then blank values are allowed. Devault is to require values.|1|0 or 1|
|allowDuplicateValues|Allow duplicate values to be set when element is not in a container and is repeating. Default is to not allow duplicate values.|0|0 or 1|
|raiseErrorOnDuplicateValue|Show an error message when value is duplicate and <em>allow duplicate values</em> is not set. Default is to not show an error message and discard the duplicate value silently.|0|0 or 1|
|fieldWidth|Width, in characters or pixels, of the field when displayed in a user interface. Pixel values must be followed by the suffix “px”|60|Integers greater then zero, with or without a “px” suffix. Ex. “10”, “100px”|
|doesNotTakeLocale|Disable locale specification for values. By default values will not take locale specifications. If set to 0 a locale selector will be displayed alongside each value in a user interface.|1|0 or 1|
|singleValuePerLocale|Restrict entry to a single value per-locale. By default any number of values may be set for a locale. If set only one values per locale may be defined.|0|0 or 1|
|canBeUsedInSort |Allow values to be used for sorting of search results. By default values are available for sorts.|1|0 or 1|
|canBeUsedInSearchForm |Allow values to be used in search forms. By default values are available for use in search forms.|1|0 or 1|
|canBeUsedInDisplay|Allow values to be included in displays. By default values are available for inclusion in displays.|1|0 or 1|
|canMakePDF|Allow PDF to be generated for values. By default PDFs are not generated. If set options to generate PDFs for the values will be present in a user interface.|0|0 or 1|
|canMakePDFForValue|Allow PDF to be generated for individual values. By default PDFs are not generated. If set options to generate PDFs for individual values will be present in a user interface.|0|0 or 1|
|displayTemplate|Layout for values when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^ca_entities.lifesdates</i>. If omitted the system default template will be used.|System default|HTML|
|displayDelimiter|Delimiter to use between multiple values.| , (comma)|Text|
|restrictToTypes|Restricts display to items of the specified type(s). Omit for no restriction.||Entity type code; repeat for multiple types.|

## Attribute settings: FloorPlan

Accepts floor plan locations defined against a graphic attached to a
place record. This allows objects related to locations within a building
defined in the place hierarchy to be shown overlayed upon an uploaded
floorplan graphic. Typically used for documentation of artwork in
exhibitions.

| Settings| Description | Default| Values
|----|----|----|----|
|requireValue |Require that an entity be set. If option is not set then blank values are allowed. Devault is to require values.|1|0 or 1|
|allowDuplicateValues|Allow duplicate values to be set when element is not in a container and is repeating. Default is to not allow duplicate values.|0|0 or 1|
|raiseErrorOnDuplicateValue|Show an error message when value is duplicate and <em>allow duplicate values</em> is not set. Default is to not show an error message and discard the duplicate value silently.|0|0 or 1|
|fieldWidth|Width, in characters or pixels, of the field when displayed in a user interface. Pixel values must be followed by the suffix “px”|60|Integers greater then zero, with or without a “px” suffix. Ex. “10”, “100px”|
|doesNotTakeLocale|Disable locale specification for values. By default values will not take locale specifications. If set to 0 a locale selector will be displayed alongside each value in a user interface.|1|0 or 1|
|singleValuePerLocale|Restrict entry to a single value per-locale. By default any number of values may be set for a locale. If set only one values per locale may be defined.|0|0 or 1|
|canBeUsedInSort |Allow values to be used for sorting of search results. By default values are available for sorts.|1|0 or 1|
|canBeUsedInSearchForm |Allow values to be used in search forms. By default values are available for use in search forms.|1|0 or 1|
|canBeUsedInDisplay|Allow values to be included in displays. By default values are available for inclusion in displays.|1|0 or 1|
|canMakePDF|Allow PDF to be generated for values. By default PDFs are not generated. If set options to generate PDFs for the values will be present in a user interface.|0|0 or 1|
|canMakePDFForValue|Allow PDF to be generated for individual values. By default PDFs are not generated. If set options to generate PDFs for individual values will be present in a user interface.|0|0 or 1|
|displayTemplate|Layout for values when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^ca_entities.lifesdates</i>. If omitted the system default template will be used.|System default|HTML|
|displayDelimiter|Delimiter to use between multiple values.| , (comma)|Text|
|restrictToTypes|Restricts display to items of the specified type(s). Omit for no restriction.||Entity type code; repeat for multiple types.|

## Attribute settings: Color

Accepts color values. Values are stored internally as RGB hex color
values.

| Settings| Description | Default| Values
|----|----|----|----|
|fieldWidth|Width, in characters, of the field when displayed in a user interface.|40|Integers greater then zero|
|fieldHeight|Height, in characters, of the field when displayed in a user interface.|1|Integers greater then zero|
|requireValue|Use this option if you want an error to be thrown if this measurement is left blank.|0 (can be blank)|0 or 1|
|doesNotTakeLocale|Defines whether measurement takes locale specification.|1 (does not take locale specifications)|0 or 1|
|canBeUsedInSort|Use this option if this attribute value can be used for sorting of search results.|1 (used in sort)|0 or 1|
|canBeUsedInSearchForm|Use this option if the attribute value can be used in search forms.|1 (used in search forms)|0 or 1|
|canBeUsedInDisplay|Use this option if the attribute value can be used for display in search results.|1 (used for display)|0 or 1|
|displayTemplate|Layout for value when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^my_element_code</i>.||HTML|
|displayDelimiter|Delimiter to use between multiple values.|, (comma)|Text|
|showHexValueText|Display the hex value of the selected color below the color chip.|0 (don’t show)|0 or 1|
|showRGBValueText|Display the RGB value of the selected color below the color chip.|0 (don’t show)|0 or 1|
|default_text|Default color value.||Hex color value (Ex. FFCC33)|
|allowDuplicateValues|Allow duplicate values to be attached to a record.|0 (don’t allow duplicates)|0 or 1|

## Attribute settings: Filesize

Accepts digital file size values with commonly used suffixes: B, KB,
KiB, MB, MiB, GB, GiB, TB, Tib, PB and PiB. Available from version 1.8.

| Settings| Description | Default| Values
|----|----|----|----|
|fieldWidth|Width, in characters, of the field when displayed in a user interface.|40|Integers greater then zero|
|fieldHeight|Height, in characters, of the field when displayed in a user interface.|1|Integers greater then zero|
|requireValue|Use this option if you want an error to be thrown if this measurement is left blank.|0 (can be blank)|0 or 1|
|doesNotTakeLocale|Defines whether measurement takes locale specification.|1 (does not take locale specifications)|0 or 1|
|canBeUsedInSort|Use this option if this attribute value can be used for sorting of search results.|1 (used in sort)|0 or 1|
|canBeUsedInSearchForm|Use this option if the attribute value can be used in search forms.|1 (used in search forms)|0 or 1|
|canBeUsedInDisplay|Use this option if the attribute value can be used for display in search results.|1 (used for display)|0 or 1|
|displayTemplate |Layout for value when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^my_element_code</i>.||HTML|
|displayDelimiter|Delimiter to use between multiple values.|, (comma)|Text|
|allowDuplicateValues|Allow duplicate values to be attached to a record.|0 (don’t allow duplicates|0 or 1|

## Attribute settings: ExternalMedia

Accepts URLs to media stored on external services such as YouTube and
Vimeo. Can parse URLs and generate embed tags. Available from version
1.8.

| Settings| Description | Default| Values
|----|----|----|----|
|fieldWidth|Width, in characters, of the field when displayed in a user interface.|40|Integers greater then zero|
|fieldHeight|Height, in characters, of the field when displayed in a user interface.|1|Integers greater then zero|
|requireValue|Use this option if you want an error to be thrown if this measurement is left blank.|0 (can be blank)|0 or 1|
|doesNotTakeLocale|Defines whether measurement takes locale specification.|1 (does not take locale specifications)|0 or 1|
|canBeUsedInSort|Use this option if this attribute value can be used for sorting of search results.|1 (used in sort)|0 or 1|
|canBeUsedInSearchForm|Use this option if the attribute value can be used in search forms.|1 (used in search forms)|0 or 1|
|canBeUsedInDisplay|Use this option if the attribute value can be used for display in search results.|1 (used for display)|0 or 1|
|displayTemplate |Layout for value when used in a display. Element code tags prefixed with the ^ character, used to represent the value in the template. For example: <i>^my_element_code</i>.||HTML|
|displayDelimiter|Delimiter to use between multiple values.|, (comma)|Text|
|allowDuplicateValues|Allow duplicate values to be attached to a record.|0 (don’t allow duplicates)|0 or 1|
