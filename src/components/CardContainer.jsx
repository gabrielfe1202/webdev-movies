export default function CardContainer({ titulo, children }) {
    return (
        <div className="overflow-x-auto w-11/12 float-end filmesscrollbar">
            <div className="w-max mb-6 min-w-full">
                <h1 className="text-left text-2xl mb-2 mt-10 text-default">{titulo}</h1>
                <div className="flex">
                    {children}
                </div>
            </div>
        </div>
    )
}