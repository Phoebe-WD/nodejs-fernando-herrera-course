import data from '../db/data.json' assert { type: 'json' };
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Tickets {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.ticket = [];
    this.ultimos4 = [];

    this.init();
  }

  get toJson() {
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      ticket: this.ticket,
      ultimos4: this.ultimos4,
    };
  }

  init() {
    const { ultimo, hoy, ticket, ultimos4 } = data;
    if (hoy === this.hoy) {
      this.ticket = ticket;
      this.ultimo = ultimo;
      this.ultimos4 = ultimos4;
    } else {
      this.guardarDB();
    }
  }

  guardarDB() {
    const dbPath = path.join(__dirname, '../db/data.json');
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }
  siguiente() {
    this.ultimo += 1;
    const ticket = new Tickets(this.ultimo, null);
    this.ticket.push(ticket);
    this.guardarDB();
    return `Ticket ${this.ultimo}`;
  }
  atenderTicket(escritorio) {
    // No hay tickets
    if (this.ticket.length === 0) {
      return null;
    }
    // Borramos ultimo ticket
    const ticket = this.ticket.shift();
    ticket.escritorio = escritorio;
    // añadimos el ticket al inicio
    this.ultimos4.unshift(ticket);

    if (this.ultimos4.length > 4) {
      this.ultimos4.splice(-1, 1);
    }
    this.guardarDB();
    return ticket;
  }
}

export default TicketControl;
