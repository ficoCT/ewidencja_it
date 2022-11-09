import * as React from 'react';
import { FcDepartment } from "react-icons/fc";
import { FcAddressBook } from "react-icons/fc";
import { FcPhone } from "react-icons/fc";
import { FcHome } from "react-icons/fc";

export default function ViewUser({ user: { id, displayName, username, email, phone, department, address} }) {
  return (
      <>
        <strong> {username} </strong> <FcDepartment/> {department} <FcAddressBook/> {email} <FcPhone/> {phone} <FcHome/> {address}
      </>
  );
}