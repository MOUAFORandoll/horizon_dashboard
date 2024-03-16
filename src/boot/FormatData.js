
// import VueCookies from 'vue-cookies'
import { ref } from 'vue';


export class FormatData {



  verifNumber = function (number) {
    let taille = number.split('').length;

    for (var i = 0; i < 100 * taille; i++) {


      if (Number.isInteger(parseInt(number[i])) || number[i] == ';' || number[i] == '.') {
        // //console.log('pas modif', typeof parseInt(number[i]));

      }
      else {

        // //console.log('modifi', 'number');


        number = number.replace(number[i], '');

      }

    }
    return number.toString().replace(/\s+/g, '').replace(';;', ';');

  };

  verifTextLength = function (text, taille) {
    let final = ref('')
    let tailleT = text.split('').length;
    //console.log(tailleT,'*****************',taille)

    if (tailleT > taille) {
      for (var i = 0; i < taille; i++) {
        final.value += text[i];

      } return final.value;
    }
    else {
      return text;
    }


  };
  verifImgExist(src) {
    //console.log(src)
    const img = new Image();
    img.src = src;
    let finalImg = ref("../../assets/img/default_images1.png")
    if (img.complete) {

      //console.log('8888***')
      return src;
    } else {
      img.onload = () => {
        //console.log('sssss***')
        finalImg.value = src

      };

      img.onerror = () => {

        //console.log('errro***')
        // finalImg.value = "../../../public/assets/img/default_images1.jpg";

      };
    }
    return finalImg.value;


  }

  verifNumber2 = function (number) {
    const intt = ref(true);

    let taille = number.split('').length;

    for (var i = 0; i < taille; i++) {



      if (Number.isInteger(parseInt(number[i]))) {
        // //console.log('pas modif', typeof parseInt(number[i]));
        intt.value = true;
      }
      else {

        // //console.log('modifi', 'number');


        intt.value = false;

      }

    }
    return intt.value;

  };

  verifCorrectText = function (data) {
    var reg = new RegExp('^[a-zA-ZÀ-ú0-9 ]+$');

    return reg.test(data);

  };

  verifCorrectMail = function (data) {
    //    console.log(data,String(data)
    // .toLowerCase(), /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(String(data)
    // .toLowerCase()
    // ))

    return String(data)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

  };
};


