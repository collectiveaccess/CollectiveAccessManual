---
title: Datetime.conf
---

The output, or display, of dates and times inside dateRange metadata
elements can be configured in datetime.conf. For valid formats for dates
and times, please visit [Date and Time
Formats](file:///Users/charlotteposever/Documents/ca_manual/providence/user/dataModelling/metadata/dateTime.html).

# Date/time output configuration

In Datetime.conf, you may define common text expressions you wish to
have the date/time parser convert to dates. The text expression on the
left side of the equal sign must be *all lowercase*; the date/time
expression on the right side must be valid and parsable:

``` none
expressions = {
   us civil war = 1861 to 1865,
   world war 2  = 1939 to 1945,
   nickel empire = 1920s,
}
```

# Output options for date/times

+--------------+----------------------------------------+--------------+
| Setting      | Description                            | Options      |
+==============+========================================+==============+
| dateFormat   | > Format to use for dates.             | > Valid      |
|              | > \"Original\" is the date as entered  | > values are |
|              | > by the user; other values will       | > text,      |
|              | > normalize all date/time input to the | > delimited, |
|              | > selected standard format.            | > iso8601,   |
|              |                                        | > and        |
|              |                                        | > original.  |
|              |                                        | > The        |
|              |                                        | > default is |
|              |                                        | > text.      |
+--------------+----------------------------------------+--------------+
| timeOmit     | You may output or omit the time        | 1 (yes) or 0 |
|              | portion of date time expressions.      | (no)         |
+--------------+----------------------------------------+--------------+
| showC        | If set to a non-zero value commas are  | Default = 0  |
| ommaAfterDay | included after the day in a US-style   |              |
| ForTextDates | (month first) text date                |              |
+--------------+----------------------------------------+--------------+
| timeFormat   | > Format to use for times. \"12\"      | Valid values |
|              | > displays as, for example, 3:15 PM,   | are 12 and   |
|              | > where \"24\" would display at        | 24. Default  |
|              | > 15:15PM.                             | = 24.        |
+--------------+----------------------------------------+--------------+
| useQuarte    | > If true dates ranging over uniform   | 1 (yes) or 0 |
| rCenturySynt | > quarter centuries, such as 1900-1925 | (no)         |
| axForDisplay | > or 1975-2000 will be output in the   |              |
|              | > format \"20 Q1\" eg. 1st quarter of  |              |
|              | > 20th century, or 1900-1925.          |              |
+--------------+----------------------------------------+--------------+
| useR         | > If true century only dates (eg       | 1 (yes) or 0 |
| omanNumerals | > \"18th century\") will be output in  | (no)         |
| ForCenturies | > roman numerals like \"XVIIIth        |              |
|              | > century\".                           |              |
+--------------+----------------------------------------+--------------+
| t            | Delimiter in time display; must be     | :            |
| imeDelimiter | valid for the current language or      |              |
|              | default will be used; Default is first |              |
|              | delimiter in language config file.     |              |
+--------------+----------------------------------------+--------------+
| timeRang     | Text to put between times in a range;  | \-           |
| eConjunction | must be valid for the current language |              |
|              | or default will be used; default is    |              |
|              | first in language config.              |              |
+--------------+----------------------------------------+--------------+
| rangePr      | Text to place before date/times in a   | from         |
| eConjunction | range; must be valid for the current   |              |
|              | language or default will be used.      |              |
|              | Default is none.                       |              |
+--------------+----------------------------------------+--------------+
| rang         | Text to place between date/times in a  | to           |
| eConjunction | range; must be valid for the current   |              |
|              | language or default will be used.      |              |
+--------------+----------------------------------------+--------------+
| dateTim      | Text to put between times in a range;  | to           |
| eConjunction | must be valid for the current language |              |
|              | or default will be used; default is    |              |
|              | first in language config.              |              |
+--------------+----------------------------------------+--------------+
| showADEra    | > If set to a non-zero value the       | 1 or 0       |
|              | > \"AD\" era will be show for all      |              |
|              | > dates; default is to only show it in |              |
|              | > ranges that span era                 |              |
+--------------+----------------------------------------+--------------+
| uncertai     | Text to use to indicate date is        | circa        |
| ntyIndicator | uncertain; must be valid for the       |              |
|              | current language or default will be    |              |
|              | used.                                  |              |
+--------------+----------------------------------------+--------------+
| d            | Text to place before date/times in a   |              |
| ateDelimiter | range; must be valid for the current   |              |
|              | language or default will be used.      |              |
|              | Default is none.                       |              |
+--------------+----------------------------------------+--------------+
| ci           | > Text to place before date/times to   | circa        |
| rcaIndicator | > indicate it is a \"circa\", or       |              |
|              | > uncertain, date. Must be valid for   |              |
|              | > the current language or default will |              |
|              | > be used.                             |              |
+--------------+----------------------------------------+--------------+
| bef          | Text to place before a date/time to    | before/prior |
| oreQualifier | indicate that it is no later than the  | to           |
|              | specified date; must be valid for the  |              |
|              | current language or default will be    |              |
|              | used.                                  |              |
+--------------+----------------------------------------+--------------+
| af           | Text to place before a date/time to    | after        |
| terQualifier | indicate that it is no earlier than    |              |
|              | the specified date; must be valid for  |              |
|              | the current language or default will   |              |
|              | be used.                               |              |
+--------------+----------------------------------------+--------------+
| presentDate  | Text that represents the current date; | today        |
|              | must be valid for the current language |              |
|              | or default will be used.               |              |
+--------------+----------------------------------------+--------------+
