---
title: Menu Stack
intro: Vertical menu list (with optional checkboxes). Used in sidebar nav, popover menus, etc
---

<h2 class="h2">Basic Example</h2>

<div class="demo-width-small">
  <div class="menu-stack">
    <h3 class="menu-stack__label">User Settings</h3>
    <ul class="menu-stack__list">
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#" >Profile Overview</a>
      </li>
      <li class="menu-stack__item">
        <details class="menu-stack__collapsible">
          <summary class="menu-stack__toggle">
            <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Account Management</span></span>
            <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
          </summary>
          <div class="menu-stack__collapsible-content">
            <ul class="menu-stack__list">
              <li class="menu-stack__item">
                <a class="menu-stack__link" href="#">Email Preferences</a>
              </li>
              <li class="menu-stack__item">
                <details class="menu-stack__collapsible">
                  <summary class="menu-stack__toggle">
                    <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Security Settings</span></span>
                    <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
                  </summary>
                  <div class="menu-stack__collapsible-content">
                    <ul class="menu-stack__list">
                      <li class="menu-stack__item"><a class="menu-stack__link" href="#">Change Password</a></li>
                      <li class="menu-stack__item">
                        <a class="menu-stack__link" href="#">Two-Factor Authentication (2FA) Setup and Backup Codes</a>
                      </li>
                    </ul>
                  </div>
                </details>
              </li>
            </ul>
          </div>
        </details>
      </li>
      <li class="menu-stack__item menu-stack__item--separator-before">
        <a class="menu-stack__link" href="#">Log Out</a>
      </li>
    </ul>
  </div>
</div>

<h2 class="h2">Compact Example</h2>

<div class="demo-width-small">
  <div class="menu-stack menu-stack--compact">
    <h3 class="menu-stack__label">Admin Navigation</h3>
    <ul class="menu-stack__list">
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#" >Dashboard</a>
      </li>
      <li class="menu-stack__item">
        <details class="menu-stack__collapsible">
          <summary class="menu-stack__toggle">
            <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Content Types</span></span>
            <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
          </summary>
          <div class="menu-stack__collapsible-content">
            <ul class="menu-stack__list">
              <li class="menu-stack__item">
                <a class="menu-stack__link" href="#">Pages</a>
              </li>
              <li class="menu-stack__item">
                <details class="menu-stack__collapsible">
                  <summary class="menu-stack__toggle">
                    <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Blog Posts</span></span>
                    <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
                  </summary>
                  <div class="menu-stack__collapsible-content">
                    <ul class="menu-stack__list">
                      <li class="menu-stack__item"><a class="menu-stack__link" href="#">Drafts</a></li>
                      <li class="menu-stack__item">
                        <a class="menu-stack__link" href="#">Published Articles and Press Releases</a>
                      </li>
                    </ul>
                  </div>
                </details>
              </li>
            </ul>
          </div>
        </details>
      </li>
      <li class="menu-stack__item menu-stack__item--separator-before">
        <a class="menu-stack__link" href="#">System Settings</a>
      </li>
    </ul>
  </div>
</div>

<h2 class="h2">Hanging with aria-current test</h2>

<div class="demo-width-small">
  <div class="menu-stack menu-stack--hanging">
    <h3 class="menu-stack__label">Documentation</h3>
    <ul class="menu-stack__list">
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#" >Getting Started</a>
      </li>
      <li class="menu-stack__item">
        <details class="menu-stack__collapsible">
          <summary class="menu-stack__toggle">
            <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Core Concepts</span></span>
            <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
          </summary>
          <div class="menu-stack__collapsible-content">
            <ul class="menu-stack__list">
              <li class="menu-stack__item">
                <a class="menu-stack__link" href="#">Routing Architecture</a>
              </li>
              <li class="menu-stack__item">
                <details class="menu-stack__collapsible">
                  <summary class="menu-stack__toggle">
                    <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">State Management</span></span>
                    <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
                  </summary>
                  <div class="menu-stack__collapsible-content">
                    <ul class="menu-stack__list">
                      <li class="menu-stack__item"><a class="menu-stack__link" href="#">Local Component State</a></li>
                      <li class="menu-stack__item">
                        <a class="menu-stack__link" href="#">Global Application State Using Context Providers and Reducers</a>
                      </li>
                    </ul>
                  </div>
                </details>
              </li>
            </ul>
          </div>
        </details>
      </li>
      <li class="menu-stack__item menu-stack__item--separator-before">
        <a class="menu-stack__link" href="#">API Reference</a>
      </li>
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#">Migration Guide</a>
      </li>
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#">Changelog</a>
      </li>
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#">Community Forums</a>
      </li>
    </ul>
  </div>
