import {addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where} from "firebase/firestore";
import {db} from "../../core/services/firebase.ts";
import {IClass} from "../types/Class";

type useClassesReturn = {
    getClasses: (classIdList: string[]) => Promise<IClass[]>;
    addClass: (classData: IClass) => Promise<string>;
    updateClass: (classData: IClass) => Promise<void>;
    deleteClass: (classId: string) => Promise<void>;
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

    const updateClass = async (classData: IClass): Promise<void> => {
        const classRef = doc(classesRef, classData.classId);
        await setDoc(classRef, classData);
        return;
    }

    const deleteClass = async (classId: string): Promise<void> => {
        const classRef = doc(classesRef, classId);
        await deleteDoc(classRef);
        return;
    }

    return {
        getClasses,
        addClass,
        updateClass,
        deleteClass
    }
}