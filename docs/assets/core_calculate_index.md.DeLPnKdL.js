import{S as u,a as h}from"./chunks/SassdocDetails.y9MQ7m6E.js";import{_ as p,C as c,o as f,c as m,k as t,a as e,H as l,w as n,Q as r}from"./chunks/framework.KniyC9bu.js";const d=[{groupName:"calculate",id:"variable-config",uid:"calculate-variable-config",title:"$config",groupPath:"/core/calculate/",path:"/core/calculate/#variable-config"},{groupName:"calculate",id:"mixin-set",uid:"calculate-mixin-set",title:"set()",groupPath:"/core/calculate/",path:"/core/calculate/#mixin-set"},{groupName:"calculate",id:"function-get",uid:"calculate-function-get",title:"get()",groupPath:"/core/calculate/",path:"/core/calculate/#function-get"},{groupName:"calculate",id:"function-ratio-scale-size",uid:"calculate-function-ratio-scale-size",title:"ratio-scale-size()",groupPath:"/core/calculate/",path:"/core/calculate/#function-ratio-scale-size"},{groupName:"calculate",id:"function-pixel-to-em",uid:"calculate-function-pixel-to-em",title:"pixel-to-em()",groupPath:"/core/calculate/",path:"/core/calculate/#function-pixel-to-em"},{groupName:"calculate",id:"mixin-responsive-property",uid:"calculate-mixin-responsive-property",title:"responsive-property()",groupPath:"/core/calculate/",path:"/core/calculate/#mixin-responsive-property"}],g={components:{SassdocPreview:u,SassdocDetails:h},provide:{getSassdocItem(o){return d.find(s=>s.uid===o)},getSassdocGroup(){return d},sassdocPreviewOptions:JSON.parse(decodeURIComponent("%7B%22previewStyles%22%3A%22%5Cn%20%20%20%20height%3A%2020em%3B%5Cn%20%20%20%20width%3A%20100%25%3B%5Cn%20%20%20%20border%3A%20none%3B%5Cn%20%20%20%20background-color%3A%20%23f9f9f9%3B%5Cn%20%20%20%20border-radius%3A%206px%3B%5Cn%20%20%20%20padding%3A%2012px%3B%5Cn%20%20%20%20margin%3A%201.5em%200%3B%5Cn%20%20%22%2C%22previewHead%22%3A%22%5Cn%20%20%20%20%3Ctitle%3ESassdoc%20Example%3C%2Ftitle%3E%20%5Cn%20%20%20%20%3Cmeta%20charset%3D%5C%22utf-8%5C%22%3E%20%5Cn%20%20%20%20%3Cmeta%20name%3D%5C%22viewport%5C%22%20content%3D%5C%22width%3Ddevice-width%2C%20initial-scale%3D1%5C%22%3E%20%5Cn%20%20%20%20%3Clink%20rel%3D%5C%22stylesheet%5C%22%20href%3D%5C%22%2Fsassdoc-preview.css%5C%22%3E%5Cn%20%20%22%2C%22previewScripts%22%3A%22%5Cn%20%20%20%20%3Cscript%20src%3D%5C%22%2Fsassdoc-preview.js%5C%22%3E%3C%2Fscript%3E%5Cn%20%20%22%7D"))}},lt=JSON.parse('{"title":"Calculate","description":"","frontmatter":{"title":"Calculate","sassdocGroupName":"calculate","outline":"deep"},"headers":[],"relativePath":"core/calculate/index.md","filePath":"core/calculate/index.md"}'),_=t("h1",{id:"calculate",tabindex:"-1"},[e("Calculate "),t("a",{class:"header-anchor",href:"#calculate","aria-label":'Permalink to "Calculate"'},"​")],-1),x=t("h2",{id:"variables",tabindex:"-1"},[e("Variables "),t("a",{class:"header-anchor",href:"#variables","aria-label":'Permalink to "Variables"'},"​")],-1),y={id:"variable-config",tabindex:"-1"},b=t("a",{class:"header-anchor",href:"#variable-config","aria-label":'Permalink to "$config <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-config}"'},"​",-1),T=t("p",null,"Module Settings",-1),v=t("ul",null,[t("li",null,[t("strong",null,"File:"),e(" _calculate.scss")]),t("li",null,[t("strong",null,"Group:"),e(" calculate")]),t("li",null,[t("strong",null,"Type:"),e(" variable")]),t("li",null,[t("strong",null,"Lines (comments):"),e(" 9-11")]),t("li",null,[t("strong",null,"Lines (code):"),e(" 13-15")])],-1),C=r('<h4 id="map-properties" tabindex="-1">Map Properties <a class="header-anchor" href="#map-properties" aria-label="Permalink to &quot;Map Properties&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;">$config.responsive-change</td><td style="text-align:left;">Number</td><td style="text-align:left;">Default responsive amount to modify items using responsive-property mixin</td></tr></tbody></table><h2 id="mixins" tabindex="-1">Mixins <a class="header-anchor" href="#mixins" aria-label="Permalink to &quot;Mixins&quot;">​</a></h2>',3),P={id:"mixin-set",tabindex:"-1"},q=t("a",{class:"header-anchor",href:"#mixin-set","aria-label":'Permalink to "set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set}"'},"​",-1),N=t("p",null,"Change modules $config",-1),S=t("ul",null,[t("li",null,[t("strong",null,"File:"),e(" _calculate.scss")]),t("li",null,[t("strong",null,"Group:"),e(" calculate")]),t("li",null,[t("strong",null,"Type:"),e(" mixin")]),t("li",null,[t("strong",null,"Lines (comments):"),e(" 17-19")]),t("li",null,[t("strong",null,"Lines (code):"),e(" 20-22")])],-1),k=r('<h4 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;">$changes</td><td style="text-align:left;"><code>Map</code></td><td style="text-align:left;">Map of changes</td></tr><tr><td style="text-align:left;">@include module-name.set(( &quot;property&quot; : value ));</td><td style="text-align:left;"></td><td style="text-align:left;"></td></tr></tbody></table><h4 id="require" tabindex="-1">Require <a class="header-anchor" href="#require" aria-label="Permalink to &quot;Require&quot;">​</a></h4><ul><li><a href="/core/breakpoint/#variable-config">$config</a></li></ul>',4),A={id:"mixin-responsive-property",tabindex:"-1"},D=t("a",{class:"header-anchor",href:"#mixin-responsive-property","aria-label":'Permalink to "responsive-property() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-responsive-property}"'},"​",-1),$=t("p",null,"Provides user with a fallback for a calc that's just an enhancement",-1),B=t("ul",null,[t("li",null,[t("strong",null,"File:"),e(" _calculate.scss")]),t("li",null,[t("strong",null,"Group:"),e(" calculate")]),t("li",null,[t("strong",null,"Type:"),e(" mixin")]),t("li",null,[t("strong",null,"Lines (comments):"),e(" 52-55")]),t("li",null,[t("strong",null,"Lines (code):"),e(" 57-64")])],-1),I=r('<h4 id="parameters-1" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-1" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;">$property</td><td style="text-align:left;"><code>String</code></td><td style="text-align:left;">The CSS property to set</td></tr><tr><td style="text-align:left;">$value</td><td style="text-align:left;"><code>*</code></td><td style="text-align:left;">The value to set on the property</td></tr><tr><td style="text-align:left;">$responsive-change</td><td style="text-align:left;"><code>Css</code></td><td style="text-align:left;">The amount to change (vw or vh units) (combined with unit past)</td></tr></tbody></table><h2 id="functions" tabindex="-1">Functions <a class="header-anchor" href="#functions" aria-label="Permalink to &quot;Functions&quot;">​</a></h2>',3),w={id:"function-get",tabindex:"-1"},V=t("a",{class:"header-anchor",href:"#function-get","aria-label":'Permalink to "get() <Badge text="function" type="tip" vertical="top" />  {#function-get}"'},"​",-1),R=t("p",null,"Get a config option",-1),E=t("ul",null,[t("li",null,[t("strong",null,"File:"),e(" _calculate.scss")]),t("li",null,[t("strong",null,"Group:"),e(" calculate")]),t("li",null,[t("strong",null,"Type:"),e(" function")]),t("li",null,[t("strong",null,"Lines (comments):"),e(" 24-26")]),t("li",null,[t("strong",null,"Lines (code):"),e(" 28-30")])],-1),M=r('<h4 id="parameters-2" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-2" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;">$name</td><td style="text-align:left;"><code>Map</code></td><td style="text-align:left;">Name of property</td></tr><tr><td style="text-align:left;">@include module-name.get(&quot;property&quot;);</td><td style="text-align:left;"></td><td style="text-align:left;"></td></tr></tbody></table><h4 id="require-1" tabindex="-1">Require <a class="header-anchor" href="#require-1" aria-label="Permalink to &quot;Require&quot;">​</a></h4><ul><li>require-map-get()</li><li><a href="/core/breakpoint/#variable-config">$config</a></li></ul>',4),z={id:"function-ratio-scale-size",tabindex:"-1"},F=t("a",{class:"header-anchor",href:"#function-ratio-scale-size","aria-label":'Permalink to "ratio-scale-size() <Badge text="function" type="tip" vertical="top" />  {#function-ratio-scale-size}"'},"​",-1),L=t("p",null,"Calculate the size of something at a given scale (percentage/exponential)",-1),G=t("ul",null,[t("li",null,[t("strong",null,"File:"),e(" _calculate.scss")]),t("li",null,[t("strong",null,"Group:"),e(" calculate")]),t("li",null,[t("strong",null,"Type:"),e(" function")]),t("li",null,[t("strong",null,"Lines (comments):"),e(" 32-37")]),t("li",null,[t("strong",null,"Lines (code):"),e(" 39-41")])],-1),H=r('<h4 id="parameters-3" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-3" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;">$base</td><td style="text-align:left;"><code>Number</code></td><td style="text-align:left;">The number the scale starts at</td></tr><tr><td style="text-align:left;">$ratio</td><td style="text-align:left;"><code>Number</code></td><td style="text-align:left;">The amount the scale changes over one set</td></tr><tr><td style="text-align:left;">$sizes</td><td style="text-align:left;"><code>Number</code></td><td style="text-align:left;">The number of steps in the scale</td></tr><tr><td style="text-align:left;">$size</td><td style="text-align:left;"><code>Number</code></td><td style="text-align:left;">The step you are trying to calculate</td></tr></tbody></table><h4 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;">Number</td></tr></tbody></table><h4 id="require-2" tabindex="-1">Require <a class="header-anchor" href="#require-2" aria-label="Permalink to &quot;Require&quot;">​</a></h4><ul><li><a href="/core/breakpoint/#variable-sizes">$sizes</a></li></ul>',6),O={id:"function-pixel-to-em",tabindex:"-1"},j=t("a",{class:"header-anchor",href:"#function-pixel-to-em","aria-label":'Permalink to "pixel-to-em() <Badge text="function" type="tip" vertical="top" />  {#function-pixel-to-em}"'},"​",-1),J=t("p",null,"Convert from pixel to em",-1),Q=t("ul",null,[t("li",null,[t("strong",null,"File:"),e(" _calculate.scss")]),t("li",null,[t("strong",null,"Group:"),e(" calculate")]),t("li",null,[t("strong",null,"Type:"),e(" function")]),t("li",null,[t("strong",null,"Lines (comments):"),e(" 43-46")]),t("li",null,[t("strong",null,"Lines (code):"),e(" 48-50")])],-1),U=r('<h4 id="parameters-4" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-4" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;">$pixels</td><td style="text-align:left;"><code>Number</code></td><td style="text-align:left;">The number the scale starts at</td></tr><tr><td style="text-align:left;">$base</td><td style="text-align:left;"><code>Number</code></td><td style="text-align:left;">How many pixels equal 1em</td></tr></tbody></table><h4 id="returns-1" tabindex="-1">Returns <a class="header-anchor" href="#returns-1" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Type</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;">Number</td><td style="text-align:left;">Em Conversion</td></tr></tbody></table>',4);function K(o,s,W,X,Y,Z){const a=c("Badge"),i=c("SassdocDetails");return f(),m("div",null,[_,x,t("h3",y,[e("$config "),l(a,{text:"variable",type:"tip",vertical:"top"}),l(a,{text:"Map",type:"warning",vertical:"top"}),e(),b]),T,l(i,{summaryText:"Meta Information"},{default:n(()=>[v]),_:1}),C,t("h3",P,[e("set() "),l(a,{text:"mixin",type:"tip",vertical:"top"}),e(),q]),N,l(i,{summaryText:"Meta Information"},{default:n(()=>[S]),_:1}),k,t("h3",A,[e("responsive-property() "),l(a,{text:"mixin",type:"tip",vertical:"top"}),e(),D]),$,l(i,{summaryText:"Meta Information"},{default:n(()=>[B]),_:1}),I,t("h3",w,[e("get() "),l(a,{text:"function",type:"tip",vertical:"top"}),e(),V]),R,l(i,{summaryText:"Meta Information"},{default:n(()=>[E]),_:1}),M,t("h3",z,[e("ratio-scale-size() "),l(a,{text:"function",type:"tip",vertical:"top"}),e(),F]),L,l(i,{summaryText:"Meta Information"},{default:n(()=>[G]),_:1}),H,t("h3",O,[e("pixel-to-em() "),l(a,{text:"function",type:"tip",vertical:"top"}),e(),j]),J,l(i,{summaryText:"Meta Information"},{default:n(()=>[Q]),_:1}),U])}const at=p(g,[["render",K]]);export{lt as __pageData,at as default};
