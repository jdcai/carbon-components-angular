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
import { Component, Input, HostBinding } from "@angular/core";
import { Notification } from "./notification.component";
import { ExperimentalService } from "./../experimental.module";
import { NotificationDisplayService } from "./notification-display.service";
import { I18n } from "./../i18n/i18n.module";
/**
 * Toast messages are displayed toward the top of the UI and do not interrupt user’s work.
 */
var Toast = /** @class */ (function (_super) {
    __extends(Toast, _super);
    function Toast(notificationDisplayService, i18n, experimental) {
        var _this = _super.call(this, notificationDisplayService, i18n) || this;
        _this.notificationDisplayService = notificationDisplayService;
        _this.i18n = i18n;
        _this.experimental = experimental;
        _this.toastID = "notification";
        _this.toastClass = true;
        _this.role = "alert";
        return _this;
    }
    Object.defineProperty(Toast.prototype, "isError", {
        get: function () { return this.notificationObj["type"] === "error"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Toast.prototype, "isInfo", {
        get: function () { return this.notificationObj["type"] === "info"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Toast.prototype, "isSuccess", {
        get: function () { return this.notificationObj["type"] === "success"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Toast.prototype, "isWarning", {
        get: function () { return this.notificationObj["type"] === "warning"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Toast.prototype, "isExperimental", {
        get: function () {
            return this.experimental.isExperimental;
        },
        enumerable: true,
        configurable: true
    });
    Toast.prototype.ngOnInit = function () {
        if (!this.notificationObj.closeLabel) {
            this.notificationObj.closeLabel = this.i18n.get().NOTIFICATION.CLOSE_BUTTON;
        }
    };
    Toast.decorators = [
        { type: Component, args: [{
                    selector: "ibm-toast",
                    template: "\n\t\t<!-- todo: gate icons behind experimental toggle -->\n\t\t<ng-container *ngIf=\"isExperimental\">\n\t\t\t<svg *ngIf=\"notificationObj.type === 'error'\" class=\"bx--inline-notification__icon\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"\n\t\t\t\txmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<path d=\"M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM3.293 4.707l8 8 1.414-1.414-8-8-1.414 1.414z\" fill-rule=\"evenodd\"/>\n\t\t\t</svg>\n\t\t\t<svg *ngIf=\"notificationObj.type === 'success'\" class=\"bx--inline-notification__icon\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"\n\t\t\t\txmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<path d=\"M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm3.293-11.332L6.75 9.21 4.707 7.168 3.293 8.582 6.75 12.04l5.957-5.957-1.414-1.414z\"></path>\n\t\t\t</svg>\n\t\t\t<svg *ngIf=\"notificationObj.type === 'warning'\" class=\"bx--inline-notification__icon\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"\n\t\t\t\txmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<path d=\"M.75 16a.75.75 0 0 1-.67-1.085L7.33.415a.75.75 0 0 1 1.34 0l7.25 14.5A.75.75 0 0 1 15.25 16H.75zm6.5-10v5h1.5V6h-1.5zM8\n\t\t\t\t\t13.5A.75.75 0 1 0 8 12a.75.75 0 0 0 0 1.5z\"></path>\n\t\t\t</svg>\n\t\t</ng-container>\n\t\t<div class=\"bx--toast-notification__details\">\n\t\t\t<h3 class=\"bx--toast-notification__title\" [innerHTML]=\"notificationObj.title\"></h3>\n\t\t\t<p class=\"bx--toast-notification__subtitle\" [innerHTML]=\"notificationObj.subtitle\"></p>\n\t\t\t<p class=\"bx--toast-notification__caption\" [innerHTML]=\"notificationObj.caption\"></p>\n\t\t</div>\n\t\t<button\n\t\t\tclass=\"bx--toast-notification__close-button\"\n\t\t\ttype=\"button\"\n\t\t\t[attr.aria-label]=\"notificationObj.closeLabel\"\n\t\t\t(click)=\"onClose()\">\n\t\t\t<svg\n\t\t\t\tclass=\"bx--toast-notification-icon\"\n\t\t\t\twidth=\"10\"\n\t\t\t\theight=\"10\"\n\t\t\t\tviewBox=\"0 0 10 10\"\n\t\t\t\txmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<path d=\"M6.32 5L10 8.68 8.68 10 5 6.32 1.32 10 0 8.68 3.68 5 0 1.32 1.32 0 5 3.68 8.68 0 10 1.32 6.32 5z\" fill-rule=\"nonzero\"/>\n\t\t\t</svg>\n\t\t</button>\n\t"
                },] },
    ];
    /** @nocollapse */
    Toast.ctorParameters = function () { return [
        { type: NotificationDisplayService },
        { type: I18n },
        { type: ExperimentalService }
    ]; };
    Toast.propDecorators = {
        notificationObj: [{ type: Input }],
        toastID: [{ type: HostBinding, args: ["attr.id",] }],
        toastClass: [{ type: HostBinding, args: ["class.bx--toast-notification",] }],
        role: [{ type: HostBinding, args: ["attr.role",] }],
        isError: [{ type: HostBinding, args: ["class.bx--toast-notification--error",] }],
        isInfo: [{ type: HostBinding, args: ["class.bx--toast-notification--info",] }],
        isSuccess: [{ type: HostBinding, args: ["class.bx--toast-notification--success",] }],
        isWarning: [{ type: HostBinding, args: ["class.bx--toast-notification--warning",] }]
    };
    return Toast;
}(Notification));
export { Toast };
//# sourceMappingURL=toast.component.js.map