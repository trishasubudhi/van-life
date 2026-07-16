import { redirect } from "react-router-dom"

export async function requireAuth(request) {
    const isLoggedIn = localStorage.getItem('loggedIn')
    const pathName = new URL(request.url , window.location.origin).pathname    
    
    if (!isLoggedIn) {
        const response = redirect(`/login?message=You must log in first.&redirectTo=${pathName}`);
        response.body = true;

        throw response;
    }
    return null
}

