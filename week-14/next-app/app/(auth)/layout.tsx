export default function({children} : {
    children: React.ReactNode
}) {
    return (
        <div>
            <div className="text-center border-b">
                20% Off for next 3 days
            </div>
            {children}
        </div>
    )
}