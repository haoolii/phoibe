import { LatestRecords } from '@/features/record/components/LatestRecords';

export default function Home() {
  return (
    <div>
      <div
        className={`flex h-[300px] items-center bg-[url('/img/dapp_banner_bg.png')] bg-cover pt-20 transition-all`}
      ></div>
      <section className='container flex max-w-4xl flex-col items-center gap-10 py-16'>
        
          <div className='flex w-full justify-center md:min-h-[600px]'>
            <LatestRecords />
          </div>
      </section>
    </div>
  );
}
