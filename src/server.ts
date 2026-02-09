// import { router } from "./routes";
// import cors from 'cors';
// import express from "express"
// import { errorHandlerMiddleware } from "./middlewares/error-handler";
// import path from "path";



// const app = express()
// app.use(cors())
// app.use(express.json())
// app.use("/api", router)
// app.use(errorHandlerMiddleware)


// // caminho absoluto da pasta 'public'
// //const publicPath = path.join(__dirname, "..", "src", "public");
// const publicPath = path.resolve("src/public")
// app.use(express.static(publicPath));

// // rota raiz → login
// app.get("/", (req, res) => {
//   res.sendFile(
//     path.join(publicPath, "telaLogin", "login.html")
//   );
// });



// // app.listen(PORT, () => {
// //     console.log(`Servidor rodando na porta ${PORT}`)
// // })


// if (process.env.NODE_ENV !== "production") {
  
//   const PORT = process.env.PORT || 5000
//   app.listen(5000, () => {
//     console.log("Servidor rodando na porta 5000")
//   })
// }

// export default app;

import { router } from "./routes"
import cors from "cors"
import express from "express"
import { errorHandlerMiddleware } from "./middlewares/error-handler"
import path from "path"

const app = express()

app.use(cors())
app.use(express.json())

// caminho absoluto correto para Vercel + local
const publicPath = path.join(process.cwd(), "src", "public")

// servir arquivos estáticos PRIMEIRO
app.use(express.static(publicPath))

// rotas da API
app.use("/api", router)

// fallback SPA → login
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(publicPath, "telaLogin", "login.html"))
})


// middleware de erro
app.use(errorHandlerMiddleware)

// rodar servidor apenas local
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
  })
}

export default app
