module.exports = {
    "extends": "airbnb",
    "env": {
        "jest": true
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "globals": {
        "localStorage": true,
        "fetch": true,
        "document": true,
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",

        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "modules": true,
            "jsx": true
        }
    },
    "rules": {
        "no-confusing-arrow": 0,
        "no-mixed-operators": 0,
        "global-require": 0,
        "quote-props": 0,
        "no-underscore-dangle": 0,
        "consistent-error": 0,
        "indent": ["error", 4],
        "arrow-parens": 0,
        "one-var": 0,
        "key-spacing": ["error", {"align": "colon"}],
        "no-named-as-default": 0,
        "object-curly-spacing": [1, "never"],
        "no-unused-vars": [2],
        "import/no-unresolved": 0,
        "import/extensions": 0,
        "no-nested-ternary": 0,
        "jsx-a11y/href-no-hash": "off",
        "react/jsx-indent": 0,
        "react/jsx-indent-props": 0,
        "react/jsx-wrap-multilines": "off",
        "react/no-multi-comp"      : 1,
        "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "import/no-extraneous-dependencies": 0,
    }
};
