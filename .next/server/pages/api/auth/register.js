"use strict";(()=>{var e={};e.id=7,e.ids=[7],e.modules={3524:e=>{e.exports=require("@prisma/client")},8432:e=>{e.exports=require("bcryptjs")},145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},1663:(e,t,r)=>{r.r(t),r.d(t,{config:()=>p,default:()=>f,routeModule:()=>c});var s={};r.r(s),r.d(s,{default:()=>P});var n=r(6794),a=r(110),i=r(6249),u=r(3524),o=r(8432),d=r.n(o);let l=new u.PrismaClient;async function P(e,t){if("POST"===e.method){let{username:r,email:s,password:n}=e.body;if(!r||!s||!n)return t.status(400).json({message:"All fields are required"});if(await l.user.findUnique({where:{email:s}}))return t.status(400).json({message:"User already exists"});let a=await d().hash(n,10),i=await l.user.create({data:{username:r,email:s,password:a}});return t.status(201).json({message:"User registered successfully",user:i})}t.setHeader("Allow",["POST"]),t.status(405).end(`Method ${e.method} Not Allowed`)}let f=(0,i.l)(s,"default"),p=(0,i.l)(s,"config"),c=new n.PagesAPIRouteModule({definition:{kind:a.x.PAGES_API,page:"/api/auth/register",pathname:"/api/auth/register",bundlePath:"",filename:""},userland:s})},110:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE"}(r||(r={}))},6794:(e,t,r)=>{e.exports=r(145)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var r=t(t.s=1663);module.exports=r})();