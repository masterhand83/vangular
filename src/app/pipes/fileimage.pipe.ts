import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'fileName'})
export class FileNamePipe implements PipeTransform {
    transform(fileIcon: string) {
        switch (fileIcon){
            case 'pdfIcon':
                return 'assets/img/pdf.svg';
            break;
            case 'xlsIcon':
                return 'assets/img/xls.svg';
            break;
            case 'xlsxIcon':
                return 'assets/img/xls.svg';
            break;
            case 'docIcon':
                return 'assets/img/doc.svg';
            break;
            case 'docxIcon':
                return 'assets/img/doc.svg';
            break;
            case 'pngIcon':
                return 'assets/img/png.svg';
            break;
            case 'jpgIcon':
                return 'assets/img/jpg.svg';
            break;
            case 'pptIcon':
                return 'assets/img/ppt.svg';
            break;
            case 'txtIcon':
                return 'assets/img/txt.svg';
            break;
            case 'zipIcon':
                return 'assets/img/zip.svg';
            break;
            default:
                return 'assets/img/file.svg';
            break;
        }
    }

}