/*!
 *
 * carbon-angular v0.0.0 | i18n.service.js
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


import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { merge } from "./../utils/object";
var EN = require("./en.json");
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
export var replace = function (subject, variables) { return subject.pipe(map(function (str) {
    var keys = Object.keys(variables);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var value = variables[key];
        while (str.includes("{{" + key + "}}")) {
            str = str.replace("{{" + key + "}}", value);
        }
    }
    return str;
})); };
/**
 * The I18n service is a minimal internal singleton service used to supply our components with translated strings.
 *
 * All the components that support I18n also support directly passed strings.
 * Usage of I18n is optional, and it is not recommended for application use (libraries like ngx-translate
 * are a better choice)
 *
 */
var I18n = /** @class */ (function () {
    function I18n() {
        this.translationStrings = EN;
        this.translations = new Map();
    }
    /**
     * Set/update the translations from an object. Also notifies all participating components of the update.
     *
     * @param strings an object of strings, should follow the same format as src/i18n/en.json
     */
    I18n.prototype.set = function (strings) {
        this.translationStrings = merge({}, EN, strings);
        // iterate over all our tracked translations and update each observable
        var translations = Array.from(this.translations);
        for (var _i = 0, translations_1 = translations; _i < translations_1.length; _i++) {
            var _a = translations_1[_i], path = _a[0], subject = _a[1];
            subject.next(this.getValueFromPath(path));
        }
    };
    /**
     * When a path is specified returns an observable that will resolve to the translation string value.
     *
     * Returns the full translations object if path is not specified.
     *
     * @param path optional, looks like `"NOTIFICATION.CLOSE_BUTTON"`
     */
    I18n.prototype.get = function (path) {
        if (!path) {
            return this.translationStrings;
        }
        try {
            // we run this here to validate the path exists before adding it to the translation map
            var value = this.getValueFromPath(path);
            if (this.translations.has(path)) {
                return this.translations.get(path);
            }
            var translation = new BehaviorSubject(value);
            this.translations.set(path, translation);
            return translation;
        }
        catch (err) {
            console.error(err);
        }
    };
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
    I18n.prototype.replace = function (subject, variables) {
        return replace(subject, variables);
    };
    /**
     * Trys to resolve a value from the provided path.
     *
     * @param path looks like `"NOTIFICATION.CLOSE_BUTTON"`
     */
    I18n.prototype.getValueFromPath = function (path) {
        var value = this.translationStrings;
        for (var _i = 0, _a = path.split("."); _i < _a.length; _i++) {
            var segment = _a[_i];
            if (value[segment]) {
                value = value[segment];
            }
            else {
                throw new Error("no key " + segment + " at " + path);
            }
        }
        return value;
    };
    I18n.decorators = [
        { type: Injectable },
    ];
    return I18n;
}());
export { I18n };
//# sourceMappingURL=i18n.service.js.map