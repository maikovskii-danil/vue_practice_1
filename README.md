## About Enviroment

##### Данный проект был создан на MacOS и запустится только на MacOS.

### Но Вы можете попробовать его запустить на своей операционной системе.

##### Для этого удалите поле "os" в package.json или измените на значение ниже:

```sh
{
  "os": ["darwin", "linux", "win32"]
}
```

##### В поле "engines" в package.json также содержатся подробности о поддерживаемых версиях NodeJS и npm

## Данные для входа

- email: 'some.user@automation.testing'
- password: '123456'

### Project Setup & Compile and Hot-Reload for Development

```sh
npm start
```

###### Перед `"start"` npm запустит `npm clean-install`

### Project Setup & Type-Check, Compile and Minify for Production

```sh
npm run build
```

###### Перед `"build"` npm запустит `npm clean-install`
