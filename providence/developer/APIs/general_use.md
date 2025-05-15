---
title: General-Use APIs
---

# General-Use APIs

## Overview

CollectiveAccess offers several web-based APIs for data access and manipulation:

- GraphQL

- Simple

- JSON

- IIIF

- OAI-PMH

Two are general-use APIs, providing access to much of CollectiveAccess’ functionality including data access and editing, search and configuration.

## General-Use APIs

- GraphQL API: A [GraphQL-based API](https://graphql.org/) first offered in CollectiveAccess version 1.8. This API provides a full range of services for reading and writing both catalogue data and system configuration, and is under active development.

- JSON API (Legacy): A REST-style API returning JSON-encoded payloads for read and write operations. Available since version 1.3, this API is deprecated and will be removed in a future release. We recommend avoiding use of this API for new projects.

## APIs Providing More Specialized Access

“Simple” API: A read-only API that provides configurable endpoints returning pre-formatted data (using [display templates](https://docs.collectiveaccess.org/providence/user/reporting/display_templates)) in flat JSON-encoded key value responses. Endpoints can be generated for search result sets or individual records referenced by ID.

- International Image Interoperability Framework (IIIF) Image service: [IIIF](https://iiif.io/) is a standard for describing and delivering images via http. The CollectiveAccess IIIF Image API returns images in response to a web request. Request URIs can specify cropping, size, rotation, quality and format of the returned image, as well as request technical information about the image. This service is often used to support advanced image viewing and presentation applications. CollectiveAccess uses this service internally to enable use of IIIF-compliant image and document viewers such as [Mirador](https://projectmirador.org/), [UniversalViewer](https://universalviewer.io/) and [DivaJS](https://diva.simssa.ca/).

- Open Archives Initiative Protocol for Metadata Harvesting (OAI-PMH) service: A read-only API used to disseminate metadata to other systems in a [widely supported, standards-compliant manner](
https://www.openarchives.org/pmh/). CollectiveAccess can publish data in formats defined by an [export mapping](https://docs.collectiveaccess.org/providence/user/export/mappings) for use by OAI-PMH clients.