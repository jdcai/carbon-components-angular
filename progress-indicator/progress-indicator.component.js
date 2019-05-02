/*!
 *
 * carbon-angular v0.0.0 | progress-indicator.component.js
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


import { Component, Input } from "@angular/core";
import { ExperimentalService } from "./../experimental.module";
var ProgressIndicator = /** @class */ (function () {
    function ProgressIndicator(experimental) {
        this.experimental = experimental;
        this.steps = [];
        this.orientation = "horizontal";
        this.skeleton = false;
    }
    ProgressIndicator.skeletonSteps = function (stepCount) {
        var steps = [];
        for (var i = 0; i < stepCount; i++) {
            steps.push({ "state": ["incomplete"] });
        }
        return steps;
    };
    Object.defineProperty(ProgressIndicator.prototype, "current", {
        get: function () {
            return this.steps.indexOf(function (step) { return step.state[0] === "current"; });
        },
        set: function (current) {
            if (current === undefined || current < 0) {
                for (var i = 0; i < this.steps.length; i++) {
                    this.steps[i].state[0] = "incomplete";
                }
                return;
            }
            if (current > this.steps.length - 1) {
                for (var i = 0; i < this.steps.length; i++) {
                    this.steps[i].state[0] = "complete";
                }
                return;
            }
            this.steps[current].state[0] = "current";
            for (var i = 0; i < current; i++) {
                this.steps[i].state[0] = "complete";
            }
            for (var i = current + 1; i < this.steps.length; i++) {
                this.steps[i].state[0] = "incomplete";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressIndicator.prototype, "isExperimental", {
        get: function () {
            return this.experimental.isExperimental;
        },
        enumerable: true,
        configurable: true
    });
    ProgressIndicator.decorators = [
        { type: Component, args: [{
                    selector: "ibm-progress-indicator",
                    template: "\n\t<ul\n\t\tdata-progress\n\t\tdata-progress-current\n\t\tclass=\"bx--progress\"\n\t\t[ngClass]=\"{\n\t\t\t'bx--skeleton': skeleton,\n\t\t\t'bx--progress--vertical': (orientation === 'vertical')\n\t\t}\">\n\t\t<li\n\t\tclass=\"bx--progress-step bx--progress-step--{{step.state}}\"\n\t\t*ngFor=\"let step of steps; let i = index\">\n\t\t\t<svg *ngIf=\"step.state == 'complete'\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\">\n\t\t\t\t<g fill-rule=\"nonzero\">\n\t\t\t\t\t<path d=\"M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z\"/>\n\t\t\t\t\t<path d=\"M11.646 5.146l.708.708-5.604 5.603-3.104-3.103.708-.708 2.396 2.397z\"/>\n\t\t\t\t</g>\n\t\t\t</svg>\n\t\t\t<svg *ngIf=\"step.state == 'current'\">\n\t\t\t\t<!-- old icon -->\n\t\t\t\t<g *ngIf=\"!isExperimental\">\n\t\t\t\t\t<circle cx=\"12\" cy=\"12\" r=\"12\"></circle>\n\t\t\t\t\t<circle cx=\"12\" cy=\"12\" r=\"6\"></circle>\n\t\t\t\t</g>\n\t\t\t\t<!-- new icon -->\n\t\t\t\t<path *ngIf=\"isExperimental\" d=\"M 7, 7 m -7, 0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0\" ></path>\n\t\t\t</svg>\n\t\t\t<svg *ngIf=\"step.state == 'incomplete'\">\n\t\t\t\t<!-- old icon -->\n\t\t\t\t<circle *ngIf=\"!isExperimental\" cx=\"12\" cy=\"12\" r=\"12\"></circle>\n\t\t\t\t<!-- new icon -->\n\t\t\t\t<path\n\t\t\t\t\t*ngIf=\"isExperimental\"\n\t\t\t\t\td=\"M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 13c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z\">\n\t\t\t\t</path>\n\t\t\t</svg>\n\t\t\t<svg *ngIf=\"step.state == 'error'\">\n\t\t\t\t<path d=\"M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 13c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z\"></path>\n\t\t\t\t<path d=\"M7.5 4h1v5h-1zm.5 6.2c-.4 0-.8.3-.8.8s.3.8.8.8c.4 0 .8-.3.8-.8s-.4-.8-.8-.8z\"></path>\n\t\t\t</svg>\n\t\t\t<p class=\"bx--progress-label\">{{step.text}}</p>\n\t\t\t<span class=\"bx--progress-line\"></span>\n\t\t</li>\n\t</ul>\n\t"
                },] },
    ];
    /** @nocollapse */
    ProgressIndicator.ctorParameters = function () { return [
        { type: ExperimentalService }
    ]; };
    ProgressIndicator.propDecorators = {
        steps: [{ type: Input }],
        orientation: [{ type: Input }],
        skeleton: [{ type: Input }],
        current: [{ type: Input }]
    };
    return ProgressIndicator;
}());
export { ProgressIndicator };
//# sourceMappingURL=progress-indicator.component.js.map