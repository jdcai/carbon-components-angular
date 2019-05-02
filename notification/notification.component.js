/*!
 *
 * carbon-angular v0.0.0 | notification.component.js
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


import { Component, Input, Output, EventEmitter, ViewChild, HostBinding } from "@angular/core";
import { I18n } from "./../i18n/i18n.module";
import { NotificationDisplayService } from "./notification-display.service";
import { of } from "rxjs";
/**
 * Notification messages are displayed toward the top of the UI and do not interrupt user’s work.
 */
var Notification = /** @class */ (function () {
    function Notification(notificationDisplayService, i18n) {
        this.notificationDisplayService = notificationDisplayService;
        this.i18n = i18n;
        /**
         * Emits on close.
         */
        this.close = new EventEmitter();
        this.notificationID = "notification";
        this.notificationClass = true;
        this.role = "alert";
        this.defaultNotificationObj = {
            title: "",
            message: "",
            type: "info",
            closeLabel: this.i18n.get("NOTIFICATION.CLOSE_BUTTON")
        };
        this._notificationObj = Object.assign({}, this.defaultNotificationObj);
    }
    Object.defineProperty(Notification.prototype, "notificationObj", {
        /**
         * Can have `type`, `title`, and `message` members.
         *
         * `type` can be one of `"info"`, `"warning"`, `"error"`, `"success"`
         *
         * `message` is the message to display
         */
        get: function () {
            return this._notificationObj;
        },
        set: function (obj) {
            if (obj.closeLabel) {
                obj.closeLabel = of(obj.closeLabel);
            }
            this._notificationObj = Object.assign({}, this.defaultNotificationObj, obj);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Notification.prototype, "isError", {
        get: function () { return this.notificationObj.type === "error"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Notification.prototype, "isInfo", {
        get: function () { return this.notificationObj.type === "info"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Notification.prototype, "isSuccess", {
        get: function () { return this.notificationObj.type === "success"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Notification.prototype, "isWarning", {
        get: function () { return this.notificationObj.type === "warning"; },
        enumerable: true,
        configurable: true
    });
    /**
     * Emits close event.
     */
    Notification.prototype.onClose = function () {
        this.close.emit();
    };
    Notification.prototype.destroy = function () {
        this.notificationDisplayService.close(this);
    };
    Notification.decorators = [
        { type: Component, args: [{
                    selector: "ibm-notification",
                    template: "\n\t\t<div class=\"bx--inline-notification__details\">\n\t\t\t<svg *ngIf=\"notificationObj.type === 'error'\" class=\"bx--inline-notification__icon\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"\n\t\t\t\txmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<path d=\"M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM3.293 4.707l8 8 1.414-1.414-8-8-1.414 1.414z\" fill-rule=\"evenodd\"/>\n\t\t\t</svg>\n\t\t\t<svg *ngIf=\"notificationObj.type === 'info'\" class=\"bx--inline-notification__icon\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"\n\t\t\t\txmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<path d=\"M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm1-3V7H7v6h2zM8 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z\"></path>\n\t\t\t</svg>\n\t\t\t<svg *ngIf=\"notificationObj.type === 'success'\" class=\"bx--inline-notification__icon\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"\n\t\t\t\txmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<path d=\"M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm3.293-11.332L6.75 9.21 4.707 7.168 3.293 8.582 6.75 12.04l5.957-5.957-1.414-1.414z\"></path>\n\t\t\t</svg>\n\t\t\t<svg *ngIf=\"notificationObj.type === 'warning'\" class=\"bx--inline-notification__icon\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"\n\t\t\t\txmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<path d=\"M.75 16a.75.75 0 0 1-.67-1.085L7.33.415a.75.75 0 0 1 1.34 0l7.25 14.5A.75.75 0 0 1 15.25 16H.75zm6.5-10v5h1.5V6h-1.5zM8\n\t\t\t\t\t13.5A.75.75 0 1 0 8 12a.75.75 0 0 0 0 1.5z\"></path>\n\t\t\t</svg>\n\t\t\t<div class=\"bx--inline-notification__text-wrapper\">\n\t\t\t\t<p [innerHTML]=\"notificationObj.title\" class=\"bx--inline-notification__title\"></p>\n\t\t\t\t<p [innerHTML]=\"notificationObj.message\" class=\"bx--inline-notification__subtitle\"></p>\n\t\t\t</div>\n\t\t</div>\n\t\t<button\n\t\t\t(click)=\"onClose()\"\n\t\t\tclass=\"bx--inline-notification__close-button\"\n\t\t\t[attr.aria-label]=\"notificationObj.closeLabel | async\"\n\t\t\ttype=\"button\">\n\t\t\t<svg\n\t\t\t\tclass=\"bx--inline-notification__close-icon\"\n\t\t\t\twidth=\"10\"\n\t\t\t\theight=\"10\"\n\t\t\t\tviewBox=\"0 0 10 10\"\n\t\t\t\txmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<path d=\"M6.32 5L10 8.68 8.68 10 5 6.32 1.32 10 0 8.68 3.68 5 0 1.32 1.32 0 5 3.68 8.68 0 10 1.32 6.32 5z\" fill-rule=\"nonzero\"/>\n\t\t\t</svg>\n\t\t</button>\n\t"
                },] },
    ];
    /** @nocollapse */
    Notification.ctorParameters = function () { return [
        { type: NotificationDisplayService },
        { type: I18n }
    ]; };
    Notification.propDecorators = {
        notificationObj: [{ type: Input }],
        close: [{ type: Output }],
        notification: [{ type: ViewChild, args: ["notification",] }],
        notificationID: [{ type: HostBinding, args: ["attr.id",] }],
        notificationClass: [{ type: HostBinding, args: ["class.bx--inline-notification",] }],
        role: [{ type: HostBinding, args: ["attr.role",] }],
        isError: [{ type: HostBinding, args: ["class.bx--inline-notification--error",] }],
        isInfo: [{ type: HostBinding, args: ["class.bx--inline-notification--info",] }],
        isSuccess: [{ type: HostBinding, args: ["class.bx--inline-notification--success",] }],
        isWarning: [{ type: HostBinding, args: ["class.bx--inline-notification--warning",] }]
    };
    return Notification;
}());
export { Notification };
//# sourceMappingURL=notification.component.js.map