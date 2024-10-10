---
title: Configuration Library
---

Listed below are a selection of user-contributed installation profiles.
Some are based on standards and some are completely custom; all were
designed to meet the functional requirements of real-world projects.
Even if none of the profiles in the library can be used
\"out-of-the-box\" for your project, some may provide development ideas
and useful points of departure for your own profile. Before attempting
to decipher the profiles presented here be sure to familiarize yourself
with the profile syntax, as described in the Building System
Installation Profiles manual.

Note that the profiles listed here are not intended as exemplars of
\"good design.\" Many employ sub-optimal metadata and user interface
structures in order to accommodate various legacy and project-specific
requirements. They are presented merely as examples of how previous
users have approached systems design for their particular discipline.
Your mileage may vary.

To use a profile listed here with your copy of CollectiveAccess,
download the desired profile and copy it into the **profiles/xml**
directory of the installer (Eg. /install/profiles/xml). After reloading
the installer start page, the newly installed profile should appear in
the profiles drop-down menu.

# Standards

  Metadata Standard   Profile                                                                                                                   Description
  ------------------- ------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  CDWA-Lite           [cdwalite.xml](https://github.com/collectiveaccess/InstallationProfiles/blob/main/xml/standards/cdwalite.xml)             Categories for the Description of Works of Art (CDWA-Lite) is a metadata standard used to describe a format for works of art and material culture. Profile oonfigures a system with CDWA 1.1 - Baseline.
  DACS, EAD           [dacs_heritage.xml](https://github.com/collectiveaccess/InstallationProfiles/blob/main/xml/standards/dacs_heritage.xml)   Describing Archives: A Content Standard (DACS) is a standard for describing archives, personal papers, and manuscript collections, and can be applied to all material types. Encoded Archival Description (EAD) is a standard for encoding archival finding aids.
  Darwin Core         [darwincore.xml](https://github.com/collectiveaccess/InstallationProfiles/blob/main/xml/standards/darwincore.xml)         he Darwin Core standard is intended to facilitate the discovery, retrieval, and integration of information about modern biological specimens, their spatiotemporal occurrence, and their supporting evidence housed in collections (physical or digital). It is meant to provide a stable standard reference for sharing information on biological diversity. As a glossary of terms, the Darwin Core is meant to provide stable semantic definitions with the goal of being maximally reusable in a variety of contexts.
  Dublin Core         [dublincore.xml](https://github.com/collectiveaccess/InstallationProfiles/blob/main/xml/standards/dublincore.xml)         A \"\"least common denominator\"\" format suitable for those experimenting with cataloguing strategies, or with simple cataloguing requirements. This profile implements Dublin Core for item-level (object) cataloguing. The profile set up includes fields as per the [Simple Dublin Core specification](http://www.dublincore.org/documents/dces/) with a few extensions (ex. for uploaded media).
  EBUCore             [ebucore.xml](https://github.com/collectiveaccess/InstallationProfiles/blob/main/xml/standards/ebucore.xml)               Based on Dublin Core, EBUCore is a minimum list of attributes to describe audio and video resources for a wide range of broadcasting applications including for archives, exchange and publication. This profile configures a system compliant with the EBU Core Version 1.4 specification
  ISAD(G), EAD        [isad_g.xml](https://github.com/collectiveaccess/InstallationProfiles/blob/main/xml/standards/isad_g.xml)                 The International Standard Archival Description (General) (ISAD(G)) is a standard for creating descriptions of archival materials based on the principle of respect des fonds within a multi-level description. This profile configures a system compliant with ISAD(G) and EAD.
  PBCore              [pbcore.xml](https://github.com/collectiveaccess/InstallationProfiles/blob/main/xml/standards/pbcore.xml)                 The PBCore (Public Broadcasting Metadata Dictionary) was created by the public broadcasting community in the United States of America for use by public broadcasters and related communities. Like EBUCore, the PBCore metadata specification is built on the foundation of Dublin Core, emphasizing the description of audio and video resources in production, archival, and broadcasting environments. This profile implements PBCore version 1.2, which is now obsolete. An updated PBCore version 2.1 profile is planned.
  VRACore             [vracore.xml](https://github.com/collectiveaccess/InstallationProfiles/blob/main/xml/standards/vracore.xml)               VRA Core 4.0 is a data standard for the cultural heritage community developed by the Visual Resources Association\'s Data Standards Committee. The element set provides a categorical organization for the description of works of visual culture as well as the images that document them. This profile implements VRA Core 4.0 for item-level (object) and collection-level cataloguing.

See [Metadata
Standards](user/dataModelling/profiles/MetadataStandards.html) for more
information on standards-compliant profiles.

# User Profiles

  Project                                                                                                                                         Description
  ----------------------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Vancouver Maritime Museum (https://github.com/collectiveaccess/InstallationProfiles/blob/main/xml/user/vancouver_maritime_museum.xml)   System for managing a diverse data set including item-level collections catalogue, archival materials and authority data relating to maritime history in the Pacific Northwest. Public interface is available at (https://vmmcollections.com)
  St. Olaf College Archives (https://github.com/collectiveaccess/InstallationProfiles/blob/main/xml/user/st_olaf_college_archives.xml)   System for managing archival materials at a college.