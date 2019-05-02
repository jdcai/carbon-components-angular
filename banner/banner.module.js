/*!
 *
 * carbon-angular v0.0.0 | banner.module.js
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


import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StaticIconModule } from "./../icon/static-icon.module";
import { Toast } from "./toast.component";
import { Banner } from "./banner.component";
import { BannerService } from "./banner.service";
import { I18nModule } from "./../i18n/i18n.module";
export { BannerService } from "./banner.service";
export { Banner } from "./banner.component";
/**
 * Deprecated in favour of `NotificationModule` (to be removed in v3.0).
 *
 * @deprecated
 */
var BannerModule = /** @class */ (function () {
    function BannerModule() {
    }
    BannerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        Toast,
                        Banner
                    ],
                    exports: [
                        Banner,
                        Toast
                    ],
                    entryComponents: [Banner, Toast],
                    imports: [CommonModule, StaticIconModule, I18nModule],
                    providers: [BannerService]
                },] },
    ];
    return BannerModule;
}());
export { BannerModule };
//# sourceMappingURL=banner.module.js.map