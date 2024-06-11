import {addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import {db} from "../../core/services/firebase.ts";
import {ISubject} from "../types/Subject";

type useSubjectReturn = {
    getSubjects: () => Promise<ISubject[]>
    addSubject: (subject: ISubject) => Promise<void>;
    updateSubject: (subjectIs: string, newClassId: string) => Promise<void>;
}

export const useSubject = (): useSubjectReturn => {
    const subjectsRef = collection(db, "subjects");

    const getSubjects = async (): Promise<ISubject[]> => {
        const subjectsSnapshot = await getDocs(subjectsRef);
        if (subjectsSnapshot.empty) {
            console.log("No matching documents.");
            return [];
        }

        const subjects: ISubject[] = [];

        subjectsSnapshot.forEach(doc => {
            const subject = doc.data() as ISubject;

            if (!subjects.some(s => s.subjectId === subject.subjectId)) {
                subjects.push(subject);
            }
        });

        return subjects;
    }

    const addSubject = async (subject: ISubject): Promise<void> => {
        const docRef = await addDoc(subjectsRef, subject);
        await updateDoc(docRef, {subjectId: docRef.id});
        return;
    }

    const updateSubject = async (subjectId: string, newClassId: string): Promise<void> => {
        const subjectRef = doc(subjectsRef, subjectId);
        const subjectSnapshot = await getDoc(subjectRef);
        if (!subjectSnapshot.exists()) {
            return;
        }

        const subjectData = subjectSnapshot.data() as ISubject;
        const classes = subjectData.classes;
        if (!classes.includes(newClassId)) {
            classes.push(newClassId);
        }

        await updateDoc(subjectRef, {classes: classes});
        return;
    }

    return {
        getSubjects,
        addSubject,
        updateSubject
    }
}