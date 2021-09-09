import * as AsBind from "./as-bind.esm.js";

async function start() {
  const response = await fetch('optimized.wasm');
  const bytes = await response.arrayBuffer();
  const instance = await AsBind.instantiate(bytes, {
    index: {
      createElement: tag => {
        if (tag == 'script')
          throw('We can not create a script tag for you :)');
        return document.createElement(tag);
      },
      setText: (elem, text) => {
        elem.textContent = text;
      },
      appendChild: elem => document.body.appendChild(elem)
    }
  });
  
  instance.exports.show();
}

start();
