"use client"

import Link from "next/link";
import Container from "@/components/Container";
import { api } from "@/services/api";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/services/zod";

const PageRegister = () => {
    const router = useRouter()

    const [nameUser, setNameUser] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [password1, setPassword1] = useState<string>("")
    const [errors, setErrors] = useState<any>({})
    const [success, setSuccess] = useState<boolean>(false)

    const handleRegisterUser = async (event: FormEvent) => {
        event.preventDefault()

        const parseResult = registerSchema.safeParse({nameUser, password, password1})
        if (!parseResult.success) {
            setErrors(parseResult.error.flatten().fieldErrors)
            return
        }
        setErrors({})
            try {
            const check = await api.post("/check-user", {
                name: nameUser,
            })

            if(check.data.message === "Usuario já registrado!") {
                setErrors((prevState:any) => ({
                    ...prevState,
                    nameUser: ["Usuario já cadastrado."]
                }))
                return console.log("Usuario já cadastrado.")
            }

            if(password != password1) {
                setErrors((prevState:any) => ({
                    ...prevState,
                    password: ["As senhas devem ser iguais."],
                    password1: ["As senhas devem ser iguais."]
                }))
                return
            }
            
            const response = await api.post("/register", {
                name: nameUser,
                password: password,
            })
            
            setSuccess(true)
            await new Promise((resolve) => setTimeout(resolve, 5000))
            setSuccess(false)
            router.push("/session")
            return response
    
        }catch(err) {
            return {message: err}
        }
    }

    return ( 
        <Container>
            <div className="flex items-center justify-center w-full min-h-screen relative">
            {
                success ? 
                    <div role="alert" className="alert alert-success absolute top-10 animate-bounce">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Usuario cadastrado com sucesso!</span>
                        <p>Redirecionando...</p>
                    </div> 
                  :
                ""
            }

                <form 
                    onSubmit={handleRegisterUser}
                    className="max-w-[400px] w-full flex flex-col p-5">
                    <div className="w-full text-center">
                        <p className="text-2xl font-bold mb-5">Cadastre-se</p>
                    </div>
                    <div className="flex flex-col gap-x-5">
                        <div className="flex flex-col gap-y-1">
                            <label htmlFor="name" className="text-sm">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                className="input input-bordered input-success w-full" 
                                placeholder="Informe um nome único"
                                onChange={(e) => setNameUser(e.target.value)}
                            />
                            {errors.nameUser && <p className="text-red-500 text-sm">{errors.nameUser[0]}</p>}
                        </div>

                        <div className="flex flex-col gap-y-1 mt-2">
                            <label htmlFor="password" className="text-sm">password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                className="input input-bordered input-success w-full" 
                                placeholder="Insira uma senha"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-y-1 mt-2">
                            <label htmlFor="repeat-password" className="text-sm">Repeat password</label>
                            <input 
                                type="password" 
                                id="repeat-password" 
                                name="repeat-password" 
                                className="input input-bordered input-success w-full" 
                                placeholder="Repita sua senha"
                                onChange={(e) => setPassword1(e.target.value)}
                            />
                            {errors.password1 && <p className="text-red-500 text-sm">{errors.password1[0]}</p>}
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-success w-full mt-5 text-zinc-200 uppercase mb-2">
                           Registre-se
                        </button>
                        <div className="w-full text-center">
                            <p className="text-sm">Já possui conta? <Link href={"/session"} className="text-blue-500">Faça login</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </Container>        
     );
}
 
export default PageRegister;