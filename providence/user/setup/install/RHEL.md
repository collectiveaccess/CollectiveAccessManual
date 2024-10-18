---
sidebar_position: 4
sidebar_label: RHEL 9-Based/
#sidebar_custom_props:
#sidebar_class_name: first
---

# Installing on Rocky Linux 9.4 and Red Hat Enterprise Linux 9

:::note
::: title
Note
:::

These instructions were tested on a Rocky Linux 9.4 minimal install. Rocky Linux is a free, community-supported Linux distribution that is functionally compatible with its upstream source, Red Hat Enterprise Linux. For purposes of CollectiveAccess installation they are identical. The instructions provided here should work for either CentOS or Red Hat Enterprise Linux.
::::

CollectiveAccess relies on a number of open-source software packages to
run such as MariaDB/MySQL (database server), PHP (programming lanaguage) and
Apache or nginx (web server), to name just a few. These required
packages can be installed using the `dnf` package manager.

To start bring up a command line terminal on your system. Many of
the commands required for installation must be run as the root
(administrative) user. You can either log in as the root user, or
(preferably) run the commands using `sudo`, which executes
commands as the root user for authorized users. We assume use of
`sudo` and include it whenever it is required.

:::note
::: title
Note
:::

For a test setup these instructions assume the default firewall has been disabled (`sudo systemctl disable firewalld --now`) and that [selinux](https://www.redhat.com/en/topics/linux/what-is-selinux) is also disabled (`sudo setenforce 0`).
::::

1. Web Server Installation
   For a simple test setup these instructions install and configure apache as your web server. For those interested, details on the slightly more complicated nginx web server are at the end of this document.

A. Install `httpd`:

```bash
sudo dnf install httpd -y
```

B. Start the `httpd` system service and enable it to start on system boot:

```bash
sudo systemctl enable httpd --now
```

C. You should now be able to connect to the web server by going to the URL
`http://\<ip address of your server\>` in a web browser. A test landing page should display. If unsure of your server\'s IP
address, the `hostname -I` command will return it.

2. PHP 8.3 Installation
A. Install and enable Remi repository
   
   ```bash
   sudo dnf install https://rpms.remirepo.net/enterprise/remi-release-9.rpm -y && sudo dnf config-manager --set-enabled remi
   ```
   
B. Set desired PHP version (available versions of PHP can be viewed with `sudo dnf module list php`)
   
   ```bash
   sudo dnf module enable php:remi-8.3 -y
   ```

C. Install PHP and required php modules
   
   ```bash
   sudo dnf install php php-cli php-gd php-curl php-zip php-mbstring php-mysqlnd php-gmagick php-process php-redis php-intl php-bcmath -y
   ```
   
D: Test PHP installed correctly with `php -v`
   
   ```bash
   PHP 8.3.12 (cli) (built: Sep 24 2024 18:08:04) (NTS gcc x86_64)
   Copyright (c) The PHP Group
   Zend Engine v4.3.12, Copyright (c) Zend Technologies
    with Zend OPcache v8.3.12, Copyright (c), by Zend Technologies
   ```
   
E: **LINK TO PAGE ON CONFIGURING PHP.INI**

Source: https://docs.rockylinux.org/guides/web/php/

3. MariaDB Server Installation
   CollectiveAccess works with version 5.7 or newer of MySQL, or equivalent versions of MariaDB.

A. Install MariaDB

```bash
sudo dnf install mariadb-server -y
```

B. Start the `mariadb` service and enable it to start on system boot

```bash
sudo systemctl enable mariadb --now
```

C. Run `mysql_secure_installation`

```bash
sudo mysql_secure_installation
```

For the following helper prompts:

`enter` for current root password (blank)
`Switch to unix_socket authentication` - `Y`
`Change the root password?` - `Y`
`Set password` - `test`
`Y` to remaining questions

D. Test `mariadb` is installed and running correctly: `sudo mysql -v`

```bash
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 18
Server version: 10.5.22-MariaDB MariaDB Server
```

Source: https://docs.rockylinux.org/tr/guides/database/database_mariadb-server/

4. Configure `mariadb`
   These commands will be run in the MariaDB prompt which can be opened with `sudo mysql` if not still open from the last step.

A. Setup providence database, replacing `yourdatabasename` as desired.

```
CREATE DATABASE yourdatabasename;
```

Confirm your database exists with `SHOW DATABASES;`

B. Create user for the providence database, replacing `your_database_user` and `your_password` as desired.

```
CREATE USER your_database_user@localhost identified by 'your_password';
```

C. Give the newly created user permissions to the providence database, replacing `yourdatabasename` and `your_database_user` with your choices from above.

```
GRANT ALL on yourdatabasename.* to your_database_user@localhost;
```

D. Close the `mariadb` prompt with `exit`

5. Install packages for media processing
   Next we install various packages to support data caching and processing
   of media: ffmpeg (audio/video), Ghostscript (PDFs), GraphicsMagick
   (images), mediainfo (metadata extraction), ExifTool (metadata
   extraction), dcraw (RAW images), Poppler (content extraction from PDFs)
   and Redis (caching):

A. Install the EPEL and RPMFusion repositories, and enable `crb`, which provide the additional packages required for media processing:

```bash
sudo dnf install epel-release -y && sudo dnf config-manager --set-enabled crb && sudo dnf install --nogpgcheck https://mirrors.rpmfusion.org/free/el/rpmfusion-free-release-$(rpm -E %rhel).noarch.rpm -y && sudo dnf install --nogpgcheck https://mirrors.rpmfusion.org/nonfree/el/rpmfusion-nonfree-release-$(rpm -E %rhel).noarch.rpm -y
```

B. Install packages:

`sudo dnf install ffmpeg ghostscript poppler-utils libreoffice perl-Image-ExifTool mediainfo redis -y`

C. Configure `redis`

```bash
sudo vi /etc/redis/redis.conf
```

Uncomment and update line 277 in `redis.conf` to `supervised systemd` . Then enable and start the `redis` service:

```bash
sudo systemctl enable --now redis
```

To test redis, enter `redis-cli ping` , which should return `PONG`

D. Install wkhtmltopdf using the almalinux9 rpm provided by https://github.com/wkhtmltopdf/packaging/releases:

```bash
sudo dnf install wget -y & cd ~ && wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6.1-3/wkhtmltox-0.12.6.1-3.almalinux9.x86_64.rpm && sudo dnf install wkhtmltox-0.12.6.1-3.almalinux9.x86_64.rpm -y && rm -f wkhtmltox-0.12.6.1-3.almalinux9.x86_64.rpm`
```

Source: https://docs.faveohelpdesk.com/docs/installation/providers/enterprise/wkhtmltopdf/ 

wkhtmltopdf may need additional fonts as well:

```bash
sudo dnf install xorg-x11-fonts-75dpi xorg-x11-fonts-Type1 libpng libjpeg openssl icu libX11 libXext libXrender xorg-x11-fonts-Type1 xorg-x11-fonts-75dpi -y
```

6. Install `git` and clone the `providence` github repository to your server
   Now we are ready to install the CollectiveAccess [Providence] back-end cataloguing application.

A. Install `git`:

```bash
sudo dnf install git -y
```

B. Clone `providence` to `/var/www/html`:

```bash
cd /var/www/html && sudo git clone -b dev/php8 https://github.com/collectiveaccess/providence.git
```

C. Set `apache` user permissions for the `providence` directory and subdirectories:
   `sudo chown apache /var/www/html/providence && cd /var/www/html/providence && sudo chown -R apache app/tmp app/log media vendor uploads && sudo chmod -R 755 app/tmp app/log media vendor uploads`

D. Make a copy of the default `providence` setup configuration file:

```bash
sudo cp /var/www/html/providence/setup.php-dist /var/www/html/providence/setup.php
```

Your basic setup should now be ready to configure and finish the providence setup: **LINK TO SETUP/INSTALL PROVIDENCE PAGE**

Alternative `nginx` setup and configuration (**possibly its own page?**):

A. Install `nginx`

```bash
sudo dnf install nginx -y
```

B. Start the `nginx` system service and enable it to start on system boot

```bash
sudo systemctl enable nginx --now
```

C. Test that the web server test page is viewable at `http://<IP address of your server>`

D. Edit `/etc/nginx/nginx.conf`

```bash
sudo vi /etc/nginx/nginx.conf
```

add lines 55 - 65:

```
        # php-fpm
        location ~ \.php$ {
        include /etc/nginx/fastcgi_params;
        fastcgi_pass unix:/run/php-fpm/www.sock;
        }

        # providence:
        location /providence {
            root /usr/share/nginx/html;
            index index.php;
        }
```

Test the `nginx` config changes with `sudo nginx -t` and restart the `nginx` service with `sudo systemctl restart nginx`

2. Enable and adjust `php-fpm` config for `nginx`
   A. Enable and start the `php-fpm` service
   
   ```bash
   sudo systemctl enable php-fpm --now
   ```
   
   B. Edit `/etc/php-fpm.d/www.conf` and change user (line 24) and group (line 26) to `nginx`

C. Edit `/etc/nginx/default.d/php.conf` to account for redirects:

```
# pass the PHP scripts to FastCGI server
#
# See conf.d/php-fpm.conf for socket configuration
#
index index.php index.html index.htm;

location ~ \.(php|phar)(/.*)?$ {
    fastcgi_split_path_info ^(.+\.(?:php|phar))(/.*)$;

    fastcgi_intercept_errors on;
    fastcgi_index  index.php;
    include        fastcgi_params;
    fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
    fastcgi_param  PATH_INFO $fastcgi_path_info;
    fastcgi_pass   php-fpm;
}
```

D. Update permissions with `sudo chown -R root:nginx /var/lib/php` and restart the `php-fpm` service: `sudo systemctl restart php-fpm`
