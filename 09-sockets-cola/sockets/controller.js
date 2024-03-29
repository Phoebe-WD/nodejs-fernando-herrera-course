import TicketControl from '../models/ticket-control.js';

const ticketControl = new TicketControl();

const socketController = (socket) => {
  console.log('Cliente conectado', socket.id);
  socket.on('disconnect', () => {
    console.log('Cliente desconectado', socket.id);
  });
  socket.on('enviar-mensaje', (payload, callback) => {
    const id = 1231231;
    callback(id);
    socket.broadcast.emit('enviar-mensaje', payload);
  });
};

export default socketController;
