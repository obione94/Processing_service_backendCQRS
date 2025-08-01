// processing_service/index.js
const express = require('express');
const cors = require('cors');
const { EventEmitter } = require('events');
const app = express();
const PORT = 4000;
const corsOptions = {
  origin: ['https://obione94.github.io/flutterWeb','https://api-gateaway-backend-cqrs.onrender.com'],
  credential:true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

// Gestionnaire global d'événements SSE
const sseEmitter = new EventEmitter();
app.locals.sseClients = new Set(); // Pour gérer connexions SSE clientes

app.get('/healthz', async (req, res) => {
   // Répondre immédiatement au front avec l'UID
    res.status(202).json({
      status: 'accepted',
      message: 'alive',
    });
});


// Endpoint SSE pour le front
app.get('/sse', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.flushHeaders();

  const clientId = Date.now();
  app.locals.sseClients.add(res);

  // Retirer client si déconnecté
  req.on('close', () => {
    app.locals.sseClients.delete(res);
  });
});

// Méthode pour diffuser à tous les clients SSE connectés
function sendSseEvent(data) {
  const message = `data: ${JSON.stringify(data)}\n\n`;
  app.locals.sseClients.forEach((clientRes) => {
    clientRes.write(message);
  });
}

// Simule récupération paginée dans une "base de données"
function getPaginatedItems(page, pageSize, filters) {
  const totalItems = 25;
  const allItems = Array.from({ length: totalItems }, (_, i) => ({
    id: `item-${i + 1}`,
    title: `Book ${i + 1}`,
    category: 'books',
    price: 10 + i,
  }));

  // Pagination simple
  const start = (page - 1) * pageSize;
  const paginatedItems = allItems.slice(start, start + pageSize);

  return {
    totalItems,
    items: paginatedItems,
    page,
    pageSize,
  };
}

// Réception des commandes du Backend1
app.post('/command', (req, res) => {
  const { uid, command, page, pageSize, filters } = req.body;

  if (command === 'fetchPaginatedItems') {
    // Simuler un délai asynchrone (ex : accès BDD)
    setTimeout(() => {
      const result = getPaginatedItems(page, pageSize, filters);
      sendSseEvent({
        uid,
        status: 'success',
        ...result,
      });
    }, 1000); // 1 seconde de délai pour simuler travail asynchrone

    res.status(202).json({ status: 'processing' });
  } else {
    res.status(400).json({ error: 'Commande inconnue' });
  }
});

app.listen(PORT, () => {
  console.log(`processing_service écoute sur le port ${PORT}`);
});
