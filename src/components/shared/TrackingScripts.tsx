'use client'
import dynamic from "next/dynamic"; 


const TrackingScriptHelper = dynamic(
  () => import('./TrackingScriptHelper'),
    { ssr: false }
);

export default function TrackingScripts(){
  return <TrackingScriptHelper />
}