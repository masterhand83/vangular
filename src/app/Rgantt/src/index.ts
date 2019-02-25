import * as moment from 'moment';
import { BasicDrawer } from './gantt/basicDrawer';
import { IElement } from './interfaces/IElement';
import { GanttChart } from './gantt/ganttChart';
import { Activity } from './gantt/activity';
import { GanttManager } from './gantt/ganttManager';
import { IActivityConfig } from './interfaces/IActivity.config';
let btn = <HTMLButtonElement> document.querySelector('#add');
let btnn = <HTMLButtonElement> document.querySelector('#delete');
let i = 6;
let acts: IActivityConfig[] = [
    {
        color: '#2400ba',
        start: new Date(),
        end: new Date(2019,2,3),
        index: 1,
        name: 'actividad 1',
        data: 'ididididididi'
    },
    {
        color: '#0300ba',
        start: new Date(2019,1,10),
        end: new Date(2019,2,10),
        index: 2,
        name: 'actividad 2',
        data: {
            salary: 9090
        }
    },
    {
        color: '#0300ba',
        start: new Date(),
        end: new Date(2019,2,5),
        index: 3,
        name: 'actividad 3',
        data: [ 'hello', 9]
    },
    {
        color: '#0300ba',
        start: new Date(),
        end: new Date(2019,2,5),
        index: 4,
        name: 'actividad 4',
    },
    {
        color: '#0300ba',
        start: new Date(),
        end: new Date(2019,1,24),
        index: 5,
        name: 'actividad 5',
    }
]

let manager = new GanttManager();

manager.init(acts);
manager.onActivityClick(data =>{
    console.log(data);
})
btn.addEventListener('click',(b)=>{
    acts.push({
        color: '#dd0f04',
        start: new Date(),
        end: new Date(2019,2,7),
        index: i,
        name: `nueva actividad`
    })
    manager.update(acts);
    i++;
})
btnn.addEventListener('click',(b)=>{
    acts.pop();
    manager.update(acts);
    i--;
})
/*gantt.insertActivities(acts);
gantt.draw();

btn.addEventListener('click',(button)=>{
    acts.push({
        color: '#dd0f04',
        start: new Date(),
        end: new Date(2019,2,3),
        index: i,
        name: `nueva actividad`
    })
    gantt.updateActivities(acts);
    i++;
})*/


//drawFoundations(moment(new Date(2019, 1, 10)), moment(new Date(2019, 2, 10)));
/*setTimeout(()=>{
    drawer.updateCanvas(canvas,()=>{
        drawFoundations(moment(new Date(2019, 0, 1)), moment(new Date(2019, 11, 1)));
    })
}, 100)*/

/*function drawFoundations(fullstart: moment.Moment, fullend: moment.Moment) {
    let start = fullstart.clone();
    let end = fullend.clone();
    let duration = end.add(1, 'day').diff(start, 'days');
    let scale = 18
    canvas.width = (scale + 1) * duration;
    //drawBackground(canvas.width, canvas.height);
    console.log(duration);
    let temp = fullstart.clone();

    for (let i = 1; i <= duration; i++) {
        //i, 45, canvas.height, scale, temp.format('DD')
        drawer.drawPin({
            x: i,
            y1: 45,
            y2: canvas.height,
            scale,
            label: temp.format('DD'),
            label_color: 'blue'
        });
        //i,25,35,scale,temp.format('MMMM'),'green'
        if (temp.format('DD') == '01' || i === 1) {
            drawer.drawPin({
                x: i,
                y1: 25,
                y2: 35,
                scale,
                label: temp.format('MMMM'),
                color: '#7738ff',
                label_color: '#2a0184'
            });
        }
        temp.add(1, 'day');
    }
    //* dibujar hasta el final de generar las actividades
    drawToday(start,scale);
}*/

/*function drawToday(fullstart: moment.Moment, scale:number){
    let start = fullstart.clone();
    let today = moment(new Date()).add(1,'day');
    console.log(today.utc().format('DD/MM/YYYY'));
    console.log(today.format('DD/MM/YYYY'));
    let from = moment.duration(today.diff(start)).days();
    console.log(from);
    drawer.drawPin({
        x: from,
        y1: 25,
        y2: canvas.height,
        scale,
        label: 'Today',
        color: 'green',
        label_color: 'green'
    })
}*/