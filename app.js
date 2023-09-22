const express = require('express');
const app = express();

// Serve static files (including HTML and CSS) from the "public" directory
app.use(express.static('public'));

// ... other routes and middleware ...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
