import{S as d,a as h}from"./chunks/SassdocDetails.y9MQ7m6E.js";import{_ as u,C as c,o as _,c as g,k as e,a,H as t,w as n,Q as i}from"./chunks/framework.KniyC9bu.js";const p=[{groupName:"path",id:"variable-aliases",uid:"path-variable-aliases",title:"$aliases",groupPath:"/core/path/",path:"/core/path/#variable-aliases"},{groupName:"path",id:"mixin-set-aliases",uid:"path-mixin-set-aliases",title:"set-aliases()",groupPath:"/core/path/",path:"/core/path/#mixin-set-aliases"},{groupName:"path",id:"function-get-alias",uid:"path-function-get-alias",title:"get-alias()",groupPath:"/core/path/",path:"/core/path/#function-get-alias"},{groupName:"path",id:"function-resolve",uid:"path-function-resolve",title:"resolve()",groupPath:"/core/path/",path:"/core/path/#function-resolve",previewsByIndex:{}}],m={components:{SassdocPreview:d,SassdocDetails:h},provide:{getSassdocItem(o){return p.find(r=>r.uid===o)},getSassdocGroup(){return p},sassdocPreviewOptions:JSON.parse(decodeURIComponent("%7B%22previewStyles%22%3A%22%5Cn%20%20%20%20height%3A%2020em%3B%5Cn%20%20%20%20width%3A%20100%25%3B%5Cn%20%20%20%20border%3A%20none%3B%5Cn%20%20%20%20background-color%3A%20%23f9f9f9%3B%5Cn%20%20%20%20border-radius%3A%206px%3B%5Cn%20%20%20%20padding%3A%2012px%3B%5Cn%20%20%20%20margin%3A%201.5em%200%3B%5Cn%20%20%22%2C%22previewHead%22%3A%22%5Cn%20%20%20%20%3Ctitle%3ESassdoc%20Example%3C%2Ftitle%3E%20%5Cn%20%20%20%20%3Cmeta%20charset%3D%5C%22utf-8%5C%22%3E%20%5Cn%20%20%20%20%3Cmeta%20name%3D%5C%22viewport%5C%22%20content%3D%5C%22width%3Ddevice-width%2C%20initial-scale%3D1%5C%22%3E%20%5Cn%20%20%20%20%3Clink%20rel%3D%5C%22stylesheet%5C%22%20href%3D%5C%22%2Fsassdoc-preview.css%5C%22%3E%5Cn%20%20%22%2C%22previewScripts%22%3A%22%5Cn%20%20%20%20%3Cscript%20src%3D%5C%22%2Fsassdoc-preview.js%5C%22%3E%3C%2Fscript%3E%5Cn%20%20%22%7D"))}},z=JSON.parse('{"title":"Path","description":"","frontmatter":{"title":"Path","sassdocGroupName":"path","outline":"deep"},"headers":[],"relativePath":"core/path/index.md","filePath":"core/path/index.md"}'),f=e("h1",{id:"path",tabindex:"-1"},[a("Path "),e("a",{class:"header-anchor",href:"#path","aria-label":'Permalink to "Path"'},"​")],-1),y=e("h2",{id:"variables",tabindex:"-1"},[a("Variables "),e("a",{class:"header-anchor",href:"#variables","aria-label":'Permalink to "Variables"'},"​")],-1),x={id:"aliases-badge-text-map",tabindex:"-1"},b=e("a",{class:"header-anchor",href:"#aliases-badge-text-map","aria-label":'Permalink to "$aliases <Badge text="variable" type="tip" vertical="top" /><Badge text="Map"'},"​",-1),C=e("ul",null,[e("li",null,"Important: alias could be used for directory or file so omit trailing slash for directories"),e("li",{id:"variable-aliases"},'All aliases must start with "#"" type="warning" vertical="top" /> ')],-1),v=e("p",null,"Aliases",-1),E=e("ul",null,[e("li",null,[e("strong",null,"File:"),a(" _path.scss")]),e("li",null,[e("strong",null,"Group:"),a(" path")]),e("li",null,[e("strong",null,"Type:"),a(" variable")]),e("li",null,[e("strong",null,"Lines (comments):"),a(" 9-12")]),e("li",null,[e("strong",null,"Lines (code):"),a(" 14-16")])],-1),P=e("h2",{id:"mixins",tabindex:"-1"},[a("Mixins "),e("a",{class:"header-anchor",href:"#mixins","aria-label":'Permalink to "Mixins"'},"​")],-1),q={id:"mixin-set-aliases",tabindex:"-1"},T=e("a",{class:"header-anchor",href:"#mixin-set-aliases","aria-label":'Permalink to "set-aliases() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set-aliases}"'},"​",-1),k=e("p",null,"Set aliases or change defaults",-1),w=e("ul",null,[e("li",null,[e("strong",null,"File:"),a(" _path.scss")]),e("li",null,[e("strong",null,"Group:"),a(" path")]),e("li",null,[e("strong",null,"Type:"),a(" mixin")]),e("li",null,[e("strong",null,"Lines (comments):"),a(" 18-19")]),e("li",null,[e("strong",null,"Lines (code):"),a(" 21-23")])],-1),B=i("",5),S={id:"function-get-alias",tabindex:"-1"},F=e("a",{class:"header-anchor",href:"#function-get-alias","aria-label":'Permalink to "get-alias() <Badge text="function" type="tip" vertical="top" />  {#function-get-alias}"'},"​",-1),A=e("p",null,"Get an aliase's path",-1),D=e("ul",null,[e("li",null,[e("strong",null,"File:"),a(" _path.scss")]),e("li",null,[e("strong",null,"Group:"),a(" path")]),e("li",null,[e("strong",null,"Type:"),a(" function")]),e("li",null,[e("strong",null,"Lines (comments):"),a(" 25-26")]),e("li",null,[e("strong",null,"Lines (code):"),a(" 28-30")])],-1),N=i("",4),I={id:"function-resolve",tabindex:"-1"},R=e("a",{class:"header-anchor",href:"#function-resolve","aria-label":'Permalink to "resolve() <Badge text="function" type="tip" vertical="top" />  {#function-resolve}"'},"​",-1),V=e("p",null,"Resolves a Path",-1),$=e("ul",null,[e("li",null,"Checks if path is an alias if so rewrite's it"),e("li",null,"Future could include rewrites for easier updating or rearranging of legacy things"),e("li",null,`Aliases work by starting with "#", Since it's an illegal uri character, needs to be escaped if used as literal, we felt that it was the safest way to mix aliases in with real URLs (so that a dev of a module using path.resolve can always pass paths through (user input unknown if alias)`)],-1),M=e("ul",null,[e("li",null,[e("strong",null,"File:"),a(" _path.scss")]),e("li",null,[e("strong",null,"Group:"),a(" path")]),e("li",null,[e("strong",null,"Type:"),a(" function")]),e("li",null,[e("strong",null,"Lines (comments):"),a(" 32-40")]),e("li",null,[e("strong",null,"Lines (code):"),a(" 42-58")])],-1),L=i("",4);function G(o,r,O,H,J,U){const s=c("Badge"),l=c("SassdocDetails");return _(),g("div",null,[f,y,e("h3",x,[a("$aliases "),t(s,{text:"variable",type:"tip",vertical:"top"}),a('<Badge text="Map '),b]),C,v,t(l,{summaryText:"Meta Information"},{default:n(()=>[E]),_:1}),P,e("h3",q,[a("set-aliases() "),t(s,{text:"mixin",type:"tip",vertical:"top"}),a(),T]),k,t(l,{summaryText:"Meta Information"},{default:n(()=>[w]),_:1}),B,e("h3",S,[a("get-alias() "),t(s,{text:"function",type:"tip",vertical:"top"}),a(),F]),A,t(l,{summaryText:"Meta Information"},{default:n(()=>[D]),_:1}),N,e("h3",I,[a("resolve() "),t(s,{text:"function",type:"tip",vertical:"top"}),a(),R]),V,$,t(l,{summaryText:"Meta Information"},{default:n(()=>[M]),_:1}),L])}const K=u(m,[["render",G]]);export{z as __pageData,K as default};