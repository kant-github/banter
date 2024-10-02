
export default function ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="">
        <div>{children}</div>
    </div>
}