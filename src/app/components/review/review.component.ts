import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  package: any = {};
  guestCount: number = 1;
  packageName!: string;
  packageCost!: number;
  location!: string;
  id: any;
  image: any;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRouteData();
  }

  getRouteData(){
    this.route.queryParams.subscribe(({ 
      packageName, 
      totalCost, 
      location, 
      id, 
      image, 
      guestCount 
    }) => {
      this.packageName = packageName;
      this.packageCost = totalCost;
      this.location = location;
      this.id = id;
      this.image = image;
      this.guestCount = guestCount;
    });
  }

  confirmBooking(){
    Swal.fire({ text: 'Booking Sucessfully Done', icon: 'success'});
    setTimeout(()=>{
      this.router.navigate(['']);
    },1000)
  }

  goBack(){
    const location = this.location;
    const id = this.id;
    this.router.navigateByUrl(`/details;location=${location}/${id}`);
  }
}
