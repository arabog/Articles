const express = require('express');
const cors = require('cors');
const authRouter = require('./routers/auth');
const studentsRouter = require('./routers/student');


require('./db');


const app = express();
const PORT = process.env.PORT || 3050;


app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(studentsRouter);


app.get('/', async (req, res) => {
          await res.send('School Articles');
});


app.listen(PORT, () => {
          console.log(`Server started on port: ${PORT}`)
});
