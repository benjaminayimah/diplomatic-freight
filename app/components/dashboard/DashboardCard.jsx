
'use client'
import Link from "next/link";


function DashboardCard({ title, array, href, icon, color }) {

  const Icon = icon;

  return (
    <Link href={href} className={`border border-gray-200 hover:border-gray-300 hover:bg-gray-50 h-40 transition duration-300 rounded-2xl p-4 flex flex-col justify-between`}>
        <h2 className="text-base text-black flex items-center gap-2">
          <div className={`flex items-center justify-center h-9 w-9 rounded-lg border ${color.wrapper}`}>
            {Icon && <Icon 
              strokeWidth={2} 
              aria-hidden="true" 
              className={`text-base ${color.icon} h-5`} 
            />}
          </div>
          Total {title}
        </h2>
        <p className="text-3xl font-bold">{array?.length ?? 0}</p>
      <div className="text-gray-500 text-sm font-medium">View {title} &rarr;</div>
    </Link>
  )
}

export default DashboardCard