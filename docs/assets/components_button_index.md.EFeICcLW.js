import{S as d,a as p}from"./chunks/SassdocDetails.y9MQ7m6E.js";import{_ as h,C as c,o as m,c as _,k as t,a as e,H as n,w as l,Q as o}from"./chunks/framework.KniyC9bu.js";const u=[{groupName:"button",id:"mixin-set",uid:"button-mixin-set",title:"set()",groupPath:"/components/button/",path:"/components/button/#mixin-set"},{groupName:"button",id:"function-get",uid:"button-function-get",title:"get()",groupPath:"/components/button/",path:"/components/button/#function-get"},{groupName:"button",id:"mixin-styles",uid:"button-mixin-styles",title:"styles()",groupPath:"/components/button/",path:"/components/button/#mixin-styles",previewsByIndex:{}}],g={components:{SassdocPreview:d,SassdocDetails:p},provide:{getSassdocItem(i){return u.find(r=>r.uid===i)},getSassdocGroup(){return u},sassdocPreviewOptions:JSON.parse(decodeURIComponent("%7B%22previewStyles%22%3A%22%5Cn%20%20%20%20height%3A%2020em%3B%5Cn%20%20%20%20width%3A%20100%25%3B%5Cn%20%20%20%20border%3A%20none%3B%5Cn%20%20%20%20background-color%3A%20%23f9f9f9%3B%5Cn%20%20%20%20border-radius%3A%206px%3B%5Cn%20%20%20%20padding%3A%2012px%3B%5Cn%20%20%20%20margin%3A%201.5em%200%3B%5Cn%20%20%22%2C%22previewHead%22%3A%22%5Cn%20%20%20%20%3Ctitle%3ESassdoc%20Example%3C%2Ftitle%3E%20%5Cn%20%20%20%20%3Cmeta%20charset%3D%5C%22utf-8%5C%22%3E%20%5Cn%20%20%20%20%3Cmeta%20name%3D%5C%22viewport%5C%22%20content%3D%5C%22width%3Ddevice-width%2C%20initial-scale%3D1%5C%22%3E%20%5Cn%20%20%20%20%3Clink%20rel%3D%5C%22stylesheet%5C%22%20href%3D%5C%22%2Fsassdoc-preview.css%5C%22%3E%5Cn%20%20%22%2C%22previewScripts%22%3A%22%5Cn%20%20%20%20%3Cscript%20src%3D%5C%22%2Fsassdoc-preview.js%5C%22%3E%3C%2Fscript%3E%5Cn%20%20%22%7D"))}},L=JSON.parse('{"title":"Button","description":"","frontmatter":{"title":"Button","sassdocGroupName":"button","outline":"deep"},"headers":[],"relativePath":"components/button/index.md","filePath":"components/button/index.md"}'),x=t("h1",{id:"button",tabindex:"-1"},[e("Button "),t("a",{class:"header-anchor",href:"#button","aria-label":'Permalink to "Button"'},"​")],-1),f=t("h2",{id:"mixins",tabindex:"-1"},[e("Mixins "),t("a",{class:"header-anchor",href:"#mixins","aria-label":'Permalink to "Mixins"'},"​")],-1),b={id:"mixin-set",tabindex:"-1"},y=t("a",{class:"header-anchor",href:"#mixin-set","aria-label":'Permalink to "set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set}"'},"​",-1),C=t("p",null,"Change modules $config",-1),q=t("ul",null,[t("li",null,[t("strong",null,"File:"),e(" _button.scss")]),t("li",null,[t("strong",null,"Group:"),e(" button")]),t("li",null,[t("strong",null,"Type:"),e(" mixin")]),t("li",null,[t("strong",null,"Lines (comments):"),e(" 16-18")]),t("li",null,[t("strong",null,"Lines (code):"),e(" 20-22")])],-1),v=o('<h4 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;">$changes</td><td style="text-align:left;"><code>Map</code></td><td style="text-align:left;">Map of changes</td></tr><tr><td style="text-align:left;">@include module-name.set(( &quot;property&quot; : value ));</td><td style="text-align:left;"></td><td style="text-align:left;"></td></tr></tbody></table><h4 id="require" tabindex="-1">Require <a class="header-anchor" href="#require" aria-label="Permalink to &quot;Require&quot;">​</a></h4><ul><li>$config</li></ul>',4),P={id:"mixin-styles",tabindex:"-1"},E=t("a",{class:"header-anchor",href:"#mixin-styles","aria-label":'Permalink to "styles() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-styles}"'},"​",-1),T=t("p",null,"Prints button component styles",-1),k=t("ul",null,[t("li",null,[t("strong",null,"File:"),e(" _button.scss")]),t("li",null,[t("strong",null,"Group:"),e(" button")]),t("li",null,[t("strong",null,"Type:"),e(" mixin")]),t("li",null,[t("strong",null,"Lines (comments):"),e(" 32-36")]),t("li",null,[t("strong",null,"Lines (code):"),e(" 38-95")])],-1),B=o('<h4 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h4><div class="language-scss vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">scss</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">@include</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">ulu</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">component-button-styles</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">@include</span><span style="color:#24292E;"> </span><span style="color:#E36209;">ulu</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">component-button-styles</span><span style="color:#24292E;">();</span></span></code></pre></div><div class="language-raw vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">raw</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&lt;a class=&quot;button&quot; href=&quot;#&quot;&gt;Button Default&lt;/a&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&lt;a class=&quot;button&quot; href=&quot;#&quot;&gt;Button Default&lt;/a&gt;</span></span></code></pre></div><h4 id="require-1" tabindex="-1">Require <a class="header-anchor" href="#require-1" aria-label="Permalink to &quot;Require&quot;">​</a></h4><ul><li><a href="/components/button/#function-get">get()</a></li></ul><h2 id="functions" tabindex="-1">Functions <a class="header-anchor" href="#functions" aria-label="Permalink to &quot;Functions&quot;">​</a></h2>',6),S={id:"function-get",tabindex:"-1"},A=t("a",{class:"header-anchor",href:"#function-get","aria-label":'Permalink to "get() <Badge text="function" type="tip" vertical="top" />  {#function-get}"'},"​",-1),D=t("p",null,"Get a config option",-1),w=t("ul",null,[t("li",null,[t("strong",null,"File:"),e(" _button.scss")]),t("li",null,[t("strong",null,"Group:"),e(" button")]),t("li",null,[t("strong",null,"Type:"),e(" function")]),t("li",null,[t("strong",null,"Lines (comments):"),e(" 24-26")]),t("li",null,[t("strong",null,"Lines (code):"),e(" 28-30")])],-1),N=o('<h4 id="parameters-1" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-1" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;">$name</td><td style="text-align:left;"><code>Map</code></td><td style="text-align:left;">Name of property</td></tr><tr><td style="text-align:left;">@include module-name.get(&quot;property&quot;);</td><td style="text-align:left;"></td><td style="text-align:left;"></td></tr></tbody></table><h4 id="require-2" tabindex="-1">Require <a class="header-anchor" href="#require-2" aria-label="Permalink to &quot;Require&quot;">​</a></h4><ul><li>$config</li></ul>',4);function F(i,r,I,R,V,$){const s=c("Badge"),a=c("SassdocDetails");return m(),_("div",null,[x,f,t("h3",b,[e("set() "),n(s,{text:"mixin",type:"tip",vertical:"top"}),e(),y]),C,n(a,{summaryText:"Meta Information"},{default:l(()=>[q]),_:1}),v,t("h3",P,[e("styles() "),n(s,{text:"mixin",type:"tip",vertical:"top"}),e(),E]),T,n(a,{summaryText:"Meta Information"},{default:l(()=>[k]),_:1}),B,t("h3",S,[e("get() "),n(s,{text:"function",type:"tip",vertical:"top"}),e(),A]),D,n(a,{summaryText:"Meta Information"},{default:l(()=>[w]),_:1}),N])}const O=h(g,[["render",F]]);export{L as __pageData,O as default};
