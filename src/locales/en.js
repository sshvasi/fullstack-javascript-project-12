export default {
  translation: {
    heading: 'Chat',
    signOut: 'Log out',
    channels: {
      buttons: {
        add: 'New channel',
      },
    },
    chat: {
      messages_zero: 'No messages',
      messages_one: '{{ count }} message',
      messages_many: '{{ count }} messages',
      placeholder: 'Write a message...',
    },

    forms: {
      modals: {
        add: {
          title: 'Add new channel',
          description: 'Write the name of the channel',
          placeholder: 'Name...',
          buttons: {
            confirm: 'Add',
          },
          validation: {
            required: 'Channel name is required',
            max: 'Must be less than 20 characters',
            exists: 'Channel with this name already exists',
          },
        },
        rename: {
          title: 'Rename channel',
          description: 'Write the name of the channel',
          placeholder: 'Name...',
          buttons: {
            confirm: 'Rename',
            cancel: 'Cancel',
          },
          validation: {
            required: 'Channel name is required',
            max: 'Must be less than 20 characters',
            exists: 'Channel with this name already exists',
          },
        },
        remove: {
          title: 'Remove channel',
          description: 'Are you sure you want to delete this channel?',
          buttons: {
            confirm: 'Yes',
            cancel: 'No',
          },
        },
      },
      login: {
        title: 'Welcome!',
        description: 'Sign in to continue',
        account: "Don't have an account?",
        signup: 'Sign up',
        username: {
          label: 'Username',
          validation: {
            min: 'Must be at least 3 characters',
            max: 'Must be less than 20 characters',
            required: 'Username is required',
            characters: 'Cannot contain special characters or spaces',
          },
        },
        password: {
          label: 'Password',
          validation: {
            required: 'Password is required',
            min: 'Must be at least 6 characters',
            invalid: 'Username or password is invalid',
          },
        },
      },
      signup: {
        title: 'Welcome!',
        description: 'Sign up to continue',
        account: 'Already have an account?',
        login: 'Log in',
        username: {
          label: 'Username',
          validation: {
            min: 'Must be at least 3 characters',
            max: 'Must be less than 20 characters',
            required: 'Username is required',
            characters: 'Cannot contain special characters or spaces',
            exists: 'User with this name already exists',
          },
        },
        password: {
          label: 'Password',
          validation: {
            required: 'Password is required',
            min: 'Must be at least 6 characters',
          },
        },
        confirmation: {
          label: 'Confirm password',
          required: 'Please retype your password',
          match: 'Passwords do not match',
        },
      },
    },
    404: {
      title: '404',
      description: "That page couldn't be found",
      button: 'Go home',
    },
  },
};