</div>

<h2 class="h2">Plain Menu Stack Test</h2>

<div class="demo-width-small">
  <div class="menu-stack menu-stack--plain">
    <h3 class="menu-stack__label">Company (Default Plain)</h3>
    <ul class="menu-stack__list">
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#" >About Us</a>
      </li>
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#" aria-current="page">Leadership Team and Board of Directors Bios and Contact Information</a>
      </li>
      <li class="menu-stack__item menu-stack__item--separator-before">
        <a class="menu-stack__link" href="#">Careers</a>
      </li>
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#">Contact Support</a>
      </li>
    </ul>
  </div>
</div>

<br>

<div class="demo-width-small">
  <div class="menu-stack menu-stack--plain menu-stack--compact">
    <h3 class="menu-stack__label">Legal (Compact Plain)</h3>
    <ul class="menu-stack__list">
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#" >Terms of Service</a>
      </li>
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#" aria-current="page">Privacy Policy and Data Handling Procedures for European Union Residents</a>
      </li>
      <li class="menu-stack__item menu-stack__item--separator-before">
        <a class="menu-stack__link" href="#">Cookie Policy</a>
      </li>
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#">Accessibility Statement</a>
      </li>
    </ul>
  </div>
</div>

<br>

<div class="demo-width-small">
  <div class="menu-stack menu-stack--plain menu-stack--hanging">
    <h3 class="menu-stack__label">Resources (Hanging Plain)</h3>
    <ul class="menu-stack__list">
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#" >Help Center</a>
      </li>
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#" aria-current="page">Comprehensive Video Tutorials and Walkthroughs for Enterprise Users</a>
      </li>
      <li class="menu-stack__item menu-stack__item--separator-before">
        <a class="menu-stack__link" href="#">Developer API Docs</a>
      </li>
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#">System Status</a>
      </li>
    </ul>
  </div>
</div>

<h2 class="h2">Multiple labels/lists</h2>

<div class="demo-width-small">
  <div class="menu-stack menu-stack--separated">
    <h3 class="menu-stack__label">Categories</h3>
    <ul class="menu-stack__list">
      <li class="menu-stack__item">
        <a class="menu-stack__link is-active" href="#" >Electronics</a>
      </li>
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#">Home Appliances and Smart Devices for Modern Connected Living Spaces</a>
      </li>
    </ul>
  </div>
  <div class="menu-stack menu-stack--hanging menu-stack--separated">
    <h3 class="menu-stack__label">Promotions</h3>
    <ul class="menu-stack__list">
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#">Clearance Sale</a>
      </li>
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#">Buy One Get One Free Offers Valid Only on Selected Items During Holiday Season</a>
      </li>
    </ul>
  </div>
</div>

<h2 class="h2">Checkbox Menu</h2>

<div class="demo-width-small">
  <div class="menu-stack form-theme">
    <h3 class="menu-stack__label">Filter by Brand</h3>
    <ul class="menu-stack__list">
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-1">
          <label for="cb-1">Apple</label>
        </div>
      </li>
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-2">
          <label for="cb-2">Samsung</label>
        </div>
      </li>
      <li class="menu-stack__item menu-stack__item--separator-before">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-3">
          <label for="cb-3">Sony</label>
        </div>
      </li>
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-4">
          <label for="cb-4">LG</label>
        </div>
      </li>
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-5">
          <label for="cb-5">Panasonic</label>
        </div>
      </li>
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-6">
          <label for="cb-6">Audio-Technica High-Fidelity Professional Studio Monitor Headphones and Equipment</label>
        </div>
      </li>
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-8">
          <label for="cb-8">Bose Noise Cancelling Over-Ear Wireless Headphones</label>
        </div>
      </li>
    </ul>
  </div>
</div>

<h2 class="h2">Checkbox Menu (compact modifier)</h2>

