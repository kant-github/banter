const users = [
    {
      name: "Rishi",
      data: "Fri 15 Aug 2024"
    },
    {
      name: "Aarav",
      data: "Sat 16 Aug 2024"
    },
    {
      name: "Ishaan",
      data: "Sun 17 Aug 2024"
    },
    {
      name: "Vihaan",
      data: "Mon 18 Aug 2024"
    },
    {
      name: "Advait",
      data: "Tue 19 Aug 2024"
    },
    {
      name: "Kiaan",
      data: "Wed 20 Aug 2024"
    },
    {
      name: "Arjun",
      data: "Thu 21 Aug 2024"
    },
    {
      name: "Shaurya",
      data: "Fri 22 Aug 2024"
    },
    {
      name: "Dev",
      data: "Sat 23 Aug 2024"
    }
];

export default function () {
    return (
        <div className="w-1/5 bg-[#f2f2f2] h-[91.5vh] flex flex-col pb-[12px]">
            {/* Header */}
            <div className="text-2xl pl-8 py-6 pb-7 font-bold">
                <h1>Users</h1>
            </div>
            {/* User List Container */}
            <div className="px-6 flex-grow overflow-y-auto space-y-4">
                {
                    users.length > 0 && users.map((item, index) => (
                        <div key={index} className="border text-xs px-4 py-4 bg-white rounded-[px] transition-shadow hover:shadow-md">
                            <div className="text-sm font-semibold">
                                <h2>{item.name}</h2>
                            </div>
                            <div>
                                <h5>joined: <i className="font-light">{item.data}</i></h5>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
