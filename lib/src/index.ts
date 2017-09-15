import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HttpModule, JsonpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import "hammerjs";
import "iscroll";

import {
	MdAutocompleteModule,
	MdButtonModule,
	MdButtonToggleModule,
	MdCardModule,
	MdChipsModule,
	MdCheckboxModule,
	MdDatepickerModule,
	MdTableModule,
	MdDialogModule,
	MdExpansionModule,
	MdFormFieldModule,
	MdGridListModule,
	MdIconModule,
	MdInputModule,
	MdListModule,
	MdMenuModule,
	MdPaginatorModule,
	MdProgressBarModule,
	MdProgressSpinnerModule,
	MdRadioModule,
	MdRippleModule,
	MdSelectModule,
	MdSidenavModule,
	MdSliderModule,
	MdSlideToggleModule,
	MdSnackBarModule,
	MdSortModule,
	MdTabsModule,
	MdToolbarModule,
	MdTooltipModule,
	MdPseudoCheckboxModule,
	MdNativeDateModule,	
	StyleModule,
	MdCommonModule
	
} from "@angular/material";

export { OverlayModule } from '@angular/cdk/overlay';
export { A11yModule } from '@angular/cdk/a11y';
export { BidiModule } from '@angular/cdk/bidi';
export { ObserversModule } from '@angular/cdk/observers';
export { PortalModule } from '@angular/cdk/portal';
export { PlatformModule } from '@angular/material';


import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxChartsModule } from "@swimlane/ngx-charts";

/**
 * DIALOGS
 */
import { PearsonDialogModule } from "./dialog/dialog.module";
export * from "./dialog/dialog.module";

/**
 * TOASTS
 */
import { PearsonToastModule } from "./toast/toast.module";
export * from "./toast/toast.module";

/**
 * UTILS
 */
import { PearsonUtilsModule } from "./utils/utils.module";
export * from "./utils/utils.module";

/**
 * MEDIA QUERY
 */
import { PearsonMediaModule } from "./media/media.module";
export * from "./media/media.module";

/**
 * MENU
 */
import { PearsonMenuModule } from "./menu/menu.module";
export * from "./menu/menu.module";

/**
 * NOTIFICATIONS
 */
import { PearsonNotificationsModule } from "./notifications/notifications.module";
export * from "./notifications/notifications.module";

/**
 * EXPANDING PANELs
 */

import { PearsonExpandingPanelModule } from "./expanding-panels/expanding-panel.module";
export * from "./expanding-panels/expanding-panel.module";

/**
 * SPINNER
 */
import { PearsonSpinnerModule } from "./spinner/spinner.module";
export * from "./spinner/spinner.module";

/**
 * LAYOUT && NAVIGATION
 */
import { PearsonNavModule } from "./nav-layout/nav.module";
export * from "./nav-layout/nav.module";

/**
 * DATA 
 */
import { PearsonDataModule } from "./data/data.module";
export * from "./data/data.module";

/**
 * FILE UPLOAD
 */
import { PearsonFileUploadModule } from "./file-upload/file-upload.module";
export * from "./file-upload/file-upload.module";

/**
 * LABELS
 */
import { PearsonLabelModule } from "./label/label.module";
export * from "./label/label.module";

/**
 * SCROLLER
 */
import { PearsonScrollerModule } from "./scroller/scroller.module";
export * from "./scroller/scroller.module";

const MODULES = [
	HttpModule,
	JsonpModule,
	FormsModule,
	CommonModule,
	FlexLayoutModule,
	NgxChartsModule,

  /* MD Modules */
	MdAutocompleteModule,
	MdButtonModule,
	MdButtonToggleModule,
	MdCardModule,
	MdChipsModule,
	MdCheckboxModule,
	MdDatepickerModule,
	MdTableModule,
	MdDialogModule,
	MdExpansionModule,
	MdFormFieldModule,
	MdGridListModule,
	MdIconModule,
	MdInputModule,
	MdListModule,
	MdMenuModule,
	MdPaginatorModule,
	MdProgressBarModule,
	MdProgressSpinnerModule,
	MdRadioModule,
	MdRippleModule,
	MdSelectModule,
	MdSidenavModule,
	MdSliderModule,
	MdSlideToggleModule,
	MdSnackBarModule,
	MdSortModule,
	MdTabsModule,
	MdToolbarModule,
	MdTooltipModule,
	MdPseudoCheckboxModule,
	MdNativeDateModule,
	//OverlayModule,
	//PortalModule,
	//BidiModule,
	StyleModule,
	//A11yModule,
	//PlatformModule,
	MdCommonModule,
	//ObserversModule,

  /* PSN pattern lib modules */
	PearsonDialogModule,
	PearsonToastModule,
	PearsonUtilsModule,
	PearsonMediaModule,
	PearsonMenuModule,
	PearsonNotificationsModule,
	PearsonExpandingPanelModule,
	PearsonSpinnerModule,
	PearsonNavModule,
	PearsonDataModule,
	PearsonFileUploadModule,
	PearsonLabelModule,
	PearsonScrollerModule
];

@NgModule({
	imports: MODULES,
	declarations: [],
	exports: [MODULES],
	providers: []
})
export class PearsonMaterialModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: PearsonMaterialModule,
			providers: []
		};
	}
}
