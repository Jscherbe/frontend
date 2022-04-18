(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{413:function(e,s,t){"use strict";t.r(s);var a={sassdocGroup:{mixins:[{description:"Change modules $config\n",context:{type:"mixin",name:"set",code:"\n  $config: map.merge($config, $changes) !global;\n",line:{start:25,end:27}},parameter:[{type:"Map",name:"changes",description:"Map of changes"}],example:[{type:"scss",code:'@include module-name.set(( "property" : value ));',description:"General example, replace module-name with module's name"}],group:["selector"],require:[{type:"variable",name:"config",autofill:!0,item:"base--variable--config"},{type:"variable",name:"config",autofill:!0,item:"base--variable--config"}],file:{path:"_selector.scss",name:"_selector.scss"},_uid:"selector--mixin--set"},{description:"Set the class selector overrides\n",context:{type:"mixin",name:"set-class-overrides",code:"\n  $-class-overrides: map.merge($-class-overrides, $changes) !global;\n",line:{start:41,end:43}},parameter:[{type:"Map",name:"changes",description:"Changes to merge"}],group:["selector"],require:[],file:{path:"_selector.scss",name:"_selector.scss"},_uid:"selector--mixin--set-class-overrides"}],variables:[{description:"Module Settings\n- This module can be used for dynamic classnames (used in base and some components). Some components selectors are too complex or coupled for dynamic classnames. \n",context:{type:"variable",name:"config",value:'(\n  "prefix" : ""\n)',scope:"default",line:{start:14,end:16}},todo:["See about documenting when a component doesn't run through the selecotr module to get it's base classname"],type:"Map",property:[{type:"String",name:"$config.prefix",description:"Global prefix for selectors (would be used for classname prefix for example)"}],group:["selector"],file:{path:"_selector.scss",name:"_selector.scss"},_uid:"selector--variable--config"}],functions:[{description:"Get a config option\n",context:{type:"function",name:"get",code:'\n  @return utils.require-map-get($config, $name, "selector [config]");\n',line:{start:34,end:36}},parameter:[{type:"Map",name:"name",description:"Name of property"}],example:[{type:"scss",code:'@include module-name.get("property");',description:"General example, replace module-name with module's name"}],group:["selector"],require:[{type:"function",name:"require-map-get",autofill:!0,item:"utils--function--require-map-get"},{type:"variable",name:"config",autofill:!0,item:"base--variable--config"}],file:{path:"_selector.scss",name:"_selector.scss"},_uid:"selector--function--get"},{description:"Used to allow global prefixing of classes, and also the ability to \nChange a class used in the system (ie. like a component for example)\n",context:{type:"function",name:"class",code:'\n  $override: map.get($-class-overrides, $class);\n  @return ".#{ get("prefix") }#{ if($override, $override, $class) }";\n',line:{start:49,end:52}},parameter:[{type:"String",name:"class",description:"The classname to set"}],group:["selector"],require:[{type:"function",name:"get",autofill:!0,item:"base--function--get"},{type:"function",name:"get",autofill:!0,item:"base--function--get"}],file:{path:"_selector.scss",name:"_selector.scss"},usedBy:["base--mixin--base-typography-styles","color--mixin--all-context-styles","color--mixin--all-color-class-styles","components--mixin--component-button-styles","components--mixin--component-links-styles","components--mixin--styles","components--mixin--styles","helpers--mixin--helper-display-styles","helpers--mixin--helper-typography-styles","helpers--mixin--helper-typography-styles","helpers--mixin--helper-typography-styles","helpers--mixin--styles","helpers--mixin--styles"],_uid:"selector--function--class"}],placeholders:[]}},o=t(24),n=Object(o.a)(a,(function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"selector"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#selector"}},[e._v("#")]),e._v(" Selector")]),e._v(" "),t("h2",{attrs:{id:"mixins"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mixins"}},[e._v("#")]),e._v(" Mixins")]),e._v(" "),t("h3",{attrs:{id:"set"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#set"}},[e._v("#")]),e._v(" set()")]),e._v(" "),t("p",[e._v("Change modules $config")]),e._v(" "),t("SassdocItem",{attrs:{item:e.$options.sassdocGroup.mixins[0]}}),e._v(" "),t("h3",{attrs:{id:"set-class-overrides"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#set-class-overrides"}},[e._v("#")]),e._v(" set-class-overrides()")]),e._v(" "),t("p",[e._v("Set the class selector overrides")]),e._v(" "),t("SassdocItem",{attrs:{item:e.$options.sassdocGroup.mixins[1]}}),e._v(" "),t("h2",{attrs:{id:"variables"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#variables"}},[e._v("#")]),e._v(" Variables")]),e._v(" "),t("h3",{attrs:{id:"config"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#config"}},[e._v("#")]),e._v(" $config")]),e._v(" "),t("p",[e._v("Module Settings")]),e._v(" "),t("ul",[t("li",[e._v("This module can be used for dynamic classnames (used in base and some components). Some components selectors are too complex or coupled for dynamic classnames.")])]),e._v(" "),t("SassdocItem",{attrs:{item:e.$options.sassdocGroup.variables[0]}}),e._v(" "),t("h2",{attrs:{id:"functions"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#functions"}},[e._v("#")]),e._v(" Functions")]),e._v(" "),t("h3",{attrs:{id:"get"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#get"}},[e._v("#")]),e._v(" get()")]),e._v(" "),t("p",[e._v("Get a config option")]),e._v(" "),t("SassdocItem",{attrs:{item:e.$options.sassdocGroup.functions[0]}}),e._v(" "),t("h3",{attrs:{id:"class"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#class"}},[e._v("#")]),e._v(" class()")]),e._v(" "),t("p",[e._v("Used to allow global prefixing of classes, and also the ability to\nChange a class used in the system (ie. like a component for example)")]),e._v(" "),t("SassdocItem",{attrs:{item:e.$options.sassdocGroup.functions[1]}}),e._v(" "),t("h2",{attrs:{id:"placeholders"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#placeholders"}},[e._v("#")]),e._v(" Placeholders")])],1)}),[],!1,null,null,null);s.default=n.exports}}]);