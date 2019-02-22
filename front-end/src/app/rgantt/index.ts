import { Activity } from './Activity';
import { Ganttchart } from './Ganttchart';
import { Drawer } from './Drawer';
import { GanttManager } from './GanttManager';
import { IActivity } from './IActivity';
import { IRGantt } from './IRGantt';
const ergantt: IRGantt = {
    acts: [],
    gantt: null,
    setActivities: (actis: IActivity[]) => {
        for (const act of actis) {
            ergantt.acts.push(new Activity(act));
        }
    },
    createGantt: () => {
        if (ergantt.acts.length > 0) {
            // ergantt.gantt = new GanttManager(ergantt.acts);
            ergantt.gantt.initialize();
        } else {
            console.warn('asegurese de ingresar las actividades necesarias');
        }
    },
    onclick: (custom: (e: MouseEvent, data?: any) => void) => {
        if (ergantt.gantt) {
            ergantt.gantt.onclick(custom);
        } else {
            console.error('genere el gantt antes de asignar acciones');
        }
    }
};
declare global {
    interface Window { rgantt: any; }
}
window.rgantt = ergantt;



/*let acts:Activity[] = [];
let gantt:GanttManager;
function setacts(actis:Activity[]) {
    let i = 0;

}
function createGanttChart() {
    gantt = new GanttManager(acts);
    gantt.initialize();

}
function setOnclick(args:any,custom: (e:MouseEvent,args:any,realid:string) => void) {
    gantt.onclick(args,custom);
}*/
/**acts = [
    new Activity({
        start: new Date(2019,0,1),
        end: new Date(2019,0,22),
        color: "#960000",
        id: 1,
        name: "1111111",
        realid: '2334'
    }),
    new Activity({
        start: new Date(2019,1,1),
        end: new Date(2019,1,4),
        color: "#570284",
        id: 2,
        name: "222222",
        realid: '3434343'
    }),
    new Activity({
        start: new Date(2019,0,18),
        end: new Date(2019,2,1),
        color: "#002a87",
        id: 3,
        name: "333333",
        realid:'34354'
    }),
    new Activity({
        start: new Date(2019,2,1),
        end: new Date(2019,2,5),
        color: "#002a87",
        id: 4,
        name: "333333",
        realid: 'erere'
    })
]*/
