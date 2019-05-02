/*!
 *
 * carbon-angular v0.0.0 | sprite.component.js
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


import { Component, Input, ElementRef } from "@angular/core";
import { Http } from "@angular/http";
import { IconService } from "./icon.service";
/**
 * Used to load sprites and is generally used at the root of the application.
 * Page specific sprites may be loaded on that page, but do note that may result in unintened network requets.
 */
var Sprite = /** @class */ (function () {
    /**
     * instantiate the component and instances of http and iconService
     *
     * @param {Http} http
     * @param {ElementRef} _elementRef
     * @param {IconService} icons
     */
    function Sprite(http, _elementRef, icons) {
        this.http = http;
        this._elementRef = _elementRef;
        this.icons = icons;
        /** name used to request sprite from the baseURL */
        this.sprite = "";
    }
    /** load the sprite and inject it into the rendered DOM */
    Sprite.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.icons.getSprite(this.sprite).subscribe(function (rawSVG) {
            _this._elementRef.nativeElement.innerHTML = rawSVG;
            // insure the DOM has settled before we tell everyone they can request icons
            // TODO: move all the sprites into in memory data structures
            setTimeout(function () {
                IconService.spriteLoaded.emit();
            });
        });
    };
    Sprite.decorators = [
        { type: Component, args: [{
                    selector: "ibm-sprite",
                    template: "",
                    styles: ["\n\t\t:host {\n\t\t\tdisplay: none;\n\t\t\theight: 0;\n\t\t\twidth: 0;\n\t\t}\n\t"],
                    providers: [IconService]
                },] },
    ];
    /** @nocollapse */
    Sprite.ctorParameters = function () { return [
        { type: Http },
        { type: ElementRef },
        { type: IconService }
    ]; };
    Sprite.propDecorators = {
        sprite: [{ type: Input }]
    };
    return Sprite;
}());
export { Sprite };
//# sourceMappingURL=sprite.component.js.map