import { createStore } from "vuex";
import axios from "axios";
import moment from "moment";

export default createStore({
  state: { items: [] },

  actions: {
    //Fungsi untuk mengambil data dan menyortir sesuai tanggal
    async fetchItems({ commit }) {
      try {
        // Melakukan get data ke server
        const response = await axios.get("http://localhost:3000/detail");
        const itemGroupByDate = {};

        // Mengelompokkan item berdasarkan tanggal
        response.data.forEach((item) => {
          const tanggal = item.tanggal;
          if (!itemGroupByDate[tanggal]) {
            itemGroupByDate[tanggal] = [];
          }
          itemGroupByDate[tanggal].push(item);
        });

        // Menyortir tanggal dari paling baru ke paling lama
        const sortByDateKeys = Object.keys(itemGroupByDate).sort((a, b) => {
          const tanggalA = moment(a, "DD MMMM YYYY");
          const tanggalB = moment(b, "DD MMMM YYYY");
          return tanggalB - tanggalA;
        });

        // Memasukkan item ke dalam tanggalnya masing-masing
        const insertItemsToSortedDateKeys = sortByDateKeys.reduce(
          (sorted, tanggal) => {
            sorted[tanggal] = itemGroupByDate[tanggal];
            return sorted;
          },
          {}
        );

        commit("setItems", insertItemsToSortedDateKeys);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },

  mutations: {
    setItems(state, items) {
      state.items = items;
    },
  },

  getters: {
    formatCurrency: () => (harga) => {
      return harga.toLocaleString("id-ID");
    },
  },
});
