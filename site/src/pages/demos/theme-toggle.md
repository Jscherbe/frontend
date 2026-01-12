---
title: Theme Toggle
intro: Test show how theme toggle (javascript module) can be used contextually/independently. It's also used on the site container.
layout: unformatted
---


<style>
  .theme-toggle-demo {
    border: 2px solid black;
    padding: 3rem;
    margin: 1rem 0 2rem 0;
  }
  .theme-toggle-demo.theme-light {
    background: white;
  }
  .theme-toggle-demo.theme-dark {
    background: DimGray;
  }
</style>

<h2 class="h2">Contextual Test</h2>

<button class="button" data-ulu-theme-toggle='{ 
  "target" : ".theme-target-demo-1",
  "group" : "group-1"
}'>
  <span class="button__icon fas fa-moon" data-ulu-theme-toggle-icon></span>
  <span>Toggle</span>
</button>

<p>
  Testing two buttons control one area
  <button class="link" data-ulu-theme-toggle-remote="group-1">
    Change Theme to <span data-ulu-theme-toggle-label>Dark</span>
  </button>
</p>

<div class="theme-target-demo-1 theme-toggle-demo theme-dark">
  <p>
    {{ placeholder.text }}
  </p>
  
  <button class="button">Placeholder Button</button>
</div>

<div class="theme-target-demo-1 theme-toggle-demo theme-dark">
  This is a separate container (for testing multiple targets)
  <p>
    {{ placeholder.text }}
  </p>
  
  <button class="button">Placeholder Button</button>
</div>


<h2 class="h2">Contextual Test Inverse</h2>

<p>
  <em>Clicking the button will also test adding an additional remote button for testing.</em>
</p>

<button class="button" data-ulu-theme-toggle='{ 
  "target" : "#demo-theme-2",
  "group" : "group-2"
}' data-demo-insert>
  <span class="button__icon fas fa-sun" data-ulu-theme-toggle-icon></span>
  <span>Toggle</span>
</button>

<div id="demo-theme-2" class="theme-toggle-demo theme-light">
  <p>
    {{ placeholder.text }}
  </p>
  <button class="button">Placeholder Button</button>
</div>


<script>
  // Quick script to test remote
  (() => {
    const button = document.querySelector("[data-demo-insert]");
    const createRemote = () => {
      const remote = document.createElement("button");
      remote.setAttribute("data-ulu-theme-toggle-remote", "group-2");
      remote.classList.add("link");
      remote.textContent = "Test Inserted Remote";
      return remote;
    };

    button.addEventListener("click", () => {
      const remote = createRemote();
      button.insertAdjacentElement('afterend', remote);
      document.dispatchEvent(new CustomEvent("ulu:pageModified", { bubbles: true }));
    });
  })();
</script>

<h2 class="h2">Test Changing Sites Theme</h2>

<p>
  <em>The button below should toggle the sites theme</em>
</p>

<button class="button" data-ulu-theme-toggle-remote="page">
  <span class="button__icon fas fa-moon" data-ulu-theme-toggle-icon></span>
  <span>Toggle from: <span data-ulu-theme-toggle-label></span></span>
</button>