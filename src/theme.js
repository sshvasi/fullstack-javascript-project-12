import { extendTheme } from '@mui/joy/styles';

export default extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          appBody: 'var(--joy-palette-common-white)',
          componentBg: 'var(--joy-palette-neutral-50)',
          currentUser: 'var(--joy-palette-primary-500)',
          anotherUser: 'var(--joy-palette-neutral-50)',
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
          anotherUser: 'var(--joy-palette-neutral-900)',
        },
        text: {
          currentUser: 'var(--joy-palette-primary-50)',
        },
      },
    },
  },
});
