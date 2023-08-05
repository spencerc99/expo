import type { ModuleDescriptor, SupportedPlatform } from '../types';
import { findModulesAsync } from './findModules';
import { mergeLinkingOptionsAsync, resolveSearchPathsAsync } from './mergeLinkingOptions';
import { resolveModulesAsync } from './resolveModules';
export { findModulesAsync, mergeLinkingOptionsAsync, resolveModulesAsync, resolveSearchPathsAsync };
export { generatePackageListAsync } from './generatePackageList';
export { verifySearchResults } from './verifySearchResults';
/**
 * Programmatic API to serve autolinked modules for Expo CLI.
 */
export declare function queryModulesAsync(platform: SupportedPlatform): Promise<ModuleDescriptor[]>;
