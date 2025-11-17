const ClientService = require('../src/ClientService'); 
const Client = require('../src/Client');

describe('ClientService', () => {
    let clientService;

    beforeEach(() => {
        clientService = new ClientService();
    });

    test('deve cadastrar um cliente válido com sucesso', () => {
        const name = "João Silva";
        const phone = "(11) 98765-4321";
        const email = "joao.silva@teste.com";

        const newClient = clientService.register(name, phone, email);

        expect(newClient).toBeInstanceOf(Client);
        expect(newClient.name).toBe("João Silva"); 
        expect(newClient.phone).toBe("(11) 98765-4321");
        expect(newClient.email).toBe("joao.silva@teste.com"); 
    });

    test('deve lançar um erro se o nome estiver vazio', () => {
        expect(() => {
            clientService.register("", "(11) 98765-4321", "valido@teste.com");
        }).toThrow("O nome do cliente é obrigatório.");

        expect(() => {
            clientService.register("   ", "(11) 98765-4321", "valido@teste.com");
        }).toThrow("O nome do cliente é obrigatório.");
    });

    test('deve lançar um erro se o telefone tiver menos de 8 dígitos', () => {
        expect(() => {
            clientService.register("Maria", "123456", "valido@teste.com");
        }).toThrow("O telefone deve conter pelo menos 8 dígitos.");

        expect(() => {
            clientService.register("Pedro", "9999-8888", "valido@teste.com");
        }).not.toThrow();
    });
    
    test('deve lançar um erro se o email for inválido', () => {
        expect(() => {
            clientService.register("Ana", "12345678", "invalido.com");
        }).toThrow("O email fornecido não é válido.");

        expect(() => {
            clientService.register("Ana", "12345678", "invalido@");
        }).toThrow("O email fornecido não é válido.");
    });
    
    test('deve garantir que o nome é armazenado sem espaços extras (trim)', () => {
        const newClient = clientService.register("   Fernando  ", "12345678", "fernando@teste.com");
        expect(newClient.name).toBe("Fernando");
    });
});


