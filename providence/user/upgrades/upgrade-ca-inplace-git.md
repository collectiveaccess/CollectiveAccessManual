---
title: Upgrade in place using git
---

Work in progress instructions to upgrade CA between versions using an in place, git based update.

# Before you start

Some qustions to consider.
- Are there customisations to the codebase which need preserving?
- Do the release notes mention any breaking changes?
- Is configuration stored separately?
- Determine git tag/id of target upgrade version

and ensure backups are up to date!


# Check current status

Check what the current version of CA and the database scheme is
```
cat app/version.php
```

Confirm your current git commit
```
git log -n 1
```

Confirm your php version is supported by the target CA version. If not, you might have to [upgrade php]
```
php --version
```


# Prepare system

- Schedule downtime in monitoring
- Put up maintenance message


# Upgrading applications

Upgrading Providence and Pawtucket is largely identical, differences can be noted along the way.

Change to the application directory.
```
cd /path/to/providence/
```

Update to desired version, in this case it would be using a version 2 tag
```
git pull
git checkout v2.0
```

Check the database schema version and compare with the earlier record.
```
cat app/version.php
```

If it has changed, migrate the database contents.
```
./support/bin/caUtils update-database-schema
```

If composer.lock is present delete it
```
rm composer.lock
```

Then update dependencies using composer
```
composer update
```

Ensure the web server can read all CA's files.
```
find ./ -type d -exec chmod 755 {} \;
find ./ \! -type d -exec chmod 640 {} \;
chmod 755 support/bin/*
```

On RHEL selinux may also need to be adjusted.
```
chcon -R -t httpd_sys_content_t ./
chcon -R -t httpd_sys_rw_content_t ./app/log/ ./app/tmp/ ./media
```

Run CA included fix permissions tool
```
./support/bin/caUtils fix-permissions
```

