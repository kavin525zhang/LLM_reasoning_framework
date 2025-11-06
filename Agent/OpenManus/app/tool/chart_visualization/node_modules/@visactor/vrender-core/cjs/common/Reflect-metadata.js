"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(Reflect) {
    var target, previous;
    return function(exporter) {
        Object.prototype.hasOwnProperty;
        const supportsSymbol = "function" == typeof Symbol, toPrimitiveSymbol = supportsSymbol && void 0 !== Symbol.toPrimitive ? Symbol.toPrimitive : "@@toPrimitive", functionPrototype = (supportsSymbol && void 0 !== Symbol.iterator && Symbol.iterator, 
        Object.create, Object.getPrototypeOf(Function)), _Map = ("object" == typeof process && process.env && process.env.REFLECT_METADATA_USE_MAP_POLYFILL, 
        Map), Metadata = (Set, new WeakMap);
        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
            if (!IsObject(target)) throw new TypeError;
            return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        function hasMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target)) throw new TypeError;
            return IsUndefined(propertyKey) || (propertyKey = ToPropertyKey(propertyKey)), OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        function hasOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target)) throw new TypeError;
            return IsUndefined(propertyKey) || (propertyKey = ToPropertyKey(propertyKey)), OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        function getMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target)) throw new TypeError;
            return IsUndefined(propertyKey) || (propertyKey = ToPropertyKey(propertyKey)), OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        function GetOrCreateMetadataMap(O, P, Create) {
            let targetMetadata = Metadata.get(O);
            if (IsUndefined(targetMetadata)) {
                if (!Create) return;
                targetMetadata = new _Map, Metadata.set(O, targetMetadata);
            }
            let metadataMap = targetMetadata.get(P);
            if (IsUndefined(metadataMap)) {
                if (!Create) return;
                metadataMap = new _Map, targetMetadata.set(P, metadataMap);
            }
            return metadataMap;
        }
        function OrdinaryHasMetadata(MetadataKey, O, P) {
            if (OrdinaryHasOwnMetadata(MetadataKey, O, P)) return !0;
            const parent = OrdinaryGetPrototypeOf(O);
            return !IsNull(parent) && OrdinaryHasMetadata(MetadataKey, parent, P);
        }
        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
            const metadataMap = GetOrCreateMetadataMap(O, P, !1);
            return !IsUndefined(metadataMap) && ToBoolean(metadataMap.has(MetadataKey));
        }
        function OrdinaryGetMetadata(MetadataKey, O, P) {
            if (OrdinaryHasOwnMetadata(MetadataKey, O, P)) return OrdinaryGetOwnMetadata(MetadataKey, O, P);
            const parent = OrdinaryGetPrototypeOf(O);
            return IsNull(parent) ? void 0 : OrdinaryGetMetadata(MetadataKey, parent, P);
        }
        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
            const metadataMap = GetOrCreateMetadataMap(O, P, !1);
            if (!IsUndefined(metadataMap)) return metadataMap.get(MetadataKey);
        }
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
            GetOrCreateMetadataMap(O, P, !0).set(MetadataKey, MetadataValue);
        }
        function Type(x) {
            if (null === x) return 1;
            switch (typeof x) {
              case "undefined":
                return 0;

              case "boolean":
                return 2;

              case "string":
                return 3;

              case "symbol":
                return 4;

              case "number":
                return 5;

              case "object":
                return null === x ? 1 : 6;

              default:
                return 6;
            }
        }
        function IsUndefined(x) {
            return void 0 === x;
        }
        function IsNull(x) {
            return null === x;
        }
        function IsSymbol(x) {
            return "symbol" == typeof x;
        }
        function IsObject(x) {
            return "object" == typeof x ? null !== x : "function" == typeof x;
        }
        function ToPrimitive(input, PreferredType) {
            switch (Type(input)) {
              case 0:
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                return input;
            }
            const hint = 3 === PreferredType ? "string" : 5 === PreferredType ? "number" : "default", exoticToPrim = GetMethod(input, toPrimitiveSymbol);
            if (void 0 !== exoticToPrim) {
                const result = exoticToPrim.call(input, hint);
                if (IsObject(result)) throw new TypeError;
                return result;
            }
            return OrdinaryToPrimitive(input, "default" === hint ? "number" : hint);
        }
        function OrdinaryToPrimitive(O, hint) {
            if ("string" === hint) {
                const toString_1 = O.toString;
                if (IsCallable(toString_1)) {
                    const result = toString_1.call(O);
                    if (!IsObject(result)) return result;
                }
                const valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    const result = valueOf.call(O);
                    if (!IsObject(result)) return result;
                }
            } else {
                const valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    const result = valueOf.call(O);
                    if (!IsObject(result)) return result;
                }
                const toString_2 = O.toString;
                if (IsCallable(toString_2)) {
                    const result = toString_2.call(O);
                    if (!IsObject(result)) return result;
                }
            }
            throw new TypeError;
        }
        function ToBoolean(argument) {
            return !!argument;
        }
        function ToString(argument) {
            return "" + argument;
        }
        function ToPropertyKey(argument) {
            const key = ToPrimitive(argument, 3);
            return IsSymbol(key) ? key : ToString(key);
        }
        function IsCallable(argument) {
            return "function" == typeof argument;
        }
        function GetMethod(V, P) {
            const func = V[P];
            if (null != func) {
                if (!IsCallable(func)) throw new TypeError;
                return func;
            }
        }
        function OrdinaryGetPrototypeOf(O) {
            const proto = Object.getPrototypeOf(O);
            if ("function" != typeof O || O === functionPrototype) return proto;
            if (proto !== functionPrototype) return proto;
            const prototype = O.prototype, prototypeProto = prototype && Object.getPrototypeOf(prototype);
            if (null == prototypeProto || prototypeProto === Object.prototype) return proto;
            const constructor = prototypeProto.constructor;
            return "function" != typeof constructor || constructor === O ? proto : constructor;
        }
        exporter("defineMetadata", defineMetadata), exporter("hasMetadata", hasMetadata), 
        exporter("hasOwnMetadata", hasOwnMetadata), exporter("getMetadata", getMetadata);
    }((target = Reflect, function(key, value) {
        "function" != typeof target[key] && Object.defineProperty(target, key, {
            configurable: !0,
            writable: !0,
            value: value
        }), previous && previous(key, value);
    })), Reflect;
}({});
//# sourceMappingURL=Reflect-metadata.js.map