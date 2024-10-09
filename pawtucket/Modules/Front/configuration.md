---
sidebar_position: 2
---

# Configuration

Options controlling display of the front page are set in the `front.conf` file in the current theme. If no `front.conf` file
is defined in the current theme, settings defined in the default theme will be used.

| Option Name   		| Explanation  				| Example  				|
| --- 					| --- 						| --- 					|
| **set_code**         | The code of the set to render on the front page. Set must contain objects.    | `set_code = front_page_set`  |
| **set_item_caption_template**        | A display template for caption text to display under each object in the front page set. Template is resolved relative to each displayed object. | `set_item_caption_template="<l>^ca_objects.preferred_labels.name (^ca_objects.idno)</l>"`     |
| **set_random**    | Randomize order of set. If option is not set, or set to zero the set will be displays in its user-defined order.   | `set_random = 1`      |
| **intrinsic_filter** | Restrict display of set items by value in intrinsic fields such as type_id and source_id. For each intrinsic field, set a list of values to filter the display set on. This option provides a way to filter front-page content by type or other elementary value when the configured set contains undesired content. This option is rarely used – it's usually easier to simply restrict the set to the desired content. | ```intrinsic_filter = { type_id = [artwork] }```  |
