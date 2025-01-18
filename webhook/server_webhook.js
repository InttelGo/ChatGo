const express = require('express');
const app = express();

app.use(express.json());

// Verificación del Webhook
app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = 'ChatGo_API';
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verificado');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Recepción de eventos
app.post('/webhook', (req, res) => {
  console.log('Evento recibido:', req.body);
  res.status(200).send('Evento recibido');
});

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));


/*const express = require('express');
const body_parser = require('body-parser');

const app = express();
const PORT  = 21;//puerto de ejemplo, se debe asignar otro


//Configuracion de la Api de Whatsapp

const VERIFY_TOKEN = "ChatGo_API"; // falta eltoken de verificacion

//Mildlaware para procesar datos JSON
app.use(body_parser.json());


//Ruta para verificar el Webhook
app.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];


    if(mode && token === VERIFY_TOKEN)
    {
        console.log("Webhook verificado correctamente.");
        res.status(200).send(challenge);//responder con el desafio enviado por Meta
    }else
    {
        res.status(403).send("No se pudo verificar el webhook.");
    }
});

//Ruta para manejar las entradas de Whatsapp
app.post("/webhook", (req,res)=>
{
    const body = req.body;

    //Verificar que el evento sea de mensaje
    if(body.object === "whatsapp_business_account")
    {
        const entry = body.entry[0];
        const changes = entry.changes[0];
        const messages = changes.value.messages;

        if(messages)
        {
            const message = messages[0]
            const from = message.from;// Numero telefonico del remitente
            const text = message.text.body; // Contenido del mensaje
            
            console.log(`Mensaje recibido de: ${from}: ${text}`);
            
            //En esta parte debemos procesar, responder o guardar el mensaje en BD el mensaje de whastapp(Pendiente)
        }
        res.status(200).send("Evento recibido");
    }else
    {
        res.status(404).send("No se ha encontrado el evento.");
    }
});

//Iniciar el Servidor
app.listen(PORT, ()=>
{
    console.log(`Servidor corriendo en puerto ${PORT}`); 
});*/