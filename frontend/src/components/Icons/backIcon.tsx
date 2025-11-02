import React from 'react'

const BackIcon = (props: React.SVGProps<SVGSVGElement>) => {

    return (
        <>
            <svg
                //className={className}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                width="24" height="24"
                {...props}
                >
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          
        </>

    )
}

export default BackIcon
