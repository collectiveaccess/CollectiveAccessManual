---
title: PDF Output
---

-   [How PDF Templates are Evaluated](#how-pdf-templates-are-evaluated)
-   [Creating PDF Formats](#creating-pdf-formats)
-   [For all results (Browse or
    Search)](#for-all-results-browse-or-search)
-   [For Search Results](#for-search-results)
-   [For Browse Results](#for-browse-results)
-   [For Summaries](#for-summaries)
-   [For Labels](#for-labels)
-   [Using View Variables](#using-view-variables)
-   [Setting the Download File Name](#setting-the-download-file-name)
-   [Displaying Barcodes](#displaying-barcodes)
-   [Supported Bar Code Formats](#supported-bar-code-formats)
-   [Rendering Engines](#rendering-engines)
-   [Testing Labels](#testing-labels)

CollectiveAccess can output data as formatted PDFs in several contexts:

1.  As a **Report** presenting formatted data from the results of a
    search or browse.
2.  As a **Summary** of data from an individual item
3.  As a set of **Printable Labels** including formatted data from items
    retrieved from the results of a search or browse.
4.  As **formatted letters and documents** (eg. deeds of gift, thank you
    letters, receipts) for an object or lot.
5.  As a **formatted summary or invoice** from a metadata element, or a
    specific repeat of a metadata element.

PDF output in CollectiveAccess is generated from an HTML/CSS page layout
using templates stored in the app/printTemplates. The HTML output by
these templates is converted to PDF using one of several rendering
engines. Any PDF output format can be modified or customized by editing
or adding templates in app/printTemplates.

The HTML templates are standard views, the same as any other in the
CollectiveAccess application. You can use PHP code with the view and
include subviews using \$this-\>render(). For label and summary views
you can also use the \{\{\{variable\}\}\} tag format to include variables and
display templates directly in your HTML -- no PHP required. The
variables passed to the template view vary by context and are described
below.

# How PDF Templates are Evaluated

When a PDF output is requested, CollectiveAccess loads the specified
template views and provides them with the data required for display. The
view is then evaluated: any executable in the view is run and
substitution of curly-brace tags is performed. The transformed HTML text
of the view is then passed to dompdf for conversion to a PDF.

The evaluation process varies somewhat by context:

**Report templates** are passed a result set and evaluated as a single
page. The template is provided with a search result instance (subclass
of SearchResult) and expected to render a full HTML page for the entire
result set. This is typically done with embedded PHP code.

**Summary templates** are similarly evaluated as a single page, but are
provided with the model instance (subclass of BaseModel) for the item
being summarized rather than a result set. Letter templates work
similarly to summaries.

**Label templates** are evaluated once per label and placed on the page
by the PDF generator in the appropriate location for the selected label
format. Label templates are passed a model instance for the item for
which the label is being produced.

# Creating PDF Formats

The *app/printTemplates* directory contains subdirectories for each
context -- results (aka. report), summary, labels, letter and element.
Directly within those directories are the standard formats and
supporting files for each context.

Custom, printable templates can be added by creating new files in the
local directory contained within.

:::note
Although templates placed directly in the context directory will work
normally, they may be overwritten during application updates. Always
place custom templates in local.
:::

Custom formats must generate a full, freestanding and well-formed HTML
document. It also must include a header with basic information about the
template and how it is to be used. The header is a collection of named
values, with all names beginning with the **@** character. The following
values are required:

| Name | Value | Description|
|----|----|----|
| @name  | Text | The name of the template. Will be used in the user interface to refer to the template. Must be unique with the context.|
|@type |    One of: page, pageStart, pageEnd, fragment  | Indicates the role of the file within the template. Files of \@type "page" are treated as templates by CollectiveAccess. All others are treated as sub-components to be included by a "page." "pageStart" files should contain content to be output before the page, "pageEnd" should contain content to be output after the page. \@type "fragment" indicates a file that will be included within the body of a page. NOTE: this option is available from version 1.7.6.|
|@pageSize |   letter, legal, A4 (most common) | The full list is: 4a0, 2a0, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, ra0, ra1, ra2, ra3, ra4, sra0, sra1, sra2, sra3, sra4, letter, legal, ledger, tabloid, executive, folio, commerical #10 envelope, catalog #10 1/2 envelope, 8.5x11, 8.5x14, 11x17|
| @pageOrientation | One of: letter, landscape    |
| @tables | ca_objects, ca_entities or any other primary table separated with commas, or \* for all tables | Restricts the template to one or more tables. If restricted, CollectiveAccess will only use the template when dealing with records from the specified tables(s).|
|@restrictToTypes | type code for record |Limits which record type the template will be available for. |
|@showOnlyIn| List including any of the following, separated by commas: search_browse_thumbnail, search_browse_full, search_browse_list, editor_relationship_bundle|Restrict visibility of template to one or more specific areas in the user interface. The search_browse_\* values restrict access to search/browse results with a given view selected (thumbnails/full/list). editor_relationship_bundle restricts the template to the list of export options displayed on relationship bundles in record editors. If \@showOnlyIn is omitted the template will be visible in all relevant areas. **NOTE**: this option is available from version 1.7.6.|
 
                                                                                                                    
For labels the following additional header entries defining the geometry
of the label form are also required:

| Name | Value | Description|
|----|----|----|
|@marginLeft|Measurement|The distance from the left edge of the page to the left side of the first label|
|@marginRight  |Measurement|The distance from the right edge of the page to the right side of the first label|
|@marginTop  |Measurement|The distance from the top of the page to the top of the first label|
|@marginBottom |Measurement|The distance from the bottom of the page to the bottom of the first label|
|@horizontalGutter| Measurement |The distance between each row of labels|
|@verticalGutter |Measurement|The distance between each column of labels|
|@labelWidth |Measurement| The width of a label|
|@labelHeight |Measurement|The height of a label|


All measurements require a numeric values followed by a unit specifier.
Allowable units are:

| Units | Specifier |
|----|----|
|Inches | in|
|Centimeters |cm|
|Millimeters |mm|
|Pixels|px|
|Points|p|

The header should be in an HTML or PHP comment. Here is an example
header in a PHP comment:

``` 
/*
* Template configuration:
*
* @name Avery 8164
* @type label
* @pageSize letter
* @pageOrientation portrait
* @tables ca_objects
* @marginLeft 0.125in
* @marginRight 0.125in
* @marginTop 0.25in
* @marginBottom 0.25in
* @horizontalGutter 0in
* @verticalGutter 0.25in
* @labelWidth 4in
* @labelHeight 3.375in
*/
```

From CollectiveAccess Version 1.7, you can temporarily disable a
template using the \@disable header setting. Simply set it to a non-zero
value to remove the template from use.

Your template view will be provided with a set of variables to work with
that is dependent upon the context. Below is a list of variables by
template context:

# For All Results (Browse or Search)

| Variable | Description | Example values|
|----|----|----|
|base_path| The absolute server path to the directory containing the current view|                     
|target|The table the results set is from |ca_objects, ca_entities |                                                   
|result_context|           An instance of ResultContext for the current find action                                  
|num_hits|                 The number of items in the result set                                                     
|num_pages|                The number of pages in the result set                                                     
|current_items_per_page|   The number of items per page                                                              
|page |                    The current page number                                                                   
|result|                   An instance inheriting from SearchResult representing the result set                      
|current_sort |            The current sort field                                                                    
|current_sort_direction|   The direction of the current sort|    ASC, DESC   |                                                  
|t_subject|                An instance of the model representing the current result set, inheriting from BaseModel   
|bottom_line|              An array with aggregate statistics (if configured)                                        

# For Search Results

| Variable | Description | Example values|
|----|----|----|
|search |    The search expression  | 

# For Browse Results

| Variable | Description | Example values|
|----|----|----|
|browse|An instance of BrowseEngine representing the current browse||
|criteria |An array of current browse criteria||
|available_facets |An array of available browse facets||
|available_facets_as_html_select|An HTML \<select\> tag with available facets||
|facets_with_content |An array of facets that have content to show||
|facet_info |An array with specification for all facets||
|browse_criteria  |Simplified array of current browse criteria for display, with keys set to facet label and values set to a delimited list of facet values||


# For Summaries

| Variable | Description | Example values|
|----|----|----|
|t_subject|A model instance for the item being displayed||
|display_id |The numeric id of the current display||
|base_path|The absolute server path to the directory containing the current view||
| t_display|An instance of the ca_bundle_displays model loaded with the current display              ||
|bundle_displays_placements|An array of placements in the currently loaded display. Array indices are display_id\'s, values are array of display configuration data||
 

# For Labels

| Variable | Description | Example values|
|----|----|----|
|base_path|The absolute server path to the directory containing the current view||
|title|The title of the label set||
                                           

# Using View Variables

The variables provided may be accessed via PHP code within the view by
calling the view\'s setVar() method with the variable name. This code
fragment will print out the current search phrase for search result
views:

``` 
<?php print $this->getVar('search'); ?>
```

For label and summary views, an alternative PHP-free \{\{\{variable\}\}\}
syntax can also be used. Surrounding the name of the variable with
sequences of three curly-braces will cause its value to be substituted
into the view.

:::note
These curly-brace tags should be placed in the HTML of your view. They
are not valid PHP and will cause errors if placed within PHP code. The
curly-brace syntax is not available in results views.
:::

In addition to variables, display templates may also be evaluated and
output using the curly-brace syntax. For example:

``` 
{{{Identifier is ^ca_objects.idno and titles is ^ca_objects.preferred_labels.name}}}
```

would cause the text to be output with the \^-prefixed data
specifications substituted with values.

# Setting the Download File Name

A custom file name for downloaded PDFs can be generated from your view
template by setting the \@filename header entry.

From CollectiveAccess Version 1.7.6, your template view can also specify
the file name for the downloaded PDF by setting the \"filename\" view
variable. Because this value is set using PHP code it can be set
dynamically based upon report parameters, user settings or anything else
you can access. View variables are set using the view\'s setVar() method
with the variable name (\"filename\") and the desired filename:

``` 
<?php print $this->setVar('filename', 'my_custom_report_file.pdf'); ?>
```

If you don\'t set a file name a default name will be used.

# Displaying Barcodes

Bar codes may be output in any view using the PHP caGenerateBarcode()
helper function. Simply pass it the value to be encoded and an array of
options that include the type of barcode and size of the code and a path
to a PNG file displaying the bar code is returned. You can then
construct and \<img\> tag within the view or do other processing. It is
your responsibility to remove the generated PNG file, any of which will
be in the system tmp directory, when you are done.

For example:

``` 
<?php $vs_path = caGenerateBarcode('$ps_identifier, array('checkValues' => $this->opa_check_values, 'type' => 'code128', 'height' => 12)); print "<img src='".$vs_path."'/>"; ?>
```

For views that support curly-brace syntax, you may also pass a special
barcode template in the format barcode:\<type\>:\{size\}:template. For
example:

``` 
{{{barcode:code128:12:^ca_objects.idno}}}
```

# Supported Bar Code Formats

| Type Code | Description | Example values|Notes|
|----|----|----|----|
|code128|A high-density barcode symbology. It is used for alphanumeric or numeric-only barcodes. It can encode all 128 characters of ASCII and, by use of an extension character (FNC4), the Latin-1 characters defined in ISO/IEC 8859-1. |barcode:code128:10:\^ca_objects.idno|Size is height in pixels. Width will be set as required.|
|code39|Also known as Alpha39, Code 3 of 9, Code 3/9, Type 39, USS Code 39, or USD-3. A variable length, discrete barcode symbology supporting 43 characters, including numbers, upper-case letters and a handful of punctuation.|barcode:code39:10:\^ca_objects.idno|Size is height in pixels. Width will be set as required.|
|qrcode|QR code (abbreviated from Quick Response Code) is the trademark for a type of matrix barcode (or two-dimensional barcode) first designed for the automotive industry in Japan. A barcode is a machine-readable optical label that contains information about the item to which it is attached. A QR code uses four standardized encoding modes (numeric, alphanumeric, byte / binary, and kanji) to efficiently store data; extensions may also be used.|barcode:qrcode:5:\^ca_objects.external_url.link|Size is a pixel size multiplier and should be set to a value between 1 and 8, with larger values corresponding to larger QRCode output.|
|postnet|POSTNET (Postal Numeric Encoding Technique) is a barcode symbology used by the United States Postal Service to assist in directing mail. The ZIP Code or ZIP+4 code is encoded in half- and full-height bars.\[1\] Most often, the delivery point is added, usually being the last two digits of the address or PO box number.|barcode:postnet:\^ca_objects.address.zip_code  |Size is ignored. Both height and width will be set as necessary.|

# Rendering Engines

Conversion of HTML generated by templates to PDF is performed by a
rendering engine installed on the server. There are several choices to
select from.

CollectiveAccess comes with plugins that allow the software to use three
of the most common rendering engines. Support for other engines can be
added by coding additional plugins.

Currently supported rendering engines include:

| Engine | Description | URL |Notes|
|----|----|----|----|
|domPDF|A rendering engine implemented entirely in PHP. Its main advantage is that it requires no additional installation or special software. If CA can run then domPDF will be available. Primary downsides are performance and render quality, both of which can be unacceptably terrible as your output grows in size and/or complexity. Rendering times for domPDF often grow exponentially with respect to document size, making long document output (dozens of pages) potentially problematic.|http://dompdf.github.io||
|wkhtmltopdf|The WebKit rendering engine that drives the Chrome and Safari web browsers packaged as a server-side HTML/CSS to PDF converter. Advantages are speed and render quality. It is generally 2-100 times faster than domPDF and can handle more complex documents accurately. Downsides are the need to install wkhtmltopdf software on your server, the lack of support for it on most shared servers and incompatibility of some versions with CA (see notes).       |http://wkhtmltopdf.org|Scaling of output in the current version, 0.12.2, is broken resulting in output that cannot be accurately printed. Use version 0.12.1 instead.|
| phantomjs|     Another WebKit-based HTML/CSS to PDF converter. It has the same installation, performance and quality advantages and disadvantages over domPDF as wkhtmltopdf.                                                                                                                                                                                                                |http://phantomjs.org|This engine is deprecated and no longer actively supported. PhantomJS code will be stripped from version 1.8 |
  
If using a non-domPDF renderer, be sure that the path to the
command-line render application is set properly in
external_applications.conf. Selection of the renderer is automatic, with
wkhtmltopdf or PhantomJS if present used in preference to domPDF.

# Testing Labels

When testing your label layouts, setting the add_print_label_borders
directive in app.conf to a non-zero value will cause outlines to display
on the borders of all printed labels.
