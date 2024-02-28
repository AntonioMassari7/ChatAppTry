import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
 
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" }); //scrollare automaticamente alla fine della chat 
    //quando viene aggiunto o modificato un nuovo messaggio.
  }, [message]);

  return (
    //Questa espressione verifica se l'ID del mittente del messaggio (message.senderId) corrisponde all'ID dell'utente corrente (currentUser.uid), 
    //e se la condizione è vera, assegna la classe owner all'elemento div. In questo modo, 
   // viene applicato uno stile CSS diverso al messaggio inviato dall'utente corrente, 
   //per distinguerlo dal messaggio inviato da altri utenti.
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL//ricevente
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;