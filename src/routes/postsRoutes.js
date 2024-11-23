import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions =  {
  origin: "http://localhost:8000",
  optionsSucessStatus: 200
}

// Configura o armazenamento para arquivos enviados via upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório para salvar os arquivos enviados: 'uploads/'
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo enviado
    cb(null, file.originalname);
  }
});

// Cria uma instância do middleware multer utilizando a configuração de armazenamento
const upload = multer({ storage: storage });

// Função que define as rotas da aplicação
const routes = (app) => {
  // Habilita o parser JSON para lidar com requisições com corpo em formato JSON
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota GET para '/posts' - possivelmente para buscar todos os posts
  app.get("/posts", listarPosts);

  // Rota POST para '/posts' - possivelmente para criar um novo post
  app.post("/posts", postarNovoPost);

  // Rota POST para '/upload' - para realizar upload de imagem utilizando o middleware multer
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

export default routes;