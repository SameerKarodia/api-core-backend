const mongoose = require("mongoose");
let connections = {};

const connectToDB = async (dbName) => {
  mongoose.set("strictQuery", true);

  if (connections[dbName]) {
    console.log(`MongoDB Connection Ok. Connected to ${dbName}`);
    return connections[dbName];
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connections[dbName] = connection;

    console.log(`✅ MongoDB connected to ${dbName}`);
    return connection;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error; // 👈 important
  }
};

module.exports = connectToDB;
