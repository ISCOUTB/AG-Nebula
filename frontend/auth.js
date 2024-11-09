import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],

  callbacks: {
    authorized: async ({ auth, request }) => {
      // Permitir acceso a la ruta raíz "/"
      if (request.nextUrl?.pathname === "/") {
        return true
      }

      // Proteger la ruta "/playground"
      if (request.nextUrl?.pathname.startsWith("/playground")) {
        return !!auth
      }

      // Para otras rutas, permitir el acceso por defecto
      return true
    },
    signIn: async ({ user, account, profile, email, credentials }) => {
      // Aquí puedes agregar lógica adicional si es necesario
      return true
    },
    redirect: async ({ url, baseUrl }) => {
      // Redirigir a /playground después del inicio de sesión
      return `${baseUrl}/playground`
    },
  },

  pages: {
    signIn: "/login"
  }
})