import Link from "next/link";
import Container from "@/components/Container";

const PageSession = () => {
    return ( 
        <Container>
            <div className="flex items-center justify-center w-full min-h-screen">
                <form className="max-w-[400px] w-full flex flex-col p-5">
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
                                placeholder="Informe um nome único"
                            />
                        </div>

                        <div className="flex flex-col gap-y-1 mt-2">
                            <label htmlFor="password" className="text-sm">password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                className="input input-bordered input-success w-full" 
                                placeholder="Insira uma senha"
                            />
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-success w-full mt-5 mb-2 text-zinc-200 uppercase">Login</button>
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