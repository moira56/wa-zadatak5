<template>
  <div class="naruci-page">
    <div class="container mt-5">
      <h2 class="text-center">
        <img src="./assets/logo.png" alt="Logo" class="header-logo">
  Naruči pizzu
</h2>
      <form @submit.prevent="posaljiNarudzbu">
        <div class="form-group">
          <label for="ime">Ime</label>
          <input v-model="narudzba.ime" type="text" class="form-control" id="ime" required />
        </div>
        <div class="form-group">
          <label for="adresa">Adresa</label>
          <input v-model="narudzba.adresa" type="text" class="form-control" id="adresa" required />
        </div>
        <div class="form-group">
          <label for="telefon">Telefon</label>
          <input v-model="narudzba.telefon" type="text" class="form-control" id="telefon" required />
        </div>
  
        <div v-for="(stavka, index) in narudzba.pizza_stavke" :key="index" class="mb-3">
          <h5>Pizza {{ index + 1 }}</h5>
          <div class="form-group">
            <label for="naziv">Odaberi pizzu</label>
            <select v-model="stavka.naziv" class="form-control" required>
              <option disabled value="">Odaberite pizzu</option>
              <option v-for="pizza in pizze" :key="pizza.naziv" :value="pizza.naziv">
                {{ pizza.naziv }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="velicina">Veličina</label>
            <select v-model="stavka.velicina" class="form-control" required>
              <option disabled value="">Odaberite veličinu</option>
              <option value="mala">Mala</option>
              <option value="srednja">Srednja</option>
              <option value="velika">Velika</option>
            </select>
          </div>
          <div class="form-group">
            <label for="kolicina">Količina</label>
            <input v-model.number="stavka.kolicina" type="number" class="form-control" required />
          </div>
        </div>
  
        <button type="button" class="btn btn-success mb-3" @click="dodajStavku">Dodaj pizzu</button>
        <h4>Ukupna cijena: {{ ukupnaCijena.toFixed(2) }} €</h4>
        <button type="submit" class="btn btn-primary">Pošalji narudžbu</button>
      </form>
    </div>
  </div>
</template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "Naruci",
    data() {
      return {
        pizze: [],
        narudzba: {
          ime: "",
          adresa: "",
          telefon: "",
          pizza_stavke: [
            {
              naziv: "",
              velicina: "",
              kolicina: 1,
            },
          ],
        },
      };
    },
    computed: {
      ukupnaCijena() {
        return this.narudzba.pizza_stavke.reduce((sum, stavka) => {
          const pizza = this.pizze.find(p => p.naziv === stavka.naziv);
          if (pizza && stavka.velicina) {
            const cijenaVelicine = pizza.velicine[stavka.velicina]?.cijena; 
            return sum + (cijenaVelicine || 0) * stavka.kolicina;
          }
          return sum;
        }, 0);
      },
    },
    async mounted() {
      try {
        const response = await axios.get("http://localhost:3030/pizze");
        this.pizze = response.data;
      } catch (error) {
        console.error("Greška pri dohvaćanju pizza:", error);
      }
    },
    methods: {
      dodajStavku() {
        this.narudzba.pizza_stavke.push({
          naziv: "",
          velicina: "",
          kolicina: 1,
        });
      },
      async posaljiNarudzbu() {
        try {
          const response = await axios.post("http://localhost:3030/narudzba", this.narudzba);
          alert("Narudžba uspješno poslana!");
          console.log(response.data);
      
          this.narudzba = {
            ime: "",
            adresa: "",
            telefon: "",
            pizza_stavke: [
              {
                naziv: "",
                velicina: "",
                kolicina: 1,
              },
            ],
          };
        } catch (error) {
          console.error("Greška pri slanju narudžbe:", error);
          alert("Došlo je do greške. Pokušajte ponovno.");
        }
      },
    },
  };
  </script>
  
  <style>
.naruci-page {
  background-color: #303b4af9; 
  min-height: 100vh; 
  padding: 20px 0;
}

.naruci-page .container {
  background-color: #303b4af9; 
  border-radius: 10px; 
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); 
}

.naruci-page h2,
.naruci-page h5,
.naruci-page h4 {
  color: #ffffff; 
}

.naruci-page label {
  color: #ffffff; 
}

.naruci-page .form-control {
  background-color: #ffffff; 
  color: #303b4af9; 
  border: 1px solid #ffffff;
}

.naruci-page .form-control:focus {
  background-color: #ffffff; 
  border-color: #ffffff;
}

.naruci-page .btn-success {
  background-color: #ffffff;
  color: #303b4af9; 
}

.naruci-page .btn-primary {
  background-color: #ffffff;
  color: #303b4af9; 
}
.logo {
  height: 40px; 
  width: auto; 
  margin-left: 10px; 
  vertical-align: middle; 
}

  </style>
  