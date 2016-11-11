// import { EventEmitter } from 'events';
// import $http from 'axios';
// import $persian from '../modules/en-to-fa';
//
//
// const store = new EventEmitter();
// // const itemsCache = {};
// const storiesPerPage = store.storiesPerPage = 20;
//
// let topStoryIds = [];
//
// store.getItems = page => {
// 	return new Promise((resolve, reject) => {
// 		// if (itemsCache[id]) {
// 			// resolve(itemsCache[id]);
// 		// } else {
// 		$http.get('https://www.zarinpal.com/panel/frontPage/webServicesList.json/20')
// 			.then(response => {
// 				resolve(response.data);
// 				store.on('updated', (response.data) => {
// 					console.log(response.data);
// 				});
// 			})
// 			.catch(response => reject(response));
// 		// }
// 	});
// };
//
// export default store;
