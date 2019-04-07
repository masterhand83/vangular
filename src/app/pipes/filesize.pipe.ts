import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'fileSize'})
export class FileSizePipe implements PipeTransform {
    transform(fileSize: string) {
        let power = fileSize.split(' ');
        return `${power[0]}<small>${power[1]}</small>`;
    }

}