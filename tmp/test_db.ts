import dns from 'dns';
import { promisify } from 'util';

const resolve = promisify(dns.lookup);
const hostname = 'ep-cold-art-al16we8v.c-3.eu-central-1.aws.neon.tech';

async function testDns() {
  console.log(`[DIAGNOSTIC] Checking DNS for: ${hostname}`);
  try {
    const res = await resolve(hostname);
    console.log(`[SUCCESS] Resolved to: ${res.address}`);
  } catch (error: any) {
    console.error(`[FAILURE] DNS resolution failed: ${error.message}`);
    console.log(`[TIP] This usually means the hostname is incorrect or the project was deleted in Neon.`);
  }
}

testDns();
