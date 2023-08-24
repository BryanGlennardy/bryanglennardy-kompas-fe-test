<template>
  <header>
    <div class="container header__container">
      <h1>Diari Jajan Agustus 2023</h1>
      <h3>Pengeluaran Bulan Ini Rp {{ formatCurrency(totalPengeluaran) }}</h3>
      <button @click="openModal" class="btn btn-primary btn-hover">
        TAMBAH ITEM
      </button>
      <Modal :show="isModalOpen" @close="closeModal" @add="addNewItem"></Modal>
    </div>
  </header>
</template>

<script>
import axios from "axios";
import { mapActions, mapState, mapGetters } from "vuex";
import "./headerHome.css";
import Modal from "../modals/Modal.vue";
export default {
  components: {
    Modal,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },

  computed: {
    ...mapGetters(["formatCurrency"]),
    ...mapState(["items"]),
    ...mapActions(["fetchItems"]),

    // Fungsi untuk menghitung total pengeluaran 1 seluruh pengeluaran
    totalPengeluaran() {
      let total = 0;
      Object.values(this.items).forEach((date) => {
        date.forEach((item) => {
          total += item.pengeluaran;
        });
      });
      return total;
    },
  },
  methods: {
    // Fungsi untuk membuka dan menutup modal
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },

    // Fungsi untuk melakukan penambahan item baru
    async addNewItem(newItem) {
      try {
        await axios.post("http://localhost:3000/detail", newItem);

        this.$store.dispatch("fetchItems");
        this.closeModal();
      } catch (error) {
        console.error("Gagal menambahkan item:", error);
      }
    },
  },
};
</script>
