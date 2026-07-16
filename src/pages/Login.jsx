import React from "react"
import { useLoaderData, Form, redirect, useActionData, useNavigation } from "react-router-dom"
import { loginUser } from "../api"

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')
    const pathName = new URL(request.url).searchParams.get("redirectTo") || "/host"

    try {
        await loginUser({ email, password })
        localStorage.setItem('loggedIn', true)

        // 1. Create the redirect response instance
        const response = redirect(pathName)

        // 2. 🔥 THE FIX: Explicitly assign a body to bypass MirageJS
        response.body = true

        // 3. Throw the patched response instead of returning it
        throw response
    }
    catch (err) {
        // If it's the redirected response object we threw, let it pass through
        if (err instanceof Response) throw err;
        return err.message
    }

}

export default function Login() {
    const message = useLoaderData()
    const errorMessage = useActionData()
    const navigation = useNavigation()

    return (
        <div className="login-container">

            <h2>Sign in to your account</h2>
            {message && <h3 className="red">{message}</h3>}
            {errorMessage && <h3 className="red">{errorMessage}</h3>}
            <Form className="login-form" method="post" replace>
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button disabled={navigation.state === "submitting"} > {navigation.state === "submitting" ? "Logging in ..." : "Login"} </button>
            </Form>
        </div>
    )

}