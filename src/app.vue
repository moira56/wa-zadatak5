<template>
    <div id="app" class="bg-dark text-light">
      <!-- Header -->
      <header class="header py-5 text-center text-white">
        <h1>
          <i class="fa-solid fa-pizza-slice"></i> Pizzeria Fantasia
        </h1>
        <p class="header-text">
          U našoj pizzeriji možete uživati u mnoštvu raznovrsnih pizza pečenih u krušnoj peći spravljenih od odležanog tijesta pri čemu koristimo samo najbolje i najsvježije sastojke.<br>
          U ponudi imamo i pizze od bezglutenskog tijesta. Napravite svoj izbor i uživajte u našim pizzama.
        </p>
      </header>
  
      <!-- Glavni dio -->
      <main class="container my-5">
        <div class="row">
          <div class="col-md-4 mb-4" v-for="pizza in pizze" :key="pizza._id">
            <div class="card">
              <!-- Prikaz slike -->
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
  
      <!-- Footer -->
      <footer class="footer py-4 text-center text-white">
        <p>Moira Čekada</p>
      </footer>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "App",
    data() {
      return {
        pizze: [] // Prazna lista za pizze
      };
    },
    async mounted() {
      try {
        const response = await axios.get("http://localhost:3052/pizze"); // Ispravan port
        console.log(response.data); // Provjera podataka
        this.pizze = response.data; // Spremi dohvaćene pizze u podatke komponente
      } catch (error) {
        console.error("Greška pri dohvaćanju podataka:", error);
      }
    }
  };
  </script>
  
  <style>
  /***** Opća pozadina *****/
  .bg-dark {
    background-color: #3f0000;
  }
  .text-light {
    color: #fff;
  }
  
  /***** Header *****/
  .header {
    background-color: #303b4af9;
    color: #fff;
  }

  .header-text {
    margin-top: 15px;
    font-size: 1.2rem;
    line-height: 1.8;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  
  /***** Footer *****/
  .footer {
    background-color: #303b4af9;
    color: #fff;
  }
  
  /***** Kartice *****/
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
  
  /***** Razmak između kartica *****/
  .col-md-4 {
    padding: 15px;
  }
  </style>
