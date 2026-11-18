
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        senha: {
            type: String,
            required: true
        },

        tipo: {
            type: String,
            enum: ["professor", "estudante"],
            default: "professor",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);
