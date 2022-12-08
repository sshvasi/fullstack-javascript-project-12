export default {
  translation: {
    channels: {
      title: 'Каналы',
      buttons: {
        add: 'Новый канал',
        rename: 'Переименовать',
        delete: 'Удалить',
      },
    },

    toast: {
      add: 'Канал создан',
      rename: 'Канал переименован',
      remove: 'Канал удалён',
    },

    chat: {
      messages: 'Нет сообщений',
      messages_0: '{{ count }} сообщение',
      messages_1: '{{ count }} сообщения',
      messages_2: '{{ count }} сообщений',
      buttons: {
        send: 'Отправить',
      },
      placeholder: 'Введите сообщение...',
    },

    forms: {
      login: {
        label: 'Ваш ник',
        placeholder: 'Введите ник...',
      },
      username: {
        label: 'Имя пользователя',
        placeholder: 'Введите имя...',
        validation: {
          length: 'От 3 до 20 символов',
        },
      },
      password: {
        label: 'Пароль',
        placeholder: 'Введите пароль...',
        validation: {
          length: 'Не менее 6 символов',
        },
      },
      passwordConfirmation: {
        label: 'Подтвердите пароль',
        placeholder: 'Повторите пароль...',
        validation: {
          match: 'Пароли должны совпадать',
        },
      },
      channel: {
        label: 'Название',
        placeholder: 'Введите название...',
        validation: {
          list: 'Канал уже существует',
        },
      },
      message: {
        label: 'Текст сообщения',
        placeholder: 'Введите сообщение...',
      },
      validation: {
        required: 'Обязательное поле',
      },
      errors: {
        duplicateUser: 'Такой пользователь уже существует',
        login: 'Неверные имя пользователя или пароль',
      },
    },

    header: {
      logo: 'Hexlet Chat',
      button: 'Выйти',
      github: 'Репозиторий',
      light: 'Включить светлую тему',
      dark: 'Включить тёмную тему',
    },

    login: {
      header: 'Войти',
      button: 'Войти',
      noAccount: 'Нет аккаунта?',
      signup: 'Регистрация',
    },

    signup: {
      header: 'Регистрация',
      button: 'Зарегистрироваться',
      hasAccount: 'Есть аккаунт?',
      login: 'Войти',
    },

    modals: {
      add: {
        header: 'Добавить канал',
        button: 'Добавить',
      },
      rename: {
        header: 'Переименовать канал',
        button: 'Переименовать',
      },
      remove: {
        header: 'Удалить канал',
        confirm: 'Вы уверены?',
        button: 'Удалить',
      },
    },

    404: {
      header: '404',
      description: 'Похоже, такой страницы не существует',
      button: 'На главную',
    },

    common: {
      cancel: 'Отменить',
      send: 'Отправить',
      delete: 'Удалить',
      loading: 'Загрузка...',
      error: 'Что-то пошло не так',
    },

    errors: {
      network: 'Ошибка соединения',
    },
  },
};
