import { getApp } from "firebase/app";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { FC, useEffect, useState } from "react";
import { TaskEntity } from "../../types/firestoreTypes";

export const TaskDisplay: FC<{ task: TaskEntity }> = ({ task }) => {
  const { title, fileName } = task;
  const appInstance = getApp();
  const dbInstance = getFirestore(getApp());
  const storageInstance = getStorage(appInstance);
  const [fileUrl, setFileUrl] = useState("");
  const fileRef = ref(storageInstance, fileName);

  useEffect(() => {
    const retrieveUrl = async () => {
      if (!fileName) {return}
      
      const fileUrl = await getDownloadURL(fileRef);
      setFileUrl(fileUrl);
    };
    retrieveUrl();
  }, []);

  const onDeleteTask = async (taskId: string) => {
    await deleteDoc(doc(dbInstance, "tasks", taskId));
  };

  return (
    <li>
      <span>{title} </span>
      <img src={fileUrl} height="100" alt={fileName} />
      <button className="small-button" onClick={() => onDeleteTask(task.uid)}>Delete</button>
    </li>
  );
};