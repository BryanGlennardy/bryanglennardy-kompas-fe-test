<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <h2>Tambah Entri</h2>
      <form @submit.prevent="submitForm">
        <label for="name">Nama</label>
        <input
          type="text"
          id="nama"
          v-model="formData.nama"
          placeholder="Nama"
          required
        />

        <label for="price">Harga</label>
        <input
          type="number"
          id="harga"
          v-model="formData.harga"
          placeholder="Harga"
          required
        />
        <div class="btn-modal">
          <button
            @click="closeModal"
            class="btn btn-primary btn-hover btn-batal"
          >
            BATAL
          </button>
          <button @click="submitForm" class="btn btn-primary btn-hover">
            KIRIM
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "moment/dist/locale/id";
import "./modal.css";
export default {
  props: {
    show: Boolean,
  },
  data() {
    return {
      formData: {
        nama: "",
        harga: "",
      },
    };
  },
  methods: {
    //Fungsi untuk menutup modal
    closeModal() {
      this.$emit("close");
      this.resetForm();
    },

    // Fungsi untuk melakukan submit beserta data didalamnya
    submitForm() {
      const newItem = {
        jam: moment().format("HH:mm"),
        tanggal: moment().locale("id").format("DD MMMM YYYY"),
        nama: this.formData.nama,
        pengeluaran: this.formData.harga,
      };
      if (!this.formData.nama || !this.formData.harga) {
        alert("Terdapat input yang kosong atau salah");
        return;
      }
      this.$emit("add", newItem);
      console.log(newItem);
      this.resetForm();
      this.closeModal();
    },

    //Fungsi untuk mereset input field pada form
    resetForm() {
      this.formData.nama = "";
      this.formData.harga = "";
    },
  },
};
</script>
