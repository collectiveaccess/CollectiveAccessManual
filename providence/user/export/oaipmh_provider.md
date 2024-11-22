---
title: OAI-PMH Provider
---

# OAI-PMH Provider

-   [oai_provider.conf Configuration](#oai_provider.conf-configuration)
-   [Format Definition](#format-definition)
-   [Testing Your Setup](#testing-your-setup)
-   [DPLA](#dpla)

CollectiveAccess features an implementation of the [OAI Protocol for
Metadata Harvesting](http://www.openarchives.org/pmh/) that serves
database records using virtually arbitrary XML-based formats. It
supports all requests [defined in the
protocol](http://www.openarchives.org/OAI/openarchivesprotocol.html#ProtocolMessages)
and is made possible through the Data_Exporter framework.

In order to make your data available via OAI-PMH you first have to
create at least one XML mapping for the data exporter. Data providers
are required to provide at least [Dublin
Core](https://en.wikipedia.org/wiki/Dublin_Core) so we suggest you start
with that. You can, however, provide any number of formats so long as
you create the corresponding export mappings in CollectiveAccess.

For now we assume that you created a mapping with the code \'oai_dc\'
that describes how your data is mapped to Dublin Core XML.

# oai_provider.conf Configuration

This is the core configuration file for this feature. If you want to
provide only one the Dublin Core mapping you just created, you\'re
pretty much good to go with the stock configuration. Just fill in the
mapping code. The interesting part of the configuration is under the
\'providers\' key. Here you can define an arbitrary number of endpoints
where harvesters can go and gather your data. You could, for instance,
define 1 endpoint for your object/item records and one for your
collections. Each of those is a full-fledged standalone OAI-PMH provider
accessible via the following URL pattern:

``` none
http://www.mydomain.org/service.php/OAI/<provider_key>
```

In the default config there\'s only one provider with the code \'dc\'.
It can be accessed like so:

``` none
http://www.mydomain.org/service.php/OAI/dc
```

Within each provider configuration you have a number of available
settings. They are described in the table below.

|Setting| Description | Example value |
|----|----|----|
|name|Used as repositoryName for the response to the Identify verb. By default it is imported from your setup.php.|My repository|
|admin_email|Used as adminEmail for the response to the Identify verb. By default it is imported from your setup.php|me@mydomain.org|
|setFacet|A browse.conf facet code used to divide the data set you’re providing into so called ‘sets’ (OAI terminology, not necessarily equivalent to CollectiveAccess sets) and build the response to the ListSets verb. By default associated collections are used.|collection_facet|
|query|Search query that allows you to impose arbitrary restrictions on the record set that is being provided. By default all records (‘*’) are served.|ca_objects.idno:0001*|
|formats|List of the metadata formats that are available for this provider. Further information on the format definition is below.|see below|
|default_format|Code of the format to use if the metadataPrefix argument is omitted, i.e. if the harvester doesn’t specify which format he wants. You should almost always serve basic Dublin Core in those cases.|oai_dc|
|identiferNamespace|Namespace to use to build globally unique identifiers from your local CollectiveAccess record ids. The identifiers look like this: `oai:<namespace>:<localID>`|whirl-i-gig.com|
|dont_enforce_access_settings|if set, no access checks are performed|0|
|public_access_settings|list of values for ‘access’ field in objects, entities, places, etc. that allow public (unrestricted) viewing|[1]|
|privileged_access_settings|list of values for ‘access’ field in objects, entities, places, etc. that allow privileged viewing (ie. user in on a privileged network as defined below)|[1,2]|
|privileged_networks|List of IP address to consider “privileged” (can see items where access = 1 or 2) It is ok to use wildcards (“*”) for portions of the address to create class C or B addresses, e.g. 192.168.1.5, 192.168.1.* and 192.168.*.* are all valid and increasingly broad|[192.168.6.*]|
|dont_cache|Determines if search or browse results used to built responses are cached or not|1|
|show_deleted|Determines if deleted records are included in list responses|0|


# Format Definition

The definition of a single format used by a provider configures the
exporter mapping that should be used for this format as well as some
metadata about the format itself. The type of records served (objects,
entities, \...) is defined by the exporter mapping. We strongly
recommend not to mix mappings for different types in one provider. If
you want to provide, say, your objects and your collections, you should
configure 2 separate providers to do this, otherwise harvesters could
get inconsistent results for the same identifiers.

The key of the format definition is the so called
[metadataPrefix](http://www.openarchives.org/OAI/openarchivesprotocol.html#MetadataNamespaces).
It is used to address these formats in OAI-PMH requests (and also for
the \'default_format\' setting).

|Setting| Description | Example value |
|----|----|----|
|mapping|Code of the exporter mapping to use for this provided format|oai_dc|
|schema|Used only to describe this format for the ListMetadataFormats verb. If you want schema definitions to appear in the protocol responses, they should be part of your export mapping.|http://www.openarchives.org/OAI/2.0/oai_dc.xsd|
|metadataNamespace|Used only to describe this format for the ListMetadataFormats verb. If you want namespace definitions to appear in the responses, they should be part of your export mapping.|http://www.openarchives.org/OAI/2.0/oai_dc/|




An example configuration with only one format (metadataPrefix: oai_dc)
served by the provider could look like this:

``` none
formats = {
oai_dc = {
    mapping = ca_objects_oai_dc,
    schema = http://www.openarchives.org/OAI/2.0/oai_dc.xsd,
    metadataNamespace = http://www.openarchives.org/OAI/2.0/oai_dc/,
}
},
```

# Testing Your Setup

To explore your collection using the OAI-PMH provider you just set up,
you can for instance use the [OAI Repository
Explorer](http://re.cs.uct.ac.za/) maintained by the University of Cape
Town. This tool obviously only works if your provider is accessible
online. You can also test the results by accessing provider via the
following:

``` none
https://mydomain.com/service.php/OAI/dc?verb=ListRecords&metadataPrefix=oai_dc
```

Be sure to change out the metadataPrefix if it something other than
oai_dc.

# DPLA

Partner hubs of the [Digital Public Library of America](https://dp.la/)
can provide metadata to the DPLA by setting up an OAI-PMH provider
servicing data in either DublinCore, MARC, or MODS. Consult with the
DPLA for other supported formats, or refer to the DPLA metadata
specification crosswalk
[here](https://docs.google.com/spreadsheets/d/1BzZvDOf4fgas3TD21xF40lu2pk2XW0k2pTGJKIt6438/edit#gid=1453046017).
