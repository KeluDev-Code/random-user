import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { Options } from '@/models/Options';

export default function useGender() {
  const { t } = useI18n();

  const genders = ref<Options[]>([{
    label: t('Gender.female'),
    value: 'female',
  }, {
    label: t('Gender.male'),
    value: 'male',
  }]);

  return { genders };
}
