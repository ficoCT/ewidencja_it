import { useEffect, useState } from "react";
import {
    doc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import React from "react";

const NewUser = ({ inputs, title }) => {
    const [file, setFile] = useState("");
    const [data, setData] = useState({});
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
        <div>
            <div>
                <div>
                    <h1>{title}</h1>
                </div>
                <div>
                    <div>
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div>
                        <form onSubmit={handleAdd}>
                            <div>
                                <label htmlFor="file">
                                    Image: Icon
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
                                <div key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        id={input.id}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        onChange={handleInput}
                                    />
                                </div>
                            ))}
                            <button disabled={per !== null && per < 100} type="submit">
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewUser;
