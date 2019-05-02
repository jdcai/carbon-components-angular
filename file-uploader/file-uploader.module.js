/*!
 *
 * carbon-angular v0.0.0 | file-uploader.module.js
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
import { FileUploader } from "./file-uploader.component";
import { File } from "./file.component";
import { ButtonModule } from "../button/button.module";
import { LoadingModule } from "../loading/loading.module";
export { FileUploader } from "./file-uploader.component";
var FileUploaderModule = /** @class */ (function () {
    function FileUploaderModule() {
    }
    FileUploaderModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [FileUploader, File],
                    exports: [FileUploader],
                    imports: [CommonModule, ButtonModule, LoadingModule]
                },] },
    ];
    return FileUploaderModule;
}());
export { FileUploaderModule };
//# sourceMappingURL=file-uploader.module.js.map