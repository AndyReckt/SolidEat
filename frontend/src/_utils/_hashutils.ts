import { createHash } from "crypto";
const btoa = require("Base64").btoa;

function hash(string: string): string {
    return btoa(createHash("sha256").update(string).digest("base64"));
}
