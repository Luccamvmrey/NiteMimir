import {addDoc, collection, getDocs, query, updateDoc, where} from "firebase/firestore";
import {db} from "../../core/services/firebase.ts";
import {IClass} from "../types/Class";

type useClassesReturn = {
    getClasses: (classIdList: string[]) => Promise<IClass[]>;
    addClass: (classData: IClass) => Promise<string>;
}

export const useClasses = (): useClassesReturn => {
    const classesRef = collection(db, "classes");

    const getClasses = async (classIdList: string[]): Promise<IClass[]> => {
        if (classIdList.length === 0) return [];

        const classesQuery = query(classesRef, where("classId", "in", classIdList));
        const classesSnapshot = await getDocs(classesQuery);

        if (classesSnapshot.empty) return [];

        const classes: IClass[] = [];
        classesSnapshot.forEach((doc) => {
            const classData = doc.data() as IClass;

            if (classes.some((c) => c.classId === classData.classId)) return;

            classes.push(classData);
        })

        return classes;
    }

    const addClass = async (classData: IClass): Promise<string> => {
        const docRef = await addDoc(classesRef, classData);
        await updateDoc(docRef, {classId: docRef.id});
        return docRef.id;
    }

    return {
        getClasses,
        addClass
    }
}