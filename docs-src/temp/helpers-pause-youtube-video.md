---
title: helpers/pause-youtube-video
---

<a name="module_helpers/pause-youtube-video"></a>

## helpers/pause-youtube-video

* [helpers/pause-youtube-video](#module_helpers/pause-youtube-video)
    * [.pauseVideos(context)](#module_helpers/pause-youtube-video.pauseVideos)
    * [.prepVideos()](#module_helpers/pause-youtube-video.prepVideos)

<a name="module_helpers/pause-youtube-video.pauseVideos"></a>

### helpers/pause-youtube-video.pauseVideos(context)
Somewhat hacky way to pause the video
- https://www.digitalredpanther.com/blog/play-pause-stop-youtube-embed
- Actual JS API documentation (Didn't follow this for now) (https://developers.google.com/youtube/iframe_api_reference)

**Kind**: static method of [<code>helpers/pause-youtube-video</code>](#module_helpers/pause-youtube-video)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Element</code> \| <code>Node</code> | The DOM element to search for and pause videos within |

<a name="module_helpers/pause-youtube-video.prepVideos"></a>

### helpers/pause-youtube-video.prepVideos()
Prep videos to be paused
- Add query parameters for js API
- Removes all other query parameters from iframe.src

**Kind**: static method of [<code>helpers/pause-youtube-video</code>](#module_helpers/pause-youtube-video)  

  