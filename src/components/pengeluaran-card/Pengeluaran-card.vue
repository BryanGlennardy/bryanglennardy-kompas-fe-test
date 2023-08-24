<template>
  <div class="container pengeluaran__container">
    <div
      class="card__item"
      v-for="(itemsByDate, tanggal) in items"
      :key="tanggal"
    >
      <h2 class="card__title">{{ formatDate(tanggal) }}</h2>
      <div class="card__row" v-for="item in itemsByDate" :key="item.id">
        <div class="item__name">
          <h4>{{ item.jam }}</h4>
          <h4>{{ item.nama }}</h4>
        </div>
        <div>
          <h4>Rp {{ formatCurrency(item.pengeluaran) }}</h4>
        </div>
      </div>

      <div class="total__price">
        <h3>Total</h3>
        <h3>Rp {{ formatCurrency(calculatedTotal(itemsByDate)) }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import moment from "moment";
import "moment/dist/locale/id";
import "./pengeluaran-card.css";
export default {
  computed: {
    ...mapState(["items"]),
    ...mapGetters(["formatCurrency"]),
    ...mapActions(["fetchItems"]),
  },
  mounted() {
    // Untuk memanggil data yang ada pada json
    this.$store.dispatch("fetchItems");
  },
  methods: {
    // Fungsi untuk menampilkan tanggal sesuai format
    formatDate(tanggal) {
      return moment(tanggal, "DD MMMM YYYY").locale("id").format("DD MMMM");
    },

    // Fungsi untk menghitung total dari pengeluaran per hari
    calculatedTotal(items) {
      let total = 0;
      items.forEach((item) => {
        total += item.pengeluaran;
      });

      return total;
    },
  },
};
</script>

<style></style>
