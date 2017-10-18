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
        "key-spacing": ["error", {"align": "colon"}],
        "object-curly-spacing": [1, "never"],
        "no-unused-vars": [2],
        "no-nested-ternary": 0,
        "jsx-a11y/href-no-hash": "off",
        "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "import/no-extraneous-dependencies": [
            "error",
            {
                "devDependencies": true,
                "optionalDependencies": false,
                "peerDependencies": false
            }
        ]
    }
};
