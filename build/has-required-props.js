module.exports = function hasRequiredProps(required) {
  return function(object) {
    const missing = required.reduce((a, key) => {
      if (!object[key]) a.push(key);
      return a;
    }, []);
    return { 
      missing, 
      passed: !missing.length 
    };
  }
};