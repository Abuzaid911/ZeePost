import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import { DarkModeProvider } from "../contexts/DarkModeContext";
import { darkMode } from "../../tailwind.config.cjs";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <DarkModeProvider>
    <SessionProvider session={session}>
      <Component {...pageProps} />  
    </SessionProvider>
    </DarkModeProvider>
  );
};

export default trpc.withTRPC(MyApp);
