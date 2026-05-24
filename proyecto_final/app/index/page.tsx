"use client";

import { LandingPage } from "../components/LandingPage/LandingPage";

export default function IndexHome()
{
    return <LandingPage />
    /*
    const isLoggedIn = true;//se conecta con supabase/auth

    if (!isLoggedIn)
    {
        return <LoginPage />
    }

    return <DashboardPage />*/
}