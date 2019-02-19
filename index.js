import getSpeed from 'fast-speed-test';

async function fast() {
  const Bps = await getSpeed(10);
  return Bps/125000;
}

(async () => {
  console.log(await fast() + ' mbps');
  process.exit(0);
})();

