import { ref } from 'vue';
import { Dialog, Notify } from 'quasar';
import { useI18n } from 'vue-i18n';

import FavoriteSelect from '@/components/FavoriteSelect.vue';
import FavoriteRepo from '@/repositories/FavoriteRepo';
import { User } from '@/models/randomUser/User';
import { Favorite } from '@/models/Favorite';

const favoriteRepo = new FavoriteRepo();

export default function useFavorite() {
  const { t } = useI18n();

  const favoriteSelected = ref<Favorite>();
  const favorites = ref<Favorite[]>([]);
  const usersSelected = ref<User[]>([]);

  const loadFavorites = async () => {
    favorites.value = (await favoriteRepo.getAll() || []).filter((x) => x.nickName);
  };

  const addFavorite = async (nickName: string, users: User[]) => {
    const favoriteIndex = favorites.value.findIndex((x) => x.nickName === nickName);
    const favorite = { nickName, users };
    try {
      if (favoriteIndex > -1) {
        const data = await favoriteRepo.put(favorite);
        if (data && data.length) {
          favorites.value[favoriteIndex].users = data[0].users;
        }
      } else {
        await favoriteRepo.post(favorite);

        favorites.value.push(favorite);
      }
      Notify.create({
        type: 'positive',
        message: t('Notify.addFavorite', { nickName }),
      });
    } catch (error) {
      Notify.create({
        type: 'negative',
        message: t('Notify.error404', { nickName }),
      });
    }
  };

  const handleAddFavorite = async (nickName?: string, users?: User[]) => {
    let nickNameInner = nickName;
    if (!nickNameInner) {
      nickNameInner = await new Promise<string |undefined>((resolve) => {
        Dialog.create({
          component: FavoriteSelect,
          persistent: true,
        }).onOk((data: string) => {
          resolve(data);
        }).onCancel(() => {
          resolve(undefined);
        });
      });
    }
    if (nickNameInner) {
      await addFavorite(nickNameInner, users || usersSelected.value);
      if (!users) usersSelected.value = [];
    }
  };

  const removeFavorite = async (nickName: string, users: User[] = usersSelected.value, callback: ()=> void) => {
    try {
      await favoriteRepo.delete({ nickName, users });

      Notify.create({
        type: 'positive',
        message: t('Notify.removeFavorite', { nickName }),
      });
      callback();
    } catch (error) {
      Notify.create({
        type: 'negative',
        message: t('Notify.error404', { nickName }),
      });
    }
  };

  return {
    favorites, removeFavorite, usersSelected, favoriteSelected, handleAddFavorite, loadFavorites,
  };
}
