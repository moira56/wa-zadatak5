import express from 'express';
import cors from 'cors'; 
import { connectToDatabase } from './db.js';

const app = express();
const PORT = 3030;


app.use(express.json());
app.use(cors());


const db = await connectToDatabase();


app.get('/', (req, res) => {
    res.send('Pizza aplikacija radi!');
});


app.get('/pizze', async (req, res) => {
    try {
        const pizzeCollection = db.collection('pizze');
        const pizze = await pizzeCollection.find().toArray();
        res.status(200).json(pizze);
    } catch (error) {
        console.error('Greška pri dohvaćanju pizza:', error);
        res.status(500).json({ message: 'Greška pri dohvaćanju podataka', error });
    }
});


app.post('/narudzba', async (req, res) => {
    const narudzbaCollection = db.collection('narudzbe');
    const pizzaCollection = db.collection('pizze');

    const { ime, adresa, telefon, pizza_stavke } = req.body;

 
    if (!ime || !adresa || !telefon || !pizza_stavke) {
        return res.status(400).json({ error: 'Sva polja (ime, adresa, telefon, pizza_stavke) su obavezna.' });
    }


    if (!telefon.trim() || isNaN(telefon)) {
        return res.status(400).json({ error: 'Broj telefona mora biti ispravan broj.' });
    }


    const dostupnePizze = await pizzaCollection.find().toArray();
    const neispravneStavke = pizza_stavke.filter(stavka => {
        return (
            !stavka.naziv ||
            !stavka.kolicina ||
            !stavka.velicina ||
            !Number.isInteger(stavka.kolicina) ||
            stavka.kolicina <= 0 ||
            !['mala', 'srednja', 'velika'].includes(stavka.velicina) ||
            !dostupnePizze.some(pizza => pizza.naziv === stavka.naziv)
        );
    });

    if (neispravneStavke.length > 0) {
        return res.status(400).json({
            error: 'Neispravni podaci u stavci narudžbe.',
            neispravneStavke,
        });
    }


    const ukupnaCijena = pizza_stavke.reduce((sum, stavka) => {
        const pizza = dostupnePizze.find(p => p.naziv === stavka.naziv);
        return sum + (pizza.cijena || 0) * stavka.kolicina;
    }, 0);

    const novaNarudzba = {
        ime,
        adresa,
        telefon,
        pizza_stavke,
        ukupna_cijena: ukupnaCijena,
        datum: new Date(),
    };

    try {
        await narudzbaCollection.insertOne(novaNarudzba);
        res.status(201).json({ message: 'Narudžba uspješno dodana.', narudzba: novaNarudzba });
    } catch (error) {
        console.error('Greška pri dodavanju narudžbe:', error);
        res.status(500).json({ error: 'Greška pri dodavanju narudžbe.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server radi na http://localhost:${PORT}`);
});
