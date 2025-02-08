import React from "react";

function GithubIcon({ className }: { className?: string }) {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <path stroke="#000" strokeWidth="1.35" fill="#91f5b7"
                d="M.04-11.71A12 12 0 00-3.68 11.7h.28a1 1 0 00.7-.24 1.05 1.05 0 00.36-.82v-.21-1.09a.49.49 0 00-.19-.33.5.5 0 00-.41-.1c-2.69.58-3.26-1.1-3.29-1.21a4.64 4.64 0 00-1.73-2.19l-.15-.11a.73.73 0 01.38-.07c.507.076.938.41 1.14.88a3 3 0 004 1.16.53.53 0 00.3-.36 2 2 0 01.56-1.22.5.5 0 00.15-.53.49.49 0 00-.42-.35c-2.37-.27-4.8-1.1-4.8-5.19a4 4 0 011.06-2.78.49.49 0 00.09-.52 3.56 3.56 0 01.01-2.41 5.57 5.57 0 012.52 1.15.48.48 0 00.42.06 10.66 10.66 0 012.74-.36 10.31 10.31 0 012.75.36.46.46 0 00.41-.06 5.53 5.53 0 012.52-1.15 3.54 3.54 0 010 2.38.48.48 0 00.1.52A4 4 0 016.87-.34c0 4.1-2.43 4.92-4.81 5.18a.49.49 0 00-.42.35.49.49 0 00.15.52 2.23 2.23 0 01.61 1.75v3.18a1.06 1.06 0 00.37.82c.302.23.697.301 1.06.19A12 12 0 00.04-11.71z"
                transform="matrix(.84 0 0 .84 12 12)"
            ></path>
        </svg>
    );
}

export default GithubIcon;