import { get165Data, get165Source, handleData, saveMany } from './utils';

const main = async () => {
  // Get DB Entity Source
  const source = await get165Source();

  // Get API Data
  const data = await get165Data();

  // Get Content Websites 
  const websites = handleData((data as any[]));

  // Save
  await saveMany(websites, source.id);

};

main();