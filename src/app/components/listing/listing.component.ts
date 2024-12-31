import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  location: string = '';
  packages: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.location = params['location'];
      this.fetchPackages();
    });
  }

  fetchPackages() {
    const apiUrl = `https://tripzolo-backend.vercel.app/api/packages`;
    let params = new HttpParams();
    if (this.location) {
      params = params.set('city', this.location);
    }
    this.http.get(apiUrl, { params }).subscribe({
    next: (data: any) => {
      this.packages = data;
      console.log(data);
    },
    error: (err) => {
      console.error('Error fetching packages:', err);
    }
  });
  }

  viewDetails(id: number) {

    // this.router.navigate(['/details', id]);
    const location = this.location;
    this.router.navigate(['/details', { location },id]);
  }
}
