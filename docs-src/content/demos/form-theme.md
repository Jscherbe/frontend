---
title: Form Theme
intro: Settings to style your forms
  
---

# Form Theme

Styles given to the \<form> element and all of it's child elements. 

```html
  <form action="" method="get" class="form-theme">
```

## 

### Default Form

<form action="" method="get" class="form-theme">
  <div class="form-theme__item form-theme__item--text">
    <label for="name">Enter your name:<span class="form-theme__required-char">*</span> </label>
    <input type="text" name="name" id="name" required />
    <p class="form-theme__description">This is a description forthe name section</p>
  </div>
  <div class="form-theme__item form-theme__item--text">
    <label for="email">Enter your email: </label>
    <input type="email" name="email" id="email" required />
  </div>
  <div class="form-theme__item form-theme__item--select">
    <label for="checkbox">Check this box: </label>
    <input type="checkbox" value="checkbox" name="checkbox" />
  </div>
  <div class="form-theme__item form-theme__item--select">
    <label for="name">Pick your color:</label>
    <input type="color" name="color" value="color" />
  </div>
  <div class="form-theme__item form-theme__item--select">
    <label for="date">Pick your date:</label>
    <input name="date" type="date"  />
  </div>
  <div class="form-theme__item form-theme__item--file">
    <label for="file">Pick your file:</label>
    <input name="file" type="file"  />
  </div>
  <div class="form-theme__item form-theme__item--text">
    <label for="password">Pick your password:</label>
    <input name="password" type="password"  />
  </div>
  <div class="form-theme__item form-theme__item--select">
    <label for="range">Pick your range:</label>
    <input name="range" type="range"  />
  </div>
  <div class="form-theme__item form-theme__item--text">
    <label for="tel">Pick your tel:</label>
    <input name="tel" type="tel"  />
  </div>
  <div div class="form-theme__item form-theme__item--select">
    <label for="select">Choose a pet:</label>
    <select name="select" id="select">
      <option value="">--Please choose an option--</option>
      <option value="dog">Dog</option>
      <option value="cat">Cat</option>
      <option value="hamster">Hamster</option>
      <option value="parrot">Parrot</option>
      <option value="spider">Spider</option>
      <option value="goldfish">Goldfish</option>
    </select>
  </div>
  <fieldset>
    <legend>Choose your favorite monster</legend>
    <div class="form-theme__items-inline">
      <div class="form-theme__item">
        <input type="radio" id="kraken" name="monster" value="K" />
        <label for="kraken">Kraken</label><br />
      </div>
      <div class="form-theme__item">
        <input type="radio" id="sasquatch" name="monster" value="S" />
        <label for="sasquatch">Sasquatch</label><br />
      </div>
      <div class="form-theme__item">
        <input type="radio" id="mothman" name="monster" value="M" />
        <label for="mothman">Mothman</label>
      </div>
    </div>
  </fieldset>
  <div class="form-theme__item form-theme__item--textarea">
    <label for="story">Tell us your story:</label>
    <textarea name="story" rows="5" cols="33" placeholder="It was a dark and stormy night..."></textarea>
  </div>
  <div class="form-theme__actions">
    <input type="submit" value="Subscribe!" />
  </div>
</form>

<div class="rule"></div>

### Full-width

