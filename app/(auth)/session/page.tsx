"use client"

import Link from "next/link";
import Container from "@/components/Container";
import { FormEvent, useState } from "react";
import { api } from "@/services/api";
import { sessionSchema } from "@/services/zod";

const PageSession = () => {

    const [login, setLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errors, setErrors] = useState<any>({})
    
    const handleLogin = async (event: FormEvent) => {
        event.preventDefault()

        const parseResult = sessionSchema.safeParse({login, password})
        if(!parseResult.success) {
            setErrors(parseResult.error.flatten().fieldErrors)
            return
        }

        if(login === "" || password === "") return alert("Preencha todos os campos.")

        const check = await api.post("/session", {
            name: login,
            password: password,
        })

        if(check.data?.Error?.message === "Usuario ou senha inválido.") {
            setErrors((prevState: any) => ({
                ...prevState,
                login: ["Login ou senha inválido"],
                password: ["Login ou senha inválido."]
            }))

            return
        }

        console.log(check?.data)
    }

    return ( 
        <Container>
            <div className="flex items-center justify-center w-full min-h-screen">
                <form className="max-w-[400px] w-full flex flex-col p-5" onSubmit={handleLogin}>
                    <div className="w-full text-center">
                        <p className="text-2xl font-bold mb-5">Acesse sua conta</p>
                    </div>
                    <div className="flex flex-col gap-x-5">
                        <div className="flex flex-col gap-y-1">
                            <label htmlFor="name" className="text-sm">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                className="input input-bordered input-success w-full" 
                                placeholder="Informe o nome cadastrado"
                                onChange={(e) => setLogin(e.target.value)}
                            />
                            {errors.login && <p className="text-red-500 text-sm">{errors.login[0]}</p>}
                        </div>

                        <div className="flex flex-col gap-y-1 mt-2">
                            <label htmlFor="password" className="text-sm">password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                className="input input-bordered input-success w-full" 
                                placeholder="Insira sua senha"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-success w-full mt-5 mb-2 text-zinc-200 uppercase">Login</button>
                        <div className="w-full text-center">
                            <p className="text-sm">Não possui conta? <Link href={"/register"} className="text-blue-500">Registre-se</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </Container>        
     );
}
 
export default PageSession;