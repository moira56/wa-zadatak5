import express from 'express';
import cors from 'cors'; // Dodano za CORS
import { connectToDatabase } from './db.js';

const app = express();
const PORT = 3051;

// Middleware za JSON parsiranje
app.use(express.json());

// Middleware za omogućavanje CORS-a
app.use(cors());

// Povezivanje s MongoDB-om
const db = await connectToDatabase();

// Glavna ruta za provjeru rada servera
app.get('/', (req, res) => {
    res.send('Pizza aplikacija radi!');
});

// Endpoint za dohvaćanje svih pizza
app.get('/pizze', async (req, res) => {
    try {
        const pizzeCollection = db.collection('pizze');
        const pizze = await pizzeCollection.find().toArray();
        res.status(200).json(pizze);
    } catch (error) {
        res.status(500).json({ message: 'Greška pri dohvaćanju podataka', error });
    }
});

// Endpoint za dodavanje nove pizze
app.post('/pizze', async (req, res) => {
    const { naziv, cijena, sastojci, slika } = req.body;

    // Validacija obaveznih polja
    if (!naziv || !cijena || !sastojci || !slika) {
        return res.status(400).json({ message: 'Sva polja (naziv, cijena, sastojci, slika) su obavezna' });
    }

    // Validacija cijene (mora biti broj veći od 0)
    if (typeof cijena !== 'number' || cijena <= 0) {
        return res.status(400).json({ message: 'Cijena mora biti broj veći od 0' });
    }

    // Validacija sastojaka (mora biti niz stringova)
    if (!Array.isArray(sastojci) || !sastojci.every(s => typeof s === 'string')) {
        return res.status(400).json({ message: 'Sastojci moraju biti niz stringova' });
    }

    // Validacija slike (mora biti string)
    if (typeof slika !== 'string') {
        return res.status(400).json({ message: 'Polje slika mora biti string' });
    }

    try {
        const pizzeCollection = db.collection('pizze');
        const novaPizza = { naziv, cijena, sastojci, slika }; // Dodano polje slika
        await pizzeCollection.insertOne(novaPizza);
        res.status(201).json({ message: 'Pizza uspješno dodana', pizza: novaPizza });
    } catch (error) {
        res.status(500).json({ message: 'Greška pri dodavanju pizze', error });
    }
});


// Pokretanje servera
app.listen(PORT, () => {
    console.log(`Server radi na http://localhost:${PORT}`);
});
