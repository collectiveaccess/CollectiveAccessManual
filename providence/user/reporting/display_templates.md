---
title: Display Template Syntax
---
# Display Template Syntax

Display templates are used to format data from
bundles (metadata elements stored in CollectiveAccess) for display on screen,
output into reports, and presentation in search results. When no display
template is defined, CollectiveAccess defaults to displaying bundle data
in the simplest possible way, typically as a semicolon-delimited list of
values. For bundles comprised of a single value (E.g. a simple text
metadata element) this is often enough. For containers – complex bundles consisting
of several discrete values, such as a mailing address – a template
is usually required to adequately format the value. 

Other cases where
bundle display templates are called for include:

> -   **To define styling**, such as headings, bold and italics around
>     bundle elements.
> -   **To format and conditionally include delimiters and suffixes
>     between values in a complex bundle**. For example, in a bundle
>     with width, length and height dimensions, "x" delimiters can be
>     placed between each dimension value. A display can be used to
>     output values in a width/length/height order (or any other order).
>     Thus a bundle with length=24", height=8" and width=3" can be
>     output as 3" x 24" x 8" ... or 3"W x 24"L x 8"H ... or 3"W x 8"H
>     if length happens to be undefined (because displays can
>     adaptively omit the delimiter and suffix).
> -   **To display data attached to related items**. For example, to
>     display both the name and life dates for related entities a bundle
>     display template can be used to extract and format the data. Any
>     data attached to the related entity can be displayed.
> -   **To display related data traversing any number of intervening
>     relationships**. As a simple example, imagine that you have an
>     object related to a collection, and the collection is related to a
>     donor. It's not necessary to catalog the donor directly on the
>     object in order to display the donor's address there, because it's
>     possible to pull the address through the intervening collection
>     relationship. Another example prevalent in film and performance
>     archives, is that objects can be related to "works" (occurrences)
>     which in turn have entity relationships ("director", "actor",
>     "choreographer"). A display template can display object
>     information alongside entity data related to a work that is
>     related to the object.
> -   **To apply one of several display formats** using expressions
>     conditional on one or more data values.


:::note
Display templates are also used extensively by Pawtucket2 for
formatting in themes. They are the preferred formatting method in
Pawtucket2, although mixed HTML/PHP coding is still supported.
:::

## Defining Templates

Default display templates can be defined for metadata elements as part
of their configuration (Configuring Metadata).
Default formatting can be overridden by additional context-specific
templates within a display or user interface.

The default template for a metadata element can be set in the
configuration interface. Display and user interface related templates
may be set in their respective configuration editors on a per-bundle
basis. When a template is defined for a metadata element within a
display or editor user interface, it will take precedence over templates
defined in the element's configuration.

## Template Syntax

At their most basic, templates are simply text with placeholders to be
replaced by bundle values. Placeholders always start with a caret (`^`)
character followed by a bundle specifier, an unambiguous identifier for
a metadata element. For example, if you have a metadata element in an
object record with the element code `description` and wish to preface the
value of the element with the label "Description:" the template would
be:

```
Description: ^ca_objects.description
```

where `ca_objects` indicates an object record and `description` is the
metadata element code.

If the value of the `description` metadata element happens to be empty,
this template will cause the label "Description:" to be awkwardly
displayed without a trailing value. To avoid unwanted blank spaces a
display template can be made conditional on the presence of a value
within a field. A template for description that only displays something
if there's a description available would look like this:

```
<ifdef code="ca_objects.description">Description: ^ca_objects.description</ifdef>
```

