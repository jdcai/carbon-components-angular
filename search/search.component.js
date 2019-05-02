/*!
 *
 * carbon-angular v0.0.0 | search.component.js
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


import { Component, Input, EventEmitter, Output, HostBinding, ElementRef, HostListener, ViewChild } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { I18n } from "../i18n/i18n.module";
/**
 * Used to emit changes performed on search components.
 */
var SearchChange = /** @class */ (function () {
    function SearchChange() {
    }
    return SearchChange;
}());
export { SearchChange };
var Search = /** @class */ (function () {
    /**
     * Creates an instance of `Search`.
     * @param i18n The i18n translations.
     */
    function Search(elementRef, i18n) {
        this.elementRef = elementRef;
        this.i18n = i18n;
        this.containerClass = true;
        /**
         * `light` or `dark` search theme.
         */
        this.theme = "dark";
        /**
         * Size of the search field.
         */
        this.size = "lg";
        /**
         * Set to `true` for a disabled search input.
         */
        this.disabled = false;
        /**
         * Set to `true` for a toolbar search component.
         */
        this.toolbar = false;
        /**
         * Set to `true` for a loading search component.
         */
        this.skeleton = false;
        /**
         * Set to `true` to expand the toolbar search component.
         */
        this.active = false;
        /**
         * The unique id for the search component.
         */
        this.id = "search-" + Search.searchCount;
        /**
         * Sets the value attribute on the `input` element.
         */
        this.value = "";
        /**
         * Sets the text inside the `label` tag.
         */
        this.label = this.i18n.get().SEARCH.LABEL;
        /**
         * Sets the placeholder attribute on the `input` element.
         */
        this.placeholder = this.i18n.get().SEARCH.PLACEHOLDER;
        /**
         * Used to set the `title` attribute of the clear button.
         */
        this.clearButtonTitle = this.i18n.get().SEARCH.CLEAR_BUTTON;
        /**
         * Emits event notifying other classes when a change in state occurs in the input.
         */
        this.change = new EventEmitter();
        /**
         * Called when search input is blurred. Needed to properly implement `ControlValueAccessor`.
         */
        this.onTouched = function () { };
        /**
         * Method set in `registerOnChange` to propagate changes back to the form.
         */
        this.propagateChange = function (_) { };
        Search.searchCount++;
    }
    /**
     * This is the initial value set to the component
     * @param value The input value.
     */
    Search.prototype.writeValue = function (value) {
        this.value = value;
    };
    /**
     * Sets a method in order to propagate changes back to the form.
     */
    Search.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    /**
     * Registers a callback to be triggered when the control has been touched.
     * @param fn Callback to be triggered when the search input is touched.
     */
    Search.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * Called when text is written in the input.
     * @param {string} search The input text.
     */
    Search.prototype.onSearch = function (search) {
        this.value = search;
        this.emitChangeEvent();
    };
    /**
     * Called when clear button is clicked.
     */
    Search.prototype.clearSearch = function () {
        this.value = "";
        this.emitChangeEvent();
    };
    /**
     * Creates a class of `RadioChange` to emit the change in the `RadioGroup`.
     */
    Search.prototype.emitChangeEvent = function () {
        var event = new SearchChange();
        event.source = this;
        event.value = this.value;
        this.change.emit(event);
        this.propagateChange(this.value);
    };
    Search.prototype.openSearch = function () {
        var _this = this;
        this.active = true;
        setTimeout(function () { return _this.inputRef.nativeElement.focus(); });
    };
    Search.prototype.keyDown = function (event) {
        if (this.toolbar) {
            if (event.key === "Escape") {
                this.active = false;
            }
            else if (event.key === "Enter") {
                this.openSearch();
            }
        }
    };
    Search.prototype.focusOut = function (event) {
        if (this.toolbar && event.relatedTarget === null) {
            this.active = false;
        }
    };
    /**
     * Variable used for creating unique ids for search components.
     */
    Search.searchCount = 0;
    Search.decorators = [
        { type: Component, args: [{
                    selector: "ibm-search",
                    template: "\n\t\t<div\n\t\t\tclass=\"bx--search\"\n\t\t\t[ngClass]=\"{\n\t\t\t\t'bx--search--sm': size === 'sm',\n\t\t\t\t'bx--search--lg': size === 'lg',\n\t\t\t\t'bx--search--light': theme === 'light',\n\t\t\t\t'bx--skeleton': skeleton,\n\t\t\t\t'bx--toolbar-search': toolbar,\n\t\t\t\t'bx--toolbar-search--active': toolbar && active\n\t\t\t}\"\n\t\t\trole=\"search\">\n\t\t\t<label class=\"bx--label\" [for]=\"id\">{{label}}</label>\n\n\t\t\t<div *ngIf=\"skeleton; else enableInput\" class=\"bx--search-input\"></div>\n\t\t\t<ng-template #enableInput>\n\t\t\t\t<input\n\t\t\t\t\t#input\n\t\t\t\t\t*ngIf=\"!toolbar || active\"\n\t\t\t\t\tclass=\"bx--search-input\"\n\t\t\t\t\ttype=\"text\"\n\t\t\t\t\trole=\"search\"\n\t\t\t\t\t[id]=\"id\"\n\t\t\t\t\t[value]=\"value\"\n\t\t\t\t\t[placeholder]=\"placeholder\"\n\t\t\t\t\t[disabled]=\"disabled\"\n\t\t\t\t\t[required]=\"required\"\n\t\t\t\t\t(input)=\"onSearch($event.target.value)\"/>\n\t\t\t\t<button\n\t\t\t\t\t*ngIf=\"toolbar; else svg\"\n\t\t\t\t\tclass=\"bx--toolbar-search__btn\"\n\t\t\t\t\t[attr.aria-label]=\"i18n.get('SEARCH.TOOLBAR_SEARCH') | async\"\n\t\t\t\t\ttabindex=\"0\"\n\t\t\t\t\t(click)=\"openSearch($event)\">\n\t\t\t\t\t<ng-template [ngTemplateOutlet]=\"svg\"></ng-template>\n\t\t\t\t</button>\n\t\t\t\t<ng-template #svg>\n\t\t\t\t\t<svg\n\t\t\t\t\t\tclass=\"bx--search-magnifier\"\n\t\t\t\t\t\twidth=\"16\"\n\t\t\t\t\t\theight=\"16\"\n\t\t\t\t\t\tviewBox=\"0 0 16 16\">\n\t\t\t\t\t\t<path\n\t\t\t\t\t\t\td=\"M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm4.936-1.27l4.563 4.557-.707.708-4.563-4.558a6.5 6.5 0 1 1 .707-.707z\"\n\t\t\t\t\t\t\tfill-rule=\"nonzero\"/>\n\t\t\t\t\t</svg>\n\t\t\t\t</ng-template>\n\t\t\t</ng-template>\n\n\t\t\t<button\n\t\t\t\tclass=\"bx--search-close\"\n\t\t\t\t[ngClass]=\"{\n\t\t\t\t\t'bx--search-close--hidden': !value || value.length === 0\n\t\t\t\t}\"\n\t\t\t\t[title]=\"clearButtonTitle\"\n\t\t\t\t[attr.aria-label]=\"clearButtonTitle\"\n\t\t\t\t(click)=\"clearSearch()\">\n\t\t\t\t<svg\n\t\t\t\t\twidth=\"16\"\n\t\t\t\t\theight=\"16\"\n\t\t\t\t\tviewBox=\"0 0 16 16\"\n\t\t\t\t\txmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t<path\n\t\t\t\t\t\td=\"M8 6.586L5.879 4.464 4.464 5.88 6.586 8l-2.122 2.121 1.415 1.415L8 9.414l2.121 2.122 1.415-1.415L9.414\n\t\t\t\t\t\t\t8l2.122-2.121-1.415-1.415L8 6.586zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16z\"\n\t\t\t\t\t\tfill-rule=\"evenodd\"/>\n\t\t\t\t</svg>\n\t\t\t</button>\n\t\t</div>\n\t",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: Search,
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    Search.ctorParameters = function () { return [
        { type: ElementRef },
        { type: I18n }
    ]; };
    Search.propDecorators = {
        containerClass: [{ type: HostBinding, args: ["class.bx--form-item",] }],
        theme: [{ type: Input }],
        size: [{ type: Input }],
        disabled: [{ type: Input }],
        toolbar: [{ type: Input }],
        skeleton: [{ type: Input }],
        active: [{ type: Input }],
        name: [{ type: Input }],
        id: [{ type: Input }],
        required: [{ type: Input }],
        value: [{ type: Input }],
        label: [{ type: Input }],
        placeholder: [{ type: Input }],
        clearButtonTitle: [{ type: Input }],
        change: [{ type: Output }],
        inputRef: [{ type: ViewChild, args: ["input",] }],
        keyDown: [{ type: HostListener, args: ["keydown", ["$event"],] }],
        focusOut: [{ type: HostListener, args: ["focusout", ["$event"],] }]
    };
    return Search;
}());
export { Search };
//# sourceMappingURL=search.component.js.map