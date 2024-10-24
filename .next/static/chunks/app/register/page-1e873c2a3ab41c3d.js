(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[11],{1603:(e,s,r)=>{Promise.resolve().then(r.bind(r,3488))},3488:(e,s,r)=>{"use strict";r.r(s),r.d(s,{default:()=>d});var a=r(7437),t=r(2265),l=r(9343),o=r(9772),m=r(1014),i=r(6463);let n=o.z.object({username:o.z.string().min(1,"Username is required"),email:o.z.string().email("Invalid email address"),password:o.z.string().min(6,"Password must be at least 6 characters long")}),d=()=>{let[e,s]=t.useState(""),r=(0,i.useRouter)(),{register:o,handleSubmit:d,formState:{errors:c}}=(0,l.cI)({resolver:(0,m.F)(n)}),u=async e=>{let a=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(a.ok)r.push("/login");else{let{message:e}=await a.json();s(e)}};return(0,a.jsx)("div",{className:"flex flex-col justify-center items-center flex-1 bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient min-h-full",children:(0,a.jsxs)("form",{onSubmit:d(u),className:"bg-blue-200 p-8 rounded-lg shadow-md w-96",children:[(0,a.jsx)("h2",{className:"text-2xl font-semibold mb-6 text-center",children:"Register"}),e&&(0,a.jsx)("p",{className:"text-red-500 text-center mb-4",children:e}),(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("label",{htmlFor:"username",className:"block text-sm font-medium text-gray-700",children:"Username"}),(0,a.jsx)("input",{type:"text",id:"username",...o("username"),className:"mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ".concat(c.username?"border-red-500":""),placeholder:"Enter your username"}),c.username&&(0,a.jsx)("p",{className:"text-red-500 text-sm",children:c.username.message})]}),(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700",children:"Email"}),(0,a.jsx)("input",{type:"email",id:"email",...o("email"),className:"mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ".concat(c.email?"border-red-500":""),placeholder:"you@example.com"}),c.email&&(0,a.jsx)("p",{className:"text-red-500 text-sm",children:c.email.message})]}),(0,a.jsxs)("div",{className:"mb-6",children:[(0,a.jsx)("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700",children:"Password"}),(0,a.jsx)("input",{type:"password",id:"password",...o("password"),className:"mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ".concat(c.password?"border-red-500":""),placeholder:"********"}),c.password&&(0,a.jsx)("p",{className:"text-red-500 text-sm",children:c.password.message})]}),(0,a.jsx)("button",{type:"submit",className:"w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition duration-200",children:"Register"}),(0,a.jsxs)("p",{className:"mt-4 text-sm text-center",children:["Already have an account?",(0,a.jsx)("a",{href:"/login",className:"text-blue-600 hover:underline",children:"Login"})]})]})})}}},e=>{var s=s=>e(e.s=s);e.O(0,[301,130,215,744],()=>s(1603)),_N_E=e.O()}]);