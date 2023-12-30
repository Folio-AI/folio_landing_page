import React from 'react';

export default function LinkedAccounts() {
  
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 p-16">
      
        <div className="account-item border p-12 rounded-lg shadow-lg flex flex-col items-center justify-center">
          {/* GitHub SVG Icon */}
          <svg className="w-8 h-12 fill-current text-black opacity-75 shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z" />
          </svg>
          <p className="text-sm font-semibold">GitHub</p>
          {/* <span className={github ? "text-green-500" : "text-red-500"}>Linked</span> */}
        </div>
      
      
        <div className="account-item border p-12 rounded-lg shadow-lg flex flex-col items-center justify-center">
          {/* Google SVG Icon */}
          <svg className="w-8 h-12 fill-current text-red-600 opacity-75 shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
          </svg>
          <p className="text-sm font-semibold">Google</p>
          {/* <span className={google ? "text-green-500" : "text-red-500"}>Linked</span> */}
        </div>
      
     
        <div className="account-item border p-12 rounded-lg shadow-lg flex flex-col items-center justify-center">
          {/* LinkedIn SVG Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-12 fill-current text-blue-900 opacity-75 shrink-0 mx-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4"/>
          </svg>
          <p className="text-sm font-semibold">LinkedIn</p>
          {/* <span className={linkedin ? "text-green-500" : "text-red-500"}>Linked</span> */}
        </div>
      
    
        <div className="account-item border p-12 rounded-lg shadow-lg flex flex-col items-center justify-center">
          {/* Devpost SVG Icon */}
          <svg className="h-12 w-8 text-blue-600" fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><path d="M6.002 1.61 0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/></svg>
          <p className="text-sm font-semibold">Devpost</p>
          {/* <span className={devpost ? "text-green-500" : "text-red-500"}>Linked</span> */}
        </div>
      
    </div>
  );
}
