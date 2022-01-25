import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  item(item: any, property?: string): any {
      if (!property) {
        return item;
      } else {
        return item[property];
      }
  }

  transform(value: any[], filterBy: any, property?: string, filterOption?: 'contains' | 'startsWith' | 'endsWith' | 'equals'): any[] {
    if (value.length === 0 || filterBy === '') {
      return value;
    }

    switch (filterOption) {
      case 'contains':
        return value.filter(item => this.item(item, property).includes(filterBy));
      case 'startsWith':
        return value.filter(item => this.item(item, property).startsWith(filterBy));
      case 'endsWith':
        return value.filter(item => this.item(item, property).endsWith(filterBy));
      case 'equals':
        return value.filter(item => this.item(item, property) === filterBy);
      default:
        return value.filter(item => this.item(item, property).includes(filterBy));
    }
  }

}
