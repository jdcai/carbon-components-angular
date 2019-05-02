/*!
 *
 * carbon-angular v0.0.0 | icon.module.js
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
import { HttpClientModule } from "@angular/common/http";
import { StaticIconModule } from "./static-icon.module";
export { StaticIconModule } from "./static-icon.module";
import { Icon } from "./icon.component";
import { Sprite } from "./sprite.component";
export { Icon } from "./icon.component";
export { IconService } from "./icon.service";
export { Sprite } from "./sprite.component";
var IconModule = /** @class */ (function () {
    function IconModule() {
    }
    IconModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        Icon,
                        Sprite
                    ],
                    exports: [
                        Icon,
                        Sprite
                    ],
                    imports: [HttpClientModule, CommonModule, StaticIconModule]
                },] },
    ];
    return IconModule;
}());
export { IconModule };
//# sourceMappingURL=icon.module.js.map