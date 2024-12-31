import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { ListingComponent } from './components/listing/listing.component';
import { DetailsComponent } from './components/details/details.component';
import { ReviewComponent } from './components/review/review.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'search', component: ListingComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'review', component: ReviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
