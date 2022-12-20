import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyBbRBKbncs8wTIlxQffhheHZLVfGNxSCUw',
  authDomain: 'covid-19-south-america-app.firebaseapp.com',
  projectId: 'covid-19-south-america-app',
  storageBucket: 'covid-19-south-america-app.appspot.com',
  messagingSenderId: '1081092887171',
  appId: '1:1081092887171:web:cad25c7993488489cb81b6',
  measurementId: 'G-410JW0B5JX'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebaseApp)

export {
  analytics,
  logEvent
}

export default boot(() => {
  // config
})
