/*!
 *
 * carbon-angular v0.0.0 | list-row.component.js
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


import { Component, HostBinding, ContentChildren, QueryList, Input, HostListener, ViewChild, ElementRef, EventEmitter, Output } from "@angular/core";
import { ListColumn } from "./list-column.component";
/**
 * `ListRow` provides a container for the `ListColumn`s that make up the body of a structured list.
 *
 * Example:
 * ```html
 * 	<ibm-list-row>
 *		<ibm-list-column>Row 1</ibm-list-column>
 *		<ibm-list-column nowrap="true">Row One</ibm-list-column>
 *		<ibm-list-column>
 *			Lorem ipsum dolor sit amet,
 *			consectetur adipiscing elit. Nunc dui magna,
 *			finibus id tortor sed, aliquet bibendum augue.
 *			Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor.
 *			Pellentesque vulputate nisl a porttitor interdum.
 *		</ibm-list-column>
 *	</ibm-list-row>
 * ```
 */
var ListRow = /** @class */ (function () {
    function ListRow() {
        /**
         * Internal event used to notify the containing `StructuredList` of changes.
         */
        this.change = new EventEmitter();
        /**
         * Set by the containing `StructuredList`. Enables or disables row level selection features.
         */
        this.selection = false;
        /**
         * Set by the containing `StructuredList`. When `selection = true`, used for the `name` property on the radio input.
         */
        this.name = "list";
        this.wrapper = true;
        this.tabindex = this.selection ? "0" : null;
    }
    Object.defineProperty(ListRow.prototype, "selected", {
        get: function () {
            if (!this.input) {
                return;
            }
            return this.input.nativeElement.checked;
        },
        set: function (value) {
            if (!this.input) {
                return;
            }
            this.input.nativeElement.checked = value ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    ListRow.prototype.ngAfterContentInit = function () {
        this.columns.forEach(function (column) {
            column.isBodyColumn = true;
            column.isHeaderColumn = false;
        });
    };
    ListRow.prototype.onclick = function () {
        if (!this.selection) {
            return false;
        }
        this.input.nativeElement.click();
    };
    ListRow.prototype.onChange = function (event) {
        this.change.emit(event);
    };
    ListRow.decorators = [
        { type: Component, args: [{
                    selector: "ibm-list-row",
                    template: "\n\t\t<ng-container *ngIf=\"selection\">\n\t\t\t<input\n\t\t\t\t#input\n\t\t\t\ttabindex=\"-1\"\n\t\t\t\tclass=\"bx--structured-list-input\"\n\t\t\t\ttype=\"radio\"\n\t\t\t\t[value]=\"value\"\n\t\t\t\t[name]=\"name\"\n\t\t\t\t[title]=\"label\"\n\t\t\t\t(change)=\"onChange($event)\"/>\n\t\t\t<div class=\"bx--structured-list-td\">\n\t\t\t\t<svg class=\"bx--structured-list-svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\">\n\t\t\t\t\t<path\n\t\t\t\t\t\td=\"M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0\n\t\t\t\t\t\t16zm3.646-10.854L6.75 10.043 4.354\n\t\t\t\t\t\t7.646l-.708.708 3.104 3.103 5.604-5.603-.708-.708z\"\n\t\t\t\t\t\tfill-rule=\"evenodd\" />\n\t\t\t\t</svg>\n\t\t\t</div>\n\t\t</ng-container>\n\t\t<ng-content></ng-content>\n\t"
                },] },
    ];
    ListRow.propDecorators = {
        selected: [{ type: Input }, { type: HostBinding, args: ["class.bx--structured-list-row--selected",] }],
        label: [{ type: Input }, { type: HostBinding, args: ["attr.aria-label",] }],
        value: [{ type: Input }],
        change: [{ type: Output }],
        wrapper: [{ type: HostBinding, args: ["class.bx--structured-list-row",] }],
        tabindex: [{ type: HostBinding, args: ["attr.tabindex",] }],
        columns: [{ type: ContentChildren, args: [ListColumn,] }],
        input: [{ type: ViewChild, args: ["input",] }],
        onclick: [{ type: HostListener, args: ["click",] }]
    };
    return ListRow;
}());
export { ListRow };
//# sourceMappingURL=list-row.component.js.map