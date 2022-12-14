import { extendTheme } from '@mui/joy/styles';

export default extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: 'var(--joy-palette-common-white)',
          message: {
            byCurrentUser: 'var(--joy-palette-primary-400)',
            byAnotherUser: 'var(--joy-palette-neutral-100)',
          },
        },
        text: {
          message: {
            byCurrentUser: 'var(--joy-palette-neutral-100)',
            byAnotherUser: 'var(text.primary)',
          },
        },
      },
    },
    dark: {
      palette: {
        background: {
          body: 'var(--joy-palette-common-black)',
          message: {
            byCurrentUser: 'var(--joy-palette-primary-500)',
            byAnotherUser: 'var(--joy-palette-neutral-900)',
          },
        },
        text: {
          message: {
            byCurrentUser: 'var(--joy-palette-neutral-100)',
            byAnotherUser: 'var(text.primary)',
          },
        },
      },
    },
  },
});
