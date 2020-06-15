import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config ={
    apiKey: "AIzaSyAflWJc_Yt5JVRGSofFn729dYas0y5euv4",
    authDomain: "crwn-db-186ee.firebaseapp.com",
    databaseURL: "https://crwn-db-186ee.firebaseio.com",
    projectId: "crwn-db-186ee",
    storageBucket: "crwn-db-186ee.appspot.com",
    messagingSenderId: "930050309072",
    appId: "1:930050309072:web:12482532bd72643dc017d5",
    measurementId: "G-D75NZ2P5SX"
  };

  export const createUserProfileDocument = async(userAuth, additionalData) => {

    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot= await userRef.get();

    if(!snapShot.exists){

      const {displayName, email }=userAuth;
      const createdAt= new Date();
      try{

        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })

      }catch(error){

        console.log("error creating user", error.message);

      }
    }

    return userRef;

  }

  firebase.initializeApp(config);

  export const auth=firebase.auth();

   export const firestore=firebase.firestore();

   const provider =new firebase.auth.GoogleAuthProvider();
   provider.setCustomParameters({promt:'select_account'});

   export const signInWithGoogle = () => auth.signInWithPopup(provider);

   export default firebase;