import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]); 

  const { currentUser } = useContext(AuthContext);//accedere alle informazione dell'utente corrente
  const { dispatch } = useContext(ChatContext);// utilizzata per aggiornare lo stato globale dell'applicazione,
  //in particolare viene utilizzata per aggiornare la chat selezionata dall'utente corrente.


  // si occupa di registrare un listener per le modifiche al documento userChats associato all'utente corrente
  
  //ogni volta che il documento "userChats" associato all'utente corrente viene modificato, 
  //lo stato locale chats viene aggiornato,
  // permettendo al componente di visualizzare l'elenco di chat aggiornato.
  useEffect(() => {
    const getChats = () => {
      const clean = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        clean();  // utilizzata per rimuovere il listener quando il componente viene smontato o quando l'utente corrente viene modificato.
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;