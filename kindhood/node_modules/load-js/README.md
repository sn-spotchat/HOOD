# load-js

[![Greenkeeper badge](https://badges.greenkeeper.io/MiguelCastillo/load-js.svg)](https://greenkeeper.io/)

Promise based script loader for the browser using script tags.

This is a UMD module, so feel free to include it in your nodejs bundling pipeline or directly in the browser via script tags.

> Promise implementation needs to be polyfilled if environment does not already provide it.

# usage

## install

```
$ npm install load-js
```

## api

loadJS is a method that loads scripts concurrently using script tags. loadJS takes in a single or an array of items where the items can be just a url string, or a config object with options for configuring:

- `type`: defaults to `text/javascript`.
- `async`: defaults to `false`.
- `charset`: defaults to `utf-8`.
- `id`: no default value.
- `url`: Location of the script to load. Required if no `text` is provided.
- `text`: Script text to execute. Required if no `url` is provided.
- `cache`: flag to determine if item with ID or URL is to be cached. defaults to `true`.
- `allowExternal`: flag to handle situations when the DOM already has a script element with the same ID or URL as what loadJS is being told to load. By default, loadJS will use script elements that already exist in the DOM. To turn off this behavior, set `allowExternal` to false.

Some of these options are described in detail [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script).

> text and url are mutually exclusive and you must specify one. If you call loadJS with a string as a parameter that string will be treated as a url. If you specify both, then url will be used.

The `async` flag will enable the browsers ability load and execute scripts as soon as possible. This means that scripts are likely going to excute out of order. Because of the nondeterministic script execution nature of `async`, it is defaulted to false.

The elaborate more on the `allowExternal` flag. As explained in the options, this flag is particularly useful for handling situations when the DOM already has script elements with the same ID or URL as what loadJS is supposed to load. For example, if a script element with a URL `https://awesome.cdn/react.js` already exists in the DOM, and for some reason you ask loadJS to load that same URL, loadJS by default will return what already exists in the DOM instead of loading a new script. In order for loadJS to ignore what's already in the DOM and load its own script you need to set `allowExternal` to false.

## examples

Let's just give a simple example where `load-js` is loaded via a script tag in you HTML

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <!-- Include load-js -->
    <script type="text/javascript" src="https://unpkg.com/load-js@1.2.0"></script>

    <script type="text/javascript">
      /* load your stuff */
      loadJS(["https://code.jquery.com/jquery-2.2.1.js", "https://unpkg.com/react@15.3.1/dist/react.min.js"])
        .then(function() {
          console.log("jQuery and react are loaded");
        });
    </script>
  </head>

  <body>
  </body>
</html>
```

Another example configuring the script execution to be asynchonous

``` javascript
loadJS([{
  async: true,
  url: "https://code.jquery.com/jquery-2.2.1.js"
}, {
  async: true,
  url: "https://unpkg.com/react@15.3.1/dist/react.min.js"
}])
.then(() => {
  console.log("all done!");
});
```
