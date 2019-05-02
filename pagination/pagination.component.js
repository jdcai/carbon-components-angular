/*!
 *
 * carbon-angular v0.0.0 | pagination.component.js
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


import { PaginationModel } from "./pagination.module";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { range } from "../common/utils";
import { I18n } from "./../i18n/i18n.module";
import { BehaviorSubject } from "rxjs";
import { ExperimentalService } from "./../experimental.module";
/**
 * Use pagination when you have multiple pages of data to handle.
 *
 * ```html
 * <ibm-pagination [model]="model" (selectPage)="selectPage($event)"></ibm-pagination>
 * ```
 *
 * In your `selectPage()` method set the `model.currentPage` to selected page, _after_
 * you load the page.
 *
 * ```typescript
 * selectPage(page) {
 * 	// ... your code to load the page goes here
 *
 * 	this.model.currentPage = page;
 *
 * 	// ... anything you want to do after page selection changes goes here
 * }
 * ```
 *
 * @export
 * @class Pagination
 */
var Pagination = /** @class */ (function () {
    function Pagination(i18n, experimental) {
        this.i18n = i18n;
        this.experimental = experimental;
        /**
         * Set to `true` for a loading pagination component.
         */
        this.skeleton = false;
        /**
         * Emits the new page number.
         *
         * You should tie into this and update `model.currentPage` once the fresh
         * data is finally loaded.
         */
        this.selectPage = new EventEmitter();
        this.itemsPerPageSelectId = "pagination-select-items-per-page-" + Pagination.paginationCounter;
        this.currentPageSelectId = "pagination-select-current-page-" + Pagination.paginationCounter;
        this.itemsPerPageText = this.i18n.get("PAGINATION.ITEMS_PER_PAGE");
        this.optionsListText = this.i18n.get("PAGINATION.OPEN_LIST_OF_OPTIONS");
        this.backwardText = this.i18n.get("PAGINATION.BACKWARD");
        this.forwardText = this.i18n.get("PAGINATION.FORWARD");
        this.totalItemsText = this.i18n.get("PAGINATION.TOTAL_ITEMS");
        this.totalPagesText = this.i18n.get("PAGINATION.TOTAL_PAGES");
        this.ofLastPagesText = this.i18n.get("PAGINATION.OF_LAST_PAGES");
        Pagination.paginationCounter++;
    }
    Object.defineProperty(Pagination.prototype, "translations", {
        /**
         * Expects an object that contains some or all of:
         * ```
         * {
         *		"ITEMS_PER_PAGE": "Items per page:",
         *		"OPEN_LIST_OF_OPTIONS": "Open list of options",
         *		"BACKWARD": "Backward",
         *		"FORWARD": "Forward",
         *		"TOTAL_ITEMS": "{{start}}-{{end}} of {{total}} items",
         *		"TOTAL_PAGES": "{{current}} of {{last}} pages",
         *		"OF_LAST_PAGES": "of {{last}} pages"
         * }
         * ```
         */
        set: function (value) {
            if (value.ITEMS_PER_PAGE) {
                this.itemsPerPageText = new BehaviorSubject(value.ITEMS_PER_PAGE);
            }
            if (value.OPEN_LIST_OF_OPTIONS) {
                this.optionsListText = new BehaviorSubject(value.OPEN_LIST_OF_OPTIONS);
            }
            if (value.BACKWARD) {
                this.backwardText = new BehaviorSubject(value.BACKWARD);
            }
            if (value.FORWARD) {
                this.forwardText = new BehaviorSubject(value.FORWARD);
            }
            if (value.TOTAL_ITEMS) {
                this.totalItemsText = new BehaviorSubject(value.TOTAL_ITEMS);
            }
            if (value.TOTAL_PAGES) {
                this.totalPagesText = new BehaviorSubject(value.TOTAL_PAGES);
            }
            if (value.OF_LAST_PAGES) {
                this.ofLastPagesText = new BehaviorSubject(value.OF_LAST_PAGES);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "itemsPerPage", {
        get: function () {
            return this.model.pageLength;
        },
        set: function (value) {
            this.model.pageLength = Number(value);
            this.currentPage = 1; // reset page
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "currentPage", {
        get: function () {
            return this.model.currentPage;
        },
        set: function (value) {
            value = Number(value);
            // emits the value to allow the user to update current page
            // in the model once the page is loaded
            this.selectPage.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "lastPage", {
        /**
         * The last page number to display in the pagination view.
         */
        get: function () {
            var last = Math.ceil(this.model.totalDataLength / this.model.pageLength);
            return last > 0 ? last : 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "startItemIndex", {
        get: function () {
            return this.endItemIndex > 0 ? (this.currentPage - 1) * this.model.pageLength + 1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "endItemIndex", {
        get: function () {
            var projectedEndItemIndex = this.currentPage * this.model.pageLength;
            return projectedEndItemIndex < this.model.totalDataLength ? projectedEndItemIndex : this.model.totalDataLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "previousPage", {
        /**
         * The previous page number to navigate to, from the current page.
         */
        get: function () {
            return this.currentPage <= 1 ? 1 : this.currentPage - 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "nextPage", {
        /**
         * The next page number to navigate to, from the current page.
         */
        get: function () {
            var lastPage = this.lastPage;
            return this.currentPage >= lastPage ? lastPage : this.currentPage + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "isExperimental", {
        get: function () {
            return this.experimental.isExperimental;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Generates a list of numbers. (Python function)
     * Used to display the correct pagination controls.
     * @returns {array}
     */
    Pagination.prototype.range = function (stop, start, step) {
        if (start === void 0) { start = 0; }
        if (step === void 0) { step = 1; }
        return range(stop, start, step);
    };
    Pagination.paginationCounter = 0;
    Pagination.decorators = [
        { type: Component, args: [{
                    selector: "ibm-pagination",
                    template: "\n\t<div\n\t\tclass=\"bx--pagination\"\n\t\t[ngClass]=\"{\n\t\t\t'bx--skeleton': skeleton\n\t\t}\">\n\t\t<!-- left skeleton div -->\n\t\t<div *ngIf=\"skeleton\" class=\"bx--pagination__left\">\n\t\t\t<p class=\"bx--skeleton__text\" style=\"width: 70px\"></p>\n\t\t\t<p class=\"bx--skeleton__text\" style=\"width: 35px\"></p>\n\t\t\t<p class=\"bx--skeleton__text\" style=\"width: 105px\"></p>\n\t\t</div>\n\n\t\t<div *ngIf=\"!skeleton\" class=\"bx--pagination__left\">\n\t\t\t<span *ngIf=\"!isExperimental\" class=\"bx--pagination__text\">\n\t\t\t\t{{itemsPerPageText | async}}\n\t\t\t</span>\n\t\t\t<label *ngIf=\"isExperimental\" class=\"bx--pagination__text\" [for]=\"itemsPerPageSelectId\">\n\t\t\t\t{{itemsPerPageText | async}}\n\t\t\t</label>\n\t\t\t<div class=\"bx--form-item\">\n\t\t\t\t<div class=\"bx--select bx--select--inline\"\n\t\t\t\t\t[ngClass]=\"{\n\t\t\t\t\t\t'bx--select__item-count': isExperimental\n\t\t\t\t\t}\">\n\t\t\t\t\t<label\n\t\t\t\t\t\t[for]=\"itemsPerPageSelectId\"\n\t\t\t\t\t\tclass=\"bx--label bx--visually-hidden\">\n\t\t\t\t\t\t{{itemsPerPageText | async}}\n\t\t\t\t\t</label>\n\t\t\t\t\t<select\n\t\t\t\t\t\t[id]=\"itemsPerPageSelectId\"\n\t\t\t\t\t\t[(ngModel)]=\"itemsPerPage\"\n\t\t\t\t\t\tclass=\"bx--select-input\"\n\t\t\t\t\t\taria-describedby=\"false\">\n\t\t\t\t\t\t<option class=\"bx--select-option\" value=\"10\">10</option>\n\t\t\t\t\t\t<option class=\"bx--select-option\" value=\"20\">20</option>\n\t\t\t\t\t\t<option class=\"bx--select-option\" value=\"30\">30</option>\n\t\t\t\t\t\t<option class=\"bx--select-option\" value=\"40\">40</option>\n\t\t\t\t\t\t<option class=\"bx--select-option\" value=\"50\">50</option>\n\t\t\t\t\t</select>\n\t\t\t\t\t<!-- old icon -->\n\t\t\t\t\t<svg\n\t\t\t\t\t\t*ngIf=\"!isExperimental\"\n\t\t\t\t\t\tclass=\"bx--select__arrow\"\n\t\t\t\t\t\tfill-rule=\"evenodd\"\n\t\t\t\t\t\theight=\"5\"\n\t\t\t\t\t\trole=\"img\"\n\t\t\t\t\t\tviewBox=\"0 0 10 5\"\n\t\t\t\t\t\twidth=\"10\"\n\t\t\t\t\t\t[attr.aria-label]=\"optionsListText | async\">\n\t\t\t\t\t\t<title>{{optionsListText | async}}</title>\n\t\t\t\t\t\t<path d=\"M0 0l5 4.998L10 0z\"></path>\n\t\t\t\t\t</svg>\n\t\t\t\t\t<!-- new icon -->\n\t\t\t\t\t<svg\n\t\t\t\t\t\t*ngIf=\"isExperimental\"\n\t\t\t\t\t\tclass=\"bx--select__arrow\"\n\t\t\t\t\t\tfocusable=\"false\"\n\t\t\t\t\t\tpreserveAspectRatio=\"xMidYMid meet\"\n\t\t\t\t\t\theight=\"6\"\n\t\t\t\t\t\trole=\"img\"\n\t\t\t\t\t\tviewBox=\"0 0 10 6\"\n\t\t\t\t\t\twidth=\"10\"\n\t\t\t\t\t\tstyle=\"will-change: transform;\"\n\t\t\t\t\t\t[attr.aria-label]=\"optionsListText | async\">\n\t\t\t\t\t\t<title>{{optionsListText | async}}</title>\n\t\t\t\t\t\t<path d=\"M5 6L0 1 .7.3 5 4.6 9.3.3l.7.7z\"></path>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<span class=\"bx--pagination__text\">\n\t\t\t\t<span *ngIf=\"!isExperimental\">|&nbsp;</span>\n\t\t\t\t{{totalItemsText | i18nReplace:{start: startItemIndex, end: endItemIndex, total: model.totalDataLength } | async}}\n\t\t\t</span>\n\t\t</div>\n\n\t\t<!-- right skeleton div -->\n\t\t<div *ngIf=\"skeleton\" class=\"bx--pagination__right bx--pagination--inline\">\n\t\t\t<p class=\"bx--skeleton__text\" style=\"width: 70px\"></p>\n\t\t</div>\n\n\t\t<div *ngIf=\"!skeleton\" class=\"bx--pagination__right\"\n\t\t\t[ngClass]=\"{\n\t\t\t\t'bx--pagination--inline': !isExperimental\n\t\t\t}\">\n\t\t\t<!-- old span -->\n\t\t\t<span\n\t\t\t\t*ngIf=\"!isExperimental\"\n\t\t\t\tclass=\"bx--pagination__text\">\n\t\t\t\t{{totalPagesText | i18nReplace:{current: currentPage, last: lastPage} | async}}\n\t\t\t</span>\n\n\t\t\t<!-- old button -->\n\t\t\t<button\n\t\t\t\t*ngIf=\"!isExperimental\"\n\t\t\t\tclass=\"bx--pagination__button bx--pagination__button--backward\"\n\t\t\t\t[ngClass]=\"{\n\t\t\t\t\t'bx--pagination__button--no-index': currentPage <= 1\n\t\t\t\t}\"\n\t\t\t\t(click)=\"selectPage.emit(previousPage)\"\n\t\t\t\t[disabled]=\"(currentPage <= 1 ? true : null)\">\n\t\t\t\t<svg\n\t\t\t\t\tclass=\"bx--pagination__button-icon\"\n\t\t\t\t\tfill-rule=\"evenodd\"\n\t\t\t\t\theight=\"12\"\n\t\t\t\t\trole=\"img\"\n\t\t\t\t\tviewBox=\"0 0 7 12\"\n\t\t\t\t\twidth=\"7\"\n\t\t\t\t\t[attr.aria-label]=\"backwardText | async\">\n\t\t\t\t\t<title>{{backwardText |async }}</title>\n\t\t\t\t\t<path d=\"M1.45 6.002L7 11.27l-.685.726L0 6.003 6.315 0 7 .726z\"></path>\n\t\t\t\t</svg>\n\t\t\t</button>\n\n\t\t\t<div class=\"bx--form-item\">\n\t\t\t\t<div class=\"bx--select bx--select--inline\"\n\t\t\t\t[ngClass]=\"{\n\t\t\t\t\t'bx--select__page-number' : isExperimental\n\t\t\t\t}\">\n\t\t\t\t\t<label [for]=\"currentPageSelectId\" class=\"bx--label bx--visually-hidden\">{{itemsPerPageText | async}}</label>\n\t\t\t\t\t<select [id]=\"currentPageSelectId\" class=\"bx--select-input\" aria-describedby=\"false\" [(ngModel)]=\"currentPage\">\n\t\t\t\t\t\t<option *ngFor=\"let i of range(lastPage + 1, 1)\" class=\"bx--select-option\" [value]=\"i\">{{i}}</option>\n\t\t\t\t\t</select>\n\t\t\t\t\t<!-- old icon -->\n\t\t\t\t\t<svg\n\t\t\t\t\t\t*ngIf=\"!isExperimental\"\n\t\t\t\t\t\tclass=\"bx--select__arrow\"\n\t\t\t\t\t\tfill-rule=\"evenodd\"\n\t\t\t\t\t\theight=\"5\"\n\t\t\t\t\t\trole=\"img\"\n\t\t\t\t\t\tviewBox=\"0 0 10 5\"\n\t\t\t\t\t\twidth=\"10\"\n\t\t\t\t\t\t[attr.aria-label]=\"optionsListText | async\">\n\t\t\t\t\t\t<title>{{optionsListText | async}}</title>\n\t\t\t\t\t\t<path d=\"M0 0l5 4.998L10 0z\"></path>\n\t\t\t\t\t</svg>\n\t\t\t\t\t<!-- new icon -->\n\t\t\t\t\t<svg\n\t\t\t\t\t\t*ngIf=\"isExperimental\"\n\t\t\t\t\t\tclass=\"bx--select__arrow\"\n\t\t\t\t\t\tfocusable=\"false\"\n\t\t\t\t\t\tpreserveAspectRatio=\"xMidYMid meet\"\n\t\t\t\t\t\theight=\"6\"\n\t\t\t\t\t\trole=\"img\"\n\t\t\t\t\t\tviewBox=\"0 0 10 6\"\n\t\t\t\t\t\twidth=\"10\"\n\t\t\t\t\t\tstyle=\"will-change: transform;\"\n\t\t\t\t\t\t[attr.aria-label]=\"optionsListText | async\">\n\t\t\t\t\t\t<title>{{optionsListText | async}}</title>\n\t\t\t\t\t\t<path d=\"M5 6L0 1 .7.3 5 4.6 9.3.3l.7.7z\"></path>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<span *ngIf=\"isExperimental\" class=\"bx--pagination__text\">\n\t\t\t\t{{ofLastPagesText | i18nReplace: {last: lastPage} | async}}\n\t\t\t</span>\n\n\t\t\t<!-- old button -->\n\t\t\t<button\n\t\t\t\t*ngIf=\"!isExperimental\"\n\t\t\t\tclass=\"bx--pagination__button bx--pagination__button--forward\"\n\t\t\t\t[ngClass]=\"{\n\t\t\t\t\t'bx--pagination__button--no-index': currentPage >= lastPage\n\t\t\t\t}\"\n\t\t\t\t(click)=\"selectPage.emit(nextPage)\"\n\t\t\t\t[disabled]=\"(currentPage >= lastPage ? true : null)\">\n\t\t\t\t<svg\n\t\t\t\t\tclass=\"bx--pagination__button-icon\"\n\t\t\t\t\tfill-rule=\"evenodd\"\n\t\t\t\t\theight=\"12\"\n\t\t\t\t\trole=\"img\"\n\t\t\t\t\tviewBox=\"0 0 7 12\"\n\t\t\t\t\twidth=\"7\"\n\t\t\t\t\t[attr.aria-label]=\"forwardText | async\">\n\t\t\t\t\t<title>{{forwardText | async}}</title>\n\t\t\t\t\t<path d=\"M5.569 5.994L0 .726.687 0l6.336 5.994-6.335 6.002L0 11.27z\"></path>\n\t\t\t\t</svg>\n\t\t\t</button>\n\n\t\t\t<!-- new butons -->\n\t\t\t<button\n\t\t\t\t*ngIf=\"isExperimental\"\n\t\t\t\tclass=\"bx--pagination__button bx--pagination__button--backward\"\n\t\t\t\t[ngClass]=\"{\n\t\t\t\t\t'bx--pagination__button--no-index': currentPage <= 1\n\t\t\t\t}\"\n\t\t\t\ttabindex=\"0\"\n\t\t\t\t[attr.aria-label]=\"backwardText | async\"\n\t\t\t\t(click)=\"selectPage.emit(previousPage)\"\n\t\t\t\t[disabled]=\"(currentPage <= 1 ? true : null)\">\n\t\t\t\t<svg\n\t\t\t\t\tfocusable=\"false\"\n\t\t\t\t\tpreserveAspectRatio=\"xMidYMid meet\"\n\t\t\t\t\tstyle=\"will-change: transform;\"\n\t\t\t\t\txmlns=\"http://www.w3.org/2000/svg\"\n\t\t\t\t\tclass=\"bx--pagination__nav-arrow\"\n\t\t\t\t\twidth=\"24\" height=\"24\"\n\t\t\t\t\tviewBox=\"0 0 32 32\"\n\t\t\t\t\taria-hidden=\"true\">\n\t\t\t\t\t<path d=\"M19 23l-8-7 8-7v14z\"></path>\n\t\t\t\t</svg>\n\t\t\t</button>\n\n\t\t\t<button\n\t\t\t\t*ngIf=\"isExperimental\"\n\t\t\t\tclass=\"bx--pagination__button bx--pagination__button--forward\"\n\t\t\t\t[ngClass]=\"{\n\t\t\t\t\t'bx--pagination__button--no-index': currentPage >= lastPage\n\t\t\t\t}\"\n\t\t\t\ttabindex=\"0\"\n\t\t\t\t[attr.aria-label]=\"forwardText | async\"\n\t\t\t\t(click)=\"selectPage.emit(nextPage)\"\n\t\t\t\t[disabled]=\"(currentPage >= lastPage ? true : null)\">\n\t\t\t\t<svg\n\t\t\t\t\tfocusable=\"false\"\n\t\t\t\t\tpreserveAspectRatio=\"xMidYMid meet\"\n\t\t\t\t\tstyle=\"will-change: transform;\"\n\t\t\t\t\txmlns=\"http://www.w3.org/2000/svg\"\n\t\t\t\t\tclass=\"bx--pagination__nav-arrow\"\n\t\t\t\t\twidth=\"24\"\n\t\t\t\t\theight=\"24\"\n\t\t\t\t\tviewBox=\"0 0 32 32\"\n\t\t\t\t\taria-hidden=\"true\">\n\t\t\t\t\t<path d=\"M13 9l8 7-8 7V9z\"></path>\n\t\t\t\t</svg>\n\t\t\t</button>\n\t\t</div>\n\t</div>\n\t"
                },] },
    ];
    /** @nocollapse */
    Pagination.ctorParameters = function () { return [
        { type: I18n },
        { type: ExperimentalService }
    ]; };
    Pagination.propDecorators = {
        skeleton: [{ type: Input }],
        model: [{ type: Input }],
        translations: [{ type: Input }],
        selectPage: [{ type: Output }]
    };
    return Pagination;
}());
export { Pagination };
//# sourceMappingURL=pagination.component.js.map