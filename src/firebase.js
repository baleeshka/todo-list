import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
	apiKey: 'AIzaSyAR3hdI3WzTYWDfBDG2Mh1VjDa7Axplc3E',
	authDomain: 'todolist-94458.firebaseapp.com',
	projectId: 'todolist-94458',
	storageBucket: 'todolist-94458.appspot.com',
	messagingSenderId: '437080700898',
	appId: '1:437080700898:web:75e2d1ed459ef82c63abbb',
	databaseURL:
		'https://todolist-94458-default-rtdb.europe-west1.firebasedatabase.app/',
}

const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)
