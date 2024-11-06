Collectiveaccess provides a tool, available in Providence and Pawtucket, called the 'Ban Hammer' to automatically block IPs based on provided settings.


# In built commands

```
./support/bin/caUtils help |grep -C2 ban
Bans

	clear-bans                    	Clear all bans.

	clear-whitelist               	Clear all whitelist entries.
```

These lists can be cleared via CLI but NOT queried. Inspecting ban/whitelist requires direct database querying.

In future it might also be possible to [query bans from caUtils](https://github.com/collectiveaccess/providence/issues/1646) but that functionality is
not currently available.

# Querying the database

Select an appropriate database
```
mysql
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 239654
Server version: 10.6.18-MariaDB-0ubuntu0.22.04.1 Ubuntu 22.04

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]>
MariaDB [(none)]> use collectiveaccess;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
```

## Counting banned addresses

```
MariaDB [collectiveaccess]> select count(*) from ca_ip_bans;
+----------+
| count(*) |
+----------+
|     1072 |
+----------+
1 row in set (0.001 sec)
```

## Checking an IP address

```
MariaDB [collectiveaccess]> select * from ca_ip_bans where ip_addr = "10.10.20.20";
+--------+-----------+------------+------------+---------------+
| ban_id | reason    | created_on | expires_on | ip_addr       |
+--------+-----------+------------+------------+---------------+
|   7208 | UserAgent | 1719640380 | 1719726780 | 10.10.20.20 |
+--------+-----------+------------+------------+---------------+
1 row in set (0.001 sec)
```

## Finding why things are banned
```
MariaDB [collectiveaccess]> select unique(reason) from ca_ip_bans ;
+-----------+
| reason    |
+-----------+
| UserAgent |
+-----------+
1 row in set (0.001 sec)

MariaDB [collectiveaccess]> select reason from ca_ip_whitelist;
Empty set (0.000 sec)
```

# Configuring ban hammer

Add `ban_hammer.conf` to an appropriate location so its included in the configuration search path (eg local config or a theme configuration).

Here we open the standard configuration (left) and custom (right) to compare settings
```
vi ./pawtucket/app/conf/ban_hammer.conf ./pawtucket/themes/custom/conf/ban_hammer.conf -O
```

CA supports IPs as strings or with globbing, user agents are matched with PHP [preg_match](https://www.php.net/manual/en/function.preg-match.php) so
can be regexes.
```
ip_whitelist = [
        10.10.20.20,
]

plugins.UserAgent = {
    banned_useragents = [
        "xMozilla/5.0",
        "Amazonbot",
        "Bytespider",
        "facebookexternalhit.*facebook.com"
    ]
}
```

Its best to whitelist static IPs rather than dynamic, and be aware that user agents might not be as clean cut as you imagine - see [this stack
exchange discussion](https://webmasters.stackexchange.com/questions/137914/spike-in-traffic-from-facebot-twitterbot-user-agent). Basically assume (and
you already knew this) that all user agent strings are lies.


# Removing all bans

```
providence# ./support/bin/caUtils clear-bans
CollectiveAccess 2.0 (197/GIT) Utilities
(c) 2013-2023 Whirl-i-Gig

Removed 7 bans

```

