import { extendTheme } from '@mui/joy/styles';

export default extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          appBody: 'var(--joy-palette-neutral-50)',
          componentBg: 'var(--joy-palette-common-white)',
          currentUser: 'var(--joy-palette-primary-500)',
        },
        text: {
          currentUser: 'var(--joy-palette-primary-50)',
        },
      },
    },
    dark: {
      palette: {
        background: {
          appBody: 'var(--joy-palette-common-black)',
          componentBg: 'var(--joy-palette-neutral-900)',
          currentUser: 'var(--joy-palette-primary-500)',
        },
        text: {
          currentUser: 'var(--joy-palette-primary-50)',
        },
      },
    },
  },
});
