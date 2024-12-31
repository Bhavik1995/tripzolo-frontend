import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'
import { debounceTime, distinctUntilChanged, map, Observable, of, startWith, switchMap } from 'rxjs';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  searchForm!: FormGroup;
  cities: string[] = [];
  packages: any;

  destinations = [
    {
      name: 'New Delhi',
      image: 'assets/images/new-delhi.jpg'
    },
    {
      name: 'Bangalore',
      image: 'assets/images/banglore.jpg'
    },
    {
      name: 'Mumbai',
      image: 'assets/images/mumbai.jpg'
    },
    {
      name: 'Chennai',
      image: 'assets/images/chennai.jpg'
    },
    {
      name: 'Hyderabad',
      image: 'assets/images/hyderabad.jpg'
    }
  ];

  constructor(private fb: FormBuilder, private router: Router, private cityService: CityService) { }

  ngOnInit() {
    this.createForm();
    this.setupCitySearch();
  }

  createForm(){
    this.searchForm = this.fb.group({
      location: [''],
      date: ['']
    });
  }

  setupCitySearch() {
    this.searchForm.get('location')!.valueChanges
      .pipe(
        debounceTime(300), // Wait for the user to stop typing for 300ms
        distinctUntilChanged(), // Avoid duplicate calls
        switchMap((value) =>
          value ? this.cityService.getCities(value) : of([])  // Return an empty array if no value is provided
        )
      )
      .subscribe((cities) => {
        this.cities = cities;
      });
  }

  onCitySearch() {
    const cityName = this.searchForm.get('location')!.value;
    if (cityName) {
      // Fetch packages for the selected city
      this.cityService.getPackagesByCity(cityName).subscribe({
        next: (packages) => {
          this.packages = packages; // Assume 'packages' is an array of available packages
        },
        error: (err) => {
          console.error('Error fetching packages:', err);
        },
      });
    } else {
      this.packages = []; // Clear the packages if no city is selected
    }
  }

  selectCity(city: string) {
    this.searchForm.get('location')!.setValue(city);
    this.cities = []; // Close the dropdown
    this.onCitySearch(); // Fetch packages for the selected city
  }

  onSearch() {
    const { location } = this.searchForm.value;
    const queryParams = { location };
    this.router.navigate(['/search'], { queryParams });
  }

}
