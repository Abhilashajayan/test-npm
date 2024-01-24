import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import nocache from 'nocache';
import { dbConnection,verifyToken,registerUser,loginUser } from 'simple-auth-modules'

const connectionURI = 'mongodb://localhost/authservice';
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(nocache());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnection(connectionURI)
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = '';
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token missing' });
  }

  const secretKey = 'secretKey';
  const decoded = verifyToken(token, secretKey);

  if (!decoded) {
    return res.status(403).json({ error: 'Forbidden - Invalid token' });
  }

  console.log(decoded);

  next();
};

app.post('/api/order', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    const datas = await registerUser(data);
    console.log(datas);
    res.status(200).json(datas);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const secretKey = 'secretKey';
    const datas = await loginUser(username, password, secretKey);
    console.log(datas);
    res.status(200).json(datas);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server Running on ${port}`);
});
