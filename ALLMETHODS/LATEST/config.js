import  firebase from "firebase-admin"
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
export const serviceAccount =  {
  "type": "service_account",
  "project_id": "file-crm",
  "private_key_id": "2cf07bfbd67d16df6228c96561044122b01c9cdf",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDWPReYqDetZjxC\n8ErPkMgp+kKjjG4m/CqFqVMjVKT/fi/EIpRzsD9F3iPn55nDT3EMX0cyCBEXfNKd\nFzHz7hL/SsRqkgj9a4dA2Tnd5UZ1s2rKW8hGyhzOe5SWBBe3xutCfvFqH065GeFz\nLtgN0kewyMylxVsReoyqgySCxm3ojDmGxgZ76x20cbyQTYj1Pg0lbaSnxgtunr8i\n8jWVDedO08rsNaoXxXiNix2nI78xtfpICA6KGn0ZVKL8amFfpkkvQRrc+6AIdLL0\nr2QcOARAUXgTiQvEnnNoOYFn3LTx6P5/WkVSeJns3koYf+KJ+Jy2motWYVdn5B4J\npldzblKbAgMBAAECggEAXdysPuTMZ/sXwdgXXrM3DzUnBxKanBf05VSXKS6Hj6yQ\nbuUbl0gLoKe/oXXV5z0h8WK5BZGFM34rpEmqSA3xYso2Hd7Xc3gt7Np/QNmXsi+m\nRPxLVcBtOIXqRoOKhKjxH9QQHweSbQSKwvUuEXgkkq6XArXhvVms0XPdhjI7qxsf\nCH1fiK41NuteXrnkFQFV7Qmdxg8RRbpSy4+BbzTjtZeICOZJhvzxxdkE1ippX12O\nNe+vZ1h/wjlkz/u28p7cs1aEqMfktToqvOtzqpyyGtC38OZWbrApwORl5DiiZWBT\na63cxHe/NktrGvq+3uh+nQWBck+cu59a14/CzmcpeQKBgQD2rhPdaaGP1KTeNPKg\niJTt/7fxUMZ7pMdjy5TPdE7Gl4otXrs1JJOezv1kplBH+8rdkwMJHDiJqVEai9XD\n1BvJ34SA2kc7i4lN/MeNyhGHIKnTeqLkfE5eKPvmFYRK/rLTH3c00Ltt0iwQPedO\nvnoOjoMItcvUkq30xlr76fPrJQKBgQDeVTzIjqN66LzV2a5aUOt3BLCMg6sARbQU\nxgjFHqFyoVf0lcau7Vd8g3GNLiko5WHmwxJmnIWr1kksk6IB8XNXDgQo9tUwgfVD\nuHM0P5665ZZyTnee/G8SCW6sI+p+ffQEDkTd+A5l9Wwk4V1MH6pWFJU8rOVw5qr/\nt0QYyGW6vwKBgDGjrhOsIfrTi6m7deegFHggMV+6JXbUHduTKArnGMMV05R1r65u\nAda/SHZskVMq9BPKdZ3rs+Tf0ZZJ9WZG1KC2/e7//b2ZwrOS3oVF2GkcxY/s6cKY\n0RxZmvcd9VUyE8IwXsieCFl9JajPDDDoW596RhwGmVHZgm/zSnPPDGqRAoGAYHEA\n6M5Ww53pK6o9Ixguy3XRT2Jd7sRNlSVB8J+U0LCEAqhlgsOZS32I6AC6Ae9eREch\n2DjVEvDk1N1FTSp7Kav+yfYoC96TkUiVUHi4VcH5PKQk52YAmAZXZ3w835mrG4dF\nADP1quyGeIj5e2fQ734GLkehTxP/4OSSOV3UIukCgYBaALibFAAwaYsdrMfEMk97\nFi7ldd20YplAANyWEw5D2IXxTd46gp3dFxvaBYtjJr9I8bml+roKp7RZD7DBTk5s\nj4XLHpEBWfn/L5MU6hfQvdtn5YMD0/WlVXS5MV6CG55M2X37y1TXc9VkVNJyXnL+\n5vSJ5wRahQglRQDSC/6HjQ==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-rq585@file-crm.iam.gserviceaccount.com",
  "client_id": "118146035697125653200",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rq585%40file-crm.iam.gserviceaccount.com"

}
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://server-auth-41acc.firebaseio.com",
});

export const firebaseConfig = {
  apiKey: "AIzaSyCepYmhxD5xLbcS9IsyAyWeZTKgfBoCW5E",
databaseURL: "https://file-crm-default-rtdb.firebaseio.com",
authDomain: "file-crm.firebaseapp.com",
projectId: "file-crm",
storageBucket: "file-crm.appspot.com",
messagingSenderId: "427192387603",
};
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default {firebase, db, auth, storage };