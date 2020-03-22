import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const config = {
  apiKey: "AIzaSyAXDZklMwGhiFBFSnFDat0vb8ek2n_A_k0",
  authDomain: "workfam-50dc5.firebaseapp.com",
  databaseURL: "https://workfam-50dc5.firebaseio.com",
  projectId: "workfam-50dc5",
  storageBucket: "workfam-50dc5.appspot.com",
  messagingSenderId: "807440048975",
  appId: "1:807440048975:web:e85d14883f861634995b3a",
  measurementId: "G-YRKT3R3FLE"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.userId = null;
  }

  async login(email, password) {
    const login = await this.auth.signInWithEmailAndPassword(email, password);
    this.userId = this.auth.currentUser.uid;
    window.localStorage.setItem("type", await this.getType());
    return login;
  }

  logout() {
    return this.auth.signOut();
  }

  async register(type, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: type
    });
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  isAuthenticated() {
    return this.userId ? true : false;
  }
  // createService() {
  //   app
  //     .firestore()
  //     .collection("services")
  //     .add({
  //       text: "Dance",
  //       id: 2,
  //       color: "#3393FF",
  //       avatar:
  //         "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/gym/coach-man.png",
  //       userId: this.userId
  //     });
  // }

  // createMultiServices() {
  //   var batch = this.db.batch();
  //   data.forEach((doc) => {
  //     var docRef = this.db.collection("scheduled").doc();
  //     batch.set(docRef, { ...doc, userId: this.userId });
  //   });
  //   batch.commit();
  // }

  async getServices() {
    return await this.db
      .collection(`services`)
      .where("userId", "==", this.userId)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        return data;
      });
  }

  async getSchedule() {
    return this.db
      .collection("scheduled")
      .where("userId", "==", this.userId)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return doc.data();
        });
        data.forEach((ele) => {
          ele.startDate = ele.startDate.toDate();
          ele.endDate = ele.endDate.toDate();
        });
        return data;
      });
  }

  async addApoointment(appointment) {
    await app
      .firestore()
      .collection("scheduled")
      .add({
        text: appointment.text,
        serviceId: appointment.serviceId,
        startDate: appointment.startDate,
        endDate: appointment.endDate,
        userId: this.userId,
        id: new Date().getTime()
      });
  }

  async updateAppointment(appointment) {
    console.log(appointment);
    console.log(appointment);
    var that = this;
    await this.db
      .collection("scheduled")
      .where("id", "==", appointment.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function(doc) {
          that.db
            .collection("scheduled")
            .doc(doc.id)
            .update({
              text: appointment.text,
              startDate: appointment.startDate,
              endDate: appointment.endDate
            });
        });
      });
  }

  async deleteAppointment(appointment) {
    var that = this;
    await this.db
      .collection("scheduled")
      .where("id", "==", appointment.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function(doc) {
          that.db
            .collection("scheduled")
            .doc(doc.id)
            .delete();
        });
      });
  }

  async getType() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }
}
export default new Firebase();
