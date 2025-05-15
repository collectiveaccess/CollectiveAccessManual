---
sidebar_position: 1
---

# Configuration

### Outgoing Email Settings

The following settings must be set in the Pawtucket `setup.php` file defining a valid outgoing email service. Value for these settings should be provided by your outgoing email service provider.

:::note
Outgoing email settings in `setup.php` are PHP language constants, rather than configuration file settings. Note the syntax in the examples below.
:::

| Option Name   | Explanation  | Example  |
| --- | --- | --- |
| **`__CA_SMTP_SERVER__`**         | The hostname or IP address of the outgoing email server    | `define('__CA_SMTP_SERVER__', 'smtp.myemailserver.com');`   |
| **`__CA_SMTP_PORT__`**        | The port to use for connections to the outgoing email server. Typically 587 or 465.       | `define('__CA_SMTP_PORT__', 25);`     |
| **`__CA_SMTP_AUTH__`**    |  The authentication method for outgoing mail connection (set to PLAIN, LOGIN or CRAM-MD5; leave blank if no authentication is used.  | `define('__CA_SMTP_AUTH__, 'LOGIN');`      |
| **`__CA_SMTP_USER__`** | The user name to use for authentication.  | ```define('__CA_SMTP_AUTH__, 'my_username');``` |
| **`__CA_SMTP_PASSWORD__`** | The password to use for authentication. | ```define('__CA_SMTP_AUTH__, 'my_password');``` |
| **`__CA_SMTP_SSL__`** | The SSL method to use for outgoing mail connection (set to SSL or TLS; leave blank if not authentication is used.) | ```define('__CA_SMTP_AUTH__, 'TLS');``` |


### Form Settings

Options controlling the functionality of the contact form are set in `contact.conf` file in the current theme. If no `contact.conf` file
is defined in the current theme, settings defined in the default theme will be used.

| Option Name   | Explanation  | Example  |
| --- | --- | --- |
| **contact_email**         | Set an array of one or more email addresses to receive the contact email.    | Single Email: `contact_email = {janedoe@collectiveaccess.org}` <br/> Multiple Emails: `contact_email = {janedoe@collectiveaccess.org, johndoe@collectiveaccess.org}`   |
| **check_security**        | This setting checks if there is an arithmetic security question in the form. If set to 0, it will not check. If set to 1, it will check.       | `check_security = 0`     |
| **contact_page_title**    | Set a title for the contact page.   | `contact_page_title = "Contact"`      |
| **contact_form_elements** | An array of elements that will appear in the form. Each key is the name of the form element. For an email address, you can use the `email_address` option to check if a valid email is given. You can set any element as required by passing the `required` option. | ```contact_form_elements = { ``` <br/> ```  itemTitle = { label = _("Item Title")},``` <br/> ```    itemId = { label = _("Item Identifier")}, ``` <br/> ```    itemURL = { label = _("Item URL")}, ``` <br/> ```    email = { label = _("Email address"), email_address = 1, required = 1 }, ``` <br/> ```    name = { label = _("Name"), required = 1}, ``` <br/> ```    message = { label = _("Message"), required = 1} ``` <br/> ```  } ``` |

### Captcha Support

Open email forms are routinely pelted with requests from bots sending SPAM. The most reliable means for prevention of nuisance form submissions
is inclusion of a "Captcha". "Captcha" is an acronym for "Completely Automated 
Public Turing test to tell Computers and Humans Apart" and typically manifests as a puzzle designed to distinguish individual users from bots. 

The Contact module support integration with the Google reCaptcha service. To activate Captcha on contact forms set the following settings in
the Pawtucket `setup.php` file:

| Option Name   | Explanation  | Example  |
| --- | --- | --- |
| **`__CA_GOOGLE_RECAPTCHA_KEY__`**         | A valid Google reCaptcha key.    | `define('__CA_GOOGLE_RECAPTCHA_KEY__', '65fcDw0pAAgdwAGegdfgd5x745bfd4-mtI9-gfgdf');`   |
| **`__CA_GOOGLE_RECAPTCHA_SECRET_KEY__`**        | A valid Google reCaptcha "secret" key.  | `define('__CA_GOOGLE_RECAPTCHA_SECRET_KEY__, '6fgfhd4hbfnfdhdf_4534fdhdfh-dgfd');`     |

:::note
Google reCaptcha keys are issued in pairs. You must use the key + secret key **pair** provided by Google.
:::