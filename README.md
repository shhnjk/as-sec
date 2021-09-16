# as-sec

This repo is a PoC for verifying a thought I had, that WASM might be an interesting tool for Web Security. I.e. it might bring capability-based Web, instead of having access to all APIs by default (especially to third-party libraries).

## intro

There were few blog post ([example](https://surma.dev/things/js-to-asc/index.html)) that talks about some JS libraries/code might be better written in WASM for performance reasons. However, I thought that converting existing JS libraries to WASM might also have security gains, because:

1. WASM can't access network or DOM by default. Therefore, unlike normal JS library where a bug in the library or compromise of the library directly results in compromise of all websites using the library, WASM might be able to change that story.
2. If WASM need access to some Web APIs, JS side has to hand over that using [importObject](https://wasmbyexample.dev/examples/importing-javascript-functions-into-webassembly/importing-javascript-functions-into-webassembly.assemblyscript.en-us.html). This would mean that websites has much more visibility into what kind of capabilities that library needs (including future changes) and potentially add some protection in the `importObject` code.

## Structure of the repo
- [index.ts](https://github.com/shhnjk/as-sec/blob/main/assembly/index.ts) is the source code of WASM written in [AssemblyScript](https://www.assemblyscript.org/).
- [optimized.wasm](https://github.com/shhnjk/as-sec/blob/main/build/optimized.wasm) is the compiled WASM code.
- [web](https://github.com/shhnjk/as-sec/tree/main/web) directory has HTML and JS code which uses WASM ([live demo](https://shhnjk.github.io/PoCs/wasm/wasm.html)).

## How to build

In case you want to make changes, follow [quick start](https://www.assemblyscript.org/quick-start.html) and running `npm run asbuild` on this repo should compile your WASM in [build](https://github.com/shhnjk/as-sec/tree/main/build) directory.

## Conclusion

I was able to confirm in the [PoC](https://shhnjk.github.io/PoCs/wasm/wasm.html) that it's relatively easy to check what kind of capabilities the WASM needs by looking at [importObject](https://github.com/shhnjk/as-sec/blob/615f4c3655c3b31c85795f5e3ef7811fff8244de/web/wasm.js#L7-L12), and I was able to provide [alternative importObject](https://github.com/shhnjk/as-sec/blob/615f4c3655c3b31c85795f5e3ef7811fff8244de/web/careful-dev.js#L8-L12) which blocks dangerous behavior (without changing the WASM code).

However, there are many libraries that support [large importObject](https://github.com/lume/asdom/blob/4014a4d59242fa56459b3d04f869660ebc53a437/glue/index.js#L116-L808). So at the point where libraries take advantage of such `importObject` to acccess DOM or network, it'll be difficult to know what's being used and what's not 😢
