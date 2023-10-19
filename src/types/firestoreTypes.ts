export interface FirestoreEntity {
    uid: string;
}

export interface TaskEntity extends FirestoreEntity {
    title: string; //ALSO JUST LIKE IN THE ONLINE FIRESTORE DATABASE
    userId: string;
    fileName: string;
}