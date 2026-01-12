---
title: utils/file-save
---

<a name="module_utils/file-save"></a>

# utils/file-save

* [utils/file-save](#module_utils/file-save)
    * _static_
        * [.FileSave](#module_utils/file-save.FileSave)
            * [new exports.FileSave(data, options)](#new_module_utils/file-save.FileSave_new)
            * _instance_
                * [.destroy()](#module_utils/file-save.FileSave+destroy)
                * [.getUrl()](#module_utils/file-save.FileSave+getUrl)
                * [.createLink(text)](#module_utils/file-save.FileSave+createLink)
            * _static_
                * [.isBrowserSupported()](#module_utils/file-save.FileSave.isBrowserSupported)
    * _inner_
        * [~FileSaveOptions](#module_utils/file-save..FileSaveOptions) : <code>Object</code>

<a name="module_utils/file-save.FileSave"></a>

## utils/file-save.FileSave
Simple script that is useful for testing
- Make a file 
- Create a URL to it
- Gives utility function to create a link to the file (for front end)
- Gives method to destroy the file when no longer needed
- User can redefine the program by passing options object matching props.     
Limited to new browsers that support Blob(), also user preferences or type of browser may limit access to Blob functionality

**Kind**: static class of [<code>utils/file-save</code>](#module_utils/file-save)  

* [.FileSave](#module_utils/file-save.FileSave)
    * [new exports.FileSave(data, options)](#new_module_utils/file-save.FileSave_new)
    * _instance_
        * [.destroy()](#module_utils/file-save.FileSave+destroy)
        * [.getUrl()](#module_utils/file-save.FileSave+getUrl)
        * [.createLink(text)](#module_utils/file-save.FileSave+createLink)
    * _static_
        * [.isBrowserSupported()](#module_utils/file-save.FileSave.isBrowserSupported)

<a name="new_module_utils/file-save.FileSave_new"></a>

### new exports.FileSave(data, options)

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | Data to put in blob file |
| options | <code>FileSaveOptions</code> | Options for file, see defaults (ie. type, filename) |

<a name="module_utils/file-save.FileSave+destroy"></a>

### fileSave.destroy()
Remove the blob url

**Kind**: instance method of [<code>FileSave</code>](#module_utils/file-save.FileSave)  
<a name="module_utils/file-save.FileSave+getUrl"></a>

### fileSave.getUrl()
Get the blob url

**Kind**: instance method of [<code>FileSave</code>](#module_utils/file-save.FileSave)  
<a name="module_utils/file-save.FileSave+createLink"></a>

### fileSave.createLink(text)
Create link element with blob as href

**Kind**: instance method of [<code>FileSave</code>](#module_utils/file-save.FileSave)  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The text to put in the link |

<a name="module_utils/file-save.FileSave.isBrowserSupported"></a>

### FileSave.isBrowserSupported()
Check for Compatibility (optional, implement on user side)

**Kind**: static method of [<code>FileSave</code>](#module_utils/file-save.FileSave)  
<a name="module_utils/file-save..FileSaveOptions"></a>

## utils/file-save~FileSaveOptions : <code>Object</code>
Options

**Kind**: inner typedef of [<code>utils/file-save</code>](#module_utils/file-save)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | Filename for blob when creating a link (ie createLink) [default "filesave-file.txt"] |
| type | <code>String</code> | Filename for blob when creating a link (ie createLink) [default "text/plain;charset=utf-8"] |


  