import { redirect } from "next/navigation"

export default function SettingsPage() {
    // Redirect to the my-account page by default
    redirect("/settings/my-account")
}
