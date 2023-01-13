import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
//import styles from '../../styles/Home.module.css'
import styles from "./signin.module.css";

import GoogleButton from "../../components/GoogleButton";
import Button from "../../components/Button";
import BackLink from "../../components/BackLink";

export default function Signin() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Signin</title>
        <meta name="description" content="Sign in to DataCrowssways" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.leftimg}><img src="./crossing.jpg" width="600" /></div>
        <div className={styles.b1}>
          <div className={styles.head}>
            <h1>Welcome to Crossways</h1>
            <br />
            <h2>SIGN IN</h2>
            <h3>TO ACCESS THE PORTAL</h3>
          </div>
          <br />
          <br />
          <Link href="api/user/login/google">
            <GoogleButton>Sign in with Google</GoogleButton>
          </Link>
          <br />
          <Link href="api/user/login/orcid">
            <Button>Sign in with Orcid</Button>
          </Link>
          <br />
          <br />
          <p>
            <b>Note:</b> DataCrossways uses Google for authentication purposes
            only. The application will not have access to your private data, and
            will not send you any e-mails.
          </p>
          <br/>
            
            <Link href="/">
              <a className={styles.home}>Back to home</a>
            </Link>
        </div>
        </div>
      </main>
    </div>
  );
}
