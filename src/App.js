
import { db, auth } from "./config";
import { useState, useEffect } from "react";
import { Auth } from "./components/auth";
import { set, push, ref, onValue, serverTimestamp, get } from "firebase/database";
import { Chatroom } from "./components/chatroom";
import { Userlist } from "./components/userlist";
import { Container, Row, Col, Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './style.css';
import { LoadingPage } from "./components/loadingpage";

// const[user] = useAuthState(auth);

function App() {
  const [user, setUser] = useState(null);
  const [chatname, setChatname] = useState('public');
  const [chatid, setChatid] = useState('public');
  const [profile, setProfile] = useState(true);// profile true => not at profile
  const [isloading, setIsLoading] = useState(true);
  

  useEffect(() => {
    // simulate loading data
    setTimeout(() => setIsLoading(false), 2000); // set isLoading to false after 2 seconds
  }, []);

  useEffect(() => {
    // console.log(user.uid);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, [user]);

  function createChat() {
    // let user2 = prompt("Enter the name of user:", "卓岳霆");
    // if (user2 === null || user2 === "") {
    //   return;
    // }
    let name = prompt("Enter the name of chat:");
    if (name === null || name == "") {
      return;
    }
    const Id1 = user.displayName;
    // const Id2 = user2;

    const user1Ref = ref(db, `UsersChat/${Id1}/`);

    // console.log(user1Ref.get());
    // console.log(get(user1Ref));
    const newRef = push(user1Ref, {
      Chatname: name
    })

    const chatkey = newRef.key;
    setChatname(name);
    //user2
    // const user2Ref = ref(db, `UsersChat/${Id2}/${chatkey}`);
    // set(user2Ref, {
    //   Chatname: name
    // })

    const userRef = ref(db, `Chatuser/${chatkey}`);

    push(userRef, {
      id: Id1
    });

    // push(userRef, {
    //   id: Id2
    // });

    push(ref(db, `Message/${chatkey}`), {
      text: "chatroom created",
      id: "System",
      name: "System",
      timestamp: serverTimestamp(),
    });
    console.log(chatkey);
    changeChat(chatkey,name);

  }

  function changeChat(id, name) {
    setChatid(id);
    setChatname(name);
  }

  function addUser() {
    if(chatid === 'public'){return;}
    let user2 = prompt("Enter the name of user:", "卓岳霆");
    if (user2 === null || user2 === "") {
      return;
    }
    var flag = 0;
    const databaseRef = ref(db, `users/${user2}`);

    // check if user2 exist, if not, return
    get(databaseRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log("Data exists.");
          const user2Ref = ref(db, `UsersChat/${user2}/${chatid}`);
          // check user2 exists in chatroom or not
          get(user2Ref)
            .then((snapshot) => {
              if (snapshot.exists()) {
                alert("您的朋友已經在聊天室裡了囉");
                flag = 1;
                // throw new Error("Friend already exists in chatroom"); // Throw an error to exit the function
              } else {
                console.log("Data not exists. start create");
                set(user2Ref, {
                  Chatname: chatname
                })
                const userRef = ref(db, `Chatuser/${chatid}`);
                push(userRef, {
                  id: user2
                });

                push(ref(db, `Message/${chatid}`), {
                  text: `${user2} added`,
                  id: "System",
                  name: "System",
                  timestamp: serverTimestamp(),
                });
              }
            })
            .catch((error) => {
              flag = 1;
              console.error(error);
            });
        } else {
          alert("您的朋友好像不存在欸，您應該還有其他朋友吧");
          return;
        }
      })
      .catch((error) => {
        console.error(error);
        flag = 1;
        return; // Exit the function
      });
  }

  const handleSignOut = async () => {
    try {
      await auth.signOut(auth);
      console.log("sign out successfully");
    } catch (e) {
      console.error(e);
    }
  };

  const userprofile = async () => {
    try {
      await setProfile(!profile);
      console.log(profile);
    } catch (e) {
      console.error(e);
    }
  };


  

  // console.log("createChat function:", createChat); 

  return (
    //  implement an loading page
    <>{
    isloading ? <LoadingPage /> :
    <div>
      <Navbar className='nav' xs={12}>
        <Container>
          <Navbar.Brand className="text-white">Chatroom</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {user ? <Navbar.Text className="p-3 text-white">
                Sign in as: {auth.currentUser.displayName}
              <Button className="Navbar-btn" onClick={userprofile} style={{ color: 'white', borderRadius: '5px', border: 'none', padding: '1rem' ,marginLeft:'1rem'}}>
                Chatroom / Profile
                {/* <Link to="/authentication" style={{ textDecoration: 'none', color: 'white', fontSize: '16px' }}>{auth.currentUser.displayName}</Link> */}
              </Button>
            </Navbar.Text> :
              <Button style={{ color: 'white', borderRadius: '5px' }}>
                Log in/Sign up
              </Button>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="background-radial-gradient">
        {user && profile?<Container fluid className="App">
          <Container>
            <Row>
              <Col className="UserList" md={4} xs={2}>
                <Userlist createChat={() => createChat()} changeChat={changeChat} />
              </Col>
              <Col xs={1}>
                <Button className="userlist-btn" onClick={() => addUser()}>{"+"}</Button>
              </Col>
              <Col className="Chatroom" md={7} xs={9}>
                <Chatroom chatid={chatid} />
              </Col>
            </Row>
          </Container>
        </Container> :
          <Auth/>
        }
      </div>
    </div>}
    </>
  );
}

export default App;
