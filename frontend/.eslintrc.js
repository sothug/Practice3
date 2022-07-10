module.exports = {
    "env": {
        "browser": true,
        "es2022": true
    },
    "extends": [
        './ts.config.js',
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
    }
}
