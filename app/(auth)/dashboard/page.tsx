"use client";

import { api } from "@/services/api";
import { parseCookies, destroyCookie } from "nookies";
import Container from "@/components/Container";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const cookies = parseCookies();
const authToken = cookies["@nextAuth.token"];

const fetchUser = async (token: string) => {
  try {
    const response = await api.get("/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    console.log("Usuario não autorizado. ", err);
  }
};

fetchUser(authToken);
const PageDashboard = () => {
  const router = useRouter();

  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies["@nextAuth.token"];

    if (token) {
      fetchUser(token)
        .then((data) => {
          setUsers(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    } else {
      setError("Token não encontrado");
      setLoading(false);
    }
  }, []);

  const signOut = () => {
    destroyCookie(null, "@nextAuth.token");
    router.push("/session")
  };

  return (
    <Container>
      <div>
        <div>
          <h1 className="text-7xl text-zinc-400 font-bold">DASHBOARD</h1>
          <button onClick={signOut}>Logout</button>
        </div>
        <div className="flex flex-col gap-3 p-5">
          <div>
            <h1>Lista de Usuários</h1>
            <ul>
              {/* {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.createAt}
                    </li>
                ))} */}

              {users.map((user: any) => (
                <li key={user.id} className="text-white font-bold text-lg">
                  {user.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PageDashboard;
