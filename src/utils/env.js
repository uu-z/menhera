// WIP
export const inBrowser = typeof window !== "undefined";

export const devtools = inBrowser && window.__MHR_DEVTOOLS_GLOBAL_HOOK__;
