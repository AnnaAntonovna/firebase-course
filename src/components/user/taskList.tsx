import { FC, useState, useEffect } from "react";
import { TaskEntity } from "../../types/firestoreTypes";
import { getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useUserContext } from "../../userProvider";
import { TaskDisplay } from "./taskDisplay";

export const TaskList: FC = () => {
  const [tasks, setTasks] = useState<TaskEntity[]>([]);
  const [user] = useUserContext();
  const app = getApp();
  const dbInstance = getFirestore(app);

  const queryInstance = query(collection(dbInstance, "Tasks"), where('userId', '==', user?.uid)); //SHOULD BE NAMED THE SAME AS IN THE FIREBASE ONLINE DATABASE YOU CREATED

  useEffect(() => {
    const unsubscribe = onSnapshot(queryInstance, (snapshot) => {
      const result: TaskEntity[] = [];
      snapshot.docs.forEach((doc) =>
        result.push({ ...(doc.data() as TaskEntity), uid: doc.id })
      );
      setTasks(result);
    });

    return () => {
        unsubscribe();
    };
  }, []);

  const onDeleteTask = async (taskId: string) => {
    await deleteDoc(doc(dbInstance, "Tasks", taskId));
  }

  return (
    <div>
      {Boolean(tasks.length) ? (
        <ul>
          {tasks.map((task) => {
            return <TaskDisplay key={task.uid} task={task} />;
          })
          }
        </ul>
      ) : (
        <p>"Nothing here yet"</p>
      )}
    </div>
  );
};
