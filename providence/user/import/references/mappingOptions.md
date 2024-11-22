---
title: Mapping Options
---

# Mapping Options

Options allow you to set additional formatting and conditionals on data
during import. Some Options are designed to actually set parameters on
the mapping behavior, such as the skip options. **skipGroupIfEmpty**,
for example, allows you to prevent the import of certain fields,
depending on the presence of data in another related field. Other
Options simply format data, such as **formatWithTemplate**, **suffix**,
and **convertNewlinesToHTML**.

Below are a list of all options that can be used in an import mapping, in the "options" column.
These are written in json format and can hold more than one option at the same time.

```json title="example"
{
  "delimiter": ";",
  "skipIfEmpty": "1",
  "maxLenth": "255"
}
```

## delimiter
Delimiter to split repeating values on

```json 
{"delimiter": ";"}
```

## hierarchicalDelimiter
Delimiter to use when formatting hierarchical paths. This option is only supported by sources that have a notion of related data and relationship types, most notably (and for now only) the CollectiveAccessDataReader.

```json
{"hierarchicalDelimiter": " ➜ "}
```

## formatWithTemplate
Display template to format value with prior to import. Placeholder tags may be used to incorporate data into the template. Tags always start with a “^” (caret) character. For column-based import formats like Excel and CSV the column number is used to reference data. For XML formats an XPath expression is used. While templates are tied to the specific source data element being mapped, they can reference any element in the import data set. For example, in an import from an Excel file, the template used while mapping column 2 (tag ^2 in the template) may also use tags for any other column.

:::note
There is no requirement that a template include a tag for the column being mapped. The template can reference any element in the current row, without restriction.
:::

```json
{"formatWithTemplate": "Column 1: ^1; Column 4: ^4"}
```

## applyRegularExpressions
This option allows the rewrite of source data using a list of Perl compatible regular expressions as supported in the PHP programming language. 

Each item in the list is an entry with two keys: 
- `"match"`: The regular expression applied to source data values
- `"replaceWith"`: A replacement value for matches found. 

`"replaceWith"` may include numbered back references in the form /n where n is the index of the regular expression parenthetical match group.

See the [regex](regex) page for useful regular expressions.

:::info
`applyWithRegularExpressions` will modify the data value being mapped for both import and comparison. Options that test values, such as `skipIfValue`, will use the modified value unless `useRawValuesWhenTestingExpression` is set.
:::

Let\'s say you are mapping duration data to a TimeCode element, and the source data syntax is invalid. 

> Invalid timecode format: `7.30.`
>
> Should be transformed to valid timecode format: `7:30`

The invalid data can be transformed using the applyRegularExpressions
option with the proper regular expressions.

```json
{
  "applyRegularExpressions": [
    {
      "match": "([0-9]+)\\.([0-9]+)",
      "replaceWith": "\\1:\\2"
    },
    {
      "match": "[^0-9:]+",
      "replaceWith": ""
    }
  ]
}
```

In this example, the first regular expression matches **\<number\>.\<number\>** and replaces it with **\<number\>:\<number\>**. 

In other words, **\"7.30.\"** becomes **\"7:30.\"**. The `\[0-9\]+` string matches sequences of 1 or more numbers. Since they're in parenthesis they can be "back referenced" into the replaceWith part using the `\\1` and `\\2` placeholders. 

The second regular expression matches any character that is not a number or a colon (the first one having reformatted any period between numbers as a colon) and replaces it with nothing (hence removing it). This regular expression takes care of the erroneous period at the end of the invalid data. **\"7:30.\"** is transformed into **\"7:30\"** - a valid TimeCode input.

