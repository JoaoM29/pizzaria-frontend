import Link from "next/link";
import styles from "./page.module.scss";
import logoImg from "/public/logo.png";
import Image from "next/image";
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Page() {
  async function handleLogin(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return;
    }

    try {
      const response = await api.post("/session", { email, password });

      if (!response.data?.token) {
        return;
      }

      console.log("Login OK:", response.data);

      // Agora sim: cookies é async
      const cookieStore = await cookies();

      cookieStore.set({
        name: "session",
        value: response.data.token,
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
      });

    } catch (err) {
      console.log("Erro no login:", err);
      return;
    }

    redirect("/dashboard");
  }

  return (
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Pizza JM's" width={250} height={100} />

      <section className={styles.login}>
        <form action={handleLogin}>
          <input
            type="email"
            required
            name="email"
            placeholder="Digite seu e-mail..."
            className={styles.input}
          />
          <input
            type="password"
            required
            name="password"
            placeholder="********"
            className={styles.input}
          />
          <button type="submit">Acessar</button>
        </form>

        <Link href="/signup" className={styles.text}>
          Não possui uma conta? Cadastre-se
        </Link>
      </section>
    </div>
  );
}
