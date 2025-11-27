import Link from "next/link";
import styles from "../page.module.scss";
import logoImg from "/public/logo.png";
import Image from "next/image";
import { api } from "@/services/api";
import { redirect } from "next/navigation";

export default function Signup() {

  async function handleRegister(formData: FormData) {
    "use server"

    const name = formData.get("name")?.valueOf();
    const email = formData.get("email")?.valueOf();
    const password = formData.get("password")?.valueOf();

    if( name === "" || email === "" || password === "" ) {
      console.log("Preencha todos os campos!");
      return;
    }

    try {
      await api.post('/users', {
        name,
        email,
        password
      });
   
  }catch (err) {
      console.log("error");
      console.log(err)
    }

    redirect("/");
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Pizza JM's" width={250} height={100} />

        <section className={styles.login}>
          <h1>Criando sua conta</h1>
          <form action={handleRegister}>
            <input
              type="text"
              required
              name="name"
              placeholder="Digite seu nome..."
              className={styles.input}
            />

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
            <button type="submit">Cadastrar</button>
          </form>

          <Link href="/" className={styles.text}>
            Já possui uma conta? Faça seu login!
          </Link>
        </section>
      </div>
    </>
  );
}
