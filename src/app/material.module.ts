import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
    imports:[
        BrowserAnimationsModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatCardModule,
        MatNativeDateModule,
        MatAutocompleteModule
    ],
    exports:[
        BrowserAnimationsModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatCardModule,
        MatNativeDateModule,
        MatAutocompleteModule
    ]
})

export class MaterialModule { }