/*!
 *
 * carbon-angular v0.0.0 | slider.component.js
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


import { Component, HostBinding, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { fromEvent } from "rxjs";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
/**
 * Used to select from ranges of values. [See here](https://www.carbondesignsystem.com/components/slider/usage) for usage information.
 *
 * The simplest possible slider usage looks something like:
 * ```html
 * <ibm-slider></ibm-slider>
 * ```
 *
 * That will render a slider without labels or alternative value input. Labels can be provided by
 * elements with `[minLabel]` and `[maxLabel]` attributes, and an `input` (may use the `ibmInput` directive) can be supplied
 * for use as an alternative value field.
 *
 * ex:
 * ```html
 * <!-- full example -->
 * <ibm-slider>
 *		<span minLabel>0GB</span>
 *		<span maxLabel>100GB</span>
 *		<input/>
 *	</ibm-slider>
 * <!-- with just an input -->
 * <ibm-slider>
 *		<input/>
 *	</ibm-slider>
 * <!-- with just one label -->
 * <ibm-slider>
 *		<span maxLabel>Maximum</span>
 *	</ibm-slider>
 * ```
 *
 * Slider supports `NgModel` by default, as well as two way binding to the `value` input.
 */
var Slider = /** @class */ (function () {
    function Slider(elementRef) {
        this.elementRef = elementRef;
        /** The lower bound of our range */
        this.min = 0;
        /** The upper bound of our range */
        this.max = 100;
        /** The interval for our range */
        this.step = 1;
        /** Base ID for the slider. The min and max labels get IDs `${this.id}-bottom-range` and `${this.id}-top-range` respectively */
        this.id = "slider-" + Slider.count++;
        /** Value used to "multiply" the `step` when using arrow keys to select values */
        this.shiftMultiplier = 4;
        /** Set to `true` for a loading slider */
        this.skeleton = false;
        /** Set to `true` for a slider without arrow key interactions. */
        this.disableArrowKeys = false;
        /** Emits every time a new value is selected */
        this.valueChange = new EventEmitter();
        this.hostClass = true;
        this.bottomRangeId = this.id + "-bottom-range";
        this.topRangeId = this.id + "-top-range";
        this.isMouseDown = false;
        /** Array of event subscriptions so we can batch unsubscribe in `ngOnDestroy` */
        this.eventSubscriptions = [];
        this.slidAmount = 0;
        this._value = 0;
        this._disabled = false;
        /** Send changes back to the model */
        this.propagateChange = function (_) { };
        /** Callback to notify the model when our input has been touched */
        this.onTouched = function () { };
    }
    Object.defineProperty(Slider.prototype, "value", {
        get: function () {
            return this._value;
        },
        /** Set the initial value. Available for two way binding */
        set: function (v) {
            if (v > this.max) {
                v = this.max;
            }
            if (v < this.min) {
                v = this.min;
            }
            this._value = v;
            this.slidAmount = this.convertToPx(v);
            if (this.input) {
                this.input.value = v.toString();
            }
            this.propagateChange(v);
            this.valueChange.emit(v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slider.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        /** Disables the range visually and functionally */
        set: function (v) {
            this._disabled = v;
            // for some reason `this.input` never exists here, so we have to query for it here too
            var input = this.elementRef.nativeElement.querySelector("input:not([type=range])");
            if (input) {
                input.disabled = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Slider.prototype.ngAfterViewInit = function () {
        // bind mousemove and mouseup to the document so we don't have issues tracking the mouse
        this.eventSubscriptions.push(fromEvent(document, "mousemove").subscribe(this.onMouseMove.bind(this)));
        this.eventSubscriptions.push(fromEvent(document, "mouseup").subscribe(this.onMouseUp.bind(this)));
        // ODO: ontouchstart/ontouchmove/ontouchend
        // set up the optional input
        this.input = this.elementRef.nativeElement.querySelector("input:not([type=range])");
        if (this.input) {
            this.input.type = "number";
            this.input.classList.add("bx--slider-text-input");
            this.input.classList.add("bx--text-input");
            this.input.setAttribute("aria-labelledby", this.bottomRangeId + " " + this.topRangeId);
            this.input.value = this.value.toString();
            // bind events on our optional input
            this.eventSubscriptions.push(fromEvent(this.input, "change").subscribe(this.onChange.bind(this)));
            this.eventSubscriptions.push(fromEvent(this.input, "focus").subscribe(this.onFocus.bind(this)));
        }
    };
    /** Clean up our DOMEvent subscriptions */
    Slider.prototype.ngOnDestroy = function () {
        this.eventSubscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    /** Register a change propagation function for `ControlValueAccessor` */
    Slider.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    /** Register a callback to notify when our input has been touched */
    Slider.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /** Receives a value from the model */
    Slider.prototype.writeValue = function (v) {
        this.value = v;
    };
    /** Returns the amount of "completeness" as a fraction of the total track width */
    Slider.prototype.getFractionComplete = function () {
        if (!this.track) {
            return 0;
        }
        var trackWidth = this.track.nativeElement.getBoundingClientRect().width;
        return this.slidAmount / trackWidth;
    };
    /** Helper function to return the CSS transform `scaleX` function */
    Slider.prototype.scaleX = function (complete) {
        return "scaleX(" + complete + ")";
    };
    /** Converts a given px value to a "real" value in our range */
    Slider.prototype.convertToValue = function (pxAmount) {
        // basic concept borrowed from carbon-components
        // ref: https://github.com/IBM/carbon-components/blob/43bf3abdc2f8bdaa38aa84e0f733adde1e1e8894/src/components/slider/slider.js#L147-L151
        var range = this.max - this.min;
        var trackWidth = this.track.nativeElement.getBoundingClientRect().width;
        var unrounded = pxAmount / trackWidth;
        var rounded = Math.round((range * unrounded) / this.step) * this.step;
        return rounded + this.min;
    };
    /** Converts a given "real" value to a px value we can update the view with */
    Slider.prototype.convertToPx = function (value) {
        if (!this.track) {
            return 0;
        }
        var trackWidth = this.track.nativeElement.getBoundingClientRect().width;
        if (value >= this.max) {
            return trackWidth;
        }
        if (value <= this.min) {
            return 0;
        }
        return Math.round(trackWidth * (value / this.max));
    };
    /**
     * Increments the value by the step value, or the step value multiplied by the `multiplier` argument.
     *
     * @argument multiplier Defaults to `1`, multiplied with the step value.
     */
    Slider.prototype.incrementValue = function (multiplier) {
        if (multiplier === void 0) { multiplier = 1; }
        this.value = this.value + (this.step * multiplier);
    };
    /**
     * Decrements the value by the step value, or the step value multiplied by the `multiplier` argument.
     *
     * @argument multiplier Defaults to `1`, multiplied with the step value.
     */
    Slider.prototype.decrementValue = function (multiplier) {
        if (multiplier === void 0) { multiplier = 1; }
        this.value = this.value - (this.step * multiplier);
    };
    /** Change handler for the optional input */
    Slider.prototype.onChange = function (event) {
        this.value = event.target.value;
    };
    /** Handles clicks on the range track, and setting the value to it's "real" equivalent */
    Slider.prototype.onClick = function (event) {
        if (this.disabled) {
            return;
        }
        var trackLeft = this.track.nativeElement.getBoundingClientRect().left;
        this.value = this.convertToValue(event.clientX - trackLeft);
    };
    /** Focus handler for the optional input */
    Slider.prototype.onFocus = function (_a) {
        var target = _a.target;
        target.select();
    };
    /** Mouse move handler. Responsible for updating the value and visual selection based on mouse movement */
    Slider.prototype.onMouseMove = function (event) {
        if (this.disabled || !this.isMouseDown) {
            return;
        }
        var track = this.track.nativeElement.getBoundingClientRect();
        if (event.clientX - track.left <= track.width
            && event.clientX - track.left >= 0) {
            this.slidAmount = event.clientX - track.left;
        }
        this.value = this.convertToValue(this.slidAmount);
    };
    /** Enables the `onMouseMove` handler */
    Slider.prototype.onMouseDown = function (event) {
        event.preventDefault();
        if (this.disabled) {
            return;
        }
        this.thumb.nativeElement.focus();
        this.isMouseDown = true;
    };
    /** Disables the `onMouseMove` handler */
    Slider.prototype.onMouseUp = function () {
        this.isMouseDown = false;
    };
    /** Calls `incrementValue` for ArrowRight and ArrowUp, `decrementValue` for ArrowLeft and ArrowDown */
    Slider.prototype.onKeyDown = function (event) {
        if (this.disableArrowKeys) {
            return;
        }
        event.preventDefault();
        var multiplier = event.shiftKey ? this.shiftMultiplier : 1;
        if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
            this.decrementValue(multiplier);
        }
        if (event.key === "ArrowRight" || event.key === "ArrowUp") {
            this.incrementValue(multiplier);
        }
    };
    /** Used to generate unique IDs */
    Slider.count = 0;
    Slider.decorators = [
        { type: Component, args: [{
                    selector: "ibm-slider",
                    template: "\n\t\t<ng-container *ngIf=\"!skeleton; else skeletonTemplate\">\n\t\t\t<div\n\t\t\t\tclass=\"bx--slider\"\n\t\t\t\t[ngClass]=\"{'bx--slider--disabled': disabled}\">\n\t\t\t\t<div\n\t\t\t\t\t#thumb\n\t\t\t\t\tclass=\"bx--slider__thumb\"\n\t\t\t\t\ttabindex=\"0\"\n\t\t\t\t\t[ngStyle]=\"{'left.%': getFractionComplete() * 100}\"\n\t\t\t\t\t(mousedown)=\"onMouseDown($event)\"\n\t\t\t\t\t(keydown)=\"onKeyDown($event)\">\n\t\t\t\t</div>\n\t\t\t\t<div\n\t\t\t\t\t#track\n\t\t\t\t\tclass=\"bx--slider__track\"\n\t\t\t\t\t(click)=\"onClick($event)\">\n\t\t\t\t</div>\n\t\t\t\t<div\n\t\t\t\t\tclass=\"bx--slider__filled-track\"\n\t\t\t\t\t[ngStyle]=\"{transform: 'translate(0%, -50%)' + scaleX(getFractionComplete())}\">\n\t\t\t\t</div>\n\t\t\t\t<input\n\t\t\t\t\t#range\n\t\t\t\t\taria-label=\"slider\"\n\t\t\t\t\tclass=\"bx--slider__input\"\n\t\t\t\t\ttype=\"range\"\n\t\t\t\t\t[step]=\"step\"\n\t\t\t\t\t[min]=\"min\"\n\t\t\t\t\t[max]=\"max\"\n\t\t\t\t\t[value]=\"value\">\n\t\t\t</div>\n\t\t\t<label [id]=\"bottomRangeId\" class=\"bx--slider__range-label\">\n\t\t\t\t<ng-content select=\"[minLabel]\"></ng-content>\n\t\t\t</label>\n\t\t\t<label [id]=\"topRangeId\" class=\"bx--slider__range-label\">\n\t\t\t\t<ng-content select=\"[maxLabel]\"></ng-content>\n\t\t\t</label>\n\t\t\t<ng-content select=\"input\"></ng-content>\n\t\t</ng-container>\n\n\t\t<ng-template #skeletonTemplate>\n\t\t\t<div class=\"bx--form-item\">\n\t\t\t\t<label class=\"bx--label bx--skeleton\"></label>\n\t\t\t\t<div class=\"bx--slider-container bx--skeleton\">\n\t\t\t\t\t<span class=\"bx--slider__range-label\"></span>\n\t\t\t\t\t<div class=\"bx--slider\">\n\t\t\t\t\t\t<div class=\"bx--slider__thumb\"></div>\n\t\t\t\t\t\t<div class=\"bx--slider__track\"></div>\n\t\t\t\t\t\t<div class=\"bx--slider__filled-track\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<span class=\"bx--slider__range-label\"></span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</ng-template>\n\t",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: Slider,
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    Slider.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    Slider.propDecorators = {
        min: [{ type: Input }],
        max: [{ type: Input }],
        step: [{ type: Input }],
        value: [{ type: Input }],
        id: [{ type: Input }],
        shiftMultiplier: [{ type: Input }],
        skeleton: [{ type: Input }],
        disableArrowKeys: [{ type: Input }],
        disabled: [{ type: Input }],
        valueChange: [{ type: Output }],
        hostClass: [{ type: HostBinding, args: ["class.bx--slider-container",] }],
        thumb: [{ type: ViewChild, args: ["thumb",] }],
        track: [{ type: ViewChild, args: ["track",] }],
        range: [{ type: ViewChild, args: ["range",] }]
    };
    return Slider;
}());
export { Slider };
//# sourceMappingURL=slider.component.js.map