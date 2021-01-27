[![Build Status](https://travis-ci.com/testdozer/ng-injector-types.svg?branch=master)](https://travis-ci.com/testdozer/ng-injector-types)
[![NPM version:latest](https://img.shields.io/npm/v/@testdozer/ng-injector-types/latest.svg?style=flat-square)](https://www.npmjs.com/package/@testdozer/ng-injector-types)
[![NPM version:next](https://img.shields.io/npm/v/@testdozer/ng-injector-types/next.svg?style=flat-square)](https://www.npmjs.com/package/@testdozer/ng-injector-types)
[![npm downloads](https://img.shields.io/npm/dt/@testdozer/ng-injector-types.svg?style=flat-square)](https://www.npmjs.com/package/@testdozer/ng-injector-types)
[![Dependency Status](http://img.shields.io/david/testdozer/ng-injector-types.svg?style=flat-square)](https://david-dm.org/testdozer/ng-injector-types)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@testdozer/ng-injector-types.svg)](https://www.npmjs.com/package/@testdozer/ng-injector-types)
[![License](https://img.shields.io/npm/l/@testdozer/ng-injector-types.svg)](https://www.npmjs.com/package/@testdozer/ng-injector-types)

This package contains extended types for the Angular injector.

```bash
npm install @testdozer/ng-injector-types -D
```

- [TypeofInjectionToken](#TypeofInjectionToken)
- [InjectionFactory](#InjectionFactory)

## TypeofInjectionToken

> InjectionToken is parameterized on T which is the type of object which will be returned by the Injector. This provides additional level of type safety.

So TypeofInjectionToken returns type T of [InjectionToken](https://angular.io/api/core/InjectionToken).

```typescript
import { InjectionToken } from "@angular/core";
import { JsonObject } from "@angular-devkit/core";
import { ISchema } from "../schema";
import { TypeofInjectionToken } from "@testdozer/ng-injector-types";

export const OPTIONS = new InjectionToken<JsonObject & ISchema>("Options");


@Injectable()
export class Options {
    constructor(@Inject(OPTIONS)
                private readonly options: TypeofInjectionToken<typeof OPTIONS>) {
    }

    factory() {
        // this.options is strongly typed with type of JsonObject & ISchema
        const {project} = this.options;
    }
}
```

## InjectionFactory

Provides ability to use an injection factory in form of classes.

```typescript
@Injectable()
export class Options implements InjectionFactory {
    constructor(@Inject(OPTIONS)
                private readonly options: TypeofInjectionToken<typeof OPTIONS>) {
        // returns an object for the injector
        return this.factory() as any;
    }

    async factory() {
        const {project} = this.options;
        return {
            sourceRoot: `/${project}`
        };
    }
}
```

and here the way how to use it

```typescript
import { TypeofInjectionFactory } from "@testdozer/ng-injector-types";
import { Options } from "./options";
import { Inject } from "@angular/core";

export class PrivateFilesProvider {
    constructor(
        @Inject(Options)
        private readonly options: TypeofInjectionFactory<Options>) {
    }
    
    async get() {
        const {sourceRoot} = await this.options;
    }
}
```
or
```typescript
import { TypeofInjectionFactory } from "@testdozer/ng-injector-types";
import { Options } from "./options";
import { Inject } from "@angular/core";

export class PrivateFilesProvider {
    constructor(
        private readonly options: Options) {
    }
    
    async get() {
        const {sourceRoot} = await (this.options as TypeofInjectionFactory<Options>);
    }
}
```

> [Sponsored by 2BIT GmbH](https://www.2bit.ch)
