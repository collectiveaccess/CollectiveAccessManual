---
title: Mapping Interstitial Data
---

As of version 1.4, CollectiveAccess supports relationship records also known as interstitial records. This feature allows cataloguers to describe a relationship beyond simply selecting a relationship type; additional metadata can be added that is relevant to the relationship, but does not affect the relationship permanently.

The term interstitial refers to a small screen that is attached to a relationship of any kind in CollectiveAccess where additional information specifically pertaining to that relationship can be stored. This screen represents the “small space” between any relationship where relevant data can be added.

Interstitial data is represented in CollectiveAccess by a paperclip icon paperclip that appears next to a given relationship.

![image](/providence/img/interstitial7.png)

## When is Interstitial Data Used?

Not every relationship in CollectiveAccess needs an interstitial feature. However, this function works well for relationships that change over time, or are impermanent. For example, two entities were married for a period of time, and then got divorced. With an interstitial relationship enabled, the relationship record can now add a date range, narrative text and/or other metadata elements of your choosing to the interstice between these two individuals, specifying the dates of the relationship, and any other necessary metadata. Any two records can carry this interstitial description, so long as metadata and a user interface has been created (see below).

Interstitial data also works well for an object located in a particular storage location or exhibit location for a certain period of time, that had a defined beginning and end. The object is no longer located there, but the time it spent there is important to the object’s history and should be included in the record. With an interstitial relationship enabled, the relationship record can now add a date range to the interstice between these two records, specifying the dates of the relationship, and any other necessary metadata.

Other common examples of relationships that could require interstitial metadata include objects to entities; entities to places, and so on.

Note that Relationship records are entirely optional, and in fact won’t be accessible unless a user interface is defined for the them.

## Interstitial Data in the Installation Profile

To create a metadata element with an interstitial type restriction in the profile requires adopting some of the syntax used for relationshipTable names. Here’s how you would add the date range on an entity to entity relationship record:

```
<metadataElement code="relationshipDate" datatype="DateRange">
      <labels>
        <label locale="en_US">
          <name>Relationship date</name>
          <description/>
        </label>
      </labels>
     <settings/>
      <typeRestrictions>
        <restriction code="r1">
          <table>ca_entities_x_entities</table>
          <settings>
            <setting name="minAttributesPerRow">1</setting>
            <setting name="maxAttributesPerRow">1</setting>
            <setting name="minimumAttributeBundlesToDisplay">1</setting>
          </settings>
        </restriction>
      </typeRestrictions>
    </metadataElement>
```

After you’ve defined the metadata elements for your relationship record, you need to create the user interface. This follows the same syntax as the user interfaces for the main tables, except that the user interface “type” is the same string used in the typeRestriction “table” above:

```
<userInterface code="interstitial_entity_ui" type="ca_entities_x_entities">
      <labels>
        <label locale="en_US">
          <name>Interstitial Entity Editor</name>
        </label>
      </labels>
      <screens>
        <screen idno="basic" default="1">
          <labels>
            <label locale="en_US">
              <name>Basic info</name>
            </label>
          </labels>
          <bundlePlacements>
            <placement code="ca_attribute_relationshipDate">
              <bundle>ca_attribute_relationshipDate</bundle>
            </placement>
          </bundlePlacements>
        </screen>
      </screens>
    </userInterface>
```

Note that these interstitial records are meant to be small and manageable, so only one screen per user interface is supported. If other screens are defined, they simply won’t appear.

## Including Interstitial Data in an Import Mapping Spreadsheet

As noted above, interstitial data screens can be added by configuring the installation profile (see Installation Profiles for more), and interstitial data itself can be manually added through the user interface. However, it is useful to know how to include interstitial data in an import mapping.

In Refineries and Refinery Parameters, Splitters, Joiners, and Builders can all use the interstitial refinery parameter.

As a refinery parameter, interstitial sets or maps metadata for the interstitial movement relationship record by referencing the metadataElement code and the location in the data source where the data values can be found. Its exact function differs for each type of refinery.

A general example of the Refinery column (left) and Refinery Parameters column (right) in an import mapping spreadsheet would look like:

![image](/providence/img/interstitial10.png)

Where the interstitial data is a date of a relationship, and is being pulled from the source data column 4.

Examples for all types of Refineries with Refinery Parameters are available to view here.






