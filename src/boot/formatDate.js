
// import { boot } from 'quasar/wrappers';
// import jwt_decode from 'jwt-decode';

const formatDate = function (date, type) {


  if (type == 0) {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();
    const heure = ' ' + date.getHours();
    const minutes = date.getMinutes();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-') + [heure, minutes].join(':');

  }

  else
    if (type == 2) {
      let month = '' + (date.getMonth() + 1);
      let day = '' + date.getDate();
      const year = date.getFullYear();

      if (month.length < 2) {
        month = '0' + month;
      }
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');

    }

    else if (type == 3) {
      let month = '' + (date.getMonth() + 1);
      let day = '' + date.getDate();
      const year = date.getFullYear();
      const heure = ' ' + date.getHours();
      const minutes = date.getMinutes();

      if (month.length < 2) {
        month = '0' + month;
      }
      if (day.length < 2) day = '0' + day;

      return [day, month, year].join('/') + [heure, minutes].join(':');

    }

    else if (type == 4) {
      return date.split('T')[0] + ' ' + date.split('T')[1].split('+')[0];
    }
    else {
      return date.split('T')[0];
    }
};

// export default boot(({ app }) => {
//   // Set i18n instance on app
//   app.use(formatDate);
// });

export { formatDate };



const convertDateToString = function (date) {
  ////console.log(date,date.split('')[4] +date.split('')[5])
  switch (date.split('')[4] + date.split('')[5]) {
    case '01':
      return 'Janvier';
    case '02':
      return 'Fevrier';
    case '03':
      return 'Mars';
    case '04':
      return 'Avril';
    case '05':
      return 'Mai';
    case '06':
      return 'Juin';
    case '07':
      return 'Juillet';
    case '08':
      return 'Aout';
    case '09':
      return 'Septembre';
    case '10':
      return 'Octobre';
    case '11':
      return 'Novembre';
    case '12':
      return 'Decembre';


    default:
      break;
  }

};

// export default boot(({ app }) => {
//   // Set i18n instance on app
//   app.use(convertDateToString);
// });

export { convertDateToString };


const convertDateToString2 = function (date_str) {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let j = date_str.split(" ")[0]
  //  let h = date_str.split(" ")[1]
  let temp_date = j.split("-");
  return temp_date[2] + " " + months[Number(temp_date[1]) - 1] + " " + temp_date[0]/*  + " " +h */;
}



export { convertDateToString2 };