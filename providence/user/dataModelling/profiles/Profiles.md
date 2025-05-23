---
title: Profiles
---

# Installation Profiles

## Definition and Purpose of a Profile

An installation profile is a document that tells CollectiveAccess how to
set up various aspects of the system at the time of its installation.
The profile enables you to configure nearly every aspect of the various
cataloging interfaces in CollectiveAccess before you begin using the
system. After installation, you can easily make additional changes using
the tools in the \"Manage\" menu, but it\'s usually more efficient to
set up your installation in such a way that it meets your requirements
from the start. Installation profiles:

> -   Generate and define controlled vocabularies
> -   Define and label metadata fields
> -   Specify the method of metadata entry (e.g. a text entry field or a
>     drop-down menu)
> -   Bundle the fields together for easy metadata entry
> -   Combine metadata elements on different screens for workflow
>     management
> -   Delineate and describe the relationships between all of the
>     various types of objects, entities, occurrences, lots, sets, etc.
>     in your system
> -   Set the logins for different user types
> -   Configure the display of search results and data exports.
> -   Create standards-compliant set-ups

Installation profiles \"live\" in the \'install/profiles/xml\' folder
located in the directory where you loaded the software on your computer
or server. When you first log in after installing CollectiveAccess,
you\'ll be asked to select one of the saved installation profiles in the
\"XML\" folder, which will then be used to complete the installation
process. In Providence, many pre-defined profiles are available, ranging
from standard schemata (see [Metadata Standards](/providence/user/dataModelling/profiles/MetadataStandards)) to custom set ups
created for and by organizations world wide (see [Configuration
Library](/providence/user/dataModelling/profiles/ConfigurationLibrary)).

## Creating a Profile

Profiles are written using an XML-based syntax. Typically no profile is
created from scratch, but rather users modify [existing
profiles](https://github.com/collectiveaccess/providence/tree/master/install/profiles/xml)
to meet their needs.

## Troubleshooting Profiles

Installation profiles are often long and complex text documents. It\'s
easy to make mistakes that cause the installation process to fail or
deviate from requirements. You can make errors much less likely by
validating your profile against the profile syntax XML schema. The
schema is located in [install/profiles/xml/profile.xsd].
Simply copy the schema to the same directory as the profile you are
editing and use a validating XML editor such as OxygenXML. The editor
will highlight mistakes as you type and point you to the location of the
errors.

:::tip
The CollectiveAccess installer will validate your profile against the
schema before proceeding with installation, so if a profile doesn\'t
validate during editing it won\'t be accepted by the installer. The
bottom line: always make sure your profile validates!
:::

## Changing the Installation Profile of an Existing System

An oft-asked question is \"I installed my system using installation
profile X. How can I now change it to Y?\" The answer is you can\'t.
Installation profiles are simply collections of rules (or templates, if
you prefer) for the installer to follow when setting up a new system.
Once the installation process is complete the profile ceases to play a
role. You can continue to modify the configuration of your system using
the web-based configuration tools, creating an installation different
from the profile that originally created it. 

If you really need to change an existing system to conform to a new profile you have two
choices: 

1. Modify the existing system by hand using the web-based
configuration tools to match.
2. Reinstall from scratch with the desired profile. 

In the latter case you will lose all existing data, of course.
