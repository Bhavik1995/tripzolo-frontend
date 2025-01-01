import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  constructor(private fb: FormBuilder, private router: Router, private cityService: CityService,private cdr: ChangeDetectorRef) { }

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
        debounceTime(300), 
        distinctUntilChanged(), 
        switchMap((value) => {
          return value ? this.cityService.getCities(value) : of([]); 
        })
      )
      .subscribe({
        next: (cities) => {
          const searchTerm = this.searchForm.get('location')!.value.toLowerCase();
          this.cities = cities.filter(city => city.toLowerCase().includes(searchTerm));
        },
        error: (err) => {
          console.error("Error fetching cities:", err);
        },
      });
  }
  
  onCitySearch() {
    const cityName = this.searchForm.get('location')!.value;
    if (cityName) {
      this.cityService.getPackagesByCity(cityName).subscribe({
        next: (packages) => {
          this.packages = packages;
        },
        error: (err) => {
          console.error('Error fetching packages:', err);
        },
      });
    } else {
      this.packages = [];
    }
  }

  selectCity(city: string) {
    this.searchForm.get('location')!.setValue(city);
    this.cities = [];
    this.onCitySearch();
  }

  onSearch() {
    const { location } = this.searchForm.value;
    const queryParams = { location };
    this.router.navigate(['/search'], { queryParams });
  }
}
