---
title: Using Expressions in an Import Mapping
---

*in progress documentation about using expressions in an import mapping*

## What is a Regular Expression?

Regular expressions are a very powerful and very flexible pattern matching syntax. At its most basic, a regular expression is a simple bit of text that is matched anywhere in the value being compared. For example:

```
"Software is great" =~ /soft/ 
```

Would return true, with the regular expression is on the right side of the operator enclosed in "/" characters. Regular expressions are enclosed in the forward slashes to set them off from normal text.

Regular expressions are used for many reasons in an import mapping, where source data patterns need to be matched and replaced. 

Therefore, if there are repeated values, or a pattern of values in your source data that need replacing or manipulating, an expression can usually solve those occurrences. 

For more information, see [Expressions](https://docs.collectiveaccess.org/providence/user/reporting/expressions).

## Tools for Validating Expressions

Similarly to validating JSON, it is useful to validate your regular expressions as notation can be tricky. 

Some great resources for validating include:

* [Regex101](https://regex101.com/) 

* [W3 Schools](https://www.w3schools.com/python/python_regex.asp)


## When should Regular Expressions be used?

### Use of Expressions vs. Use of Option "skipIfValue"

For unwanted values in source data, it’s common to use the option 

``{“skipIfValue”: "xyz"}``

Which skips the field in the mapping spreadsheet if the value in the field matches in a case sensitive manner. And in most cases, using this Option is enough to manipulate the data to avoid any unwanted values in a data import. 

A common example might be when source data in a Date column contains dates, and where no date was input, a 0 is recorded. To skip all dates that have a 0 value, you would simply use:

{“skipIfValue”: “0”}

Which would skip all values in that field that match 0 exactly.

## Basic Syntax

| Symbol | Description | Example
|----|----|----|
|----|----|----|
|----|----|----|
|----|----|----|

## Mapping Options: Some Examples

### SkipIfExpression

#### Example 1

```
{"skipIfExpression": "length(^/date) > 0"}
```

### ApplyRegularExpressions

#### Example 1
```
{
    "applyRegularExpressions": [
        {
            "match": "/\\/[ \\t]*\\//",
            "replaceWith": ""
        }
    ]
}
```
#### Example 2
```
{
    "applyRegularExpressions": [
        {
            "match": "Language:[ ]+",
            "replaceWidth": ""
        }
    ]
}
```
#### Example 3
```
{
    "applyRegularExpressions": [
        {
            "match": "/artifact/i",
            "replaceWith": "objects"
        }
    ]
}
```




## For more information

These options are also reviewed in [Mapping Options](https://docs.collectiveaccess.org/providence/user/import/references/mappingOptions).