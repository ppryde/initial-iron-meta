# Initial Iron Meta

### What does it do?

The package is designed to provide meta data on initial page load based on options provided in the iron router configuration for both server and client side calls. It has no reliance on spiderable package or hashbangs to provide SEO data on initial html passed to client.

### Why is this important?

Providing meta data is crucial for certain types bots (i. e.  facebook), most of these bots only see the small chunk of html initially rendered to the clients browser as they dont load your apps javascript. This html has an empty body and you can only provide static meta tags for the head through meteor, no good for dynamic tags for the bots we want to see it! You can circumvent this issue using meteorhacks ssr package and I would recommend you do this in conjunction with this package to help provide content in your body for google using the fragments method (if you dont have content only meta you will get a hefty penalty from the Google gods).

So why is this still useful? Well some bots dont really care about the content and just need what you provide them (facebook og tags,  twitter and other apps which only look for meta) for Meteor this is still a problem, remember the static tags i mentioned, it can cause a lot headaches.

Take Facebook for example which doesnt use the google ajax crawling recommendations for `<meta name="fragment" content="!">` so to get fb to read a javascript app currently involves some addition of hashbangs to the url to tell facebook to get the special html snapshot from server, fb replaces the hashbang (#!) with _escaped_fragment_ and then you can pick this up using meteorhacks ssr/picker and serve your html snapshit. Hashbangs though, are not very pretty and you either have to include a hashbang in EVERY url (or more precisely a hashbang with a random character after it - fb debugger allows a trailing hashbang but fb status textbox will not)  so every url will end or begin !#/ or something similar not to mention you may need to use hash value in your app for something else and that hash paths are iron routers fall back for routing when using non-html5 browsers. With this package you can serve fb and any other random bots with the meta they desire injected into their initial header without checking user agents and fragment paths.

### Initial pages only?

One day the package will be maybe updated to handle any further routing client side and update the tags but for now it is enough to serve them on only the initial page as most (all?) bots will request a specific route each time and not click around so they should always be served the initial page and hence correct seo, we aren't particularly concerned about people manually viewing meta tags.

### Installation

Install using:
```
pip87:initial-iron-meta
```

> ###### Requirements
* Routes you wish to add meta to need to be declared in lib or location both client and server can see them (as with fast-render)

### Usage

Add the following to your route declaration

```
Router. route('/', {
  ...
  ironMeta:true,
  meta:function() {
    return {"og:title":"Initial meta rendering"};
  }
  ...
}) ;
```

***ironMeta*** - *boolean* 
- Should this be run for a different route or not

***meta*** - *object/array/function*
- object
  - { key:value, key2:value2, key3:value3 }
- array
  - [ { name:key, content:val }, { name:key2, content:val2 } ] 
- function
  - ```function(){ return { key:value, key2:value2 }; }```
  - ```function(){ return [ {name:key, content:val}, {name:key2, content:val2} ]; }```
   
### Under The Hood
All credit to the Meteorhacks guys for fast-render which I pillaged for code and inject-initial, ssr, picker, kadira and all the rest of their awesome work and the wizards of Iron Router!
On startup Route Controllers are checked and routes/param info are linked to the middleware which captures the route being run and gets the object/array/function provided by the meta field. In the case of the function it runs the function using the path and params for the route as context. All data is converted to an object of key value pairs before being passed to the inject-initial package to be injected using inject-initial before the basic html for the page is passed to the client via the usual routing paths.

### Known Issues
- If you are using server side rendering with routes that have the same path as their client side counterparts then currently declaring the meta field for the client route will populate both server and client side renders but you cannot (yet) populate route meta from the server side.
- Currently cannot manage dynamically added routes (although Im sure a listener could be implemented somewhere)

### Things To Do
- Bind to either client or server side routes specifically do not allow leakage
- Allow server side route tag definitions
- Increase support for common fields (along the lines of ms:seo)
- Enhance route filter and redirect to server side for certain routes

### Pulls
Extremely open to any and all pull requests to make any improvements you want!
