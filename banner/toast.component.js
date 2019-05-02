/*!
 *
 * carbon-angular v0.0.0 | toast.component.js
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


var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, Input } from "@angular/core";
import { BannerService } from "./banner.service";
import { Banner } from "./banner.component";
/**
 * Deprecated in favour of `ToastNotification` (to be removed in v3.0).
 * Banner messages are displayed toward the top of the UI and do not interrupt user’s work.
 *
 * @export
 * @class Banner
 * @deprecated
 */
var Toast = /** @class */ (function (_super) {
    __extends(Toast, _super);
    function Toast() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Toast.prototype.ngOnInit = function () {
        console.warn("`ibm-toast` has been deprecated in favour of `ibm-toast-notification`");
        if (!this.bannerObj.closeLabel) {
            this.bannerObj.closeLabel = this.i18n.get().BANNER.CLOSE_BUTTON;
        }
    };
    Toast.decorators = [
        { type: Component, args: [{
                    selector: "ibm-toast",
                    template: "\n\t<div\n\t\t#banner\n\t\tclass=\"bx--toast-notification bx--toast-notification--{{bannerObj['type']}}\"\n\t\trole=\"alert\">\n\t\t<div class=\"bx--toast-notification__details\">\n\t\t\t<h3 class=\"bx--toast-notification__title\" [innerHTML]=\"bannerObj.title\"></h3>\n\t\t\t<p class=\"bx--toast-notification__subtitle\" [innerHTML]=\"bannerObj.subtitle\"></p>\n\t\t\t<p class=\"bx--toast-notification__caption\" [innerHTML]=\"bannerObj.caption\"></p>\n\t\t</div>\n\t\t<button\n\t\t\tclass=\"bx--toast-notification__close-button\"\n\t\t\ttype=\"button\"\n\t\t\t[attr.aria-label]=\"bannerObj.closeLabel\"\n\t\t\t(click)=\"onClose()\">\n\t\t\t<svg\n\t\t\t\tclass=\"bx--toast-notification-icon\"\n\t\t\t\twidth=\"10\"\n\t\t\t\theight=\"10\"\n\t\t\t\tviewBox=\"0 0 10 10\"\n\t\t\t\txmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<path d=\"M6.32 5L10 8.68 8.68 10 5 6.32 1.32 10 0 8.68 3.68 5 0 1.32 1.32 0 5 3.68 8.68 0 10 1.32 6.32 5z\" fill-rule=\"nonzero\"/>\n\t\t\t</svg>\n\t\t</button>\n\t</div>\n\t",
                    providers: [BannerService]
                },] },
    ];
    Toast.propDecorators = {
        bannerObj: [{ type: Input }]
    };
    return Toast;
}(Banner));
export { Toast };
//# sourceMappingURL=toast.component.js.map