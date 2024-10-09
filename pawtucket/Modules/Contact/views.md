---
sidebar_position: 2
---

# Views

Views for the contact form are defined in the theme `views/Contact` directory.
The `form_html.php` view is used to generate the contact page. The `success_html.php` is used to display confirmation message 
to the user upon successful submission of form. 

## Variables for `form_html.php`

The `form_html.php` view formats the contact form. Input elements in the form, as configured by the
`contact_form_elements` setting in `contact.conf`, must be individually included in the view. Only elements
configured in `contact_form_elements` will be validated on submission and included in the email sent by the form,
but elements present in `contact_form_elements` but not referenced in the view will similarly be ignored.

Variables available in `form_html.php` include:

| Variable  				| Description  				| 
| --- 						| --- 						|
| **contact_form_elements**  | A list of fields in the form, as configured in `contact.conf`	| 
| **errors**	| An array of error messages set if submission of form has failed.	|

If errors occur on form submission variables will be set for each field in the form using field names. Values will be the entered
content of the field, and may be used to maintain the values of each field for re-presentation to the user.

## Variables for `success_html.php`

| Variable  				| Description  				| 
| --- 						| --- 						|
| **contact_form_elements**  | A list of fields in the form, as configured in `contact.conf`	| 

Variables will be set for each field in the form using field names. Values will be the entered
content of the field, and may be used in the confirmation of submission.