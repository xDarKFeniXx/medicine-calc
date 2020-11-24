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

            if(data){
                const {name, medicPosition, access} = data
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
                // TODO сделать шину ошибок
            });
    },
    async updateUserInfo(name:string, medicPosition:string){
        const user = await firebase.auth().currentUser
        if(user){
            await firebase.firestore().collection('doctors').doc(user.uid).update({
                name, medicPosition
            })
        }
    },
    async registerNewUser(name:string, profession:string, email:string, password:string){
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (user) => {
                // @ts-ignore
                await firebase.firestore().collection('doctors').doc(user.user.uid).set({
                    name,
                    medicPosition:profession,
                    access:"user"
                })

                // Signed in
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                // ..
            });
    }
}
const getCollection=async (nameCollection:string, userId:string)=>{
    const array=[] as Array<any>
    await firebase.firestore().collection(nameCollection)
        .where('userId', '==', userId)
        // .orderBy('createAt', 'desc')
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
const getCollectionsSearch=async(nameCollection:string, userId:string, search:string)=>{
    const array=[ ]as Array<any>
    await firebase.firestore().collection(nameCollection)
        .where('userId', '==', userId)
        .where('name', '>=', search).where('name', '<=', search+ '\uf8ff')
        // .orderBy('createAt', 'desc')
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
const addNewItemInCollection=async(collectionName:string, userId:string,  item:any)=>{
    item.createAt=firebase.firestore.FieldValue.serverTimestamp()
    item.updateAt=null
    await firebase.firestore().collection(collectionName).add({...item, userId})
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
        const user = await firebase.auth().currentUser
       // @ts-ignore
        if(user){
        return await getCollection('categories', user.uid)
        }
    },
    async deleteCategory(categoryId:string){
        await deleteItemInCollection('categories', categoryId)
    },
    async addNewCategory(newCategory:any){
        const user = await firebase.auth().currentUser
        // @ts-ignore
        if(user){

        await addNewItemInCollection('categories', user.uid, newCategory)
        }
    },
    async updateCategory(category:any){
        await updateItemInCollection('categories', category)
    }
}

export const billPositionsApi={
    async getBillPositions(){
        const user = await firebase.auth().currentUser
        // @ts-ignore
        if(user){

        return await getCollection('billPositions', user.uid)
        }
    },
    async deleteBillPosition(billPositionId:string){
        await deleteItemInCollection('billPositions', billPositionId)
    },
    async addNewBillPosition(newBillPosition:any){
        const user = await firebase.auth().currentUser
        // @ts-ignore
        if(user){
        await addNewItemInCollection('billPositions', user.uid, newBillPosition)
        }
    },
    async updateBillPosition(billPosition:any){
        await updateItemInCollection('billPositions', billPosition)
    }
}
export const patientsApi={
    async getPatients(){
        const user = await firebase.auth().currentUser
        // @ts-ignore
        if(user){
        return await getCollection('patients', user.uid)
        }
    },
    async getPatientsSearch(search:string){
        const user = await firebase.auth().currentUser
        // @ts-ignore
        if(user){
        return await getCollectionsSearch('patients', user.uid, search)
        }
    },
    async deletePatient(patientsId:string){
        await deleteItemInCollection('patients', patientsId)
    },
    async addNewPatient(newPatient:any){
        const user = await firebase.auth().currentUser
        // @ts-ignore
        if(user) await addNewItemInCollection('patients', user.uid, newPatient)
    },
    async updatePatient(patients:any){
        await updateItemInCollection('patients', patients)
    }
}
export const billsApi={
    async getBills(){
        const user = await firebase.auth().currentUser
        // @ts-ignore
        if(user){
            return await getCollection('bills', user.uid)
        }

    },
    async addNewBill(newBill:BillI){
        const user = await firebase.auth().currentUser
        // @ts-ignore
        if(user){
            await addNewItemInCollection('bills', user.uid, newBill)

        }
    },
    async deleteBill(id:string){
        await deleteItemInCollection('bills', id)
    }
}