<div class="demo-width-small">
  <div class="menu-stack menu-stack--compact form-theme">
    <ul class="menu-stack__list">
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-c-1">
          <label for="cb-c-1">Black</label>
        </div>
      </li>
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-c-2">
          <label for="cb-c-2">White</label>
        </div>
      </li>
      <li class="menu-stack__item menu-stack__item--separator-before">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-c-3">
          <label for="cb-c-3">Silver</label>
        </div>
      </li>
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-c-4">
          <label for="cb-c-4">Space Gray</label>
        </div>
      </li>
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-c-5">
          <label for="cb-c-5">Midnight Green</label>
        </div>
      </li>
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-c-6">
          <label for="cb-c-6">Rose Gold with Matte Finish and Fingerprint Resistant Coating for Premium Feel</label>
        </div>
      </li>
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-c-7">
          <label for="cb-c-7">Pacific Blue Titanium Edition</label>
        </div>
      </li>
    </ul>
  </div>
</div>

<h2 class="h2">Checkbox Menu (hide-inputs)</h2>

<div class="demo-width-small">
  <div class="menu-stack form-theme menu-stack--hide-inputs">
    <ul class="menu-stack__list">
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-no-input-1">
          <label for="cb-no-input-1">Small</label>
        </div>
      </li>
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-no-input-2" checked>
          <label for="cb-no-input-2">Medium</label>
        </div>
      </li>
      <li class="menu-stack__item menu-stack__item--separator-before">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-no-input-3">
          <label for="cb-no-input-3">Large</label>
        </div>
      </li>
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-no-input-4">
          <label for="cb-no-input-4">Extra Large</label>
        </div>
      </li>
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-no-input-5">
          <label for="cb-no-input-5">XXL</label>
        </div>
      </li>
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-no-input-6">
          <label for="cb-no-input-6">One Size Fits All (Adjustable Band Included for Custom Fit on Most Body Types)</label>
        </div>
      </li>
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-no-input-7">
          <label for="cb-no-input-7">Custom Tailored Fit</label>
        </div>
      </li>
    </ul>
  </div>
</div>

<h2 class="h2">Checkbox Menu (plain)</h2>

<div class="demo-width-small">
  <div class="menu-stack form-theme menu-stack--plain">
    <ul class="menu-stack__list">
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-plain-1">
          <label for="cb-plain-1">Morning Delivery</label>
        </div>
      </li>
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-plain-2" checked>
          <label for="cb-plain-2">Afternoon Delivery</label>
        </div>
      </li>
      <li class="menu-stack__item menu-stack__item--separator-before">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-plain-3">
          <label for="cb-plain-3">Evening Delivery</label>
        </div>
      </li>
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-plain-4">
          <label for="cb-plain-4">Weekend Only</label>
        </div>
      </li>
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-plain-5">
          <label for="cb-plain-5">Express Shipping</label>
        </div>
      </li>
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-plain-6">
          <label for="cb-plain-6">Standard Shipping Processing (Expect 5-7 Business Days Before Tracking Information is Provided)</label>
        </div>
      </li>
      <li class="menu-stack__item">
        <div class="menu-stack__selectable">
          <input type="checkbox" id="cb-plain-7">
          <label for="cb-plain-7">Store Pickup Request</label>
        </div>
      </li>
    </ul>
  </div>
</div>

<h2 class="h2">With Icons</h2>

<div class="demo-width-small">
  <div class="menu-stack">
    <h3 class="menu-stack__label">User Profile</h3>
    <ul class="menu-stack__list">
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#" >
          <span class="menu-stack__link-icon fas fa-house" aria-hidden="true"></span>
          <span class="menu-stack__link-text">Dashboard</span>
        </a>
      </li>
      <li class="menu-stack__item">
        <a class="menu-stack__link is-active" href="#" >
          <span class="menu-stack__link-icon fas fa-user" aria-hidden="true"></span>
          <span class="menu-stack__link-text">Account Information</span>
        </a>
      </li>
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#" >
          <span class="menu-stack__link-icon fas fa-music" aria-hidden="true"></span>
          <span class="menu-stack__link-text">Audio Settings</span>
        </a>
      </li>
    </ul>
  </div>
</div>

<!-- begin tests move to the bottom at the end -->

<h2 class="h2">Multi-column Menu Stack for Testing</h2>

