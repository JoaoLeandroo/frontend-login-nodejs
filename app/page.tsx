import Link from "next/link";
import Container from "@/components/Container";
export default function Home() {
  return (
    <Container>
      <div className="w-full flex items-center justify-center min-h-screen">
        <section className="max-w-[400px] w-full rounded shadow-dm p-4 flex flex-col gap-y-5">
            <Link 
              href={"/session"} 
              className="btn btn-accent text-lg uppercase font-semibold text-black"
            >
              Login
            </Link>
            <Link 
              href={"/register"} 
              className="btn btn-accent text-lg uppercase font-semibold text-black"
            >
              Cadastre-se
            </Link>
        </section>
      </div>
    </Container>
  );
}
