import { Pipe, PipeTransform } from '@angular/core';
/*
 * Replace substrings
 *
 * Usage:
 *   string | replace: object
 * Example:
 *   {{ "ab{{cd}}ef{{gh}}" | replace : {cd: "CD", gh: "GH"} }}
 *   formats to: abCDefGH
*/
@Pipe({name: 'replace'})
export class ReplacePipe implements PipeTransform {
  transform(input: string, dict): string {
    let result = input;
    for(let key in dict)
        result = result.replace(new RegExp(`{${key}}`, "g"), dict[key]);
    return result;
  }
}