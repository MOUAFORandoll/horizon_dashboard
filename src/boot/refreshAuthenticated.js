// // import VueCookies from 'vue-cookies'

// import { api } from "./axios";
// import { useMainStore } from '@/stores/main';
// const mainStore = useMainStore();

// // import router from '../router';
// const refreshAuthenticated = async () => {


//   // if (
//   //   VueCookies.get('refreshToken') != undefined &&
//   //   VueCookies.get('refreshToken') != 'undefined'
//   // ) {
//   //    console.log('ici  *******',    VueCookies.get('refreshToken') );
//   await api
//     .post("/api/token/refresh", {
//       refreshToken: localStorage.getItem("refreshToken"),
//     })
//     .then((response) => {
//       api.defaults.headers.common['Authorization'] =
//         'Bearer ' + String(response.data.token);
//       mainStore.setUser(response.data);
//     })
//     .catch((e) => {
//       console.log(e);
//       if (e.response.status === 403 || e.response.status === 401) {
//         //  router.push({ name: 'Signin' });
//       }
//     });
//   // }
//   // else {
//   //         // router.push({ name: 'Signin' });
//   // }
// };

// export { refreshAuthenticated };
