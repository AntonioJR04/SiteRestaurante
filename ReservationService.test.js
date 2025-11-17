const ReservationService = require('../src/ReservationService');
const Reservation = require('../src/Reservation'); 

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const futureDate = tomorrow.toISOString().split('T')[0]; 
const futureTime = '19:30'; 

describe('ReservationService', () => {
    let service;

    beforeEach(() => {
        service = new ReservationService();
    });

    test('deve registrar uma reserva válida com sucesso e atribuir uma mesa', () => {
        const name = "Alice Rocha";
        
        const reservation = service.register(name, futureDate, futureTime);

        expect(reservation).toBeInstanceOf(Reservation);
        expect(reservation.clientName).toBe("Alice Rocha");
        expect(reservation.date).toBe(futureDate);
        expect(reservation.time).toBe(futureTime);
        expect(reservation.tableNumber).toBe(1);
        expect(service.countReservations()).toBe(1);
    });

    test('deve lançar um erro se o nome do cliente estiver vazio', () => {
        expect(() => {
            service.register("", futureDate, futureTime);
        }).toThrow("O nome do cliente é obrigatório para a reserva.");
    });
    
    test('deve lançar um erro se a data e hora for no passado', () => {
        const pastDate = '2015-01-01';
        const pastTime = '12:00';

        expect(() => {
            service.register("Bob", pastDate, pastTime);
        }).toThrow("A reserva deve ser para uma data e hora futura.");
    });

    test('deve lançar um erro quando não houver mais mesas disponíveis para o horário', () => {
        const date = futureDate;
        const time = '21:00'; 

        service.register("Cliente 1", date, time);
        service.register("Cliente 2", date, time); 
        service.register("Cliente 3", date, time); 
        service.register("Cliente 4", date, time); 
        const res5 = service.register("Cliente 5", date, time); 

        expect(res5.tableNumber).toBe(5);

        expect(() => {
            service.register("Cliente 6", date, time);
        }).toThrow("Não há mesas disponíveis para este horário.");

        expect(service.countReservations()).toBe(5);
    });
});