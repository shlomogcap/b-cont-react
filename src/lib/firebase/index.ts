import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDzTrjZSenQY2Wp3WydakpP_ehGcfxR71U',
  authDomain: 'b-cont-01.firebaseapp.com',
  projectId: 'b-cont-01',
  storageBucket: 'b-cont-01.appspot.com',
  messagingSenderId: '617035187341',
  appId: '1:617035187341:web:c41851d8d30dd846ef0ec4',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
