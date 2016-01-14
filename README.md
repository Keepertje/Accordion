# Accordion

Accordion directive for angular

> Very much under construction!
> This is a playfround project for me it is NOT stable and NOT mature.

## How to use it 
If you, despite the above warning, still want to use it:

Add the javascript and styling to your html:

```html
   <head>
       <link rel="stylesheet" href="../accordion/css/accordion.css">
   </head>
   
   <body>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.14/angular.min.js"></script>
     <script type="text/javascript" src="../accordion/js/accordion.js"></script>
  </body>
```
Declare a dependency on the accordion module
```javascript
 var app = angular.module('app',['accordion']);
```

Use it in your html
```html
 <accordion width="340px" height="400px">
      <!-- TODO: scale tabs based on the accordion size -->
    <accordion-tab item-title="Some stuff"  initially-open="true"
                   color="#FFFFFF">
    
     </accordion-tab>
     <accordion-tab item-title="Some stuff"
                     color="#B2EBF2">
     </accordion-tab>
      
    </accordion>   
```
## Options

Set the size of the accordion with width and height tags (default width="340px" height="400px")
```html
 <accordion width="340px" height="400px">
 ```

You can set the color of the tabs with the color tag.
You can set the title of a tab with the item-title tag.
```html
      <accordion-tab item-title="Some stuff"
                     color="#B2EBF2">
     </accordion-tab>
```

Pick the tab you want to be opened initially by setting the initially-opened tag on true
```html
  <accordion-tab item-title="Some stuff"  initially-open="true">
  </accordion-tab>
 ```
## TODO
* Height for tabs has now to be set manually in css everytime you add/delete tabs, this should be done automatically
* Contenttab inside the accordion-tab
* Use tab.html template instead of setting the html in the directive






