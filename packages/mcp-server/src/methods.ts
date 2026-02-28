// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.courts.retrieve',
    fullyQualifiedName: 'courts.retrieve',
    httpMethod: 'get',
    httpPath: '/courts/{id}/',
  },
  {
    clientCallName: 'client.courts.list',
    fullyQualifiedName: 'courts.list',
    httpMethod: 'get',
    httpPath: '/courts/',
  },
  {
    clientCallName: 'client.dockets.retrieve',
    fullyQualifiedName: 'dockets.retrieve',
    httpMethod: 'get',
    httpPath: '/dockets/{id}/',
  },
  {
    clientCallName: 'client.dockets.list',
    fullyQualifiedName: 'dockets.list',
    httpMethod: 'get',
    httpPath: '/dockets/',
  },
  {
    clientCallName: 'client.clusters.retrieve',
    fullyQualifiedName: 'clusters.retrieve',
    httpMethod: 'get',
    httpPath: '/clusters/{id}/',
  },
  {
    clientCallName: 'client.clusters.list',
    fullyQualifiedName: 'clusters.list',
    httpMethod: 'get',
    httpPath: '/clusters/',
  },
  {
    clientCallName: 'client.opinions.retrieve',
    fullyQualifiedName: 'opinions.retrieve',
    httpMethod: 'get',
    httpPath: '/opinions/{id}/',
  },
  {
    clientCallName: 'client.opinions.list',
    fullyQualifiedName: 'opinions.list',
    httpMethod: 'get',
    httpPath: '/opinions/',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
