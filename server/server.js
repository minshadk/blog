const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Document = require("./models/document");

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.URL)
  .then(() => console.log("connected to MOngodb"))
  .catch((err) => console.error(err));

const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const defaultValue = "";

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("get-document", async (documentId) => {
    // const data = "";
    const document = await findOrCreateDocument(documentId);

    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      console.log("send changes is working");
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      console.log("save docment ")
      await Document.findByIdAndUpdate(documentId, { data });
    });
  }); 
});

async function findOrCreateDocument(id) {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: defaultValue });
}
