module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "globals": {},
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",

        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "modules": true,
            "jsx": true
        }
    },
    "rules":{
        "indent": ["error", 4],
        "arrow-parens": 0,
        "one-var": 0,
        "key-spacing": ["error", {"align": "colon"}],
        "object-curly-spacing": [1, "never"],
        "no-unused-vars": [2],
        "no-unresolved": "off",
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
