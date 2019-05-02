/*!
 *
 * carbon-angular v0.0.0 | dropdown.service.js
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
import { PlaceholderService } from "./../placeholder/placeholder.module";
import { fromEvent } from "rxjs";
import { throttleTime } from "rxjs/operators";
import position from "./../utils/position";
var defaultOffset = { top: 0, left: 0 };
var DropdownService = /** @class */ (function () {
    function DropdownService(placeholderService) {
        this.placeholderService = placeholderService;
        this._offset = defaultOffset;
    }
    Object.defineProperty(DropdownService.prototype, "offset", {
        get: function () {
            return this._offset;
        },
        set: function (value) {
            this._offset = Object.assign({}, defaultOffset, value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Appends the menu to the body, or a `ibm-placeholder` (if defined)
     *
     * @param parentRef container to position relative to
     * @param menuRef menu to be appended to body
     * @param classList any extra classes we should wrap the container with
     */
    DropdownService.prototype.appendToBody = function (parentRef, menuRef, classList) {
        var _this = this;
        // build the dropdown list container
        menuRef.style.display = "block";
        var dropdownWrapper = document.createElement("div");
        dropdownWrapper.className = "dropdown " + classList;
        dropdownWrapper.style.width = parentRef.offsetWidth + "px";
        dropdownWrapper.style.position = "absolute";
        dropdownWrapper.appendChild(menuRef);
        // append it to the placeholder
        if (this.placeholderService.hasPlaceholderRef()) {
            this.placeholderService.appendElement(dropdownWrapper);
            // or append it directly to the body
        }
        else {
            document.body.appendChild(dropdownWrapper);
        }
        this.menuInstance = dropdownWrapper;
        this.positionDropdown(parentRef, dropdownWrapper);
        this.resize = fromEvent(window, "resize")
            .pipe(throttleTime(100))
            .subscribe(function () { return _this.positionDropdown(parentRef, dropdownWrapper); });
        return dropdownWrapper;
    };
    /**
     * Reattach the dropdown menu to the parent container
     * @param hostRef container to append to
     */
    DropdownService.prototype.appendToDropdown = function (hostRef) {
        // if the instance is already removed don't try and remove it again
        if (!this.menuInstance) {
            return;
        }
        var instance = this.menuInstance;
        var menu = instance.firstElementChild;
        // clean up the instance
        this.menuInstance = null;
        menu.style.display = "none";
        hostRef.appendChild(menu);
        this.resize.unsubscribe();
        if (this.placeholderService.hasPlaceholderRef() && this.placeholderService.hasElement(instance)) {
            this.placeholderService.removeElement(instance);
        }
        else if (document.body.contains(instance)) {
            document.body.removeChild(instance);
        }
        return instance;
    };
    /**
     * position an open dropdown relative to the given parentRef
     */
    DropdownService.prototype.updatePosition = function (parentRef) {
        this.positionDropdown(parentRef, this.menuInstance);
    };
    DropdownService.prototype.positionDropdown = function (parentRef, menuRef) {
        var pos = position.findAbsolute(parentRef, menuRef, "bottom");
        pos = position.addOffset(pos, this.offset.top, this.offset.left);
        position.setElement(menuRef, pos);
    };
    DropdownService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DropdownService.ctorParameters = function () { return [
        { type: PlaceholderService }
    ]; };
    return DropdownService;
}());
export { DropdownService };
//# sourceMappingURL=dropdown.service.js.map