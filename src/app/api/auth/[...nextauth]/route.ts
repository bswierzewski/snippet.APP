import Auth0Provider from 'next-auth/providers/auth0';
import NextAuth, { NextAuthOptions } from 'next-auth';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    Auth0Provider({
      clientId: <string>process.env.AUTH0_CLIENTID,
      clientSecret: <string>process.env.AUTH0_CLIENTSECRET,
      issuer: process.env.AUTH0_ISSUER,
      idToken: true,
      token: {
        params: {
          audience: process.env.AUTH0_AUDIENCE
        }
      },
      authorization: {
        params: {
          audience: encodeURI(<string>process.env.AUTH0_AUDIENCE)
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.access_token = token.access_token;
      }

      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
