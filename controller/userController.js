const {PrismaClient} = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {success, error} = require('../utils/response')

const prisma = new PrismaClient();

exports.register = async (req, res) => {
    let { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return error(res, "Por favor, preencha todos os campos", 400)
    }
    email = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return error(res, "Email já cadatrado", 400)
    }
    const hashedPassword = await bcrypt.hash(senha, 10);

    const role = email.includes("@admin.com") ? "ADMIN" : "BOMBEIRO";

    const user = await prisma.user.create({
        data: { nome, email, senha: hashedPassword, role }
    });

    const cargo = role === "ADMIN" ? "oficial" : "praça";

    success(res, `Seja bem vindo(a) ${cargo} ${user.nome}`, {user:{nome, email, role}} )
}

exports.login = async (req, res) => {
    try{
        let { email, senha } = req.body;
        if (!email || !senha){
            return error(res, "Por favor, preencha todos os campos", 400)

        }
        email = email.toLowerCase().trim();
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return error(res, "Usuario não cadastrado", 400)
        }

        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) {
            return error(res, "Senha inválida", 400)
        }

   
        const token = jwt.sign({ id: user.id, role:user.role }, process.env.SECRET, { expiresIn: '7d' });
        success(res, "Login Efetivado", {user: { id: user.id, nome: user.nome, email: user.email, role: user.role}, token})
    }catch(err){
        error(res, "Erro ao fazer login", 400, err)
    }
}