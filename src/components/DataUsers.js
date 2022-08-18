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
import User from "./User";

const Datatable = () => {
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
        <div>
            <div>
                Add New User
                <Link to="/new">
                    Add New
                </Link>
            </div>
            <ul>
                {data.map(user => (
                    <li key={user.id}>
                        <User user={user} onDelete={deleteUser} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Datatable;