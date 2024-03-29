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

  /**
   *
   * @param {*} data   les donnees de l'utilisateur pour se connecter
   * @returns
   */
  logIn = async (data) => {
    // //console.log('sdddsd');
    let dataRes = { status: true };

    const mainStore = useMainStore();
    api.defaults.headers.common["Authorization"] = null;
    await api
      .post(this.ApiEndPoint.login, data)
      .then(async (response) => {
        let id = jwt_decode(String(response.data.token)).id;
        // let keySecret = jwt_decode(String(response.data.token)).keySecret;
        console.log(response.data);
        mainStore.setUser(response.data);

        dataRes = {
          status: true,
          id: id,
        };
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
   * Start  Mission
   *
   *
   */
  /**
   *
   * @param {*}
   * @returns
   */
  creerEmploye = async (data) => {
    // //console.log('sdddsd');
    let dataRes = { status: true, message: "" };

    await api
      .post(this.ApiEndPoint.employe, data)
      .then(async (response) => {
        if (response.status == 201 || response.status == 200) {
          dataRes = {
            status: true,
          };
        } else {
          dataRes = {
            status: true,
            message: response.data["message"],
          };
        }
      })
      .catch(() => {
        dataRes = {
          status: false,
          message: "",
        };
      });
    return dataRes;
  };

  /**
   *
   * @param {*}
   * @returns
   */
  listEmploye = async () => {
    let dataRes = { status: true };

    await api
      .get(this.ApiEndPoint.employe)
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
  listEmployeSecond = async () => {
    let dataRes = { status: true };

    await api
      .get(this.ApiEndPoint.employe_second)
      .then(async (response) => {
        if (response.status == 201 || response.status == 200) {
          dataRes = {
            status: true,
            data: response.data.data,
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
   * Start  Employer
   *
   *
   */
  /**
   *
   * @param {*}
   * @returns
   */
  marquerAbesent = async (data) => {
    // //console.log('sdddsd');
    let dataRes = { status: true };

    await api
      .post(this.ApiEndPoint.absences, data)
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

  /**
   *
   * @param {*}
   * @returns
   */
  creerPaiement = async (data) => {
    // //console.log('sdddsd');
    let dataRes = { status: true, message: "" };

    await api
      .post(this.ApiEndPoint.paiement, data)
      .then(async (response) => {
        if (response.status == 201 || response.status == 200) {
          dataRes = {
            status: true,
          };
        } else {
          dataRes = {
            status: true,
            message: response.data["message"],
          };
        }
      })
      .catch(() => {
        dataRes = {
          status: false,
          message: "",
        };
      });
    return dataRes;
  };

  /**
   *
   * @param {*}
   * @returns
   */
  listPaiement = async () => {
    let dataRes = { status: true };

    await api
      .get(this.ApiEndPoint.paiement)
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
  listMois = async () => {
    let dataRes = { status: true };

    await api
      .get(this.ApiEndPoint.mois)
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
   * Start poste part
   *
   *
   */
  /**
   *
   * @param {*}
   * @returns
   */
  listPosteEmploye = async () => {
    let dataRes = { status: true };

    await api
      .get(this.ApiEndPoint.api_postesemployes)
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
   * Start poste part
   *
   *
   */
  /**
   *
   * @param {*}
   * @returns
   */
  listPosteEmployeFilter = async (employe) => {
    let dataRes = { status: true };

    await api
      .get(this.ApiEndPoint.api_postesemployes + "?employe=" + employe)
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
   * Start poste part
   *
   *
   */
  /**
   *
   * @param {*}
   * @returns
   */
  newPoste = async (data) => {
    let dataRes = { status: true };

    await api
      .post(this.ApiEndPoint.postes, data)
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
  listPoste = async () => {
    let dataRes = { status: true };

    await api
      .get(this.ApiEndPoint.postes)
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
  listTypePoste = async () => {
    let dataRes = { status: true };

    await api
      .get(this.ApiEndPoint.type_postes)
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
  affectToPoste = async (data) => {
    // //console.log('sdddsd');
    let dataRes = { status: true };

    await api
      .post(this.ApiEndPoint.api_postesemployes, data)
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
