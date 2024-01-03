import {
  getAuth, signInWithEmailAndPassword
} from "firebase/auth";
import {
  getFirestore, query, where, collection,
  getDocs
} from "firebase/firestore";


export default async function () {
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, "ricardogomez@lasallistas.org.mx", "317899Ricardo@!!!...")
  const db = getFirestore();
  const usuarioRef = collection(db, "usuarios");

  // query where email == email
  let queryEmail, usuario;
  try {
    queryEmail = query(usuarioRef, where("email", "==", 'ja.rg@lasallistas.org.mx'));
  } catch (error) {
    console.log(error);
  }
  try {

    const querySnapshot = await getDocs(queryEmail);
    querySnapshot.forEach((doc) => {
      usuario = doc.data();
    });


  } catch (error) {
    console.log(error);
  }

  return useState('firebase', () => usuario);
}
