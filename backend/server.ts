<<<<<<< HEAD
<<<<<<< HEAD
import app from "./src/app.ts";
=======
import app from "./src/app";
>>>>>>> origin/main
=======
import app from './src/app';
>>>>>>> parent of 9f4a98a (Merge pull request #6 from MiniMinaa/feature/frontendSetup)

const port = Number(process.env.PORT ?? 4000);

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
