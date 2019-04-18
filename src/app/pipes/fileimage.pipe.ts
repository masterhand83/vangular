import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'fileName'})
export class FileNamePipe implements PipeTransform {
    transform(fileIcon: string) {
        switch (fileIcon){
            case 'pdfIcon':
                return 'assets/img/pdf.svg';
            break;
            case 'xlsIcon':
                return 'assets/img/excel.svg';
            break;
            case 'docIcon':
                return 'assets/img/doc.svg';
            break;
            case 'pngIcon':
                return 'assets/img/picture.svg';
            break;
            case 'jpgIcon':
                return 'assets/img/picture.svg';
            break;
        }
    }

}