
import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'
import {BillI} from "../store/bills-reducer/bills-reducer";


export const authApi={
    async getCurrentUserInfo() {
        const user = await firebase.auth().currentUser
        if (user) {
            const collectionUsers = firebase.firestore().collection('doctors')
            const data = await collectionUsers.doc(user.uid).get().then((res) => res.data())
            // @ts-ignore
            const {name, medicPosition, access} =data
            if(data){
                return {name, medicPosition, access, id:user.uid}
            }
        }
    },
    async login(email:string, password:string) {
        await firebase.auth().signInWithEmailAndPassword(email, password)
    },
    async logout() {
        firebase.auth().signOut()
            .then(function () {
                console.log('Sign-out successful')
            })
            .catch(function (error) {
                console.log('An error happened')
            });
    },
    async updateUserInfo(name:string, medicPosition:string){
        const user = await firebase.auth().currentUser
        if(user){
            await firebase.firestore().collection('doctors').doc(user.uid).update({
                name, medicPosition
            })
        }
    }
}
const getCollection=async (nameCollection:string)=>{
    const array=[] as Array<any>
    await firebase.firestore().collection(nameCollection)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                //@ts-ignore
                array.push({...doc.data(), id: doc.id})
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
    return array
}

export const categoriesApi={
    async getCategories(){
       return await getCollection('categories')
    }
}

export const billPositionsApi={
    async getBillPositions(){
        return await getCollection('billPositions')
    }
}
export const patientsApi={
    async getPatients(){
        return await getCollection('patients')
    }
}
export const billsApi={
    async getBills(){
        return await getCollection('bills')
    },
    async addNewBill(newBill:BillI){
      await firebase.firestore().collection('bills').add(newBill)
          .then(function (docRef) {
              console.log("Document written with ID: ", docRef.id);
          })
          .catch(function (error) {
              console.error("Error adding document: ", error);
          });
    }
}
