---
title: ui/slider
---

<a name="module_ui/slider"></a>

# ui/slider

* [ui/slider](#module_ui/slider)
    * [.Slider](#module_ui/slider.Slider)
        * [.defaults](#module_ui/slider.Slider+defaults)
        * [.handleResize()](#module_ui/slider.Slider+handleResize)
        * [.previous()](#module_ui/slider.Slider+previous)
        * [.next()](#module_ui/slider.Slider+next)
        * [.ensureTransitionEnds(element, duration, beginTransition)](#module_ui/slider.Slider+ensureTransitionEnds)
        * [.translateTo()](#module_ui/slider.Slider+translateTo)
        * [.setVisibility()](#module_ui/slider.Slider+setVisibility)
        * [.fadeSlide()](#module_ui/slider.Slider+fadeSlide)
        * [.slideTransition()](#module_ui/slider.Slider+slideTransition)
        * [.fadeTransition()](#module_ui/slider.Slider+fadeTransition)
        * [.noTransition()](#module_ui/slider.Slider+noTransition)
    * [.initializer](#module_ui/slider.initializer)
    * [.init()](#module_ui/slider.init)
    * [.setupSlider(container, options)](#module_ui/slider.setupSlider)

<a name="module_ui/slider.Slider"></a>

## ui/slider.Slider
Class that controls slider

**Kind**: static class of [<code>ui/slider</code>](#module_ui/slider)  

* [.Slider](#module_ui/slider.Slider)
    * [.defaults](#module_ui/slider.Slider+defaults)
    * [.handleResize()](#module_ui/slider.Slider+handleResize)
    * [.previous()](#module_ui/slider.Slider+previous)
    * [.next()](#module_ui/slider.Slider+next)
    * [.ensureTransitionEnds(element, duration, beginTransition)](#module_ui/slider.Slider+ensureTransitionEnds)
    * [.translateTo()](#module_ui/slider.Slider+translateTo)
    * [.setVisibility()](#module_ui/slider.Slider+setVisibility)
    * [.fadeSlide()](#module_ui/slider.Slider+fadeSlide)
    * [.slideTransition()](#module_ui/slider.Slider+slideTransition)
    * [.fadeTransition()](#module_ui/slider.Slider+fadeTransition)
    * [.noTransition()](#module_ui/slider.Slider+noTransition)

<a name="module_ui/slider.Slider+defaults"></a>

### slider.defaults
Default options for slider

**Kind**: instance property of [<code>Slider</code>](#module_ui/slider.Slider)  
<a name="module_ui/slider.Slider+handleResize"></a>

### slider.handleResize()
Sliding mechanism needs translate updated on resize

**Kind**: instance method of [<code>Slider</code>](#module_ui/slider.Slider)  
<a name="module_ui/slider.Slider+previous"></a>

### slider.previous()
Goto to the previous slide

**Kind**: instance method of [<code>Slider</code>](#module_ui/slider.Slider)  
<a name="module_ui/slider.Slider+next"></a>

### slider.next()
Goto to the next slide

**Kind**: instance method of [<code>Slider</code>](#module_ui/slider.Slider)  
<a name="module_ui/slider.Slider+ensureTransitionEnds"></a>

### slider.ensureTransitionEnds(element, duration, beginTransition)
Makes sure that no matter what the callback is called if transition event
doesn't start or fails to finish/cancel

**Kind**: instance method of [<code>Slider</code>](#module_ui/slider.Slider)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>number</code> |  |
| duration | <code>number</code> | Duration to wait for complete |
| beginTransition | <code>function</code> | Css changes to begin/start transtion |

<a name="module_ui/slider.Slider+translateTo"></a>

### slider.translateTo()
Translate the track to X

**Kind**: instance method of [<code>Slider</code>](#module_ui/slider.Slider)  
<a name="module_ui/slider.Slider+setVisibility"></a>

### slider.setVisibility()
Show's a specifc slide and hides others, except when passing true to show all
then all slides will visible

**Kind**: instance method of [<code>Slider</code>](#module_ui/slider.Slider)  
<a name="module_ui/slider.Slider+fadeSlide"></a>

### slider.fadeSlide()
Perform a fade on a single slide

**Kind**: instance method of [<code>Slider</code>](#module_ui/slider.Slider)  
<a name="module_ui/slider.Slider+slideTransition"></a>

### slider.slideTransition()
Handler for the entire slide transtion

**Kind**: instance method of [<code>Slider</code>](#module_ui/slider.Slider)  
<a name="module_ui/slider.Slider+fadeTransition"></a>

### slider.fadeTransition()
Handler for the entire fade transtion

**Kind**: instance method of [<code>Slider</code>](#module_ui/slider.Slider)  
<a name="module_ui/slider.Slider+noTransition"></a>

### slider.noTransition()
Handler for the entire NO transtion

**Kind**: instance method of [<code>Slider</code>](#module_ui/slider.Slider)  
<a name="module_ui/slider.initializer"></a>

## ui/slider.initializer
Slider Component Initializer

**Kind**: static constant of [<code>ui/slider</code>](#module_ui/slider)  
<a name="module_ui/slider.init"></a>

## ui/slider.init()
Initialize all sliders based on data attribute selectors

**Kind**: static method of [<code>ui/slider</code>](#module_ui/slider)  
<a name="module_ui/slider.setupSlider"></a>

## ui/slider.setupSlider(container, options)
Setup single slider instance from querying via data attribute selectors

**Kind**: static method of [<code>ui/slider</code>](#module_ui/slider)  

| Param | Type | Description |
| --- | --- | --- |
| container | <code>Node</code> | The slide container to query children from |
| options | <code>Object</code> | Options for slider class |


  