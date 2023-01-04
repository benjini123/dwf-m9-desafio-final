// import "../lib/controllers";
import { firestore } from "lib/firestore";

const collection = firestore.collection("users");
export class User {
  ref: FirebaseFirestore.DocumentReference;
  data: any;
  id: string;
  constructor(id: any) {
    this.id = id;
    this.ref = collection.doc(id);
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }
  static async checkUser(userId: any) {
    const findUser = await collection.doc(userId);
    if (!findUser) {
      return false;
    } else {
      return true;
    }
  }
  static async createNewUser(data: any) {
    const newUserSnap = await collection.add(data);
    const newUser = new User(newUserSnap.id);
    newUser.data = data;
    return newUser;
  }
}
