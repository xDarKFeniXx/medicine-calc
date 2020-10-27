
import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'
import {CategoryType} from "../store/categories-reducer/categories-reducer";


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
