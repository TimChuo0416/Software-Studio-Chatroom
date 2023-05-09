import { useState, useEffect,useCallback } from "react";
import { db, auth } from "../config";
import { set, push, ref, onValue, serverTimestamp, onChildChanged, onChildAdded } from "firebase/database";
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Message } from "./message";
import { AiOutlineSend } from "react-icons/ai";


export const Chatroom = ({ chatid }) => {
    const [refWrite, setRefWrite] = useState('Message/public');
    const [messages, setMessages] = useState("");
    const [messageRef, setMessageRef] = useState(ref(db, refWrite));
    const [data, setData] = useState("");
    const [id, setId] = useState('');

    const user = auth.currentUser;



    useEffect(() => {
        setId(chatid);
    }, [chatid]);

    useEffect(() => {
        if (id) {
            setRefWrite(`Message/${id}`);
            setMessageRef(ref(db, refWrite));
            handleRead();
        }
    }, [id]);

    useEffect(() => {
        handleRead();
        console.log("write");
        onChildChanged(messageRef, (data) => {
            console.log(messageRef);
            // if (("Notification" in window)) {
            //     const n = new Notification("您有新訊息");
            // }
            handleRead();
        }, {
            onlyOnce: false
        })
    }, [refWrite]);

    const handleWrite = useCallback(() => {
        if (data) {
          const test = push(ref(db, refWrite), {
            text: data,
            id: user.uid,
            name: user.displayName,
            timestamp: serverTimestamp(),
          });
          handleRead();
          setData("");
        }
      }, [data, user.uid, user.displayName, refWrite]);

    const handleRead = () => {
        
        onValue(ref(db, refWrite), (snapshot) => {
            // Use snapshot.forEach to loop over all the child nodes
            const total_message = [];
            snapshot.forEach((childSnapshot) => {
                // Get the text value from each child node and add it to the total_message array
                total_message.push(childSnapshot);
            });
            // Set the total_message array to the state variable
            // setData(total_message);
            // var readResult = document.getElementById('readResult');
            // readResult.innerHTML = total_message.join('');
            if(total_message.length > 0){
                setMessages(total_message);
                console.log(messages);
            }
        }, {
            onlyOnce: false
        });

    };

    function deletemessage(key, mid, uid) {
        console.log(mid);
        console.log(uid);
        if (mid === uid) {
            var m = window.confirm('確定要刪除訊息嗎');
            if (m) {
                console.log(key);
                const deleteposition = `Message/${id}/${key}`;
                const deleteRef = ref(db, deleteposition);
                set(deleteRef, {
                    text: "this message has been deleted",
                    id: "System",
                    name: "System",
                    timestamp: serverTimestamp(),
                })
            }
        }
    }

    return (
        // <>  
        //     <h1>Firebase Realtime Database</h1>
        //     <div>
        //         <h2>Write Data</h2>
        //         <input
        //             placeholder="Data"
        //             value={data}
        //             onChange={(e) => setData(e.target.value)}
        //         />
        //         <button onClick={handleWrite}>Write</button>
        //     </div>
        //     <div>
        //         <h2>Read Data</h2>
        //         <p id="readResult"></p>
        //         <button onClick={handleRead}>Read</button>
        //     </div>
        //     <button onClick={handleSignOut}>Sign Out</button>
        // </>
        <Container>
            <Row className="Chatbox" style={{ overflowY: 'scroll' }}>
                <Col>
                    {messages.length > 0 && messages.map((m) => (
                        <Message message={m.val()} idx={m.key} deletemessage={deletemessage} />
                    ))}
                </Col>
            </Row>
            <Row className="Chatsend" style={{ marginTop: '1rem' ,marginRight:'1rem'}}>
                <Form >
                    <InputGroup>
                        <Form.Control type="text" placeholder="Type message..." value={data} onChange={(e) => setData(e.target.value)} 
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                document.querySelector('.send').click();
                            }
                        }}/>
                        <Button className='send' variant="primary" onClick={handleWrite}>
                            <AiOutlineSend className="send-icon" />
                        </Button>
                    </InputGroup>
                </Form>
            </Row>
        </Container>
    );
};
