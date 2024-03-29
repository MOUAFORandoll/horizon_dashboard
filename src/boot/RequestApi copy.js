/* eslint-disable prettier/prettier */
import { api } from "./axios";
import { ApiEndPoint } from "./ApiEndPoint";
// import VueCookies from 'vue-cookies'
import jwt_decode from "jwt-decode";
import { useMainStore } from "@/stores/main";

// import { ref } from '@vue/runtime-core';
export class RequestApi {
  constructor() {
    this.clientId = 0; // VueCookies.get('id');
    this.number = 0; //VueCookies.get('phone');
    this.ApiEndPoint = new ApiEndPoint();
  }

  // Sanction bloc

  /**
   *
   *
   * Start sanction part
   *
   *
   */
  /**
   *
   * @param {*}
   * @returns
   */
  listSanctionEmploye = async () => {
    let dataRes = { status: true };

    await api
      .get(this.ApiEndPoint.api_sanctionsemployes)
      .then(async (response) => {
        if (response.status == 201 || response.status == 200) {
          dataRes = {
            status: true,
            data: response.data,
          };
        } else {
          dataRes = {
            status: false,
          };
        }
      })
      .catch(() => {
        dataRes = {
          status: false,
        };
      });
    return dataRes;
  };

  /**
   *
   *
   * Start sanction part
   *
   *
   */
  /**
   *
   * @param {*}
   * @returns
   */
  listSanctionEmployeFilter = async (employe) => {
    let dataRes = { status: true };

    await api
      .get(this.ApiEndPoint.api_sanctionsemployes + "?employe=" + employe)
      .then(async (response) => {
        if (response.status == 201 || response.status == 200) {
          dataRes = {
            status: true,
            data: response.data,
          };
        } else {
          dataRes = {
            status: false,
          };
        }
      })
      .catch(() => {
        dataRes = {
          status: false,
        };
      });
    return dataRes;
  };
  /**
   *
   *
   * Start sanction part
   *
   *
   */
  /**
   *
   * @param {*}
   * @returns
   */
  newSanction = async (data) => {
    let dataRes = { status: true };

    await api
      .post(this.ApiEndPoint.sanctions, data)
      .then(async (response) => {
        if (response.status == 201 || response.status == 200) {
          dataRes = {
            status: true,
            data: response.data,
          };
        } else {
          dataRes = {
            status: false,
          };
        }
      })
      .catch(() => {
        dataRes = {
          status: false,
        };
      });
    return dataRes;
  };

  /**
   *
   * @param {*}
   * @returns
   */
  listSanction = async () => {
    let dataRes = { status: true };

    await api
      .get(this.ApiEndPoint.sanctions)
      .then(async (response) => {
        if (response.status == 201 || response.status == 200) {
          dataRes = {
            status: true,
            data: response.data,
          };
        } else {
          dataRes = {
            status: false,
          };
        }
      })
      .catch(() => {
        dataRes = {
          status: false,
        };
      });
    return dataRes;
  };

  /**
   *
   * @param {*}
   * @returns
   */
  giveSanction = async (data) => {
    // //console.log('sdddsd');
    let dataRes = { status: true };

    await api
      .post(this.ApiEndPoint.api_sanctionsemployes, data)
      .then(async (response) => {
        if (response.status == 201 || response.status == 200) {
          dataRes = {
            status: true,
          };
        } else {
          dataRes = {
            status: false,
          };
        }
      })
      .catch(() => {
        dataRes = {
          status: false,
        };
      });
    return dataRes;
  };
}
