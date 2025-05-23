---
title: Search_indexing.conf
---

# Search_indexing.conf

The search_indexing.conf file controls which data in your
CollectiveAccess database is searchable, and how. Only data elements
configured in search_indexing.conf are searchable. Note that
configuration of CollectiveAccess\' browse system is completely
independent from search. It is possible to search on data that are not
browse-able, and browse on elements that are not indexed for search.

## Organization

At the top level, search_indexing.conf is structured as a series of
blocks, one for each type of item to be indexed:

``` none
ca_objects = {
   ... indexing configuration for ca_objects records ...
},
ca_entities = {
   ... indexing configuration for ca_entities records ...
},
ca_places = {
   ... indexing configuration for ca_places records ...
},
ca_occurrences = {
   ... indexing configuration for ca_occurrences records ...
},
...
```

Within each block is a sub-block for item fields as well as sub-blocks
for related items and access points (aliases and short cuts for selected
data elements or groups of elements). Content in related items may be
indexed against the item. For example, you may have an object record
indexed by its various fields (accession number, condition, appraised
value) as well as by content in related entities (name of artist,
nationality of artist), places (place of manufacture), storage location,
and more. The object will be searchable by any of the fields for which
it has been indexed. Indexing for each type of item is configured
independently. You may have objects indexed with content taken from
related entities, while omitting related object data from entity
indexing, for instance.

A typical ca_objects block might look like this:

``` none
ca_objects = {
    # ------------------------------------
    ca_objects = {
        fields = {
            _metadata = { },                    # forces indexing of all attributes
            parent_id = {STORE, DONT_TOKENIZE, DONT_INCLUDE_IN_SEARCH_FORM },
            source_id = {},
            lot_id = {},
            idno = { STORE, DONT_TOKENIZE, INDEX_AS_IDNO, BOOST = 100 },
            type_id = { STORE, DONT_TOKENIZE },
            source_id = { STORE, DONT_TOKENIZE },
            hier_object_id = { STORE, DONT_TOKENIZE },
            access = { STORE, DONT_TOKENIZE },
            status = { STORE, DONT_TOKENIZE },
            deleted = { STORE, DONT_TOKENIZE },
            is_deaccessioned = { STORE, DONT_TOKENIZE },
            deaccession_notes = {},
            deaccession_date = {},
            circulation_status_id = { STORE, DONT_TOKENIZE }
        },
        # Index idno's of related objects
        related = {
            fields = {
                idno = { STORE, DONT_TOKENIZE, INDEX_AS_IDNO, BOOST = 100 }
            }
        }
    },
    # ------------------------------------
    ca_object_labels = {
        key = object_id,
        fields = {
            name = { BOOST = 100, INDEX_ANCESTORS, INDEX_ANCESTORS_START_AT_LEVEL = 0, INDEX_ANCESTORS_MAX_NUMBER_OF_LEVELS = 4, INDEX_ANCESTORS_AS_PATH_WITH_DELIMITER = . },
            name_sort = { DONT_INCLUDE_IN_SEARCH_FORM },
            _count = {}
        },
        # Index names of related objects
        related = {
            fields = {
                name = { BOOST = 100, INDEX_ANCESTORS, INDEX_ANCESTORS_START_AT_LEVEL = 0, INDEX_ANCESTORS_MAX_NUMBER_OF_LEVELS = 4, INDEX_ANCESTORS_AS_PATH_WITH_DELIMITER = . }
            }
        }
    },
        # ------------------------------------
    ca_objects_x_entities = {
        key = object_id,
        fields = {
            _count = { }
        }
    },
    # ------------------------------------
    ca_entities = {
        tables = {
            entities = [ca_objects_x_entities]
        },
        fields = {
            idno = { STORE, DONT_TOKENIZE, INDEX_AS_IDNO, BOOST = 100 },
            _count = { }
        }
    },
    # ------------------------------------
    ca_entity_labels = {
        tables = {
            entities = {
                ca_objects_x_entities = { },
                ca_entities = {}
            },
            annotations = [ca_objects_x_object_representations, ca_object_representations, ca_representation_annotations, ca_representation_annotations_x_entities, ca_entities]
        },
        fields = {
            entity_id = { DONT_INCLUDE_IN_SEARCH_FORM },
            displayname = { PRIVATE },
            forename = {},
            surname = {},
            middlename = {}
        }
    },
    # ------------------------------------
    _access_points = {
        label = {
            fields = [ca_object_labels.name],
            options = { DONT_INCLUDE_IN_SEARCH_FORM }
        },
        desc = {
            fields = [ca_objects.description],
            options = { }
        },
    }
    # ------------------------------------
}
```

