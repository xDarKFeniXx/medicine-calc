
import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'
import {BillI} from "../store/new-bill/new-bill-reducer";


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
const getCollectionsSearch=async(nameCollection:string, search:string)=>{
    const array=[ ]as Array<any>
    await firebase.firestore().collection(nameCollection)
        // .where('name', '<=', search)
        .where('name', '>=', search).where('name', '<=', search+ '\uf8ff')
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
const addNewItemInCollection=async(collectionName:string, item:any)=>{
    const createAt=firebase.firestore.FieldValue.serverTimestamp()

    item.createAt=createAt
    item.updateAt=null
    await firebase.firestore().collection(collectionName).add(item)
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}
const deleteItemInCollection=async(collectionName:string, itemId:string)=>{
    await firebase.firestore().collection(collectionName)
        .doc(itemId)
        .delete()
        .then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
}
const updateItemInCollection=async(collectionName:string, item:any)=>{
    const id=item.id
    delete item.id
    item.updateAt=firebase.firestore.FieldValue.serverTimestamp()
    await firebase.firestore().collection(collectionName)
        .doc(id)
        .update({...item})
}
export const categoriesApi={
    async getCategories(){
       return await getCollection('categories')
    },
    async deleteCategory(categoryId:string){
        await deleteItemInCollection('categories', categoryId)
    },
    async addNewCategory(newCategory:any){
        await addNewItemInCollection('categories', newCategory)
    },
    async updateCategory(category:any){
        await updateItemInCollection('categories', category)
    }
}

export const billPositionsApi={
    async getBillPositions(){
        return await getCollection('billPositions')
    },
    async deleteBillPosition(billPositionId:string){
        await deleteItemInCollection('billPositions', billPositionId)
    },
    async addNewBillPosition(newBillPosition:any){
        await addNewItemInCollection('billPositions', newBillPosition)
    },
    async updateBillPosition(billPosition:any){
        await updateItemInCollection('billPositions', billPosition)
    }
}
export const patientsApi={
    async getPatients(){
        return await getCollection('patients')
    },
    async getPatientsSearch(search:string){
        return await getCollectionsSearch('patients', search)
    },
    async deletePatient(patientsId:string){
        await deleteItemInCollection('patients', patientsId)
    },
    async addNewPatient(newPatient:any){
        await addNewItemInCollection('patients', newPatient)
    },
    async updatePatient(patients:any){
        await updateItemInCollection('patients', patients)
    }
}
export const billsApi={
    async getBills(){
        return await getCollection('bills')
    },
    async addNewBill(newBill:BillI){
      // await firebase.firestore().collection('bills').add(newBill)
      //     .then(function (docRef) {
      //         console.log("Document written with ID: ", docRef.id);
      //     })
      //     .catch(function (error) {
      //         console.error("Error adding document: ", error);
      //     });
        await addNewItemInCollection('bills', newBill)
    },
    async deleteBill(id:string){
        await deleteItemInCollection('bills', id)
    }
}
