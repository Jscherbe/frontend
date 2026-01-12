---
title: File Save
intro: Basic test for the file-save utility
---


<div class="form-theme form-theme--full-width">
  <div class="form-theme__item form-theme__item--textarea">
    <label for="file-save-filename">Filename:</label>
    <input 
      type="text" 
      id="file-save-filename" 
      name="file-save-filename" 
      placeholder="example.txt"
    />
  </div>
  <div class="form-theme__item form-theme__item--textarea">
    <label for="file-save-content">Content:</label>
    <textarea id="file-save-content" name="file-save-content" rows="5">This text will be in the file</textarea>
  </div>
</div>

<button class="button" id="file-save-trigger">
  Create File Link
</button>

<div id="file-save-link-container"></div>

<h2 class="h2">Script for this page</h2>

```js
addEventListener("DOMContentLoaded", () => {
  const elements = {
    trigger: document.getElementById("file-save-trigger"),
    filename: document.getElementById("file-save-filename"),
    content: document.getElementById("file-save-content"),
    linkContainer: document.getElementById("file-save-link-container")
  };
  elements.trigger.addEventListener("click", () => {
    if (!Ulu) return;
    const { FileSave } = Ulu;
    const filename = elements.filename.value || "example.txt";
    const content = elements.content.value;
    const file = new FileSave(content, { filename });
    if (file) {
      const link = file.createLink("Download File");
      link.classList.add("button", "button--secondary");
      elements.linkContainer.innerHTML = "";
      elements.linkContainer.appendChild(link);
    }
  });
});
```

<script>
  addEventListener("DOMContentLoaded", () => {
    const elements = {
      trigger: document.getElementById("file-save-trigger"),
      filename: document.getElementById("file-save-filename"),
      content: document.getElementById("file-save-content"),
      linkContainer: document.getElementById("file-save-link-container")
    };
    elements.trigger.addEventListener("click", () => {
      if (!Ulu) return;
      const { FileSave } = Ulu;
      const filename = elements.filename.value || "example.txt";
      const content = elements.content.value;
      const file = new FileSave(content, { filename });
      if (file) {
        const link = file.createLink("Download File");
        link.classList.add("button", "button--secondary");
        elements.linkContainer.innerHTML = "";
        elements.linkContainer.appendChild(link);
      }
    });
  });
</script>

