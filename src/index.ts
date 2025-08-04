import app from './app';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT};${process.env.PORT}`);
});
