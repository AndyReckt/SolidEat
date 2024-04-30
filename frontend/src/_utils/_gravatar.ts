import crypto from "crypto";

export function gravatar(email: string, size = 80): string {
    email = email || "no-email";
    const trimmedEmail = email.trim().toLowerCase();
    const hash = crypto.createHash("sha256").update(trimmedEmail).digest("hex");
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}
