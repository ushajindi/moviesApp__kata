module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb",
        "airbnb/hooks",
        "airbnb-typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project" : "./tsconfig.json",
    },
    "ignorePatterns": [".eslintrc.cjs", "vite.config.ts"],
    "plugins": [
        "@typescript-eslint",
        "react",
        "prettier",
    ],
    "rules": {
        "react/react-in-jsx-scope": "off",
        "react/prefer-stateless-function":"off",
        "no-underscore-dangle":"off",
        "@typescript-eslint/return-await":"off",
        "import/no-cycle":"off",
        "@typescript-eslint/no-explicit-any":"off",
        "react/jsx-no-bind":"off",
        "@typescript-eslint/ban-types":"off",
        "react/jsx-no-constructed-context-values":"off",
        'import/order': "off",
        "no-plusplus":"off",
        "no-empty-pattern":"off",
        "react/sort-comp":"off",
        "import/extensions":"off",
    }
}
