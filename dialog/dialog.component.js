/*!
 *
 * carbon-angular v0.0.0 | dialog.component.js
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


import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, HostListener } from "@angular/core";
import { Subscription, fromEvent, merge } from "rxjs";
import { throttleTime } from "rxjs/operators";
// the AbsolutePosition is required to import the declaration correctly
import position from "./../utils/position";
import { cycleTabs, getFocusElementList } from "./../common/tab.service";
/**
 * Implements a `Dialog` that can be positioned anywhere on the page.
 * Used to implement a popover or tooltip.
 *
 * @export
 * @class Dialog
 * @implements {OnInit}
 * @implements {AfterViewInit}
 * @implements {OnDestroy}
 */
var Dialog = /** @class */ (function () {
    /**
     * Creates an instance of `Dialog`.
     * @param {ElementRef} elementRef
     * @memberof Dialog
     */
    function Dialog(elementRef) {
        var _this = this;
        this.elementRef = elementRef;
        /**
         * Emits event that handles the closing of a `Dialog` object.
         * @type {EventEmitter<any>}
         * @memberof Dialog
         */
        this.close = new EventEmitter();
        /**
         * Stores the data received from `dialogConfig`.
         * @memberof Dialog
         */
        this.data = {};
        /**
         * Subscription to all the scrollable parents `scroll` event
         */
        // add a new subscription temprarily so that contexts (such as tests)
        // that don't run ngAfterViewInit have something to unsubscribe in ngOnDestroy
        this.scrollSubscription = new Subscription();
        /**
         * Handles offsetting the `Dialog` item based on the defined position
         * to not obscure the content beneath.
         * @protected
         * @memberof Dialog
         */
        this.addGap = {
            "left": function (pos) { return position.addOffset(pos, 0, -_this.dialogConfig.gap); },
            "right": function (pos) { return position.addOffset(pos, 0, _this.dialogConfig.gap); },
            "top": function (pos) { return position.addOffset(pos, -_this.dialogConfig.gap); },
            "bottom": function (pos) { return position.addOffset(pos, _this.dialogConfig.gap); },
            "left-bottom": function (pos) { return position.addOffset(pos, 0, -_this.dialogConfig.gap); },
            "right-bottom": function (pos) { return position.addOffset(pos, 0, _this.dialogConfig.gap); }
        };
    }
    /**
     * Initilize the `Dialog`, set the placement and gap, and add a `Subscription` to resize events.
     * @memberof Dialog
     */
    Dialog.prototype.ngOnInit = function () {
        var _this = this;
        this.placement = this.dialogConfig.placement.split(",")[0];
        this.data = this.dialogConfig.data;
        this.resizeSubscription = Dialog.resizeObservable.subscribe(function () {
            _this.placeDialog();
        });
        // run any additional initlization code that consuming classes may have
        this.onDialogInit();
    };
    /**
     * After the DOM is ready, focus is set and dialog is placed
     * in respect to the parent element.
     * @memberof Dialog
     */
    Dialog.prototype.ngAfterViewInit = function () {
        var _this = this;
        var dialogElement = this.dialog.nativeElement;
        // split the wrapper class list and apply separately to avoid IE from
        // 1. throwing an error due to assigning a readonly property (classList)
        // 2. throwing a SyntaxError due to passing an empty string to `add`
        if (this.dialogConfig.wrapperClass) {
            for (var _i = 0, _a = this.dialogConfig.wrapperClass.split(" "); _i < _a.length; _i++) {
                var extraClass = _a[_i];
                dialogElement.classList.add(extraClass);
            }
        }
        this.placeDialog();
        if (getFocusElementList(this.dialog.nativeElement).length > 0) {
            dialogElement.focus();
        }
        var parentEl = this.dialogConfig.parentRef.nativeElement;
        var node = parentEl;
        var observables = [];
        // if the element has an overflow set as part of
        // its computed style it can scroll
        var isScrollableElement = function (element) {
            var computedStyle = getComputedStyle(element);
            return (computedStyle.overflow === "auto" ||
                computedStyle.overflow === "scroll" ||
                computedStyle["overflow-y"] === "auto" ||
                computedStyle["overflow-y"] === "scroll" ||
                computedStyle["overflow-x"] === "auto" ||
                computedStyle["overflow-x"] === "scroll");
        };
        var isVisibleInContainer = function (element, container) {
            var elementRect = element.getBoundingClientRect();
            var containerRect = container.getBoundingClientRect();
            return elementRect.bottom <= containerRect.bottom && elementRect.top >= containerRect.top;
        };
        var placeDialogInContainer = function () {
            // only do the work to find the scroll containers if we're appended to body
            // or skip this work if we're inline
            if (!_this.dialogConfig.appendInline) {
                // walk the parents and subscribe to all the scroll events we can
                while (node.parentElement && node !== document.body) {
                    if (isScrollableElement(node)) {
                        observables.push(fromEvent(node, "scroll"));
                    }
                    node = node.parentElement;
                }
                // subscribe to the observable, and update the position and visibility
                var scrollObservable = merge.apply(void 0, observables);
                _this.scrollSubscription = scrollObservable.subscribe(function (event) {
                    _this.placeDialog();
                    if (!isVisibleInContainer(_this.dialogConfig.parentRef.nativeElement, event.target)) {
                        _this.doClose();
                    }
                });
            }
        };
        // settimeout to let the DOM settle before attempting to place the dialog
        // and before notifying components that the DOM is ready
        setTimeout(function () {
            placeDialogInContainer();
            _this.afterDialogViewInit();
        });
    };
    /**
     * Empty method to be overridden by consuming classes to run any additional initialization code.
     */
    Dialog.prototype.onDialogInit = function () { };
    /**
     * Empty method to be overridden by consuming classes to run any additional initialization code after the view is available.
     * NOTE: this does _not_ guarantee the dialog will be positioned, simply that it will exist in the DOM
     */
    Dialog.prototype.afterDialogViewInit = function () { };
    /**
     * Uses the position service to position the `Dialog` in screen space
     */
    Dialog.prototype.placeDialog = function () {
        var _this = this;
        // helper to find the position based on the current/given environment
        var findPosition = function (reference, target, placement) {
            var pos;
            if (_this.dialogConfig.appendInline) {
                pos = _this.addGap[placement](position.findRelative(reference, target, placement));
            }
            else {
                pos = _this.addGap[placement](position.findAbsolute(reference, target, placement));
            }
            return pos;
        };
        var parentEl = this.dialogConfig.parentRef.nativeElement;
        var el = this.dialog.nativeElement;
        var dialogPlacement = this.placement;
        // split always returns an array, so we can just use the auto position logic
        // for single positions too
        var placements = this.dialogConfig.placement.split(",");
        var weightedPlacements = placements.map(function (placement) {
            var pos = findPosition(parentEl, el, placement);
            var box = position.getPlacementBox(el, pos);
            var hiddenHeight = box.bottom - window.innerHeight - window.scrollY;
            var hiddenWidth = box.right - window.innerWidth - window.scrollX;
            // if the hiddenHeight or hiddenWidth is negative, reset to offsetHeight or offsetWidth
            hiddenHeight = hiddenHeight < 0 ? el.offsetHeight : hiddenHeight;
            hiddenWidth = hiddenWidth < 0 ? el.offsetWidth : hiddenWidth;
            var area = el.offsetHeight * el.offsetWidth;
            var hiddenArea = hiddenHeight * hiddenWidth;
            var visibleArea = area - hiddenArea;
            // if the visibleArea is 0 set it back to area (to calculate the percentage in a useful way)
            visibleArea = visibleArea === 0 ? area : visibleArea;
            var visiblePercent = visibleArea / area;
            return {
                placement: placement,
                weight: visiblePercent
            };
        });
        // sort the placements from best to worst
        weightedPlacements.sort(function (a, b) { return b.weight - a.weight; });
        // pick the best!
        dialogPlacement = weightedPlacements[0].placement;
        // calculate the final position
        var pos = findPosition(parentEl, el, dialogPlacement);
        // update the element
        position.setElement(el, pos);
        setTimeout(function () { _this.placement = dialogPlacement; });
    };
    /**
     * Sets up a KeyboardEvent to close `Dialog` with Escape key.
     * @param {KeyboardEvent} event
     */
    Dialog.prototype.escapeClose = function (event) {
        switch (event.key) {
            case "Esc": // IE specific value
            case "Escape": {
                event.stopImmediatePropagation();
                this.doClose();
                break;
            }
            case "Tab": {
                cycleTabs(event, this.elementRef.nativeElement);
                break;
            }
        }
    };
    /**
     * Sets up a event Listener to close `Dialog` if click event occurs outside
     * `Dialog` object.
     * @param {any} event
     * @memberof Dialog
     */
    Dialog.prototype.clickClose = function (event) {
        if (!this.elementRef.nativeElement.contains(event.target)
            && !this.dialogConfig.parentRef.nativeElement.contains(event.target)) {
            this.doClose();
        }
    };
    /**
     * Closes `Dialog` object by emitting the close event upwards to parents.
     * @memberof Dialog
     */
    Dialog.prototype.doClose = function () {
        this.close.emit();
    };
    /**
     * At destruction of component, `Dialog` unsubscribes from handling window resizing changes.
     * @memberof Dialog
     */
    Dialog.prototype.ngOnDestroy = function () {
        this.resizeSubscription.unsubscribe();
        this.scrollSubscription.unsubscribe();
    };
    /**
     * One static event observable to handle window resizing.
     * @protected
     * @static
     * @type {Observable<any>}
     * @memberof Dialog
     */
    Dialog.resizeObservable = fromEvent(window, "resize").pipe(throttleTime(100));
    Dialog.decorators = [
        { type: Component, args: [{
                    selector: "ibm-dialog",
                    template: ""
                },] },
    ];
    /** @nocollapse */
    Dialog.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    Dialog.propDecorators = {
        close: [{ type: Output }],
        dialogConfig: [{ type: Input }],
        dialog: [{ type: ViewChild, args: ["dialog",] }],
        escapeClose: [{ type: HostListener, args: ["keydown", ["$event"],] }],
        clickClose: [{ type: HostListener, args: ["document:click", ["$event"],] }]
    };
    return Dialog;
}());
export { Dialog };
//# sourceMappingURL=dialog.component.js.map