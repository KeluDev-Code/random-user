import { ref } from 'vue';

import { Options } from '@/models/Options';

export default function useNationaliti() {
  const nationalities = ref<Options[]>([
    { label: 'AU', value: 'AU' },
    { label: 'BR', value: 'BR' },
    { label: 'CA', value: 'CA' },
    { label: 'CH', value: 'CH' },
    { label: 'DE', value: 'DE' },
    { label: 'DK', value: 'DK' },
    { label: 'ES', value: 'ES' },
    { label: 'FI', value: 'FI' },
    { label: 'FR', value: 'FR' },
    { label: 'GB', value: 'GB' },
    { label: 'IE', value: 'IE' },
    { label: 'IR', value: 'IR' },
    { label: 'NO', value: 'NO' },
    { label: 'NL', value: 'NL' },
    { label: 'NZ', value: 'NZ' },
    { label: 'TR', value: 'TR' },
    { label: 'US', value: 'US' },
  ]);

  return { nationalities };
}
