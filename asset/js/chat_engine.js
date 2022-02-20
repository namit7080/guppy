
 class Chatengine{
   
    constructor(chatboxId,useremail){
        
        this.chatBox= $(`#${chatboxId}`);
        this.userEmail=useremail;
        this.socket= io.connect('http://localhost:4000')
       
        if(this.userEmail){
            // console.log(this.userEmail)
            this.connectionHandler();
        }
    }


    connectionHandler(){
       
      
       let self= this;

        this.socket.on('connect',function(){
            // console.log("Connection Established using Socket");
              
            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'Chat_Room'
            })
             
            
            self.socket.on('user_joined',function(data){
                // console.log('a user joind ',data)
            })
        })
      


        $('#send-message').click(function(){
            
          let msg= $('#chat-message-input').val();
          
        
          if(msg!=''){
            
             self.socket.emit('send_message',{
                 message:msg,
                 user_email:self.userEmail,
                 chatroom:'Chat_Room'
             })
            

          }
       });
       self.socket.on('receive_message',function(data){
          

           let newMessage=$('<li>');

           let messagetype='other-message'

           if(data.user_email==self.userEmail){
               messagetype='self-message'
           }
          

           newMessage.append($('<span>',{
               'html':data.message
           }))

           if(messagetype!='self-message'){
             newMessage.append($('<sub>',{
               'html':data.user_email
              }))
           }

          newMessage.addClass(messagetype);
          $('#message-list').append(newMessage);
          




       })       

    } 
}