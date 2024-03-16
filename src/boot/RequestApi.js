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
   * Status  Mission
   *
   *
   */
  /**
   *
   * @param {*}
   * @returns
   */
  statusMission = async (data) => {
    // //console.log('sdddsd');
    let dataRes = { status: true };

    await api
      .post(this.ApiEndPoint.missions + "/status", data)
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
  ListMission = async (data) => {
    let dataRes = { status: true };

    await api
      .get(this.ApiEndPoint.missions, data)
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
   * Start controller de bureau
   *
   *
   */
  /**
   *
   * @param {*}
   * @returns
   */
  SetCTerrain = async (data) => {
    // //console.log('sdddsd');
    let dataRes = { status: true };

    await api
      .post(this.ApiEndPoint.employe + "/set-cterrain", data)
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
  ActivateBiker = async (data) => {
    // //console.log('sdddsd');
    let dataRes = { status: true };

    await api
      .post(this.ApiEndPoint.employe + "/activate-biker", data)
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
  AffectBikerToMission = async (data) => {
    // //console.log('sdddsd');
    let dataRes = { status: true };

    await api
      .post(this.ApiEndPoint.employe + "/affect-biker", data)
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
  UnAffectBikerToMission = async (data) => {
    // //console.log('sdddsd');
    let dataRes = { status: true };

    await api
      .post(this.ApiEndPoint.employe + "/unaffect-biker", data)
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
  NewControlBiker = async (data) => {
    // //console.log('sdddsd');
    let dataRes = { status: true };

    await api
      .post(this.ApiEndPoint.employe + "/new-control", data)
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
  getMissionsSessionList = async () => {
    // //console.log('sdddsd');
    let dataRes = { status: true, data: [] };

    await api
      .get(this.ApiEndPoint.employe + "/list-mission-session")
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
   * @param {*}
   * @returns
   */
  getMissionsControlList = async () => {
    // //console.log('sdddsd');
    let dataRes = { status: true, data: [] };

    await api
      .get(this.ApiEndPoint.employe + "/list-control")
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
   * @param {*}
   * @returns
   */
  AnnulControlBiker = async (data) => {
    // //console.log('sdddsd');
    let dataRes = { status: true };

    await api
      .post(this.ApiEndPoint.employe + "/annul-control", data)
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
  ActiveControlBiker = async (data) => {
    // //console.log('sdddsd');
    let dataRes = { status: true };

    await api
      .post(this.ApiEndPoint.employe + "/active-control", data)
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
  ListMissionemploye = async (data) => {
    // //console.log('sdddsd');
    let dataRes = { status: true };

    await api
      .get(this.ApiEndPoint.employe + "/list-control", data)
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

  /////

  /**
   *
   * @returns retourne les  biker
   */
  getListBiker = async () => {
    let dataRes = { status: true, data: [] };

    await api
      .get("/biker/read")
      .then(async (response) => {
        dataRes = {
          status: true,
          data: response.data.data,
        };
      })
      .catch(() => {
        dataRes = {
          status: false,
          data: [],
        };
      });

    return dataRes;
  };
  /**
   *
   * @returns retourne les  cTerrain
   */
  getListCTerrain = async () => {
    let dataRes = { status: true, data: [] };

    await api
      .get("/cTerrain/read")
      .then(async (response) => {
        dataRes = {
          status: true,
          data: response.data.data,
        };
      })
      .catch(() => {
        dataRes = {
          status: false,
          data: [],
        };
      });

    return dataRes;
  };
  /**
   *
   
   * @returns retourne les  employe
   */
  getListemploye = async () => {
    let dataRes = { status: true, data: [] };

    await api
      .get("/employe/read")
      .then(async (response) => {
        dataRes = {
          status: true,
          data: response.data.data,
        };
      })
      .catch(() => {
        dataRes = {
          status: false,
          data: [],
        };
      });

    return dataRes;
  };
  /**
   *
   
   * @returns retourne les  admin
   */
  getListAdmin = async () => {
    let dataRes = { status: true, data: [] };

    await api
      .get("/admin/read")
      .then(async (response) => {
        dataRes = {
          status: true,
          data: response.data.data,
        };
      })
      .catch(() => {
        dataRes = {
          status: false,
          data: [],
        };
      });

    return dataRes;
  };
  /**
   *
   * @param {*}  data les informations du affectLivreur
   * @returns  les informations actualisees
   */
  affectLivreur = async (data) => {
    let dataRes = { status: true, data: [] };

    await api
      .patch(this.ApiEndPoint.livraisons + "/affect_livreur", data)
      .then(async (response) => {
        dataRes = {
          status: true,
          data: response.data.data,
        };
      })
      .catch(() => {
        dataRes = {
          status: false,
          data: [],
        };
      });
    //console.log(dataRes)
    return dataRes;
  };

  /**
   *
   * @param {*}
   * @returns
   */
  NewSecteur = async (data) => {
    // //console.log('sdddsd');
    let dataRes = { status: true };

    await api
      .post(this.ApiEndPoint.secteur + "/new", data)
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
  ListSecteur = async (data) => {
    let dataRes = { status: true };

    await api
      .get(this.ApiEndPoint.secteur + "/read", data)
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
}
