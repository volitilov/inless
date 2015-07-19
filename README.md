# inless

Automatical create LESS project.


## install

```
git clone https://github.com/TuxUbuntu/inless
cd inless
sudo npm i -g .
```

## usage

### create new project

```
inless init
```
### create new component

```
inless create compnent lalka
```

### remove component

```
inless remove compnent lalka
```

## Editing

### global variables

all global variables added into file

```
./styles/variables.less
```


## Usage in html

```
<link res="stylesheet" href="/styles/bundle.css" />
<div class="route-azaza">
	<div class="component-lalka">
		<h3>Heading</h3>
		<p>Text</p>
	</div>
</div>
```


