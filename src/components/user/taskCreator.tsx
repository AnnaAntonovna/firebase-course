import { useState, FC, FormEvent, ChangeEvent } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getApp } from "firebase/app";
import { useUserContext } from "../../userProvider";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export const TaskCreator: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [user] = useUserContext();
  const [file, setFile] = useState<File | null>();

  const dbInstance = getFirestore(getApp());
  const appInstance = getApp();
  const storageInstance = getStorage(appInstance);

  const onCreateTask = async (event: FormEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!file || !title) {
      return;
    }

    const fileName = file.name;
    const fileRef = ref(storageInstance, fileName);

    await addDoc(collection(dbInstance, "Tasks"), {
      title: title,
      userId: user?.uid,
      fileName,
    });

    const uploadFilePromise = uploadBytes(fileRef, file);
    await Promise.all([addDoc, uploadFilePromise]);
    setTitle("");
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files && event?.target?.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <form className="contentFlexVertical" onSubmit={onCreateTask}>
      <input
        type="title"
        className="field"
        placeholder="New task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="file"
        accept=".png"
        className="text"
        onChange={handleFileChange}
      />

      <button type="submit" className="button text">
        Create new task
      </button>
    </form>
  );
};
