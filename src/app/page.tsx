"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client"; //import the auth client
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function Home() {
  const { data: session } = authClient.useSession() 

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onsubmit = async () => {
    await authClient.signUp.email({
        email,
        name,
        password
    }, {
        onError: (error) => {
            window.alert("somthing went wrong");
            console.log("Error signing up:", error);
        },
        onSuccess: (data) => {
            window.alert("Successfully signed up");
            console.log("Successfully signed up:", data);
        }
    })
  }

  const onLogin = async () => {
    await authClient.signIn.email({
        email,
        password
    }, {
        onError: (error) => {
            window.alert("somthing went wrong");
            console.log("Error signing in:", error);
        },
        onSuccess: (data) => {
            window.alert("Successfully signed up");
            console.log("Successfully signed up:", data);
        }
    })
  }

  if(session) return(
    <div>
        loged in as {session.user?.name} <br />
        <Button onClick={()=> authClient.signOut()}>Sign Out</Button>
    </div>
  )

  return (
    <div className="flex flex-col gap-y-10">
        <div className="p-4 flex flex-col gap-y-4">
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={onsubmit}>Register</Button>
        </div>

        <div className="p-4 flex flex-col gap-y-4">
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={onLogin}>Login</Button>
        </div>
    </div>
  );
}
