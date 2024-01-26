import React from 'react'

export default function Loader() {
    return (
        <div className="fixed inset-0 z-50 bg-[#0000003b] flex items-center justify-center">
            <img src="https://i.gifer.com/ZKZg.gif" width={40} alt="loading" />
        </div>
    )
}
