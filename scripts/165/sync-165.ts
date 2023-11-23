import { get165Data, get165Source, handleData, saveMany } from './utils';



const main = async () => {
  // Get DB Entity Source
  const source = await get165Source();

  // Get API Data
  const data = await get165Data();

  // Get Content Websites 
  const websites = handleData((data as any[]).slice(0, 5));

  // Save
  await saveMany(websites, source.id);

};

main();