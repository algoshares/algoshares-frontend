"use client"

export default function Footer() {
    return (
        <footer className="bg-black py-12 px-6 text-center text-gray-400">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-sm">&copy; {new Date().getFullYear()} AlgoShares. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="https://discord.gg/PP7vunQfAe" target="_blank" className="hover:text-white">Discord</a>
                    <a href="https://algoshares.gitbook.io/algoshares-docs/" target="_blank" className="hover:text-white">Docs</a>
                </div>
            </div>
        </footer>
    )
}