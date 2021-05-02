import { ref } from 'vue';
import { Dialog, Notify } from 'quasar';
import { useI18n } from 'vue-i18n';

import FavoriteSelect from '@/components/FavoriteSelect.vue';
import { User } from '@/models/randomUser/User';
import { Favorite } from '@/models/Favorite';

export default function useFavorite() {
  const { t } = useI18n();

  const favoriteSelected = ref<Favorite>();
  const favorites = ref<Favorite[]>([]);
  const usersSelected = ref<User[]>([]);

  const addFavorite = async (nickName: string, users: User[]) => {
    const favoriteIndex = favorites.value.findIndex((x) => x.nickName === nickName);
    if (favoriteIndex > -1) {
      favorites.value[favoriteIndex].users = [...favorites.value[favoriteIndex].users, ...users]
        .filter((value, i, array) => array.findIndex((x: User) => (x.email === value.email)) === i);
    } else {
      const favorite = { nickName, users };
      favorites.value.push(favorite);
    }
    Notify.create({
      type: 'positive',
      message: t('Notify.addFavorite', { nickName }),
    });
    window.sessionStorage.setItem('favorites', JSON.stringify(favorites.value));
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
    const favoriteIndex = favorites.value.findIndex((x) => x.nickName === nickName);
    if (favoriteIndex > -1) {
      favorites.value[favoriteIndex].users = favorites.value[favoriteIndex].users
        .filter((value) => users.findIndex((x: User) => (x.email === value.email)));

      if (!favorites.value[favoriteIndex].users.length) {
        favorites.value = favorites.value.filter((x) => x.nickName !== nickName);
      }
    }
    Notify.create({
      type: 'negative',
      message: t('Notify.removeFavorite', { nickName }),
    });
    callback();
  };

  const loadFavorites = () => {
    // TODO
  };

  favorites.value = JSON.parse(window.sessionStorage.getItem('favorites') || '[]');

  return {
    favorites, removeFavorite, usersSelected, favoriteSelected, handleAddFavorite, loadFavorites,
  };
}
