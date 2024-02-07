//Referencias del HTML

const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnEnviar = document.querySelector('#btnEnviar');

const socket = io();

socket.on('connect', () => {
  //   console.log('Conectado');
  lblOffline.style.display = 'none';
  lblOnline.style.display = '';
});
socket.on('disconnect', () => {
  console.log('Desconectado del servidor');
  lblOnline.style.display = 'none';
  lblOffline.style.display = '';
});

btnEnviar.addEventListener('click', () => {
  const message = txtMessage.value;
  const payload = {
    message,
    id: '123sfs',
    date: new Date().getTime(),
  };
  socket.emit('enviar-mensaje', payload, (id) => {
    console.log('desde el server', id);
  });
});

socket.on('enviar-mensaje', (payload) => {
  console.log(payload);
});
