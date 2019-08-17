const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    const isProduction = env === "production";
    const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' });
    return {
        mode: isProduction ? "production" : "development",
        entry: "./src/app.js",
        output: {
            path: path.join(__dirname, "public", "dist"),
            filename: "bundle.js"
        },
        plugins: [
            CSSExtract
        ],
        module: {
            rules: [{
                loader: "babel-loader",
                test: /\.js$/,
                exclude: /node_modules/
            },{
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }]
        },
        devtool: isProduction ? "source-map" : "cheap-module-eval-source-map",
        devServer: {
            contentBase: path.join(__dirname, "public"),
            historyApiFallback: true,
            disableHostCheck: true,
            publicPath: "/dist/"
        }
    };
};