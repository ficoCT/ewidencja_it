import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import React from "react";
import Alert from 'react-bootstrap/Alert';
import User from "./User";
import Container from "react-bootstrap/Container";

const DataTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {

        const unsub = onSnapshot(
            collection(db, "users"),
            (snapShot) => {
                let list = [];
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setData(list);
            },
            (error) => {
                console.log(error);
            }
        );

        return () => {
            unsub();
        };
    }, []);

    const deleteUser = async (id) => {
        try {
            await deleteDoc(doc(db, "users", id));
            setData(data.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container>
            <div className='mt-2'>
                {data.map(user => (
                    <Alert key={user.id} variant='primary'>
                        <User user={user} onDelete={deleteUser} />
                    </Alert>
                ))}

                Nowy użytkownik
                <br />
                <Link to="/new-user">
                    Dodaj
                </Link>
            </div>
        </Container>
    );
};

export default DataTable;