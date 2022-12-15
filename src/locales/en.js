export default {
  translation: {
    channels: {
      title: 'Channels',
      buttons: {
        add: 'New channel',
        rename: 'Rename',
        delete: 'Delete',
      },
    },

    toast: {
      add: 'Channel added',
      rename: 'Channel renamed',
      remove: 'Channel removed',
    },

    chat: {
      messages_0: 'No messages',
      messages_1: '{{ count }} message',
      messages_2: '{{ count }} messages',
      placeholder: 'Write message...',
    },

    forms: {
      login: {
        label: 'Your nickname',
        placeholder: 'Write nickname...',
      },
      username: {
        label: 'Username',
        placeholder: 'Write username...',
        validation: {
          length: 'More than 3 and less than 20 symbols',
        },
      },
      password: {
        label: 'Password',
        placeholder: 'Write password',
        validation: {
          length: 'More than 6 symbols',
        },
      },
      passwordConfirmation: {
        label: 'Password confirmation',
        placeholder: 'Confirm password...',
        validation: {
          match: 'Passwords do not match',
        },
      },
      channel: {
        label: 'Name',
        placeholder: 'Write channel name',
        validation: {
          list: 'Channel already exists',
        },
      },
      message: {
        label: 'Message text',
        placeholder: 'Write a message...',
      },
      validation: {
        required: 'Field is required',
      },
      errors: {
        duplicateUser: 'User already exists',
        login: 'Username or password are not correct',
      },
    },

    header: {
      logo: 'Messenger',
      button: 'Log out',
      github: 'Github repository',
      light: 'Turn on light theme',
      dark: 'Turn on dark theme',
    },

    login: {
      header: 'Log in',
      button: 'Log in',
      noAccount: "Don't have an account?",
      signup: 'Sign up',
    },

    signup: {
      header: 'Registration',
      button: 'Sign up',
      hasAccount: 'Already have an account?',
      login: 'Log in',
    },

    modals: {
      add: {
        header: 'Add channel',
        button: 'Add',
      },
      rename: {
        header: 'Rename channel',
        button: 'Rename',
      },
      remove: {
        header: 'Delete channel',
        confirm: 'Are you sure?',
        button: 'Delete',
      },
    },

    404: {
      header: 'Error',
      description: 'An unexpected error occured',
      button: 'Home',
    },

    common: {
      cancel: 'Cancel',
      send: 'Send',
      delete: 'Delete',
      loading: 'Loading...',
      error: 'Something went wrong',
    },

    errors: {
      network: 'Network error',
    },
  },
};