<section class="menu-stack menu-stack--multi-column">
  <h3 class="menu-stack__label">Sitemap Overview</h3>
  <div class="menu-stack__list">
    <div class="menu-stack__item">
      <div class="menu-stack__list menu-stack__list--parent">
        <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link" href="#">Products</a></div>
      </div>
        <ul class="menu-stack__list">
          <li class="menu-stack__item">
            <a class="menu-stack__link" href="#">Enterprise Solutions</a>
          </li>
          <li class="menu-stack__item">
            <a class="menu-stack__link" href="#">Small Business Packages</a>
          </li>
          <li class="menu-stack__item">
            <a class="menu-stack__link" href="#">Individual Licenses</a>
          </li>
        </ul>
    </div>
    <div class="menu-stack__item">
      <div class="menu-stack__list menu-stack__list--parent">
        <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link" href="#">Services</a></div>
      </div>
      <ul class="menu-stack__list">
        <li class="menu-stack__item">
          <a class="menu-stack__link" href="#">Consulting</a>
        </li>
        <li class="menu-stack__item">
          <a class="menu-stack__link" href="#">Implementation</a>
        </li>
        <li class="menu-stack__item">
          <a class="menu-stack__link" href="#">Ongoing Support</a>
        </li>
      </ul>
    </div>
    <div class="menu-stack__item">
      <div class="menu-stack__list menu-stack__list--parent">
        <div class="menu-stack__item menu-stack__item--parent">
          <a class="menu-stack__link" href="#">Company Directory</a>
        </div>
        <div class="menu-stack__item menu-stack__item--parent">
          <a class="menu-stack__link" href="#">Investor Relations</a>
        </div>
      </div>
    </div>
  </div>
</section>

<h2 class="h2">Div Parent List Structure Testing</h2>

<div class="demo-width-small">
  <section class="menu-stack">
    <h3 class="menu-stack__label">Global Regions</h3>
    <ul class="menu-stack__list">
      <li class="menu-stack__item">
        <details class="menu-stack__collapsible">
          <summary class="menu-stack__toggle">
            <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">North America</span></span>
            <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
          </summary>
          <div class="menu-stack__collapsible-content">
            <div class="menu-stack__list menu-stack__list--parent">
              <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link" href="#">Regional Overview</a></div>
            </div>
            <ul class="menu-stack__list">
              <li class="menu-stack__item">
                <a class="menu-stack__link" href="#">United States Hub</a>
              </li>
              <li class="menu-stack__item">
                <details class="menu-stack__collapsible">
                  <summary class="menu-stack__toggle">
                    <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Canada Offices</span></span>
                    <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
                  </summary>
                  <div class="menu-stack__collapsible-content">
                    <div class="menu-stack__list menu-stack__list--parent">
                      <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link" href="#">National Hub</a></div>
                    </div>
                    <ul class="menu-stack__list">
                      <li class="menu-stack__item"><a class="menu-stack__link" href="#">Toronto Data Center</a></li>
                      <li class="menu-stack__item">
                        <a class="menu-stack__link" href="#">Vancouver Creative Studio and West Coast Operations Center</a>
                      </li>
                    </ul>
                  </div>
                </details>
              </li>
            </ul>
          </div>
        </details>
      </li>
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#">European Headquarters</a>
      </li>
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#">Asia Pacific Region</a>
      </li>
    </ul>
  </section>
</div>

<h2 class="h2">Div Parent List Structure Testing (Hanging)</h2>

<div class="demo-width-small">
  <section class="menu-stack menu-stack--hanging">
    <h3 class="menu-stack__label">Global Regions</h3>
    <ul class="menu-stack__list">
      <li class="menu-stack__item">
        <details class="menu-stack__collapsible">
          <summary class="menu-stack__toggle">
            <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">North America</span></span>
            <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
          </summary>
          <div class="menu-stack__collapsible-content">
            <div class="menu-stack__list menu-stack__list--parent">
              <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link" href="#">Regional Overview</a></div>
            </div>
            <ul class="menu-stack__list">
              <li class="menu-stack__item">
                <a class="menu-stack__link" href="#">United States Hub</a>
              </li>
              <li class="menu-stack__item">
                <details class="menu-stack__collapsible">
                  <summary class="menu-stack__toggle">
                    <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Canada Offices</span></span>
                    <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
                  </summary>
                  <div class="menu-stack__collapsible-content">
                    <div class="menu-stack__list menu-stack__list--parent">
                      <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link" href="#">National Hub</a></div>
                    </div>
                    <ul class="menu-stack__list">
                      <li class="menu-stack__item"><a class="menu-stack__link" href="#">Toronto Data Center</a></li>
                      <li class="menu-stack__item">
                        <a class="menu-stack__link" href="#">Vancouver Creative Studio and West Coast Operations Center</a>
                      </li>
                    </ul>
                  </div>
                </details>
              </li>
            </ul>
          </div>
        </details>
      </li>
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#">European Headquarters</a>
      </li>
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#">Asia Pacific Region</a>
      </li>
    </ul>
  </section>
