import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'


export default NuxtAuthHandler({
    secret: '5aa92bcee01bb72419b9c4ab4d212917',
    pages: {
        signIn: '/login',
        newUser: '/register',
    },

    callbacks: {
        jwt: async ({ token, user }) => {
            const isSignIn = user ? true : false;
            if (isSignIn) {
                token.jwt = user ? (user as any).access_token || '' : '';
                token.id = user ? user.id || '' : '';
                token.role = user ? (user as any).role || '' : '';
            }
            return Promise.resolve(token);
        },
        // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
        session: async ({ session, token }) => {
            (session as any).role = token.role;
            (session as any).uid = token.id;
            return Promise.resolve(session);
        },
    },

    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        CredentialsProvider.default({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: any, req: any) {
                const user = await Usuario.findOne({ correo: credentials?.username })

                if (user) {
                    return {
                        name: `${user.nombres} ${user.apellidos}`,
                        email: user.correo,
                        image: user.suscripcion,
                        role: 'usuario',
                        id: user._id
                    }

                }
                const admin = await Administradores.findOne({ correo: credentials?.username })

                if (admin) {
                    return {
                        name: 'Administrador',
                        email: admin.correo,
                        role: 'administrador',
                        id: admin._id
                    }
                }

                return null
            },
        }),
    ]
})
