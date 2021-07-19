import { NgModule } from '@angular/core';


import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatBadgeModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatTabsModule,
  MatMenuModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatProgressBarModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSortModule,
  MatSliderModule





} from '@angular/material';




const MaterialComponents = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatBadgeModule,
  MatListModule,
  MatCardModule,
  MatGridListModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatChipsModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule,
  MatNativeDateModule,
  MatTabsModule,
  MatMenuModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatProgressBarModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSortModule,
  MatSliderModule










]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
