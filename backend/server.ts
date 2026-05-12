<<<<<<< HEAD
import app from "./src/app.ts";
=======
import app from "./src/app";
>>>>>>> origin/main

const port = Number(process.env.PORT ?? 4000);

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
