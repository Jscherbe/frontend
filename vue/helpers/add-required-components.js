import Vue from 'vue';

const requiredComponent = require.context("@/components/global/", true, /\.vue$/);

requiredComponent
  .keys()
  .forEach(filename => {
    let config = requiredComponent(filename);
    config = config.default || config;
    Vue.component(
      config.name || (filename.replace(/^.+\//, '').replace(/\.\w+$/, '')), 
      config
    );
});