This may look a bit intimidating at first, but there are actually only
three types of sub-blocks present: indexing configuration for the item
itself (the indented ca_objects key immediately following the first
ca_objects that defines the block), indexing from related items (the
ca_object_labels keys and those referencing other tables that follow)
and access point definitions (the \_access_points key at the end of the
sub-block). These sub-blocks form the core of the configuration, and are
discussed in detail below.

## Sub-blocks

To index data elements that are part of the item itself create a
sub-block whose key is the table name of the item. For example, when
indexing ca_objects records, define the data elements (metadata
attributes intrinsic fields, special fields) to be indexed in a
sub-block with the key ca_objects. In the example configuration, this
block is defined as:

``` none
ca_objects = {
    fields = {
        _metadata = { },                    # forces indexing of all attributes
        parent_id = {STORE, DONT_TOKENIZE, DONT_INCLUDE_IN_SEARCH_FORM },
        source_id = {},
        lot_id = {},
        idno = { STORE, DONT_TOKENIZE, INDEX_AS_IDNO, BOOST = 100 },
        type_id = { STORE, DONT_TOKENIZE },
        source_id = { STORE, DONT_TOKENIZE },
        hier_object_id = { STORE, DONT_TOKENIZE },
        access = { STORE, DONT_TOKENIZE },
        status = { STORE, DONT_TOKENIZE },
        deleted = { STORE, DONT_TOKENIZE },
        is_deaccessioned = { STORE, DONT_TOKENIZE },
        deaccession_notes = {},
        deaccession_date = {},
        circulation_status_id = { STORE, DONT_TOKENIZE }
    },
    # Index idno's of related objects
    related = {
        fields = {
            idno = { STORE, DONT_TOKENIZE, INDEX_AS_IDNO, BOOST = 100 }
        }
    }
},
```

The actual fields to index are included in a list with the field key. An
additional related key is included, defining indexing for objects
related to objects. This will be discussed in detail later.

