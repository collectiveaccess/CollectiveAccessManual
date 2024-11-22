# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Requirements
- nodejs
- yarn

Note that if using a Debian derivative, 'yarn' is packaged as `yarnpkg` and the installed binary name is also `yarnpkg`. To make it available under
the usual `yarn` name, create a symlink like so:
```
sudo ln -s /usr/bin/yarnpkg /usr/bin/yarn
```

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
