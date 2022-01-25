import { Component, Inject, OnInit } from '@angular/core';
import { FacadeService } from '@services/facade.service';
import { CountryIntl, countryList } from '@global/countries_intl';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './intl-dialog.component.html',
  styleUrls: ['./intl-dialog.component.scss']
})
export class IntlDialogComponent implements OnInit {
  countries!: CountryIntl[];
  isLoading = true;
  isError = false;
  countryQuery = '';
  currentCountry!: string;
  get filteredCountries(): any[] {
    return this.countries?.filter(country =>
      (country.name.toLowerCase().includes(this.countryQuery .toLowerCase())) || (country.nameAr.toLowerCase().includes(this.countryQuery.toLowerCase()))
      || (country.nameEn.toLowerCase().includes(this.countryQuery.toLowerCase())) || (country.dial_code.startsWith(this.countryQuery.toLowerCase())), this.countries
      );
  }
  get isEn(): boolean {
    return this.facadeService.translatorService.getCurrentLang() === 'en';
  }
  constructor(private facadeService: FacadeService, @Inject(MAT_DIALOG_DATA) public data: string) {
    this.currentCountry = data;
  }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.countries = countryList();
    this.isLoading = false;
  }

  countryFlag(countryCode: string): string {
    return `assets/img/country-list/flags/${countryCode.toLowerCase()}.png`;
  }

}
