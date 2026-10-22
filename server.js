const app = require('./app');
const { connectMongo } = require('./config/mongo');

const PORT = process.env.PORT || 3000;
connectMongo().catch(err => console.error('MongoDB connection failed:', err));
app.listen(PORT, () => console.log(`Campus Eats running at http://localhost:${PORT}`));
