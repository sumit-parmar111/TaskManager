import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/models/country';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  //hold model data
  countries: Country[] = [];
  showLoading: boolean = false;

  //delete data
  deleteCountry: Country = new Country();
  editIndex: number = null;
  deleteIndex: number = null;

  //searching
  searchBy: string = "countryName";
  searchText: string = "";

  //pagging
  currentPageIndex: number = 0;
  pages: any[] = [];
  pageSize: number = 7;

  //reactive form
  newForm: FormGroup | any = null;
  editForm: FormGroup | any = null;

  //autofocus
  @ViewChild("defaultTextBox_New") defaultTextBox_New: ElementRef;
  @ViewChild("defaultTextBox_Edit") defaultTextBox_Edit: ElementRef;

  //sorting
  sortBy: string = "countryName";
  sortOrder: string = "ASC";

  constructor(private countriesService: CountriesService, private formBuilder: FormBuilder) {
  }
  ngOnInit() {
    //get data
    this.countriesService.getCountries().subscribe((response: Country[]) => {
      this.countries = response;
      this.showLoading = false;
      this.calculateNoOfPages();
    });

    //create new form
    this.newForm = this.formBuilder.group({
      countryID: this.formBuilder.control(null),
      countryName: this.formBuilder.control(null, [Validators.required])
    });

    //create edit form
    this.editForm = this.formBuilder.group({
      countryID: this.formBuilder.control(null),
      countryName: this.formBuilder.control(null, [Validators.required])
    });

  }
  calculateNoOfPages() {
    let filterPipe = new FilterPipe();
    var resultProjects = filterPipe.transform(this.countries, this.searchBy, this.searchText);
    var noOfPages = Math.ceil(resultProjects.length / this.pageSize);

    this.pages = [];
    for (let i = 0; i < noOfPages; i++) {
      this.pages.push({ pageIndex: i });
    }
    this.currentPageIndex = 0;
  }

  onPageIndexClicked(ind) {
    if (ind >= 0 && this.pages.length) {
      this.currentPageIndex = ind;
    }
  }
  onNewClick(event) {
    this.newForm.reset({ countryID: 0 });
    setTimeout(() => {
      this.defaultTextBox_New.nativeElement.focus();
    }, 100);
  }
  onSaveClick() {
    if (this.newForm.valid) {
      this.countriesService.insertCountry(this.newForm.value).subscribe({
        next: (response) => {
          // var p:Country=new Country();
          // p.countryID=response.countryID;
          // p.countryName=response.countryName;
          // this.countries.push();
          this.countriesService.getCountries().subscribe((response: Country[]) => {
            this.countries = response;
            this.showLoading = false;
            this.calculateNoOfPages();
          });


          this.newForm.reset();
          $("#newNewCountryFromCancel").trigger("click");
          this.calculateNoOfPages();
        },
        error: (error) => {
          console.log(error);
          alert("error while creating country");
        }
      });
    }
  }
  onEditClick(event, country: Country) {
    this.editForm.reset();
    setTimeout(() => {
      this.editForm.patchValue(country);
      this.editIndex = this.countries.indexOf(country);
      this.defaultTextBox_Edit.nativeElement.focus();
    }, 100);
  }
  onUpdateClick() {
    if (this.editForm.valid) {
      this.countriesService.updateCountry(this.editForm.value).subscribe({
        next: (response: Country) => {
          this.countries[this.editIndex] = response;
          this.editForm.reset();
          $("#editCountrytFromCancel").trigger("click");
        },

        error: (error) => {
          console.log(error);
          alert("error while updating country");
        }

      });
    }
  }

  onDeleteClick(event, country: Country) {
    this.deleteCountry.countryID = country.countryID;
    this.deleteCountry.countryName = country.countryName;
    this.deleteIndex = this.countries.indexOf(country);
  }

  onDeleteConfirmClick() {
    this.countriesService.deleteCountry(this.deleteCountry.countryID).subscribe({
      next: (response) => {
        this.countries.splice(this.deleteIndex, 1);
        this.deleteCountry.countryID = null;
        this.deleteCountry.countryName = null;
        this.calculateNoOfPages();

      },
      error: (error) => {
        console.log(error);
        alert("error while deleting country");
      }
    });

  }
  onSearchTextChange(event) {
    this.calculateNoOfPages();
  }

}