<form action="" method="get" class="form-theme form-theme--full-width">
  <div class="form-theme__item form-theme__item--text">
    <label for="name">Enter your name:<span class="form-theme__required-char">*</span> </label>
    <input type="text" name="name" id="name" required />
    <p class="form-theme__description">This is a description forthe name section</p>
  </div>
  <div class="form-theme__item form-theme__item--text">
    <label for="email">Enter your email: </label>
    <input type="email" name="email" id="email" required />
  </div>
  <div class="form-theme__item form-theme__item--select">
    <label for="checkbox">Check this box: </label>
    <input type="checkbox" value="checkbox" name="checkbox" />
  </div>
  <div class="form-theme__item form-theme__item--select">
    <label for="name">Pick your color:</label>
    <input type="color" name="color" value="color" />
  </div>
  <div class="form-theme__item form-theme__item--select">
    <label for="date">Pick your date:</label>
    <input name="date" type="date"  />
  </div>
  <div class="form-theme__item form-theme__item--file">
    <label for="file">Pick your file:</label>
    <input name="file" type="file"  />
  </div>
  <div class="form-theme__item form-theme__item--text">
    <label for="password">Pick your password:</label>
    <input name="password" type="password"  />
  </div>
  <div class="form-theme__item form-theme__item--select">
    <label for="range">Pick your range:</label>
    <input name="range" type="range"  />
  </div>
  <div class="form-theme__item form-theme__item--text">
    <label for="tel">Pick your tel:</label>
    <input name="tel" type="tel"  />
  </div>
  <div div class="form-theme__item form-theme__item--select">
    <label for="select">Choose a pet:</label>
    <select name="select" id="pet-select">
      <option value="">--Please choose an option--</option>
      <option value="dog">Dog</option>
      <option value="cat">Cat</option>
      <option value="hamster">Hamster</option>
      <option value="parrot">Parrot</option>
      <option value="spider">Spider</option>
      <option value="goldfish">Goldfish</option>
    </select>
  </div>
  <fieldset>
    <legend>Choose your favorite monster</legend>
    <div class="form-theme__items-inline">
      <div class="form-theme__item">
        <input type="radio" id="kraken" name="monster" value="K" />
        <label for="kraken">Kraken</label><br />
      </div>
      <div class="form-theme__item">
        <input type="radio" id="sasquatch" name="monster" value="S" />
        <label for="sasquatch">Sasquatch</label><br />
      </div>
      <div class="form-theme__item">
        <input type="radio" id="mothman" name="monster" value="M" />
        <label for="mothman">Mothman</label>
      </div>
    </div>
  </fieldset>
  <div class="form-theme__item form-theme__item--textarea">
    <label for="story">Tell us your story:</label>
    <textarea name="story" rows="5" cols="33" placeholder="It was a dark and stormy night..."></textarea>
  </div>
  <div class="form-theme__actions">
    <input type="submit" value="Subscribe!" />
  </div>
</form>

<div class="rule"></div>

### Hide Labels

<form action="" method="get" class="form-theme form-theme--hide-labels">
  <div class="form-theme__item form-theme__item--text">
    <label for="name">Enter your name:<span class="form-theme__required-char">*</span> </label>
    <input type="text" name="name" id="name" required />
    <p class="form-theme__description">This is a description for the name section</p>
  </div>
  <div class="form-theme__item form-theme__item--select">
    <label for="date">Pick your date:</label>
    <input name="date" type="date"  />
  </div>
  <div class="form-theme__item form-theme__item--file">
    <label for="file">Pick your file:</label>
    <input name="file" type="file"  />
  </div>
  <div class="form-theme__item form-theme__item--text">
    <label for="password">Pick your password:</label>
    <input name="password" type="password"  />
  </div>
  <div class="form-theme__item form-theme__item--select">
    <label for="range">Pick your range:</label>
    <input name="range" type="range"  />
  </div>
  <div class="form-theme__item form-theme__item--text">
    <label for="tel">Pick your tel:</label>
    <input name="tel" type="tel"  />
  </div>
  <div div class="form-theme__item form-theme__item--select">
    <label for="select">Choose a pet:</label>
    <select name="select" id="pet-select">
      <option value="">--Please choose an option--</option>
      <option value="dog">Dog</option>
      <option value="cat">Cat</option>
      <option value="hamster">Hamster</option>
      <option value="parrot">Parrot</option>
      <option value="spider">Spider</option>
      <option value="goldfish">Goldfish</option>
    </select>
  </div>
  <fieldset>
    <legend>Choose your favorite monster</legend>
    <div class="form-theme__items-inline">
      <div class="form-theme__item">
        <input type="radio" id="kraken" name="monster" value="K" />
        <label for="kraken">Kraken</label><br />
      </div>
      <div class="form-theme__item">
        <input type="radio" id="sasquatch" name="monster" value="S" />
        <label for="sasquatch">Sasquatch</label><br />
      </div>
      <div class="form-theme__item">
        <input type="radio" id="mothman" name="monster" value="M" />
        <label for="mothman">Mothman</label>
      </div>
    </div>
  </fieldset>
  <div class="form-theme__item form-theme__item--textarea">
    <label for="story">Tell us your story:</label>
    <textarea name="story" rows="5" cols="33" placeholder="It was a dark and stormy night..."></textarea>
  </div>
  <div class="form-theme__actions">
    <input type="submit" value="Subscribe!" />
  </div>
</form>

