const Client = require('./Client');

class ClientService {
    /**
     * Simula o cadastro de um novo cliente após validação.
     * @param {string} name - Nome do cliente.
     * @param {string} phone - Telefone do cliente.
     * @param {string} email - Email do cliente.
     * @returns {Client} O objeto Client criado.
     * @throws {Error} Se qualquer validação falhar.
     */
    register(name, phone, email) {
        if (!name || name.trim().length === 0) {
            throw new Error("O nome do cliente é obrigatório.");
        }

        const cleanPhone = phone ? phone.replace(/\D/g, '') : '';
        if (cleanPhone.length < 8) {
            throw new Error("O telefone deve conter pelo menos 8 dígitos.");
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
             throw new Error("O email fornecido não é válido.");
        }

        const newClient = new Client(name.trim(), phone, email.toLowerCase());

        return newClient;
    }
}

module.exports = ClientService;