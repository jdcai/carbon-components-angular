/*!
 *
 * carbon-angular v0.0.0 | pill-input.component.js
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


import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, ViewChildren, QueryList, HostBinding } from "@angular/core";
import { Pill } from "./pill.component";
/**
 * Internal component used to render pills and the pill text input.
 * There is a sizeable chunk of logic here handling focus and keyboard state around pills.
 *
 * @export
 * @class PillInput
 * @implements {OnChanges}
 * @implements {AfterViewInit}
 */
var PillInput = /** @class */ (function () {
    /** instaniates a pill-input */
    function PillInput(elementRef) {
        this.elementRef = elementRef;
        /** are we focused? needed because we have a lot of inputs that could steal focus and we need to set visual focus on the wrapper */
        this.focusActive = false;
        /** height of the expanded input */
        this.expandedHeight = 0;
        /** number of pills hidden by overflow */
        this.numberMore = 0;
        /** should we show the placeholder value? */
        this.showPlaceholder = true;
        /** sets the expanded state (hide/show all selected pills) */
        this.expanded = false;
        /** array of selected items */
        this.pills = [];
        /** value to display when nothing is selected */
        this.placeholder = "";
        /** value to display when something is selected */
        this.displayValue = "";
        /** "single" or "multi" for single or multi select lists */
        this.type = "single";
        this.size = "md";
        /** is the input disabled. true/false */
        this.disabled = false;
        /** the direction of the pills */
        this.pillDirection = "row";
        /** empty event to trigger an update of the selected items */
        this.updatePills = new EventEmitter();
        /** emitted when the user types into an input */
        this.search = new EventEmitter();
        /** emitted when the user presses enter and a value is present */
        this.submit = new EventEmitter();
        /** emitted when the component is focused */
        this.focus = new EventEmitter();
        /** emitted when the component looses focus */
        this.blur = new EventEmitter();
        // needed since matter doesn't/can't account for the host element
        this.width = "100";
    }
    /**
     * Updates the pills, and subscribes to their `remove` events.
     * Updates the displayValue and checks if it should be displayed.
     * @param changes
     */
    PillInput.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.pills) {
            this.pills = changes.pills.currentValue;
            if (this.pillDirection === "column") {
                this.numberMore = this.pills.length - 1;
            }
            setTimeout(function () {
                if (_this.pillInstances) {
                    _this.numberMore = 0;
                    var pills = _this.elementRef.nativeElement.querySelectorAll(".pill");
                    if (pills.length > 1) {
                        for (var _i = 0, pills_1 = pills; _i < pills_1.length; _i++) {
                            var pill = pills_1[_i];
                            if (pill.offsetTop > 30) {
                                _this.numberMore++;
                            }
                        }
                    }
                    _this.pillInstances.forEach(function (item) {
                        item.remove.subscribe(function () {
                            _this.updatePills.emit();
                            _this.doResize();
                            if (_this.numberMore === 0) {
                                _this.expanded = false;
                            }
                        });
                    });
                    _this.doResize();
                }
            });
        }
        if (changes.displayValue) {
            if (this.type === "single" && this.singleInput) {
                this.singleInput.nativeElement.value = changes.displayValue.currentValue;
            }
            this.checkPlaceholderVisibility();
        }
    };
    /**
     * Binds events on the view.
     * @returns null
     * @memberof PillInput
     */
    PillInput.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.inputWrapper) {
            this.inputWrapper.nativeElement.scrollTop = 0;
        }
        // TODO: move these to methods and late bind/eager unbind
        if (this.disabled) {
            return;
        }
        // collapse input on outside click
        document.addEventListener("click", function (ev) {
            if (_this.elementRef.nativeElement.contains(ev.target)) {
                _this.setFocus(true);
            }
            else {
                _this.setFocus(false);
            }
            _this.checkPlaceholderVisibility();
        });
        // keyup here because we want to get the element the event ends on
        // **not** the element the event starts from (that would be keydown)
        document.addEventListener("keyup", function (ev) {
            if (!_this.elementRef.nativeElement.contains(ev.target)) {
                _this.setFocus(false);
            }
            else {
                _this.setFocus(true);
            }
            _this.checkPlaceholderVisibility();
        });
        this.clearInputText();
    };
    /**
     * Helper method to check if an array is empty
     * @param {Array<any>} array
     */
    PillInput.prototype.empty = function (array) {
        if (!array) {
            return true;
        }
        if (array.length === 0) {
            return true;
        }
        return false;
    };
    /**
     * sets focus to state
     *
     * @param {boolean} state
     */
    PillInput.prototype.setFocus = function (state) {
        this.focusActive = state;
        if (this.focusActive) {
            this.focus.emit();
        }
        else {
            this.blur.emit();
        }
    };
    /**
     * focuses the correct input and handles clearing any unnecessary values from any other input
     *
     * @param ev
     */
    PillInput.prototype.focusInput = function (ev) {
        var _this = this;
        if (this.disabled) {
            return;
        }
        this.setFocus(true);
        if (this.numberMore > 0 || this.pillDirection === "column") {
            this.expandedHeight = this.pillWrapper.nativeElement.offsetHeight;
            this.expanded = true;
        }
        if (this.pillInputs.find(function (input) { return input.nativeElement === ev.target; })) {
            if (ev.target.textContent === "") {
                ev.target.textContent = "";
            }
            this.clearInputText(ev.target);
            this.setSelection(ev.target);
        }
        else if (this.getInputText()) {
            this.pillInputs.forEach(function (input) {
                if (input.nativeElement.textContent.trim() !== "") {
                    _this.setSelection(input.nativeElement);
                }
            });
        }
        else {
            if (this.pillInputs.last.nativeElement.textContent === "") {
                this.pillInputs.last.nativeElement.textContent = "";
            }
            this.setSelection(this.pillInputs.last.nativeElement);
        }
        this.inputWrapper.nativeElement.scrollTop = 0;
    };
    /**
     * toggles the expanded state of the input wrapper to show all pills
     *
     * @param ev
     */
    PillInput.prototype.showMore = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.expanded = !this.expanded;
        this.doResize();
    };
    /**
     * sets the height of the input wrapper to the correct height for all selected pills
     */
    PillInput.prototype.doResize = function () {
        if (this.expanded) {
            this.expandedHeight = this.pillWrapper.nativeElement.offsetHeight;
        }
    };
    /**
     * clears the content of inputs
     *
     * @param toSkip input element to skip clearing
     */
    PillInput.prototype.clearInputText = function (toSkip) {
        if (toSkip === void 0) { toSkip = null; }
        if (this.pillInputs) {
            this.pillInputs.forEach(function (input) {
                if (!toSkip || input.nativeElement !== toSkip) {
                    input.nativeElement.textContent = "";
                }
            });
        }
    };
    /**
     * returns the text from an event, the textContent of the first filled pillInput, or an empty string
     *
     * @param ev optional event to pull text from
     */
    PillInput.prototype.getInputText = function (ev) {
        if (ev === void 0) { ev = null; }
        if (this.type === "multi") {
            if (ev) {
                return ev.target.textContent.trim();
            }
            if (this.pillInputs) {
                var text = this.pillInputs.find(function (input) { return input.nativeElement.textContent.trim() !== ""; });
                return text ? text.nativeElement.textContent.trim() : "";
            }
        }
        if (this.type === "single" && ev) {
            return ev.target.value.trim();
        }
        return "";
    };
    /**
     * handles deleting pills on backspace, submitting user input on enter, and navigating the pill list with arrow left/right
     *
     * @param ev
     */
    PillInput.prototype.onKeydown = function (ev) {
        if (ev.key === "Escape") {
            this.expanded = false;
        }
        else if (ev.key === "Backspace" && ev.target["textContent"] === "" && !this.empty(this.pills)) {
            // stop the window from navigating backwards
            ev.preventDefault();
            var inputIndex = this.pillInputs.toArray().findIndex(function (input) { return input.nativeElement === ev.target; });
            if (inputIndex > -1) {
                this.pills[inputIndex].selected = false;
                // - 1 because the last one doesn't get removed, so the focus doesn't leave
                if (inputIndex < this.pillInputs.length - 1) {
                    this.pillInputs.toArray()[inputIndex + 1].nativeElement.focus();
                }
            }
            this.updatePills.emit();
        }
        else if (ev.key === "Enter") {
            ev.preventDefault();
            if (this.getInputText()) {
                var inputIndex = this.pillInputs.toArray().findIndex(function (input) { return input.nativeElement.textContent.trim() !== ""; });
                this.submit.emit({
                    after: this.pills[inputIndex],
                    value: this.getInputText()
                });
                this.clearInputText();
            }
        }
        else if (ev.key === "ArrowLeft") {
            var index = this.pillInputs.toArray().findIndex(function (input) { return input.nativeElement === ev.target; });
            var prevInput = this.pillInputs.toArray()[index - 1];
            if (prevInput) {
                prevInput.nativeElement.focus();
            }
        }
        else if (ev.key === "ArrowRight") {
            var index = this.pillInputs.toArray().findIndex(function (input) { return input.nativeElement === ev.target; });
            var nextInput = this.pillInputs.toArray()[index + 1];
            if (nextInput) {
                nextInput.nativeElement.focus();
            }
        }
    };
    /** handles emmiting the search event */
    PillInput.prototype.onKeyup = function (ev) {
        this.doResize();
        this.clearInputText(ev.target);
        this.search.emit(this.getInputText(ev));
    };
    /**
     * checks weather the placeholder should be displayed or not.
     */
    PillInput.prototype.checkPlaceholderVisibility = function () {
        var _this = this;
        if (this.type === "single") {
            setTimeout(function () { return _this.showPlaceholder = !_this.displayValue && !_this.focusActive && !_this.getInputText(); });
        }
        else {
            setTimeout(function () { return _this.showPlaceholder = _this.empty(_this.pills) && !_this.focusActive && !_this.getInputText(); });
        }
    };
    /**
     * selects all the text in a given node
     *
     * @param target node to set the selection on
     */
    PillInput.prototype.setSelection = function (target) {
        var selectionRange = document.createRange();
        var selection = window.getSelection();
        selectionRange.selectNodeContents(target);
        selection.removeAllRanges();
        selection.addRange(selectionRange);
        target.focus();
    };
    PillInput.decorators = [
        { type: Component, args: [{
                    selector: "ibm-pill-input",
                    template: "\n\t\t<div\n\t\t\t#inputWrapper\n\t\t\t*ngIf=\"type === 'multi'\"\n\t\t\trole=\"textbox\"\n\t\t\tclass=\"pill_input_wrapper\"\n\t\t\t[ngClass]=\"{\n\t\t\t\t'expand-overflow': expanded,\n\t\t\t\tfocus: focusActive,\n\t\t\t\tdisabled: disabled\n\t\t\t}\"\n\t\t\tstyle=\"overflow: hidden;\"\n\t\t\t(click)=\"focusInput($event)\">\n\t\t\t<span\n\t\t\t\t*ngIf=\"showPlaceholder\"\n\t\t\t\tclass=\"input_placeholder\">\n\t\t\t\t{{ placeholder }}\n\t\t\t</span>\n\t\t\t<div\n\t\t\t\t#pillWrapper\n\t\t\t\t[ngClass]=\"{\n\t\t\t\t\t'input_pills--column': pillDirection === 'column',\n\t\t\t\t\t'input_pills': pillDirection === 'row'\n\t\t\t\t}\">\n\t\t\t\t<div style=\"display: flex\" *ngFor=\"let pill of pills; let last = last\">\n\t\t\t\t\t<ibm-pill\n\t\t\t\t\t\t[item]=\"pill\">\n\t\t\t\t\t\t{{ pill.content }}\n\t\t\t\t\t</ibm-pill>\n\t\t\t\t\t<div\n\t\t\t\t\t\t#pillInput\n\t\t\t\t\t\t*ngIf=\"!last\"\n\t\t\t\t\t\tclass=\"input\"\n\t\t\t\t\t\tcontenteditable\n\t\t\t\t\t\t(keydown)=\"onKeydown($event)\"\n\t\t\t\t\t\t(keyup)=\"onKeyup($event)\"></div>\n\t\t\t\t</div>\n\t\t\t\t<div\n\t\t\t\t\t#pillInput\n\t\t\t\t\tclass=\"input\"\n\t\t\t\t\tcontenteditable\n\t\t\t\t\t(keydown)=\"onKeydown($event)\"\n\t\t\t\t\t(keyup)=\"onKeyup($event)\"></div>\n\t\t\t</div>\n\t\t\t<button\n\t\t\t\t*ngIf=\"!expanded && numberMore > 0\"\n\t\t\t\tclass=\"btn--link\"\n\t\t\t\thref=\"\"\n\t\t\t\t(click)=\"showMore($event)\">{{ numberMore }} more</button>\n\t\t\t<button\n\t\t\t\t*ngIf=\"expanded && numberMore > 0\"\n\t\t\t\tclass=\"btn--link\"\n\t\t\t\thref=\"\"\n\t\t\t\t(click)=\"showMore($event)\">Hide</button>\n\t\t</div>\n\t\t<input\n\t\t\t#singleInput\n\t\t\t*ngIf=\"type === 'single'\"\n\t\t\ttype=\"text\"\n\t\t\t[disabled]=\"disabled\"\n\t\t\t[placeholder]=\"placeholder\"\n\t\t\t(keydown)=\"onKeydown($event)\"\n\t\t\t(keyup)=\"onKeyup($event)\"/>"
                },] },
    ];
    /** @nocollapse */
    PillInput.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    PillInput.propDecorators = {
        pills: [{ type: Input }],
        placeholder: [{ type: Input }],
        displayValue: [{ type: Input }],
        type: [{ type: Input }],
        size: [{ type: Input }],
        disabled: [{ type: Input }],
        pillDirection: [{ type: Input }],
        updatePills: [{ type: Output }],
        search: [{ type: Output }],
        submit: [{ type: Output }],
        focus: [{ type: Output }],
        blur: [{ type: Output }],
        pillWrapper: [{ type: ViewChild, args: ["pillWrapper",] }],
        inputWrapper: [{ type: ViewChild, args: ["inputWrapper",] }],
        singleInput: [{ type: ViewChild, args: ["singleInput",] }],
        pillInputs: [{ type: ViewChildren, args: ["pillInput",] }],
        pillInstances: [{ type: ViewChildren, args: [Pill,] }],
        width: [{ type: HostBinding, args: ["style.width.%",] }]
    };
    return PillInput;
}());
export { PillInput };
//# sourceMappingURL=pill-input.component.js.map