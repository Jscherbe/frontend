import{S as p,a as u}from"./chunks/SassdocDetails.y9MQ7m6E.js";import{_ as h,C as d,o as g,c as m,k as t,a as e,H as a,w as n,Q as i}from"./chunks/framework.KniyC9bu.js";const c=[{groupName:"units",id:"variable-config",uid:"units-variable-config",title:"$config",groupPath:"/core/units/",path:"/core/units/#variable-config"},{groupName:"units",id:"mixin-set",uid:"units-mixin-set",title:"set()",groupPath:"/core/units/",path:"/core/units/#mixin-set",previewsByIndex:{}},{groupName:"units",id:"function-get",uid:"units-function-get",title:"get()",groupPath:"/core/units/",path:"/core/units/#function-get"}],f={components:{SassdocPreview:p,SassdocDetails:u},provide:{getSassdocItem(r){return c.find(o=>o.uid===r)},getSassdocGroup(){return c},sassdocPreviewOptions:JSON.parse(decodeURIComponent("%7B%22previewStyles%22%3A%22%5Cn%20%20%20%20height%3A%2020em%3B%5Cn%20%20%20%20width%3A%20100%25%3B%5Cn%20%20%20%20border%3A%20none%3B%5Cn%20%20%20%20background-color%3A%20%23f9f9f9%3B%5Cn%20%20%20%20border-radius%3A%206px%3B%5Cn%20%20%20%20padding%3A%2012px%3B%5Cn%20%20%20%20margin%3A%201.5em%200%3B%5Cn%20%20%22%2C%22previewHead%22%3A%22%5Cn%20%20%20%20%3Ctitle%3ESassdoc%20Example%3C%2Ftitle%3E%20%5Cn%20%20%20%20%3Cmeta%20charset%3D%5C%22utf-8%5C%22%3E%20%5Cn%20%20%20%20%3Cmeta%20name%3D%5C%22viewport%5C%22%20content%3D%5C%22width%3Ddevice-width%2C%20initial-scale%3D1%5C%22%3E%20%5Cn%20%20%20%20%3Clink%20rel%3D%5C%22stylesheet%5C%22%20href%3D%5C%22%2Fsassdoc-preview.css%5C%22%3E%5Cn%20%20%22%2C%22previewScripts%22%3A%22%5Cn%20%20%20%20%3Cscript%20src%3D%5C%22%2Fsassdoc-preview.js%5C%22%3E%3C%2Fscript%3E%5Cn%20%20%22%7D"))}},L=JSON.parse('{"title":"Units","description":"","frontmatter":{"title":"Units","sassdocGroupName":"units","outline":"deep"},"headers":[],"relativePath":"core/units/index.md","filePath":"core/units/index.md"}'),x=t("h1",{id:"units",tabindex:"-1"},[e("Units "),t("a",{class:"header-anchor",href:"#units","aria-label":'Permalink to "Units"'},"​")],-1),y=t("h2",{id:"variables",tabindex:"-1"},[e("Variables "),t("a",{class:"header-anchor",href:"#variables","aria-label":'Permalink to "Variables"'},"​")],-1),_={id:"variable-config",tabindex:"-1"},b=t("a",{class:"header-anchor",href:"#variable-config","aria-label":'Permalink to "$config <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-config}"'},"​",-1),C=t("p",null,"Module Settings",-1),v=t("ul",null,[t("li",null,[t("strong",null,"File:"),e(" _units.scss")]),t("li",null,[t("strong",null,"Group:"),e(" units")]),t("li",null,[t("strong",null,"Type:"),e(" variable")]),t("li",null,[t("strong",null,"Lines (comments):"),e(" 9-16")]),t("li",null,[t("strong",null,"Lines (code):"),e(" 18-25")])],-1),E=i('<h4 id="map-properties" tabindex="-1">Map Properties <a class="header-anchor" href="#map-properties" aria-label="Permalink to &quot;Map Properties&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;">small-x</td><td style="text-align:left;">Number</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">small</td><td style="text-align:left;">Number</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">default</td><td style="text-align:left;">Number</td><td style="text-align:left;">Base unit of measurent</td></tr><tr><td style="text-align:left;">large</td><td style="text-align:left;">Number</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">large-x</td><td style="text-align:left;">Number</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">large-xx</td><td style="text-align:left;">Number</td><td style="text-align:left;"></td></tr></tbody></table><h2 id="mixins" tabindex="-1">Mixins <a class="header-anchor" href="#mixins" aria-label="Permalink to &quot;Mixins&quot;">​</a></h2>',3),P={id:"mixin-set",tabindex:"-1"},q=t("a",{class:"header-anchor",href:"#mixin-set","aria-label":'Permalink to "set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set}"'},"​",-1),T=t("p",null,"Update the units config",-1),k=t("ul",null,[t("li",null,[t("strong",null,"File:"),e(" _units.scss")]),t("li",null,[t("strong",null,"Group:"),e(" units")]),t("li",null,[t("strong",null,"Type:"),e(" mixin")]),t("li",null,[t("strong",null,"Lines (comments):"),e(" 27-32")]),t("li",null,[t("strong",null,"Lines (code):"),e(" 34-36")])],-1),S=i(`<h4 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h4><p>Setting the error and type color</p><div class="language-scss vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">scss</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">@include</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">units</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">((</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;default&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#79B8FF;">1.5</span><span style="color:#F97583;">em</span></span>
<span class="line"><span style="color:#E1E4E8;">));</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">@include</span><span style="color:#24292E;"> </span><span style="color:#E36209;">units</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">((</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;default&quot;</span><span style="color:#24292E;"> : </span><span style="color:#005CC5;">1.5</span><span style="color:#D73A49;">em</span></span>
<span class="line"><span style="color:#24292E;">));</span></span></code></pre></div><h4 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;">$changes</td><td style="text-align:left;"><code>Map</code></td><td style="text-align:left;">A map to merge into the color palette</td></tr></tbody></table><h4 id="require" tabindex="-1">Require <a class="header-anchor" href="#require" aria-label="Permalink to &quot;Require&quot;">​</a></h4><ul><li><a href="/core/breakpoint/#variable-config">$config</a></li></ul><h2 id="functions" tabindex="-1">Functions <a class="header-anchor" href="#functions" aria-label="Permalink to &quot;Functions&quot;">​</a></h2>`,8),N={id:"function-get",tabindex:"-1"},A=t("a",{class:"header-anchor",href:"#function-get","aria-label":'Permalink to "get() <Badge text="function" type="tip" vertical="top" />  {#function-get}"'},"​",-1),B=t("p",null,"Get a unit by name (preset) or number (multiplier of base)",-1),D=t("ul",null,[t("li",null,[t("strong",null,"File:"),e(" _units.scss")]),t("li",null,[t("strong",null,"Group:"),e(" units")]),t("li",null,[t("strong",null,"Type:"),e(" function")]),t("li",null,[t("strong",null,"Lines (comments):"),e(" 38-40")]),t("li",null,[t("strong",null,"Lines (code):"),e(" 42-47")])],-1),F=i('<h4 id="parameters-1" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-1" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;">$value</td><td style="text-align:left;">`Number</td><td style="text-align:left;">String`</td></tr></tbody></table><h4 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;">Number</td></tr></tbody></table><h4 id="require-1" tabindex="-1">Require <a class="header-anchor" href="#require-1" aria-label="Permalink to &quot;Require&quot;">​</a></h4><ul><li>require-map-get()</li><li><a href="/core/breakpoint/#variable-config">$config</a></li></ul>',6);function w(r,o,I,V,M,$){const l=d("Badge"),s=d("SassdocDetails");return g(),m("div",null,[x,y,t("h3",_,[e("$config "),a(l,{text:"variable",type:"tip",vertical:"top"}),a(l,{text:"Map",type:"warning",vertical:"top"}),e(),b]),C,a(s,{summaryText:"Meta Information"},{default:n(()=>[v]),_:1}),E,t("h3",P,[e("set() "),a(l,{text:"mixin",type:"tip",vertical:"top"}),e(),q]),T,a(s,{summaryText:"Meta Information"},{default:n(()=>[k]),_:1}),S,t("h3",N,[e("get() "),a(l,{text:"function",type:"tip",vertical:"top"}),e(),A]),B,a(s,{summaryText:"Meta Information"},{default:n(()=>[D]),_:1}),F])}const U=h(f,[["render",w]]);export{L as __pageData,U as default};
