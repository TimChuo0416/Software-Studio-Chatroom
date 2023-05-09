import { useEffect ,useRef} from "react";
import { db, auth } from "../config";
import { format } from "date-fns";



export const Message = ({message,idx,deletemessage}) => {
    const mytext = message.text;
    const user = auth.currentUser;

    const ref = useRef();
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
      }, [message]);
    
    const timeString = message.timestamp ? format(new Date(message.timestamp), "HH:mm") : "";
    const messager = (message.id === user.uid ?"owner":(message.id == "System") ? "system":"");
    
    // add photoUrl of user
    
    return(
        <div onClick={()=>deletemessage(idx , message.id , user.uid)} ref={ref} className={`message ${messager}`}>
            <div className="messageInfo">
                <p>{message.name}</p>
                <p>{timeString}</p>
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
            </div>
        </div>
    );
};

