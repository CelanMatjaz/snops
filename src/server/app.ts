import * as express from 'express';
import * as path from 'path';
import cors from 'cors';

const app = express.default();

const isProd = process.env.NODE_ENV === 'production';

const publicPath = path.join(
  path.resolve('./'),
  isProd ? '/public' : '/build/debug/public'
);

const htmlPath = path.join(publicPath, 'index.html');

app.use(cors());
app.use('/public', express.static(publicPath));

app.get('/yes', (req, res) => res.send('yes'));
app.get('*', (req, res) => res.sendFile(htmlPath));

export default app;
