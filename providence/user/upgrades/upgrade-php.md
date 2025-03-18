---
title: Upgrade PHP
---

Work in progress instructions to upgrade PHP from 7.4 to 8.2, enabling Collective Access upgrades from versions 1.7 and 1.8 to version 2.0.

These instructions are from upgrading an Ubuntu based systems but should work on Debian just as well - they will need to be revised for use on RHEL
and its derivatives.

# Before you start

- ensure your backups are current
- If required, configure PHP 8.2 [Sury repository](https://deb.sury.org/) or [Remi repository](https://rpms.remirepo.net/) for those on RHEL.
- Check - using a different site/service - that any custom themes or plugins will work with PHP 8.2+


# Check current status

Make a list of currently installed PHP packages
```
dpkg -l |grep php
```

Check with apt to see if there is an equivalent php8.2 package available for each php7.4 package currently installed.
```
for P in $(dpkg -l |grep php7 |awk '{ print $2 }' |tr '7.4' '8.2'); do echo -e "\n$P"; apt policy $P 2>&1 |grep Candidate; done
```
Any package which has "Candidate: (none)" under it has no PHP 8.2 equivalent.

With luck the only "Candidate: (none)" will be `php8.2-json`. `php8.2-json` is provided by `php8.2-fpm` and `php8.2-cli` so its absense is not a
problem.


# Prepare system

- Schedule downtime in monitoring
- Put up maintenance message
- Back up PHP configuration
```
cp -r /etc/php/7.4/fpm/pool.d/ ~/php-7.4-fpm-pool.d
```

List packages which will be removed during the upgrade
```
sudo apt purge --dry-run php7.4*
...
The following packages were automatically installed and are no longer required:
  libonig5 libpcre2-32-0 libpcre2-dev libpcre2-posix3 libssl-dev libxmlrpc-epi0 libzip4 php-common shtool
Use 'sudo apt autoremove' to remove them.
The following packages will be REMOVED:
  php-pear* php7.4* php7.4-bcmath* php7.4-cli* php7.4-common* php7.4-curl* php7.4-dev* php7.4-fpm* php7.4-gd* php7.4-gmagick* php7.4-gmp* php7.4-igbinary* php7.4-intl*
  php7.4-json* php7.4-mbstring* php7.4-mysql* php7.4-opcache* php7.4-readline* php7.4-redis* php7.4-xml* php7.4-xmlrpc* php7.4-zip* pkg-php-tools*
0 upgraded, 0 newly installed, 23 to remove and 3 not upgraded.
```


# Upgrade packages

Next purge the old php 7.4 packages, it will look something like this
```
apt purge php*
...
  The following packages were automatically installed and are no longer required:
  libonig5 libpcre2-32-0 libpcre2-dev libpcre2-posix3 libssl-dev libxmlrpc-epi0 libzip4 shtool
Use 'apt autoremove' to remove them.
The following packages will be REMOVED:
  php-common* php-pear* php7.4* php7.4-bcmath* php7.4-cli* php7.4-common* php7.4-curl* php7.4-dev* php7.4-fpm* php7.4-gd* php7.4-gmagick* php7.4-gmp* php7.4-igbinary*
  php7.4-intl* php7.4-json* php7.4-mbstring* php7.4-mysql* php7.4-opcache* php7.4-readline* php7.4-redis* php7.4-xml* php7.4-xmlrpc* php7.4-zip* pkg-php-tools*
0 upgraded, 0 newly installed, 24 to remove and 2 not upgraded.
After this operation, 29.5 MB disk space will be freed.
Do you want to continue? [Y/n] y
```

Now install PHP 8.2
```
apt install php8.2 php8.2-bcmath php8.2-cli php8.2-common php8.2-curl php8.2-dev php8.2-fpm php8.2-gd php8.2-gmagick php8.2-gmp php8.2-igbinary php8.2-intl php8.2-mbstring php8.2-mysql php8.2-opcache php8.2-readline php8.2-redis php8.2-xml php8.2-xmlrpc php8.2-zip
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  debsuryorg-archive-keyring php-common php-pear pkg-php-tools
Suggested packages:
  dh-php dh-make
Recommended packages:
  ttf-dejavu-core
The following NEW packages will be installed:
  debsuryorg-archive-keyring php-common php-pear php8.2 php8.2-bcmath php8.2-cli php8.2-common php8.2-curl php8.2-dev php8.2-fpm php8.2-gd php8.2-gmagick php8.2-gmp
  php8.2-igbinary php8.2-intl php8.2-mbstring php8.2-mysql php8.2-opcache php8.2-readline php8.2-redis php8.2-xml php8.2-xmlrpc php8.2-zip pkg-php-tools
0 upgraded, 24 newly installed, 0 to remove and 2 not upgraded.
Need to get 7,231 kB/7,252 kB of archives.
After this operation, 34.2 MB of additional disk space will be used.
Do you want to continue? [Y/n] y
```


# Update configuration

Move old FPM pool configuration to new location
```
cd /etc/php/
mv -i 7.4/cli/conf.d/* 8.2/cli/conf.d/
mv -i 7.4/fpm/conf.d/* 8.2/fpm/conf.d/
mv -i 7.4/fpm/pool.d/* 8.2/fpm/pool.d/
```

Search for references to the php 7.4 paths - its known to be in the web server configuration and PHP configuration.
```
rgrep 7.4 /etc/
```

In my case, I had to search and replace `php7.4` with `php8.2` in the following locations - yours will differ by system.
```
sed -i 's/php7.4/php8.2/' 8.2/fpm/pool.d/providence.conf 8.2/fpm/pool.d/pawtucket.conf
sed -i 's/php7.4/php8.2/' /etc/nginx/sites-available/*
```


# Restart services

Depending on system configuration some incidental issues may arise, eg log locations not existing. Those will need to be identified and fixed as
required.

Example fixing up log path:
```
service php8.2-fpm restart
journalctl -xeu php8.2-fpm.service
mkdir -p /var/log/php8.2-fpm/
chown -R www-data: /var/log/php8.2-fpm/
```

Example of things working:
```
service php8.2-fpm restart
systemctl status php8.2-fpm.service
● php8.2-fpm.service - The PHP 8.2 FastCGI Process Manager
     Loaded: loaded (/lib/systemd/system/php8.2-fpm.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2024-10-22 20:21:53 AEDT; 5s ago
       Docs: man:php-fpm8.2(8)
    Process: 1599676 ExecStartPost=/usr/lib/php/php-fpm-socket-helper install /run/php/php-fpm.sock /etc/php/8.2/fpm/pool.d/www.conf 82 (code=exited, status=0/SUCCESS)
   Main PID: 1599667 (php-fpm8.2)
     Status: "Ready to handle connections"
service nginx restart
systemctl status nginx
● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
    Drop-In: /etc/systemd/system/nginx.service.d
             └─wait-for-network.conf
     Active: active (running) since Tue 2024-10-22 20:22:34 AEDT; 5s ago
       Docs: man:nginx(8)
    Process: 1599702 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
    Process: 1599703 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
```

Does composer need to be run? TBC circumstances when it should be.


# Finalising

- Remove downtime in monitoring
- Remove maintenance message

