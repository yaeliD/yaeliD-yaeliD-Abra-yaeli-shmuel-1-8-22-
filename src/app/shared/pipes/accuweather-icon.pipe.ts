import { HttpClient } from "@angular/common/http";
import { Pipe, PipeTransform } from "@angular/core";

export const IMG_URL = `https://developer.accuweather.com/sites/default/files`;
@Pipe({
  name: 'accuweatherIcon'
})
export class AccuweatherIconPipe implements PipeTransform {

    // constructor(public http: HttpClient){}

  transform(value: any): any {
    console.log(value);
    
    let str = value > 9 ? value : `0${value}`;
    console.log(`${IMG_URL}/${str}-s.png`);
    
    return `${IMG_URL}/${str}-s.png`;
  }

}
