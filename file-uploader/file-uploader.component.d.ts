/*!
 *
 * carbon-angular v0.0.0 | file-uploader.component.d.ts
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


import { EventEmitter, OnInit } from "@angular/core";
import { I18n } from "../i18n/i18n.module";
import { FileItem } from "./file-item.interface";
export declare class FileUploader implements OnInit {
    protected i18n: I18n;
    /**
     * Counter used to create unique ids for file-uploader components
     */
    static fileUploaderCount: number;
    /**
     * Accessible text for the button that opens the upload window.
     *
     * Defaults to the `FILE_UPLOADER.OPEN` value from the i18n service
     */
    buttonText: any;
    /**
     * Text set to the title
     */
    title: string;
    /**
     * Text set to the description
     */
    description: string;
    /**
     * Specify the types of files that the input should be able to receive
     */
    accept: any[];
    /**
     * Set to `false` to tell the component to only accept a single file on upload.
     *
     * Defaults to `true`. Accepts multiple files.
     */
    multiple: boolean;
    /**
     * Set to `true` for a loading file uploader.
     */
    skeleton: boolean;
    /**
     * Provides a unique id for the underlying <input> node
     */
    fileUploaderId: string;
    /**
     * Maintains a reference to the view DOM element of the underlying <input> node
     */
    fileInput: any;
    /**
     * The list of files that have been submitted to be uploaded
     */
    files: Set<FileItem>;
    filesChange: EventEmitter<any>;
    protected onTouchedCallback: () => void;
    protected onChangeCallback: (_: Set<FileItem>) => void;
    constructor(i18n: I18n);
    /**
     * Specifies the property to be used as the return value to `ngModel`
     */
    value: Set<FileItem>;
    ngOnInit(): void;
    onBlur(): void;
    /**
     * Propagates the injected `value`.
     */
    writeValue(value: Set<FileItem>): void;
    onFilesAdded(): void;
    removeFile(fileItem: any): void;
    /**
     * Registers the injected function to control the touch use of the `FileUploader`.
     */
    registerOnTouched(fn: any): void;
    /**
     * Sets a method in order to propagate changes back to the form.
     */
    registerOnChange(fn: any): void;
}
