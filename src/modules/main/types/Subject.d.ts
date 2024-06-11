export interface ISubject {
    subjectId: string | "not initialized"
    subjectName: string;
    classes: Array<string>; // classId
}
