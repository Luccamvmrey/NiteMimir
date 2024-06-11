import {Group} from "./Group.ts";
import {IRoom} from "./Room";
import {DayOfWeek} from "./DayOfWeek.ts";

export interface IClass {
    classId: string;
    dayOfWeek: DayOfWeek;
    timeIn: string;
    timeOut: string;
    room: IRoom;
    professorName: string;
    group: Group;
}