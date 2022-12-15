import { extendTheme } from '@mui/joy/styles';

export default extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: 'var(--joy-palette-common-white)',
          active: 'var(--joy-palette-primary-solidBg)',
          inactive: 'var(--joy-palette-neutral-100)',
        },
        text: {
          active: 'var(--joy-palette-neutral-100)',
          inactive: 'var(text.primary)',
        },
      },
    },
    dark: {
      palette: {
        background: {
          body: 'var(--joy-palette-common-black)',
          active: 'var(--joy-palette-primary-500)',
          inactive: 'var(--joy-palette-neutral-900)',
        },
        text: {
          active: 'var(--joy-palette-neutral-100)',
          inactive: 'var(text.primary)',
        },
      },
    },
  },
});
