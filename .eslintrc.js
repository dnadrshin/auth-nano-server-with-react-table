module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules":{
        "indent": ["error", 4],
        "arrow-parens": 0,
        "one-var": 0,
        "jsx-a11y/href-no-hash": "off",
        "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    }
};
