import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { addDoc, arrayUnion, collection, doc, DocumentData, Firestore, getDoc, getDocs, getFirestore, limit, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  email:string = "";
  db:any = {};
  dbPath:string = "comments-app";
  currentUser:any ={};
  constructor() {
    initializeApp({
      apiKey: "AIzaSyDCX-BoYBHMOcz38DsJCB4CAB0HSsX1X7I",
      authDomain: "trail-74250.firebaseapp.com",
      projectId: "trail-74250",
      storageBucket: "trail-74250.appspot.com",
      messagingSenderId: "432232722622",
      appId: "1:432232722622:web:7e1ca5de2914a1ca11aeef"
    });
    this.db = getFirestore();
    console.log("Ready to go...");
   }

  async checkLogin(email:string, password:string){ 
    const q = query(collection(this.db, this.dbPath), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    let credFromDb:any={};
    let idz:string = "";
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      credFromDb=doc.data();
      idz = doc.id;
    });
    console.log(credFromDb.password,password);
    this.currentUser = {...credFromDb,idz};
    if(credFromDb.password==password){
      return true;
    }else{alert("Login failed!"); return false;}
  }

  async checkSecret(email:string, secret:string){
    const q = query(collection(this.db, this.dbPath), where("email","==",email),where("secret", "==", secret));
    const querySnapshot = await getDocs(q);
    let credFromDb:any={};
    let idz = "";
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      idz = doc.id;
      credFromDb=doc.data();
    });
    console.log(credFromDb.secret,secret);
    this.currentUser = {...credFromDb,idz};
    if(credFromDb.secret==secret){
      return true;
    }else{alert("Secret failed!"); return false;}
  }

  async addUser(email:string, password:string, secret:string){
    try {
      let newuser = {email:email,password:password,secret:secret,comment:[]};
      await setDoc(doc(collection(this.db, this.dbPath)),newuser);
      console.log("Order Created Successfully",newuser);
      return newuser;
    } catch (e) {
      console.error("Order CREATETION ERROR = Error adding document: ", e);
      return "fail";
    }
  }

  async restpass(password:string){
    try{
      const userRef = await doc(this.db, this.dbPath, this.currentUser.idz);
      await setDoc(userRef, { password: password }, { merge: true });
    return true;
  }catch{
    alert("Reset Failed");
    return false;
  }
  }


  async addComment(comment:string){
    try{
      const userRef = await doc(this.db, this.dbPath, this.currentUser.idz);
      let curComment = this.currentUser.comment;
      curComment.unshift(comment);
      await setDoc(userRef, { comment: curComment }, { merge: true });
    return true;
  }catch(e){
    console.log(e);
    alert("Add Comment Failed");
    return false;
  }
  }

  async getComment(){
    const querySnapshot = await getDocs(collection(this.db, this.dbPath));
    let commentlist:any = [];
    console.log("Running");
    querySnapshot.forEach(async (doc) => {
      let obj:any = doc.data();
      console.log(doc.id, " => ", obj);
      commentlist.push(obj);
    });
    console.log("commentlist",commentlist);
    if(commentlist && commentlist.length>0){
      return commentlist;
    }else{
      alert("Comment list is empty!"); return commentlist;}
    }






}
