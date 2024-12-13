<template>
    <div class="bg-dark text-light">

      <header class="header py-5 text-center text-white">
        <h1 class="header-title">
          <img src="./assets/logo.png" alt="Logo" class="header-logo">
          <i class="fa-solid fa-pizza-slice"></i> Pizzeria Fantasia
        </h1>
        <router-link to="/naruci" class="order-button">Naruči</router-link>
        <p class="header-text">
          U našoj pizzeriji možete uživati u mnoštvu raznovrsnih pizza pečenih u krušnoj peći spravljenih od odležanog tijesta pri čemu koristimo samo najbolje i najsvježije sastojke.<br>
          U ponudi imamo i pizze od bezglutenskog tijesta. Napravite svoj izbor i uživajte u našim pizzama.
        </p>
      </header>
  
 
      <main class="container my-5">
        <div class="row">
          <div class="col-md-4 mb-4" v-for="pizza in pizze" :key="pizza._id">
            <div class="card">
              <img 
                :src="pizza.slika" 
                class="card-img-top" 
                :alt="pizza.naziv"
              >
              <div class="card-body">
                <h5 class="card-title">{{ pizza.naziv }}</h5>
                <p class="card-text"><strong>Veličine:</strong></p>
                <ul>
                  <li v-if="pizza.velicine?.mala">Mala: {{ pizza.velicine.mala.cijena }} {{ pizza.velicine.mala.valuta }}</li>
                  <li v-if="pizza.velicine?.srednja">Srednja: {{ pizza.velicine.srednja.cijena }} {{ pizza.velicine.srednja.valuta }}</li>
                  <li v-if="pizza.velicine?.velika">Velika: {{ pizza.velicine.velika.cijena }} {{ pizza.velicine.velika.valuta }}</li>
                </ul>
                <p class="card-text">
                  <strong>Sastojci:</strong> {{ pizza.sastojci.join(', ') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
  
    
      <footer class="footer py-4 text-center text-white">
        <p>Moira Čekada</p>
      </footer>
    </div>
</template>
  
<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      pizze: [] 
    };
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:3073/pizze");
      this.pizze = response.data;
    } catch (error) {
      console.error("Greška pri dohvaćanju podataka:", error);
    }
  }
};
</script>
  
<style>

.bg-dark {
  background-color: #3f0000;
}
.text-light {
  color: #fff;
}


.header {
  background-color: #303b4af9;
  color: #fff;
  position: relative;
  padding-top: 20px;
}

.header-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.header-text {
  margin-top: 15px;
  font-size: 1.2rem;
  line-height: 1.8;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.order-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #5b626cf9; 
  color: #eae6e6;
  font-size: 1.2rem; 
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
}

.order-button:hover {
  background-color: #6e6680; 
  color: #fff;
}


.footer {
  background-color: #303b4af9;
  color: #fff;
}


.card {
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease;
  background-color: #fff;
  color: #000;
}

.card:hover {
  transform: translateY(-10px);
}

.card-body {
  padding: 20px;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}


.col-md-4 {
  padding: 15px;
}
.header-title {
  display: flex;
  align-items: center; 
  justify-content: center; 
  gap: 15px; 
}

.header-logo {
  height: 130px;
  width: auto; 
}
</style>
