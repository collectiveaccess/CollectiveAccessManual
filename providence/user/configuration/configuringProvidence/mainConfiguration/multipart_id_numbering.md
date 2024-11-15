---
title: Multipart numbering
---

# Multipart Numbering 

The MultiPartIDNumber plug-in provides a flexible means to generate
structured numbering systems such as accession numbers within
CollectiveAccess. For most numbering schemes employed by museums and
archives it should be possible to configure a convenient user interface
and adequate validation rules using only the plug-in and without any
custom programming.

The MultiPartIDNumber plug-in requires an ID number *format* for each
item in CollectiveAccess that supports ID numbers. A format is composed
of *elements* joined together by a *separator*. Each element in a format
has settings specified that determine what input is valid for it and how
it will behave in the user interface. An ID number is constructed by
stringing together the individual elements using separators. By
combining various types of elements you can create arbitrarily complex
numbering systems.

# The multipart_id_numbering.conf configuration file

The file defines the formats used by the MultiPartIDNumber plug-in. It
is a standard CollectiveAccess configuration file using the
`common configuration syntax <configuration_file_syntax>`.

CollectiveAccess supports ID numbers for the following items:

-   objects (*ca_objects*)
-   lots (*ca_object_lots*)
-   entities (*ca_entities*)
-   places (*ca_places*)
-   collections (*ca_collections*)
-   occurrences (*ca_occurrences*)
-   loans (*ca_loans*)
-   movements (*ca_movements*)
-   storage locations (*ca_storage_locations*)
-   representations (*ca_object_representations*)
-   list items (*ca_list_items*)
-   content managed site pages (*ca_site_pages*)
-   tours (*ca_tours*)
-   tour stops (*ca_tour_stops*)
-   sets (*ca_sets*)

You may specify numbering formats for any type of item listed above in
multipart_id_numbering.conf. The format name for each must be identical
to the item code (italicized in the list above). CollectiveAccess will
use the format to generate an ID number entry interface and validate
input for the ID number field of the respective data item. For lots this
is the \'idno_stub\' field; for objects and other items it is the
\'idno\' field.

