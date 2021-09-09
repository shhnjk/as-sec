# as-sec

This repo is a PoC for verifying a thought I had, that WASM might be an interesting tools for Web Security.

## intro

There were few blog post ([example](https://surma.dev/things/js-to-asc/index.html)) that talks about some JS libraries/code might be better written in WASM for performance reason. However, I thought that converting existing JS libraries to WASM might also have security gains, because:

1. WASM can't access network or DOM by default. Therefore, unlike normal JS library where a bug in the library or compromise of the library directly results in compromise of all websites using the library, WASM might be able to change that story.
2. If WASM need access to some Web APIs, JS side has to hand over that using [importObject](https://wasmbyexample.dev/examples/importing-javascript-functions-into-webassembly/importing-javascript-functions-into-webassembly.assemblyscript.en-us.html). This would mean that websites has much more visibility into what kind of capabilities this library needs (including future changes) and potentially add some protection in the `importObject` code.

## Structure of the repo
- [index.ts](https://github.com/shhnjk/as-sec/blob/main/assembly/index.ts) is the source code of WASM written in [AssemblyScript](https://www.assemblyscript.org/).
- [optimized.wasm](https://github.com/shhnjk/as-sec/blob/main/build/optimized.wasm) is the compiled WASM code.
- [web](https://github.com/shhnjk/as-sec/tree/main/web) directory has HTML and JS code which uses WASM.

## How to build

In case you want to make changes, follow [quick start](https://www.assemblyscript.org/quick-start.html) and running `npm run asbuild` on this repo should compile your WASM in [build](https://github.com/shhnjk/as-sec/tree/main/build) directory.

## Conclusion