Everything between the `<ifdef>` and `</ifdef>` is only output for the
corresponding bundle (specified without the `^` in the `<ifdef>` tag
because it's a code, not a placeholder in this context) when it actually
has a value.

Conditional output can be used for more than just labels. For dimensions
and other collections of quantities, conditional output can be used to
deal with variations when not all values are available in all cases. For
example, let's say you have a metadata container on an object record
named `dimensions` with three sub-elements: width, height and depth, all
of which are elements of type Length. Displaying the container
`ca_objects.dimensions` without a template would result in three values
separated with semicolons, which are the default delimiter:

```
12"; 6"; 9"
```

(we assume here that we're displaying in English units)

To make it clearer we can format the container using this template:

```
^ca_objects.dimensions.width W x ^ca_objects.dimensions.height H x ^ca_objects.dimensions.depth D
```

This will display:

```
12" W x 6" H x 9" D
```

As you can see, a special syntax is used to articulate container
elements. It is no longer just `^ca_objects.dimensions` in our example,
but rather the code for the parent container along with the specific
sub-element you've chosen to display.

If the depth value happens to be blank in some cases then the output
would sometimes be like this:

```
12" W x 6" H x D
```

To rectify this we can use conditional output:

```
<ifdef code="ca_objects.dimensions.width">^ca_objects.dimensions.width W x</ifdef>
<ifdef code="ca_objects.dimensions.height">^ca_objects.dimensions.height H x</ifdef>
<ifdef code="ca_objects.dimensions.depth">^ca_objects.dimensions.depth D</ifdef>
```

Note that we can also use conditionals to close up the space between
`^ca_objects.dimensions.width` and the "W",
`^ca_objects.dimensions.height` and "H" and
`^ca_objects.dimensions.depth` and "D". Normally space is required
between the placeholder and any non-placeholder text to make clear where
the placeholder ends. With a conditional you can keep the placeholder
separate from other text without resorting to spaces, as in this
example:

```
^ca_objects.dimensions.width<ifdef code="ca_objects.dimensions.width">W x</ifdef> ^ca_objects.dimensions.height
<ifdef code="ca_objects.dimensions.height">H x</ifdef> ^ca_objects.dimensions.depth<ifdef code="ca_objects.dimensions.depth">D</ifdef>
```

If you need to make part of your template conditional upon more than one
value being set simply list the placeholder names in the `code` value
separated by commas:

```
<ifdef code="ca_objects.dimensions.width,ca_objects.dimensions.height,ca_objects.dimensions.depth">Dimensions are: </ifdef>Z ^ca_objects.dimensions.width<ifdef code="ca_objects.dimensions.width">W x</ifdef> ^ca_objects.dimensions.height<ifdef code="ca_objects.dimensions.height">H x</ifdef> ^ca_objects.dimensions.depth<ifdef code="ca_objects.dimensions.depth">D</ifdef>
```

"Dimensions are:" will only be output if width, height and depth all
have values. The text can be output if any of the values in the `code`
list are set by separating the placeholder names with `|` (aka. "pipe")
characters:

```
<ifdef code="ca_objects.dimensions.width|ca_objects.dimensions.height|ca_objects.dimensions.depth">Dimensions are: </ifdef>
^ca_objects.dimensions.width<ifdef code="ca_objects.dimensions.width">W x</ifdef>
^ca_objects.dimensions.height<ifdef code="ca_objects.dimensions.height">H x</ifdef>
^ca_objects.dimensions.depth<ifdef code="ca_objects.dimensions.depth">D</ifdef>
```

There are some cases in which you may need to make part of a template
conditional upon a value or values not being defined. The `<ifnotdef>`
tag will do this in an analogous manner to `<ifdef>`. For example, if
you want to output a "No dimensions" message when no values are defined:

```
<ifnotdef code="ca_objects.dimensions.width,ca_objects.dimensions.height,ca_objects.dimensions.depth">No dimensions are set</ifnotdef>
^ca_objects.dimensions.width<ifdef code="ca_objects.dimensions.width">W x</ifdef> ^ca_objects.dimensions.height
<ifdef code="ca_objects.dimensions.height">H x</ifdef> ^ca_objects.dimensions.depth<ifdef code="ca_objects.dimensions.depth">D</ifdef>
```

## Placeholder Options

Placeholder values may be modified by options appended as a series of
named parameters. Options are separated from the placeholder with a `%`
character and listed in `<name>=<value>` pairs delimited by `&` or `%`
characters(`&` are used in older templates, but now may be used
interchangeably with `%`). For example:

```
^ca_objects.hierarchy.preferred_labels.name%maxLevelsFromBottom=4&delimiter=_➜_
```

will output a list of hierarchical object titles consisting of the
bottom-most four titles separated by arrows. If those options were not
set they would revert to defaults, in this case the entire hierarchy
delimited by semicolons.

Any number of options may be appended to a placeholder.

Note that spaces are not allowed in options as they are used to separate
placeholders. You can use URL encoding (eg. `%20` for a space) or
underscores in place of spaces.

The following options may be used to format the text value of any
placeholder:

<table>
	<thead>
		<tr>
			<th>Placeholder</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>toUpper</td>
			<td>Forces text to all upper case when set to a non-zero value.</td>
		</tr>
		<tr>
			<td>toLower</td>
			<td>Forces text to all lower case when set to a non-zero value.</td>
		</tr>
		<tr>
			<td>makeFirstUpper</td>
			<td>Make first character of text upper case when set to a non-zero
			value.</td>
		</tr>
		<tr>
			<td>useSingular</td>
			<td>Converts label to singular when set to a non-zero value.</td>
		</tr>
		<tr>
			<td>trim</td>
			<td>Trim white space from beginning and end of value.</td>
		</tr>
		<tr>
			<td>start</td>
			<td>Trim the beginning of the text such that it begins at the specified
			character; ex. "This is a test" with start=2 will be transformed to "is
			is a test"</td>
		</tr>
		<tr>
			<td>length</td>
			<td>Truncate the text to the specified number of characters. Can be used
			with the start option to extract sections of text, or alone to ensure
			text does not go beyond a maximum length.</td>
		</tr>
		<tr>
			<td>truncate</td>
			<td>Truncates the text to the specified maximum length. The equivalent
			of setting the start option to zero and length option to the truncation
			length.</td>
		</tr>
		
		<tr>
			<td>locale</td>
			<td>Force output in the specified locale. If not specified the user's current locale is used, with fallback to other locales as necessary to ensure content is output.</td>
		</tr>
		<tr>
			<td>noLocaleFallback</td>
			<td>Disable fallback to alternate locales when content is not available in the specified locale. Default is false. [Available from version 2.0.6]</td>
		</tr>
		<tr>
			<td>stripEnclosingParagraphTags</td>
			<td>The CKEditor5 and QuillJS rich text editors automatically wrap content with
 &lt;p&gt; tags. This can introduce unwanted line breaks in display templates that format content on a 
 single line. This option strips &lt;p&gt; tags at the beginning and end of the content. Note that this will result in incorrect markup if used
 on text with multiple paragraphs. [Available from version 2.0.4]</td>
		</tr>
	</tbody>
</table>

For simple true/false options such as `toUpper` you may omit the `=` and
value. These two templates are the same:

```
^ca_objects.preferred_labels.name%trim=1
```

and

```
^ca_objects.preferred_labels.name%trim
```

## Pulling Metadata Through a Relationship

In the previous examples, data displayed is always from a particular
object record at hand – the "primary" record. Templates are always
processed relative to the primary record. If you are formatting
object search results, for example, your template will be repeatedly
evaluated for each object in the result set, with each object taking its
turn as primary. It's obvious but still worth stating: placeholders
referring directly to data in the primary (`^ca_objects.idno` for
example) derive their values from the primary. If a bundle repeats for a
record, you may get multiple values, but all values referring to the
primary will always be taken from the primary. Any record can be
primary. *Primary-ness* is simply the context is which a template is
processed.

It is often necessary to display metadata from records related to the
primary. For example, you might want to display entities related to an
object (the primary) displaying each entity's lifespan and birthplace
next to their name. Or display the related collections, with name,
access restrictions and availability information. Or perhaps a display
of objects related to the current primary object.

For simple cases displaying related data is similar to primary data. For
placeholders that refer to non-primary data CollectiveAccess will look
for records of that kind directly related to the primary. For a
`^ca_entities.preferred_labels.displayname` placeholder in a display for
object results, CollectiveAccess will pull the names of all entities
directly related to the primary object. Using our sample data:

```
^ca_entities.preferred_labels.displayname
```

will result in a list of display names for related entities, separated
by semicolons (the default delimiter):

```
George Tilyou; Elmer Dundy
```

To pull data from related records of the same kind as the primary (Ex.
objects related to an object) add "related" to the bundle specifier:

```
^ca_objects.related.preferred_labels.displayname
```

With our sample data this will result in the title of the object related
to the primary being returned. You can include "related" in specifiers
for any kind of related record but it is only required when things would
otherwise be ambiguous without it.

You may pull any data in the related entity records using similarly
constructed placeholders. For example, this template:

```
^ca_entities.preferred_labels.displayname (Life dates: ^ca_entities.life_span)
```

will return

```
George Tilyou; Elmer Dundy; (Life dates: 1865 - 1914; 1862 - 1907)
```

Each placeholder is evaluated separately and a list of values returned
in its place. To format several related data elements in a block, as
well as to display indirectly related data (such as the related entity's
birthplaces), set custom delimiters and other options a new template
directive, the `<unit>` tag, is needed.

## Formatting Templates with `<unit>`

`<unit>` tags allow you to break your templates into sub-templates that
are evaluated independently and then reassembled for final output. Using
the `<unit>` `relativeTo` attribute, the primary record of the template
may be transformed into one or more related records, repeating values
from the primary (e.g. values in a repeating container) or a set of
hierarchical values, and the sub-template evaluated for each.

`<unit>` and `relativeTo` enable a host of useful (and often complex)
formatting transformations:

-   When a record has repeating containers. Say you have a repeating
    address container on an entity record to accommodate multiple
    address changes. If you format your display template without
    specifying that each instance of the container needs to be displayed
    as a unit the result will be a single address in return, no matter
    how many addresses are entered, and each placeholder will contain
    the values for all of the addresses - a nonsensical way to display
    an address list. Wrapping the address portion of the template in
    `<unit>` tags and specifying that it be evaluated relative to the
    repeating address element, rather than the primary record itself,
    will force the template contained within to be evaluated once per
    repeating address value, resulting in an independently formatted
    value for each address. Ex.

```
 <unit relativeTo="ca_entities.address">
	 ^ca_entities.address.street_address<br/>^ca_entities.address.city, ^ca_entities.address.state ^ca_entities.address.zip_code<br/>
 </unit>
```

The `relativeTo` option in the `<unit>` tag forces the sub-template
to be evaluated once per address value in the primary record.

-   When you need to present more than one data element from related
    records side-by-side. In the previous section we saw how different
    placeholders referencing the same related records always return
    separate lists, one per placeholder. When displayed side-by-side the
    result is a series of lists rather than the discrete blocks of
    output for each related item that are more typically desired.
    `<unit>` tags make it possible to define sub-templates that are
    evaluated repeatedly, as many times as there are related records.
    Our example in the previous section reformatted with `<unit>` tags
    like this:

```
<unit relativeTo="ca_entities">^ca_entities.preferred_labels.displayname (Life dates: ^ca_entities.life_span)</unit>
```
	
results in this output:

```
George Tilyou (Life dates: 1865 - 1914); Elmer Dundy (Life dates: 1862 - 1907)
```

Here the `relativeTo` option in the `<unit>` tag shifts the primary
record to be each related entity in turn, in the sub-template
defined by the `<unit>` only.

-   When you need to set display options for part of a template.
    `<unit>` tags provide options to modify output for sub-templates.
    You can set the delimiter for repeating values using the delimiter
    option, or restrict the related items displayed by relationship type
    or related item type using restrictToRelationshipTypes and
    restrictToTypes respectively (or their counterparts
    excludeRelationshipTypes and excludeTypes). (You can also set
    options on individual placeholders, but declaring options on
    `<unit>` tags is usually more convenient and always more readable).
    Ex.

```
<unit relativeTo="ca_entities" restrictToRelationshipTypes="actor, director, producer">
	^ca_entities.preferred_labels.displayname (Life dates: ^ca_entities.life_span)
</unit>
```

-   When you need to display metadata relating to hierarchical records.
    Without the `<unit>` tag, there's no way to individually list child
    records and accompanying metadata in a display. With the `<unit>`
    tag you can display parent and/or child records and hierarchical
    paths as discrete, complex units, by making the unit `relativeTo`
    the hierarchical record set. Ex.

```
<unit relativeTo="ca_list_items.hierarchy"><p>^ca_list_items.preferred_labels.name_plural (ca_list_items.idno)</p></unit>
```

Here the `relativeTo` option in the `<unit>` tag shifts the primary
record to be each related list item in the hierarchy in turn, in the
sub-template defined by the `<unit>` only.

-   When you need to pull metadata through an indirect relationship.
    Without the `<unit>` tag only metadata from records directly related
    to the primary can be displayed in a template. In our sample data,
    this means only the entities related to the primary object can be
    displayed. The birthplace data related to each entity cannot. By
    using `<unit>` tags nested within one another and specifying the
    `relativeTo` option we can shift the primary record for a
    sub-template across any number of relationships. We might call this
    "Six Degrees of Kevin Bacon for CollectiveAccess" where A is related
    to B which is related to C. For example, if the primary is an
    object, and you need to display place data from entities related to
    objects (not places related directly to the object), the following
    template would do the job:

```
Object is ^ca_objects.preferred_labels.name;
Entities are: <unit relativeTo="ca_entities">^ca_entities.preferred_labels.displayname
(Birthplace: <unit relativeTo="ca_places">^ca_places.preferred_labels.name</unit></unit>
```
Each `unit` shifts the primary by one relational "jump." Nesting
`<units>` allows shifts to accumulate because they are always
evaluated relative to their context. Thus entities related to
objects are grabbed, and then places related to those entities.

## Attributes

`<unit>` tags may take any of the following attributes:

<table>
	<thead>
		<tr>
			<th>Attribute</th>
			<th>Description</th>
			<th>Default</th>
			<th>Supported</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>relativeTo</td>
			<td>Transforms the primary record of the template or enclosing
			<code>&lt;unit&gt;</code> (when <code>&lt;unit&gt;</code>'s are nested)
			to a set of related records, hierarchically related records or repeating
			values.</td>
			<td>None; must be set</td>
			<td></td>
		</tr>
		<tr>
			<td>restrictToTypes</td>
			<td>For <code>&lt;unit&gt;</code>'s <code>relativeTo</code> a
			relationship (eg. <code>relativeTo='ca_entities'</code>) or hierarchy
			(eg. <code>relativeTo='ca_objects.hierarchy'</code>,
			<code>relativeTo='ca_objects.parent'</code>,
			<code>relativeTo='ca_objects.siblings'</code>,
			<code>relativeTo='ca_objects.children'</code>) will restrict the record
			set to those of the specified types. Use type identifiers and list
			multiple types separated by commas.</td>
			<td>None – no restriction</td>
			<td></td>
		</tr>
		<tr>
			<td>restrictToRelationshipTypes</td>
			<td>For <code>&lt;unit&gt;</code>'s <code>relativeTo</code> a
			relationship (eg. <code>relativeTo='ca_entities'</code>) will restrict
			the record set to those related with the specified relationship types.
			Use relationship type codes and list multiple codes separated by
			commas.</td>
			<td>None – no restriction</td>
			<td></td>
		</tr>
		<tr>
			<td>excludeTypes</td>
			<td>For <code>&lt;unit&gt;</code>'s <code>relativeTo</code> a
			relationship (eg. <code>relativeTo='ca_entities'</code>) or hierarchy
			(eg. <code>relativeTo='ca_objects.hierarchy'</code>,
			<code>relativeTo='ca_objects.parent'</code>,
			<code>relativeTo='ca_objects.siblings'</code>,
			<code>relativeTo='ca_objects.children'</code>) will restrict the record
			set to those NOT of the specified types. Use type identifiers and list
			multiple types separated by commas.</td>
			<td>None – no restriction</td>
			<td></td>
		</tr>
		<tr>
			<td>excludeRelationshipTypes</td>
			<td>For <code>&lt;unit&gt;</code>'s <code>relativeTo</code> a
			relationship (eg. <code>relativeTo='ca_entities'</code>) will restrict
			the record set to those related with relationship types NOT in the list.
			Use relationship type codes and list multiple codes separated by
			commas.</td>
			<td>None – no restriction</td>
			<td></td>
		</tr>
		<tr>
			<td>sort</td>
			<td>One or more bundle specifiers to sort record set on. Specifiers
			should be relevant to the kind of records retrieved by the
			<code>relativeTo</code> value.</td>
			<td>None</td>
			<td></td>
		</tr>
		<tr>
		<td>sortDirection</td>
			<td>Direction of sort. Should be either <code>ASC</code> (ascending) or
			<code>DESC</code> (descending)</td>
			<td><code>ASC</code></td>
			<td></td>
		</tr>
		<tr>
			<td>skipIfExpression</td>
			<td>An expression to evaluate. If true the <code>&lt;unit&gt;</code>
			will be skipped and no output generated. It is necessary to escape
			(prepend a "") the surrounding quotes when using expressions.</td>
			<td>None</td>
			<td></td>
		</tr>
		<tr>
			<td>skipWhen</td>
			<td>Tests each templating iteration against an expression and skips the
			iteration if the expression evaluates true. If set all iterations are
			generated and tested, even when start and length are set.</td>
			<td>None</td>
			<td></td>
		</tr>
		<tr>
			<td>start</td>
			<td>For repeating values the index of the first value to return. Indices
			are zero-based. Ex. to start with the second value, set start to 1.</td>
			<td><code>0</code></td>
			<td></td>
		</tr>
		<tr>
			<td>length</td>
			<td>The maximum number of values to return. If not set all values are
			returned.</td>
			<td>none</td>
			<td></td>
		</tr>
		<tr>
			<td>unique</td>
			<td>Remove duplicate values in unit using direct string comparison. If
			not set all values are returned.</td>
			<td><code>0</code></td>
			<td></td>
		</tr>
		<tr>
			<td>aggregateUnique</td>
			<td>Remove duplicate values in units by comparing individual values
			prior to conversion to strings. The difference between this and unique
			is subtle. Take, for example, a unit that formats lists of authors from
			several related objects. The unique option will eliminate only those
			lists of authors that are string-wise identical If the authors are in
			different orders for different objects they will be considered unique
			values. The aggregateUnique option considers the values used to create
			those lists, rather than the resulting strings. If the array of returned
			values for a unit, prior to conversion to a string, is the same, it is
			considered a duplicate no matter the order of the authors in the
			resulting string. Put simply, aggregateUnique applies a more aggressive
			de-duplication process.</td>
			<td><code>0</code></td>
			<td></td>
		</tr>
		<tr>
			<td>omitBlanks</td>
			<td>Remove blank values from returned set. The default behavior is to
			include blanks. Omitting blank values is often desirable when formatting
			values for display.</td>
			<td><code>0</code></td>
			<td>Version 1.7.9</td>
		</tr>
		<tr>
			<td>filter</td>
			<td>A regular expression of series of text values to filter unit output
			on. Values not containing the specified text, or matching the regular
			expression will be suppressed.</td>
			<td></td>
			<td>Version 1.7.9</td>
		</tr>
		<tr>
			<td>locale</td>
			<td>Force output in the specified locale. If not specified the user's current locale is used, with fallback to other locales as necessary to ensure content is output.</td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td>noLocaleFallback</td>
			<td>Disable fallback to alternate locales when content is not available in the specified locale. Default is false.</td>
			<td></td>
			<td>Version 2.0.6</td>
		</tr>
		<tr>
			<td>filterNonPrimaryRepresentations</td>
			<td>For units relative to <code>ca_object_representations</code>,
			controls whether non-primary representations are displayed. Default is
			<code>yes</code>: non-primary representations are not displayed. Set to
			<code>0</code> or <code>no</code> to display non-primary
			representations.</td>
			<td><code>1</code></td>
			<td></td>
		</tr>
	</tbody>
</table>

The `<unit>` tag presents many opportunities for complex display
formatting which are explained in more detail, along with examples,
`here <template_unit>`.

You can limit the number of values returned from a `<unit>` operating on
a repeating value using the start and limit unit attributes described
previously. You can display text indicating how many values were not
shown using the `<whenunitomits>` tag following a `<unit>`. For example,
to show the first 5 related entities and then a message with the total
number:

```
<code>
	<unit relativeTo="ca_entities" delimiter=", " start="0" length="5">^ca_entities.preferred_labels.displayname</unit><whenunitomits> and ^omitcount more</whenunitomits>
</code>
```

The `^omitcount` placeholder can be used within the `<unit>` or
`<whenunitomits>` tag. The `<whenunitomits>` tag always refers to the
number of values omitted in the `<unit>` before it in the template and
will be suppressed when no values from the previous `<unit>` are hidden.

## Contextual Tags: `<more>` and `<between>`

Templates using `<ifdef>` and `<ifnotdef>` can get long and unruly when
they include many elements dependent on the state of multiple
placeholders. To help make such templates more manageable two tags are
available that control output based solely upon their position in a
template, obviating the need for long lists of placeholder names.

The `<more>` tag will output content if any placeholders following it
have a value. Thus this template:

```
^ca_objects.description <more><br/>The source for this was: </more>^ca_objects.description_source
```

will output this (assuming both `description` and `description_source`
are set to "A metal pan" and "1978 auction catalogue" respectively):

```
A metal pan
The source for this was: 1978 auction catalogue
```

If `description_source` was empty the output would be:

```
A metal pan
```

The `<between>` tag will output content if any placeholders before it in
the template and the placeholder directly following it in the template
have values. This makes delimiting lists of values more compact than
options using `<ifdef>`:

```
^ca_objects.dimensions.width <between>x</between> ^ca_objects.dimensions.height <between>x</between> ^depth
```

The output of this would be the defined dimensions with a single "x"
delimiter between each pair.

## Conditional Tags: `<ifdef>`, `<ifnotdef>`, `<ifcount>`, `<if>`

As mentioned earlier you can make display of portions of your template
contingent upon specified conditions by surrounding part of the template
with `<ifdef>` and `<ifnotdef>` tags. Both tags take a `code` attribute
containing one or more bundle specifiers. If the value for the bundle is
not empty `<ifdef>` will display the portion of the template it
encloses. Conversely, if the value is empty `<ifnotdef>` will display
the content it encloses.

### `<ifdef>` and `<ifnotdef>`

For example:

```
Title: ^ca_objects.preferred_labels.name <ifdef code="ca_objects.description">Description: ^ca_objects.description</ifdef>
```

will display the value for the "title field" followed by the "description" field if not empty. 
Note that the specifier in the `code` attribute is not a placeholder and
therefore does not take a `^` prefix.

You can make `ifdef` and `ifnotdef` contingent upon more than one bundle
by listing them in the `code` attribute separated by commas or pipes
(`|`). When separated by commas, all of the bundles must be defined
(`<ifdef>`) or not defined (`<ifnotdef>`) for the tag to display
content. When separated by pipes, any of the bundles defined (`<ifdef>`)
or not defined (`<ifnotdef>`) will cause the tag to display content.

### `<ifcount>`

The `<ifcount>` tag controls display of content based upon the number of
values available from the bundle specifier in `code`. It is useful when
you wish to only show content when the number of values a bundle has is
within a range. For example, if you wish to show a list of related
entities only when there are between 2 and 5 relationships:

```
<ifcount code="ca_entities.related" min="2" max="5">Related entities: ^ca_entities.preferred_labels.displayname</ifcount>
```

You can show content whenever the count is greater than a number by
omitting the `max` attribute:

```
<ifcount code="ca_entities.related" min="2">Related entities: ^ca_entities.preferred_labels.displayname</ifcount>
```

If the `min` attribute is omitted it is assumed to be zero.

To only show content when the count is a specific number set both `min`
and `max` to the same number:

```
<ifcount code="ca_entities.related" min="1" max="1">Related entity: ^ca_entities.preferred_labels.displayname</ifcount>
```

### `<if>`

The `<if>` tag provides maximum control by using
`expressions <expressions>` to determine when content is displayed. For
example, to output the display only if `current` is selected from the
type drop-down in a repeating credit line container:

```
<unit relativeTo="ca_objects.credit_line"><if rule="^credit_type =~ /current/">^ca_objects.credit_line.credit_text
(^ca_objects.credit_line.credit_type)</if></unit>
```

The `rule` attribute must be set to a valid expression, which can use
any valid placeholder available in the template.

Both `<ifcount>` and `<ifdef>` include blank values in their evaluation.
From version 1.7.9 blank values may suppressed by setting the optional
`omitBlanks` to a non-zero value. This is often useful when formatting
data for display. If `omitBlanks` is set, `<ifcount>` will return the
number of non-blank values; `<ifdef>` will evaluate as true only if the
bundle has at least one non-blank value. Note that `<if>` does not
support the `omitBlanks` option. You must filter blank values in the
expression.

## Even More Conditional: The `<case>` Tag

Sometimes you need to to choose from one of several templates based upon
varying criteria. For instance, when listing entities related to an
object you might want to vary the text before the list with respect to
the number of entities being listed. There are ways to do this with
display templates, but the cleanest way is with a `<case>` tag:

```
<case>
	 <ifcount code="ca_entities.related" max="0">No related entities</ifcount>
	 <ifcount code="ca_entities.related" min="1" max="1">Related entity: ^ca_entities.preferred_labels.name</ifcount>
	 <ifcount code="ca_entities.related" min="2">Related entities: ^ca_entities.preferred_labels.name%delimiter=,_</ifcount>
</case>
```

The `<case>` tag evaluates each `<ifcount>` tag in order and stops at
the first one that results in output. You can include templates
beginning with `<ifdef>`, `<ifnotdef>` and `<if>` as well as
`<ifcount>`. If a `<unit>` tag is included as the last template in a
`<case>` it will be used as the default in case no other template
results in output.

Because `<case>` tags stop evaluating as soon as they find a template
with output they are generally the best performing way to choose a
template from a list of possibilities.

## Expressions

It's also possible to output the result of `expressions <expressions>`
as-is. A use case for this is making certain statistics about your
metadata searchable. For instance, you could use
`Prepopulate <prepopulate_config>` to always keep the current number of
entity relationships for your objects in a hidden (but searchable and
sortable) field.

Usage of the `<expression>` tag is simple: Anything inside the tag is
treated as an `expression <expressions>`. You can use your typical
caret-prefixed bundle placeholders and even `<unit>` tags. Unit tags get
evaluated/replaced first when CollectiveAccess runs display templates,
so you can use the result of a `<unit>` tag in your expression. Here are
a few basic examples:

```
<expression>5 + 4</expression>
<expression>length(^ca_objects.preferred_labels)</expression>
```

This one outputs related entity names and their string lengths:

```
<unit relativeTo="ca_entities">^ca_entities.preferred_labels, <expression>length(^ca_entities.preferred_labels)</expression></unit>
```

The following counts the number of entity relationships for the current
record. We use a `<unit>` tag to generate the parameters for the
`sizeof` function.

```
<expression>sizeof(<unit relativeTo="ca_entities" delimiter=",">^ca_entities.entity_id</unit>)</expression>
```

This one calculates the age of Alan Turing:

```
<expression>age("23 June 1912", "7 June 1954")</expression>
```

## Formatting Hierarchical Displays

Many types of records can be arranged hierarchically. To get some or all
of the hierarchy for display use a hierarchical bundle specifier. This
is just a normal specifier with a hierarchical modifier (`hierarchy`,
`parent`, `children`) added. As of version 2.0, two additional
modifiers, `descendants` and `branch` are available.

For example, for an `object` primary, a
`^ca_objects.hierarchy.preferred_labels.name` placeholder will return
the names of all objects in the hierarchy from top to bottom. You'll
probably want to set a delimiter between each item in the hierarchy. You
can do so by adding a `placeholder` option: append a percent sign and
`delimiter=<my delimiter>` to the bundle specifier, like so:

```
^ca_objects.hierarchy.preferred_labels.name%delimiter=_➔_
```

When setting the delimiter, **underscores** are used in place of spaces.
Spaces are used to delimit individual bundle specifiers, so you can't
have the delimiter floating out past a space associated with the
specifier. The underscores will be converted to spaces for display.

You can get more control over hierarchy displays using a `<unit>` set
relative to a hierarchy. For our object primary:

```
<unit relativeTo="ca_objects.hierarchy">^ca_objects.preferred_labels.name (^ca_objects.idno)</unit>
```

will evaluate the `<unit>` for each record in the hierarchy in turn set
to primary. Related data can be accessed as well, and additional
`<unit>`'s can be specified within.

The `parent` and `children` modifiers work similarly to `hierarchy` but
return the immediate parent of a record or its immediate children
respectively. The `descendant` modifier returns all records below a
given record. The `branch` modifier is similar to `descendants` but
includes the given record along with its descendants.

There are a number of placeholder options that can be used to modify how
hierarchical data is displayed:

<table>
	<thead>
		<tr>
			<th>Option</th>
			<th>Description</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>delimiter</td>
			<td>Text to use as delimiter for multiple values.</td>
			<td>;</td>
		</tr>
		<tr>
			<td>maxLevelsFromTop</td>
			<td>Restrict the number of levels returned to the top-most beginning
			with the root.</td>
			<td>None</td>
		</tr>
		<tr>
			<td>maxLevelsFromBottom</td>
			<td>Restrict the number of levels returned to the bottom-most beginning
			with the lowest level.</td>
			<td>None</td>
		</tr>
		<tr>
			<td>hierarchyDirection</td>
			<td>Order in which to return hierarchical levels. Set to either "asc" or
			"desc". "asc"ending returns hierarchy beginning with the root;
			"desc"ending begins with the child furthest from the root.</td>
			<td>asc</td>
		</tr>
		<tr>
			<td>allDescendants</td>
			<td>Return all items from the full depth of the hierarchy when fetching
			children using the children modifier. By default only immediate children
			are returned. As of version 2.0 you may use the "descendants" hierarchy
			modifier in place of this option. They are synonymous.</td>
			<td>FALSE</td>
		</tr>
	</tbody>
</table>

## Making Links to Other Records

The `<l>` tag may be used to create links within the template. The links
will always point to the primary record. In Providence the link will
lead to the *editing interface* for the record; in Pawtucket the link
will be to the *detail display* for the record. It is possible to write
plugins that override this behavior and create other sorts of links.

Any stretch of the template may be made into a link. For example,
assuming the primary is an entity:

```
<l>^ca_entities.preferred_labels.displayname</l> <ifdef code="ca_entities.address.address1">(</ifdef>^ca_entities.address.address1
<ifdef code="ca_entities.address.address1">)</ifdef>
```

Clicking on the entity name in Providence would take a cataloguer to the
*editor* for the entity record; in Pawtucket it leads to the *detail*
for the entity.

Links always point to the primary record. If you use `<l>` tags within a
`<unit>` the links will be to the primary within the `<unit>`.

## Using HTML

You can freely use HTML tags for formatting within your templates, so
long you follow the rules and use well-formed markup. Be sure to close
any tag you open. The special template tags such as `<ifdef>` count in
terms of well-formedness even though they don't display. This, for
instance, is not correct and will render unpredictably:

```
<l>^ca_occurrences.preferred_labels.names</l> <ifdef code="ca_occurrences.exhibit_date">(Dates: </ifdef>^ca_occurrences.exhibit_date
<ifdef code="ca_occurrences.exhibit_date">)</ifdef> ^ca_occurrences.description
```

Notice that the `<b>` tag in the first `<ifdef>` is not closed before
the closing `</ifdef>`, producing invalid markup. There is a `</b>` tag
later on but this too is taken on its own due to the enclosing `<ifdef>`
tags. The correct way to write this template is:

```
<l>^ca_occurrences.preferred_labels.names</l> <ifdef code="ca_occurrences.exhibit_date"><b>(Dates: ^ca_occurrences.exhibit_date
</b></ifdef> ^ca_occurrences.description
```

## Special Placeholders

There are a few placeholders that have special meanings for certain
kinds of primary records:

<table>
	<thead>
		<tr>
			<th>Placeholder</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>^date</td>
			<td>Displays the current date. Valid in any template regardless of the
			kind of primary. Date is formatted as "day month year" (ex. "10 January
			2014") unless a format is specified using the format placeholder option.
			The option takes a PHP date()-style formatting string. See [1]. (Ex.
			<code>^date%format=c</code>)</td>
		</tr>
		<tr>
			<td>^relationship_typename</td>
			<td>Displays the name of the relationship type when the primary is a
			relationship record such as <code>ca_objects_x_entities</code>. Note
			that templates pulling related records in bundle displays are evaluated
			relative to the primary representing the relationship, not the related
			record. Thus this and the other <code>^relationship_*</code>
			placeholders are available by default when pulling related data in
			bundle displays</td>
		</tr>
		<tr>
			<td>^relationship_type_id</td>
			<td>The internal numeric <code>type_id</code> for the relationship type
			when the primary is a relationship record such as
			<code>ca_objects_x_entities</code>.</td>
		</tr>
		<tr>
			<td>^relationship_typecode</td>
			<td>The alphanumeric code for the relationship type when the primary is
			a relationship record such as <code>ca_objects_x_entities</code>.</td>
		</tr>
		<tr>
			<td>^primary</td>
			<td>Displays the name of the primary for the template or current
			<code>&lt;unit&gt;</code> sub-template. This can be useful for
			debugging.</td>
		</tr>
		<tr>
			<td>^count</td>
			<td>Displays the number of values in the current primary for the
			template or current <code>&lt;unit&gt;</code> sub-template.</td>
		</tr>
		<tr>
			<td>^index</td>
			<td>Displays the one-based index of the current value in the primary or
			<code>&lt;unit&gt;</code> sub-template. As a <code>&lt;unit&gt;</code>
			iterates through each value <code>^index</code> will increment by one
			until it reaches <code>^count</code>.</td>
		</tr>
	</tbody>
</table>

As of version 1.7.9 there are also several special placeholders
available for object representations that return pre-formatted
media-specific metadata. Use them like
`^ca_object_representations.<placeholder>`.

These are typically used to format display text in lists of object
representations:

<table>
	<thead>
		<tr>
			<th>Placeholder</th>
			<th>Description</th>
			<th>Options</th>
			<th>Examples</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>transcription_count</td>
			<td>Number of user-generated transcriptions attached to the
			representation.</td>
			<td></td>
			<td>1</td>
		</tr>
		<tr>
			<td>page_count</td>
			<td>Number of pages in a multipage document. Will be null when not
			applicable.</td>
			<td></td>
			<td>10</td>
		</tr>
		<tr>
			<td>preview_count</td>
			<td>Number of previews available for a multipage document ot timebased
			media. Will be null when not applicable. This is a synonym for
			page_count</td>
			<td></td>
			<td>10</td>
		</tr>
		<tr>
			<td>media_dimensions</td>
			<td>Pixel dimensions for the media, formatted for display.</td>
			<td><code>version = &lt;version&gt;</code>. Default is
			<code>original</code>.</td>
			<td>1024p x 2048p</td>
		</tr>
		<tr>
			<td>media_duration</td>
			<td>Duration of timebased media, formatted for display.</td>
			<td>* <code>durationFormat = format</code>. Use <code>delimited</code>
			for delimited format, <code>hms</code> for hours/minutes/seconds,
			<code>hm</code> for hours/minutes and <code>seconds</code> for output in
			seconds. Default is <code>hms</code>. *
			<code>version = &lt;version&gt;</code>. Default is
			<code>original</code>.</td>
			<td>1h 24m 10s</td>
		</tr>
		<tr>
			<td>media_class</td>
			<td>General type of originally uploaded media. Possible values are
			<code>image</code>, <code>video</code>, <code>audio</code>, and
			<code>document</code>.</td>
			<td></td>
			<td><code>image</code></td>
		</tr>
		<tr>
			<td>media_format</td>
			<td>Format of originally uploaded media, for display.</td>
			<td></td>
			<td><code>JPEG, TIFF</code></td>
		</tr>
		<tr>
			<td>media_filesize</td>
			<td>File size of media, formatted for display.</td>
			<td><code>version = &lt;version&gt;</code>. Default is
			<code>original</code>.</td>
			<td><code>43.2mb</code></td>
		</tr>
		<tr>
			<td>media_colorspace</td>
			<td>Colorspace of media, formatted for display.</td>
			<td><code>version = &lt;version&gt;</code>. Default is
			<code>original</code>.</td>
			<td><code>RGB, CMYK</code></td>
		</tr>
		<tr>
			<td>media_resolution</td>
			<td>Pixel resolution of media, formatted for display. May not be
			available for all file formats</td>
			<td><code>version = &lt;version&gt;</code>. Default is
			<code>original</code>.</td>
			<td><code>300ppi</code></td>
		</tr>
		<tr>
			<td>media_bitdepth</td>
			<td>Bit depth of media, formatted for display. May not be available for
			all file formats.</td>
			<td>version = version to use. Default is <code>original</code>.</td>
			<td>8bpp</td>
		</tr>
		<tr>
			<td>media_center_x</td>
			<td>X-coordinate of user-set center crop point for image media.
			Coordinate is a decimal fraction of the width of the image.</td>
			<td></td>
			<td>0.43</td>
		</tr>
		<tr>
			<td>media_center_y</td>
			<td>Y-coordinate of user-set center crop point for image media.
			Coordinate is a decimal fraction of the width of the image.</td>
			<td></td>
			<td>0.22</td>
		</tr>
	</tbody>
</table>

## Splitting Apart a Date Range into Separate Data Points

Single date values that are expressed as ranges (e.g. 2000-2018) can be
parsed into separate data points for start and end dates. For example,
if you wish to export to MS Excel and would like distinct columns for
the first and last dates in the range. You can do so with the following
syntax:

```
^ca_objects.your_date_element_code%start_as_iso8601=1
^ca_objects.your_date_element_code%end_as_iso8601=1
```
