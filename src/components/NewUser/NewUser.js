import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    doc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const NewUser = ({ inputs, title }) => {

    const [file, setFile] = useState("");
    const [data, setData] = useState({roles: {admin: false }});
    const [per, setPer] = useState(null);
    const [errorFile, setErrorFile] = useState(false);
    const [errorUser, setErrorUser] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const uploadFile = () => {
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    setPer(progress);
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    setErrorFile(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev) => ({ ...prev, img: downloadURL }));
                    });
                }
            );
        };
        file && uploadFile();
    }, [file]);
    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        setData({ ...data, [id]: value });

    };

    const handleAdd = async (e) => {

        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            await setDoc(doc(db, "users", res.user.uid), {
                ...data,
                timeStamp: serverTimestamp(),
            });
            navigate(-1)
        } catch (err) {
            setErrorUser(true);
        }

    };

    return (
        <Container className="contents" style={{textAlign: "center"}}>

                <h1 className="userTitle">{title}</h1>
                <div style={{textAlign: "left"}}>
                    <div>
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                            className="imgUser"
                        />
                    </div>
                </div>
            <Form onSubmit={handleAdd}>
                <div style={{textAlign: "left"}}>
                    <label htmlFor="file">
                        Dodaj zdjęcie
                    </label>
                    {errorFile && <span>{'Coś poszło nie tak :('}</span>}
                    <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                    />
                </div>
                {inputs.map((input) => (
                    <Form.Group className="mb-3" style={{textAlign: "left"}} controlId={input.id}>
                        <Form.Label>{input.label}</Form.Label>
                        <Form.Control type="input" placeholder={input.placeholder} onChange={handleInput}/>
                    </Form.Group>
                ))}
                <Button disabled={per !== null && per < 100} variant="success" type="submit">
                    Zapisz
                </Button>
            </Form>

        </Container>
    );
};

export default NewUser;
