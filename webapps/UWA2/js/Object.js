define("UWA/Object",["UWA/Core","UWA/Internal/Deprecate"],function(c,b){function a(){b.warn("UWA/Object as a constructor","Use the native Object instead.");return Object.apply(null,arguments)}["assign","create","defineProperty","defineProperties","freeze","getOwnPropertyDescriptor","getOwnPropertyNames","getPrototypeOf","isExtensible","isFrozen","isSealed","keys","preventExtensions","seal","setPrototypeOf"].forEach(function(d){a[d]=b.alias("UWA/Object."+d,"Use the native Object."+d+" instead",Object[d])});return c.namespace("Object",a,c)});