The following sample multipart_id_numbering.conf configuration is for an
organization employing a lot numbering scheme based upon the year of
acquisition and an automatically assigned incrementing lot number.
Object numbers are based upon the lot number format but with an
additional automatically assigned incrementing item number. In both
number formats, elements are separated with periods (\".\"). The file
specifies a two part number for entities: the first element is a code
taken from a drop-down list of three allowable values and the second
element is an automatically assigned incrementing number. For both place
names and vocabulary terms an automatically assigned incrementing number
is specified.

``` none
formats = {
    ca_objects = {
    # This is a default numbering format for object type for which a format
    # has not been explicitly specified
        __default__ = {
            separator = .,
            # sorting of id numbers will be in reverse of display order
            # (eg. if display is 2011.52.1, sort will be on 1.52.2001);
            # remove sort_order altogether if you want sort to consider
            # elements in display order

            sort_order = [item_num, lot_num, acc_year],

            elements = {
                acc_year = {
                    type = YEAR,
                    width = 6,
                    description = Year,

                    editable = 1
                },
                lot_num = {
                    type = NUMERIC,
                    width = 6,
                    description = Lot number,

                    editable = 1
                },
                item_num = {
                    type = SERIAL,
                    width = 6,
                    description = Item number,

                    editable = 1
                }
            }
        },
        # Here's a specialized number format for objects of type "video"
        # (where "video" is the idno of the object_type)
        video = {
            separator = .,

            elements = {
                acc_year = {
                    type = YEAR,
                    width = 6,
                    description = Year,

                    editable = 1
                },
                typecode = {
                    type = LIST,
                    values = [8MM, DV, BETASP],
                    default = ORG,
                    width = 6,
                    description = Type code,
                    editable = 1
                },
                item_num = {
                    type = SERIAL,
                    width = 6,
                    description = Item number,

                    editable = 1
                }
            }
        }
    },

    ca_object_lots = {
        __default__ = {
            separator = .,

            elements = {
                acc_year = {
                    type = YEAR,
                    width = 6,
                    description = Year,

                    editable = 1
                },
                lot_num = {
                    type = SERIAL,
                    width = 6,
                    description = Lot number,

                    editable = 1
                }
            }
        }
    },

    ca_entities = {
        __default__ = {
            separator = .,

            elements = {
                code = {
                    type = LIST,
                    values = [PER, ORG, GRP],
                    default = ORG,
                    width = 6,
                    description = Entity code,
                    editable = 1
                },
                num = {
                    type = SERIAL,
                    width = 8,
                    description = Entity number,
                    editable = 1
                }
            }
        }
    },
    ca_places = {
        __default__ = {
            # Note the blank separator -- the comma is part of the config
            # file, not the separator value
            separator = ,

            elements = {
                num = {
                    type = SERIAL,
                    width = 8,
                    description = Place number,
                    editable = 0
                }
            }
        }
    },

    ca_collections = {
        __default__ = {
            # Note the blank separator -- the comma is part of the config
            # file, not the separator value
            separator = ,

            elements = {
                num = {
                    type = SERIAL,
                    width = 8,
                    description = Collection number,
                    editable = 0
                }
            }
        }
    },

    ca_occurrences = {
        __default__ = {
            # Note the blank separator -- the comma is part of the config
            # file, not the separator value
            separator = ,

            elements = {
                num = {
                    type = SERIAL,
                    width = 8,
                    description = ID number,
                    editable = 0
                }
            }
        }
    }
}
```

All formats in the configuration file are located in an associative list
named *formats* The keys of this list are table names for which format
are specified. Each table name key has as its value an associative list
keyed on type. Use the special *\_\_default\_\_* type to specify a
format for use with any type not declared with a specific format.

Each type key has as its value an associative list specifying the
format. The following keys may be placed in the list:


|  Key  |  Description  |  Example value  |  Mandatory? 
|----|----|----|----|
|separator|The value to be displayed between elements in the user interface for the format. If you want your elements to be merged end to end with no space or separator character(s) then leave this blank.|`separator = ,`| Yes|
|dont_inherit_from_parent_collection|In some archival configurations of CollectiveAccess a cross-table hierarchy is used to link object-level records to the collections they are a part of. By default these child records inherit their parent collection’s identifier. This is often desired behavior. Other times, for example when a SERIAL configuration is set for object idnos, it’s not and has potential to create duplicate identifiers. In these cases `dont_inherit_from_parent_collection` can be used to prevent object children from inheriting collection identiifers that are duplicative. Note this only impacts cross-table hierarchies and doesn’t impact other relationships or hierarchies within a single table. To disable inheritance within a single table hierarchy see `dont_inherit_from_parent` below.|`dont_inherit_from_parent_collection = 1`|No|
|dont_inherit_from_parent|Newly created child records inherit the identifier of their parent. To disable inheritance set this to a non-zero value.|`dont_inherit_from_parent = 1`|No|
|compare_against_values_in|A list of tables beyond the format table to compare identifiers against when searching for duplicate values. This allows uniqueness of numbers to be enforced across tables if desired.|[ca_collections, ca_occurrences]|No|
|elements|An associative list of elements and the parameters for each. Elements will be output when constructing an ID number or user interface in the same order they appear in the list. At least one element must be declared for the format to be valid.|<font color="red">Code block goes here</font>|Yes|
|sort_order|By default an ID number will sort on its constituent elements in the order they are defined in the elements list. If you need to have the elements of an ID number display in one order but sort in another, you can set the order used for sorting here. The value should be a simple non-associative list with the element keys in the order to use for sorting. If you want sorting to use the same order as display, you should simply omit sort_order|`sort_order = [num, code]`|No|
|allow_extra_elements|An existing ID number value may include more elements than are currently configured. This can happen when configuration is changed, invalidating numbers created under earlier configurations, or if values are imported from other data sources that don’t conform to current standards. For these numbers CollectiveAccess can either (a) ignore the additional parts, truncating the number at the configured number of parts or (b) add “extra” elements for these numbers, preserving the additional parts. No matter which option is chosen a number with extra parts is still considered invalid. To tolerate numbers with extra parts set this option to a non-zero value. To truncate set this option to 0. If omitted the default is to allow extra elements. (Available from version 1.6)|`allow_extra_elements = 1`|No|
|extra_element_width|Width of any “extra” elements in editing forms, in characters. Defaults to 10 if not set. (Available from version 1.6)|`extra_element_width = 4`|No|

The keys of the *element* associative list are element names. These
names are only used for reference during configuration and to name HTML
form elements and are not presented to the user. They should use only
alphanumeric characters and underscores. Do not include spaces or
punctuation in the names.

The value for each element name in the elements list is another
associative list, this one containing a list of settings declaring the
characteristics of the element. The most important setting to set for an
element is its type which defines the general range of allowable values
and user interface behaviors. The plug-in supports the following types:

| Type| Description 
|----|----|
|LIST|Element value must be taken from a predefined list. User interface is drop-down list containing allowable values.|
|SERIAL|If element value is not set, it will be set to a value one greater than the greatest existing value of the ID number as formed from the element and all preceeding elements in the format. For example, if for the three element format with last last element set to SERIAL 2006 001 001 exists and you enter 2006 4, the last element will be set to 5. It is also possible to set the element value manually, but only letters and numbers are allowed.|
|CONSTANT|Element is always set to a constant alphanumeric value and cannot be changed.|
|FREE|Any input is allowed up to a specified length.|
|NUMERIC|Only numbers are allowed.|
|ALPHANUMERIC|Only numbers and letters are allowed.|
|YEAR|Only valid four digit years are allowed.If empty the element will default to the current year. This is useful when your numbering system includes the current year.|
|MONTH|Only valid month numbers (between 1 and 12) are allowed. If empty the element will default to the current month.|
|DAY|Only valid day numbers (between 1 and 31) are allowed. If empty the element will default to the current day.|
|PARENT|Automatically set to the identifier value for the parent when a new record is created. This type of element is useful when implementing “agglutinative” numbering systems which each level in a hierarchy incorporates the number of its parent. When used this must be the first element in the element list for a format type. Unexpected behaviors may occur if placed in other locations in the element list.|
|INHERIT|Set the element value to that of the parent record. (Available in version 2.0)|


Beyond type, there are a number of other settings that can be set for an
element. Some are common to all element types and others are specific to
certain types.

Settings applicable to all types of elements are:

| Parameter| Description |
|----|----|
|description|A short description of the element, suitable for display in error messages. You must set this for each element.|
|editable|If set to a non-zero value element is presented in the user interface as editable (except for elements of type CONSTANT which are never editable). If omitted or set to zero elements are only editable when empty in the case of user-entered element types (LIST, FREE, NUMERIC, ALPHANUMERIC) and never editable in auto-filled element types (SERIAL, CONSTANT, YEAR, MONTH and DAY)|
|width|Display width, in characters, of entry field in user interface.|
|prefix|Text to be prepended to element value. Valid for elements of type SERIAL and FREE.|

Type-specific settings are:

|Type| Parameter| Description |
|----|----|----|
|LIST|values|List of allowable values for the element. Used to validate input and generate a drop-down list in the user interface. Note that the value for this parameter is a simple list, not an associative list. Ex. values = [eins, zwei, drei, vier]|
||default|Default value for element|
|SERIAL|child_only|Set to restrict element for use only on records with a parent.|
||zeropad_to_length|If set to a non-zero value, the sequence number is left-padded with zeros until its length is equal to the value. For example, if set to 4, the sequence number 17 would be output as 0017. The zero padding length does not affect sequence numbers longer in length than the specified value. Thus, for example, if zeropad_to_length is set to 3, the sequence value 7114 would be output as-is.|
||sequence_by_type|For a __default__ type, if sequence_by_type is set to a non-zero value separate numeric sequences will be maintained for each type within the table. If not set (the default) a single sequence is shared across all types. For example, if the objects table is configured with types for paintings, drawings and sculptures, the default behavior would be to number all objects sequentially regardless of types (Eg. 1, 2, 3 …). If sequence_by_type is set, then each type will be numbered sequentially, with numbers duplicating across types. (Eg. Paintings numbered 1, 2, 3 …; drawings numbered 1, 2, 3 …; Etc.). You can specify the separate sequences by maintained for some, but not all, types within a table, by setting sequence_by_type on type-specific configuration entries. From version 1.8, it is possible to specify that selected types share a single sequence by setting the sequence_by_type option to a list of types that participate in the sequence. When calculating next in sequence numbering, values from all participating types will be considered.|
||dont_include_subtypes|Controls whether sub-types are automatically included in types lists specified for the sequence_by_type option. If set, only types explicitly referenced in the setting value will be included. Default is to expand the list to include sub types. (avaialble from v1.8)|
||minimum_value|A non-zero number to use as the initial value for the sequence. Ex. if set to 20000 then the first record created with be numbered 20000, the second 20001 and so on. (available from v1.7)|
|CONSTANT|value|Value of constant. This must be specified.|
|FREE|minimum_length|Minimum allowable length, in characters, of element value.|
||maximum_length|Maximum allowable length, in characters, of element value.|
||zeropad_to_length|If set to a non-zero value, the sequence number is left-padded with zeros until its length is equal to the value. For example, if set to 4, the sequence number 17 would be output as 0017. The zero padding length does not affect sequence numbers longer in length than the specified value. Thus, for example, if zeropad_to_length is set to 3, the sequence value 7114 would be output as-is.|
|NUMERIC|minimum_length|Minimum allowable length, in characters, of element value.|
||maximum_length|Maximum allowable length, in characters, of element value.|
||minimum_value|Minimum allowable numeric value of element value.|
||maximum_value|Maximum allowable numeric value of element value.|
|ALPHANUMERIC|minimum_length|Minimum allowable length, in characters, of element value.|
||maximum_length|Maximum allowable length, in characters, of element value.|
|YEAR|force_derived_values_to_current_year|When deriving an identifier from an existing value (typically when duplicating a record, or creating a child record), force the new value to the current year no matter the existing value.|
|MONTH|force_derived_values_to_current_month|When deriving an identifier from an existing value (typically when duplicating a record, or creating a child record), force the new value to the current month no matter the existing value.|
|DAY|force_derived_values_to_current_day|When deriving an identifier from an existing value (typically when duplicating a record, or creating a child record), force the new value to the current day no matter the existing value.|

# Problems with SERIAL elements

To generate unique values for SERIAL elements the plug-in must query
your CollectiveAccess database. If the database operation fails you may
see the word \'ERR\' instead of the expected numeric value. In versions
prior to 1.8 the underlying database table and fields used to derive the
next number in sequence had to be manually configured for each SERIAL
element using the *table*, *field* and *sort_field* settings. If you are
running an older version and receive an ERR value verify that the table,
field and sort_field element settings are set correctly.

The automatically issued SERIAL values should always be one more than
the largest extant value in your database. If your system is returning
values that are less than the maximum and you have configured different
number formats for different types within the same table, try setting
the `sequence_by_type` setting for each type, which will cause each type
to have its own numeric sequence. By default all types within a table
share a single numeric sequence. This is often desirable, but
significantly differing numbering formats with a single table can cause
the sequence generator to fail. Separating sequences by type can ensure
that usable sequences are created within each type.

The sequence number system relies upon sortable versions of formatted
identifiers to reliably generate new values in sequence. Incorrect
sequence values may be produced if these sortable values are somehow
corrupted. To regenerate correct sortable values try the *reloading sort
values* option in the administrative *Maintenance* menu or the command
line `caUtils <ca_utils>` command using
the *rebuild-sort-values* option.

# Using UUID\'s as identifiers

The UUID numbering plug-in offers a simplified unique numbering system
using universally unique identifiers (UUID\'s). UUID\'s are 128-bit
values expressed as a series of hexadecimal (base-16) numbers. When
appropriately generated they are for all practical purposes unique.

The UUID pluig-in can be enabled on a per-table basis by changing the
[\<table\>\_id_numbering_plugin] values in
[app.conf] to \"UUIDNumber\".

The UUID plugin utilizes the [multipart_id_numbering.conf]
configuration file, but assumes all formats have a single element of
type \"FREE\". If identifier values for existing records have non-UUID
values set, the plugin will overwrite these with valid UUID\'s. To
tolerate invalid UUID values for existing records set the
[dont_overwrite_invalid_guid] option in the format element
used for the UUID value to a non-zero value. (This option is available
as of version 2.0)
