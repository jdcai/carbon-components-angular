/*!
 *
 * carbon-angular v0.0.0 | banner.component.d.ts
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


import { EventEmitter, ComponentRef, OnInit } from "@angular/core";
import { BannerService } from "./banner.service";
import { NotificationContent } from "./banner-content.interface";
import { I18n } from "./../i18n/i18n.module";
/**
 * Deprecated in favour of `InlineNotification` (to be removed in v3.0).
 * Banner messages are displayed toward the top of the UI and do not interrupt user’s work.
 *
 * @export
 * @class Banner
 * @deprecated
 */
export declare class Banner implements OnInit {
    protected bannerService: BannerService;
    protected i18n: I18n;
    /**
     * Can have `type`, `title`, and `message` members.
     *
     * `type` can be one of `"info"`, `"warning"`, `"danger"`, `"success"`
     *
     * `message` is message for banner to display
     *
     */
    bannerObj: NotificationContent;
    /**
     * Emits on close.
     *
     * @type {EventEmitter<any>}
     * @memberof Banner
     */
    close: EventEmitter<any>;
    componentRef: ComponentRef<Banner>;
    banner: any;
    constructor(bannerService: BannerService, i18n: I18n);
    ngOnInit(): void;
    /**
     * Emits close event.
     *
     * @memberof Banner
     */
    onClose(): void;
    destroy(): void;
}
