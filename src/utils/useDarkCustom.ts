import { useDark, useToggle } from '@vueuse/core';

const useDarkCustom = () => {
  const isDark = useDark({
    selector: 'html',
    attribute: 'color-scheme',
    valueDark: 'dark',
    valueLight: 'light',
  });
  const toggleIsDark = useToggle(isDark);

  return { value: isDark, toggle: toggleIsDark };
};

export default useDarkCustom;
