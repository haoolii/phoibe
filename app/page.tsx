import { LatestRecords } from '@/features/record/components/LatestRecords';
import { SearchPanel } from '@/features/record/components/SearchPanel';
import { Statistics } from '@/features/record/components/Statistics';

export default function Home() {
  return (
    <div>
      <section
        className={`flex items-center banner_bg pt-32 md:pt-22 pb-16 transition-all`}
      >
        <SearchPanel />
      </section>
      <section className="bg-secondary">
        <div className='container flex max-w-4xl flex-col items-center gap-10 py-8'>
          <Statistics />
        </div>
      </section>
      <section className='container flex max-w-4xl flex-col items-center gap-10 pt-4 md:pt-12 pb-16'>
          <div className='flex w-full justify-center md:min-h-[600px]'>
            <LatestRecords />
          </div>
      </section>
    </div>
  );
}