:::warning
The only deviation from the standard regular expressions language are the backslashes. Wherever you would use a single backslash in a regular expression, you need to use two in our mapping because JSON treats backslashes specially and demands that a literal `\` be encoded as `\\`
:::

## prefix
Text to prepend to value prior to import

With the **prefix** option, text can be added to prepend to values prior
to import. This option can be particularly useful when importing
currency values; using this option can prepend a currency symbol that
will display upon import.

```json
{"prefix": "$"}
```

:::info
From version 1.8, placeholder tags may be used to incorporate import data into the prefix. In previous versions, only static text was supported.
:::

## suffix
Text to append to value prior to import

Using the **suffix** option allows text to be added to append to values
prior to import.

```json
{"suffix": "cm"}
```
:::info
From version 1.8 placeholder tags may be used to incorporate import data into the suffix. In previous versions, only static text was supported.
:::

## default
Value to use if data source value is empty

## restrictToTypes
Restricts the mapping to only records of the designated type. For example the Duration field is only applicable to objects of the type moving_image and not photograph.

```json
{"restrictToTypes": ["moving_image", "audio"]}
```

## filterEmptyValues
Remove empty values from values before attempting to import.

:::Note
When importing repeating values, all values are imported, even blanks. Setting this option filters out any value that is zero-length.
:::

## filterToTypes
Restricts the mapping to pull only records related with the designated types from the source.

:::Note
This option is only supported by sources that have a notion of related data and types, most notably (and for now only) the CollectiveAccessDataReader.
:::

## filterToRelationshipTypes
Restricts the mapping to pull only records related with the designated relationship types from the source.

:::Note
This option is only supported by sources that have a notion of related data and relationship types, most notably (and for now only) the CollectiveAccessDataReader.
:::

## skipIfEmpty options
These options will skip either the current mapping, the entire row or the entire group if the source value is empty

1 = true/yes , 0 = false/no

```json
{"skipIfEmpty": "1"}
```

### skipIfEmpty
Skip the mapping If the data value being mapped is empty.

### skipRowIfEmpty
Skip the current data row if the data value being mapped is empty.

### skipGroupIfEmpty
Skip all mappings in the current group if the data value being mapped is empty.

## skipIfValue options
These options will skip either the current mapping, the entire row or the entire group if the value being mapped is equal to any of the specified values.

:::note[Comparisons are case-sensitive]
:::

```json title="example"
{"skipIfValue": ["alpha", "gamma"]}
```

### skipIfValue
Skip the mapping if the data value being mapped is equal to any of the specified values. 

### skipRowIfValue
Skip the current data row if the data value being mapped is equal to any of the specified values. 

### skipGroupIfValue
Skip all mappings in the current group if the data value being mapped is equal to any of the specified values. 

## skipIfNotValue options
These options will skip either the current mapping, the entire row or the entire group if the value being mapped is **not** equal to any of the specifed values.

:::note[Comparisons are case-sensitive]
:::

```json title="example"
{"skipRowIfNotValue": ["beta"]}
```

### skipIfNotValue
Skip the mapping If the data value being mapped is not equal to any of the specified values.

### skipRowIfNotValue
Skip the current data row if the data value being mapped is **not** equal to any of the specified values.

### skipGroupIfNotValue
Skip all mappings in the current group if the data value being mapped is **not** equal to any of the specified values.

## skipIfExpression Options

```json title="examples"
{"skipIfExpression": "^14 =~ /kitten/"}

