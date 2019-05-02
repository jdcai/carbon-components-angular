/*!
 *
 * carbon-angular v0.0.0 | experimental.service.js
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
var ExperimentalService = /** @class */ (function () {
    function ExperimentalService() {
    }
    Object.defineProperty(ExperimentalService.prototype, "isExperimental", {
        get: function () {
            return ExperimentalService.experimentalEnabled;
        },
        set: function (v) {
            ExperimentalService.experimentalEnabled = v;
        },
        enumerable: true,
        configurable: true
    });
    ExperimentalService.experimentalEnabled = false;
    ExperimentalService.decorators = [
        { type: Injectable },
    ];
    return ExperimentalService;
}());
export { ExperimentalService };
//# sourceMappingURL=experimental.service.js.map