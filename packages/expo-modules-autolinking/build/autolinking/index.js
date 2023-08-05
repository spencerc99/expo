"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryModulesAsync = exports.verifySearchResults = exports.generatePackageListAsync = exports.resolveSearchPathsAsync = exports.resolveModulesAsync = exports.mergeLinkingOptionsAsync = exports.findModulesAsync = void 0;
const findModules_1 = require("./findModules");
Object.defineProperty(exports, "findModulesAsync", { enumerable: true, get: function () { return findModules_1.findModulesAsync; } });
const mergeLinkingOptions_1 = require("./mergeLinkingOptions");
Object.defineProperty(exports, "mergeLinkingOptionsAsync", { enumerable: true, get: function () { return mergeLinkingOptions_1.mergeLinkingOptionsAsync; } });
Object.defineProperty(exports, "resolveSearchPathsAsync", { enumerable: true, get: function () { return mergeLinkingOptions_1.resolveSearchPathsAsync; } });
const resolveModules_1 = require("./resolveModules");
Object.defineProperty(exports, "resolveModulesAsync", { enumerable: true, get: function () { return resolveModules_1.resolveModulesAsync; } });
var generatePackageList_1 = require("./generatePackageList");
Object.defineProperty(exports, "generatePackageListAsync", { enumerable: true, get: function () { return generatePackageList_1.generatePackageListAsync; } });
var verifySearchResults_1 = require("./verifySearchResults");
Object.defineProperty(exports, "verifySearchResults", { enumerable: true, get: function () { return verifySearchResults_1.verifySearchResults; } });
/**
 * Programmatic API to serve autolinked modules for Expo CLI.
 */
async function queryModulesAsync(platform) {
    const options = await (0, mergeLinkingOptions_1.mergeLinkingOptionsAsync)({ platform, searchPaths: [] });
    const searchResults = await (0, findModules_1.findModulesAsync)(options);
    return await (0, resolveModules_1.resolveModulesAsync)(searchResults, options);
}
exports.queryModulesAsync = queryModulesAsync;
//# sourceMappingURL=index.js.map