{"skipRowIfExpression": "wc(^14) > 10"}
```

### skipIfExpression
Skip mapping if expression evaluates to true. All data in the current row is available for expression evaluation. By default, data is the “raw” source data. To use data rewritten by replacement values and applyRegularExpressions in your expression evaluation, set the _useRawValuesWhenTestingExpression_ to false.

### skipRowIfExpression
Skip data row if expression evaluates to true. Data available during evaluation is subject to the same rules as in _skipIfExpression_.

### skipGroupIfExpression
Skip mappings in the current group if expression evaluates to true. Data available during evaluation is subject to the same rules as in _skipIfExpression_.

## skipWhenEmpty options

:::note[Available from version 1.8]
:::

```json title="example"
{"skipWhenEmpty": ["^15", "^16", "^17"]}
```

### skipWhenEmpty
Skip mapping when any of the listed placeholder values are empty.

### skipRowWhenEmpty
Skip row when any of the listed placeholder values are empty.

### skipGroupWhenEmpty
Skip group when any of the listed placeholder values are empty.

## skipWhenAllEmpty Options

:::note[Available from version 1.8]
:::

```json title="example"
{"skipWhenAllEmpty": ["^15", "^16", "^17"]}
```

### skipWhenAllEmpty
Skip mapping when all of the listed placeholder values are empty.

### skipRowWhenAllEmpty
Skip row when all of the listed placeholder values are empty.

### skipGroupWhenAllEmpty
Skip group when all of the listed placeholder values are empty.

## skipIfDataPresent
Skip mapping if data is already present in CollectiveAccess.

:::note[Available from version 1.8]
:::

## skipIfNoReplacementValue
Skip mapping if the value does not have a replacement value defined.

:::note[Available from version 1.8]
:::

## useRawValuesWhenTestingExpression
Determines whether data used during evaluation of expressions in `skipIfExpression`, `skipRowIfExpression` and similar is raw, unaltered source data or data transformed using replacement values and/or regular expressions defined for the mapping. The default value is true – use unaltered data. Set to false to use transformed data. 

:::note[Available from version 1.8]
:::

```json
{"useRawValuesWhenTestingExpression": false}
```

## maxLength
Defines maximum length of data to import. Data will be truncated to the specified length if the import value exceeds that length.

## relationshipType
A relationship type to use when linking to a related record.

The relationship type code is used. This option is only used when directly mapping to a related item without the use of a splitter.

## convertNewlinesToHTML
Convert newline characters in text to HTML `<br>` tags prior to import.

## collapseSpaces
Convert multiple spaces to a single space prior to import.

## useAsSingleValue
Force repeating values to be imported as a single value concatenated with the specified delimiter.

This can be useful when the value to be used as the record identifier repeats in the source data.

## matchOn
List indicating sequence of checks for an existing record. Values of array can be “label” and “idno”. will first try to match on idno and then label if the first match fails.

This is only used when directly mapping to a related item without the use of a splitter

```json
{"matchOn":["idno","label"]}
```

## truncateLongLabels
Truncate preferred and non-preferred labels that exceed the maximum length to fit within system length limits.

If not set, an error will occur if overlength labels are imported.

## lookahead
Number of rows ahead of or behind the current row to pull the import value from.

This option allows you to pull values from rows relative to the current row. The value for this option is always an integer indicating the number of rows ahead or (positive) or behind (negative) to jump when obtaining the import value. This setting is effective only for the mapping in which it is set.

## useParentAsSubject
Import parent of subject instead of subject.

This option is primarily useful when you are using a hierarchy builder refinery mapped to parent_id to create the entire hierarchy (including subject) and want the bottom-most level of the hierarchy to be the subject rather than the item that is the subject of the import.

## treatAsIdentifiersForMultipleRows
Explode import value on delimiter and use the resulting list of values as identifiers for multiple rows.

This option will effectively clone a given row into multiple records, each with an identifier from the exploded list.

## displaynameFormat
Transform label using options for formatting entity display names. Default is to use value as is.

Other options are: 
- surnameCommaForename 
- forenameCommaSurname
- forenameSurname

See DataMigrationUtils::splitEntityName().

## mediaPrefix
Path to import directory container file references for media or file metadata attributes.

This path can be absolute or relative to the configured CollectiveAccess import directory, as defined in the **app.conf** `batch_media_import_root_directory_directive`

```json
{"mediaPrefix": "tiff/"}
```

## matchType
Determines how file names are compared to the match value.

Valid values are:
- STARTS
- ENDS
- CONTAINS
- EXACT (default)

```json
{"matchType": "STARTS"}
```

## matchMode
Determines whether to search on file names, enclosing direcotry names or both.

Valid values are:
- DIRECTORY_NAME
- FILE_AND_DIRECTORY_NAMES
- FILE_NAME (default)

```json
{"matchMode": "DIRECTORY_NAME"}
```

## errorPolicy
Determines how errors are handled for the mapping. Options are to ignore the error, stop the import when an error is encountered and to receive a prompt when the error is encountered.

Valie values are:
- ignore
- stop

```json
{"errorPolicy": "stop"}
```

## add
Always add values after existing ones even if existing record policy mandates replacement (eg. `merge_on_idno_with_replace` etc).

:::note[Available from version 1.8]
:::

## replace
Always replace values, removing existing ones, event if existing record policy does not mandate replacement (eg. is not `merge_on_idno_with_replace` etc).

:::note[Available from version 1.8]
:::

## replaceIfExpression
Replace values if specified expression evaluated as true, removing existing, ones even if existing record policy does not mandate replacement (Eg. is not `merge_on_idno_with_replace` etc).

:::note[Available from version 1.8]
:::

## upperCaseFirst
Force first letter of value to uppercase.

:::note[Available from version 1.8]
:::

## toUpperCase
Force value to uppercase.

:::note[Available from version 1.8]
:::

## toLowerCase
Force value to lowercase

:::note[Available from version 1.8]
:::

## transformValuesUsingWorksheet

Using [Original Values and Replacement Values](orig_replace_example.html#import-orig-replace-example) is sufficient for transforming a small range of values. But for large transformation dictionaries, use the option transformValuesUsingWorksheet instead. 

You can use this option to reference a list of values in a separate worksheet within the mapping document. The formatting of the sheet should place original values in the first column, and replacement values in the second column.

When this option is set, any values in the \"original values\" and \"replacement values\" columns of the mapping worksheet are ignored, even if the \"transformValuesUsingWorksheet\" worksheet is empty or does not exist. You refer to the sheet by name:

```json
{"transformValuesUsingWorksheet":"Worksheet Title"}
```
