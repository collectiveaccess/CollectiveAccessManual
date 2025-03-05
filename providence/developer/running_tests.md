---
title: Automated testing
---

CollectiveAccess provides unit tests which can be run while doing development on the code or an install profile.

These instructions show how extra steps required for running tests.

Firstly install required packages, use the version of `pcov` compatible with your system.
```
root@multitest:/srv/providence# apt install php8.2-pcov
```

Then set up the database and install a profile. These scripts default to using supplied configuration but you can supply your own.

```
/srv/# cd /srv/providence/
/srv/providence/tests# ./tests/database_setup.sh
Creating cache dir at mysql_profile
Drop existing database
ERROR 1008 (HY000) at line 1: Can't drop database 'ca_test'; database doesn't exist
Create database
Grant permissions to database
Configuring MySQL server
[server]
# innodb-lock-wait-timeout=200

Restarting MySQL server
Show updated MySQL server variables
...
/srv/providence# ./tests/profile_setup.sh
Installing profile testing...
...
Exporting database to cache file: ./tests/mysql_profile/testing.sql
```

Tip: If doing an upgrade, delete `./tests/mysql_profile/[profile name].sql`.

Running tests can be done with the vendored `phpunit`; use the PHP version appropriate for your environment
```
/srv/providence# php8.2 ./vendor/bin/phpunit --configuration tests/phpunit-coverage.xml --coverage-text --bootstrap tests/setup-tests.php tests/
PHPUnit 9.6.21 by Sebastian Bergmann and contributors.

Runtime:       PHP 8.2.27 with PCOV 1.0.12
Configuration: tests/phpunit-coverage.xml
```

After running there will be output similar to the below which includes the number of tests, a coverage report, followed by per class testing results.
Expect 2,000 plus lines of output.
```
...
Tests: 529, Assertions: 9948, Errors: 20, Failures: 185, Incomplete: 1.

Generating code coverage report in Clover XML format ... done [00:00.694]


Code Coverage Report:
  2025-03-05 00:40:09

 Summary:
  Classes:  9.25% (38/411)
  Methods: 20.03% (1032/5152)
  Lines:   34.69% (41220/118820)
...
```

