---
title: overflow-scroller-pager
---

<a name="module_overflow-scroller-pager"></a>

# overflow-scroller-pager
<a name="module_overflow-scroller-pager.createPager"></a>

## overflow-scroller-pager.createPager() ⇒ <code>function</code>
Function to be used in overflow scrollers "amount" option. This function will
determine how many items can fit in the viewport, taking into account scroll padding left, 
and will set the scroll amount to paginate between items. Items size can be anything 
(ie. one per screen vs 3.5 per screen will both work). This seperated from the plugin 
for tree shaking incase it's unneeded. Currently this is only setup for horizontal scrolling

Note: This is setup to return the function, incase configuration is needed in the future 
it can be passed to the create function

**Kind**: static method of [<code>overflow-scroller-pager</code>](#module_overflow-scroller-pager)  
**Returns**: <code>function</code> - A function to be used in overflow scrollers "amount" configuration property  

  