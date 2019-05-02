/*!
 *
 * carbon-angular v0.0.0 | position.js
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


/**
 * Utilites to manipulate the position of elements relative to other elements
 *
 */
function calculatePosition(referenceOffset, reference, target, placement) {
    // calculate offsets for a given position
    var referenceRect = reference.getBoundingClientRect();
    switch (placement) {
        case "left":
            return {
                top: referenceOffset.top - Math.round(target.offsetHeight / 2) + Math.round(referenceRect.height / 2),
                left: Math.round(referenceOffset.left - target.offsetWidth)
            };
        case "right":
            return {
                top: referenceOffset.top - Math.round(target.offsetHeight / 2) + Math.round(referenceRect.height / 2),
                left: Math.round(referenceOffset.left + referenceRect.width)
            };
        case "top":
            return {
                top: Math.round(referenceOffset.top - target.offsetHeight),
                left: referenceOffset.left - Math.round(target.offsetWidth / 2) + Math.round(referenceRect.width / 2)
            };
        case "bottom":
            return {
                top: Math.round(referenceOffset.top + referenceRect.height),
                left: referenceOffset.left - Math.round(target.offsetWidth / 2) + Math.round(referenceRect.width / 2)
            };
        case "left-bottom":
            return {
                // 22 == half of popover header height
                top: referenceOffset.top - 22 + Math.round(referenceRect.height / 2),
                left: Math.round(referenceOffset.left - target.offsetWidth)
            };
        case "right-bottom":
            return {
                top: referenceOffset.top - 22 + Math.round(referenceRect.height / 2),
                left: Math.round(referenceOffset.left + referenceRect.width)
            };
        // matter currently doesn't support these, so the popover is broken anyway
        case "top-left":
            return {
                top: 0,
                left: 0
            };
        case "top-right":
            return {
                top: 0,
                left: 0
            };
        case "bottom-left":
            return {
                top: referenceOffset.top + referenceRect.height,
                left: referenceOffset.left + referenceRect.width - target.offsetWidth
            };
        case "bottom-right":
            return {
                top: referenceOffset.top + referenceRect.height,
                left: referenceOffset.left
            };
    }
}
export var position;
(function (position_1) {
    function getRelativeOffset(target) {
        // start with the initial element offsets
        var offsets = {
            left: target.offsetLeft,
            top: target.offsetTop
        };
        // get each static (i.e. not absolute or relative) offsetParent and sum the left/right offsets
        while (target.offsetParent && getComputedStyle(target.offsetParent).position === "static") {
            offsets.left += target.offsetLeft;
            offsets.top += target.offsetTop;
            target = target.offsetParent;
        }
        return offsets;
    }
    position_1.getRelativeOffset = getRelativeOffset;
    function getAbsoluteOffset(target) {
        var currentNode = target;
        var margins = {
            top: 0,
            left: 0
        };
        // searches for containing elements with additional margins
        while (currentNode.offsetParent) {
            var computed = getComputedStyle(currentNode.offsetParent);
            // find static elements with additional margins
            // since they tend to throw off our positioning
            // (usually this is just the body)
            if (computed.position === "static" &&
                computed.marginLeft &&
                computed.marginTop) {
                if (parseInt(computed.marginTop, 10)) {
                    margins.top += parseInt(computed.marginTop, 10);
                }
                if (parseInt(computed.marginLeft, 10)) {
                    margins.left += parseInt(computed.marginLeft, 10);
                }
            }
            currentNode = currentNode.offsetParent;
        }
        var targetRect = target.getBoundingClientRect();
        var relativeRect = document.body.getBoundingClientRect();
        return {
            top: targetRect.top - relativeRect.top + margins.top,
            left: targetRect.left - relativeRect.left + margins.left
        };
    }
    position_1.getAbsoluteOffset = getAbsoluteOffset;
    // finds the position relative to the `reference` element
    function findRelative(reference, target, placement) {
        var referenceOffset = getRelativeOffset(reference);
        return calculatePosition(referenceOffset, reference, target, placement);
    }
    position_1.findRelative = findRelative;
    function findAbsolute(reference, target, placement) {
        var referenceOffset = getAbsoluteOffset(reference);
        return calculatePosition(referenceOffset, reference, target, placement);
    }
    position_1.findAbsolute = findAbsolute;
    function findPosition(reference, target, placement, offsetFunction) {
        if (offsetFunction === void 0) { offsetFunction = getRelativeOffset; }
        var referenceOffset = offsetFunction(reference);
        return calculatePosition(referenceOffset, reference, target, placement);
    }
    position_1.findPosition = findPosition;
    /**
     * Get the dimensions of the dialog from an AbsolutePosition and a reference element
     */
    function getPlacementBox(target, position) {
        var targetBottom = target.offsetHeight + position.top;
        var targetRight = target.offsetWidth + position.left;
        return {
            top: position.top,
            bottom: targetBottom,
            left: position.left,
            right: targetRight
        };
    }
    position_1.getPlacementBox = getPlacementBox;
    function addOffset(position, top, left) {
        if (top === void 0) { top = 0; }
        if (left === void 0) { left = 0; }
        return Object.assign({}, position, {
            top: position.top + top,
            left: position.left + left
        });
    }
    position_1.addOffset = addOffset;
    function setElement(element, position) {
        element.style.top = position.top + "px";
        element.style.left = position.left + "px";
    }
    position_1.setElement = setElement;
})(position || (position = {}));
export default position;
//# sourceMappingURL=position.js.map