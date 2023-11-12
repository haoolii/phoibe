export const BaseLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <div
      className={`flex h-[500px] items-center bg-[url('/img/dapp_banner_bg.png')] bg-cover pt-20 transition-all`}
    >
      <div className='container'>
        {children}
      </div>
    </div>
  );
};
