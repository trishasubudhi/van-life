// import { initializeApp } from "firebase/app";
// // lite not includes the real time features makes app light weight
// import { getFirestore  , collection , getDocs , doc , getDoc , query  , where} from "firebase/firestore/lite"

// const firebaseConfig = {
//   apiKey: "AIzaSyANo4tpzJYvNhwryUv_p-53A4WGCPBTvQU",
//   authDomain: "van-life-app-3531.firebaseapp.com",
//   projectId: "van-life-app-3531",
//   storageBucket: "van-life-app-3531.firebasestorage.app",
//   messagingSenderId: "609631739992",
//   appId: "1:609631739992:web:1e17a226714fa477b62a2d"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app)

// const vnasCollectionRef = collection("vans")

// export async function getVans() {
    // const querySnapshot = await getDocs(vnasCollectionRef)
    // const dataArr = querySnapshot.docs.map(doc => ({
        // ...doc.data(),
        // id:doc.id
    // }))
    // console.log(dataArr);
    // 
    // return dataArr
// }
// 
// export async function getVan(id) {
    // const docRef = doc(db , "vans" , id)
    // const vanSnapshot = await getDoc(docRef)
    // const data = vanSnapshot.doc()
    // console.log(data)
    // return {...data , id : vanSnapshot.id}
// }



export async function getVans(id) {
    const url = id ? `/api/vans/${id}` : "/api/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return id ? data.van : data.vans
}

// export async function getHostVans() {
//     const q = query(vnasCollectionRef , where("hostId" , "==" , "123"))
//     const querySnapshot = await getDocs(q)
//     const dataArr = querySnapshot.docs.map(doc => ({
//         ...doc.data(),
//         id:doc.id
//     }))
//     return dataArr
// }

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return id ? data.vans[0] : data.vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(creds)
        }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}