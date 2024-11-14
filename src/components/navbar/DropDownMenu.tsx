"use client"
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Session } from "next-auth";
import { Button } from '../ui/button';
import { signOutUser } from "@/app/actions/authActions";

type Props = {
    user: Session["user"];
};

const DropDownMenu = ({ user } : Props) => {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
    <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>
            <Button onClick={async () => signOutUser()}>Sign OUt</Button>
        </DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropDownMenu