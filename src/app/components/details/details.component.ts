import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  package: any = {};
  // guestCount: number = 1;

  packageCost: number = 200; // Cost per guest
  guestCount: number = 0;
  totalCost: number = 0;
  packageName!: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    const packageId = this.route.snapshot.params['id'];
    this.fetchPackageDetails(packageId);
  }

  fetchPackageDetails(id: number) {
    const apiUrl = `https://tripzolo-backend.vercel.app/api/packages/${id}`;
    this.http.get(apiUrl).subscribe((data: any) => {
      this.package = data;
      console.log(this.package)
    });
  }

  bookNow() {
    this.router.navigate(['/review'], { state: { package: this.package, guestCount: this.guestCount } });
  }
  

  calculateTotalCost(): void {
    this.totalCost = this.guestCount *  this.package.price?.perPerson;
  }

  // Redirect to review page
  redirectToReview(): void {
    this.router.navigate(['/review'], {
      queryParams: { location: this.package?.city,id: this.package?.id, totalCost: this.totalCost, guestCount: this.guestCount, packageName: this.package?.name, image: this.package?.image },
    });
  }

}
