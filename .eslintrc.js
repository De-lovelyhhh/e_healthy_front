module.exports = {
    root: true,
    'extends': [
        'plugin:vue/essential'
    ],
    rules: {
        indent: [2, 4], // 强制使用一致的缩进
        eqeqeq: [2, 'always'], // 要求使用 === 和 !==
        semi: [2, 'never'], // 要求或禁止使用分号代替 ASI
        quotes: [2, 'single'], // 强制使用一致的反勾号、双引号或单引号
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
