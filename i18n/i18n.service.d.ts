/*!
 *
 * carbon-angular v0.0.0 | i18n.service.d.ts
 *
 * Copyright 2014, 2019 IBM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * Takes the `Observable` returned from `i18n.get` and an object of variables to replace.
 *
 * The keys specify the variable name in the string.
 *
 * Example:
 * ```typescript
 * service.set({ "TEST": "{{foo}} {{bar}}" });
 *
 * service.replace(service.get("TEST"), { foo: "test", bar: "asdf" })
 * ```
 *
 * Produces: `"test asdf"`
 *
 * @param subject the translation to replace variables on
 * @param variables object of variables to replace
 */
export declare const replace: (subject: any, variables: any) => any;
/**
 * The I18n service is a minimal internal singleton service used to supply our components with translated strings.
 *
 * All the components that support I18n also support directly passed strings.
 * Usage of I18n is optional, and it is not recommended for application use (libraries like ngx-translate
 * are a better choice)
 *
 */
export declare class I18n {
    protected translationStrings: any;
    protected translations: Map<any, any>;
    /**
     * Set/update the translations from an object. Also notifies all participating components of the update.
     *
     * @param strings an object of strings, should follow the same format as src/i18n/en.json
     */
    set(strings: any): void;
    /**
     * When a path is specified returns an observable that will resolve to the translation string value.
     *
     * Returns the full translations object if path is not specified.
     *
     * @param path optional, looks like `"NOTIFICATION.CLOSE_BUTTON"`
     */
    get(path?: any): any;
    /**
     * Takes the `Observable` returned from `i18n.get` and an object of variables to replace.
     *
     * The keys specify the variable name in the string.
     *
     * Example:
     * ```
     * service.set({ "TEST": "{{foo}} {{bar}}" });
     *
     * service.replace(service.get("TEST"), { foo: "test", bar: "asdf" })
     * ```
     *
     * Produces: `"test asdf"`
     *
     * @param subject the translation to replace variables on
     * @param variables object of variables to replace
     */
    replace(subject: any, variables: any): any;
    /**
     * Trys to resolve a value from the provided path.
     *
     * @param path looks like `"NOTIFICATION.CLOSE_BUTTON"`
     */
    protected getValueFromPath(path: any): any;
}
