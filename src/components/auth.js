import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
    signInWithRedirect,
    FacebookAuthProvider,
    updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../config";
import { useState, useEffect } from "react";
import { ref, onValue, update} from "firebase/database";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    // const [user, setUser] = useState(null);
    const [signature, setSignature] = useState('');
    const [profile_picture, setProfile_picture] = useState('./default-pic.jpg');

    const handleRowClick = () => {
        const userInput = prompt("Please enter your signature:");
        if (userInput === '' || userInput === null) return;
        setSignature(userInput);

        update(ref(db, `users/${auth.currentUser.displayName}`), {
            sign: userInput
            // profile_picture : imageUrl
        });
    }

    useEffect(() => {
        onValue(ref(db, `users/${username}/${auth.currentUser?.displayName}`), (data) => {
            console.log(data.val()?.sign);
            setSignature(data.val()?.sign);
        })
    }, [username]);

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // result.user.updateProfile({displayName: username});
            updateProfile(auth.currentUser, {
                displayName: username,
                photoURL: profile_picture
            }).then(() => {
                // Profile updated!
                console.log(auth.currentUser.displayName);
                // ...
            }).catch((error) => {
                // An error occurred
                console.log('update profile failed');
            });
            Notification.requestPermission(function (status) {
                console.log('User Choice', status);
                if (status !== 'granted') {
                    console.log('推播允許被拒絕了!');
                } else {
                    const n = new Notification("哈囉! 歡迎使用我的Chatapp");
                    console.log('通知發送');
                }
            });

            console.log("sign up successfully");
        } catch (e) {
            console.error(e);
            alert("Sign Up Failed");
        }
        setEmail("");
        setPassword("");
    };

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("sign in successfully");
        } catch (e) {
            console.error(e);
            alert("Sign In Failed");
        }
        setEmail("");
        setPassword("");
    };

    const handleGooglePopUp = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            Notification.requestPermission(function (status) {
                console.log('User Choice', status);
                if (status !== 'granted') {
                    console.log('推播允許被拒絕了!');
                } else {
                    const n = new Notification("哈囉! 歡迎使用我的Chatapp");
                }
            });
            console.log("sign in successfully");
        } catch (e) {
            console.error(e);
            alert("Google Signed In Failed");
        }
    };

    const handleGoogleRedirect = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithRedirect(auth, provider);
            console.log("sign in successfully");
        } catch (e) {
            console.error(e);
        }
    };

    const handleFBPopUp = async () => {
        const provider = new FacebookAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            console.log("sign in successfully");
        } catch (e) {
            console.error(e);
        }
    };

    const handleFBRedirect = async () => {
        const provider = new FacebookAuthProvider();
        try {
            await signInWithRedirect(auth, provider);
            console.log("sign in successfully");
        } catch (e) {
            console.error(e);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("sign out successfully");
        } catch (e) {
            console.error(e);
            alert("Sign Out Failed");
        }
    };

    function writeUserData(userId, name, email) {
        // const db = getDatabase();
        update(ref(db, `users/${name}`), {
            username: name,
            email: email,
            id: userId,
            // profile_picture : imageUrl
        });
        console.log("user data writed");
    }

    onAuthStateChanged(auth, (user) => {
        var usrDiv = document.getElementById("usrDiv");
        var usrName = document.getElementById("usrName");
        var useEmail = document.getElementById("useEmail");
        if (user && user.displayName) {
            // setSignature('');

            // usrDiv.style.visibility = "visible";
            // usrName.innerHTML = "User Name: " + user.displayName;
            // useEmail.innerHTML = "User Email: " + user.email;
            writeUserData(user.uid, user.displayName, user.email);
        } else {
            //usrDiv.style.visibility = "hidden";
        }
    });

    // implement changeProfilephoto which allowed user to upload their profile photo and make it loaded everytime they login
    const changeProfilephoto = async (e) => {

        const file = e.target.files[0];
        const sRef = storageRef(storage, `users/${auth.currentUser.uid}/profile_picture`);
        await uploadBytes(sRef, file);
        const url = await getDownloadURL(sRef);
        console.log(url);
        // update(ref(db, `users/${auth.currentUser.displayName}`), {
        //     profile_picture: url
        // });
        setProfile_picture(url);
        console.log(url);
        updateProfile(auth.currentUser, {
            photoURL: url
        }).then(() => {
            // Profile updated!
            console.log(auth.currentUser.photoURL);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            // ...
        }).catch((error) => {
            // An error occurred
            console.log('update profile failed');
        });
    };



    return (
        // <>
        //     <h1>Firebase Authentication</h1>
        //     <div>
        //         <h2>Email/Password</h2>
        //         <input
        //             type="email"
        //             placeholder="Email..."
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //         ></input>
        //         <input
        //             type="password"
        //             placeholder="Password..."
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //         ></input>
        //         <button onClick={handleSignIn}>Sign In</button>
        //         <button onClick={handleSignUp}>Sign Up</button>
        //     </div>
        //     <div>
        //         <h2>Google</h2>
        //         <button onClick={handleGooglePopUp}>Log in with Pop-up</button>
        //         <button onClick={handleGoogleRedirect}>
        //             Log in with Redirect
        //         </button>
        //     </div>
        //     <div>
        //         <h2>Facebook</h2>
        //         <button onClick={handleFBPopUp}>Log in with Pop-up</button>
        //         <button onClick={handleFBRedirect}>Log in with Redirect</button>
        //     </div>
        //     <div id="usrDiv">
        //         <h2>User</h2>
        //         <p id="usrName"></p>
        //         <p id="useEmail"></p>
        //         <button onClick={handleSignOut}>Sign Out</button>
        //     </div>
        // </>

        <>
            {auth.currentUser
                ?
                <Container className="login container">
                    <Card className='card-front bg-dark text-white my-5 w-50' style={{ borderRadius: '1rem', minWidth: '25rem', minHeight: '37rem' }}>
                        <Card.Body className='p-5 w-100 d-flex flex-column'>
                            <Row className="login-row">
                                <Col className="login title">
                                    <h1>User Profile</h1>
                                </Col>
                            </Row>
                            <Row className="login-row">
                                <label for="profile-photo-input">
                                    <img
                                        className="fit-picture"
                                        src={auth.currentUser.photoURL}
                                        alt="load failed"
                                    />
                                </label>
                            </Row>
                            <Row className="login-row">
                                <Col>Username:</Col>
                                <Col><p>{auth.currentUser.displayName}</p></Col>
                            </Row>
                            <Row className="login-row">
                                <Col>
                                    Email:
                                </Col>
                                <Col><p>{auth.currentUser.email}</p></Col>
                            </Row>
                            <Row className="login-row" onClick={handleRowClick}>
                                <Col>Signature: </Col>
                                <Col>{signature}</Col>
                            </Row>
                            <Row className="login-row" style={{ paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
                                <Button onClick={handleSignOut}>Sign Out</Button>
                            </Row>

                        </Card.Body>
                    </Card>
                    <input
                        id="profile-photo-input"
                        type="file"
                        onChange={changeProfilephoto}
                        style={{ display: 'none' }}
                    />
                </Container>
                :
                <Container className="login container">
                    <div className="card">
                        <Card className='card-front bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', minWidth: '25rem', minHeight: '37rem' }}>
                            <Card.Body className='p-5 w-100 d-flex flex-column'>
                                <Row>
                                    <Col className="login title">
                                        <h1>LOGIN</h1>
                                    </Col>
                                </Row>
                                <Row className="login-row">
                                    <Form className="login text p-3 w-100">
                                        <Form.Group className="w-100">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Email Address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Row>
                                <Row className="login-row">
                                    <Form className="login text p-3 w-100">
                                        <Form.Group className="w-100">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-100 w-lg-50 w-md-75"
                                            />
                                        </Form.Group>
                                    </Form>
                                </Row>
                                <Row className="login-row">
                                    <Button className="login-btn" style={{ marginTop: '1rem' }} onClick={handleSignIn}>
                                        <span>Sign in</span>
                                    </Button>
                                </Row>
                                <Row className="login-row" style={{ paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
                                    <Button className="google-btn" onClick={handleGooglePopUp}>
                                        <FaGoogle className="google-icon" />
                                        <span className="google-text">Sign in with Google</span>
                                    </Button>
                                </Row>
                                <p>Don't have an account? <a href="#" className="flip-btn" onClick={function () { document.querySelector('.card').classList.toggle('flip') }}>Sign Up</a></p>
                            </Card.Body>
                        </Card>


                        <Card className='card-back bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', minWidth: '25rem', minHeight: '37rem' }}>
                            <Card.Body className='p-5 w-100 d-flex flex-column'>
                                <Row>
                                    <Col className="login title">
                                        <h1>SIGNUP</h1>
                                    </Col>
                                </Row>
                                <Row className="login-row">
                                    <Form className="login text p-3 w-100">
                                        <Form.Group className="w-100">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Row>
                                <Row className="login-row">
                                    <Form className="login text p-3 w-100">
                                        <Form.Group className="w-100">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Email Address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Row>
                                <Row className="login-row">
                                    <Form className="login text p-3 w-100">
                                        <Form.Group className="w-100">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-100 w-lg-50 w-md-75"
                                            />
                                        </Form.Group>
                                    </Form>
                                </Row>
                                <Row className="login-row" style={{ marginBottom: '1.5rem', marginTop: '1.5rem' }}>
                                    <Button className="login-btn" onClick={handleSignUp}>
                                        <span>Sign up</span>
                                    </Button>
                                </Row>
                                <p>Already have an account? <a href="#" className="flip-btn" onClick={function () { document.querySelector('.card').classList.toggle('flip') }}>Log In</a></p>
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
            }
        </>
    );
};
