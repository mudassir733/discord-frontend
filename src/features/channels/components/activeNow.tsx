export function ActiveNow() {
    return (
        <div className="w-[280px] bg-[#202024] p-4 border-[1px] border-zinc-600/90 overflow-y-hidden">
            <h2 className="text-white text-lg font-semibold">Active Now</h2>
            <div className="flex flex-col pt-3">
                <strong className="text-sm text-center"> It&apos;s quiet for now...</strong>
                <p className="text-gray-400 text-sm text-center mt-2">
                    When a friend starts an activity—like playing a game or hanging
                    out on voice—we&apos;ll show it here!
                </p>
            </div>
        </div>
    );
}