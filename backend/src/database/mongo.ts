import mongoose, { model } from "mongoose";

export async function init(uri: string) {
    await mongoose.connect(uri, {
        serverApi: { version: "1", strict: true, deprecationErrors: true },
        zlibCompressionLevel: 6,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 30000,
    });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "mongo error:"));
}
