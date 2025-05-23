# Setup.php

In the main directory of your Providence install there is a file called
*setup.php-dist*. Make a copy of this file and rename it to *setup.php*.
For your CollectiveAccess system to work, you MUST add values for your
**database server hostname, user name, password, database, and
administrative e-email**. Other options, such as timezone, may also need
to be modified.

## Database Server Host Name

This is often set to \'localhost\'.

``` none
if (!defined("__CA_DB_HOST__")) {
    define("__CA_DB_HOST__", 'localhost');
}
```

## Database Login User Name

``` none
if (!defined("__CA_DB_USER__")) {
    define("__CA_DB_USER__", 'your_username_here');
}
```

## Database Login Password

``` none
if (!defined("__CA_DB_PASSWORD__")) {
    define("__CA_DB_PASSWORD__", 'your_password_here');
}
```

## Database Name

``` none
if (!defined("__CA_DB_DATABASE__")) {
    define("__CA_DB_DATABASE__", 'your_databasename_here');
}
```

## System Name

This value will be used on emails, on the login screen, in browser
window titles, etc.

``` none
if (!defined("__CA_APP_DISPLAY_NAME__")) {
    define("__CA_APP_DISPLAY_NAME__", "insert_name_here");
}
```

## Administrative Email

An e-mail must be set up at this stage to send error reports for system
configuration issues.

``` none
if (!defined("__CA_ADMIN_EMAIL__")) {
    define("__CA_ADMIN_EMAIL__", 'example@info.com');
}
```

:::warning
For your CollectiveAccess system to work, you MUST add values for your
**database server hostname, user name, password, database, and
administrative e-email**. Other options, such as timezone, may also need
to be modified.
:::

## Outgoing Email

For CollectiveAccess to be able to send email notifications
\_\_CA_SMTP_SERVER\_\_ and \_\_CA_SMTP_PORT\_\_ must be set. If your
outgoing (SMTP) mail server requires you to authenticate, configure your
login and connection details in \_\_CA_SMTP_AUTH\_\_,
\_\_CA_SMTP_USER\_\_, \_\_CA_SMTP_PASSWORD\_\_ and \_\_CA_SMTP_SSL\_\_

``` none
__CA_SMTP_AUTH__ = authentication method for outgoing mail connection (set to PLAIN, LOGIN or CRAM-MD5; leave blank if no authentication is used.)
__CA_SMTP_SSL__ = SSL method to use for outgoing mail connection (set to SSL or TLS; leave blank if not authentication is used.)
```

## Timezone Setting

Set your preferred time zone here. The default is to use US Eastern
Standard Time. A list of valid time zone settings is available at
(http://us3.php.net/manual/en/timezones.php).

:::note
When importing data, you should switch to value \'UTC\' *before* import,
or else dates may import incorrectly.
:::

``` none
date_default_timezone_set('America/New_York');
```

## Background Processing

The task queue allows users to push potentially long running processes,
such as processing of large video and image files into the background
and continue working. Set this to a non-zero value if you want to use
the task queue. Be sure to configure the task queue processing script to
run (usually via CRON) if you set this option.

``` none
if (!defined("__CA_QUEUE_ENABLED__")) {
    define("__CA_QUEUE_ENABLED__", 0);
}
```

## Default Locale

The default locale is used in situations where no locale is specifically
set by the user, prior to login or prior to setting your preferred
locale in user preferences for the first time. You should set this to
the locale in which your users generally work.

:::note
Whatever locale you set here *MUST* be present in your system locale
list. The default value is US/English, which exists in most
configurations.
:::

``` none
if (!defined("__CA_DEFAULT_LOCALE__")) {
    define("__CA_DEFAULT_LOCALE__", "en_US");
}
```

## Clean URLs

If the Apache mod_rewrite module is available on your server you may set
this to have Providence use \"clean\" urls -- urls with the index.php
handler omitted. Only set this if your web server includes mod_rewrite
and it is enabled using the provided .htaccess file.

``` none
define("__CA_USE_CLEAN_URLS__", 0);
```

## App Names for Multiple CollectiveAccess Systems

If you are running more than one instance of CollectiveAccess on the
same server make sure each instance has its own unique
\_\_CA_APP_NAME\_\_ setting. \_\_CA_APP_NAME\_\_ must include letters,
numbers and underscores only - no spaces or punctuation!

``` none
if (!defined("__CA_APP_NAME__")) {
    define("__CA_APP_NAME__", "your_name_here");
}
```

## Google Maps Key

Add your Google Maps key to use for mapping and geocoding feature
(optional).

``` none
if (!defined("__CA_GOOGLE_MAPS_KEY__")) {
    define("__CA_GOOGLE_MAPS_KEY__", "");
}
```

## Caching

The default file-based caching should work acceptably in many setups.
Alternate schema may be used, including redis, sqlite, memcached or php
APC. All require additional software be present on your server, and in
general all will provide better performance than file-based caching.

Redis is usually the best choice, it perform well and doesn\'t use tons
of CPU when it fills, but is not always available on shared hostings.
It\'s packaged for many Linux distributions, including RedHat/CentOS and
Ubuntu so it\'s usually possible to get it installed on your server.

Easy alternative is SQLite, which is usually available, but performance
on many platforms is not wonderful. SQLite requires the PHP PDO
extension and a working install of SQLite.

Options are: \'file\', \'memcached\', \'redis\', \'apc\' and \'sqlite\'.
Memcached, redis and apc require PHP extensions that are not part of the
standard CollectiveAccess configuration check. If you do configure them
here and your PHP installation doesn\'t have the required extension you
may see critical errors.

``` none
if (!defined('__CA_CACHE_BACKEND__')) {
    define('__CA_CACHE_BACKEND__', 'file');
}
```

Options for the caching back-ends you may wish to set include:

``` none
__CA_CACHE_FILEPATH__ = Path to on on disk location for storage of cached data
__CA_CACHE_TTL__ = Cached data time-to-live (in seconds)
__CA_MEMCACHED_HOST__ = Hostname of memcached server
__CA_MEMCACHED_PORT__ = Port of memcached server
__CA_REDIS_HOST__ = Hostname of redis server
__CA_REDIS_PORT__ = Port of redis server
__CA_REDIS_DB__ = redis database index (typically a number between 0 and 15)
```

## Overwrite Existing Installation

Overwriting an existing installation can be useful while a site is in
development. Overwriting will completely destroy the database and
anything in it, allowing you to pick a new installation profile and
start over. **This option should be set back to false before delivering
to a client.**

``` none
# Note that in overwriting your database you will destroy *all* data in the database
# including any non-CollectiveAccess tables. Use this option at your own risk!
if (!defined('__CA_ALLOW_INSTALLER_TO_OVERWRITE_EXISTING_INSTALLS__')) {
    define('__CA_ALLOW_INSTALLER_TO_OVERWRITE_EXISTING_INSTALLS__', false);
}
```

## Application Exception Error Messaging

Set to display detailed error information on-screen whenever an
application exception occurs. This can be helpful for developers in
situtations where detailed exception messages are useful but full
debugging output is not required. **For production use you should set
this to false.** Note that exceptions are always logged to the
application log in app/log, regardless of what is set here.

``` none
if (!defined('__CA_STACKTRACE_ON_EXCEPTION__')) {
    define('__CA_STACKTRACE_ON_EXCEPTION__', false);
}

require(__DIR__."/app/helpers/post-setup.php");
```
