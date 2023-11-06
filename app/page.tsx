import { WebSiteBoard } from '@/features/website/components/WebSiteBoard'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen ">
      <div className="container flex justify-center ">
        <WebSiteBoard />
      </div>
    </div>
  )
}
