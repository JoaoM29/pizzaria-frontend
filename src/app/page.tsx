import Link from "next/link";
import styles from "./page.module.scss";
import logoImg from "/public/logo.png";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Pizza JM's" width={250} height={100} />

        <section className={styles.login}>
          <form>
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

            <button type="submit">
              Acessar
            </button>
          </form>

          <Link href="/signup" className={styles.text}>Não possui uma conta? Crie uma agora!</Link>

        </section>
      </div>
    </>
  );
}