</div>

<h2 class="h2">Div Parent List Structure Testing (Compact)</h2>

<div class="demo-width-small">
  <section class="menu-stack menu-stack--compact">
    <h3 class="menu-stack__label">Global Regions</h3>
    <ul class="menu-stack__list">
      <li class="menu-stack__item">
        <details class="menu-stack__collapsible">
          <summary class="menu-stack__toggle">
            <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">North America</span></span>
            <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
          </summary>
          <div class="menu-stack__collapsible-content">
            <div class="menu-stack__list menu-stack__list--parent">
              <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link" href="#">Regional Overview</a></div>
            </div>
            <ul class="menu-stack__list">
              <li class="menu-stack__item">
                <a class="menu-stack__link" href="#">United States Hub</a>
              </li>
              <li class="menu-stack__item">
                <details class="menu-stack__collapsible">
                  <summary class="menu-stack__toggle">
                    <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Canada Offices</span></span>
                    <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
                  </summary>
                  <div class="menu-stack__collapsible-content">
                    <div class="menu-stack__list menu-stack__list--parent">
                      <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link" href="#">National Hub</a></div>
                    </div>
                    <ul class="menu-stack__list">
                      <li class="menu-stack__item"><a class="menu-stack__link" href="#">Toronto Data Center</a></li>
                      <li class="menu-stack__item">
                        <a class="menu-stack__link" href="#">Vancouver Creative Studio and West Coast Operations Center</a>
                      </li>
                    </ul>
                  </div>
                </details>
              </li>
            </ul>
          </div>
        </details>
      </li>
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#">European Headquarters</a>
      </li>
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#">Asia Pacific Region</a>
      </li>
    </ul>
  </section>
</div>

<h2 class="h2">Div Parent List Structure Testing (Plain)</h2>

<div class="demo-width-small">
  <section class="menu-stack menu-stack--plain">
    <h3 class="menu-stack__label">Global Regions</h3>
    <ul class="menu-stack__list">
      <li class="menu-stack__item">
        <details class="menu-stack__collapsible">
          <summary class="menu-stack__toggle">
            <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">North America</span></span>
            <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
          </summary>
          <div class="menu-stack__collapsible-content">
            <div class="menu-stack__list menu-stack__list--parent">
              <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link" href="#">Regional Overview</a></div>
            </div>
            <ul class="menu-stack__list">
              <li class="menu-stack__item">
                <a class="menu-stack__link" href="#">United States Hub</a>
              </li>
              <li class="menu-stack__item">
                <details class="menu-stack__collapsible">
                  <summary class="menu-stack__toggle">
                    <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Canada Offices</span></span>
                    <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
                  </summary>
                  <div class="menu-stack__collapsible-content">
                    <div class="menu-stack__list menu-stack__list--parent">
                      <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link" href="#">National Hub</a></div>
                    </div>
                    <ul class="menu-stack__list">
                      <li class="menu-stack__item"><a class="menu-stack__link" href="#">Toronto Data Center</a></li>
                      <li class="menu-stack__item">
                        <a class="menu-stack__link" href="#">Vancouver Creative Studio and West Coast Operations Center</a>
                      </li>
                    </ul>
                  </div>
                </details>
              </li>
            </ul>
          </div>
        </details>
      </li>
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#">European Headquarters</a>
      </li>
      <li class="menu-stack__item">
        <a class="menu-stack__link" href="#">Asia Pacific Region</a>
      </li>
    </ul>
  </section>
</div>

<!-- end tests -->