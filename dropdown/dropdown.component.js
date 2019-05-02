/*!
 *
 * carbon-angular v0.0.0 | dropdown.component.js
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


import { Component, Input, Output, EventEmitter, ElementRef, ContentChild, ViewChild, HostListener } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
// Observable import is required here so typescript can compile correctly
import { fromEvent, of } from "rxjs";
import { AbstractDropdownView } from "./abstract-dropdown-view.class";
import { I18n } from "./../i18n/i18n.module";
import { DropdownService } from "./dropdown.service";
/**
 * Drop-down lists enable users to select one or more items from a list.
 *
 */
var Dropdown = /** @class */ (function () {
    /**
     * Creates an instance of Dropdown.
     */
    function Dropdown(elementRef, i18n, dropdownService) {
        this.elementRef = elementRef;
        this.i18n = i18n;
        this.dropdownService = dropdownService;
        /**
         * Value displayed if no item is selected.
         */
        this.placeholder = "";
        /**
         * The selected value from the `Dropdown`.
         */
        this.displayValue = "";
        /**
         * Size to render the dropdown field.
         */
        this.size = "md";
        /**
         * Defines whether or not the `Dropdown` supports selecting multiple items as opposed to single
         * item selection.
         */
        this.type = "single";
        /**
         * `light` or `dark` dropdown theme
         */
        this.theme = "dark";
        /**
         * Set to `true` to disable the dropdown.
         */
        this.disabled = false;
        /**
         * Set to `true` for a loading dropdown.
         */
        this.skeleton = false;
        /**
         * Set to `true` for an inline dropdown.
         */
        this.inline = false;
        /**
         * Set to `true` for a dropdown without arrow key activation.
         */
        this.disableArrowKeys = false;
        /**
         * set to `true` to place the dropdown view inline with the component
         */
        this.appendInline = false;
        /**
         * Accessible label for the button that opens the dropdown list.
         * Defaults to the `DROPDOWN.OPEN` value from the i18n service.
         */
        this.menuButtonLabel = this.i18n.get().DROPDOWN.OPEN;
        /**
         * Provides the label for the "# selected" text.
         * Defaults to the `DROPDOWN.SELECTED` value from the i18n service.
         */
        this.selectedLabel = this.i18n.get().DROPDOWN.SELECTED;
        /**
         * Emits selection events.
         */
        this.selected = new EventEmitter();
        /**
         * Emits event notifying to other classes that the `Dropdown` has been closed (collapsed).
         */
        this.onClose = new EventEmitter();
        /**
         * Emits event notifying to other classes that the `Dropdown` has been closed (collapsed).
         */
        this.close = new EventEmitter();
        /**
         * Set to `true` if the dropdown is closed (not expanded).
         */
        this.menuIsClosed = true;
        /**
         * controls wether the `drop-up` class is applied
         */
        this.dropUp = false;
        // .bind creates a new function, so we declare the methods below
        // but .bind them up here
        this.noop = this._noop.bind(this);
        this.outsideClick = this._outsideClick.bind(this);
        this.outsideKey = this._outsideKey.bind(this);
        this.keyboardNav = this._keyboardNav.bind(this);
        this.onTouchedCallback = this._noop;
        this.propagateChange = function (_) { };
    }
    Object.defineProperty(Dropdown.prototype, "appendToBody", {
        get: function () {
            return !this.appendInline;
        },
        /**
         * Deprecated. Dropdown now defaults to appending inline
         * Set to `true` if the `Dropdown` is to be appended to the DOM body.
         */
        set: function (v) {
            console.log("`appendToBody` has been deprecated. Dropdowns now append to the body by default.");
            console.log("Ensure you have an `ibm-placeholder` in your app.");
            console.log("Use `appendInline` if you need to position your dropdowns within the normal page flow.");
            this.appendInline = !v;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates the `type` property in the `@ContentChild`.
     * The `type` property specifies whether the `Dropdown` allows single selection or multi selection.
     */
    Dropdown.prototype.ngOnInit = function () {
        if (this.view) {
            this.view.type = this.type;
        }
        // add -40 to the top position to account for carbon styles
        this.dropdownService.offset = { top: -40 };
    };
    /**
     * Initializes classes and subscribes to events for single or multi selection.
     */
    Dropdown.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (!this.view) {
            return;
        }
        this.view.type = this.type;
        this.view.size = this.size;
        this.view.select.subscribe(function (event) {
            if (_this.type === "multi") {
                _this.propagateChange(_this.view.getSelected());
            }
            else {
                _this.closeMenu();
                _this.dropdownButton.nativeElement.focus();
                if (event.item && event.item.selected) {
                    if (_this.value) {
                        _this.propagateChange(event.item[_this.value]);
                    }
                    else {
                        _this.propagateChange(event.item);
                    }
                }
                else {
                    _this.propagateChange(null);
                }
            }
            _this.selected.emit(event);
        });
    };
    /**
     * Removing the `Dropdown` from the body if it is appended to the body.
     */
    Dropdown.prototype.ngOnDestroy = function () {
        if (this.appendToBody) {
            this._appendToDropdown();
        }
    };
    /**
     * Propagates the injected `value`.
     */
    Dropdown.prototype.writeValue = function (value) {
        var _this = this;
        if (this.type === "single") {
            if (this.value) {
                var newValue = Object.assign({}, this.view.getListItems().find(function (item) { return item[_this.value] === value; }));
                newValue.selected = true;
                this.view.propagateSelected([newValue]);
            }
            else {
                this.view.propagateSelected([value]);
            }
        }
        else {
            this.view.propagateSelected(value);
        }
    };
    Dropdown.prototype.onBlur = function () {
        this.onTouchedCallback();
    };
    Dropdown.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    /**
     * Registering the function injected to control the touch use of the `Dropdown`.
     */
    Dropdown.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * Adds keyboard functionality for navigation, selection and closing of the `Dropdown`.
     */
    // "Esc", "Spacebar", "Down", and "Up" are IE specific values
    Dropdown.prototype.onKeyDown = function (event) {
        if ((event.key === "Escape" || event.key === "Esc") && !this.menuIsClosed) {
            event.stopImmediatePropagation(); // don't unintentionally close other widgets that listen for Escape
        }
        if (event.key === "Escape" || event.key === "Esc") {
            event.preventDefault();
            this.closeMenu();
            this.dropdownButton.nativeElement.focus();
        }
        else if (this.menuIsClosed && (event.key === " " || event.key === "ArrowDown" || event.key === "ArrowUp" ||
            event.key === "Spacebar" || event.key === "Down" || event.key === "Up")) {
            if (this.disableArrowKeys && (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Down" || event.key === "Up")) {
                return;
            }
            event.preventDefault();
            this.openMenu();
        }
        if (!this.menuIsClosed && event.key === "Tab" && this.dropdownMenu.nativeElement.contains(event.target)) {
            this.closeMenu();
        }
        if (!this.menuIsClosed && event.key === "Tab" && event.shiftKey) {
            this.closeMenu();
        }
        if (this.type === "multi") {
            return;
        }
        if (this.menuIsClosed) {
            this.closedDropdownNavigation(event);
        }
    };
    Dropdown.prototype.closedDropdownNavigation = function (event) {
        // "Down", and "Up" are IE specific values
        if (event.key === "ArrowDown" || event.key === "Down") {
            event.preventDefault();
            this.view.getCurrentItem().selected = false;
            var item = this.view.getNextItem();
            if (item) {
                item.selected = true;
            }
        }
        else if (event.key === "ArrowUp" || event.key === "Up") {
            event.preventDefault();
            this.view.getCurrentItem().selected = false;
            var item = this.view.getPrevItem();
            if (item) {
                item.selected = true;
            }
        }
    };
    /**
     * Returns the display value if there is a selection and displayValue is set,
     * if there is just a selection the ListItem content property will be returned,
     * otherwise the placeholder will be returned.
     */
    Dropdown.prototype.getDisplayValue = function () {
        if (!this.view) {
            return;
        }
        var selected = this.view.getSelected();
        if (selected && !this.displayValue) {
            if (this.type === "multi") {
                return of("" + this.placeholder);
            }
            else {
                return of(selected[0].content);
            }
        }
        else if (selected) {
            return of(this.displayValue);
        }
        return of(this.placeholder);
    };
    /**
     * Returns `true` if there is a value selected.
     */
    Dropdown.prototype.valueSelected = function () {
        if (this.view.getSelected()) {
            return true;
        }
        return false;
    };
    Dropdown.prototype._noop = function () { };
    /**
     * Handles clicks outside of the `Dropdown`.
     */
    Dropdown.prototype._outsideClick = function (event) {
        if (!this.elementRef.nativeElement.contains(event.target) &&
            // if we're appendToBody the list isn't within the _elementRef,
            // so we've got to check if our target is possibly in there too.
            !this.dropdownMenu.nativeElement.contains(event.target)) {
            this.closeMenu();
        }
    };
    Dropdown.prototype._outsideKey = function (event) {
        if (!this.menuIsClosed && event.key === "Tab" && this.dropdownMenu.nativeElement.contains(event.target)) {
            this.closeMenu();
        }
    };
    /**
     * Handles keyboard events so users are controlling the `Dropdown` instead of unintentionally controlling outside elements.
     */
    Dropdown.prototype._keyboardNav = function (event) {
        // "Esc" is an IE specific value
        if ((event.key === "Escape" || event.key === "Esc") && !this.menuIsClosed) {
            event.stopImmediatePropagation(); // don't unintentionally close modal if inside of it
        }
        if (event.key === "Escape" || event.key === "Esc") {
            event.preventDefault();
            this.closeMenu();
            this.dropdownButton.nativeElement.focus();
        }
        else if (!this.menuIsClosed && event.key === "Tab") {
            // this way focus will start on the next focusable item from the dropdown
            // not the top of the body!
            this.dropdownButton.nativeElement.focus();
            this.dropdownButton.nativeElement.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "Tab" }));
            this.closeMenu();
        }
    };
    /**
     * Creates the `Dropdown` list appending it to the dropdown parent object instead of the body.
     */
    Dropdown.prototype._appendToDropdown = function () {
        this.dropdownService.appendToDropdown(this.elementRef.nativeElement);
        this.dropdownMenu.nativeElement.removeEventListener("keydown", this.keyboardNav, true);
    };
    /**
     * Creates the `Dropdown` list as an element that is appended to the DOM body.
     */
    Dropdown.prototype._appendToBody = function () {
        this.dropdownService.appendToBody(this.dropdownButton.nativeElement, this.dropdownMenu.nativeElement, this.elementRef.nativeElement.className);
        this.dropdownMenu.nativeElement.addEventListener("keydown", this.keyboardNav, true);
    };
    /**
     * Expands the dropdown menu in the view.
     */
    Dropdown.prototype.openMenu = function () {
        var _this = this;
        this.menuIsClosed = false;
        // move the dropdown list to the body if we're not appending inline
        // and position it relative to the dropdown wrapper
        if (!this.appendInline) {
            this.addScrollEventListener();
            this._appendToBody();
        }
        // set the dropdown menu to drop up if it's near the bottom of the screen
        // setTimeout lets us measure after it's visible in the DOM
        setTimeout(function () {
            var menu = _this.dropdownMenu.nativeElement;
            var boundingClientRect = menu.getBoundingClientRect();
            if (boundingClientRect.bottom > window.innerHeight) {
                // min height of 100px
                if (window.innerHeight - boundingClientRect.top > 100) {
                    // remove the conditional once this api is settled and part of abstract-dropdown-view.class
                    if (_this.view["enableScroll"]) {
                        _this.view["enableScroll"]();
                    }
                }
                else {
                    _this.dropUp = true;
                }
            }
            else {
                _this.dropUp = false;
            }
        }, 0);
        // we bind noop to document.body.firstElementChild to allow safari to fire events
        // from document. Then we unbind everything later to keep things light.
        document.body.firstElementChild.addEventListener("click", this.noop, true);
        document.body.firstElementChild.addEventListener("keydown", this.noop, true);
        document.addEventListener("click", this.outsideClick, true);
        document.addEventListener("keydown", this.outsideKey, true);
        setTimeout(function () { return _this.view.initFocus(); }, 0);
    };
    /**
     * Collapsing the dropdown menu and removing unnecessary `EventListeners`.
     */
    Dropdown.prototype.closeMenu = function () {
        // return early if the menu is already closed
        if (this.menuIsClosed) {
            return;
        }
        this.menuIsClosed = true;
        this.onClose.emit();
        this.close.emit();
        // focus the trigger button when we close ...
        this.dropdownButton.nativeElement.focus();
        // remove the conditional once this api is settled and part of abstract-dropdown-view.class
        if (this.view["disableScroll"]) {
            this.view["disableScroll"]();
        }
        // move the list back in the component on close
        if (!this.appendInline) {
            this.removeScrollEventListener();
            this._appendToDropdown();
        }
        document.body.firstElementChild.removeEventListener("click", this.noop, true);
        document.body.firstElementChild.removeEventListener("keydown", this.noop, true);
        document.removeEventListener("click", this.outsideClick, true);
        document.removeEventListener("keydown", this.outsideKey, true);
    };
    /**
     * Add scroll event listener if scrollableContainer is provided
     */
    Dropdown.prototype.addScrollEventListener = function () {
        var _this = this;
        if (this.scrollableContainer) {
            var container_1 = document.querySelector(this.scrollableContainer);
            if (container_1) {
                this.scroll = fromEvent(container_1, "scroll")
                    .subscribe(function () {
                    if (_this.isVisibleInContainer(_this.elementRef.nativeElement, container_1)) {
                        _this.dropdownService.updatePosition(_this.dropdownButton.nativeElement);
                    }
                    else {
                        _this.closeMenu();
                    }
                });
            }
        }
    };
    /**
     * Removes any `EventListeners` responsible for scroll functionality.
     */
    Dropdown.prototype.removeScrollEventListener = function () {
        if (this.scroll) {
            this.scroll.unsubscribe();
        }
    };
    /**
     * Controls toggling menu states between open/expanded and closed/collapsed.
     */
    Dropdown.prototype.toggleMenu = function () {
        if (this.menuIsClosed) {
            this.openMenu();
        }
        else {
            this.closeMenu();
        }
    };
    /**
     * Returns `true` if the `elem` is visible within the `container`.
     */
    Dropdown.prototype.isVisibleInContainer = function (elem, container) {
        var containerTop = container.scrollTop;
        var containerBottom = containerTop + container.offsetHeight;
        var elemTop = elem.offsetTop + elem.offsetHeight;
        var elemBottom = elemTop;
        if ((elemBottom <= containerBottom) && (elemTop >= containerTop)) {
            return true;
        }
        return false;
    };
    Dropdown.prototype.clearSelected = function () {
        this.view.resetSelected();
        this.selected.emit([]);
        this.propagateChange([]);
    };
    Dropdown.decorators = [
        { type: Component, args: [{
                    selector: "ibm-dropdown",
                    template: "\n\t<div\n\t\tclass=\"bx--list-box bx--dropdown\"\n\t\t[ngClass]=\"{\n\t\t\t'bx--dropdown--light': theme === 'light',\n\t\t\t'bx--list-box--inline': inline,\n\t\t\t'bx--skeleton': skeleton\n\t\t}\">\n\t\t<button\n\t\t\ttype=\"button\"\n\t\t\t#dropdownButton\n\t\t\tclass=\"bx--list-box__field\"\n\t\t\t[ngClass]=\"{'a': !menuIsClosed}\"\n\t\t\t[attr.aria-expanded]=\"!menuIsClosed\"\n\t\t\t[attr.aria-disabled]=\"disabled\"\n\t\t\t(blur)=\"onBlur()\"\n\t\t\t[disabled]=\"disabled\">\n\t\t\t<span (click)=\"clearSelected()\" *ngIf=\"type === 'multi' && view.getSelected() && view.getSelected().length\"\n\t\t\t\tclass=\"bx--list-box__selection bx--list-box__selection--multi\">\n\t\t\t\t{{view.getSelected().length}}\n\t\t\t\t&nbsp;\n\t\t\t\t<svg class=\"close-tag\" width=\"8\" height=\"8\" viewBox=\"0 0 10 10\">\n\t\t\t\t\t<path d=\"M6.32 5L10 8.68 8.68 10 5 6.32 1.32 10 0 8.68 3.68 5 0 1.32 1.32 0 5 3.68 8.68 0 10 1.32 6.32 5z\"></path>\n\t\t\t\t</svg>\n\t\t\t</span>\n\t\t\t<div class=\"click-container\" (click)=\"toggleMenu()\" style=\"width: 100%; text-align: left;\">\n\t\t\t\t<span class=\"bx--list-box__label\">\n\t\t\t\t\t{{getDisplayValue() | async}}\n\t\t\t\t</span>\n\t\t\t\t<div *ngIf=\"!skeleton\" class=\"bx--list-box__menu-icon\" [ngClass]=\"{'bx--list-box__menu-icon--open': !menuIsClosed }\">\n\t\t\t\t\t<svg fill-rule=\"evenodd\" height=\"5\" role=\"img\" viewBox=\"0 0 10 5\" width=\"10\"\n\t\t\t\t\talt=\"Open menu\" [attr.aria-label]=\"menuButtonLabel\">\n\t\t\t\t\t\t<title>{{menuButtonLabel}}</title>\n\t\t\t\t\t\t<path d=\"M0 0l5 4.998L10 0z\"></path>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</button>\n\t\t<div\n\t\t\t#dropdownMenu\n\t\t\t[ngClass]=\"{\n\t\t\t\t'drop-up': dropUp\n\t\t\t}\">\n\t\t\t<ng-content *ngIf=\"!menuIsClosed\"></ng-content>\n\t\t</div>\n\t</div>\n\t",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: Dropdown,
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    Dropdown.ctorParameters = function () { return [
        { type: ElementRef },
        { type: I18n },
        { type: DropdownService }
    ]; };
    Dropdown.propDecorators = {
        placeholder: [{ type: Input }],
        displayValue: [{ type: Input }],
        size: [{ type: Input }],
        type: [{ type: Input }],
        theme: [{ type: Input }],
        disabled: [{ type: Input }],
        skeleton: [{ type: Input }],
        inline: [{ type: Input }],
        disableArrowKeys: [{ type: Input }],
        appendToBody: [{ type: Input }],
        appendInline: [{ type: Input }],
        scrollableContainer: [{ type: Input }],
        value: [{ type: Input }],
        menuButtonLabel: [{ type: Input }],
        selectedLabel: [{ type: Input }],
        selected: [{ type: Output }],
        onClose: [{ type: Output }],
        close: [{ type: Output }],
        view: [{ type: ContentChild, args: [AbstractDropdownView,] }],
        dropdownButton: [{ type: ViewChild, args: ["dropdownButton",] }],
        dropdownMenu: [{ type: ViewChild, args: ["dropdownMenu",] }],
        onKeyDown: [{ type: HostListener, args: ["keydown", ["$event"],] }]
    };
    return Dropdown;
}());
export { Dropdown };
//# sourceMappingURL=dropdown.component.js.map