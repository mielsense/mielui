import { app } from './index';

const port = Number(process.env.PORT ?? 4100);
app.listen(port);
console.log(`Mielui registry listening on port ${port}`);
