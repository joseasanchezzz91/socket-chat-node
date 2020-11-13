const { io } = require('../server');
const {Users} = require('../classes/users');
const {createMessage} = require('../util/util');

const users = new Users();

io.on('connection', (client) => {

   
   client.on('intoChat',(data,callback)=>{

    if(!data.name){
        return callback({
            ok:false,
            message:'el nombre es requerido'
        })
    }
        client.join(data.chat)
     users.addUser(client.id,data.name,data.chat);

     client.broadcast.to(data.chat).emit('listUser',users.getUserChat(data.chat))

    return callback( users.getUserChat(data.chat))
   });

   client.on('createMessage',(data)=>{

    let user = users.getUser(client.id);

    let message = createMessage(user.name,data.message);

    client.broadcast.to(user.chat).emit('createMessage',message);

   });



   //mensaje private

   client.on('messagePrivate',(data)=>{

let user= users.getUser(client.id);

let message = createMessage(user.name,data.message);


client.broadcast.to(data.to).emit('messagePrivate',message);


   });


   client.on('disconnect',()=>{

    let personDelete = users.deleteUser(client.id);

    client.broadcast.to(personDelete.chat).emit('createMessage',createMessage('Admin',`${personDelete.name} se desconecto del chat`));
  client.broadcast.to(personDelete.chat).emit('listUser',users.getUserChat(personDelete.chat))




   });




});