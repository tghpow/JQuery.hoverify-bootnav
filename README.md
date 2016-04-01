# jQuery hoverfiyBootnav

Use this simple bootstrap addon to add a nice effect on nav's hover.

## How to install
### Step 1: link required files

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">	
<link rel="stylesheet" href="../hoverifyBootnav.css">
<!-- JS -->
<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="../hoverifyBootnav.js"></script>
```

If you want to use easing, dont forget to add it [like this one !]

### Step 2: Create html (bootstrap nav)

```html
<ul class="nav nav-tabs nav-stacked">
  <li role="presentation" class="active"><a href="#">Home</a></li>
  <li role="presentation"><a href="#">Profile</a></li>
  <li role="presentation"><a href="#">Messages</a></li>
  <li role="presentation" ><a href="#">Commands & account</a></li>
</ul>
```

If you don't have a li.active, hbn will not work.

### Step 3: Call Hoverify Bootnav
#### Using JS

```javascript
$(document).ready(function(){
	$('ul.nav').hoverifyBootnav();
});	
```

#### Using data attribute (HTML)
Add data-hbn to call Hoverify Bootnav

```html
<ul class="nav nav-tabs nav-stacked" data-hbn="">
  <li role="presentation" class="active"><a href="#">Home</a></li>
  <li role="presentation"><a href="#">Profile</a></li>
  <li role="presentation"><a href="#">Messages</a></li>
  <li role="presentation" ><a href="#">Commands & account</a></li>
</ul>
```

## Options

```javascript
duration_effect_on    , 	//400
duration_effect_off   , 	//1000
easing_effect_on      , 	//null
easing_effect_off     , 	//null
effect_mouse_hover    ,     //classic or teleportation
effect_mouse_out      ,     //classic or teleportation
background_color      , 	//null
color                 , 	//null
//Function
my_effect_mouse_hover ,     //null
my_effect_mouse_out   ,     //null
```

Using options with data attribute (HTML)

```html
 <ul class="nav nav-tabs" data-hbn-options='{ "duration_effect_on" : 700, "duration_effect_off" : 1000, "background_color" : "red"}'>
    <li role="presentation" class="active"><a href="#">Home</a></li>
    <li role="presentation"><a href="#">Profile</a></li>
    <li role="presentation"><a href="#">Messages</a></li>
    <li role="presentation"><a href="#">Commands & account</a></li>
</ul>
```

## Customize effects
You can set your own function on mouse hover & mouse out

```javascript
$('ul.nav.do-hbn').hoverifyBootnav({
	'duration_effect_on' : 400,
	'duration_effect_off' : 1000,
	'my_effect_mouse_hover': function(){ //do what you want },
	'my_effect_mouse_out': function(){ //do what you want }
});
```
## And more

If you call Hoverify Bootnav on many nav like this

```javascript
$('ul.nav.do-hbn').hoverifyBootnav({
	'duration_effect_on' : 400,
	'duration_effect_off' : 1000,
	'easing_effect_on' : 'easeOutElastic',
	'easing_effect_off' : 'easeOutBack',
	'background_color' : 'black',
	'color' : 'red'
});
```

And if you want to overwrite an option for one particular nav, use data attribute!
Like this (overwrite background-color):

```html
<ul class="nav nav-tabs nav-stacked" data-hbn-background-color="green">	
  <li role="presentation" class="active"><a href="#">..</a></li>
  <li role="presentation"><a href="#">..</a></li>
</ul>
```

## Change design

You want to set your own style? Use the selector .hoverboot-pill, like this

```css
.hoverboot-pill{
	background-color: none;
	border-bottom: 2px solid #337ab7;
}
```