Each intrinsic field (non-repeating fields hardcoded in the
CollectiveAccess database schema) to be indexed is listed individually,
with options enclosed in the curly brackets (\"{}\"). For convenience
all configurable metadata elements specific to your installation are
indexed using the special \_metadata field. This obviates the need for
you to enumerate each metadata element individually. If you need to not
index certain elements, you can specify individual elements to index
using keys starting with ca_attribute\_ followed by element codes (ex.
metadata element \"description\" would be listed as
\"ca_attribute_description\").

Only data elements listed in this block, or inferred by the \_metadata
special field, will be indexed.

## Special Field Options

There are two **\"special fields\"** that may be used in
the field list. Special fields always start with underscore character.

| Option | Description 
|----|----|
|_metadata|Forces indexing of all metadata elements configured for the item. When indexing of all fields is desired (the typical case) use of the _metadata special field obviates the need to explicitly list all available fields, and to update indexing configuration every time a new metadata element is added.|
|_count|Embeds the number of related rows for a given table in the index. You can specify this for both relationship (ex. ca_objects_x_entities) and primary (ex. ca_entities) tables. The field is named ``<table_name>.count`` - for example: object_representations.count for table ‘object_representations’. This can be used to find rows that have, or don’t have, related rows in a given table.When specified on a primary table (eg. ca_entities, ca_occurrences), counts are indexed in aggregate as well as for each type. For relationship tables (eg. ca_objects_x_entities) counts are indexed in aggregate as well as for each relationship type. For example querying on a specific type or types: ca_entities.count/individual:3 (finds records with exactly three related entities of type “individual”) ``ca_objects_x_entities.count/artist:[2 to 4]`` (finds objects with between two and four entities related as artist)|

## Field-level options 

A variety of options are available to control how data elements are
indexed:

| Option | Description|Example Syntax
|----|----|----|
|STORE|Forces the value to be stored in the index, if possible; this can speed display of the content in a search but may slow down indexing and increases index size|not applicable|
|TOKENIZE|Breaks content into separate values on whitespace characters, such as a spaces or line breaks, or by punctuation characters prior to indexing. This is the default and in general need not be specified. It may be combined with the DONT_TOKENIZE option to index values both as tokenized fragments and as a single “as-is” value. This can be useful when indexing accession numbers and other identifiers.|not applicable|
|DONT_TOKENIZE|Indexes the value as-is, rather than breaking into separate values on whitespace characters, such as a spaces or line breaks, or by punctuation characters. This is useful for values that should not be indexed as text, such as numeric values and accession numbers/identifiers.|not applicable|
|DONT_INCLUDE_IN_SEARCH_FORM|Indicates that the data element should not be includable in user-defined search forms.|not applicable|
|BOOST|A numeric “boost” value for the index field. Higher values will cause search hits on the boosted field to count for more when sorting by relevance.|BOOST = 100|
|INDEX_AS_IDNO|Causes the value to be indexed with various permutations for flexible retrieval as a record identifier. For example, if this option is used then a search for KA1 would return KA.0001.|not applicable|
|INDEX_AS_MIMETYPE|Causes the value to be indexed as a mime type variations to support flexible retrieval. For example, if this option is used then mime type values of “image/wav” would be index under both the literal mime type and “WAVE Audio”. (Available from version 1.7.1)|not applicable|
|INDEX_ANCESTORS |Enables hierarchical indexing for field, assuming it is in an hierarchical table, resulting in all values for this field in records above the subject in the hierarchy being indexing against the subject|not applicable|
|INDEX_ANCESTORS_START_AT_LEVEL|Forces hierarchical indexing to start X levels down from the root. This allows you to omit the very highest, and least selective, levels of the hierarchy when indexing. If omitted indexing starts from the hierarchy root|INDEX_ANCESTORS_START_AT_LEVEL = 2|
|INDEX_ANCESTORS_MAX_NUMBER_OF_LEVELS|Sets the maximum number of levels above the subject to be indexed. If omitted all levels of the hierarchy above the subject are indexed|INDEX_ANCESTORS_MAX_NUMBER_OF_LEVELS = 3|
|INDEX_ANCESTORS_AS_PATH_WITH_DELIMITER |Sets a delimiter to place between each level of the hierarchy prior to indexing the entire hierarchy path above the subject. This is useful when you want to treat the hierarchy path as an identifier|INDEX_ANCESTORS_AS_PATH_WITH_DELIMITER = .|
|PRIVATE|Flags indexing for the data element as being only for use by authenticated users and not for public use. Typically Pawtucket front-ends will ignore indexing so flagged.|not applicable|
|COUNT|For metadata elements only. Causes the number of values set for the element in a record to be indexed. This enables searching on records by the number of values in a given field. (Available from version 1.7)|not applicable|

You can set multiple options by separating them with commas. Options
taking values should be separated from the value by an equals sign. For
example:

``` none
ca_objects = {
        fields = {

            idno = { STORE, DONT_TOKENIZE, INDEX_AS_IDNO, BOOST = 100 },
```

## Indexing related items

Indexing can traverse relationships and include data elements in related
items. This allows, for example, an object to be found using the names
of entities related to it. Most of the time only immediate relationships
will be indexed (eg. related entities indexed to objects via the
object-entities relationship), but it is possible to specify any path
between items. Thus you could, for example, index entities against
objects via a third item, such as occurrences.

Sub-blocks for related items have their key set to the related table
name. A typical sub-block, for entity preferred labels on objects, might
look like this:

``` none
ca_entity_labels = {
    tables = {
        entities = [ca_objects_x_entities, ca_entities],
        annotations = [ca_objects_x_object_representations, ca_object_representations, ca_representation_annotations, ca_representation_annotations_x_entities, ca_entities]
    },
    fields = {
        entity_id = { DONT_INCLUDE_IN_SEARCH_FORM },
        displayname = { PRIVATE },
        forename = {},
        surname = {},
        middlename = {}
    }
},
```

We index in the ca_entity_labels table, because that is the table
storing entity labels (other times have similarly named tables:
ca_object_labels, ca_occurrence_labels, etc.). The tables key specifies
the table path(s) through the CollectiveAccess database to use to
connect entity labels to objects. In this example we specify two paths,
one via ca_objects_x_entities (the direct relationship), and one via
object representations and representation annotations. The path should
be the sequence of tables to traverse, starting with the table being
indexed (in this example, ca_objects), which is omitted.

The fields key includes all fields in the related table that should be
indexed. In this case we index four name component fields for entities
against objects. The same special fields and options available when
indexing fields in the item itself are available when indexing related
items.

### Indexing preferred and non preferred labels

Labels are stored in the CollectiveAccess database as related records,
and can be indexed similarly to other related items. One difference:
most relationships are many-to-many, with a relationship table in
between. Labels are related many-to-one without a relationship table,
resulting in a simpler configuration. When indexing labels or any other
many-to-one relationship (ex. objects - object lots) you need any
specify the name of the field in the related table that references the
primary item. In the example below this field name is object_id and is
configured using a key

``` none
ca_object_labels = {
    key = object_id,
    fields = {
        name = { BOOST = 100, INDEX_ANCESTORS, INDEX_ANCESTORS_START_AT_LEVEL = 0, INDEX_ANCESTORS_MAX_NUMBER_OF_LEVELS = 4, INDEX_ANCESTORS_AS_PATH_WITH_DELIMITER = . },
        name_sort = { DONT_INCLUDE_IN_SEARCH_FORM },
        _count = {}
    },
    # Index names of related objects
    related = {
        fields = {
            name = { BOOST = 100, INDEX_ANCESTORS, INDEX_ANCESTORS_START_AT_LEVEL = 0, INDEX_ANCESTORS_MAX_NUMBER_OF_LEVELS = 4, INDEX_ANCESTORS_AS_PATH_WITH_DELIMITER = .  }
        }
    }
},
```

### Counting related items

The number of related items can be indexed using the \_count special
field. When placed in the sub-block for the related item (ca_entities in
our example), counts will be indexed in total and by item type (eg. by
entity type). When \_count is placed in a sub-block for a relationship
table, counts will be indexed in total and by relationship type. In our
example this configuration indexes counts for related entities on the
object, broken out by relationship type:

``` none
ca_objects_x_entities = {
    key = object_id,
    fields = {
        _count = { }
    }
}
```

Indexed counts may be searched using the count field on the appropriate
table.

### Controlling related indexing

Indexing of related items can be restricted to specific relationship
types using an alternate syntax for the tables list. Rather than using a
list of tables:

``` none
```

you can specify an associative array with additional setting:

``` none
entities = {
    ca_objects_x_entities = {
        types = [artist, publisher]
    },
    ca_entities = {}
}
```

the types setting is a list of relationship types to restrict indexing
to.

You can also flag related indexing in a sub-block as private (not to be
used in public interfaces) by specifying the PRIVATE option in relevant
table paths.

As of version 1.7.6 it is possible to restrict indexing by related item
type using a \"types\" key in a sub-block with a list of types to
restrict to.

### Indexing self-relationships

\"Self-relationships\" are connections between two items of the same
kind, such as object-to-object and entity-to-entity relationships.
Indexing configuration for this sort of relationship is handled
differently then that of other related items. To index
self-relationships include a \"related\" key in the sub-block for the
item table. In our example the block is:

``` none
ca_objects = {
        fields = {
            _metadata = { },                    # forces indexing of all attributes
            parent_id = {STORE, DONT_TOKENIZE, DONT_INCLUDE_IN_SEARCH_FORM },
            source_id = {},
            lot_id = {},
            idno = { STORE, DONT_TOKENIZE, INDEX_AS_IDNO, BOOST = 100 },
            type_id = { STORE, DONT_TOKENIZE },
            source_id = { STORE, DONT_TOKENIZE },
            hier_object_id = { STORE, DONT_TOKENIZE },
            access = { STORE, DONT_TOKENIZE },
            status = { STORE, DONT_TOKENIZE },
            deleted = { STORE, DONT_TOKENIZE },
            is_deaccessioned = { STORE, DONT_TOKENIZE },
            deaccession_notes = {},
            deaccession_date = {},
            circulation_status_id = { STORE, DONT_TOKENIZE }
        },
        # Index idno's of related objects
        related = {
            fields = {
                idno = { STORE, DONT_TOKENIZE, INDEX_AS_IDNO, BOOST = 100 }
            }
        }
    },
```

The configuration for the self-relationship indexing is in bold. The
fields are configured similarly to other types of indexing, with the
same options and special fields. related indexing for preferred and
non-preferred labels may be added in the many-to-one label indexing
configuration.

As of version 1.7.4 you can also include a list of types to restrict
related indexing to. If you wish, for example, to only index related
objects of type \"artwork\" and \"book\" against other objects the
relevant fragment of configuration might look like so:

``` none
# Index idno's of related objects
related = {
   types = [artwork, book],
   fields = {
      idno = { STORE, DONT_TOKENIZE, INDEX_AS_IDNO, BOOST = 100 }
   }
}
```

### Indirect self-relationships

As of version 1.7.6 it is also possible to index two items of the same
kind indirectly, through a series of relationships to items of other
types. For example, objects can be indexed against other objects that
share the same related entities. In this case you would be indexing
objects \> entities \> objects.

To configure this sort of indexing create a sub-block with a key set to
the item name followed by \".related\" You can then configure indexing
as you would for any other related record. For objects the configuration
might look like this fragment:

``` none
ca_objects.related = {
    tables = {
        entity = [ca_objects_x_entities, ca_entities, ca_objects_x_entities]
    },
    fields = {
        idno = { STORE, DONT_TOKENIZE, INDEX_AS_IDNO, BOOST = 100 }
    }
},
```

This would index objects with the idno field values of any objects with
the same related entities.

### Access Points

The access points sub-block (use key \_access_points) defines aliases
for specific indexed elements or groups of elements. It also allows a
user to set attributes to be used in search forms as well as search
shortcuts.

### Search Shortcuts

With \_access_points you can create shortcuts to be used in any search
system-wide, including Basic Search, Quick Search, Find in the Hierarchy
bundle, and Advanced Search.

Let\'s say you want to create a search shortcut for a \"Materials\"
element on your object record. In the Access points sub-section of the
objects section of your configuration file:

``` none
ca_objects = {
   # ------------------------------------
   _access_points = {
```

you would add the \"Materials\" access_point. Whatever you want the
shortcut to be (let\'s say \"mat\") should be included on the left side
of the equals sign:

``` none
ca_objects = {
   # ------------------------------------
   _access_points = {
       mat = {
           fields = [ca_objects.material],
           options = { DONT_INCLUDE_IN_SEARCH_FORM }
       },
```

Within the square brackets to the right of the fields equals sign, the
attribute\'s elementCode is used (following a period and the CA table
name).

Now you can quickly search for materials anywhere in your system using
the syntax:

``` none
mat:stone
```

It is also possible to create shortcuts that bundle several elements
together. A search on the access point will search all of the included
fields at the same time. Each attribute should be comma separated:

``` none
style = {
   fields = [ca_objects.material, ca_objects.medium, ca_objects.technique],
```

Remember that if you want to search for multiple words within your
single access point, quotation marks should enclose the whole string:

``` none
style:"stone sculpture"
```

A search for simply:

``` none
style:stone sculpture
```

would mean search for stone in the Materials, Medium & Technique fields
AND sculpture anywhere else. That would mostly likely also return
effective (but different) search results. Similarly, there shouldn\'t be
a space between the colon and the search term (i.e. style: stone)
because the search will \"break\" on the space and the search preformed
will be a universal query for stone.

If your target element for a search shortcut is a container, make sure
to include the full path of ca_table.elementCode.subElementTarget or:

``` none
fields = [ca_objects.description.description_source],
```

### Search forms

You may have noticed that in the code examples above an option was used:

``` none
options = { DONT_INCLUDE_IN_SEARCH_FORM }
```

This is because by default each defined metadata element will be pulled
into the available elements for building search forms. Including your
shortcut a second time would be redundant. However, if you\'re adding an
access point that isn\'t already included (say, \"filename\" which until
recently wasn\'t indexed by default but was stored in the database) you
would define it here and remove the DONT_INCLUDE_IN_SEARCH_FORM option.

Note that all fields included in an access point must be included in the
search index - they must appear in the fields list in other words. All
indexed fields automatically have access points created in the format
tablename.fieldname (ex. objects.title); indexed metadata also have
access points in the format tablename.md_\<element_id\> (ex.
objects.md_5)

### Rebuilding the search index

Changes to search_indexing.conf take effect immediately for all
subsequent indexing. Any items indexed prior to the change will not
reflect the configuration modifications. To update the entire search
index to reflect the new configuration, rebuild the index using
\"Rebuild search indices\" web interface under **Manage \> Administrate
\> Maintenance**; or reindex using the command-line caUtils
rebuild-search-index command.
