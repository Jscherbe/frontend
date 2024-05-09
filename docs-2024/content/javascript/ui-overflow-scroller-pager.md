---
title: ui/overflow-scroller-pager
---

<a name="module_ui/overflow-scroller-pager"></a>

## ui/overflow-scroller-pager
<a name="exp_module_ui/overflow-scroller-pager--module.exports"></a>

### module.exports() ⇒ <code>function</code> ⏏
Function to be used in overflow scrollers "amount" option. This function will
determine how many items can fit in the viewport, taking into account scroll padding left, 
and will set the scroll amount to paginate between items. Items size can be anything 
(ie. one per screen vs 3.5 per screen will both work). This seperated from the plugin 
for tree shaking incase it's unneeded. Currently this is only setup for horizontal scrolling

Note: This is setup to return the function, incase configuration is needed in the future 
it can be passed to the create function

**Kind**: Exported function  
**Returns**: <code>function</code> - A function to be used in overflow scrollers "amount" configuration property  

  