/*!
 *
 * carbon-angular v0.0.0 | table-toolbar.component.js
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


import { TableModel } from "../table-model.class";
import { Component, Input } from "@angular/core";
import { I18n } from "../../i18n/i18n.module";
var TableToolbar = /** @class */ (function () {
    function TableToolbar(i18n) {
        this.i18n = i18n;
        this.actionBarLabel = this.i18n.get("TABLE_TOOLBAR.ACTION_BAR");
    }
    Object.defineProperty(TableToolbar.prototype, "ariaLabel", {
        set: function (value) {
            this.actionBarLabel.next(value.ACTION_BAR);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableToolbar.prototype, "count", {
        get: function () {
            return this.model.totalDataLength > 0 ? this.model.rowsSelected.reduce(function (previous, current) { return previous + (current ? 1 : 0); }, 0) : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableToolbar.prototype, "selected", {
        get: function () {
            return this.model.totalDataLength > 0 ? this.model.rowsSelected.some(function (item) { return item; }) : false;
        },
        enumerable: true,
        configurable: true
    });
    TableToolbar.prototype.cancel = function () {
        for (var i = 0; i < this.model.rowsSelected.length; i++) {
            this.model.selectRow(i, false);
        }
    };
    TableToolbar.decorators = [
        { type: Component, args: [{
                    selector: "ibm-table-toolbar",
                    template: "\n\t<section class=\"bx--table-toolbar\">\n\t\t<div\n\t\t\tclass=\"bx--batch-actions\"\n\t\t\t[ngClass]=\"{\n\t\t\t\t'bx--batch-actions--active': selected\n\t\t\t}\"\n\t\t\t[attr.aria-label]=\"actionBarLabel | async\">\n\t\t\t<ng-content select=\"ibm-table-toolbar-actions\"></ng-content>\n\t\t\t<div class=\"bx--batch-summary\">\n\t\t\t\t<p class=\"bx--batch-summary__para\">\n\t\t\t\t\t<span>{{count}}</span> items selected\n\t\t\t\t</p>\n\t\t\t\t<button class=\"bx--batch-summary__cancel\" (click)=\"cancel()\">Cancel</button>\n\t\t\t</div>\n\t\t</div>\n\t\t<ng-content select=\"ibm-table-toolbar-search\"></ng-content>\n\t\t<ng-content></ng-content>\n\t</section>\n\t"
                },] },
    ];
    /** @nocollapse */
    TableToolbar.ctorParameters = function () { return [
        { type: I18n }
    ]; };
    TableToolbar.propDecorators = {
        model: [{ type: Input }],
        ariaLabel: [{ type: Input }]
    };
    return TableToolbar;
}());
export { TableToolbar };
//# sourceMappingURL=table-toolbar.component.js.map