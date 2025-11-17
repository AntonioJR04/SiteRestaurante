const Reservation = require('./Reservation');

class ReservationService {
    constructor() {
        this.reservations = [];
        this.availableTables = [1, 2, 3, 4, 5]; 
    }

    /**
     * Tenta registrar uma nova reserva após a validação.
     * @param {string} clientName - Nome do cliente.
     * @param {string} dateString - Data da reserva (formato YYYY-MM-DD).
     * @param {string} timeString - Horário da reserva (formato HH:MM).
     * @returns {Reservation} O objeto Reservation criado.
     * @throws {Error} Se a reserva não puder ser feita.
     */
    register(clientName, dateString, timeString) {
        if (!clientName || clientName.trim().length === 0) {
            throw new Error("O nome do cliente é obrigatório para a reserva.");
        }

        const reservationDateTime = new Date(`${dateString}T${timeString}:00`);
        const now = new Date();

        if (reservationDateTime <= now) {
            throw new Error("A reserva deve ser para uma data e hora futura.");
        }

        const reservationKey = `${dateString} ${timeString}`;
        
        const reservationsAtThisTime = this.reservations.filter(r => 
            `${r.date} ${r.time}` === reservationKey
        ).length;

        if (reservationsAtThisTime >= this.availableTables.length) {
            throw new Error("Não há mesas disponíveis para este horário.");
        }

        const tableNumber = this.availableTables[reservationsAtThisTime];

        const newReservation = new Reservation(
            clientName.trim(), 
            dateString, 
            timeString, 
            tableNumber
        );

        this.reservations.push(newReservation);
        
        return newReservation;
    }
    
    countReservations() {
        return this.reservations.length;
    }
}

module.exports = ReservationService;