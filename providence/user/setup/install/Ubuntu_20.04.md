---
sidebar_position: 4
sidebar_label: Ubuntu
#sidebar_custom_props:
#sidebar_class_name: first
---
# Installing on Ubuntu 20.04 LTS

CollectiveAccess relies on a number of open-source software packages to
run such as MySQL (database server), PHP (programming language) and
Apache or Nginx (web server), to name just a few. These required
packages, all of which are standard parts of the Ubuntu distribution,
can be installed using the standard `apt` package manager.

To start bring up a command line terminal on your Ubuntu system. Many of
the commands required for installation must be run as the root
(administrative) user. You can either log in as the root user, or
(preferably) run the commands using `sudo`, which executes
commands as the root user for authorized users. We assume use of
`sudo` and include it whenever it is required.

First, we install a web server. These instructions assume use of Apache.
You can also install [Nginx](https://www.nginx.com), a popular
alternative to Apache if desired, although the web-server specific
configuration will differ from that described here. To install Apache
enter in the terminal:

``` bash
sudo apt install -y apache2
```

Next, set Apache to start itself automatically every time the server is
rebooted:

``` bash
sudo systemctl enable apache2.service
```

and also to start running now:

``` bash
sudo systemctl start apache2.service
```

You should now be able to connect to the web server by going to the URL
http://\<ip address of your server\> in a web browser. An
Apache welcome page should display. If unsure of your server\'s IP
address, the `hostname -I` command will return it.

CollectiveAccess requires PHP version 8.2, which is available in the
\"ondrej\" PPA repository. Add this repository to your system using:

``` bash
sudo apt -y install software-properties-common
sudo add-apt-repository ppa:ondrej/php
```

Next install PHP version 8.2 and required extensions:

``` bash
sudo apt install -y php libapache2-mod-php8.2 php8.2-mbstring php8.2-xmlrpc php8.2-gd php8.2-xml php8.2-intl php8.2-mysql php8.2-cli php8.2-zip php8.2-curl php8.2-posix php8.2-dev php8.2-redis php8.2-gmagick php8.2-gmp
```

Once the PHP installation process completes typing `php -v`
in the terminal should return output similar to:

``` 
PHP 8.2.28 (cli) (built: Feb 17 2022 16:06:35) ( NTS )
Copyright (c) The PHP Group
Zend Engine v3.4.0, Copyright (c) Zend Technologies
    with Zend OPcache v8.2.28, Copyright (c), by Zend Technologies
```

If it does not return a 8.2 version, run:

``` 
update-alternatives --config php
```

and make sure PHP 8.2 is selected. Note that PHP 8 is not yet supported.

The default installation of PHP is configured with memory and file
upload size limits that are often too low for typical use of
CollectiveAccess. In particular, file uploads are limited to a maximum
of 2mb, which is well below the media file sizes most users work with.
To raise these limits edit the PHP configuration file at
`/etc/php/8.2/apache2/php.ini`.

With the `php.ini` file open search for
`memory_limit` and change it to \"256m\". If you are
planning to upload very large media files (Eg. JPEGs \> 10mb or TIFFs \>
100mb) you may wish to set this value to \"384m\" or even \"512m\".

:::note
The `memory_limit` setting caps the amount of memory
CollectiveAccess can use. It does not actually allocate memory to PHP or
CollectiveAccess. Usually CollectiveAccess will use much less memory
than these limits, but media processing may require larger memory
allocations for short periods.
:::

Next search for `upload_max_filesize` and change it to a
value larger than the largest file you expect to upload. If you\'re
planning to upload 500mb video files consider setting it to \"750m\" to
provide a margin of safety. If you\'re planning to upload multiple 40mb
TIFF files consider setting it to some multiple of 40.

:::note
As with `memory_limit` this setting is a maximum. It does
not actually allocate resources.
:::

Finally, search for `post_max_size` and set it to a slightly
larger value than `upload_max_filesize`. If
`upload_max_filesize` is set to \"750m\", for example, you
may elect to set `post_max_size` to \"800m\".

By default PHP will not display runtime errors on screen. If you\'re
experiencing blank white screens, odds are a PHP error occurred but
it\'s not being displayed. To enable on-screen error displays search for
`display_errors` and set its value to \"On\". On-screen PHP
error display can be useful for debugging, but it is advisable to leave
message display off in a production system.

Once you\'re done editing `php.ini` restart the web server,
allowing your edits to take effect:

``` 
sudo systemctl restart apache
```

:::tip
You can also change the `display_errors` setting by adding
the following PHP code to your `setup.php` file:
`ini_set(\'display_errors\', \'On\');`. Setting
`display_errors` in `setup.php` does not require
a web server restart, making it very convenient when debugging.
:::

Now let\'s install MySQL. CollectiveAccess works with version 5.7 or
newer. To install the most current version, version 8.0:

``` 
sudo apt install -y mysql-server
```

Then set MySQL to start now and automatically whenever the server
reboots:

``` 
sudo systemctl start mysql
sudo systemctl enable mysql
```

Next we install various packages to support data caching and processing
of media: ffmpeg (audio/video), Ghostscript (PDFs), GraphicsMagick
(images), mediainfo (metadata extraction), ExifTool (metadata
extraction), LibreOffice (Microsoft Word/Excel/PowerPoint), dcraw (RAW
images), Poppler (content extraction from PDFs) and Redis (caching):

``` 
apt install -y ghostscript libgraphicsmagick1-dev libpoppler-dev poppler-utils dcraw redis-server ffmpeg libimage-exiftool-perl libreoffice mediainfo 
```

Now we are ready to install the CollectiveAccess
`Providence` back-end cataloguing application. The web
server we installed earlier uses `/var/www/html` for
documents by default (the \"web server root\" directory). We are going
to place CollectiveAccess here, in a subdirectory named
`ca`. The URL for this directory will be http://\<your
server ip\>/ca.

:::tip
You can use a different web server root directory for the application by
editing `/etc/apache2/sites-available/000-default.conf`.
Modify the line `DocumentRoot /var/www/html` to point to
your chosen directory.
:::

You may download a release from
(https://github.com/collectiveaccess/providence/releases), or install is
with Git. Using a release in somewhat simpler to install, while using
Git allows you to easily update files and switch to development versions
of CollectiveAccess.

To install with Git, in the first make sure Git is installed:

``` 
apt install -y git
```

Next change directory into the web server root directory.

``` 
cd /var/www/html
```

Then \"clone\" the Providence application code from GitHub:

``` 
git clone --depth=4 https://github.com/collectiveaccess/providence.git ca
```

If you prefer to download a release, place the [release ZIP or tgz
file](https://github.com/collectiveaccess/providence/releases) into
/var/www/html and uncompress it. Then rename the resulting directory
(named something like `providence-2.0.3`) to `ca`.

In the terminal change directory into the `ca` application
directory and copy the `setup.php-dist` file to
`setup.php`. This file contains basic configuration for
Providence. The \"-dist\" version is simply a template. The
`setup.php` copy will need to be customized for your
installation:

``` 
cd  /var/www/html/ca
cp setup.php-dist setup.php
```

Edit `setup.php`, changing settings to suit. At a minimum
you will need to edit the database login settings
`__CA_DB_USER__`, `__CA_DB_PASSWORD__`,
`__CA_DB_DATABASE__`. You may want to edit other
settings, which are described by notes within `setup.php`.
You should also edit the
`__CA_STACKTRACE_ON_EXCEPTION__` to be true. This will
allow you to receive full error messages on screen if something goes
wrong. You may also set `__CA_CACHE_BACKEND__` to
\"Redis\" to use the Redis memory-based cache system. Redis is faster
and more reliable than the default file-based caching system, but
requires Redis to be running on the server.

By default apt installs the MySQL database server with an all-access,
password-less administrative account named `root`. It\'s
generally insecure to leave this account password-less, but in a testing
environment this may not matter. If you decide to use the root account,
set `__CA_DB_USER__` to \"root\", leave
`__CA_DB_PASSWORD__` blank and set
`__CA_DB_DATABASE__` to the name you\'ll use for your
database. For this example, we\'ll assume the database is to be named
`my_archive`.

MySQL can support multiple databases in a single installation, so the
`my_archive` database must be created explicitly. Log into
mysql in the terminal using the `mysql` command (assuming
you haven\'t set a password for the root account):

``` 
mysql -uroot
```

:::tip
For ephemeral systems intended for testing or evaluation, leaving the
root login password-less and using that login for the CollectiveAccess
application may be acceptable. For any other use you should secure your
MySQL installation using the `mysql_secure_installation`
command and set up an application-specific MySQL login with access
restricted to the specific database used for CollectiveAccess. If
you\'ve secured your MySQL installation using
`mysql_secure_installation` be sure you include the password
you set for root in your `mysql` command: `mysql -uroot
-p\<your password\>`.
:::

One you\'re logged in, at the `mysql\>` prompt enter:

``` 
CREATE DATABASE my_archive;
```

To be sure your new database has been created run the `SHOW
DATABASES;` command. Your new `my_archive`
database should appear in the list of available databases.

If you wish to create a MySQL login specific to the newly created
database, while still at the `mysql\>` prompt enter these
two commands:

``` 
CREATE USER my_user@localhost identified by 'my_password';
GRANT ALL on my_archive.* to my_user@localhost;
```

where `my_user` is your preferred MySQL user name and
`my_password` is your preferred password for the MySQL
login.

:::note
MySQL logins are specific to MySQL and have nothing to do with your
server login. You can set the user name and password to whatever you
want, independent of all other login credentials.
:::

Go back to `setup.php` and enter your newly created MySQL
login credentials into the `__CA_DB_USER__`,
`__CA_DB_PASSWORD__` and
`__CA_DB_DATABASE__` settings. The restart the web
server with the command:

``` 
sudo systemctl restart apache2.service
```

Certain directories in the installation must be writeable by the web
server, within which CA runs. On Ubuntu, the web server runs as user
`www-data`. Change the permissions on the
`app/tmp`, `app/log`, `media` and
`vendor` directories to be writeable by \`www-data\`:

``` 
cd  /var/www/html/ca
sudo chown -R www-data app/tmp app/log media vendor
sudo chmod -R 755 app/tmp app/log media vendor
```

Navigate in a web browser to http://\<your server ip\>/ca. You should
see this, or something similar:

![image](/providence/img/first_install.png)

:::note
If CA was installed using git, now is the time to install the vendor libraries using the link provided in the web browser.
:::

Click on the `installer` link and you should see:

![image](/providence/img/install_screen.png)

Select a profile, enter your email address and click on `Begin
installation`. A profile is a preset template with record
types, fields and other cataloguing settings that the installer uses to
define a new working system. The standard profiles Providence ships with
include implementations of widely used standards:

![image](/providence/img/install_profiles.png)

You can add your own profiles, or use profiles from other users by
dropping profile files in the
`/var/www/html/ca/install/profiles/xml` directory.

If you want to experiment with different profiles you may wish to set
the
`__CA_ALLOW_INSTALLER_TO_OVERWRITE_EXISTING_INSTALLS__`
option in setup.php. By default the installer will refuse to install
over an existing installation. With
`__CA_ALLOW_INSTALLER_TO_OVERWRITE_EXISTING_INSTALLS__`
set the installer will include an option to overwrite existing data. In
a real system this is **extremely** dangerous -- any one with access to
the installer can delete the entire system -- but is very handy for
testing and evaluation.
