# inless

Framework for people.


## install

```bash
$ git clone https://github.com/TuxUbuntu/inless
$ cd inless
$ sudo npm i -g .
```

## usage

### create new project

```bash
$ mkdir project01
$ cd project01
$ inless init
```

## run project

Inless allow run project for any member of our team. :)

### run project for designer

This command run current project for designer:

```bash
$ inless start design
```
### run project for mark up  man

This command run current project for mark up  man:

```bash
$ inless start markup
```
### run project for developer

This command run current project for developer:

```bash
$ inless start dev
```

## Objects:

### Route

Create route in current project:

```bash
$ inless create route home
```

Remove route in current project:

```bash
$ inless remove route home
```

### Component

Create component in current project:

```bash
$ inless create component home
```

Remove component in current project:

```bash
$ inless remove component home
```

### Modificator

Create modificator in current project:

```bash
$ inless create modificator home
```

Remove modificator in current project:

```bash
$ inless remove modificator home
```


## Editing

### custom styles

all custom styles added into file

```
./application/basics/markup/style/index.less
```

### global variables

all global variables added into file

```
./application/basics/markup/style/variables.less
```

---

# TODO


### for designers


 * starting web helper
 * create grid system
 * create routes
 * create components
 * make responsive design for any component
 * create build custom icon fount
 * make web design for current project




```bash

# create plugin
#$ inless create plugin users
mkdir ./application/plugins/users
touch ./application/plugins/users/readme.md
touch ./application/plugins/users/package.json
touch ./application/plugins/users/server.js
touch ./application/plugins/users/client.js


# create api
#$ inless create api users
mkdir ./application/api/users
touch ./application/api/users/readme.md
touch ./application/api/users/package.json
touch ./application/api/users/index.js

```
