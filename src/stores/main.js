import { defineStore } from "pinia";
import jwt_decode from "jwt-decode";
import axios from "axios";
export const useMainStore = defineStore("main", {
  state: () => ({
    nom: null,
    email: null,
    phone: null,
    id: null,
    userAvatar: null,
    token: null,
    refreshToken: null, // Ajout de la propriété pour la durée de vie du token

    isFieldFocusRegistered: false,

    clients: [],
    history: [],
    listAgregator: [],
    listProjet: [],
    listLivraisons: [],
  }),
  actions: {
    setUser(data) {
      let payload = jwt_decode(data.token);
      console.log(payload);
      if (payload.nom) {
        this.nom = payload.nom;
        console.log(this.nom);
        localStorage.setItem("nom", this.nom + " " + payload.prenom);
      }
      if (payload.id) {
        this.id = payload.id;
        localStorage.setItem("id", this.id);
      }
      if (payload.phone) {
        this.phone = payload.phone;
        localStorage.setItem("phone", this.phone);
      }
      if (payload.email) {
        this.email = payload.email;
        localStorage.setItem("email", this.email);
      }

      this.userAvatar =
        "https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93";

      localStorage.setItem("userAvatar", this.userAvatar);

      if (data.token) {
        this.token = data.token;
        this.refreshToken = data.refreshToken;
        console.log(data.token);
        localStorage.setItem("token", this.token);
        localStorage.setItem("refreshToken", this.refreshToken);
      }
    },
    clear() {
      this.nom = null;
      this.email = null;
      this.token = null;
      this.phone = null;
      this.id = null;
      this.token = null;
      this.refreshToken = null;
      localStorage.clear();
    },
    onCreated() {
      localStorage.setItem(
        "userAvatar",
        "https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93"
      );

      // Récupérer les informations de l'utilisateur à partir du localStorage
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
      const nom = localStorage.getItem("nom");

      const phone = localStorage.getItem("phone");
      const email = localStorage.getItem("email");
      const userAvatar = localStorage.getItem("userAvatar");

      // Mettre à jour les informations de l'utilisateur dans le store
      console.log(token);
      if (token != null) {
        this.setUser({
          token: localStorage.getItem("token"),
          refreshToken: localStorage.getItem("refreshToken"),
        });
        this.setToken(token, refreshToken);
      }
    },
    setToken(token, refreshToken) {
      this.token = token;
      this.refreshToken = refreshToken;
    },
    isTokenValid() {
      if (this.token && this.refreshToken) {
        const now = new Date();
        const expirationDate = new Date(this.refreshToken);
        return now < expirationDate;
      }
      return false;
    },
    fetch(sampleDataKey) {
      axios
        .get(`data-sources/${sampleDataKey}.json`)
        .then((r) => {
          if (r.data && r.data.data) {
            this[sampleDataKey] = r.data.data;
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
});
