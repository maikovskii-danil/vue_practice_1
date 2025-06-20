import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { useStorage } from '@vueuse/core';

import { REGISTERED_USERS_DATA, REGISTERED_USERS_DATA_MAP } from '@/consts';
import type { TUserData } from '@/types';

const useUserStore = defineStore('user', () => {
  const router = useRouter();

  const currentUser = useStorage('user-storage', { email: '', password: '' });

  const isLoggedIn = computed(() =>
    Boolean(currentUser.value.email && currentUser.value.password),
  );
  const error = ref('');

  const apiValidation = (user: TUserData) => {
    const foundUser = REGISTERED_USERS_DATA_MAP[user.email];

    const isValidUser =
      Boolean(foundUser) && foundUser.password === user.password;
    const isInvalidPassword = foundUser.password !== user.password;

    if (isValidUser) {
      error.value = '';
    } else if (isInvalidPassword) {
      error.value = 'Неверный пароль';
    } else {
      error.value = 'Нет пользователя с таким email';
    }

    return !error.value;
  };

  const login = (user: TUserData) => {
    currentUser.value.email = user.email;
    currentUser.value.password = user.password;
  };

  const tryLoginProcess = (user: TUserData) => {
    const isValidApi = apiValidation(user);

    if (!isValidApi) {
      return;
    }

    login(user);
    router.push({ name: 'applications' });
  };

  const logout = () => {
    currentUser.value.email = '';
    currentUser.value.password = '';

    router.push({ name: 'auth' });
  };

  return {
    usersData: REGISTERED_USERS_DATA,
    usersMap: REGISTERED_USERS_DATA_MAP,
    currentUser,
    isLoggedIn,
    error,
    tryLoginProcess,
    login,
    logout,
  };
});

export default useUserStore;
