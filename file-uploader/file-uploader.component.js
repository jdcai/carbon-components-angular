/*!
 *
 * carbon-angular v0.0.0 | file-uploader.component.js
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


import { Component, Input, Output, ViewChild, EventEmitter } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { I18n } from "../i18n/i18n.module";
var noop = function () { };
var ɵ0 = noop;
var FileUploader = /** @class */ (function () {
    function FileUploader(i18n) {
        this.i18n = i18n;
        /**
         * Accessible text for the button that opens the upload window.
         *
         * Defaults to the `FILE_UPLOADER.OPEN` value from the i18n service
         */
        this.buttonText = this.i18n.get().FILE_UPLOADER.OPEN;
        /**
         * Specify the types of files that the input should be able to receive
         */
        this.accept = [];
        /**
         * Set to `false` to tell the component to only accept a single file on upload.
         *
         * Defaults to `true`. Accepts multiple files.
         */
        this.multiple = true;
        /**
         * Set to `true` for a loading file uploader.
         */
        this.skeleton = false;
        /**
         * Provides a unique id for the underlying <input> node
         */
        this.fileUploaderId = "file-uploader-" + FileUploader.fileUploaderCount;
        this.filesChange = new EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        FileUploader.fileUploaderCount++;
    }
    Object.defineProperty(FileUploader.prototype, "value", {
        /**
         * Specifies the property to be used as the return value to `ngModel`
         */
        get: function () {
            return this.files;
        },
        set: function (v) {
            if (v !== this.files) {
                this.files = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    FileUploader.prototype.ngOnInit = function () {
        // overrides the undefined files value set by the user
        if (!this.files) {
            this.files = new Set();
            this.filesChange.emit(this.files);
        }
    };
    FileUploader.prototype.onBlur = function () {
        this.onTouchedCallback();
    };
    /**
     * Propagates the injected `value`.
     */
    FileUploader.prototype.writeValue = function (value) {
        if (value !== this.value) {
            this.files = value;
        }
    };
    FileUploader.prototype.onFilesAdded = function () {
        var files = this.fileInput.nativeElement.files;
        if (!this.multiple) {
            this.files.clear();
        }
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            var fileItem = {
                uploaded: false,
                state: "edit",
                file: file
            };
            this.files.add(fileItem);
            this.filesChange.emit(this.files);
        }
        this.value = this.files;
    };
    FileUploader.prototype.removeFile = function (fileItem) {
        this.files.delete(fileItem);
        this.fileInput.nativeElement.value = "";
        this.filesChange.emit(this.files);
    };
    /**
     * Registers the injected function to control the touch use of the `FileUploader`.
     */
    FileUploader.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * Sets a method in order to propagate changes back to the form.
     */
    FileUploader.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * Counter used to create unique ids for file-uploader components
     */
    FileUploader.fileUploaderCount = 0;
    FileUploader.decorators = [
        { type: Component, args: [{
                    selector: "ibm-file-uploader",
                    template: "\n\t\t<ng-container *ngIf=\"!skeleton; else skeletonTemplate\">\n\t\t\t<strong class=\"bx--label\">{{title}}</strong>\n\t\t\t<p class=\"bx--label-description\">{{description}}</p>\n\t\t\t<div class=\"bx--file\">\n\t\t\t\t<button\n\t\t\t\t\tibmButton=\"secondary\"\n\t\t\t\t\t(click)=\"fileInput.click()\"\n\t\t\t\t\t[attr.for]=\"fileUploaderId\">\n\t\t\t\t\t{{buttonText}}\n\t\t\t\t</button>\n\t\t\t\t<input\n\t\t\t\t\t#fileInput\n\t\t\t\t\ttype=\"file\"\n\t\t\t\t\tclass=\"bx--file-input\"\n\t\t\t\t\t[accept]=\"accept\"\n\t\t\t\t\t[id]=\"fileUploaderId\"\n\t\t\t\t\t[multiple]=\"multiple\"\n\t\t\t\t\t(change)=\"onFilesAdded()\"/>\n\t\t\t\t<div class=\"bx--file-container\">\n\t\t\t\t\t<ibm-file *ngFor=\"let fileItem of files\" [fileItem]=\"fileItem\" (remove)=\"removeFile(fileItem)\"></ibm-file>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</ng-container>\n\n\t\t<ng-template #skeletonTemplate>\n\t\t\t<div class=\"bx--skeleton__text\" style=\"width: 100px\"></div>\n\t\t\t<div class=\"bx--skeleton__text\" style=\"width: 225px\"></div>\n\t\t\t<button ibmButton skeleton=\"true\"></button>\n\t\t</ng-template>\n\t",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: FileUploader,
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    FileUploader.ctorParameters = function () { return [
        { type: I18n }
    ]; };
    FileUploader.propDecorators = {
        buttonText: [{ type: Input }],
        title: [{ type: Input }],
        description: [{ type: Input }],
        accept: [{ type: Input }],
        multiple: [{ type: Input }],
        skeleton: [{ type: Input }],
        fileUploaderId: [{ type: Input }],
        fileInput: [{ type: ViewChild, args: ["fileInput",] }],
        files: [{ type: Input }],
        filesChange: [{ type: Output }]
    };
    return FileUploader;
}());
export { FileUploader };
export { ɵ0 };
//# sourceMappingURL=file-uploader.component.js.map