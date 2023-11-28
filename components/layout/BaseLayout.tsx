export const BaseLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <div
      className={`flex h-[500px] items-center banner_bg pt-20 transition-all`}
    >
      <div className='container'>
        {children}
      </div>
    </div>
  );
};
