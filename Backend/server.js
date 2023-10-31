// const express = require('express');
// const axios = require('axios');
// const app = express();
// const port = process.env.PORT || 5000;
// // const {Configuration, OpenAIApi} = require('openai')


// // Handle CORS for local development (you can configure this for your needs)
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

// // API route to fetch a random quote
// app.get('/api/quote', async (req, res) => {
//   try {
//     // Fetch a random quote from ChatGPT API (replace with your API key)
//     const response = await axios.post(
//       'https://api.openai.com/v1/engines/text-davinci-002/completions',
//       {
//         prompt: 'Generate a random quote.',
//         max_tokens: 50, // Adjust the number of tokens as needed
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${process.env.API_KEY}`, 
//         },
//       }
//     );

//     // Extract the generated text
//     const quote = response.data.choices[0].text;

//     // Respond with the quote
//     res.json({ quote });
//     // console.log(quote)
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch a quote' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require("express");
const dotenv = require('dotenv').config();
const  OpenAI  = require("openai");
const rateLimit = require('express-rate-limit');

const openai= new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // Limit to 100 requests per hour
});

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use('/api/quote', apiLimiter);

app.get("/api/quote", async (req, res) => {
  const completion = await openai.completions.create({
    model: "text-davinci-003",
    prompt: "Generate a quote.",
    max_tokens: 50,
  });
  const quote = completion.data.choices[0].text;
  res.json({ quote });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
