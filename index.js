const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

//register endpoint




app.listen(PORT,()=>
{
 console.log(`app is listening on port ${PORT}`);
})
