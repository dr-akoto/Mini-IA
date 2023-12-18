const express = require("express");const connectDatabase =require("./database");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDatabase();


app.use('/patients', require('./routes/patientRoutes'));
app.use('/encounters', require('./routes/encounterRoutes'));
app.use('/vitals', require('./routes/vitalRoutes'));
app.use('/doctors', require('./routes/doctorRoutes'));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});