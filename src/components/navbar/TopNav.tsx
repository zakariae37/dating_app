import React from 'react';
import Link from 'next/link';
import NavLink from './NavLink';
import { Button } from '../ui/button';
import { auth } from '@/auth';
import DropDownMenu from './DropDownMenu';


const TopNav = async () => {
  const session = await auth()
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
      <div className="text-2xl font-bold">
        <h1>Logo</h1>
      </div>
      <div className="flex space-x-8">
       <NavLink href="/matches" label="Matches" />
        <NavLink href="/lists" label="Lists" />
        <NavLink href="/messages" label="Messages" />
        
      </div>
      {session ? (
        <DropDownMenu user={session.user}/>
      ) : (
        <>
        <div className="flex space-x-4">
          <Button className="bg-white text-blue-500 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition duration-200">
          <Link href={"/login"}>
            Sign In 
          </Link>
          </Button>
          <Button className="bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-800 transition duration-200">
          <Link href={"/register"}>
          Sign Up
          
          </Link>
            
          </Button>
        </div>
        </>
      )}
      
    </nav>
  );
}

export default TopNav;
