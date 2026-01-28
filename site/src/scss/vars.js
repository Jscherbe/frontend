
import sassVars from "./_vars.scss";

const parsed = { ...sassVars };

/**
 * Creating parsed values of anything starting with "json-"
 */
Object.keys(parsed).forEach(key => {
  if (key.startsWith("json-")) {
    const name = key.replace(/^json-/, "");
    // Since these are all strings of strings 
    // need to unwrap the string
    const value = parsed[key].replace(/^'|'$/g, "");
    parsed[name] = JSON.parse(value);
    delete parsed[key];
  }
});

export default parsed;