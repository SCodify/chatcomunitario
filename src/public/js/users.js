console.log("Test")

const socket = io()

const chatBox = document.getElementById('chatBox')

const chat = async (chatBox) => {
  const swal = await Swal.fire({
    title: 'Identifícate',
    input: 'text', 
    text: 'Ingresa el usuario para identificarte',
    inputValidator: value => {
      return !value && 'Necesitas ingresar tu nickname'
    },
    allowOutsideClick: false
  })

  const user = swal.value

  socket.emit('auth', user)

  chatBox.addEventListener('keyup', evt => {
    if(evt.key === 'Enter') {
      if(chatBox.value.trim().length > 0) {
        socket.emit('message', {user, message: chatBox.value})
        chatBox.value = ''
      }
    }
  })

  socket.on('messageLogs', data => {
    const log = document.getElementById('messageLogs')
    let messagesInFront = ''
    data.forEach(item => {
      messagesInFront += `${item.user} dice: ${item.message}<br/>`
    })

    log.innerHTML = messagesInFront 
  })

  socket.on('newUser', data => {
    Swal.fire({
      text: `${data} se acaba de conectar`,
      toast: true,
      position: 'top-right'
    })
  })
}

chat(chatBox)
