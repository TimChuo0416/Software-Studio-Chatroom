import { useState, useEffect } from "react";
import { db, auth } from "../config";
import {  ref, onValue } from "firebase/database";
import { Container, Row, Col,Button, } from 'react-bootstrap';

export const Userlist = ({ createChat, changeChat }) => {
    const [chatlist, setChatlist] = useState('');
    const [chat, setChat] = useState('');

    const chatRef = ref(db, `UsersChat/${auth.currentUser.displayName}/`);

    useEffect(() => {
        handleRead();
    }, []);

    const handleRead = () => {
        onValue(chatRef, (snapshot) => {
            // Use snapshot.forEach to loop over all the child nodes
            const total_chat = [];
            snapshot.forEach((childSnapshot) => {
                // Get the text value from each child node and add it to the total_message array
                total_chat.push(childSnapshot);
                // console.log(childSnapshot.key);
            });
            console.log(total_chat);
            setChatlist(total_chat);
        }, {
            onlyOnce: false
        });
    };


    return (
        <Container>
            {/* <Row>
                <Button onClick={() => changeChat('message')}>Public</Button>
                {chatlist.length > 0 && chatlist.map((m) => (
                    <Button onClick={() => changeChat(m.key)}>Chatroom</Button>
                ))}
            </Row>
            <Row>
                <Button onClick={() => createChat("卓岳霆")}>Add Chats</Button>
            </Row> */}
            <Row>
                <Col className="justify-content-start d-flex flex-column">
                    <Button className="userlist-btn-2" onClick={() => changeChat('public','public')}>Public</Button>
                    {chatlist.length > 0 && chatlist.map((m) => (
                        <Button className="userlist-btn" key={m.key} onClick={() => changeChat(m.key,m.val().Chatname)}>{m.val().Chatname}</Button>
                    ))}
                    <Button className="userlist-btn add" variant="primary" onClick={() => createChat()}>Add Chats</Button>
                </Col>
            </Row>
        </Container>
    );
};