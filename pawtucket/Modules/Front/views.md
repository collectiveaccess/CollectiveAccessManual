---
sidebar_position: 3
---

# Views

Views for the front page are defined in the theme `views/Front` directory. The`front_page_html.php` view 
is used to generate the front page. Other views may added to support additional home pages accessible using alternative
URLs.

## View Variables

The following variables are defined for front page views:

| Variable  				| Description  				| 
| --- 						| --- 						|
| **config**       			| A object providing access to the `front.conf` configuration file  | 
| **result_context** 		| The current `ResultContext` object |
| **featured_set**        	| The code of the set to display | 
| **featured_set_id**    	| The internal `set_id` value of the set to display |
| **featured_set_item_ids** | The item list for the current set as an array of set item ids | 
| **featured_set_items_as_search_result** | The item list for the current set as an iterable `SearchResult` object |

## Defining and Referencing Alternative Front Pages

Any number of "front" pages may be defined. The page defined in `views/Front/front_page_html.php` will always be used
as the default, loading whenever the site is referenced at its root (Eg. `https://example.com`). Additional front pages may be 
loaded using the site URL with `Front/<view name>` appended, where `<view name>` is the name of the view 
without the "_html.php" suffix. For example, if a view named `alternate_html.php` is defined in the theme's `views/Front` directory
it can be loaded using a URL such as `https://example.com/Front/alternate`.
