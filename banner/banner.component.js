/*!
 *
 * carbon-angular v0.0.0 | banner.component.js
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


import { Component, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { BannerService } from "./banner.service";
import { I18n } from "./../i18n/i18n.module";
/**
 * Deprecated in favour of `InlineNotification` (to be removed in v3.0).
 * Banner messages are displayed toward the top of the UI and do not interrupt user’s work.
 *
 * @export
 * @class Banner
 * @deprecated
 */
var Banner = /** @class */ (function () {
    function Banner(bannerService, i18n) {
        this.bannerService = bannerService;
        this.i18n = i18n;
        /**
         * Emits on close.
         *
         * @type {EventEmitter<any>}
         * @memberof Banner
         */
        this.close = new EventEmitter();
        console.warn("`ibm-banner` has been deprecated in favour of `ibm-inline-notification`");
    }
    Banner.prototype.ngOnInit = function () {
        if (!this.bannerObj.closeLabel) {
            this.bannerObj.closeLabel = this.i18n.get().BANNER.CLOSE_BUTTON;
        }
    };
    /**
     * Emits close event.
     *
     * @memberof Banner
     */
    Banner.prototype.onClose = function () {
        this.close.emit();
    };
    Banner.prototype.destroy = function () {
        this.bannerService.close(this);
    };
    Banner.decorators = [
        { type: Component, args: [{
                    selector: "ibm-banner",
                    template: "\n\t<div\n\t\t#banner\n\t\tclass=\"bx--inline-notification bx--inline-notification--{{bannerObj.type}}\"\n\t\trole=\"alert\">\n\t\t<div class=\"bx--inline-notification__details\">\n\t\t\t<svg class=\"bx--inline-notification__icon\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<path d=\"M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM3.293 4.707l8 8 1.414-1.414-8-8-1.414 1.414z\" fill-rule=\"evenodd\"/>\n\t\t\t</svg>\n\t\t\t<div class=\"bx--inline-notification__text-wrapper\">\n\t\t\t\t<p [innerHTML]=\"bannerObj.title\" class=\"bx--inline-notification__title\"></p>\n\t\t\t\t<p [innerHTML]=\"bannerObj.message\" class=\"bx--inline-notification__subtitle\"></p>\n\t\t\t</div>\n\t\t</div>\n\t\t<button\n\t\t\t(click)=\"onClose()\"\n\t\t\tclass=\"bx--inline-notification__close-button\"\n\t\t\t[attr.aria-label]=\"bannerObj.closeLabel\"\n\t\t\ttype=\"button\">\n\t\t\t<svg\n\t\t\t\tclass=\"bx--inline-notification__close-icon\"\n\t\t\t\twidth=\"10\"\n\t\t\t\theight=\"10\"\n\t\t\t\tviewBox=\"0 0 10 10\"\n\t\t\t\txmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<path d=\"M6.32 5L10 8.68 8.68 10 5 6.32 1.32 10 0 8.68 3.68 5 0 1.32 1.32 0 5 3.68 8.68 0 10 1.32 6.32 5z\" fill-rule=\"nonzero\"/>\n\t\t\t</svg>\n\t\t</button>\n\t</div>\n\t",
                    providers: [BannerService]
                },] },
    ];
    /** @nocollapse */
    Banner.ctorParameters = function () { return [
        { type: BannerService },
        { type: I18n }
    ]; };
    Banner.propDecorators = {
        bannerObj: [{ type: Input }],
        close: [{ type: Output }],
        banner: [{ type: ViewChild, args: ["banner",] }]
    };
    return Banner;
}());
export { Banner };
//# sourceMappingURL=banner.component.js.map