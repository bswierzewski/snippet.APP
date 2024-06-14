import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENTID as string,
      clientSecret: process.env.AUTH0_CLIENTSECRET as string,
      issuer: process.env.AUTH0_ISSUER,
      idToken: true,
      token: {
        params: {
          audience: process.env.AUTH0_AUDIENCE
        }
      },
      authorization: {
        params: {
          audience: encodeURI(process.env.AUTH0_AUDIENCE as string)
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;
        token.expires_at = account.expires_at;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.access_token = token.access_token;
        // expires_at is in seconds, convert to milliseconds
        if (token.expires_at && Date.now() > token.expires_at * 1000) {
          return {} as Session;
        }
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs to auth0
      else if (new URL(url).hostname === process.env.AUTH0_DOMAIN) return url;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  }
};
``;
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
