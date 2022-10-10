import React from "react";
import Whitelist from "../components/Whitelist";

import { getSession, signOut } from "next-auth/react";

function User({ user }) {
  return (
    <div className="container">
      <div className="rowx">
        <section className="col50 catnft">
          <img
            src="https://theonrex.github.io/theon-NFT-Page/images/catnft.jpg"
            alt="nft_img"
          />
        </section>
        <section className="col50">
          <h4>User session:</h4>
          <Whitelist />

                  <pre>{JSON.stringify(user, null, 6)}</pre>
                  
          <button onClick={() => signOut({ redirect: "/signin" })}>
            Sign out
          </button>
        </section>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}

export default User;
